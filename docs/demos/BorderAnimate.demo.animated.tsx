import { useState } from 'react';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { AngleSlider, Button, Flex, Paper, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

const code = `import { useState } from 'react';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { AngleSlider, Button, Flex, Paper, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animate, { toggle }] = useDisclosure(true);
  const [value, setValue] = useState(0);

  return (
    <Flex>
      <BorderAnimate animate={animate} angle={value} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
            <Button onClick={toggle}>Toggle Animation</Button>
          </Stack>
        </Paper>
      </BorderAnimate>
      <AngleSlider
        aria-label="Angle slider"
        value={value}
        onChange={setValue}
        formatLabel={(value) => \`\${value}°\`}
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
      <BorderAnimate animate={animate} angle={value} size="lg">
        <Paper withBorder shadow="md" radius="md" p="md">
          <Stack>
            <Title>This is a title</Title>
            <p>This is a paragraph inside the BorderAnimate component.</p>
            <Button onClick={toggle}>Toggle Animation</Button>
          </Stack>
        </Paper>
      </BorderAnimate>
      <AngleSlider
        aria-label="Angle slider"
        value={value}
        onChange={setValue}
        formatLabel={(value) => `${value}°`}
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
