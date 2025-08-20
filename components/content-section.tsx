import type React from "react"

interface ContentSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function ContentSection({ title, children, className = "" }: ContentSectionProps) {
  return (
    <section className={`mb-12 ${className}`}>
      {title && <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>}
      <div className="prose prose-lg max-w-none text-muted-foreground">{children}</div>
    </section>
  )
}
