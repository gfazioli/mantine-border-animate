import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Stack, TextInput } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Stack, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Stack w={300}>
      {/* focus-within follows the focus of anything inside the wrapper */}
      <BorderAnimate trigger="focus-within" radius="sm" borderWidth="sm">
        <TextInput w="100%" label="Email" placeholder="you@example.com" />
      </BorderAnimate>

      {/* The draw variant turns that into a border that writes itself */}
      <BorderAnimate
        variant="draw"
        trigger="focus-within"
        radius="sm"
        borderWidth="sm"
        colorFrom="teal.4"
        colorTo="teal.6"
      >
        <TextInput w="100%" label="Full name" placeholder="Click into the field" />
      </BorderAnimate>

      {/* Always on, for a field that needs attention right now */}
      <BorderAnimate variant="pulse" radius="sm" duration={2} colorFrom="orange.6" colorTo="red.6">
        <TextInput w="100%" label="Verification code" placeholder="6 digits" />
      </BorderAnimate>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack w={300}>
      {/* focus-within follows the focus of anything inside the wrapper */}
      <BorderAnimate trigger="focus-within" radius="sm" borderWidth="sm">
        <TextInput w="100%" label="Email" placeholder="you@example.com" />
      </BorderAnimate>

      {/* The draw variant turns that into a border that writes itself */}
      <BorderAnimate
        variant="draw"
        trigger="focus-within"
        radius="sm"
        borderWidth="sm"
        colorFrom="teal.4"
        colorTo="teal.6"
      >
        <TextInput w="100%" label="Full name" placeholder="Click into the field" />
      </BorderAnimate>

      {/* Always on, for a field that needs attention right now */}
      <BorderAnimate variant="pulse" radius="sm" duration={2} colorFrom="orange.6" colorTo="red.6">
        <TextInput w="100%" label="Verification code" placeholder="6 digits" />
      </BorderAnimate>
    </Stack>
  );
}

export const withInput: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
