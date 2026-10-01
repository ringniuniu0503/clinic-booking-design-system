import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code, Note, Page, Section } from './DocLayout'
import { radiusTokens } from './tokens'

function RadiusPage() {
  return (
    <Page title="Radius" description="圓角用於卡片、按鈕、輸入框等元件的外框。">
      <Section title="Scale" description="同尺寸方塊套用各級圓角，方便比較。">
        <div className="grid grid-cols-4 gap-8 md:grid-cols-7">
          {radiusTokens.map((token) => (
            <div key={token.label} className="flex flex-col items-start gap-3">
              <div
                className="size-11 border border-border-strong bg-surface-muted"
                // Corner radius comes from the CSS variable in tokens.css
                style={{ borderRadius: `var(${token.cssVar})` }}
              />
              <div className="flex flex-col items-start gap-1">
                <p className="text-body2 font-bold">{token.label}</p>
                <p className="text-caption1 font-regular text-text-secondary">{token.px}px</p>
                <Code>{token.className}</Code>
              </div>
            </div>
          ))}
        </div>
        <Note>
          全圓角請用 <Code>rounded-rounded</Code>，不要用 <Code>rounded-full</Code>。
        </Note>
      </Section>
    </Page>
  )
}

const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

export const Radius: StoryObj = { render: () => <RadiusPage /> }
