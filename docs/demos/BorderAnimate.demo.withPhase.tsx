import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Stack, Text } from '@mantine/core';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w={130}
      h={70}
      p="xs"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        borderRadius: 'inherit',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function Demo() {
  return (
    <Stack align="center" gap={40}>
      {/* Same animation, three phases: the heads stay spread apart forever */}
      <Flex gap="lg" wrap="wrap" justify="center">
        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4} phase={0}>
          <Card>
            <Text size="xs">phase={0}</Text>
          </Card>
        </BorderAnimate>

        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4} phase={1.33}>
          <Card>
            <Text size="xs">phase={1.33}</Text>
          </Card>
        </BorderAnimate>

        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4} phase={2.66}>
          <Card>
            <Text size="xs">phase={2.66}</Text>
          </Card>
        </BorderAnimate>
      </Flex>

      {/* Two rings on the same element, running against each other */}
      <BorderAnimate beamMode="comet" borderWidth="sm" duration={5} offset={10}>
        <BorderAnimate beamMode="comet" borderWidth="sm" duration={5} reverse colorFrom="cyan.4" colorTo="blue.6">
          <Card>
            <Text size="xs">reverse</Text>
          </Card>
        </BorderAnimate>
      </BorderAnimate>
    </Stack>
  );
}
`;

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w={130}
      h={70}
      p="xs"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        borderRadius: 'inherit',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function Demo() {
  return (
    <Stack align="center" gap={40}>
      {/* Same animation, three phases: the heads stay spread apart forever */}
      <Flex gap="lg" wrap="wrap" justify="center">
        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4} phase={0}>
          <Card>
            <Text size="xs">phase={0}</Text>
          </Card>
        </BorderAnimate>

        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4} phase={1.33}>
          <Card>
            <Text size="xs">phase={1.33}</Text>
          </Card>
        </BorderAnimate>

        <BorderAnimate beamMode="comet" borderWidth="sm" duration={4} phase={2.66}>
          <Card>
            <Text size="xs">phase={2.66}</Text>
          </Card>
        </BorderAnimate>
      </Flex>

      {/* Two rings on the same element, running against each other */}
      <BorderAnimate beamMode="comet" borderWidth="sm" duration={5} offset={10}>
        <BorderAnimate
          beamMode="comet"
          borderWidth="sm"
          duration={5}
          reverse
          colorFrom="cyan.4"
          colorTo="blue.6"
        >
          <Card>
            <Text size="xs">reverse</Text>
          </Card>
        </BorderAnimate>
      </BorderAnimate>
    </Stack>
  );
}

export const withPhase: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
