import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react';
import { Alert, Flex } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Alert, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack gap="md" w={400}>
      <BorderAnimate size={200} radius="sm" duration={10}>
        <Alert
          variant="light"
          color="blue"
          title="Information"
          icon={<IconInfoCircle />}
        >
          This is an informational alert with an animated border effect.
        </Alert>
      </BorderAnimate>

      <BorderAnimate
        size={200}
        radius="sm"
        duration={8}
        colorFrom="red"
        colorTo="orange"
        variant="pulse"
      >
        <Alert
          variant="light"
          color="red"
          title="Warning"
          icon={<IconAlertTriangle />}
        >
          This is a warning alert with a pulsing border effect.
        </Alert>
      </BorderAnimate>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Flex direction="column" align="center" gap="xl" py={64}>
      <BorderAnimate size={200} radius="sm" duration={10}>
        <Alert variant="light" color="blue" title="Information" icon={<IconInfoCircle />}>
          This is an informational alert with an animated border effect.
        </Alert>
      </BorderAnimate>

      <BorderAnimate
        size={200}
        radius="sm"
        duration={2}
        colorFrom="red"
        colorTo="orange"
        variant="glow"
      >
        <Alert variant="light" color="red" title="Warning" icon={<IconAlertTriangle />}>
          This is a warning alert with a pulsing border effect.
        </Alert>
      </BorderAnimate>
    </Flex>
  );
}

export const withAlert: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
