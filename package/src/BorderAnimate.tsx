import React from 'react';
import {
  Box,
  createVarsResolver,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
  type BoxProps,
  type MantineColor,
} from '@mantine/core';
import classes from './BorderAnimate.module.css';

/** Available border animation effects */
export type BorderAnimateEffect = 'beam' | 'glow' | 'gradient' | 'pulse';

export type BorderAnimateStylesNames = 'root' | 'border';

export type BorderAnimateCssVariables = {
  root: '--border-animate-radius';
  border:
    | '--border-animate-duration'
    | '--border-animate-direction'
    | '--border-animate-width'
    | '--border-animate-size'
    | '--border-animate-color-from'
    | '--border-animate-color-to'
    | '--border-animate-delay'
    | '--border-animate-blur'
    | '--border-animate-opacity'
    | '--border-animate-anchor';
};

export interface BorderAnimateBaseProps {
  children?: React.ReactNode;

  /** Animation effect type
   * @default 'beam'
   */
  effect?: BorderAnimateEffect;

  /** Animation duration in seconds
   * @default 5
   */
  duration?: number;

  /** Border width in pixels
   * @default 2
   */
  borderWidth?: number;

  /** Starting color of the gradient
   * @default '#ffaa40'
   */
  colorFrom?: MantineColor;

  /** Ending color of the gradient
   * @default '#9c40ff'
   */
  colorTo?: MantineColor;

  /** Size of the beam/glow in pixels (only for beam effect)
   * @default 200
   */
  size?: number;

  /** Border radius in pixels
   * @default 12
   */
  radius?: number;

  /** Reverse the animation direction
   * @default false
   */
  reverse?: boolean;

  /** Blur amount for the effect in pixels
   * @default 0
   */
  blur?: number;

  /** Animation delay in seconds
   * @default 0
   */
  delay?: number;

  /** Show/hide the mask that clips the effect to the border
   * @default true
   */
  showMask?: boolean;

  /** z-index of the border element
   * @default 1
   */
  zIndex?: number;

  /** Controls how far inward the beam follows the border path (in pixels).
   * 0 = follows the outer edge, positive values move the path inward.
   * @default 0
   */
  anchor?: number;
}

export interface BorderAnimateProps
  extends BoxProps,
    BorderAnimateBaseProps,
    StylesApiProps<BorderAnimateFactory> {}

export type BorderAnimateFactory = Factory<{
  props: BorderAnimateProps;
  ref: HTMLDivElement;
  stylesNames: BorderAnimateStylesNames;
  vars: BorderAnimateCssVariables;
}>;

export const defaultProps: Partial<BorderAnimateProps> = {
  effect: 'beam',
  duration: 5,
  borderWidth: 1,
  radius: 12,
  size: 200,
  blur: 0,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
  reverse: false,
  delay: 0,
  showMask: true,
  zIndex: 1,
  anchor: 0,
};

const varsResolver = createVarsResolver<BorderAnimateFactory>(
  (
    _,
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
    }
  ) => {
    return {
      root: {
        '--border-animate-radius': `${radius}`,
      },
      border: {
        '--border-animate-z-index': `${zIndex}`,
        '--border-animate-duration': `${duration}s`,
        '--border-animate-direction': reverse ? 'reverse' : 'normal',
        '--border-animate-width': `${borderWidth}`,
        '--border-animate-size': `${size}`,
        '--border-animate-color-from': colorFrom ?? '#ffaa40',
        '--border-animate-color-to': colorTo ?? '#9c40ff',
        '--border-animate-delay': `-${delay}s`,
        '--border-animate-blur': `${blur ?? 0}px`,
        '--border-animate-opacity': `${opacity ?? 1}`,
        '--border-animate-anchor': `${anchor ?? 0}`,
      },
    };
  }
);

export const BorderAnimate = factory<BorderAnimateFactory>((_props, ref) => {
  const props = useProps('BorderAnimate', defaultProps, _props);

  const {
    children,
    effect,
    duration,
    borderWidth,
    colorFrom,
    colorTo,
    size,
    radius,
    reverse,
    blur,
    delay,
    showMask,
    opacity,
    zIndex,
    anchor,

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
      <Box {...getStyles('border')} data-effect={effect} data-show-mask={showMask} />
      {children}
    </Box>
  );
});

BorderAnimate.classes = classes;
BorderAnimate.displayName = 'BorderAnimate';
