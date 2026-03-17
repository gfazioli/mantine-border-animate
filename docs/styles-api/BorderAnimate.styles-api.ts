import type { BorderAnimateFactory } from '@gfazioli/mantine-border-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const BorderAnimateStylesApi: StylesApiData<BorderAnimateFactory> = {
  selectors: {
    root: 'Root element',
    border: 'Animated border element',
  },

  vars: {
    root: {
      '--border-animate-radius': 'Border radius for the animated border',
    },
    border: {
      '--border-animate-z-index': 'Z-index of the animated border',
      '--border-animate-duration': 'Animation duration in seconds',
      '--border-animate-direction': 'Animation direction, normal or reverse',
      '--border-animate-width': 'Width of the animated border',
      '--border-animate-color-from': 'Starting color of the animated border gradient',
      '--border-animate-color-to': 'Ending color of the animated border gradient',
      '--border-animate-delay': 'Delay before the animation starts in seconds',
      '--border-animate-blur': 'Blur amount applied to the animated border',
      '--border-animate-opacity': 'Opacity of the animated border',
      '--border-animate-static-angle': 'Static angle for the animated border effect',
      '--border-animate-gradient-background':
        'Full conic-gradient string for beam background (set via colorStops prop)',
      '--border-animate-beam-start': 'Start position of the beam wedge transparent zone (%)',
      '--border-animate-beam-from': 'Position where colorFrom starts in the beam wedge (%)',
      '--border-animate-beam-to': 'Position where colorTo ends in the beam wedge (%)',
      '--border-animate-beam-end': 'End position of the beam wedge transparent zone (%)',
      '--border-animate-timing': 'CSS animation timing function (e.g. linear, ease-in-out)',
    },
  },

  //modifiers: [{ selector: 'root' }],
};
