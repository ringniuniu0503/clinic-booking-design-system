# Clinic Booking Design System

Design system + Storybook for an internal booking system for a Traditional Chinese Medicine (中醫) clinic. Designed in Figma by Wei Hsin Chen (UX/UI designer); implemented with Claude Code as a showcase of an AI-assisted design-to-code workflow.

## Stack

- Vite + React + TypeScript
- Storybook (component docs + visual review)
- Styling: Tailwind CSS v4. Design tokens are CSS variables defined in `@theme` (`src/styles/tokens.css`) and used as Tailwind classes. Component variants are mapped with `cva` (class-variance-authority). No CSS-in-JS, no arbitrary values like `bg-[#008ADA]`.

## Commands

- `npm run storybook` — run Storybook at http://localhost:6006
- `npm run build-storybook` — static build (deployed to GitHub Pages later)
- `npm run lint` — lint before every commit

## Source of truth: Figma

- File key: `p6t7CxMI15VtUqremnHbUo`
- 🎨 Style & Components page: Style `1:2770`, Atoms `1:1174`, Molecules `1:2099`, Patterns section "Patterns 新增元件"
- Always read the Figma node (via the Figma MCP) before building or changing a component. Figma wins over assumptions.

## Design tokens

- Two tiers only:
  - Primitives = raw values, named by what they are: `color/primary/600`, `spacing/4`, `radius/xs`
  - Semantic = named by purpose, never by hue: `color/action/primary/bg-hover`, `color/text/secondary`
- In code, tokens are CSS variables: slashes become dashes → `--color-action-primary-bg-hover`, used as Tailwind classes (`bg-action-primary-bg-hover`).
- Components use semantic tokens. Use a primitive only when no semantic token fits, and mention it in the PR.
- Never hardcode hex colors, px spacing, radius or font sizes — no Tailwind default palette (`bg-blue-500`) and no arbitrary values. If a value is missing, stop and ask — don't invent a token.
- 全圓角用 `rounded-rounded`，禁止使用 `rounded-full`。
- Exception: Foundations doc pages (`src/foundations/`) may use Tailwind's default `font-mono` for token and class labels. Components must not use it.
- Disabled = same tokens + `opacity: var(--opacity-disabled)` (40%). There are no disabled color tokens.
- Focus = `:focus-visible` with the shared focus ring (4px spread, primary-600 at 30%). Never `outline: none` without a replacement.

## Components

- One folder per component: `src/components/Button/` → `Button.tsx`, `Button.stories.tsx`, `index.ts`
- Figma variant properties map to `cva` variants (e.g. `Type=Primary/Secondary/Danger` → `variant: { primary, secondary, danger }`).
- In each PR, list the Tailwind classes used and which token each maps to, so a designer can review them.
- Component and prop names match Figma exactly (PascalCase components; Figma properties → props).
- Interaction states use one vocabulary: `Default / Hover / Focus / Pressed / Disabled`. `selected` is a separate boolean, not a state.
- Hover, Focus and Pressed come from CSS (`hover:`, `focus-visible:`, `active:` modifiers), not props. `disabled` and `selected` are props.
- Every component ships with stories for every row of its Figma state table, plus a "Playground" story with controls.
- Icons use `fill="currentColor"` / `stroke="currentColor"` and get their color from `text-*` classes. Don't use `fill-*` or `stroke-*` color classes.
- Use semantic HTML (`<button>`, `<input type="checkbox">`, `role="switch"`) so keyboard and screen readers work by default.
- UI copy is Traditional Chinese (e.g. 確認預約). Code, comments, prop names and commit messages are English.

## Workflow

- One component (or one topic) per branch and PR: `feat/button`, `docs/claude-md`, `chore/tokens`.
- Commit messages: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Every PR description includes:
  - What Claude did
  - What I (Wei) reviewed or corrected, and why
  - Screenshot of the Storybook story vs. the Figma frame
- Explain commands in plain language before running them — the repo owner is a designer, not an engineer.

## Don't

- Don't add new dependencies without saying why and asking first.
- Don't change tokens in code that don't exist in Figma.
- Don't build components that aren't in Figma; suggest them instead.
