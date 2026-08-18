import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" wrap="wrap" justify="center">
      {/* Marching ants */}
      <BorderAnimate variant="dash" borderWidth="sm" duration={4}>
        <Paper radius="md" p="md" w={160}>
          <Text fw={600}>Marching ants</Text>
          <Text size="xs" c="dimmed">dashSize 4 · dashGap 4</Text>
        </Paper>
      </BorderAnimate>

      {/* Dots: a tiny dash with a round cap */}
      <BorderAnimate
        variant="dash"
        borderWidth="md"
        dashSize={0.5}
        dashGap={5}
        dashCap="round"
        duration={6}
        colorFrom="teal.4"
        colorTo="teal.4"
      >
        <Paper radius="md" p="md" w={160}>
          <Text fw={600}>Dots</Text>
          <Text size="xs" c="dimmed">dashCap="round"</Text>
        </Paper>
      </BorderAnimate>

      {/* Four segments, evenly spaced whatever the size */}
      <BorderAnimate variant="dash" borderWidth="md" count={4} dashCap="round" duration={8}>
        <Paper radius="md" p="md" w={160}>
          <Text fw={600}>Four segments</Text>
          <Text size="xs" c="dimmed">count={4}</Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" wrap="wrap" justify="center">
      {/* Marching ants */}
      <BorderAnimate variant="dash" borderWidth="sm" duration={4}>
        <Paper radius="md" p="md" w={160}>
          <Text fw={600}>Marching ants</Text>
          <Text size="xs" c="dimmed">
            dashSize 4 · dashGap 4
          </Text>
        </Paper>
      </BorderAnimate>

      {/* Dots: a tiny dash with a round cap */}
      <BorderAnimate
        variant="dash"
        borderWidth="md"
        dashSize={0.5}
        dashGap={5}
        dashCap="round"
        duration={6}
        colorFrom="teal.4"
        colorTo="teal.4"
      >
        <Paper radius="md" p="md" w={160}>
          <Text fw={600}>Dots</Text>
          <Text size="xs" c="dimmed">
            dashCap="round"
          </Text>
        </Paper>
      </BorderAnimate>

      {/* Four segments, evenly spaced whatever the size */}
      <BorderAnimate variant="dash" borderWidth="md" count={4} dashCap="round" duration={8}>
        <Paper radius="md" p="md" w={160}>
          <Text fw={600}>Four segments</Text>
          <Text size="xs" c="dimmed">
            count={4}
          </Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export const withDash: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
