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
      {/* Beam with multi-color stops */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={200}
          variant="beam"
          size="sm"
          duration={5}
          colorStops={[
            { color: 'transparent', position: 0 },
            { color: 'green', position: 20 },
            { color: 'cyan', position: 40 },
            { color: 'yellow', position: 60 },
            { color: 'red', position: 80 },
            { color: 'transparent', position: 100 },
          ]}
        >
          <Content>
            <Text size="sm">Beam colorStops</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Multi-color beam</Text>
      </Stack>

      {/* Gradient with rainbow color stops */}
      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={200}
          variant="beam"
          duration={4}
          colorStops={[
            { color: 'red', position: 0 },
            { color: 'orange', position: 17 },
            { color: 'yellow', position: 33 },
            { color: 'green', position: 50 },
            { color: 'cyan', position: 67 },
            { color: 'blue', position: 83 },
            { color: 'red', position: 100 },
          ]}
        >
          <Content>
            <Text size="sm">Rainbow gradient</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">Multi-color gradient</Text>
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
        <BorderAnimate
          w={200}
          h={200}
          variant="beam"
          duration={5}
          colorStops={[
            { color: 'transparent', position: 0 },
            { color: 'green', position: 20 },
            { color: 'cyan', position: 40 },
            { color: 'yellow', position: 60 },
            { color: 'red', position: 80 },
            { color: 'transparent', position: 100 },
          ]}
        >
          <Content>
            <Text size="sm">Beam colorStops</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Multi-color beam
        </Text>
      </Stack>

      <Stack align="center" gap="xs">
        <BorderAnimate
          w={200}
          h={200}
          variant="beam"
          duration={4}
          colorStops={[
            { color: 'red', position: 0 },
            { color: 'orange', position: 17 },
            { color: 'yellow', position: 33 },
            { color: 'green', position: 50 },
            { color: 'cyan', position: 67 },
            { color: 'blue', position: 83 },
            { color: 'red', position: 100 },
          ]}
        >
          <Content>
            <Text size="sm">Rainbow gradient</Text>
          </Content>
        </BorderAnimate>
        <Text size="xs" c="dimmed">
          Multi-color gradient
        </Text>
      </Stack>
    </Flex>
  );
}

export const withColorStops: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
