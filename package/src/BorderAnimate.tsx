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
import { useInViewport, useMergedRef } from '@mantine/hooks';
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
    | '--border-animate-beam-start'
    | '--border-animate-beam-from'
    | '--border-animate-beam-to'
    | '--border-animate-beam-end'
    | '--border-animate-size'
    | '--border-animate-timing'
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
 * Angular positions of the wedge color stops, as conic-gradient percentages.
 * `spread` is the visible width of the wedge in degrees.
 */
function getWedgeStops(spread: number) {
  const half = Math.min(Math.max(spread, 0), 360) / 2 / 3.6;

  return {
    start: `${50 - half}%`,
    from: `${50 - half / 2}%`,
    to: `${50 + half / 2}%`,
    end: `${50 + half}%`,
  };
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
   * Ignored by `beamMode="comet"`, which grades its own segments between colorFrom and
   * colorTo instead of painting a gradient.
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
   * - `always`: animates continuously
   * - `hover` / `focus-within`: fades in and animates while the wrapper is hovered/focused
   * - `inView`: animates while the component is inside the viewport
   * - `never`: renders the border in its resting state
   * @default 'always'
   */
  trigger?: BorderAnimateTrigger;

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
    }
  ) => {
    const stroke = usesStroke(variant, beamMode);
    // Clamped here and nowhere else: the stylesheet feeds this number to offset-distance,
    // to an angle and to a dash offset, and a negative percentage silently drops the
    // declaration it lands in.
    const value = Math.min(Math.max(progress ?? 100, 0), 100);

    let gradientBackground: string | undefined;
    let beamStart: string | undefined;
    let beamFrom: string | undefined;
    let beamTo: string | undefined;
    let beamEnd: string | undefined;
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
        const stops = getWedgeStops(spread ?? 36);
        beamStart = stops.start;
        beamFrom = stops.from;
        beamTo = stops.to;
        beamEnd = stops.end;
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
        '--border-animate-gradient-background': gradientBackground,
        '--border-animate-beam-start': beamStart,
        '--border-animate-beam-from': beamFrom,
        '--border-animate-beam-to': beamTo,
        '--border-animate-beam-end': beamEnd,
        '--border-animate-size': dotSize,
        '--border-animate-timing': timingFunction,
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

  const { ref: inViewRef, inViewport } = useInViewport<HTMLDivElement>();
  const mergedRef = useMergedRef(ref, trigger === 'inView' ? inViewRef : null);

  const theme = useMantineTheme();
  const gradientId = `border-animate-${React.useId().replace(/:/g, '')}`;
  const stroke = usesStroke(variant, beamMode);
  const isComet = variant === 'beam' && beamMode === 'comet';
  // The comet grades its own segments with color-mix; every other stroke variant paints
  // a real SVG gradient, so colorStops and colorFrom/colorTo behave the same way here.
  const withGradient = !isComet;
  const stops = withGradient ? getStops(colorStops, colorFrom, colorTo, theme) : [];
  const segments = isComet ? Array.from({ length: COMET_SEGMENTS }, (_, i) => i) : [];
  const tailStep = getCometStep(tail);

  const ringProps = {
    'data-variant': variant,
    'data-animate': animate,
    'data-beam-mode': variant === 'beam' ? beamMode : undefined,
  } as const;

  return (
    <Box
      ref={mergedRef}
      {...getStyles('root')}
      data-pause-on-hover={pauseOnHover && trigger !== 'hover' ? true : undefined}
      data-trigger={trigger === 'always' ? undefined : trigger}
      data-active={trigger === 'inView' ? inViewport : undefined}
      {...others}
    >
      {show &&
        (stroke ? (
          <svg {...getStyles('svg')} {...ringProps} aria-hidden="true" focusable="false">
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
              segments.map((i) => (
                <rect
                  key={i}
                  {...getStyles('stroke', {
                    style: {
                      '--border-animate-segment': `${i * tailStep * (reverse ? -1 : 1)}`,
                      '--border-animate-segment-opacity': `${((1 - i / COMET_SEGMENTS) ** 1.6).toFixed(4)}`,
                      '--border-animate-segment-mix': `${(i / Math.max(COMET_SEGMENTS - 1, 1)) * 100}%`,
                    } as React.CSSProperties,
                  })}
                  width="100%"
                  height="100%"
                  pathLength="100"
                />
              ))
            ) : (
              <rect
                {...getStyles('stroke', {
                  style: withGradient
                    ? ({ stroke: `url(#${gradientId})` } as React.CSSProperties)
                    : undefined,
                })}
                width="100%"
                height="100%"
                pathLength="100"
              />
            )}
          </svg>
        ) : (
          <Box
            {...getStyles('border', { variant })}
            variant={variant}
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
