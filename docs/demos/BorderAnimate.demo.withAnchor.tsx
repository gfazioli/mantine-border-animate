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
      {/* anchor=0 (default) - beam follows outer edge */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={200} blur={4} anchor={0}>
          <Content>
            <Text size="sm">anchor=0</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Outer edge</Text>
      </Stack>

      {/* anchor=50 - beam moves inward */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={200} blur={4} anchor={50}>
          <Content>
            <Text size="sm">anchor=50</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Moved inward</Text>
      </Stack>

      {/* anchor with withMask=false - creates inner glow effect */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size={200} blur={4} anchor={40}>
          <Content>
            <Text size="sm">anchor=40</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Inner glow effect</Text>
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
    <Flex gap="xl" align="center" justify="center">
      {/* anchor=0 (default) - beam follows outer edge */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={200} blur={4} anchor={0}>
          <Content>
            <Text size="sm">anchor=0</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Outer edge
        </Text>
      </Stack>

      {/* anchor=50 - beam moves inward */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={200} blur={4} anchor={50}>
          <Content>
            <Text size="sm">anchor=50</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Moved inward
        </Text>
      </Stack>

      {/* anchor with withMask=false - creates inner glow effect */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size={200} blur={4} anchor={40}>
          <Content>
            <Text size="sm">anchor=40</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Inner glow effect
        </Text>
      </Stack>
    </Flex>
  );
}

export const withAnchor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
