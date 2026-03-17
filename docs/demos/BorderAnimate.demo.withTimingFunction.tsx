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
        <BorderAnimate w={180} h={120} timingFunction="linear">
          <Content>
            <Text size="xs">linear</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Constant speed</Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={180} h={120} timingFunction="ease-in-out">
          <Content>
            <Text size="xs">ease-in-out</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Smooth acceleration</Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={180} h={120} timingFunction="steps(8)">
          <Content>
            <Text size="xs">steps(8)</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Stepped / retro</Text>
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
        <BorderAnimate w={180} h={120} timingFunction="linear">
          <Content>
            <Text size="xs">linear</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Constant speed
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={180} h={120} timingFunction="ease-in-out">
          <Content>
            <Text size="xs">ease-in-out</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Smooth acceleration
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate w={180} h={120} timingFunction="steps(8)">
          <Content>
            <Text size="xs">steps(8)</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Stepped / retro
        </Text>
      </Stack>
    </Flex>
  );
}

export const withTimingFunction: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
