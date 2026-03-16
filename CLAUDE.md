# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@gfazioli/mantine-border-animate` — a Mantine React component library providing animated border effects with four variants: beam, gradient, glow, and pulse. Monorepo with Yarn 4 workspaces: `package/` (component source, published to npm) and `docs/` (Next.js documentation site, deployed to GitHub Pages).

## Commands

| Command | Purpose |
|---------|---------|
| `yarn build` | Full production build (Rollup → TypeScript declarations → CSS prep) |
| `yarn dev` | Start Next.js docs dev server (port 9281) |
| `yarn test` | Full suite: syncpack + prettier + typecheck + lint + jest |
| `yarn jest` | Run Jest tests only |
| `yarn jest --testPathPattern=BorderAnimate` | Run a single test file |
| `yarn docgen` | Generate `docs/docgen.json` props metadata |
| `yarn storybook` | Launch Storybook on port 8271 |
| `yarn prettier:write` | Auto-format all files |
| `yarn lint` | ESLint + Stylelint |
| `yarn release:patch` | Bump patch version + deploy docs |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `diny yolo` | AI-assisted git commit (stages all, generates message, commits) |

## Architecture

### Component Pattern

All components **must** use Mantine's factory pattern — not plain functional components:

- `factory<Factory>()` for component definition
- `useProps('ComponentName', defaultProps, _props)` for default prop merging
- `useStyles<Factory>()` for Styles API integration
- `createVarsResolver<Factory>()` for CSS custom properties resolved from theme

The single component lives in `package/src/BorderAnimate.tsx` with co-located CSS modules (`BorderAnimate.module.css`), tests (`BorderAnimate.test.tsx`), and stories (`BorderAnimate.story.tsx`, `BorderAnimateProps.story.tsx`).

### Build Pipeline

1. **Rollup** bundles to dual ESM (`package/dist/esm/`) and CJS (`package/dist/cjs/`) with CSS extraction
2. `scripts/generate-dts.ts` produces `.d.ts` and `.d.mts` type declarations
3. `scripts/prepare-css.ts` generates `styles.css` and `styles.layer.css` (CSS layers variant)
4. CSS Modules are hashed with `hash-css-selector` using `'me'` prefix
5. `rollup-plugin-banner2` adds `'use client';` directive to all output files except `index.{js,mjs}` for Next.js App Router compatibility — don't add it manually in source

### Package Metadata

The root `package.json` is a workspace orchestrator (not published). The real npm package config is `package/package.json`.

### TypeScript Configs

- `tsconfig.json` — development (includes `package`, `scripts`, `@types`)
- `tsconfig.build.json` — production build scope (excludes tests, stories, docs)
- `tsconfig.eslint.json` — linting scope

## Conventions

### Testing

Use `@mantine-tests/core` renderer (wraps `@testing-library/react` with Mantine provider):

```typescript
import { render } from '@mantine-tests/core';
```

Jest runs in jsdom with CSS mocked via `identity-obj-proxy`. See `jsdom.mocks.cjs` for `window.matchMedia` polyfill.

### CSS Rules

- **Keyframes**: kebab-case only (`@keyframes border-beam`, not `borderBeam`)
- **No shorthand after longhand**: e.g. don't use `background:` after `background-color:`
- **CSS variables**: kebab-case, prefixed with `--border-animate-*`
- **Data attributes**: `data-with-mask` and `data-animate` control mask clipping and animation state via CSS selectors

### Import Order (enforced by Prettier)

CSS → React → Node builtins → Third-party → `@mantine/*` → Local (`..` then `./`) → CSS modules last

### Styles API

Every component exposes `classNames`, `styles`, `vars` props. Metadata for docs lives in `docs/styles-api/`. When adding selectors or CSS variables, update the corresponding styles-api file.

### Demos

Created in `docs/demos/` as `BorderAnimate.demo.*.tsx`. Two types: `'code'` (basic) and `'configurator'` (interactive). Export in `docs/demos/index.ts`.

### Docs Deployment

`scripts/nojekyll.ts` creates `.nojekyll` in `docs/out/` to prevent GitHub from ignoring `_next/` prefixed files.

### Version Sync

Run `yarn syncpack` to detect version mismatches of `@mantine/*` packages across workspaces.

## Part of Mantine Extensions Ecosystem

This repo is derived from the `mantine-base-component` template. All Mantine extension repos share the same structure. See the parent workspace `CLAUDE.md` at `/Users/giovambattistafazioli/Lavoro/GitHub/Mantine Extensions/CLAUDE.md` for cross-repo workflows (propagation, bulk updates, release process).
