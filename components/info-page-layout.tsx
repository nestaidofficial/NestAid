import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface InfoPageLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  showBackButton?: boolean
}

export function InfoPageLayout({ title, subtitle, children, showBackButton = true }: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          {showBackButton && (
            <Link
              href="/"
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl text-primary-foreground/80 max-w-2xl">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">{children}</div>
    </div>
  )
}
