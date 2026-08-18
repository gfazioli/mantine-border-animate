import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex, Paper, Slider, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const code = `import { useState } from 'react';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Button, Flex, Paper, Slider, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animate, { toggle }] = useDisclosure(true);
  const [value, setValue] = useState(0);

  return (
    <Flex>
      <BorderAnimate animate={animate} progress={value} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
            <Button onClick={toggle}>Toggle Animation</Button>
          </Stack>
        </Paper>
      </BorderAnimate>
      <Slider
        w={260}
        aria-label="Progress along the border"
        value={value}
        onChange={setValue}
        label={(value) => \`\${value}%\`}
      />
    </Flex>
  );
}
`;

function Demo() {
  const [animate, { toggle }] = useDisclosure(true);
  const [value, setValue] = useState(0);

  return (
    <Flex direction="column" align="center" gap="md">
      <BorderAnimate animate={animate} progress={value} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
            <Button onClick={toggle}>Toggle Animation</Button>
          </Stack>
        </Paper>
      </BorderAnimate>
      <Slider
        w={260}
        aria-label="Progress along the border"
        value={value}
        onChange={setValue}
        label={(value) => `${value}%`}
      />
    </Flex>
  );
}

export const animated: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
