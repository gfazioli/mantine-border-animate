# CLAUDE.md

## Project
`@gfazioli/mantine-border-animate` — a Mantine 9 React component library providing animated border effects with five variants: beam, glow, pulse, draw, and dash.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run oxlint + Stylelint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push); it needs a TTY, so from Claude Code commit with `git commit` + `git push` |

> **Important**: After changing the public API, always run `yarn clean && yarn build` before `yarn test`.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 16 documentation site).

### Package Source (`package/src/`)
- `BorderAnimate.tsx` / `BorderAnimate.module.css` — single component (factory pattern) with five animation variants
- `BorderAnimate.test.tsx` / `BorderAnimate.story.tsx` / `BorderAnimateProps.story.tsx` — tests and stories
- `index.ts` — public exports
- `@types/jest-axe.d.ts` (repo root) — ambient declarations so `yarn typecheck` passes without a `@types/jest-axe` dependency

### Build Pipeline
Rollup bundles to dual ESM/CJS with `'use client'` banner. CSS modules hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS split into `styles.css` and `styles.layer.css`.

## Component Details
- Five animation variants: `beam`, `glow`, `pulse` (masked CSS ring) and `draw`, `dash` (SVG stroke ring), plus three beam modes: `dot`, `wedge`, `comet`
- Per-variant defaults are resolved **in the component**, not in `defaultProps`, because they differ by variant (`duration` 1 for draw, `blur` 0 for draw/dash, `zIndex` -1 for glow, `withMask` false for glow)
- CSS keyframes must be kebab-case (`@keyframes border-beam`, not `borderBeam`)
- CSS variables prefixed with `--border-animate-*`
- Data attributes drive everything from CSS: `data-variant`, `data-beam-mode`, `data-trigger`, `data-active`, `data-offscreen`, `data-animate`, `data-with-mask`, `data-color-stops`, `data-pause-on-hover`, `data-reduced-motion` (set by the component from the `respectReducedMotion` prop, or from `theme.respectReducedMotion` when the prop is not given)
- Animation longhands shared by every variant (duration, count, fill, direction, delay) live in one `.border::after, .stroke` rule; a variant rule sets only `animation-name` and `animation-timing-function`
- Reduced motion gives every animation **zero length**, not `animation: none`: the ring still falls back to its resting state, and `animationend` still fires, which is what reports `onComplete` at once (verified in Chromium and Firefox, paused rings included)
- A beam's resting state (where `progress` puts the dot or the wedge) is the **base value** of its rule, not a `[data-animate='false']` rule: a running animation overrides it, and anything that removes the animation (`animate={false}`, reduced motion) falls back to it. Glow and pulse still keep theirs in `[data-animate='false']` rules, because their resting gradient differs from the animated one
- `data-offscreen` pauses an infinite `always` ring scrolled out of view (with a 25% root margin, so an `offset` ring or a glow halo still in sight keeps moving); `useCatchUp` then moves the CSS animations that were paused forward by the paused time, so the pause is invisible and staggered phases survive it. Keep the two together. A finite run is never paused: its `onComplete` must not wait for a scroll
- Every per-instance custom property the stylesheet relies on must be emitted even at its default (`--border-animate-iterations: infinite`): custom properties inherit, so a nested BorderAnimate would otherwise take its parent's value

### The SVG ring primitive (draw / dash / comet)
`<rect pathLength="100">` normalizes the perimeter, so every `stroke-dasharray` value is a **percentage
of the real perimeter**, corners included — no `ResizeObserver`, no JS per frame. Two rules come with it:

- **A dash period must divide 100.** Otherwise the last dash is cut where the perimeter closes — the
  first corner — and reads as the animation snagging there. `getDashPattern` snaps the period; the
  comet's period is exactly one perimeter.
- Keep `width="100%" height="100%"` as **attributes** on every `<rect>`: they are the fallback for
  engines without CSS geometry properties.

### Verifying visual changes
jsdom computes no stacking contexts, masks or pseudo-elements, so four of v3's fixes were invisible
to the suite by construction. `BorderAnimate.test.tsx` therefore ends with a
`describe('BorderAnimate.module.css')` block that reads the stylesheet and asserts those CSS-only
invariants as canaries (`isolation: isolate` on the root, the glow/pulse `::after` inset, the mask
applying to every variant, the `never` trigger staying visible). Anything visual still needs a real
rendered pixel — a Storybook story plus the Chrome tools — before it counts as verified.

## Testing
Jest with `jsdom`, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Tests use `@mantine-tests/core` render helper.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace (the parent directory) for:
- Development checklist and cross-cutting patterns (compound components, responsive CSS, GitHub sync): the workspace's `.claude/rules/component-development.md`, which loads with this repo's files
- Update packages workflow: the workspace's `fleet-maintenance` skill
- Release process: the workspace's `/release` command
