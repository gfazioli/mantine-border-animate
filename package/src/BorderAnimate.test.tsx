import React from 'react';
import { render } from '@mantine-tests/core';
import { BorderAnimate } from './BorderAnimate';

describe('BorderAnimate', () => {
  it('renders without crashing', () => {
    const { container } = render(<BorderAnimate />);
    expect(container).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <BorderAnimate>
        <span>Test child</span>
      </BorderAnimate>
    );
    expect(getByText('Test child')).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BorderAnimate ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders border element when show is true (default)', () => {
    const { container } = render(<BorderAnimate />);
    const borderElements = container.querySelectorAll('[data-with-mask]');
    expect(borderElements.length).toBe(1);
  });

  it('does not render border element when show is false', () => {
    const { container } = render(<BorderAnimate show={false} />);
    const borderElements = container.querySelectorAll('[data-with-mask]');
    expect(borderElements.length).toBe(0);
  });

  it('sets data-animate attribute correctly', () => {
    const { container, rerender } = render(<BorderAnimate animate />);
    expect(container.querySelector('[data-animate="true"]')).toBeInTheDocument();

    rerender(<BorderAnimate animate={false} />);
    expect(container.querySelector('[data-animate="false"]')).toBeInTheDocument();
  });

  it('sets data-with-mask attribute correctly', () => {
    const { container, rerender } = render(<BorderAnimate withMask />);
    expect(container.querySelector('[data-with-mask="true"]')).toBeInTheDocument();

    rerender(<BorderAnimate withMask={false} />);
    expect(container.querySelector('[data-with-mask="false"]')).toBeInTheDocument();
  });

  it('renders each variant', () => {
    const variants = ['beam', 'glow', 'pulse'] as const;
    for (const variant of variants) {
      const { container } = render(<BorderAnimate variant={variant} />);
      expect(container.querySelector(`[data-variant="${variant}"]`)).toBeInTheDocument();
    }
  });

  it('supports className prop', () => {
    const { container } = render(<BorderAnimate className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('supports style prop', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BorderAnimate ref={ref} style={{ color: 'red' }} />);
    expect(ref.current).toHaveStyle({ color: 'red' });
  });

  it('has correct displayName', () => {
    expect(BorderAnimate.displayName).toBe('BorderAnimate');
  });

  it('renders beam variant with colorStops without crashing', () => {
    const { container } = render(
      <BorderAnimate
        variant="beam"
        colorStops={[
          { color: 'red', position: 0 },
          { color: 'yellow', position: 50 },
          { color: 'blue', position: 100 },
        ]}
      />
    );
    expect(container.querySelector('[data-variant="beam"]')).toBeInTheDocument();
  });

  it('does not leak custom props to the DOM', () => {
    const { container } = render(
      <BorderAnimate
        variant="beam"
        colorStops={[{ color: 'red', position: 50 }]}
        timingFunction="ease-in"
        pauseOnHover
      />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('colorStops')).toBeNull();
    expect(root.getAttribute('timingFunction')).toBeNull();
  });

  it('sets data-pause-on-hover on root when pauseOnHover is true', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BorderAnimate ref={ref} pauseOnHover />);
    expect(ref.current).toHaveAttribute('data-pause-on-hover');
  });

  it('does not set data-pause-on-hover when pauseOnHover is false', () => {
    const { container } = render(<BorderAnimate pauseOnHover={false} />);
    expect(container.firstChild).not.toHaveAttribute('data-pause-on-hover');
  });

  it('renders beam with numeric size without crashing', () => {
    const { container } = render(<BorderAnimate variant="beam" size={20} />);
    expect(container.querySelector('[data-variant="beam"]')).toBeInTheDocument();
  });

  it('sets data-beam-mode to path by default', () => {
    const { container } = render(<BorderAnimate variant="beam" />);
    expect(container.querySelector('[data-beam-mode="path"]')).toBeInTheDocument();
  });

  it('sets data-beam-mode to conic when specified', () => {
    const { container } = render(<BorderAnimate variant="beam" beamMode="conic" />);
    expect(container.querySelector('[data-beam-mode="conic"]')).toBeInTheDocument();
  });

  it('does not set data-beam-mode for non-beam variants', () => {
    const { container } = render(<BorderAnimate variant="glow" />);
    expect(container.querySelector('[data-beam-mode]')).toBeNull();
  });
});
