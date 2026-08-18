import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex, Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" align="flex-start" wrap="wrap" justify="center">
      {/* Always running: a call to action that asks to be noticed */}
      <Stack align="center" gap="xs">
        <BorderAnimate radius="md" size="sm">
          <Button>Click me</Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Always on</Text>
      </Stack>

      {/* Pill shaped: the ring follows any radius, including a fully rounded one */}
      <Stack align="center" gap="xs">
        <BorderAnimate radius={256} size="sm">
          <Button radius={256} variant="default">
            Rounded
          </Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">radius={256}</Text>
      </Stack>

      {/* Quiet until the pointer arrives */}
      <Stack align="center" gap="xs">
        <BorderAnimate variant="draw" trigger="hover" radius="md" borderWidth="sm">
          <Button variant="default">Hover me</Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">trigger="hover"</Text>
      </Stack>

      {/* A halo instead of a ring */}
      <Stack align="center" gap="xs">
        <BorderAnimate radius="md" variant="glow" blur="xs">
          <Button variant="light" color="violet">
            Glow
          </Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">variant="glow"</Text>
      </Stack>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" align="flex-start" wrap="wrap" justify="center">
      {/* Always running: a call to action that asks to be noticed */}
      <Stack align="center" gap="xs">
        <BorderAnimate radius="md" size="sm">
          <Button>Click me</Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Always on
        </Text>
      </Stack>

      {/* Pill shaped: the ring follows any radius, including a fully rounded one */}
      <Stack align="center" gap="xs">
        <BorderAnimate radius={256} size="sm">
          <Button radius={256} variant="default">
            Rounded
          </Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          radius={256}
        </Text>
      </Stack>

      {/* Quiet until the pointer arrives */}
      <Stack align="center" gap="xs">
        <BorderAnimate variant="draw" trigger="hover" radius="md" borderWidth="sm">
          <Button variant="default">Hover me</Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          trigger="hover"
        </Text>
      </Stack>

      {/* A halo instead of a ring */}
      <Stack align="center" gap="xs">
        <BorderAnimate radius="md" variant="glow" blur="xs">
          <Button variant="light" color="violet">
            Glow
          </Button>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          variant="glow"
        </Text>
      </Stack>
    </Flex>
  );
}

export const withButton: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
