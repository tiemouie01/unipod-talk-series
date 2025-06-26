"use client"

import { Calendar, Home, Plus, Trophy, Users, Settings, UserPlus } from "lucide-react"
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
  {
    title: "Lucky Draw",
    icon: Trophy,
    href: "/admin/lucky-draw",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Sign Up Page",
    icon: UserPlus,
    href: "/admin/sign-up",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 border-r border-blue-800/30 backdrop-blur-sm">
      <Sidebar className="bg-transparent border-none">
        <SidebarHeader className="p-6 border-b border-blue-800/30 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="UniPod Logo" width={120} height={40} className="h-8 w-auto" />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4 space-y-6">
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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          item.href === "/admin/" 
                            ? (pathname === "/admin" || pathname === "/admin/")
                              ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                              : "text-slate-300 hover:bg-blue-500/20 hover:text-blue-200"
                            : item.href === "/admin/events"
                              ? (pathname === "/admin/events" || pathname === "/admin/events/")
                                ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                                : "text-slate-300 hover:bg-blue-500/20 hover:text-blue-200"
                              : pathname === item.href || pathname === `${item.href}/`
                                ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                                : "text-slate-300 hover:bg-blue-500/20 hover:text-blue-200"
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
    </div>
  )
}
