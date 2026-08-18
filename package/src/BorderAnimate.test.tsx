import { render } from '@mantine-tests/core';
import React from 'react';
import { BorderAnimate } from './BorderAnimate';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** MantineProvider injects <style> tags first, so the root element is not firstChild */
function root(container: HTMLElement) {
  return container.querySelector('.mantine-BorderAnimate-root') as HTMLElement;
}

/** Inline CSS variables live on the root element */
function vars(container: HTMLElement) {
  return root(container).style;
}

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
    expect(container.querySelectorAll('[data-with-mask]').length).toBe(1);
  });

  it('does not render border element when show is false', () => {
    const { container } = render(<BorderAnimate show={false} />);
    expect(container.querySelectorAll('[data-with-mask]').length).toBe(0);
  });

  it('sets data-animate attribute correctly', () => {
    const { container, rerender } = render(<BorderAnimate animate />);
    expect(container.querySelector('[data-animate="true"]')).toBeInTheDocument();

    rerender(<BorderAnimate animate={false} />);
    expect(container.querySelector('[data-animate="false"]')).toBeInTheDocument();
  });

  it('leaves the glow unmasked by default, so its halo can spread outwards', () => {
    const { container } = render(<BorderAnimate variant="glow" />);
    expect(container.querySelector('[data-with-mask="false"]')).toBeInTheDocument();
  });

  it('clips the glow when the mask is asked for explicitly', () => {
    const { container } = render(<BorderAnimate variant="glow" withMask />);
    expect(container.querySelector('[data-with-mask="true"]')).toBeInTheDocument();
  });

  it('sets data-with-mask attribute correctly', () => {
    const { container, rerender } = render(<BorderAnimate withMask />);
    expect(container.querySelector('[data-with-mask="true"]')).toBeInTheDocument();

    rerender(<BorderAnimate withMask={false} />);
    expect(container.querySelector('[data-with-mask="false"]')).toBeInTheDocument();
  });

  it('renders each variant', () => {
    const variants = ['beam', 'glow', 'pulse', 'draw', 'dash'] as const;
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
        spread={90}
        tail={40}
        dashSize={2}
      />
    );
    const el = root(container);
    expect(el.getAttribute('colorStops')).toBeNull();
    expect(el.getAttribute('timingFunction')).toBeNull();
    expect(el.getAttribute('spread')).toBeNull();
    expect(el.getAttribute('tail')).toBeNull();
    expect(el.getAttribute('dashSize')).toBeNull();
  });

  it('sets data-pause-on-hover on root when pauseOnHover is true', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BorderAnimate ref={ref} pauseOnHover />);
    expect(ref.current).toHaveAttribute('data-pause-on-hover');
  });

  it('does not set data-pause-on-hover when pauseOnHover is false', () => {
    const { container } = render(<BorderAnimate pauseOnHover={false} />);
    expect(root(container)).not.toHaveAttribute('data-pause-on-hover');
  });

  it('ignores pauseOnHover when trigger is hover (they would contradict each other)', () => {
    const { container } = render(<BorderAnimate pauseOnHover trigger="hover" />);
    expect(root(container)).not.toHaveAttribute('data-pause-on-hover');
  });

  it('renders beam with numeric size without crashing', () => {
    const { container } = render(<BorderAnimate variant="beam" size={20} />);
    expect(container.querySelector('[data-variant="beam"]')).toBeInTheDocument();
  });

  it('sets data-beam-mode to dot by default', () => {
    const { container } = render(<BorderAnimate variant="beam" />);
    expect(container.querySelector('[data-beam-mode="dot"]')).toBeInTheDocument();
  });

  it('sets data-beam-mode to wedge when specified', () => {
    const { container } = render(<BorderAnimate variant="beam" beamMode="wedge" />);
    expect(container.querySelector('[data-beam-mode="wedge"]')).toBeInTheDocument();
  });

  it('does not set data-beam-mode for non-beam variants', () => {
    const { container } = render(<BorderAnimate variant="glow" />);
    expect(container.querySelector('[data-beam-mode]')).toBeNull();
  });

  describe('accessibility', () => {
    it('hides the decorative ring from assistive technology', () => {
      const { container } = render(<BorderAnimate />);
      expect(container.querySelector('[data-with-mask]')).toHaveAttribute('aria-hidden', 'true');
    });

    it('hides the decorative svg ring from assistive technology', () => {
      const { container } = render(<BorderAnimate variant="draw" />);
      expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('zIndex', () => {
    it('defaults to 1', () => {
      const { container } = render(<BorderAnimate />);
      expect(vars(container).getPropertyValue('--border-animate-z-index')).toBe('1');
    });

    it('defaults to -1 for the glow variant, which renders behind the content', () => {
      const { container } = render(<BorderAnimate variant="glow" />);
      expect(vars(container).getPropertyValue('--border-animate-z-index')).toBe('-1');
    });

    // Regression: in v2 a CSS rule forced z-index:-1 on glow and silently beat the prop
    it('honours the prop on the glow variant', () => {
      const { container } = render(<BorderAnimate variant="glow" zIndex={5} />);
      expect(vars(container).getPropertyValue('--border-animate-z-index')).toBe('5');
    });
  });

  describe('per-variant defaults', () => {
    it('uses a 5s duration by default and 1s for draw', () => {
      const { container } = render(<BorderAnimate />);
      expect(vars(container).getPropertyValue('--border-animate-duration')).toBe('5s');

      const draw = render(<BorderAnimate variant="draw" />);
      expect(vars(draw.container).getPropertyValue('--border-animate-duration')).toBe('1s');
    });

    it('keeps the stroke variants crisp by defaulting their blur to zero', () => {
      const { container } = render(<BorderAnimate variant="dash" />);
      expect(vars(container).getPropertyValue('--border-animate-blur')).toBe('0rem');

      const beam = render(<BorderAnimate />);
      expect(vars(beam.container).getPropertyValue('--border-animate-blur')).toBe(
        'var(--border-animate-blur-xs)'
      );
    });

    it('lets an explicit value win over the per-variant default', () => {
      const { container } = render(<BorderAnimate variant="draw" duration={4} blur={8} />);
      expect(vars(container).getPropertyValue('--border-animate-duration')).toBe('4s');
      expect(vars(container).getPropertyValue('--border-animate-blur')).not.toBe('0rem');
    });
  });

  describe('progress', () => {
    it('drives the draw offset', () => {
      const { container } = render(<BorderAnimate variant="draw" progress={65} />);
      expect(vars(container).getPropertyValue('--border-animate-draw-offset')).toBe('35');
    });

    it('clamps out-of-range values', () => {
      const low = render(<BorderAnimate variant="draw" progress={-20} />);
      expect(vars(low.container).getPropertyValue('--border-animate-draw-offset')).toBe('100');

      const high = render(<BorderAnimate variant="draw" progress={140} />);
      expect(vars(high.container).getPropertyValue('--border-animate-draw-offset')).toBe('0');
    });

    it('is exposed to every variant as a perimeter position', () => {
      const { container } = render(<BorderAnimate animate={false} progress={25} />);
      expect(vars(container).getPropertyValue('--border-animate-progress')).toBe('25');
    });
  });

  describe('stroke ring', () => {
    it('renders a rect normalised to pathLength 100', () => {
      const { container } = render(<BorderAnimate variant="draw" />);
      const rect = container.querySelector('rect');
      expect(rect).toHaveAttribute('pathLength', '100');
    });

    it('does not render an svg for the masked variants', () => {
      const { container } = render(<BorderAnimate variant="pulse" />);
      expect(container.querySelector('svg')).toBeNull();
    });

    it('renders enough graded segments for the tail to read as a gradient', () => {
      const { container } = render(<BorderAnimate beamMode="comet" />);
      // Few segments make the tail look like a row of blocks instead of a fade
      expect(container.querySelectorAll('rect').length).toBeGreaterThanOrEqual(12);
    });

    // Regression: a period of `step + 100` does not divide the perimeter, so the dash was
    // clipped at the end of the path with nothing entering from the start — the comet
    // shrank and popped every time it crossed the first corner.
    it('gives the comet a dash pattern that closes on the perimeter', () => {
      const { container } = render(<BorderAnimate beamMode="comet" tail={30} />);
      const [on, off] = vars(container)
        .getPropertyValue('--border-animate-dasharray')
        .split(' ')
        .map(Number);

      expect(on + off).toBeCloseTo(100, 6);

      // The segments overlap, so the tail is only as long as the last one reaches
      const rects = Array.from(container.querySelectorAll('rect'));
      const last = Number(
        (rects[rects.length - 1] as unknown as HTMLElement).style.getPropertyValue(
          '--border-animate-segment'
        )
      );
      expect(last + on).toBeCloseTo(30, 6);
    });

    it('places every comet segment behind the head, fading as it goes', () => {
      const { container } = render(<BorderAnimate beamMode="comet" tail={30} />);
      const segments = Array.from(container.querySelectorAll('rect')).map((r) => {
        const { style } = r as unknown as HTMLElement;
        return {
          offset: Number(style.getPropertyValue('--border-animate-segment')),
          opacity: Number(style.getPropertyValue('--border-animate-segment-opacity')),
        };
      });

      expect(segments[0].offset).toBe(0);
      expect(segments[0].opacity).toBe(1);

      for (let i = 1; i < segments.length; i += 1) {
        expect(segments[i].offset).toBeGreaterThan(segments[i - 1].offset);
        expect(segments[i].opacity).toBeLessThan(segments[i - 1].opacity);
      }

      expect(segments[segments.length - 1].opacity).toBeGreaterThan(0);
    });

    it('flips the comet tail when the animation is reversed', () => {
      const { container } = render(<BorderAnimate beamMode="comet" reverse />);
      const second = (container.querySelectorAll('rect')[1] as unknown as HTMLElement).style;
      expect(Number(second.getPropertyValue('--border-animate-segment'))).toBeLessThan(0);
    });

    it('renders a track only when asked', () => {
      const without = render(<BorderAnimate variant="draw" />);
      expect(without.container.querySelectorAll('rect').length).toBe(1);

      const withTrack = render(<BorderAnimate variant="draw" withTrack />);
      expect(withTrack.container.querySelectorAll('rect').length).toBe(2);
    });
  });

  describe('dash pattern', () => {
    // Regression: the pattern is anchored to the start of the path, so a period that does
    // not divide 100 breaks the last dash right where the perimeter closes.
    it('keeps the dash ratio while snapping the period to the perimeter', () => {
      const { container } = render(<BorderAnimate variant="dash" dashSize={6} dashGap={2} />);
      const [on, off] = vars(container)
        .getPropertyValue('--border-animate-dasharray')
        .split(' ')
        .map(Number);
      const period = Number(vars(container).getPropertyValue('--border-animate-dash-period'));

      expect(on + off).toBeCloseTo(period, 6);
      expect(on / off).toBeCloseTo(3, 6);
      expect(100 / period).toBeCloseTo(Math.round(100 / period), 6);
      expect(period).toBeCloseTo(8, 0);
    });

    it('closes the pattern for any dash and gap the consumer asks for', () => {
      for (const [dashSize, dashGap] of [
        [4, 4],
        [1, 1],
        [0.5, 5],
        [8, 6],
        [25, 25],
        [3, 11],
      ]) {
        const { container } = render(
          <BorderAnimate variant="dash" dashSize={dashSize} dashGap={dashGap} />
        );
        const period = Number(vars(container).getPropertyValue('--border-animate-dash-period'));
        expect(100 / period).toBeCloseTo(Math.round(100 / period), 6);
      }
    });

    it('distributes count segments evenly and keeps the dash/gap ratio', () => {
      const { container } = render(
        <BorderAnimate variant="dash" count={4} dashSize={1} dashGap={1} />
      );
      expect(vars(container).getPropertyValue('--border-animate-dasharray')).toBe('12.5 12.5');
      expect(vars(container).getPropertyValue('--border-animate-dash-period')).toBe('25');
      // count always divides the perimeter, so it is seamless by construction
      expect(100 / 25).toBe(4);
    });

    it('exposes the cap so a small dash can become a dot', () => {
      const { container } = render(<BorderAnimate variant="dash" dashCap="round" />);
      expect(vars(container).getPropertyValue('--border-animate-dash-cap')).toBe('round');
    });
  });

  describe('trigger', () => {
    it('does not mark the root when the animation always runs', () => {
      const { container } = render(<BorderAnimate />);
      expect(root(container)).not.toHaveAttribute('data-trigger');
    });

    it('marks the root for state triggers', () => {
      const { container } = render(<BorderAnimate trigger="focus-within" />);
      expect(root(container)).toHaveAttribute('data-trigger', 'focus-within');
    });

    it('reports viewport state only for the inView trigger', () => {
      const { container } = render(<BorderAnimate trigger="inView" />);
      expect(root(container)).toHaveAttribute('data-active');

      const hover = render(<BorderAnimate trigger="hover" />);
      expect(root(hover.container)).not.toHaveAttribute('data-active');
    });
  });

  describe('geometry', () => {
    it('exposes the offset that detaches the ring from the element', () => {
      const { container } = render(<BorderAnimate offset={12} />);
      expect(vars(container).getPropertyValue('--border-animate-offset')).toBe(
        'calc(0.75rem * var(--mantine-scale))'
      );
    });

    it('emits the phase negated, so the animation starts already running', () => {
      const { container } = render(<BorderAnimate phase={2} />);
      expect(vars(container).getPropertyValue('--border-animate-phase')).toBe('-2s');
    });

    it('turns the wedge spread into conic gradient stops', () => {
      const { container } = render(<BorderAnimate beamMode="wedge" spread={72} />);
      expect(vars(container).getPropertyValue('--border-animate-beam-start')).toBe('40%');
      expect(vars(container).getPropertyValue('--border-animate-beam-end')).toBe('60%');
    });
  });

  describe('v2 props', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warn.mockRestore();
    });

    it('warns once when a renamed prop is still used', () => {
      render(<BorderAnimate {...({ angle: 90 } as any)} />);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('progress');

      render(<BorderAnimate {...({ angle: 90 } as any)} />);
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it('warns about a renamed beam mode', () => {
      render(<BorderAnimate {...({ beamMode: 'path' } as any)} />);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('dot');
    });
  });
});

/**
 * Invariants that only exist in CSS: jsdom does not compute pseudo-elements, stacking
 * contexts or mask geometry, so these read the stylesheet itself. Each one guards a bug
 * that shipped in v2 and was verified in a real browser.
 */
describe('BorderAnimate.module.css', () => {
  const css = readFileSync(join(__dirname, 'BorderAnimate.module.css'), 'utf-8');

  it('gives the root a stacking context, so a glow cannot fall behind an ancestor', () => {
    expect(css).toMatch(/\.root\s*\{[^}]*isolation:\s*isolate/);
  });

  it('no longer forces z-index on the glow variant from CSS', () => {
    expect(css).not.toMatch(/\[data-variant='glow'\]\s*\{[^}]*z-index/);
  });

  it('covers the whole masked band with the glow and pulse gradient', () => {
    expect(css).toMatch(/inset:\s*calc\(var\(--border-animate-width\)\s*\*\s*-1\)/);
    expect(css).not.toMatch(/inset:\s*-1px/);
  });

  it('applies the mask to every variant, glow included', () => {
    expect(css).not.toMatch(/:not\(\[data-variant='glow'\]\)/);
  });

  it('honours theme.respectReducedMotion instead of overriding it', () => {
    expect(css).toMatch(/\[data-respect-reduced-motion\]/);
  });
});
