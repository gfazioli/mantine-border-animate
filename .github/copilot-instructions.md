# Copilot Instructions for Mantine BorderAnimate Component

## Project Overview

This repository contains a Mantine-based animated border component (`@gfazioli/mantine-border-animate`). It provides a flexible wrapper that turns any Mantine or plain React element into a component with animated borders. The component includes four distinct variants: beam (a traveling glow along the perimeter), gradient (a rotating conic gradient), glow (a rhythmic pulsation), and pulse (a subtle expand-and-fade breathing effect).

## Project Purpose

The component is designed for:
- Adding animated border effects to any UI element
- Creating eye-catching cards, buttons, alerts, and interactive elements
- Building layered visual effects with multiple animated borders
- Providing controllable, performant CSS-only border animations

## Technology Stack

- **Framework**: React 19
- **UI Library**: Mantine 8.x
- **Language**: TypeScript 5.9
- **Build Tool**: Rollup
- **Package Manager**: Yarn 4
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint with Mantine config
- **Code Formatting**: Prettier with sort-imports plugin
- **CSS**: PostCSS with Mantine preset, CSS Modules
- **Documentation**: Storybook and Next.js docs site

## Repository Structure

- `package/`: Main package source code
  - `src/`: Component source files
    - `BorderAnimate.tsx`: Main component using Mantine factory pattern
    - `BorderAnimate.module.css`: Component styles with 4 variant animations
    - `BorderAnimate.test.tsx`: Component tests
- `docs/`: Documentation site (Next.js, deployed to GitHub Pages)
- `scripts/`: Build and release scripts
- `.storybook/`: Storybook configuration

## Build and Development Process

### Installation
```bash
yarn install
```

### Development
```bash
yarn dev          # Start dev server (docs site, port 9281)
yarn storybook    # Start Storybook on port 8271
```

### Building
```bash
yarn build        # Build the package
yarn docs:build   # Build documentation site
```

### Testing
```bash
yarn test         # Run all tests (syncpack, prettier, typecheck, lint, jest)
yarn jest         # Run Jest tests only
yarn typecheck    # TypeScript type checking
```

### Linting and Formatting
```bash
yarn lint                # Run both ESLint and Stylelint
yarn prettier:check      # Check code formatting
yarn prettier:write      # Format code
```

## Coding Standards

### Component Pattern
- Use Mantine's `factory<>()` pattern (not plain functional components)
- Use `useProps()` for default prop merging
- Use `useStyles<>()` for Styles API integration
- Use `createVarsResolver<>()` for CSS custom properties

### TypeScript
- Strict type checking, avoid `any` types
- All props must be well-typed interfaces

### CSS
- Use CSS Modules (`.module.css` files)
- Keyframes in kebab-case
- CSS variables prefixed with `--border-animate-*`
- Use Mantine styling tokens

### Testing
- Use `@mantine-tests/core` renderer (wraps components with MantineProvider)
- Test accessibility with jest-axe

## Key Files

- `package/src/BorderAnimate.tsx`: Main component implementation
- `package/src/BorderAnimate.module.css`: CSS animations and styles
- `package/package.json`: Published package metadata
- `rollup.config.mjs`: Build configuration

## Release Process

- `yarn release:patch`: Patch version bump + deploy docs
- `yarn release:minor`: Minor version bump + deploy docs
- `yarn release:major`: Major version bump + deploy docs
