# Mantine Border Animate Component

<img alt="Mantine Border Animate" src="https://github.com/gfazioli/mantine-border-animate/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-border-animate?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

[Mantine BorderAnimate](https://gfazioli.github.io/mantine-border-animate) provides a flexible wrapper that turns any Mantine or plain React element into a visually striking component with animated borders. Designed for both aesthetics and performance, it uses CSS animations to deliver smooth 60fps effects and exposes controls to tailor the look and behavior: you can show/hide the border, keep it static or continuously animated, and adjust parameters like size, radius, border width, blur, duration, and color transitions.

The component includes five distinct variants — **beam** (a traveling glow along the perimeter, with three rendering modes), **glow** (a rhythmic pulsation with tunable blur and opacity), **pulse** (a subtle expand-and-fade "breathing" effect), **draw** (a border that measures a value) and **dash** (a dashed border that marches around the perimeter).

Key features include:

- **Three beam rendering modes** — `dot` (a radial-gradient dot traveling along the border via CSS offset-path, uniform at every position), `wedge` (a rotating conic-gradient with a spread you set in degrees) and `comet` (a head with a fading tail, at constant speed on any shape)
- **A border that measures** — `variant="draw"` with `progress` (0-100) draws exactly that share of the real perimeter, corners included, with an optional track underneath
- **Dashed borders** — `variant="dash"` with `dashSize`, `dashGap`, `count` and `dashCap`: marching ants, dots, or a fixed number of evenly spaced segments
- **Triggers** — `trigger` starts the animation on `hover`, on `focus-within`, or only while the component is `inView`
- **Detached rings** — `offset` pushes the border away from the content and keeps it concentric
- **Custom color stops** — multi-color gradients via `colorStops`
- **Pause on hover** — `pauseOnHover` prop to pause animations during user interaction
- **Custom timing functions** — `timingFunction` prop for full control over animation easing
- **Accessible** — honors `prefers-reduced-motion` through the Mantine theme, and marks the decorative ring `aria-hidden`

Advanced visual setups are supported through masking and layering: `withMask` clips the effect to the border area, while disabling it and using `zIndex` allows soft background glows behind content. Integration is straightforward via provided stylesheet imports, and examples demonstrate wrapping common Mantine components like Paper, Cards, Buttons, Inputs, and Alerts.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-border-animate/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-border-animate
```
or

```sh
yarn add @gfazioli/mantine-border-animate
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-border-animate/styles.css';
```

## Usage

```tsx
import { Stack, Title } from '@mantine/core';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';

function Demo() {
  return (
    <BorderAnimate w={300} p={32}>
      <Stack>
        <Title>This is a title</Title>
        <p>This is a paragraph inside the BorderAnimate component.</p>
      </Stack>
    </BorderAnimate>
  );
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long‑term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.
