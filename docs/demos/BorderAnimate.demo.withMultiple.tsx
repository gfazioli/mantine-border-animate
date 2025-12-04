import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Box, Flex, Text } from '@mantine/core';

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
    <BorderAnimate w={400} h={250}>
      <BorderAnimate w={400} h={250} duration={55} reverse borderWidth={1} size={400} colorFrom="#ff6b6b" colorTo="#2b00ff">
        <BorderAnimate w={400} h={250} duration={23} withMask={false} size={300} opacity={0.2} blur={14} anchor={50} zIndex={-1}>
          <BorderAnimate w={400} h={250} variant="glow" blur={4}>
            <Content>
              <Text fw={500}>Multiple Animated Borders</Text>
            </Content>
          </BorderAnimate>
        </BorderAnimate>
      </BorderAnimate>
    </BorderAnimate>
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
    <Flex justify="center" align="center" py={64}>
      <BorderAnimate w={400} h={250}>
        <BorderAnimate
          w={400}
          h={250}
          duration={55}
          reverse
          borderWidth={1}
          size={400}
          colorFrom="#ff6b6b"
          colorTo="#2b00ff"
        >
          <BorderAnimate
            w={400}
            h={250}
            duration={23}
            withMask={false}
            size={300}
            opacity={0.2}
            blur={14}
            anchor={50}
            zIndex={-1}
          >
            <BorderAnimate w={400} h={250} variant="glow" blur={4}>
              <Content>
                <Text fw={500}>Multiple Animated Borders</Text>
              </Content>
            </BorderAnimate>
          </BorderAnimate>
        </BorderAnimate>
      </BorderAnimate>
    </Flex>
  );
}

export const withMultiple: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
