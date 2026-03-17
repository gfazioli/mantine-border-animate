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
      {/* Default: withMask={true} - border is clipped to the edge */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask size="lg" blur={4}>
          <Content>
            <Text size="sm">withMask=true</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Clipped to border</Text>
      </Stack>

      {/* withMask={false} - glow extends beyond the border */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size="lg" blur={4}>
          <Content>
            <Text size="sm">withMask=false</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Glow extends outward</Text>
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
      {/* Default: withMask={true} - border is clipped to the edge */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask size="lg" blur={4}>
          <Content>
            <Text size="sm">withMask=true</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Clipped to border
        </Text>
      </Stack>

      {/* withMask={false} - glow extends beyond the border */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size="lg" blur={4}>
          <Content>
            <Text size="sm">withMask=false</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Glow extends outward
        </Text>
      </Stack>
    </Flex>
  );
}

export const withMask: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
