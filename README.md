# Mantine Border Animate Component

<img width="2752" height="1536" alt="mantine Border Animate" src="https://github.com/user-attachments/assets/b174d04c-c9cf-462a-b074-a23f4a521c9a" />

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-border-animate?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

[Mantine BorderAnimate](https://gfazioli.github.io/mantine-border-animate) provides a flexible wrapper that turns any Mantine or plain React element into a visually striking component with animated borders. Designed for both aesthetics and performance, it uses CSS animations to deliver smooth 60fps effects and exposes controls to tailor the look and behavior: you can show/hide the border, keep it static or continuously animated, and adjust parameters like size, radius, border width, blur, duration, and color transitions. 

The component includes four distinct variants—beam (a traveling glow along the perimeter with adjustable anchor and duration), gradient (a rotating conic gradient between two colors with optional blur), glow (a rhythmic pulsation with tunable blur and opacity), and pulse (a subtle expand‑and‑fade “breathing” effect). 

Advanced visual setups are supported through masking and layering: withMask clips the effect to the border, while disabling it and using zIndex allows soft background glows behind content; anchor positioning further refines inner vs outer illumination. Integration is straightforward via provided stylesheet imports, and examples demonstrate wrapping common Mantine components like Paper, Stack, Title, and Flex to achieve eye‑catching, controllable borders across a wide range of UI elements.

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

---
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-border-animate&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-border-animate&Timeline)
