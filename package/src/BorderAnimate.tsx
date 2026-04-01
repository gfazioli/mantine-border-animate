import React from 'react';
import {
  Box,
  createVarsResolver,
  Factory,
  factory,
  getRadius,
  getSize,
  getThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
  type BoxProps,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
} from '@mantine/core';
import classes from './BorderAnimate.module.css';

/** Available border animation variants */
export type BorderAnimateVariant = 'beam' | 'glow' | 'pulse';

/** Beam rendering mode */
export type BorderAnimateBeamMode = 'conic' | 'path';

/** A single color stop for multi-color beam gradients */
export interface BorderAnimateColorStop {
  /** Color value (any MantineColor, e.g. 'red.5', '#ff0000', 'rgba(...)') */
  color: MantineColor;
  /** Position along the gradient in percentage (0-100) */
  position: number;
}

export type BorderAnimateStylesNames = 'root' | 'border';

export type BorderAnimateCssVariables = {
  root: '--border-animate-radius';
  border:
    | '--border-animate-z-index'
    | '--border-animate-duration'
    | '--border-animate-direction'
    | '--border-animate-width'
    | '--border-animate-color-from'
    | '--border-animate-color-to'
    | '--border-animate-delay'
    | '--border-animate-blur'
    | '--border-animate-opacity'
    | '--border-animate-static-angle'
    | '--border-animate-gradient-background'
    | '--border-animate-beam-start'
    | '--border-animate-beam-from'
    | '--border-animate-beam-to'
    | '--border-animate-beam-end'
    | '--border-animate-size'
    | '--border-animate-timing';
};

/** Map MantineSize to angular spread percentage for conic beam wedge */
function getBeamSpread(size: MantineSize | (string & {}) | number | undefined): number {
  if (typeof size === 'number') {
    return size;
  }

  const map: Record<string, number> = { xs: 5, sm: 10, md: 20, lg: 35, xl: 50 };
  return map[size as string] ?? 10;
}

export interface BorderAnimateBaseProps {
  children?: React.ReactNode;

  /** Animation variant type
   * @default 'beam'
   */
  variant?: BorderAnimateVariant;

  /** Beam rendering mode (beam variant only).
   * - `conic`: rotating conic-gradient — smooth rotation, beam width varies on rectangles
   * - `path`: radial-gradient traveling along the border via offset-path — constant speed
   *   along the perimeter, uniform beam size
   * @default 'path'
   */
  beamMode?: BorderAnimateBeamMode;

  /** Animation duration in seconds
   * @default 5
   */
  duration?: number;

  /** Border width
   * @default 'xs'
   */
  borderWidth?: MantineSize | (string & {}) | number;

  /** Starting color of the beam wedge or glow/pulse gradient.
   * Used when colorStops is not provided.
   * @default 'yellow.6'
   */
  colorFrom?: MantineColor;

  /** Ending color of the beam wedge or glow/pulse gradient.
   * Used when colorStops is not provided.
   * @default 'violet.6'
   */
  colorTo?: MantineColor;

  /** Color stops for the beam conic-gradient. When provided, overrides
   * colorFrom/colorTo and gives full control over the rotating gradient.
   * Each stop has a color (any MantineColor) and a position (0-100).
   * Stops should be provided in ascending position order.
   */
  colorStops?: BorderAnimateColorStop[];

  /** Beam size.
   * - For beamMode="conic": angular spread of the wedge (xs=18°..xl=180° or number 0-50)
   * - For beamMode="path": pixel size of the traveling circle (xs..xl or number)
   * @default 'sm'
   */
  size?: MantineSize | (string & {}) | number;

  /** Border radius
   * @default 'md'
   */
  radius?: MantineRadius | (string & {}) | number;

  /** Reverse the animation direction
   * @default false
   */
  reverse?: boolean;

  /** Blur amount for the effect
   * @default 'xs'
   */
  blur?: MantineSize | (string & {}) | number;

  /** Animation delay in seconds.
   * A positive value makes the animation start as if it had already been
   * running for that many seconds (useful for staggering multiple borders).
   * @default 0
   */
  delay?: number;

  /** Show/hide the mask that clips the effect to the border
   * @default true
   */
  withMask?: boolean;

  /** z-index of the border element
   * @default 1
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

  /** Initial angle when animate is false (0-360 degrees).
   * Controls the rotation angle or position along the border path.
   * @default 0
   */
  angle?: number;

  /** Opacity of the animated border effect (0 to 1).
   * This controls the border effect opacity, not the component opacity.
   * @default 1
   */
  borderOpacity?: number;

  /** CSS animation timing function.
   * @default 'linear' for beam, 'ease-in-out' for glow/pulse
   */
  timingFunction?: string;

  /** Pause the animation when the user hovers over the component.
   * @default false
   */
  pauseOnHover?: boolean;
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
  beamMode: 'path',
  duration: 5,
  borderWidth: 'xs',
  radius: 'md',
  size: 'sm',
  blur: 'xs',
  colorFrom: 'yellow.6',
  colorTo: 'violet.6',
  reverse: false,
  delay: 0,
  withMask: true,
  zIndex: 1,
  show: true,
  animate: true,
  angle: 0,
  borderOpacity: 1,
  pauseOnHover: false,
};

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
      delay,
      blur,
      borderOpacity,
      zIndex,
      radius,
      angle,
      variant,
      timingFunction,
      beamMode,
    }
  ) => {
    let gradientBackground: string | undefined;
    let beamStart: string | undefined;
    let beamFrom: string | undefined;
    let beamTo: string | undefined;
    let beamEnd: string | undefined;
    let beamSize: string | undefined;

    if (variant === 'beam') {
      if (beamMode === 'path') {
        // Path mode: size is pixel-based for the traveling circle
        beamSize = getSize(size, 'border-animate-size');

        if (colorStops && colorStops.length > 0) {
          // Path mode with colorStops: radial-gradient with custom stops
          const stops = colorStops
            .map((s) => `${getThemeColor(s.color, theme)} ${s.position}%`)
            .join(', ');
          gradientBackground = `radial-gradient(ellipse at center, ${stops})`;
        }
      } else if (colorStops && colorStops.length > 0) {
        // Conic mode with colorStops: full gradient generated in JS
        const stops = colorStops
          .map((s) => `${getThemeColor(s.color, theme)} ${s.position}%`)
          .join(', ');
        gradientBackground = `conic-gradient(from 0deg, ${stops})`;
      } else {
        // Conic mode default: wedge positions for CSS-built gradient
        const spread = getBeamSpread(size);
        const half = spread / 2;
        beamStart = `${50 - half}%`;
        beamFrom = `${50 - half / 2}%`;
        beamTo = `${50 + half / 2}%`;
        beamEnd = `${50 + half}%`;
      }
    }

    return {
      root: {
        '--border-animate-radius': radius === undefined ? undefined : getRadius(radius),
      },
      border: {
        '--border-animate-z-index': `${zIndex}`,
        '--border-animate-duration': `${duration}s`,
        '--border-animate-direction': reverse ? 'reverse' : 'normal',
        '--border-animate-width': getSize(borderWidth, 'border-animate-width'),
        '--border-animate-color-from': getThemeColor(colorFrom, theme),
        '--border-animate-color-to': getThemeColor(colorTo, theme),
        '--border-animate-delay': `-${delay}s`,
        '--border-animate-blur': getSize(blur, 'border-animate-blur'),
        '--border-animate-opacity': `${borderOpacity ?? 1}`,
        '--border-animate-static-angle': `${angle ?? 0}`,
        '--border-animate-gradient-background': gradientBackground,
        '--border-animate-beam-start': beamStart,
        '--border-animate-beam-from': beamFrom,
        '--border-animate-beam-to': beamTo,
        '--border-animate-beam-end': beamEnd,
        '--border-animate-size': beamSize,
        '--border-animate-timing': timingFunction,
      },
    };
  }
);

export const BorderAnimate = factory<BorderAnimateFactory>((_props) => {
  const props = useProps('BorderAnimate', defaultProps, _props);

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
    radius,
    reverse,
    blur,
    delay,
    withMask,
    borderOpacity,
    zIndex,
    show,
    animate,
    angle,
    timingFunction,
    pauseOnHover,

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

  return (
    <Box {...getStyles('root')} data-pause-on-hover={pauseOnHover || undefined} {...others}>
      {show && (
        <Box
          {...getStyles('border', { variant })}
          variant={variant}
          data-with-mask={withMask}
          data-animate={animate}
          data-beam-mode={variant === 'beam' ? (beamMode ?? 'path') : undefined}
          data-color-stops={
            variant === 'beam' && beamMode !== 'path' && colorStops && colorStops.length > 0
              ? true
              : undefined
          }
        />
      )}
      {children}
    </Box>
  );
});

BorderAnimate.classes = classes;
BorderAnimate.displayName = 'BorderAnimate';
