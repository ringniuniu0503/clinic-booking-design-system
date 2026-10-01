import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code, Note, Page, Section } from './DocLayout'
import { spacingTokens } from './tokens'

const example = spacingTokens.find((t) => t.label === 'spacing-4')!

function SpacingPage() {
  return (
    <Page
      title="Spacing"
      description="間距用於 padding、margin、gap 與尺寸。同一個編號可搭配 p-、m-、gap-、w-、h- 等 class 使用。"
    >
      <Note>
        編號沿用 Figma（{example.label} = {example.px}px），與 Tailwind 預設（p-4 = 16px）不同。
      </Note>

      <Section title="Scale" description="長條長度等於該間距的實際數值。">
        <div className="flex flex-col">
          <div className="grid grid-cols-6 gap-6 border-b border-border-strong pb-3 text-caption1 font-bold text-text-secondary">
            <p>Token</p>
            <p>數值</p>
            <p>Class</p>
            <p className="col-span-3">示意</p>
          </div>
          {spacingTokens.map((token) => (
            <div key={token.label} className="grid grid-cols-6 items-center gap-6 border-b border-border-default py-4">
              <p className="text-body2 font-bold">{token.label}</p>
              <p className="text-body2 font-regular text-text-secondary">{token.px}px</p>
              <div>
                <Code>{token.className}</Code>
              </div>
              <div className="col-span-3">
                <div
                  className="h-4 rounded-xxs bg-action-primary-bg-default"
                  // Bar length comes from the CSS variable in tokens.css
                  style={{ width: `var(${token.cssVar})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  )
}

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

export const Spacing: StoryObj = { render: () => <SpacingPage /> }
