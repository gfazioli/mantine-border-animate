import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Input, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { Input, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack w={300}>
      {/* Wrap the control, not the whole field: with a TextInput the border would
          enclose the label too. Input.Wrapper keeps the label outside and still
          passes its id down to Input through context, so clicking it focuses the field. */}
      <Input.Wrapper label="Email">
        <BorderAnimate trigger="focus-within" radius="sm" borderWidth="sm">
          <Input w="100%" placeholder="you@example.com" />
        </BorderAnimate>
      </Input.Wrapper>

      {/* The draw variant turns that into a border that writes itself */}
      <Input.Wrapper label="Full name">
        <BorderAnimate
          variant="draw"
          trigger="focus-within"
          radius="sm"
          borderWidth="sm"
          colorFrom="teal.4"
          colorTo="teal.6"
        >
          <Input w="100%" placeholder="Click into the field" />
        </BorderAnimate>
      </Input.Wrapper>

      {/* Always on, for a field that needs attention right now */}
      <Input.Wrapper label="Verification code">
        <BorderAnimate variant="pulse" radius="sm" duration={2} colorFrom="orange.6" colorTo="red.6">
          <Input w="100%" placeholder="6 digits" />
        </BorderAnimate>
      </Input.Wrapper>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack w={300}>
      {/* Wrap the control, not the whole field: with a TextInput the border would
          enclose the label too. Input.Wrapper keeps the label outside and still
          passes its id down to Input through context, so clicking it focuses the field. */}
      <Input.Wrapper label="Email">
        <BorderAnimate trigger="focus-within" radius="sm" borderWidth="sm">
          <Input w="100%" placeholder="you@example.com" />
        </BorderAnimate>
      </Input.Wrapper>

      {/* The draw variant turns that into a border that writes itself */}
      <Input.Wrapper label="Full name">
        <BorderAnimate
          variant="draw"
          trigger="focus-within"
          radius="sm"
          borderWidth="sm"
          colorFrom="teal.4"
          colorTo="teal.6"
        >
          <Input w="100%" placeholder="Click into the field" />
        </BorderAnimate>
      </Input.Wrapper>

      {/* Always on, for a field that needs attention right now */}
      <Input.Wrapper label="Verification code">
        <BorderAnimate
          variant="pulse"
          radius="sm"
          duration={2}
          colorFrom="orange.6"
          colorTo="red.6"
        >
          <Input w="100%" placeholder="6 digits" />
        </BorderAnimate>
      </Input.Wrapper>
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
