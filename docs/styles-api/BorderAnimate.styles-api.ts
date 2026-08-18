import type { BorderAnimateFactory } from '@gfazioli/mantine-border-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const BorderAnimateStylesApi: StylesApiData<BorderAnimateFactory> = {
  selectors: {
    root: 'Root element',
    border: 'Masked ring element, used by the beam (dot and wedge), glow and pulse variants',
    svg: 'SVG ring element, used by the draw and dash variants and by the comet beam',
    track: 'Full perimeter rendered underneath the effect, when withTrack is set',
    stroke: 'Animated stroke of the SVG ring (one element per segment for the comet)',
  },

  vars: {
    root: {
      '--border-animate-radius': 'Border radius of the animated border',
      '--border-animate-offset': 'Distance between the ring and the element bounds',
      '--border-animate-z-index': 'Z-index of the animated border',
      '--border-animate-duration': 'Animation duration in seconds',
      '--border-animate-direction': 'Animation direction, normal or reverse',
      '--border-animate-width': 'Width of the animated border',
      '--border-animate-color-from': 'Starting color of the animated border gradient',
      '--border-animate-color-to': 'Ending color of the animated border gradient',
      '--border-animate-phase': 'Negated animation phase in seconds',
      '--border-animate-blur': 'Blur amount applied to the animated border',
      '--border-animate-opacity': 'Opacity of the animated border',
      '--border-animate-progress':
        'Position along the perimeter, as a number from 0 to 100. For the draw variant it is how much of the perimeter is drawn instead',
      '--border-animate-size': 'Pixel size of the traveling dot (dot beam mode only)',
      '--border-animate-gradient-background':
        'Full gradient string for the beam background (set via the colorStops prop)',
      '--border-animate-beam-start': 'Start position of the wedge transparent zone (%)',
      '--border-animate-beam-from': 'Position where colorFrom starts in the wedge (%)',
      '--border-animate-beam-to': 'Position where colorTo ends in the wedge (%)',
      '--border-animate-beam-end': 'End position of the wedge transparent zone (%)',
      '--border-animate-timing': 'CSS animation timing function (e.g. linear, ease-in-out)',
      '--border-animate-dasharray': 'Dash pattern of the SVG ring, in perimeter percentages',
      '--border-animate-dash-period': 'Length of one dash cycle, in perimeter percentages',
      '--border-animate-dash-cap': 'Line cap of the dash segments',
      '--border-animate-draw-offset': 'Perimeter percentage still to be drawn',
      '--border-animate-track-color': 'Color of the track',
    },
  },

  //modifiers: [{ selector: 'root' }],
};
