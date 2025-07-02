"use client"

import { Calendar, Home, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin/",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/admin/events",
  },
  {
    title: "Create Event",
    icon: Plus,
    href: "/admin/events/create",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    
      <Sidebar className="bg-slate-900/95 border-r border-blue-800/30 backdrop-blur-sm">
        <SidebarContent className="p-4 space-y-6 bg-slate-900/95 backdrop-blur-lg md:bg-none">
        <SidebarHeader className="p-6 border-b border-blue-800/30 bg-slate-800/50">
          <div className="flex justify-center">
            <Link href="/" className="flex flex-col items-center gap-2">
              <Image src="/logo.png" alt="UniPod Logo" width={120} height={40} className="h-10 w-auto" />
              <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-xl font-extrabold text-transparent">
                Talks Series
              </span>
              </Link>
          </div>
        </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wider mb-4 pl-4">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          item.href === "/admin/" 
                            ? (pathname === "/admin" || pathname === "/admin/")
                              ? "bg-blue-900/40 text-blue-400"
                              : "text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
                            : item.href === "/admin/events"
                              ? (pathname === "/admin/events" || pathname === "/admin/events/")
                                ? "bg-blue-900/40 text-blue-400"
                                : "text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
                              : pathname === item.href || pathname === `${item.href}/`
                                ? "bg-blue-900/40 text-blue-400"
                                : "text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  
  )
}
