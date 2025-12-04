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
      {/* Background glow with anchor=0 */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={250} blur={12} anchor={0} zIndex={-1} withMask={false} opacity={0.6}>
          <Content>
            <Text size="sm">anchor=0</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Outer background</Text>
      </Stack>

      {/* Background glow with anchor=30 */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={250} blur={12} anchor={30} zIndex={-1} withMask={false} opacity={0.6}>
          <Content>
            <Text size="sm">anchor=30</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Closer background</Text>
      </Stack>

      {/* Background glow with anchor=60 - centered behind content */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={250} blur={16} anchor={60} zIndex={-1} withMask={false} opacity={0.5}>
          <Content>
            <Text size="sm">anchor=60</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Centered glow</Text>
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
      {/* Background glow with anchor=0 */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          size={250}
          blur={12}
          anchor={0}
          zIndex={-1}
          withMask={false}
          opacity={0.6}
        >
          <Content>
            <Text size="sm">anchor=0</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Outer background
        </Text>
      </Stack>

      {/* Background glow with anchor=30 */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          size={250}
          blur={12}
          anchor={30}
          zIndex={-1}
          withMask={false}
          opacity={0.6}
        >
          <Content>
            <Text size="sm">anchor=30</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Closer background
        </Text>
      </Stack>

      {/* Background glow with anchor=60 - centered behind content */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          size={250}
          blur={16}
          anchor={60}
          zIndex={-1}
          withMask={false}
          opacity={0.5}
        >
          <Content>
            <Text size="sm">anchor=60</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Centered glow
        </Text>
      </Stack>
    </Flex>
  );
}

export const withAnchorBackground: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
