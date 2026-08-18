import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text } from '@mantine/core';

function Demo() {
  return (
    <Flex gap={48} p={48} wrap="wrap" justify="center">
      {/* On the element bounds, as usual */}
      <BorderAnimate borderWidth="sm" beamMode="comet">
        <Paper radius="md" p="md" w={150}>
          <Text fw={600}>offset={0}</Text>
        </Paper>
      </BorderAnimate>

      {/* Detached: the ring grows its radius by the same amount to stay concentric */}
      <BorderAnimate borderWidth="sm" beamMode="comet" offset={8}>
        <Paper radius="md" p="md" w={150}>
          <Text fw={600}>offset={8}</Text>
        </Paper>
      </BorderAnimate>

      <BorderAnimate borderWidth="sm" beamMode="comet" offset="lg">
        <Paper radius="md" p="md" w={150}>
          <Text fw={600}>offset="lg"</Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap={48} p={48} wrap="wrap" justify="center">
      {/* On the element bounds, as usual */}
      <BorderAnimate borderWidth="sm" beamMode="comet">
        <Paper radius="md" p="md" w={150}>
          <Text fw={600}>offset={0}</Text>
        </Paper>
      </BorderAnimate>

      {/* Detached: the ring grows its radius by the same amount to stay concentric */}
      <BorderAnimate borderWidth="sm" beamMode="comet" offset={8}>
        <Paper radius="md" p="md" w={150}>
          <Text fw={600}>offset={8}</Text>
        </Paper>
      </BorderAnimate>

      <BorderAnimate borderWidth="sm" beamMode="comet" offset="lg">
        <Paper radius="md" p="md" w={150}>
          <Text fw={600}>offset="lg"</Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export const withOffset: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
