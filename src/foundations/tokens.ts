// Derives everything the Foundations pages display from the Figma export,
// using the same naming rules as src/styles/tokens.css.
import data from '../../tokens/figma-variables.json'

type FigmaVariable = {
  name: string
  type: string
  value?: string | number
  alias?: string
  scopes?: string[]
  description?: string
}

const primitives = data.collections.Primitives.variables as FigmaVariable[]
const semantics = data.collections.Semantic.variables as FigmaVariable[]

/** "color/primary/600" -> "--color-primary-600" */
export const cssVar = (figmaName: string) => `--${figmaName.replaceAll('/', '-')}`

/** "color/action/primary/fg" -> "action/primary/fg" */
const colorLabel = (figmaName: string) => figmaName.replace(/^color\//, '')

/** "color/action/primary/fg" -> "action-primary-fg" */
const colorSlug = (figmaName: string) => colorLabel(figmaName).replaceAll('/', '-')

// Figma scope -> Tailwind utility prefix. Order here is the display order.
const scopePrefixes: [scope: string, prefix: string][] = [
  ['TEXT_FILL', 'text'],
  ['FRAME_FILL', 'bg'],
  ['STROKE_COLOR', 'border'],
]

/** Every Tailwind class the token can be used with, based on its Figma scopes. */
const colorClasses = (variable: FigmaVariable) => {
  const slug = colorSlug(variable.name)
  if (!variable.scopes?.length) return [`bg-${slug}`]
  return scopePrefixes
    .filter(([scope]) => variable.scopes!.includes(scope))
    .map(([, prefix]) => `${prefix}-${slug}`)
}

/** Relative luminance (WCAG) of a "#rrggbb" color, 0 = black, 1 = white. */
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Swatches this light need an outline to stay visible on a white page. */
const LIGHT_SWATCH_LUMINANCE = 0.75

export type ColorToken = {
  label: string
  cssVar: string
  hex: string
  classes: string[]
  aliasOf?: string
  needsOutline: boolean
}

const primitiveByName = new Map(primitives.map((v) => [v.name, v]))

const toColorToken = (variable: FigmaVariable): ColorToken => {
  const source = variable.alias ? primitiveByName.get(variable.alias)! : variable
  const hex = String(source.value)
  return {
    label: colorLabel(variable.name),
    cssVar: cssVar(variable.name),
    hex: hex.toUpperCase(),
    classes: colorClasses(variable),
    aliasOf: variable.alias ? colorLabel(variable.alias) : undefined,
    needsOutline: luminance(hex) > LIGHT_SWATCH_LUMINANCE,
  }
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Groups color variables by one path segment, keeping Figma's order. */
const groupColors = (variables: FigmaVariable[], segment: number) => {
  const groups = new Map<string, ColorToken[]>()
  for (const v of variables.filter((v) => v.type === 'COLOR')) {
    const key = v.name.split('/')[segment]
    groups.set(key, [...(groups.get(key) ?? []), toColorToken(v)])
  }
  return [...groups].map(([key, tokens]) => ({ title: capitalize(key), tokens }))
}

/** Neutral, Primary, Accent, Error, Warning, Success */
export const primitiveColorGroups = groupColors(primitives, 1)

/** Text, Surface, Border, Action, Status */
export const semanticColorGroups = groupColors(semantics, 1)

export type SizeToken = { label: string; px: number; cssVar: string; className: string }

/** spacing/0 … spacing/11 */
export const spacingTokens: SizeToken[] = primitives
  .filter((v) => v.name.startsWith('spacing/'))
  .map((v) => {
    const step = v.name.split('/')[1]
    return { label: `spacing-${step}`, px: Number(v.value), cssVar: cssVar(v.name), className: `p-${step}` }
  })

/** radius/xxs … radius/rounded */
export const radiusTokens: SizeToken[] = primitives
  .filter((v) => v.name.startsWith('radius/'))
  .map((v) => {
    const size = v.name.split('/')[1]
    return { label: size, px: Number(v.value), cssVar: cssVar(v.name), className: `rounded-${size}` }
  })

export type TextStyleToken = {
  name: string
  fontSize: number
  weightLabel: string
  sizeVar: string
  weightVar: string
  className: string
}

// Figma font style -> font/weight/* token suffix
const weightKey = (fontStyle: string) => fontStyle.toLowerCase()

/** Heading1 … Caption2, largest first, Bold before Regular within each style. */
export const textStyles: TextStyleToken[] = (() => {
  const bases = [...new Set(data.textStyles.map((s) => s.name.split('/')[0]))]
  const weights = ['Bold', 'Regular']
  return bases.flatMap((base) =>
    weights.map((weight) => {
      const style = data.textStyles.find((s) => s.name === `${base}/${weight}`)!
      const key = base.toLowerCase()
      return {
        name: style.name,
        fontSize: style.fontSize,
        weightLabel: style.fontStyle,
        sizeVar: `--text-${key}`,
        weightVar: `--font-weight-${weightKey(style.fontStyle)}`,
        className: `text-${key} font-${weightKey(style.fontStyle)}`,
      }
    }),
  )
})()

/** Text styles that currently share the same font size, e.g. [["Body3", "Caption1"]]. */
export const sameSizeTextStyles: { names: string[]; fontSize: number }[] = (() => {
  const bySize = new Map<number, Set<string>>()
  for (const s of data.textStyles) {
    bySize.set(s.fontSize, (bySize.get(s.fontSize) ?? new Set()).add(s.name.split('/')[0]))
  }
  return [...bySize]
    .filter(([, names]) => names.size > 1)
    .map(([fontSize, names]) => ({ fontSize, names: [...names] }))
})()

const opacityDisabled = semantics.find((v) => v.name === 'opacity/disabled')!
const focusRingEffect = data.effectStyles.find((s) => s.name === 'Focus/Ring')!.effects[0]
const focusRingColor = primitives.find((v) => v.type === 'COLOR' && v.value === focusRingEffect.color)!

export const states = {
  disabled: {
    percent: Number(opacityDisabled.value),
    cssVar: cssVar(opacityDisabled.name),
    className: 'opacity-disabled',
  },
  focusRing: {
    spread: focusRingEffect.spread,
    percent: focusRingEffect.opacity * 100,
    color: colorLabel(focusRingColor.name),
    className: 'shadow-focus-ring',
  },
}
