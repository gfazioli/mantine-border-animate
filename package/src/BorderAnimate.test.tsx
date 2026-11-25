import { render } from '@mantine-tests/core';
import { MantineProvider } from '@mantine/core';
import { act, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { BorderAnimate, type BorderAnimateProps } from './BorderAnimate';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

expect.extend(toHaveNoViolations);

/** v2 props are gone from the public type: this types the spread without reaching for any */
function legacy(props: Record<string, unknown>) {
  return props as unknown as BorderAnimateProps;
}

/** MantineProvider injects <style> tags first, so the root element is not firstChild */
function root(container: HTMLElement) {
  return container.querySelector('.mantine-BorderAnimate-root') as HTMLElement;
}

/** Inline CSS variables live on the root element */
function vars(container: HTMLElement) {
  return root(container).style;
}

/**
 * jsdom has no AnimationEvent, so fireEvent.animationEnd drops pseudoElement: build the event
 * by hand. The masked ring animates its ::after, whose events carry '::after'.
 */
function endAnimation(element: Element, pseudoElement = '') {
  const event = new Event('animationend', { bubbles: true });
  Object.defineProperty(event, 'pseudoElement', { value: pseudoElement });
  fireEvent(element, event);
}

/**
 * The wedge's conic-gradient stops, parsed: the share of colorFrom and colorTo in each
 * color-mix (their sum is the stop's brightness) and the stop's position along the turn.
 */
function wedgeStops(container: HTMLElement) {
  return vars(container)
    .getPropertyValue('--border-animate-beam-stops')
    .split(/,\s*(?=color-mix|transparent)/)
    .map((stop) => {
      const at = Number(stop.match(/([\d.]+)%$/)![1]);
      const mix = stop.match(/color-from\) ([\d.]+)%, var\(--border-animate-color-to\) ([\d.]+)%/);

      return mix
        ? { from: Number(mix[1]), to: Number(mix[2]), at }
        : { color: stop.split(' ')[0], at };
    }) as { from: number; to: number; at: number; color?: string }[];
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

    it('adds no violations around the content it wraps, with either ring', async () => {
      const masked = render(
        <BorderAnimate>
          <button type="button">Subscribe</button>
        </BorderAnimate>
      );
      expect(await axe(masked.container)).toHaveNoViolations();

      const stroke = render(
        <BorderAnimate variant="draw" progress={40}>
          <button type="button">Subscribe</button>
        </BorderAnimate>
      );
      expect(await axe(stroke.container)).toHaveNoViolations();
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

    // Regression: only the draw branch clamped, so a negative value reached
    // offset-distance and the browser dropped the declaration
    it('clamps for every variant, not just for draw', () => {
      const low = render(<BorderAnimate animate={false} progress={-20} />);
      expect(vars(low.container).getPropertyValue('--border-animate-progress')).toBe('0');

      const high = render(<BorderAnimate animate={false} progress={140} />);
      expect(vars(high.container).getPropertyValue('--border-animate-progress')).toBe('100');
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
      const stops = wedgeStops(container);

      // The bell is drawn 1.2 times wider than spread (72deg -> 86.4deg = 24% of the turn),
      // centred on half a turn, and both ends are fully transparent: no visible edge
      expect(stops[0]).toEqual({ color: 'transparent', at: 38 });
      expect(stops[stops.length - 1]).toEqual({ color: 'transparent', at: 62 });
    });

    it('fades the wedge in and out along a bell, with colour travelling from tail to head', () => {
      const { container } = render(<BorderAnimate beamMode="wedge" />);
      const inner = wedgeStops(container).slice(1, -1);

      // Enough samples for a curve, not a row of facets
      expect(inner.length).toBeGreaterThanOrEqual(12);

      const brightness = inner.map((s) => s.from + s.to);
      const peak = brightness.indexOf(Math.max(...brightness));
      expect(Math.max(...brightness)).toBeCloseTo(100, 0);
      brightness.forEach((value, i) => {
        if (i > 0 && i <= peak) {
          expect(value).toBeGreaterThan(brightness[i - 1]);
        }
        if (i > peak) {
          expect(value).toBeLessThan(brightness[i - 1]);
        }
      });

      // colorFrom alone on the trailing side, colorTo alone on the leading one
      expect(inner[0].to).toBe(0);
      expect(inner[inner.length - 1].from).toBe(0);
    });

    it('never asks color-mix for a zero total, which would void the whole gradient', () => {
      for (const spread of [0, 1, 36, 180, 360, 999]) {
        const { container } = render(<BorderAnimate beamMode="wedge" spread={spread} />);
        wedgeStops(container)
          .slice(1, -1)
          .forEach((s) => expect(s.from + s.to).toBeGreaterThan(0));
      }
    });

    it('leaves the wedge stops alone when colorStops paints the whole gradient', () => {
      const { container } = render(
        <BorderAnimate
          beamMode="wedge"
          colorStops={[
            { color: 'red', position: 0 },
            { color: 'blue', position: 100 },
          ]}
        />
      );
      expect(vars(container).getPropertyValue('--border-animate-beam-stops')).toBe('');
      expect(vars(container).getPropertyValue('--border-animate-gradient-background')).toMatch(
        /^conic-gradient/
      );
    });
  });

  describe('comet colours', () => {
    function segmentColors(container: HTMLElement) {
      return Array.from(container.querySelectorAll('rect')).map((r) =>
        (r as unknown as HTMLElement).style.getPropertyValue('--border-animate-segment-color')
      );
    }

    it('mixes colorFrom into colorTo in the stylesheet when there are no colorStops', () => {
      const { container } = render(<BorderAnimate beamMode="comet" />);
      expect(segmentColors(container).every((c) => c === '')).toBe(true);
    });

    it('samples colorStops along the tail, from the head (0) to its end (100)', () => {
      const { container } = render(
        <BorderAnimate
          beamMode="comet"
          colorStops={[
            { color: '#ff0000', position: 0 },
            { color: '#00ff00', position: 50 },
            { color: '#0000ff', position: 100 },
          ]}
        />
      );
      const colors = segmentColors(container);

      expect(colors[0]).toBe('#ff0000');
      expect(colors[colors.length - 1]).toBe('#0000ff');
      // A segment between two stops mixes them, by how far it sits from the first
      expect(colors[3]).toMatch(/^color-mix\(in oklab, #ff0000, #00ff00 \d+(\.\d+)?%\)$/);
      expect(colors[10]).toMatch(/^color-mix\(in oklab, #00ff00, #0000ff \d+(\.\d+)?%\)$/);
    });

    it('holds the end colours beyond the first and last stop, in any order given', () => {
      const { container } = render(
        <BorderAnimate
          beamMode="comet"
          colorStops={[
            { color: '#0000ff', position: 80 },
            { color: '#ff0000', position: 20 },
          ]}
        />
      );
      const colors = segmentColors(container);
      expect(colors[0]).toBe('#ff0000');
      expect(colors[colors.length - 1]).toBe('#0000ff');
    });
  });

  describe('iterations', () => {
    it('spells out infinite by default, so a nested ring never inherits a finite count', () => {
      const { container } = render(
        <BorderAnimate iterations={2}>
          <BorderAnimate variant="dash" />
        </BorderAnimate>
      );
      const [outer, inner] = Array.from(
        container.querySelectorAll<HTMLElement>('.mantine-BorderAnimate-root')
      );
      expect(outer.style.getPropertyValue('--border-animate-iterations')).toBe('2');
      expect(inner.style.getPropertyValue('--border-animate-iterations')).toBe('infinite');
    });

    it('exposes a finite count, fractions included, and never a negative one', () => {
      const { container } = render(<BorderAnimate iterations={2.5} />);
      expect(vars(container).getPropertyValue('--border-animate-iterations')).toBe('2.5');

      const negative = render(<BorderAnimate iterations={-3} />);
      expect(vars(negative.container).getPropertyValue('--border-animate-iterations')).toBe('0');

      const endless = render(<BorderAnimate iterations={Infinity} />);
      expect(vars(endless.container).getPropertyValue('--border-animate-iterations')).toBe(
        'infinite'
      );
    });

    it('calls onComplete when the masked ring ends its last lap', () => {
      const onComplete = jest.fn();
      const { container } = render(<BorderAnimate iterations={2} onComplete={onComplete} />);

      endAnimation(container.querySelector('[data-with-mask]')!, '::after');
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('ignores an animation a consumer puts on the masked ring element itself', () => {
      const onComplete = jest.fn();
      const { container } = render(<BorderAnimate iterations={2} onComplete={onComplete} />);

      endAnimation(container.querySelector('[data-with-mask]')!);
      expect(onComplete).not.toHaveBeenCalled();
    });

    it('never reports a ring that is told never to animate', () => {
      const onComplete = jest.fn();
      const { container } = render(
        <BorderAnimate trigger="never" iterations={1} onComplete={onComplete} />
      );

      endAnimation(container.querySelector('[data-with-mask]')!, '::after');
      expect(onComplete).not.toHaveBeenCalled();
    });

    it('never reports the draw variant, which does not loop', () => {
      const onComplete = jest.fn();
      const { container } = render(
        <BorderAnimate variant="draw" iterations={1} onComplete={onComplete} />
      );

      container.querySelectorAll('rect').forEach((rect) => fireEvent.animationEnd(rect));
      expect(onComplete).not.toHaveBeenCalled();
    });

    // The browser never replays animationend, so a run that ends before hydration (at once,
    // under reduced motion) would leave onComplete waiting forever: it waits for the mount.
    it('holds a run that reports onComplete until the component mounts', () => {
      // The node build: the browser one that jsdom resolves needs MessageChannel and TextEncoder
      const { renderToString } =
        require('react-dom/server.node') as typeof import('react-dom/server');
      const html = (ui: React.ReactNode) => renderToString(<MantineProvider>{ui}</MantineProvider>);

      expect(html(<BorderAnimate iterations={2} onComplete={() => {}} />)).toContain(
        'data-pending'
      );
      expect(html(<BorderAnimate iterations={2} />)).not.toContain('data-pending');
      expect(html(<BorderAnimate onComplete={() => {}} />)).not.toContain('data-pending');

      const { container } = render(<BorderAnimate iterations={2} onComplete={() => {}} />);
      expect(root(container)).not.toHaveAttribute('data-pending');
    });

    it('calls onComplete once for the comet, not once per segment', () => {
      const onComplete = jest.fn();
      const { container } = render(
        <BorderAnimate beamMode="comet" iterations={1} onComplete={onComplete} />
      );

      container.querySelectorAll('rect').forEach((rect) => fireEvent.animationEnd(rect));
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('ignores the animations of the content it wraps', () => {
      const onComplete = jest.fn();
      const { getByText } = render(
        <BorderAnimate iterations={1} onComplete={onComplete}>
          <span>spinner</span>
        </BorderAnimate>
      );

      fireEvent.animationEnd(getByText('spinner'));
      expect(onComplete).not.toHaveBeenCalled();
    });
  });

  describe('reduced motion', () => {
    it('marks the ring from the prop, or from the theme when the prop is not given', () => {
      const mark = (ui: React.ReactNode, theme?: { respectReducedMotion: boolean }) =>
        root(render(ui, theme).container).getAttribute('data-reduced-motion');

      expect(mark(<BorderAnimate />)).toBeNull();
      expect(mark(<BorderAnimate />, { respectReducedMotion: true })).toBe('respect');
      expect(mark(<BorderAnimate respectReducedMotion />)).toBe('respect');
      expect(
        mark(<BorderAnimate respectReducedMotion={false} />, { respectReducedMotion: true })
      ).toBeNull();
    });

    // Under reduced motion the stylesheet gives every animation zero length, so it ends at once
    // and fires animationend, infinite ones included: only a finite one has laps to report.
    it('reports onComplete only for a finite animation', () => {
      const finite = jest.fn();
      const endless = jest.fn();
      const a = render(<BorderAnimate iterations={3} onComplete={finite} />);
      const b = render(<BorderAnimate onComplete={endless} />);

      endAnimation(a.container.querySelector('[data-with-mask]')!, '::after');
      endAnimation(b.container.querySelector('[data-with-mask]')!, '::after');

      expect(finite).toHaveBeenCalledTimes(1);
      expect(endless).not.toHaveBeenCalled();
    });
  });

  describe('off-screen', () => {
    const original = window.IntersectionObserver;
    let report: (isIntersecting: boolean) => void;
    let observed = 0;
    let options: IntersectionObserverInit | undefined;

    beforeEach(() => {
      observed = 0;
      window.IntersectionObserver = class {
        constructor(callback: IntersectionObserverCallback, init?: IntersectionObserverInit) {
          options = init;
          report = (isIntersecting) =>
            act(() =>
              callback(
                [{ isIntersecting } as IntersectionObserverEntry],
                this as unknown as IntersectionObserver
              )
            );
        }

        observe() {
          observed += 1;
        }

        unobserve() {}

        disconnect() {}

        takeRecords() {
          return [];
        }
      } as unknown as typeof IntersectionObserver;
    });

    afterEach(() => {
      window.IntersectionObserver = original;
      jest.restoreAllMocks();
    });

    it('pauses an always ring only once it is known to be off-screen', () => {
      const { container } = render(<BorderAnimate />);
      // Not yet observed: a server render and the first frame must not pause anything
      expect(root(container)).not.toHaveAttribute('data-offscreen');

      report(false);
      expect(root(container)).toHaveAttribute('data-offscreen');

      report(true);
      expect(root(container)).not.toHaveAttribute('data-offscreen');
    });

    function animation(currentTime: number, kind: 'animation' | 'transition' = 'animation') {
      return {
        currentTime: currentTime as number | null,
        startTime: null as number | null,
        ready: Promise.resolve(),
        playState: 'paused',
        ...(kind === 'animation' ? { animationName: 'ring' } : { transitionProperty: 'opacity' }),
      };
    }

    it('moves the clock forward by the time spent off-screen, so nothing falls out of step', () => {
      const now = jest.spyOn(performance, 'now');
      const { container } = render(<BorderAnimate />);
      const ring = container.querySelector('[data-with-mask]')!;
      const looping = animation(250);
      Object.assign(ring, { getAnimations: () => [looping] });

      now.mockReturnValue(1000);
      report(false);
      now.mockReturnValue(1600);
      report(true);

      expect(looping.currentTime).toBe(850);
    });

    // The compositor resumes the wedge's transform a frame or two late: its start time goes back
    // to what it was, once the animation runs again. A paused one keeps its own (setting it
    // would play the animation).
    it('puts the start time back once the ring runs again', async () => {
      const now = jest.spyOn(performance, 'now');
      const { container } = render(<BorderAnimate />);
      const ring = container.querySelector('[data-with-mask]')!;
      const resumed = { ...animation(250), startTime: 100 as number | null };
      const held = { ...animation(250), startTime: 100 as number | null };
      Object.assign(ring, { getAnimations: () => [resumed, held] });

      now.mockReturnValue(1000);
      report(false);
      resumed.startTime = null;
      held.startTime = null;
      resumed.playState = 'running';
      now.mockReturnValue(1600);
      report(true);
      await Promise.resolve();

      expect(resumed.startTime).toBe(100);
      expect(held.startTime).toBeNull();
      expect(held.currentTime).toBe(850);
    });

    // A transition is not paused by animation-play-state, so it already ran; an animation that
    // started during the pause (a ring shown off-screen) never waited; one that ended is gone.
    it('moves only the animations that the pause actually held', () => {
      const now = jest.spyOn(performance, 'now');
      const { container } = render(<BorderAnimate />);
      const ring = container.querySelector('[data-with-mask]')!;
      const held = animation(250);
      const fade = animation(100, 'transition');
      const gone = animation(300);
      const late = animation(50);
      let current = [held, fade, gone];
      Object.assign(ring, { getAnimations: () => current });

      now.mockReturnValue(1000);
      report(false);
      gone.playState = 'idle';
      current = [held, fade, late];
      now.mockReturnValue(1600);
      report(true);

      expect(held.currentTime).toBe(850);
      expect(fade.currentTime).toBe(100);
      expect(gone.currentTime).toBe(300);
      expect(late.currentTime).toBe(50);
    });

    it('holds a ring that changes during the pause from that moment, not from before it', () => {
      const now = jest.spyOn(performance, 'now');
      const { container, rerender } = render(<BorderAnimate />);
      const ring = container.querySelector('[data-with-mask]')!;
      const dot = animation(250);
      const wedge = animation(0);
      let current = [dot];
      Object.assign(ring, { getAnimations: () => current });

      now.mockReturnValue(1000);
      report(false);
      // Another beam mode is another animation: the dot's is gone, the wedge's starts held
      dot.playState = 'idle';
      current = [wedge];
      now.mockReturnValue(1300);
      // The same fragment render() wraps the ui in, or MantineProvider remounts the subtree
      rerender(
        <>
          <BorderAnimate beamMode="wedge" />
        </>
      );
      now.mockReturnValue(1600);
      report(true);

      expect(wedge.currentTime).toBe(300);
      expect(dot.currentTime).toBe(250);
    });

    it('never pauses a finite run, whose onComplete someone may be waiting for', () => {
      const { container } = render(<BorderAnimate iterations={2} />);
      report(false);
      expect(root(container)).not.toHaveAttribute('data-offscreen');
    });

    it('lets an always ring run a little past the edge, and keeps inView on the exact viewport', () => {
      render(<BorderAnimate />);
      expect(options?.rootMargin).toBe('25%');

      render(<BorderAnimate trigger="inView" />);
      expect(options?.rootMargin).toBeUndefined();
    });

    it('observes only the rings that loop, plus inView, and never marks inView off-screen', () => {
      render(<BorderAnimate trigger="hover" />);
      render(<BorderAnimate show={false} />);
      render(<BorderAnimate animate={false} />);
      render(<BorderAnimate variant="draw" />);
      render(<BorderAnimate iterations={3} />);
      expect(observed).toBe(0);

      const { container } = render(<BorderAnimate trigger="inView" />);
      expect(observed).toBe(1);
      report(false);
      expect(root(container)).not.toHaveAttribute('data-offscreen');
      expect(root(container)).toHaveAttribute('data-active', 'false');

      report(true);
      expect(root(container)).toHaveAttribute('data-active', 'true');
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

    // The one-time dedupe lives in module state, so every assertion shares a single test:
    // split across two, whichever ran first would silence the other.
    it('warns once for each renamed prop, and never twice', () => {
      render(<BorderAnimate {...legacy({ angle: 90 })} />);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(String(warn.mock.calls[0][0])).toContain('progress');

      render(<BorderAnimate {...legacy({ angle: 90 })} />);
      expect(warn).toHaveBeenCalledTimes(1);

      render(<BorderAnimate {...legacy({ delay: 2 })} />);
      expect(warn).toHaveBeenCalledTimes(2);
      expect(String(warn.mock.calls[1][0])).toContain('phase');

      render(<BorderAnimate {...legacy({ beamMode: 'path' })} />);
      expect(warn).toHaveBeenCalledTimes(3);
      expect(String(warn.mock.calls[2][0])).toContain('dot');
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
  // The body of the first rule written for exactly this selector
  const rule = (selector: string) =>
    css.match(new RegExp(`${selector.replace(/[[\]().:]/g, '\\$&')}\\s*\\{([^}]*)\\}`))![1];

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

  // Zero length, not `animation: none`: the ring still falls back to its resting state, and
  // animationend still fires, which is what reports onComplete to a reduced-motion user.
  // Both must reach the ::after and the strokes, where the animations are.
  it('stops a reduced-motion ring with a zero-length animation, on every animated element', () => {
    const block = css.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/)![1];
    const [selectors, body] = block.split('}')[0].split('{');

    expect(selectors.split(',').map((x) => x.trim())).toEqual([
      '.root[data-reduced-motion] > .border::after',
      '.root[data-reduced-motion] > :where(.svg) > .stroke',
    ]);
    expect(body).toMatch(/animation-duration:\s*0s\s*!important/);
    expect(body).toMatch(/animation-fill-mode:\s*none\s*!important/);
    expect(block).not.toMatch(/animation:\s*none/);
    expect(block).toMatch(/transition:\s*none\s*!important/);
  });

  // The wedge turns its layer with a transform, which the compositor runs. Through 3.1 the
  // default wedge animated the gradient's own angle (an @property), repainting it on the main
  // thread at every frame. The layer must cover the ring at every angle, so it is a square as
  // wide as the ring's diagonal, which it reads from the ring as a size container.
  it('turns the wedge with a transform, on a square that covers the ring at every angle', () => {
    const wedge = rule(".border[data-variant='beam'][data-beam-mode='wedge']::after");
    const ring = rule(".border[data-variant='beam'][data-beam-mode='wedge']");
    const square = css.match(/@supports \(width: hypot\(1cqw, 1cqh\)\) \{([\s\S]*?)\n\}/)![1];

    expect(css).not.toMatch(/@property\s+--/);
    expect(wedge).toMatch(/animation-name:\s*border-animate-beam-rotate/);
    expect(css).toMatch(
      /@keyframes border-animate-beam-rotate\s*\{[^@]*transform:\s*rotate\(360deg\)/
    );
    expect(ring).toMatch(/container-type:\s*size/);
    // The square is clipped by the ring, whose band is padding so the clip falls outside it
    expect(ring).toMatch(/overflow:\s*hidden/);
    expect(ring).toMatch(/border-width:\s*0/);
    expect(ring).toMatch(/padding:\s*var\(--border-animate-width\)/);
    // Engines without hypot() keep a layer of their own, overridden only where it is supported
    expect(wedge).toMatch(/inset:\s*-50%/);
    expect(css.indexOf('@supports (width: hypot(1cqw, 1cqh))')).toBeGreaterThan(
      css.indexOf(".border[data-variant='beam'][data-beam-mode='wedge']::after")
    );
    expect(square).toMatch(
      /hypot\(\s*100cqw \+ 2 \* var\(--border-animate-width\),\s*100cqh \+ 2 \* var\(--border-animate-width\)\s*\)/
    );
    expect(square).toMatch(
      /inset:\s*calc\(\s*50% - var\(--border-animate-wedge-diagonal\) \/ 2 - var\(--border-animate-wedge-margin\)\s*\)/
    );
  });

  // Reduced motion and animate={false} both remove the animation: the ring must then rest at
  // progress. Through 3.0.14 the resting place lived in [data-animate='false'] rules, so under
  // reduced motion the dot and the wedge sat at 0 whatever progress said.
  it('keeps the resting position in the base rule, where any stopped animation falls back', () => {
    expect(rule(".border[data-variant='beam'][data-beam-mode='dot']::after")).toMatch(
      /offset-distance:\s*calc\(var\(--border-animate-progress\) \* 1%\)/
    );
    expect(rule(".border[data-variant='beam'][data-beam-mode='wedge']::after")).toMatch(
      /transform:\s*rotate\(calc\(var\(--border-animate-progress\) \* 3\.6deg\)\)/
    );
  });

  // `iterations` reaches the stylesheet through one rule shared by every animated element: a
  // variant that set its own count would ignore it, and one without `forwards` would jump back
  // to its first frame after the last lap.
  it('lets every looping animation stop after the requested laps, where the last one ends', () => {
    const shared = css.match(/\.border::after,\s*\.stroke\s*\{([^}]*)\}/)![1];

    expect(shared).toMatch(
      /animation-iteration-count:\s*var\(--border-animate-iterations, infinite\)/
    );
    expect(shared).toMatch(/animation-fill-mode:\s*forwards/);
    expect(css.match(/animation-iteration-count:/g)).toHaveLength(2); // shared + reduced motion
    expect(css.match(/animation-fill-mode:/g)).toHaveLength(2);
  });

  it('starts nothing while a run that reports onComplete waits for the mount', () => {
    const rule = css.match(/(\.root\[data-pending\][^{]*)\{([^}]*)\}/)!;
    expect(rule[1].split(',').map((s) => s.trim())).toEqual([
      '.root[data-pending] > .border::after',
      '.root[data-pending] > :where(.svg) > .stroke',
    ]);
    expect(rule[2]).toMatch(/animation-name:\s*none\s*!important/);
  });

  it('pauses an always ring scrolled off-screen, on every animated element', () => {
    const rule = css.match(/(\.root\[data-offscreen\][^{]*)\{([^}]*)\}/)!;
    const selectors = rule[1].split(',').map((s) => s.trim());

    expect(selectors).toEqual([
      '.root[data-offscreen] > .border',
      '.root[data-offscreen] > .border::after',
      '.root[data-offscreen] > :where(.svg) > .stroke',
    ]);
    expect(rule[2]).toMatch(/animation-play-state:\s*paused/);
  });

  // trigger="never" documents a resting, static border. Without this exclusion it inherits
  // the hidden state of the other triggers and becomes a slower show={false}.
  it('keeps the never trigger visible', () => {
    const exclusions = css.match(/\[data-trigger\]:not\(\[data-trigger='never'\]\)/g) ?? [];
    expect(exclusions.length).toBeGreaterThanOrEqual(2);
  });

  // An inView border is revealed by `data-active`, against rules that hide it at rest. Through
  // 3.0.12 the reveal weighed less than the hiding rule and lost whatever its place in the file:
  // an inView border stayed at opacity 0 on screen, and a draw stroke stayed collapsed. The
  // reveal must not win where it should not either: pauseOnHover still pauses an active border.
  describe('the inView cascade', () => {
    const plain = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const rules = [...plain.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match, index) => ({
      index,
      selectors: match[1].split(',').map((selector) => selector.trim()),
      body: match[2],
    }));
    // The middle column of a selector's specificity: classes, attributes and pseudo-classes.
    // `:not()` counts by its argument, already among the attributes; `:where()` counts nothing;
    // a pseudo-element (`::after`) belongs to the third column.
    const weight = (selector: string) => {
      const bare = selector.replace(/:where\([^)]*\)/g, '');
      return (
        (bare.match(/\[[^\]]*\]/g) ?? []).length +
        (bare.replace(/\[[^\]]*\]/g, '').match(/\.[A-Za-z][\w-]*/g) ?? []).length +
        (bare.match(/(?<!:):(?!:)(?!not\()[a-z-]+/g) ?? []).length
      );
    };
    const find = (declaration: string, test: (selector: string) => boolean) =>
      rules.flatMap((rule) =>
        rule.body.includes(declaration)
          ? rule.selectors.filter(test).map((selector) => ({ selector, index: rule.index }))
          : []
      );
    const beats = (
      a: { selector: string; index: number },
      b: { selector: string; index: number }
    ) =>
      weight(a.selector) > weight(b.selector) ||
      (weight(a.selector) === weight(b.selector) && a.index > b.index);

    it.each([
      ['.border', '--border-animate-active: 0', '--border-animate-active: 1'],
      ['.svg', '--border-animate-active: 0', '--border-animate-active: 1'],
      ["[data-variant='draw'] > .stroke", 'stroke-dashoffset: 100px', 'draw-offset'],
    ])('reveals the %s ring over the rule that hides it', (ring, hidden, shown) => {
      const hide = find(hidden, (selector) => selector.endsWith(ring.split(' > ').pop()!));
      const reveal = find(shown, (selector) =>
        selector.includes("[data-trigger='inView'][data-active='true']")
      );
      const own = reveal.filter((r) => r.selector.endsWith(ring));
      expect(hide.length).toBeGreaterThan(0);
      expect(own.length).toBeGreaterThan(0);
      // `>`: the root's own ring, not the ring of a BorderAnimate nested inside it
      expect(own.filter((r) => !/\[data-active='true'\] > /.test(r.selector))).toEqual([]);
      const losing = own.flatMap((r) =>
        hide.filter((h) => !beats(r, h)).map((h) => ({ reveal: r.selector, hide: h.selector }))
      );
      expect(losing).toEqual([]);
    });

    it('reaches only its own ring, so a nested BorderAnimate keeps its own state', () => {
      const state = rules.flatMap((rule) =>
        rule.selectors.filter((selector) => selector.startsWith('.root['))
      );
      expect(state.length).toBeGreaterThan(10);
      // Only child combinators between the root and its ring: no descendant one.
      const descendant = state.filter((selector) =>
        /\S\s+[^>\s]/.test(selector.replace(/\s*>\s*/g, '>'))
      );
      expect(descendant).toEqual([]);
    });

    // Through 3.0.12 the pause sat above the running rules and weighed as much as the hover and
    // focus-within ones: a focused focus-within border kept running under the pointer.
    it('lets pauseOnHover pause a ring whichever trigger runs it', () => {
      const pause = find('animation-play-state: paused', (selector) =>
        selector.includes('[data-pause-on-hover]:hover')
      );
      const running = find('animation-play-state: running', () => true);
      expect(pause.length).toBeGreaterThan(0);
      expect(running.length).toBeGreaterThan(0);
      // The element a selector styles: its last compound, pseudo-element included.
      const target = (selector: string) => selector.split(/\s|>/).filter(Boolean).pop()!;
      const unpaused = running.flatMap((r) => {
        const rivals = pause.filter((p) => target(p.selector) === target(r.selector));
        return rivals.length === 0
          ? [{ running: r.selector, pause: 'none' }]
          : rivals
              .filter((p) => !beats(p, r))
              .map((p) => ({ running: r.selector, pause: p.selector }));
      });
      expect(unpaused).toEqual([]);
    });

    // An `animation` shorthand resets animation-play-state as well. A variant rule written with
    // one sets its ring running again after the state rules, whenever it weighs as much: through
    // 3.0.12 a comet ignored pauseOnHover, and every variant ran while a trigger hid it.
    it('leaves the play state to the state rules: no animation shorthand but `none`', () => {
      const shorthands = rules.flatMap((rule) =>
        /(^|;)\s*animation:(?!\s*none)/.test(rule.body) ? rule.selectors : []
      );
      expect(shorthands).toEqual([]);
      expect(plain).toMatch(/animation-name:\s*border-animate-march/);
    });
  });
});
