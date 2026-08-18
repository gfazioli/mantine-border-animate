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
    <Flex gap="xl" align="center" wrap="wrap">
      {/* Dot mode: withMask={true} */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask size="lg" blur={4}>
          <Content>
            <Text size="xs">Dot + mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Clipped to border</Text>
      </Stack>

      {/* Dot mode: withMask={false} */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size="lg" blur={4}>
          <Content>
            <Text size="xs">Dot no mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Glow extends outward</Text>
      </Stack>

      {/* Wedge mode: withMask={true} */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} beamMode="wedge" withMask size="md" blur="xs">
          <Content>
            <Text size="xs">Wedge + mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Wedge clipped</Text>
      </Stack>

      {/* Wedge mode: withMask={false} */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} beamMode="wedge" withMask={false} size="md" blur="xs">
          <Content>
            <Text size="xs">Wedge no mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Wedge full gradient</Text>
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
    <Flex gap="xl" align="center" justify="center" wrap="wrap" py={64}>
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask size="lg" blur={4}>
          <Content>
            <Text size="xs">Dot + mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Clipped to border
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size="lg" blur={4}>
          <Content>
            <Text size="xs">Dot no mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Glow extends outward
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} beamMode="wedge" withMask size="md" blur="xs">
          <Content>
            <Text size="xs">Wedge + mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Wedge clipped
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} beamMode="wedge" withMask={false} size="md" blur="xs">
          <Content>
            <Text size="xs">Wedge no mask</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Wedge full gradient
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
  dimmed: true,
};
