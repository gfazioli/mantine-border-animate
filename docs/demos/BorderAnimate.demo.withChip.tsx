import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Chip, Flex } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Chip, Flex } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="md" align="center">
      <BorderAnimate size="xs" radius="xl">
        <Chip defaultChecked>Selected</Chip>
      </BorderAnimate>

      <BorderAnimate size="xs" radius="xl" colorFrom="green" colorTo="teal">
        <Chip defaultChecked color="green">Active</Chip>
      </BorderAnimate>

      <BorderAnimate size="xs" radius="xl" variant="gradient" duration={2}>
        <Chip defaultChecked color="violet">Premium</Chip>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="md" align="center">
      <BorderAnimate size="xs" radius="xl">
        <Chip defaultChecked>Selected</Chip>
      </BorderAnimate>

      <BorderAnimate size="xs" radius="xl" variant="pulse" colorTo="white" p={3}>
        <Chip defaultChecked color="green">
          Active
        </Chip>
      </BorderAnimate>

      <BorderAnimate size="xs" radius="xl" variant="gradient" duration={2}>
        <Chip defaultChecked color="violet">
          Premium
        </Chip>
      </BorderAnimate>
    </Flex>
  );
}

export const withChip: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
