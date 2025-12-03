import React from 'react';
import { Stack, Title } from '@mantine/core';
import { BorderAnimate } from './BorderAnimate';

export default {
  title: 'BorderAnimate',
  args: {},
  argTypes: {},
};

export function Usage() {
  return (
    <Stack>
      <BorderAnimate w={300} p={32}>
        <Stack>
          <Title>This is a title</Title>
          <p>This is a paragraph inside the BorderAnimate component.</p>
        </Stack>
      </BorderAnimate>
    </Stack>
  );
}
