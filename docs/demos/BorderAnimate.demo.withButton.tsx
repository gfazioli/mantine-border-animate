import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" align="center">
      <BorderAnimate radius={4} size={80}>
        <Button>Click me</Button>
      </BorderAnimate>

      <BorderAnimate radius={256} size={80}>
        <Button radius={256} variant="default">
          Rounded
        </Button>
      </BorderAnimate>

      <BorderAnimate radius="md" size={100} variant="gradient">
        <Button variant="light" color="violet">
          Gradient
        </Button>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" align="center">
      <BorderAnimate radius={4} size={80}>
        <Button>Click me</Button>
      </BorderAnimate>

      <BorderAnimate radius={256} size={80}>
        <Button radius={256} variant="default">
          Rounded
        </Button>
      </BorderAnimate>

      <BorderAnimate radius="md" size={100} variant="gradient">
        <Button variant="light" color="violet">
          Gradient
        </Button>
      </BorderAnimate>
    </Flex>
  );
}

export const withButton: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
