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
- Data attributes drive everything from CSS: `data-variant`, `data-beam-mode`, `data-trigger`, `data-active`, `data-offscreen`, `data-animate`, `data-with-mask`, `data-pause-on-hover`, `data-reduced-motion` (set by the component from the `respectReducedMotion` prop, or from `theme.respectReducedMotion` when the prop is not given)
- Animation longhands shared by every variant (duration, count, fill, direction, delay) live in one `.border::after, .stroke` rule; a variant rule sets only `animation-name` and `animation-timing-function`
- Reduced motion gives every animation **zero length**, not `animation: none`: the ring still falls back to its resting state, and `animationend` still fires, which is what reports `onComplete` at once (verified in Chromium and Firefox, paused rings included)
- The `wedge` turns its whole `::after` with `transform: rotate()`, which the compositor runs; never animate the gradient's angle again (through 3.1 an `@property` angle repainted the gradient and its blur on the main thread every frame: 848-908 ms per 10 s for 12 rings, against 6-8 ms). The layer is a square as wide as the ring's diagonal plus `W + 2 * blur` on each side, so it covers the ring at every angle on any aspect ratio; `.border` is a `container-type: size` container so `hypot(100cqw, 100cqh)` can read the ring's size, and it clips the square (`overflow: hidden`): a mask hides paint, not overflow, so without the clip the page scrolled sideways on a phone and `withMask={false}` showed the whole square. A clip stops at the padding box, so the wedge's band is `padding`, not `border` (same box, same content box, same mask). With `withMask={false}` the blur moves from the `::after` to the ring, which blurs what it has clipped, so a background glow (`zIndex={-1}`) still spreads past the box; a filter is ink, not overflow. Engines without `hypot()` or container units fall back to `inset: -50%` (the 3.1 `colorStops` layer, bare corners on wide boxes). The compositor resumes that transform a frame or two after the main thread asks (20-35 ms per off-screen trip in Chromium), so `useCatchUp` also puts each animation's start time back once it runs again; set a start time only on a running animation, on a paused one it would play it
- A beam's resting state (where `progress` puts the dot or the wedge) is the **base value** of its rule, not a `[data-animate='false']` rule: a running animation overrides it, and anything that removes the animation (`animate={false}`, reduced motion) falls back to it. Glow and pulse still keep theirs in `[data-animate='false']` rules, because their resting gradient differs from the animated one
- `data-offscreen` pauses an infinite `always` ring scrolled out of view (with a 25% root margin, so an `offset` ring or a glow halo still in sight keeps moving); `useCatchUp` then moves the CSS animations that were paused forward by the paused time, so the pause is invisible and staggered phases survive it. Keep the two together. A finite run is never paused: its `onComplete` must not wait for a scroll
- Custom properties inherit, so a per-instance one left unset takes the value of a BorderAnimate it is nested in. `--border-animate-iterations` is therefore always emitted (`infinite` included). Older optional ones are not yet (`--border-animate-gradient-background`, `--border-animate-timing`, `--border-animate-size`, `--border-animate-dasharray`): a dot nested in a `colorStops` wedge paints the outer conic gradient. Emitting `initial` (the guaranteed-invalid value, so `var()` falls back) instead of leaving them unset would fix it

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
