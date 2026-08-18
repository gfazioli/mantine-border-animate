import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Text, Stack } from '@mantine/core';

function Content({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w="100%"
      h="100%"
      p="md"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        borderRadius: 'var(--mantine-radius-md)',
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
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} pauseOnHover>
          <Content>
            <Text size="sm">Hover me!</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Beam pauses on hover</Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} variant="glow" blur="sm" pauseOnHover duration={3}>
          <Content>
            <Text size="sm">Hover me!</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Glow pauses on hover</Text>
      </Stack>
    </Flex>
  );
}
`;

function Content({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w="100%"
      h="100%"
      p="md"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        borderRadius: 'var(--mantine-radius-md)',
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
    <Flex gap="xl" align="center" justify="center" py={64}>
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} pauseOnHover>
          <Content>
            <Text size="sm">Hover me!</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Beam pauses on hover
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} variant="glow" blur="sm" pauseOnHover duration={3}>
          <Content>
            <Text size="sm">Hover me!</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Glow pauses on hover
        </Text>
      </Stack>
    </Flex>
  );
}

export const withPauseOnHover: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
