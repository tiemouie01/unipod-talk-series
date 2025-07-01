"use client"

import { Calendar, Users, MapPin, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const stats = [
  {
    title: "Total Events",
    value: "24",
    change: "+12%",
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  {
    title: "Registered Users",
    value: "1,847",
    change: "+23%",
    icon: Users,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-400",
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "+5%",
    icon: MapPin,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-400",
  },
  {
    title: "Available Seats",
    value: "342",
    change: "-8%",
    icon: TrendingUp,
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-400",
  },
]

const recentEvents = [
  {
    id: "1",
    name: "AI & VR Workshop",
    date: "Dec 15, 2024",
    attendees: 45,
    status: "Active",
    statusColor: "bg-blue-500/20 text-blue-400",
  },
  {
    id: "2",
    name: "Tech Innovation Summit",
    date: "Dec 20, 2024",
    attendees: 120,
    status: "Registration Open",
    statusColor: "bg-yellow-500/20 text-yellow-400",
  },
  {
    id: "3",
    name: "Startup Pitch Night",
    date: "Dec 22, 2024",
    attendees: 80,
    status: "Lucky Draw Active",
    statusColor: "bg-cyan-500/20 text-cyan-400",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Hero Section with Mural Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900 p-8 border border-blue-800/30">
        <div className="absolute inset-0 opacity-20">
          <Image src="/unipod_banner.jpg" alt="UniPod Background" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to UniPod Admin</h2>
          <p className="text-blue-100 mb-6">Manage your events, track registrations, and run lucky draws seamlessly.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white shadow-lg shadow-blue-500/25"
          >
            <Link href="/admin/events/create">Create New Event</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm hover:bg-slate-800/70 transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith("+") ? "text-yellow-400" : "text-blue-400"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor} border border-current/20`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <Link key={index} href={`/admin/events/${event.id}`}>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-blue-800/20 hover:border-blue-600/30 transition-all cursor-pointer">
                    <div>
                      <h4 className="font-medium text-white">{event.name}</h4>
                      <p className="text-slate-400 text-sm">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{event.attendees} attendees</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${event.statusColor}`}>{event.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 shadow-lg shadow-blue-500/25"
            >
              <Link href="/admin/events/create">Create New Event</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-blue-600/50 text-blue-300 hover:bg-blue-900/30 hover:border-blue-500"
            >
              Export Attendee Lists
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-yellow-600/50 text-yellow-300 hover:bg-yellow-900/30 hover:border-yellow-500"
            >
              <Link href="/lucky-draw">Run Lucky Draw</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-cyan-600/50 text-cyan-300 hover:bg-cyan-900/30 hover:border-cyan-500"
            >
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
