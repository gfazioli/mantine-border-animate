import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text, TextInput } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Flex, Paper, Text, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Flex gap="xl" wrap="wrap" justify="center">
      {/* The border draws itself while the pointer is over the wrapper */}
      <BorderAnimate variant="draw" trigger="hover" borderWidth="sm">
        <Paper radius="md" p="md" w={190}>
          <Text fw={600}>trigger="hover"</Text>
          <Text size="xs" c="dimmed">Point at me</Text>
        </Paper>
      </BorderAnimate>

      {/* Follows the focus of anything inside, so it works with real form controls */}
      <BorderAnimate trigger="focus-within" borderWidth="sm" radius="sm">
        <TextInput w={190} placeholder="Click into the field" label='trigger="focus-within"' />
      </BorderAnimate>

      {/* Animates only while the component is on screen */}
      <BorderAnimate variant="dash" trigger="inView" borderWidth="sm" duration={4}>
        <Paper radius="md" p="md" w={190}>
          <Text fw={600}>trigger="inView"</Text>
          <Text size="xs" c="dimmed">Idle when scrolled away</Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex gap="xl" wrap="wrap" justify="center">
      {/* The border draws itself while the pointer is over the wrapper */}
      <BorderAnimate variant="draw" trigger="hover" borderWidth="sm">
        <Paper radius="md" p="md" w={190}>
          <Text fw={600}>trigger="hover"</Text>
          <Text size="xs" c="dimmed">
            Point at me
          </Text>
        </Paper>
      </BorderAnimate>

      {/* Follows the focus of anything inside, so it works with real form controls */}
      <BorderAnimate trigger="focus-within" borderWidth="sm" radius="sm">
        <TextInput w={190} placeholder="Click into the field" label='trigger="focus-within"' />
      </BorderAnimate>

      {/* Animates only while the component is on screen */}
      <BorderAnimate variant="dash" trigger="inView" borderWidth="sm" duration={4}>
        <Paper radius="md" p="md" w={190}>
          <Text fw={600}>trigger="inView"</Text>
          <Text size="xs" c="dimmed">
            Idle when scrolled away
          </Text>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export const withTrigger: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  dimmed: true,
};
