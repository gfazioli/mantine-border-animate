import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" wrap="wrap" justify="center">
      {/* Short tail, thin stroke */}
      <BorderAnimate beamMode="comet" borderWidth="sm" tail={15} duration={3}>
        <Paper radius="md" p="md" w={170}>
          <Text fw={600}>tail={15}</Text>
          <Text size="xs" c="dimmed">A quick spark</Text>
        </Paper>
      </BorderAnimate>

      {/* Default tail */}
      <BorderAnimate beamMode="comet" borderWidth="sm" duration={4}>
        <Paper radius="md" p="md" w={170}>
          <Text fw={600}>tail={25}</Text>
          <Text size="xs" c="dimmed">The default</Text>
        </Paper>
      </BorderAnimate>

      {/* Half the perimeter, thicker and slower */}
      <BorderAnimate
        beamMode="comet"
        borderWidth="md"
        tail={50}
        duration={6}
        blur="sm"
        colorFrom="pink.4"
        colorTo="grape.7"
      >
        <Paper radius="md" p="md" w={170}>
          <Text fw={600}>tail={50}</Text>
          <Text size="xs" c="dimmed">Half the perimeter</Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" wrap="wrap" justify="center">
      {/* Short tail, thin stroke */}
      <BorderAnimate beamMode="comet" borderWidth="sm" tail={15} duration={3}>
        <Paper radius="md" p="md" w={170}>
          <Text fw={600}>tail={15}</Text>
          <Text size="xs" c="dimmed">
            A quick spark
          </Text>
        </Paper>
      </BorderAnimate>

      {/* Default tail */}
      <BorderAnimate beamMode="comet" borderWidth="sm" duration={4}>
        <Paper radius="md" p="md" w={170}>
          <Text fw={600}>tail={25}</Text>
          <Text size="xs" c="dimmed">
            The default
          </Text>
        </Paper>
      </BorderAnimate>

      {/* Half the perimeter, thicker and slower */}
      <BorderAnimate
        beamMode="comet"
        borderWidth="md"
        tail={50}
        duration={6}
        blur="sm"
        colorFrom="pink.4"
        colorTo="grape.7"
      >
        <Paper radius="md" p="md" w={170}>
          <Text fw={600}>tail={50}</Text>
          <Text size="xs" c="dimmed">
            Half the perimeter
          </Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export const withComet: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
