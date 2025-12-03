import React from 'react';
import { render } from '@mantine-tests/core';
import { BorderAnimate } from './BorderAnimate';

describe('BorderAnimate', () => {
  it('renders without crashing', () => {
    const { container } = render(<BorderAnimate />);
    expect(container).toBeTruthy();
  });
});
