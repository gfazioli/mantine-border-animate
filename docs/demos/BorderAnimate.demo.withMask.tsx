import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Text, Stack } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" align="center">
      {/* Default: withMask={true} - border is clipped to the edge */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          withMask={true}
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
            <Text size="sm">withMask=true</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Clipped to border</Text>
      </Stack>

      {/* withMask={false} - glow extends beyond the border */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={150}
          withMask={false}
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
            <Text size="sm">withMask=false</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Glow extends outward</Text>
      </Stack>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" align="center" justify="center" py={64}>
      {/* Default: withMask={true} - border is clipped to the edge */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={true} size={200} blur={4}>
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
            <Text size="sm">withMask=true</Text>
          </Box>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Clipped to border
        </Text>
      </Stack>

      {/* withMask={false} - glow extends beyond the border */}
      <Stack align="center" gap="xs">
        <BorderAnimate w={200} h={150} withMask={false} size={200} blur={4}>
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
            <Text size="sm">withMask=false</Text>
          </Box>
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
