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
export type BorderAnimateVariant = 'beam' | 'glow' | 'gradient' | 'pulse';

export type BorderAnimateStylesNames = 'root' | 'border';

export type BorderAnimateCssVariables = {
  root: '--border-animate-radius';
  border:
    | '--border-animate-z-index'
    | '--border-animate-duration'
    | '--border-animate-direction'
    | '--border-animate-width'
    | '--border-animate-size'
    | '--border-animate-color-from'
    | '--border-animate-color-to'
    | '--border-animate-delay'
    | '--border-animate-blur'
    | '--border-animate-opacity'
    | '--border-animate-anchor'
    | '--border-animate-static-angle';
};

export interface BorderAnimateBaseProps {
  children?: React.ReactNode;

  /** Animation variant type
   * @default 'beam'
   */
  variant?: BorderAnimateVariant;

  /** Animation duration in seconds
   * @default 5
   */
  duration?: number;

  /** Border width
   * @default 'xs'
   */
  borderWidth?: MantineSize | (string & {}) | number;

  /** Starting color of the gradient
   * @default 'yellow.6'
   */
  colorFrom?: MantineColor;

  /** Ending color of the gradient
   * @default 'violet.6'
   */
  colorTo?: MantineColor;

  /** Size of the beam/glow (only for beam effect)
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

  /** Animation delay in seconds
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

  /** Controls how far inward the beam follows the border path (in pixels).
   * 0 = follows the outer edge, positive values move the path inward.
   * @default 0
   */
  anchor?: number;

  /** Show/hide the animated border
   * @default true
   */
  show?: boolean;

  /** Enable/disable the animation
   * @default true
   */
  animate?: boolean;

  /** Initial angle/position when animate is false (0-360 degrees).
   * For beam variant: controls the position along the border path.
   * For gradient/glow/pulse variants: controls the gradient angle.
   * @default 0
   */
  angle?: number;
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
  anchor: 0,
  show: true,
  animate: true,
  angle: 0,
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
      size,
      delay,
      blur,
      opacity,
      zIndex,
      radius,
      anchor,
      angle,
    }
  ) => {
    return {
      root: {
        '--border-animate-radius': radius === undefined ? undefined : getRadius(radius),
      },
      border: {
        '--border-animate-z-index': `${zIndex}`,
        '--border-animate-duration': `${duration}s`,
        '--border-animate-direction': reverse ? 'reverse' : 'normal',
        '--border-animate-width': getSize(borderWidth, 'border-animate-width'),
        '--border-animate-size': getSize(size, 'border-animate-size'),
        '--border-animate-color-from': getThemeColor(colorFrom, theme),
        '--border-animate-color-to': getThemeColor(colorTo, theme),
        '--border-animate-delay': `-${delay}s`,
        '--border-animate-blur': getSize(blur, 'border-animate-blur'),
        '--border-animate-opacity': `${opacity ?? 1}`,
        '--border-animate-anchor': `${anchor ?? 0}`,
        '--border-animate-static-angle': `${angle ?? 0}`,
      },
    };
  }
);

export const BorderAnimate = factory<BorderAnimateFactory>((_props, ref) => {
  const props = useProps('BorderAnimate', defaultProps, _props);

  const {
    children,
    variant,
    duration,
    borderWidth,
    colorFrom,
    colorTo,
    size,
    radius,
    reverse,
    blur,
    delay,
    withMask,
    opacity,
    zIndex,
    anchor,
    show,
    animate,
    angle,

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
    <Box ref={ref} {...getStyles('root')} {...others}>
      {show && (
        <Box
          {...getStyles('border', { variant })}
          variant={variant}
          data-with-mask={withMask}
          data-animate={animate}
        />
      )}
      {children}
    </Box>
  );
});

BorderAnimate.classes = classes;
BorderAnimate.displayName = 'BorderAnimate';
