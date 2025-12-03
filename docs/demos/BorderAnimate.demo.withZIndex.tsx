import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Text, Stack } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" align="center">
      {/* Default: zIndex={1} - border is in front */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          zIndex={1}
          size={200}
          blur={4}
        >
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
            <Text size="sm">zIndex=1</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Border in front</Text>
      </Stack>

      {/* zIndex={-1} with withMask={false} - creates background glow effect */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          zIndex={-1}
          withMask={false}
          size={300}
          blur={14}
          opacity={0.5}
        >
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
            <Text size="sm">zIndex=-1</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Background glow</Text>
      </Stack>

      {/* Combined: layered effect with multiple borders */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={150}>
          <BorderAnimate
            w={200}
            h={150}
            zIndex={-1}
            withMask={false}
            size={300}
            blur={20}
            opacity={0.3}
            colorFrom="#ff6b6b"
            colorTo="#2b00ff"
            duration={8}
          >
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
              <Text size="sm">Layered</Text>
            </Box>
          </BorderAnimate>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Front + background</Text>
      </Stack>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" align="center" justify="center" py={64}>
      {/* Default: zIndex={1} - border is in front */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} zIndex={1} size={200} blur={4}>
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
            <Text size="sm">zIndex=1</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Border in front
        </Text>
      </Stack>

      {/* zIndex={-1} with withMask={false} - creates background glow effect */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          zIndex={-1}
          withMask={false}
          size={300}
          blur={14}
          opacity={0.5}
        >
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
            <Text size="sm">zIndex=-1</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Background glow
        </Text>
      </Stack>

      {/* Combined: layered effect with multiple borders */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} size={150}>
          <BorderAnimate
            w={200}
            h={150}
            zIndex={-1}
            withMask={false}
            size={300}
            blur={20}
            opacity={0.3}
            colorFrom="#ff6b6b"
            colorTo="#2b00ff"
            duration={8}
          >
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
              <Text size="sm">Layered</Text>
            </Box>
          </BorderAnimate>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Front + background
        </Text>
      </Stack>
    </Flex>
  );
}

export const withZIndex: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
