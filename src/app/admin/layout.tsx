import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/admin/_components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 ml-0 lg:ml-64">
            <div className="p-6">{children}</div>
            </main>
          </SidebarProvider>
        </div>
      </div>
  )
}
