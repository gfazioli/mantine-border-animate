import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="lg" wrap="wrap" justify="center">
      {/* A soft dot traveling the perimeter: size is its diameter in pixels */}
      <Stack align="center" gap={6}>
        <BorderAnimate borderWidth="sm" size="md" duration={4}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>dot</Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">size="md"</Text>
      </Stack>

      {/* A rotating wedge: spread is its width in degrees */}
      <Stack align="center" gap={6}>
        <BorderAnimate beamMode="wedge" borderWidth="sm" duration={4}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>wedge</Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">spread={36} (default)</Text>
      </Stack>

      <Stack align="center" gap={6}>
        <BorderAnimate beamMode="wedge" borderWidth="sm" duration={4} spread={140}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>wedge</Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">spread={140}</Text>
      </Stack>

      {/* A stroked head with a tail, at constant speed on any shape */}
      <Stack align="center" gap={6}>
        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>comet</Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">tail={25} (default)</Text>
      </Stack>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="lg" wrap="wrap" justify="center">
      {/* A soft dot traveling the perimeter: size is its diameter in pixels */}
      <Stack align="center" gap={6}>
        <BorderAnimate borderWidth="sm" size="md" duration={4}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>
              dot
            </Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          size="md"
        </Text>
      </Stack>

      {/* A rotating wedge: spread is its width in degrees */}
      <Stack align="center" gap={6}>
        <BorderAnimate beamMode="wedge" borderWidth="sm" duration={4}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>
              wedge
            </Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          spread={36} (default)
        </Text>
      </Stack>

      <Stack align="center" gap={6}>
        <BorderAnimate beamMode="wedge" borderWidth="sm" duration={4} spread={140}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>
              wedge
            </Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          spread={140}
        </Text>
      </Stack>

      {/* A stroked head with a tail, at constant speed on any shape */}
      <Stack align="center" gap={6}>
        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4}>
          <Paper radius="md" p="md" w={140} ta="center">
            <Text size="sm" fw={600}>
              comet
            </Text>
          </Paper>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          tail={25} (default)
        </Text>
      </Stack>
    </Flex>
  );
}

export const withBeamModes: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
