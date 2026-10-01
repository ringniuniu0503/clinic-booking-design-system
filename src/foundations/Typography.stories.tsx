import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code, Note, Page, Section } from './DocLayout'
import { sameSizeTextStyles, textStyles } from './tokens'

const SAMPLE_TEXT = '今日預約：王小明 09:30 針灸'

function TypographyPage() {
  return (
    <Page
      title="Typography"
      description="字體為 Noto Sans TC。每個文字樣式由字級 class 加上字重 class 組成，行高沿用 Figma 的 Auto（normal）。"
    >
      <Section title="Text styles" description="由大到小排列，每個樣式都有 Bold 與 Regular 兩種字重。">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-6 border-b border-border-strong pb-3 text-caption1 font-bold text-text-secondary">
            <p>樣式</p>
            <p className="col-span-2">示範</p>
          </div>
          {textStyles.map((style) => (
            <div key={style.name} className="grid grid-cols-3 items-center gap-6 border-b border-border-default py-5">
              <div className="flex flex-col items-start gap-2">
                <p className="text-body2 font-bold">{style.name}</p>
                <p className="text-caption1 font-regular text-text-secondary">
                  {style.fontSize}px · {style.weightLabel}
                </p>
                <Code>{style.className}</Code>
              </div>
              <p
                className="col-span-2"
                // Size and weight come from the CSS variables in tokens.css
                style={{
                  fontSize: `var(${style.sizeVar})`,
                  lineHeight: `var(${style.sizeVar}--line-height)`,
                  fontWeight: `var(${style.weightVar})`,
                }}
              >
                {SAMPLE_TEXT}
              </p>
            </div>
          ))}
        </div>
        {sameSizeTextStyles.map(({ names, fontSize }) => (
          <Note key={fontSize}>
            備註：{names.join(' 和 ')} 目前數值相同（{fontSize}px）。
          </Note>
        ))}
      </Section>
    </Page>
  )
}

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

export const Typography: StoryObj = { render: () => <TypographyPage /> }
