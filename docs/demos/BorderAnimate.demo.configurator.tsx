import { BorderAnimate, BorderAnimateProps } from '@gfazioli/mantine-border-animate';
import { Flex, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: BorderAnimateProps) {
  return (
    <Flex p={32} pos="relative" style={{ zIndex: 1 }}>
      <BorderAnimate {...props} w={480} h={400}>
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
import { BorderAnimate, BorderAnimateProps } from '@gfazioli/mantine-border-animate';
import { Flex, Text, Title } from '@mantine/core';

function Demo() {
  return (
    <BorderAnimate {{props}} w={500} h={400}>
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
        { value: 'gradient', label: 'Gradient' },
        { value: 'pulse', label: 'Pulse' },
      ],
    },
    { type: 'boolean', prop: 'show', initialValue: true, libraryValue: true },
    { type: 'boolean', prop: 'animate', initialValue: true, libraryValue: true },
    { type: 'boolean', prop: 'reverse', initialValue: false, libraryValue: false },

    { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
    { type: 'size', prop: 'borderWidth', initialValue: 'xs', libraryValue: 'xs' },
    { type: 'size', prop: 'blur', initialValue: 'xs', libraryValue: 'xs' },
    {
      prop: 'duration',
      type: 'number',
      initialValue: 5,
      libraryValue: 5,
      step: 0.1,
      min: 0.5,
      max: 60,
    },
    { type: 'color', prop: 'colorFrom', initialValue: 'yellow.6', libraryValue: 'yellow.6' },
    { type: 'color', prop: 'colorTo', initialValue: 'violet.6', libraryValue: 'violet.6' },
  ],
};
