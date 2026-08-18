import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Avatar, Box, Flex, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Avatar, Box, Flex, Stack, Text } from '@mantine/core';

function CircleContent({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w="100%"
      h="100%"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        borderRadius: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function Demo() {
  return (
    <Flex gap="xl" align="center" wrap="wrap" justify="center">
      {/* Simple circle */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={100} h={100} radius="100%">
          <CircleContent>
            <Text size="xs">Circle</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Simple circle</Text>
      </Stack>

      {/* Avatar with glow */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={80} h={80} variant="glow" radius="100%" colorFrom="green" colorTo="cyan">
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="Avatar"
            radius="100%"
            size={80}
          />
        </BorderAnimate>
        <Text size="xs" c="dimmed">Avatar</Text>
      </Stack>

      {/* Larger circle with the pulse variant */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={120} h={120} radius="100%" variant="pulse" duration={3}>
          <CircleContent>
            <Text size="xs">Pulse</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Pulse variant</Text>
      </Stack>

      {/* A circular progress: the draw variant follows the ring exactly */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={100}
          h={100}
          radius="100%"
          variant="draw"
          progress={70}
          borderWidth="md"
          withTrack
          colorFrom="blue.4"
          colorTo="cyan.4"
        >
          <CircleContent>
            <Text size="xs">70%</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">draw + radius="100%"</Text>
      </Stack>
    </Flex>
  );
}
`;

function CircleContent({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w="100%"
      h="100%"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        borderRadius: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function Demo() {
  return (
    <Flex gap="xl" align="center" wrap="wrap" justify="center">
      {/* Simple circle */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={100} h={100} radius="100%">
          <CircleContent>
            <Text size="xs">Circle</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Simple circle
        </Text>
      </Stack>

      {/* Avatar with beam */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={80} h={80} variant="glow" radius="100%" colorFrom="green" colorTo="cyan">
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="Avatar"
            radius="100%"
            size={80}
          />
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Avatar
        </Text>
      </Stack>

      {/* Larger circle with the pulse variant */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={120} h={120} radius="100%" variant="pulse" duration={3}>
          <CircleContent>
            <Text size="xs">Pulse</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Pulse variant
        </Text>
      </Stack>

      {/* A circular progress: the draw variant follows the ring exactly */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={100}
          h={100}
          radius="100%"
          variant="draw"
          progress={70}
          borderWidth="md"
          withTrack
          colorFrom="blue.4"
          colorTo="cyan.4"
        >
          <CircleContent>
            <Text size="xs">70%</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          draw + radius="100%"
        </Text>
      </Stack>
    </Flex>
  );
}

export const withCircle: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
