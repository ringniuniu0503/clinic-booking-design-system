import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code, Page, Section, SubSection } from './DocLayout'
import { primitiveColorGroups, semanticColorGroups, type ColorToken } from './tokens'

function Swatch({ token, className }: { token: ColorToken; className: string }) {
  return (
    <div
      className={`rounded-xs ${token.needsOutline ? 'border border-border-default' : ''} ${className}`}
      // Swatch color comes from the CSS variable in tokens.css (not a hard-coded value)
      style={{ backgroundColor: `var(${token.cssVar})` }}
    />
  )
}

function ColorCard({ token, compact }: { token: ColorToken; compact?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <Swatch token={token} className={compact ? 'aspect-square' : 'h-11'} />
      <div className="flex flex-col gap-2">
        <p className="text-caption1 font-bold wrap-break-word">{token.label}</p>
        {token.aliasOf && (
          <p className="text-caption1 font-regular wrap-break-word text-text-brand">→ {token.aliasOf}</p>
        )}
        <p className="text-caption1 font-regular text-text-secondary">{token.hex}</p>
        <div className="flex flex-col items-start gap-1">
          {token.classes.map((c) => (
            <Code key={c}>{c}</Code>
          ))}
        </div>
      </div>
    </div>
  )
}

function ColorsPage() {
  return (
    <Page
      title="Colors"
      description="色彩分為兩層：Primitives 是原始色票，依色系命名；Semantic 依用途命名，一律指向某個 Primitive。元件只使用 Semantic。"
    >
      <Section title="Primitives" description="原始色票，依色系分組，從淺（50）到深（950）。">
        {primitiveColorGroups.map((group) => (
          <SubSection key={group.title} title={group.title}>
            <div className="grid auto-cols-fr grid-flow-col gap-3">
              {group.tokens.map((token) => (
                <ColorCard key={token.label} token={token} compact />
              ))}
            </div>
          </SubSection>
        ))}
      </Section>

      <Section
        title="Semantic"
        description="依用途命名的色彩，箭頭表示它指向哪個 Primitive。下方列出依 Figma scope 可使用的 Tailwind class。"
      >
        {semanticColorGroups.map((group) => (
          <SubSection key={group.title} title={group.title}>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
              {group.tokens.map((token) => (
                <ColorCard key={token.label} token={token} />
              ))}
            </div>
          </SubSection>
        ))}
      </Section>
    </Page>
  )
}

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

export const Colors: StoryObj = { render: () => <ColorsPage /> }
