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
    <Flex gap="xl" align="center">
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
        <BorderAnimate w={80} h={80} variant="glow" radius="100%" size={60} colorFrom="green" colorTo="cyan">
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="Avatar"
            radius="100%"
            size={80}
          />
        </BorderAnimate>
        <Text size="xs" c="dimmed">Avatar</Text>
      </Stack>

      {/* Larger circle with gradient variant */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={120} h={120} radius="100%" variant="gradient" duration={3}>
          <CircleContent>
            <Text size="xs">Gradient</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Gradient variant</Text>
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
    <Flex gap="xl" align="center" justify="center">
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
        <BorderAnimate
          w={80}
          h={80}
          variant="glow"
          radius="100%"
          size={60}
          colorFrom="green"
          colorTo="cyan"
        >
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

      {/* Larger circle with gradient variant */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={120} h={120} radius="100%" variant="gradient" duration={3}>
          <CircleContent>
            <Text size="xs">Gradient</Text>
          </CircleContent>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Gradient variant
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
};
