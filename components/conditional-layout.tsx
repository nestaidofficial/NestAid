"use client"

import { usePathname } from "next/navigation"
import { HeaderClient } from "@/components/header-client"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin') || false

  return (
    <div className="min-h-screen bg-background">
      {!isAdminPage && <HeaderClient />}
      {children}
      {!isAdminPage && <Footer />}
      {!isAdminPage && <ChatWidget />}
    </div>
  )
}

