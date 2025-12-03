import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Input } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Input } from '@mantine/core';

function Demo() {
  return (
    <BorderAnimate size="xs" radius="sm">
      <Input placeholder="Your email" />
    </BorderAnimate>
  );
}
`;

function Demo() {
  return (
    <BorderAnimate size="xs" radius="sm">
      <Input placeholder="Your email" />
    </BorderAnimate>
  );
}

export const withInput: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
