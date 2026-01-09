import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExtensionErrorSuppressor } from "@/components/extension-error-suppressor"
import { ChatWidget } from "@/components/chat-widget"
import { ConditionalLayout } from "@/components/conditional-layout"
import { defaultMetadata } from "./metadata"
import { getNestAidLocalBusinessSchema } from "@/lib/seo/local-business-schema"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = getNestAidLocalBusinessSchema()

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ExtensionErrorSuppressor />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
