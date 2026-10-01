import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { Code, Page, Section } from './DocLayout'
import { states } from './tokens'

const { focusRing, disabled } = states

const demoBlock =
  'flex h-control-lg items-center rounded-sm bg-action-primary-bg-default px-6 text-body1 font-bold text-action-primary-fg'

function Demo({ caption, children }: { caption: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-4">
      {children}
      <div className="flex flex-col items-start gap-1 text-caption1 font-regular text-text-secondary">{caption}</div>
    </div>
  )
}

function StatesPage() {
  return (
    <Page title="States" description="互動狀態共用同一套 token，不為每個元件另外定義顏色。">
      <Section
        title="Focus ring"
        description={`${focusRing.spread}px 外擴光圈，顏色為 ${focusRing.color}、透明度 ${focusRing.percent}%。鍵盤操作時才顯示（:focus-visible），滑鼠點擊不會出現。`}
      >
        <div className="flex flex-wrap gap-9">
          <Demo
            caption={
              <>
                <p>常駐顯示（示意）</p>
                <Code>{focusRing.className}</Code>
              </>
            }
          >
            <div className={`${demoBlock} ${focusRing.className}`}>確認預約</div>
          </Demo>
          <Demo
            caption={
              <>
                <p>實際操作：點一下頁面空白處，再按 Tab 鍵</p>
                <Code>focus-visible:{focusRing.className}</Code>
              </>
            }
          >
            <div tabIndex={0} className={`${demoBlock} focus-visible:shadow-focus-ring focus-visible:outline-none`}>
              確認預約
            </div>
          </Demo>
        </div>
      </Section>

      <Section
        title="Disabled"
        description={`disabled 不換色，只降透明度 ${disabled.percent}%。沒有專用的 disabled 色彩 token。`}
      >
        <div className="flex flex-wrap gap-9">
          <Demo caption={<p>Default</p>}>
            <div className={demoBlock}>確認預約</div>
          </Demo>
          <Demo
            caption={
              <>
                <p>Disabled（{disabled.percent}%）</p>
                <Code>{disabled.className}</Code>
              </>
            }
          >
            <div className={`${demoBlock} ${disabled.className}`}>確認預約</div>
          </Demo>
        </div>
      </Section>
    </Page>
  )
}

const meta = {
  title: 'Foundations/States',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

export const States: StoryObj = { render: () => <StatesPage /> }
