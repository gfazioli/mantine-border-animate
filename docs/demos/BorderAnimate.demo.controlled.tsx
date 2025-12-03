import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex, Paper, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex, Paper, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [show, { toggle }] = useDisclosure(true);

  return (
    <Flex>
      <BorderAnimate show={show} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
            <Button onClick={toggle}>Toggle BorderAnimate</Button>
          </Stack>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}
`;

function Demo() {
  const [show, { toggle }] = useDisclosure(true);

  return (
    <Flex>
      <BorderAnimate show={show} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
            <Button onClick={toggle}>Toggle BorderAnimate</Button>
          </Stack>
        </Paper>
      </BorderAnimate>
    </Flex>
  );
}

export const controlled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
