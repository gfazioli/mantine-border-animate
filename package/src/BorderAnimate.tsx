import {
  Box,
  createVarsResolver,
  Factory,
  factory,
  getRadius,
  getSize,
  getThemeColor,
  StylesApiProps,
  useMantineTheme,
  useProps,
  useStyles,
  type BoxProps,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
} from '@mantine/core';
import { clamp, useCallbackRef, useIsomorphicEffect, useMergedRef } from '@mantine/hooks';
import React from 'react';
import classes from './BorderAnimate.module.css';

/** Available border animation variants */
export type BorderAnimateVariant = 'beam' | 'glow' | 'pulse' | 'draw' | 'dash';

/** Beam rendering mode */
export type BorderAnimateBeamMode = 'dot' | 'wedge' | 'comet';

/** What makes the border animate */
export type BorderAnimateTrigger = 'always' | 'hover' | 'focus-within' | 'inView' | 'never';

/** Line cap used by the dash variant segments */
export type BorderAnimateDashCap = 'butt' | 'round';

/** A single color stop for multi-color gradients */
export interface BorderAnimateColorStop {
  /** Color value (any MantineColor, e.g. 'red.5', '#ff0000', 'rgba(...)') */
  color: MantineColor;
  /** Position along the gradient in percentage (0-100) */
  position: number;
}

export type BorderAnimateStylesNames = 'root' | 'border' | 'svg' | 'track' | 'stroke';

export type BorderAnimateCssVariables = {
  root:
    | '--border-animate-radius'
    | '--border-animate-offset'
    | '--border-animate-z-index'
    | '--border-animate-duration'
    | '--border-animate-direction'
    | '--border-animate-width'
    | '--border-animate-color-from'
    | '--border-animate-color-to'
    | '--border-animate-phase'
    | '--border-animate-blur'
    | '--border-animate-opacity'
    | '--border-animate-progress'
    | '--border-animate-gradient-background'
    | '--border-animate-beam-stops'
    // Deprecated since the wedge became a bell: no longer read, kept so that `vars`
    // overrides written for 3.0 still compile. The wedge's width comes from `spread`.
    | '--border-animate-beam-start'
    | '--border-animate-beam-from'
    | '--border-animate-beam-to'
    | '--border-animate-beam-end'
    | '--border-animate-size'
    | '--border-animate-timing'
    | '--border-animate-iterations'
    | '--border-animate-dasharray'
    | '--border-animate-dash-period'
    | '--border-animate-dash-cap'
    | '--border-animate-draw-offset'
    | '--border-animate-track-color';
};

/**
 * Number of graded segments used to build the comet tail. SVG cannot fade a stroke along
 * its own path, so the tail is a stack of short strokes with decreasing opacity: the count
 * is what decides whether the reader sees a gradient or a row of blocks.
 */
const COMET_SEGMENTS = 14;

/** How much longer each segment is than the step between two segments */
const COMET_OVERLAP = 2;

/**
 * Distance between two consecutive segment heads. Dividing by `segments + overlap - 1`
 * keeps the whole tail exactly `tail` percent long even though the segments overlap.
 */
function getCometStep(tail: number | undefined) {
  return Math.max(tail ?? 25, 0) / (COMET_SEGMENTS + COMET_OVERLAP - 1);
}

/**
 * Samples of the wedge's brightness curve. A gradient interpolates linearly between its
 * stops, so this is what decides whether the reader sees a curve or a row of facets.
 */
const WEDGE_SAMPLES = 16;

/**
 * How much wider than `spread` the wedge's bell is drawn. A bell is dimmer at its edges than
 * the trapezoid it replaced, so at the same extent it would look about a fifth narrower;
 * this keeps the width at half brightness where `spread` always put it.
 */
const WEDGE_SPAN = 1.2;

/** Two decimals are below what a gradient can show, and keep the inline style short */
function round(value: number) {
  return Number(value.toFixed(2));
}

/**
 * Conic-gradient stops of the wedge, as percentages of the turn around 50%. Brightness
 * follows a bell (`sin(πt)^1.2`), so both ends fade out with no visible edge; colour runs
 * from colorFrom on the trailing side to colorTo on the leading one, in the same places
 * the flat band used to put them. A color-mix whose percentages add up to less than 100%
 * scales the alpha by that sum, which paints colour and brightness in one stop.
 */
function getWedgeStops(spread: number) {
  const span = Math.min(Math.max(spread, 0) * WEDGE_SPAN, 360) / 3.6;
  const start = 50 - span / 2;
  const stops = [`transparent ${round(start)}%`];

  for (let k = 1; k < WEDGE_SAMPLES; k += 1) {
    const t = k / WEDGE_SAMPLES;
    const alpha = Math.sin(Math.PI * t) ** 1.2 * 100;
    const mix = clamp((t - 0.25) / 0.5, 0, 1);

    stops.push(
      `color-mix(in oklab, var(--border-animate-color-from) ${round((1 - mix) * alpha)}%, var(--border-animate-color-to) ${round(mix * alpha)}%) ${round(start + span * t)}%`
    );
  }

  stops.push(`transparent ${round(start + span)}%`);

  return stops.join(', ');
}

/**
 * Colour at `position` (0-100) along a palette of stops sorted by position: the stop itself
 * when it sits there, otherwise a color-mix of its two neighbours. The colours may be CSS
 * variables, so the mixing has to happen in the browser.
 */
function samplePalette(sorted: { color: string; position: number }[], position: number) {
  const next = sorted.findIndex((s) => s.position >= position);

  if (next === -1) {
    return sorted[sorted.length - 1].color;
  }

  if (next === 0 || sorted[next].position === position) {
    return sorted[next].color;
  }

  const a = sorted[next - 1];
  const b = sorted[next];
  const mix = ((position - a.position) / (b.position - a.position)) * 100;

  return `color-mix(in oklab, ${a.color}, ${b.color} ${round(mix)}%)`;
}

/**
 * animation-iteration-count, always spelled out: custom properties inherit, so a ring that left
 * it to the stylesheet's fallback would take the count of a finite ring it is nested in.
 */
function getIterations(iterations: number | 'infinite' | undefined) {
  return typeof iterations === 'number' && Number.isFinite(iterations)
    ? `${Math.max(iterations, 0)}`
    : 'infinite';
}

/**
 * Dash pattern in perimeter percentages. `count` distributes the segments evenly:
 * the dashSize/dashGap ratio then decides how much of each slot is painted.
 */
function getDashPattern(dashSize: number, dashGap: number, count: number | undefined) {
  const size = Math.max(dashSize, 0);
  const gap = Math.max(dashGap, 0);

  if (count && count > 0) {
    const slot = 100 / count;
    const ratio = size + gap === 0 ? 0.5 : size / (size + gap);
    const on = slot * ratio;

    return { dasharray: `${on} ${slot - on}`, period: slot };
  }

  // The pattern is anchored to the start of the path, so a period that does not divide the
  // perimeter leaves a broken dash exactly where the perimeter closes — a visible snag at
  // the first corner. Snapping to a whole number of repetitions keeps the requested look
  // (the adjustment is at most half a period) and makes the loop seamless.
  const requested = size + gap;

  if (requested <= 0) {
    return { dasharray: '0 100', period: 100 };
  }

  const period = 100 / Math.max(1, Math.round(100 / requested));
  const scale = period / requested;

  return { dasharray: `${size * scale} ${gap * scale}`, period };
}

/** Comma-separated gradient stops, from colorStops when provided */
function getStops(
  colorStops: BorderAnimateColorStop[] | undefined,
  colorFrom: MantineColor | undefined,
  colorTo: MantineColor | undefined,
  theme: Parameters<typeof getThemeColor>[1]
) {
  if (colorStops && colorStops.length > 0) {
    return colorStops.map((s) => ({
      color: getThemeColor(s.color, theme),
      position: s.position,
    }));
  }

  return [
    { color: getThemeColor(colorFrom, theme), position: 0 },
    { color: getThemeColor(colorTo, theme), position: 100 },
  ];
}

export interface BorderAnimateBaseProps {
  children?: React.ReactNode;

  /** Animation variant type
   * @default 'beam'
   */
  variant?: BorderAnimateVariant;

  /** Beam rendering mode (beam variant only).
   * - `dot`: a soft radial dot traveling along the border via offset-path — constant speed,
   *   uniform size at every position
   * - `wedge`: a rotating conic-gradient wedge — smooth rotation, but the visible width
   *   varies on rectangles because the sweep is angular
   * - `comet`: a stroked head with a fading tail, drawn along the real perimeter —
   *   constant speed and a true trail
   * @default 'dot'
   */
  beamMode?: BorderAnimateBeamMode;

  /** Animation duration in seconds. For state triggers it is also the transition duration.
   * @default 5 (1 for draw)
   */
  duration?: number;

  /** Border width
   * @default 'xs'
   */
  borderWidth?: MantineSize | (string & {}) | number;

  /** Starting color of the border effect. Used when colorStops is not provided.
   * @default 'yellow.6'
   */
  colorFrom?: MantineColor;

  /** Ending color of the border effect. Used when colorStops is not provided.
   * @default 'violet.6'
   */
  colorTo?: MantineColor;

  /** Color stops for the border gradient. When provided, overrides colorFrom/colorTo.
   * Each stop has a color (any MantineColor) and a position (0-100).
   * Stops should be provided in ascending position order.
   * With `beamMode="comet"` they colour the tail instead: position 0 is the head, 100 the
   * end of the tail.
   */
  colorStops?: BorderAnimateColorStop[];

  /** Pixel size of the traveling dot (`beamMode="dot"` only).
   * @default 'sm'
   */
  size?: MantineSize | (string & {}) | number;

  /** Visible width of the rotating wedge in degrees (`beamMode="wedge"` only).
   * @default 36
   */
  spread?: number;

  /** Length of the comet tail as a percentage of the perimeter (`beamMode="comet"` only).
   * @default 25
   */
  tail?: number;

  /** Border radius
   * @default 'md'
   */
  radius?: MantineRadius | (string & {}) | number;

  /** Distance between the animated ring and the element bounds. A positive value pushes
   * the ring outwards, leaving a gap around the content.
   * @default 0
   */
  offset?: MantineSize | (string & {}) | number;

  /** Reverse the animation direction
   * @default false
   */
  reverse?: boolean;

  /** Blur amount for the effect
   * @default 'xs' (0 for draw and dash)
   */
  blur?: MantineSize | (string & {}) | number;

  /** Animation phase in seconds. A positive value makes the animation start as if it had
   * already been running for that many seconds (useful for staggering multiple borders).
   * @default 0
   */
  phase?: number;

  /** Show/hide the mask that clips the effect to the border
   * @default true (false for glow)
   */
  withMask?: boolean;

  /** z-index of the border element
   * @default 1 (-1 for glow)
   */
  zIndex?: number;

  /** Show/hide the animated border
   * @default true
   */
  show?: boolean;

  /** Enable/disable the animation
   * @default true
   */
  animate?: boolean;

  /** Position along the border perimeter, as a percentage (0-100).
   * - `variant="draw"`: how much of the border is drawn
   * - other variants: where the effect sits when `animate` is false, and the phase offset
   * @default 100
   */
  progress?: number;

  /** Opacity of the animated border effect (0 to 1).
   * This controls the border effect opacity, not the component opacity.
   * @default 1
   */
  borderOpacity?: number;

  /** CSS animation timing function.
   * @default 'linear' for beam/dash, 'ease-in-out' for glow/pulse/draw
   */
  timingFunction?: string;

  /** What makes the border animate.
   * - `always`: animates continuously. It pauses while scrolled out of the viewport and
   *   catches up on the way back, so it costs nothing off-screen and stays in step
   *   (a finite run, see iterations, is never paused)
   * - `hover` / `focus-within`: fades in and animates while the wrapper is hovered/focused
   * - `inView`: animates while the component is inside the viewport
   * - `never`: renders the border in its resting state
   * @default 'always'
   */
  trigger?: BorderAnimateTrigger;

  /** How many times the animation runs: a number of laps (fractions allowed) or
   * `'infinite'`. A finite animation stops where its last lap ends and calls onComplete;
   * remount the component (a new `key`) or toggle `animate` to run it again.
   * Ignored by the draw variant, which transitions to its progress instead of looping.
   * @default 'infinite'
   */
  iterations?: number | 'infinite';

  /** Called once when the last lap of a finite animation (see iterations) has run.
   * When reduced motion keeps the ring still there are no laps to wait for, so it is
   * called right away.
   */
  onComplete?: () => void;

  /** Keep the ring still for users who ask their system to reduce motion: it stops moving,
   * and a beam rests where `progress` puts it, as with `animate={false}`.
   * @default theme.respectReducedMotion
   */
  respectReducedMotion?: boolean;

  /** Pause the animation when the user hovers over the component.
   * Ignored when `trigger="hover"`.
   * @default false
   */
  pauseOnHover?: boolean;

  /** Length of each dash, as a percentage of the perimeter (`variant="dash"` only).
   * @default 4
   */
  dashSize?: number;

  /** Length of the gap between dashes, as a percentage of the perimeter
   * (`variant="dash"` only).
   * @default 4
   */
  dashGap?: number;

  /** Number of dashes distributed evenly along the perimeter (`variant="dash"` only).
   * When set, it overrides the absolute dashSize/dashGap lengths and keeps only their ratio.
   */
  count?: number;

  /** Line cap of the dash segments. Use `round` with a small dashSize to get dots.
   * @default 'butt'
   */
  dashCap?: BorderAnimateDashCap;

  /** Render the full perimeter underneath the effect, as a track
   * (`draw` and `dash` variants only).
   * @default false
   */
  withTrack?: boolean;

  /** Color of the track.
   * @default 'var(--mantine-color-default-border)'
   */
  trackColor?: MantineColor;
}

export interface BorderAnimateProps
  extends BoxProps, BorderAnimateBaseProps, Omit<StylesApiProps<BorderAnimateFactory>, 'variant'> {}

export type BorderAnimateFactory = Factory<{
  props: BorderAnimateProps;
  ref: HTMLDivElement;
  stylesNames: BorderAnimateStylesNames;
  variant: BorderAnimateVariant;
  vars: BorderAnimateCssVariables;
}>;

export const defaultProps: Partial<BorderAnimateProps> = {
  variant: 'beam',
  beamMode: 'dot',
  borderWidth: 'xs',
  radius: 'md',
  offset: 0,
  size: 'sm',
  spread: 36,
  tail: 25,
  colorFrom: 'yellow.6',
  colorTo: 'violet.6',
  reverse: false,
  phase: 0,
  show: true,
  animate: true,
  progress: 100,
  borderOpacity: 1,
  trigger: 'always',
  iterations: 'infinite',
  pauseOnHover: false,
  dashSize: 4,
  dashGap: 4,
  dashCap: 'butt',
  withTrack: false,
};

/** True when the variant is rendered as an SVG stroke instead of a masked CSS ring */
function usesStroke(
  variant: BorderAnimateVariant | undefined,
  beamMode: BorderAnimateBeamMode | undefined
) {
  return variant === 'draw' || variant === 'dash' || (variant === 'beam' && beamMode === 'comet');
}

/** Per-variant defaults that cannot live in defaultProps */
function resolveDuration(duration: number | undefined, variant: BorderAnimateVariant | undefined) {
  return duration ?? (variant === 'draw' ? 1 : 5);
}

function resolveBlur(
  blur: BorderAnimateBaseProps['blur'],
  variant: BorderAnimateVariant | undefined
) {
  return blur ?? (variant === 'draw' || variant === 'dash' ? 0 : 'xs');
}

function resolveZIndex(zIndex: number | undefined, variant: BorderAnimateVariant | undefined) {
  return zIndex ?? (variant === 'glow' ? -1 : 1);
}

function resolveWithMask(withMask: boolean | undefined, variant: BorderAnimateVariant | undefined) {
  return withMask ?? variant !== 'glow';
}

const varsResolver = createVarsResolver<BorderAnimateFactory>(
  (
    theme,
    {
      duration,
      reverse,
      borderWidth,
      colorFrom,
      colorTo,
      colorStops,
      size,
      spread,
      tail,
      phase,
      blur,
      borderOpacity,
      zIndex,
      radius,
      offset,
      progress,
      variant,
      timingFunction,
      beamMode,
      dashSize,
      dashGap,
      count,
      dashCap,
      trackColor,
      iterations,
    }
  ) => {
    const stroke = usesStroke(variant, beamMode);
    // Clamped here and nowhere else: the stylesheet feeds this number to offset-distance,
    // to an angle and to a dash offset, and a negative percentage silently drops the
    // declaration it lands in.
    const value = Math.min(Math.max(progress ?? 100, 0), 100);

    let gradientBackground: string | undefined;
    let beamStops: string | undefined;
    let dotSize: string | undefined;
    let dasharray: string | undefined;
    let dashPeriod: string | undefined;
    let drawOffset: string | undefined;

    if (variant === 'beam' && !stroke) {
      if (beamMode === 'dot') {
        dotSize = getSize(size, 'border-animate-size');

        if (colorStops && colorStops.length > 0) {
          const stops = getStops(colorStops, colorFrom, colorTo, theme)
            .map((s) => `${s.color} ${s.position}%`)
            .join(', ');
          gradientBackground = `radial-gradient(ellipse at center, ${stops})`;
        }
      } else if (colorStops && colorStops.length > 0) {
        const stops = getStops(colorStops, colorFrom, colorTo, theme)
          .map((s) => `${s.color} ${s.position}%`)
          .join(', ');
        gradientBackground = `conic-gradient(from 0deg, ${stops})`;
      } else {
        beamStops = getWedgeStops(spread ?? 36);
      }
    }

    if (variant === 'dash') {
      const pattern = getDashPattern(dashSize ?? 4, dashGap ?? 4, count);
      dasharray = pattern.dasharray;
      dashPeriod = `${pattern.period}`;
    }

    if (variant === 'draw') {
      drawOffset = `${100 - value}`;
    }

    if (variant === 'beam' && beamMode === 'comet') {
      // Each segment is twice as long as the gap between two of them, so consecutive
      // segments overlap: measured on rendered pixels, that halves the visible ripple along
      // the tail (RMS 3.6 -> 2.1) because a joint stops reading as a step.
      // The period stays exactly one perimeter: as the head leaves the end of the path the
      // same dash re-enters from the start, so nothing is ever clipped.
      const step = getCometStep(tail);
      const length = Math.min(step * COMET_OVERLAP, 100);
      dasharray = `${length} ${100 - length}`;
    }

    return {
      root: {
        '--border-animate-radius': radius === undefined ? undefined : getRadius(radius),
        '--border-animate-offset': getSize(offset, 'border-animate-offset'),
        '--border-animate-z-index': `${resolveZIndex(zIndex, variant)}`,
        '--border-animate-duration': `${resolveDuration(duration, variant)}s`,
        '--border-animate-direction': reverse ? 'reverse' : 'normal',
        '--border-animate-width': getSize(borderWidth, 'border-animate-width'),
        '--border-animate-color-from': getThemeColor(colorFrom, theme),
        '--border-animate-color-to': getThemeColor(colorTo, theme),
        '--border-animate-phase': `-${phase ?? 0}s`,
        '--border-animate-blur': getSize(resolveBlur(blur, variant), 'border-animate-blur'),
        '--border-animate-opacity': `${borderOpacity ?? 1}`,
        '--border-animate-progress': `${value}`,
        // `initial` rather than unset: custom properties inherit, and a ring nested in a colorStops
        // ring (or in one with a timingFunction) would otherwise paint (or ease) like its parent.
        // On a custom property `initial` is the guaranteed-invalid value, so var() falls back.
        '--border-animate-gradient-background': gradientBackground ?? 'initial',
        '--border-animate-beam-stops': beamStops,
        // Deprecated and unread, see BorderAnimateCssVariables
        '--border-animate-beam-start': undefined,
        '--border-animate-beam-from': undefined,
        '--border-animate-beam-to': undefined,
        '--border-animate-beam-end': undefined,
        '--border-animate-size': dotSize,
        '--border-animate-timing': timingFunction ?? 'initial',
        '--border-animate-iterations': getIterations(iterations),
        '--border-animate-dasharray': dasharray,
        '--border-animate-dash-period': dashPeriod,
        '--border-animate-dash-cap': variant === 'dash' ? dashCap : undefined,
        '--border-animate-draw-offset': drawOffset,
        '--border-animate-track-color': trackColor
          ? getThemeColor(trackColor, theme)
          : 'var(--mantine-color-default-border)',
      },
    };
  }
);

const warned = new Set<string>();

/** One-time dev warning for props renamed in v3 */
function warnRenamed(props: Record<string, unknown>) {
  const renames: Record<string, string> = {
    angle: 'progress (0-100 along the perimeter, instead of 0-360 degrees)',
    delay: 'phase',
  };

  Object.keys(renames).forEach((key) => {
    if (props[key] !== undefined && !warned.has(key)) {
      warned.add(key);
      // eslint-disable-next-line no-console
      console.warn(
        `[@gfazioli/mantine-border-animate] The "${key}" prop was removed in v3. Use ${renames[key]}. See the Upgrade guide: https://gfazioli.github.io/mantine-border-animate/?t=migrations`
      );
    }
  });

  const mode = props.beamMode;

  if ((mode === 'path' || mode === 'conic') && !warned.has(`beamMode:${mode}`)) {
    warned.add(`beamMode:${mode}`);
    // eslint-disable-next-line no-console
    console.warn(
      `[@gfazioli/mantine-border-animate] beamMode="${mode}" was renamed in v3: use "${mode === 'path' ? 'dot' : 'wedge'}". See the Upgrade guide: https://gfazioli.github.io/mantine-border-animate/?t=migrations`
    );
  }
}

/**
 * Whether the element is inside the viewport, watched for one of two reasons: to `reveal` an
 * inView ring, or to `pause` a looping one. Until the first observation it assumes what costs
 * nothing to be wrong about: a looping ring is visible (so a server render and the first frame
 * never pause it, and the first report, almost always "visible", re-renders nothing), an
 * inView one is not (it fades in). Mantine's useInViewport starts at `false` for both, which
 * would pause every looping ring until its first report.
 */
function useVisible(ref: React.RefObject<HTMLElement | null>, watch: 'reveal' | 'pause' | null) {
  const [visible, setVisible] = React.useState(watch !== 'reveal');

  React.useEffect(() => {
    const node = ref.current;

    if (!watch || !node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    // A looping ring only pauses, so it may keep running a little past the edge: a ring pushed
    // out by `offset`, or a glow halo, is still in sight after the wrapper has left. inView
    // keeps the exact viewport, since that is what reveals it.
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[entries.length - 1].isIntersecting),
      watch === 'pause' ? { rootMargin: '25%' } : undefined
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [watch]);

  return visible;
}

/**
 * Pauses nothing by itself: while `paused` is true the stylesheet holds the ring still, and
 * when it turns false this moves the ring's animations forward by the time they spent paused.
 * The ring then resumes where it would have been had it kept running, so borders staggered
 * with `phase` stay in step. `run` names the animations the ring is made of: when it changes
 * during a pause (the ring shown, restarted, or switched to another variant), the new ones are
 * held from that moment, and that is the time they get back.
 */
function useCatchUp(getRing: () => Element | null, paused: boolean, run: string) {
  React.useEffect(() => {
    if (!paused) {
      return undefined;
    }

    const pausedAt = performance.now();
    // Only the CSS animations running when the pause (or this run) began: a transition (a
    // draw stroke, the trigger fade) is not paused by animation-play-state at all. getAnimations
    // with subtree reaches the ::after of the masked ring and every rect of the svg one, and
    // nothing of the children, which are not inside the ring.
    const animations = (getRing()?.getAnimations?.({ subtree: true }) ?? []).filter(
      (animation) => 'animationName' in animation
    );

    return () => {
      const elapsed = performance.now() - pausedAt;

      animations.forEach((animation) => {
        const time = animation.currentTime;

        if (animation.playState !== 'idle' && typeof time === 'number') {
          animation.currentTime = time + elapsed;
        }
      });
    };
  }, [paused, run]);
}

export const BorderAnimate = factory<BorderAnimateFactory>((_props) => {
  const { ref, ...restProps } = _props as typeof _props & { ref?: React.Ref<HTMLDivElement> };
  const props = useProps('BorderAnimate', defaultProps, restProps);

  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    warnRenamed(props as unknown as Record<string, unknown>);
  }

  const {
    children,
    variant,
    beamMode,
    duration,
    borderWidth,
    colorFrom,
    colorTo,
    colorStops,
    size,
    spread,
    tail,
    radius,
    offset,
    reverse,
    blur,
    phase,
    withMask,
    borderOpacity,
    zIndex,
    show,
    animate,
    progress,
    timingFunction,
    trigger,
    iterations,
    onComplete,
    respectReducedMotion,
    pauseOnHover,
    dashSize,
    dashGap,
    count,
    dashCap,
    withTrack,
    trackColor,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<BorderAnimateFactory>({
    name: 'BorderAnimate',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const rootRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(ref, rootRef);
  const borderRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const finite = getIterations(iterations) !== 'infinite';
  // Only a ring that loops can be paused off-screen. A finite run is left alone: it ends soon
  // anyway, and paused it would hold back an onComplete someone may be waiting for until the
  // ring happened to scroll back. A hidden, still or draw ring has nothing to pause.
  const loops = trigger === 'always' && !!show && !!animate && variant !== 'draw' && !finite;
  const visible = useVisible(rootRef, trigger === 'inView' ? 'reveal' : loops ? 'pause' : null);
  const offscreen = loops && !visible;
  useCatchUp(
    () => borderRef.current ?? svgRef.current,
    offscreen,
    `${show}:${animate}:${variant}:${beamMode}:${!!colorStops?.length}`
  );

  const theme = useMantineTheme();
  const complete = useCallbackRef(onComplete);

  // A finite run that someone listens to starts only once React can hear it end. Rendered on
  // the server, it could end before hydration attaches onAnimationEnd (at once, under reduced
  // motion), and the browser never replays the event. The layout effect runs before the first
  // client paint, so a ring mounted on the client starts without a visible delay.
  const listening = finite && onComplete !== undefined;
  const [mounted, setMounted] = React.useState(false);
  useIsomorphicEffect(() => {
    if (listening) {
      setMounted(true);
    }
  }, [listening]);

  const gradientId = `border-animate-${React.useId().replace(/:/g, '')}`;
  const stroke = usesStroke(variant, beamMode);
  const isComet = variant === 'beam' && beamMode === 'comet';
  // The comet grades its own segments with color-mix; every other stroke variant paints
  // a real SVG gradient, so colorStops and colorFrom/colorTo behave the same way here.
  const withGradient = !isComet;
  const stops = getStops(colorStops, colorFrom, colorTo, theme);
  const segments = isComet ? Array.from({ length: COMET_SEGMENTS }, (_, i) => i) : [];
  const tailStep = getCometStep(tail);
  // Without colorStops the stylesheet mixes colorFrom into colorTo along the tail itself
  const tailPalette =
    isComet && colorStops && colorStops.length > 0
      ? [...stops].sort((a, b) => a.position - b.position)
      : undefined;

  const ringProps = {
    'data-variant': variant,
    'data-animate': animate,
    'data-beam-mode': variant === 'beam' ? beamMode : undefined,
  } as const;

  // Every animation of a ring shares the same duration, delay and count, so one of them is
  // enough to tell when the last lap is over: the masked ring has a single ::after, and the
  // svg ring reports it from its first stroke (the comet's head). Under reduced motion every
  // animation ends at once, an infinite one included (and a never one, held paused), and only
  // a finite run that may animate has laps to report.
  // The masked ring animates its ::after only, so an animation a consumer puts on the element
  // itself (through styles) is not ours.
  const handleAnimationEnd = (event: React.AnimationEvent<Element>) => {
    if (
      finite &&
      trigger !== 'never' &&
      (event.currentTarget !== borderRef.current || event.pseudoElement === '::after')
    ) {
      complete();
    }
  };

  return (
    <Box
      ref={mergedRef}
      {...getStyles('root')}
      data-pause-on-hover={pauseOnHover && trigger !== 'hover' ? true : undefined}
      data-trigger={trigger === 'always' ? undefined : trigger}
      data-active={trigger === 'inView' ? visible : undefined}
      data-offscreen={offscreen || undefined}
      data-pending={(listening && !mounted) || undefined}
      data-reduced-motion={
        (respectReducedMotion ?? theme.respectReducedMotion) ? 'respect' : undefined
      }
      {...others}
    >
      {show &&
        (stroke ? (
          <svg
            ref={svgRef}
            {...getStyles('svg')}
            {...ringProps}
            aria-hidden="true"
            focusable="false"
          >
            {withGradient && (
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  {stops.map((s, i) => (
                    <stop key={i} offset={`${s.position}%`} stopColor={s.color} />
                  ))}
                </linearGradient>
              </defs>
            )}

            {/* width/height are attributes as well as CSS: an engine without the SVG 2
                geometry properties would otherwise draw a zero-sized rect and show nothing,
                instead of a ring with slightly blunter corners. */}
            {withTrack && !isComet && (
              <rect {...getStyles('track')} width="100%" height="100%" pathLength="100" />
            )}

            {isComet ? (
              segments.map((i) => {
                const along = (i / Math.max(COMET_SEGMENTS - 1, 1)) * 100;

                return (
                  <rect
                    key={i}
                    {...getStyles('stroke', {
                      style: {
                        '--border-animate-segment': `${i * tailStep * (reverse ? -1 : 1)}`,
                        '--border-animate-segment-opacity': `${((1 - i / COMET_SEGMENTS) ** 1.6).toFixed(4)}`,
                        '--border-animate-segment-mix': `${along}%`,
                        '--border-animate-segment-color': tailPalette
                          ? samplePalette(tailPalette, along)
                          : undefined,
                      } as React.CSSProperties,
                    })}
                    onAnimationEnd={i === 0 ? handleAnimationEnd : undefined}
                    width="100%"
                    height="100%"
                    pathLength="100"
                  />
                );
              })
            ) : (
              <rect
                {...getStyles('stroke', {
                  style: withGradient
                    ? ({ stroke: `url(#${gradientId})` } as React.CSSProperties)
                    : undefined,
                })}
                onAnimationEnd={variant === 'draw' ? undefined : handleAnimationEnd}
                width="100%"
                height="100%"
                pathLength="100"
              />
            )}
          </svg>
        ) : (
          <Box
            ref={borderRef}
            {...getStyles('border', { variant })}
            variant={variant}
            onAnimationEnd={handleAnimationEnd}
            aria-hidden="true"
            data-with-mask={resolveWithMask(withMask, variant)}
            data-animate={animate}
            data-beam-mode={variant === 'beam' ? beamMode : undefined}
            data-color-stops={
              variant === 'beam' && beamMode === 'wedge' && colorStops && colorStops.length > 0
                ? true
                : undefined
            }
          />
        ))}
      {children}
    </Box>
  );
});

BorderAnimate.classes = classes;
BorderAnimate.displayName = 'BorderAnimate';
