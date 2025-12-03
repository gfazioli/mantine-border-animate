# Mantine BorderAnimate Component

<div align="center">

https://github.com/user-attachments/assets/ce2b1ba2-51f7-43d5-8477-6d8fee103fa3

</div>

---

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-border-animate?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-border-animate)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-border-animate?style=for-the-badge)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

[![Mantine UI Library](https://img.shields.io/badge/-MANTINE_UI_LIBRARY-blue?style=for-the-badge&labelColor=black&logo=mantine
)](https://mantine.dev/)

An interactive JSON tree viewer component built with Mantine's Tree component. Features collapsible nodes, syntax highlighting with type-specific colors, copy-to-clipboard functionality, item count badges, configurable expansion depth, and smooth animations. Perfect for debugging API responses, exploring complex data structures, and developer tools.

[![Mantine Extensions](https://img.shields.io/badge/-Watch_the_Video-blue?style=for-the-badge&labelColor=black&logo=youtube
)](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4)
[![Demo and Documentation](https://img.shields.io/badge/-Demo_%26_Documentation-blue?style=for-the-badge&labelColor=black&logo=typescript
)](https://gfazioli.github.io/mantine-border-animate/)
[![Mantine Extensions HUB](https://img.shields.io/badge/-Mantine_Extensions_Hub-blue?style=for-the-badge&labelColor=blue
)](https://mantine-extensions.vercel.app/)


👉 You can find more components on the [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) library.

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

<div align="center">
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-border-animate&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-border-animate&Timeline)

</div>
