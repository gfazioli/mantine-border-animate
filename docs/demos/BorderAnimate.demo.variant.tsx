import { BorderAnimate, type BorderAnimateProps } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Stack, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { Window } from '@gfazioli/mantine-window';
import { Box, Title } from '@mantine/core';
import { h } from "../components/MdxElements/MdxElements";

function Demo() {
  return (
    <Flex>
      <BorderAnimate {{props}} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
          </Stack>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo(props: BorderAnimateProps) {
  return (
    <Flex justify="center" align="center" direction="column" h={400}>
      <BorderAnimate {...props} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
          </Stack>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export const variant: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  minHeight: 400,
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
  ],
};
