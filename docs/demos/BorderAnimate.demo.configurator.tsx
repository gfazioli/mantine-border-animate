import { BorderAnimate, BorderAnimateProps } from '@gfazioli/mantine-border-animate';
import { Flex, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: BorderAnimateProps & { w: number; h: number }) {
  return (
    <Flex p={32} pos="relative" style={{ zIndex: 1 }} justify="center">
      <BorderAnimate {...props}>
        <Flex
          flex={1}
          direction="column"
          align="center"
          justify="center"
          h="100%"
          style={{
            borderRadius: 'inherit',
            backgroundColor: 'var(--mantine-color-default)',
          }}
        >
          <Title>Animate Border</Title>
          <Text>This is an example of BorderAnimate component</Text>
        </Flex>
      </BorderAnimate>
    </Flex>
  );
}

const code = `
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Text, Title } from '@mantine/core';

function Demo() {
  return (
    <BorderAnimate {{props}}>
      <Flex flex={1} direction="column" align="center" justify="center" h="100%" style={{ borderRadius: 'inherit', backgroundColor: 'var(--mantine-color-default)',}}>
        <Title>Animate Border</Title>
        <Text>This is an example of BorderAnimate component</Text>
      </Flex>
    </BorderAnimate>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  dimmed: true,
  centered: true,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  controls: [
    {
      type: 'select',
      prop: 'variant',
      initialValue: 'beam',
      libraryValue: 'beam',
      data: [
        { value: 'beam', label: 'Beam' },
        { value: 'glow', label: 'Glow' },
        { value: 'pulse', label: 'Pulse' },
        { value: 'draw', label: 'Draw' },
        { value: 'dash', label: 'Dash' },
      ],
    },
    {
      type: 'select',
      prop: 'beamMode',
      initialValue: 'dot',
      libraryValue: 'dot',
      data: [
        { value: 'dot', label: 'Dot' },
        { value: 'wedge', label: 'Wedge' },
        { value: 'comet', label: 'Comet' },
      ],
    },
    {
      type: 'select',
      prop: 'trigger',
      initialValue: 'always',
      libraryValue: 'always',
      data: [
        { value: 'always', label: 'Always' },
        { value: 'hover', label: 'Hover' },
        { value: 'focus-within', label: 'Focus within' },
        { value: 'inView', label: 'In view' },
        { value: 'never', label: 'Never' },
      ],
    },

    { type: 'boolean', prop: 'show', initialValue: true, libraryValue: true },
    { type: 'boolean', prop: 'animate', initialValue: true, libraryValue: true },
    { type: 'boolean', prop: 'reverse', initialValue: false, libraryValue: false },
    { type: 'boolean', prop: 'pauseOnHover', initialValue: false, libraryValue: false },
    { type: 'boolean', prop: 'withTrack', initialValue: false, libraryValue: false },

    {
      type: 'segmented',
      prop: 'dashCap',
      initialValue: 'butt',
      libraryValue: 'butt',
      data: [
        { value: 'butt', label: 'Butt' },
        { value: 'round', label: 'Round' },
      ],
    },

    { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
    { type: 'size', prop: 'borderWidth', initialValue: 'xs', libraryValue: 'xs' },
    // blur and duration have per-variant defaults, so there is no single library value to
    // compare against: an impossible one keeps them in the generated snippet, which is what
    // makes the snippet render exactly what the playground shows.
    { type: 'size', prop: 'blur', initialValue: 'xs', libraryValue: '' },
    {
      prop: 'offset',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 2,
      min: 0,
      max: 40,
    },

    {
      prop: 'w',
      type: 'number',
      initialValue: 480,
      libraryValue: 480,
      step: 10,
      min: 410,
      max: 480,
    },
    {
      prop: 'h',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      step: 10,
      min: 160,
      max: 480,
    },

    {
      prop: 'duration',
      type: 'number',
      initialValue: 5,
      libraryValue: -1,
      step: 0.1,
      min: 0.5,
      max: 60,
    },
    {
      prop: 'phase',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 0.5,
      min: 0,
      max: 10,
    },
    {
      prop: 'progress',
      type: 'number',
      initialValue: 100,
      libraryValue: 100,
      step: 1,
      min: 0,
      max: 100,
    },
    {
      prop: 'spread',
      type: 'number',
      initialValue: 36,
      libraryValue: 36,
      step: 2,
      min: 2,
      max: 360,
    },
    {
      prop: 'tail',
      type: 'number',
      initialValue: 25,
      libraryValue: 25,
      step: 1,
      min: 1,
      max: 100,
    },
    {
      prop: 'borderOpacity',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },

    {
      prop: 'dashSize',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      step: 0.5,
      min: 0.5,
      max: 25,
    },
    {
      prop: 'dashGap',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      step: 0.5,
      min: 0,
      max: 25,
    },
    // 0 means "not set": the component falls back to dashSize/dashGap, and the snippet
    // leaves count out entirely.
    { prop: 'count', type: 'number', initialValue: 0, libraryValue: 0, step: 1, min: 0, max: 16 },

    { type: 'color', prop: 'colorFrom', initialValue: 'yellow.6', libraryValue: 'yellow.6' },
    { type: 'color', prop: 'colorTo', initialValue: 'violet.6', libraryValue: 'violet.6' },
    { type: 'color', prop: 'trackColor', initialValue: 'gray.6', libraryValue: '' },
  ],
};
