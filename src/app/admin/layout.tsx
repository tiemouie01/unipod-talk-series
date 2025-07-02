import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/admin/_components/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <div className="p-6">
          <SidebarTrigger className="bg-white"/>
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  )
}
