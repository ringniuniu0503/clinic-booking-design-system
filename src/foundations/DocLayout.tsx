import type { ReactNode } from 'react'

type PageProps = { title: string; description: ReactNode; children: ReactNode }

export function Page({ title, description, children }: PageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-11 bg-surface-default p-11 text-text-primary">
      <header className="flex flex-col gap-3 border-b border-border-default pb-8">
        <p className="text-caption1 font-bold text-text-brand">Foundations</p>
        <h1 className="text-heading1 font-bold">{title}</h1>
        <p className="text-body1 font-regular text-text-secondary">{description}</p>
      </header>
      {children}
    </div>
  )
}

type SectionProps = { title: string; description?: ReactNode; children: ReactNode }

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading3 font-bold">{title}</h2>
        {description && <p className="text-body2 font-regular text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  )
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-body1 font-bold">{title}</h3>
      {children}
    </div>
  )
}

/** Highlighted note, e.g. a rule designers and engineers must follow. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xs bg-status-info-bg px-5 py-4 text-body2 font-regular text-status-info-fg">
      {children}
    </p>
  )
}

/** A token or class name, styled as inline code. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-xxs bg-surface-subtle px-2 py-1 text-caption1 font-medium wrap-break-word text-text-primary">
      {children}
    </code>
  )
}
