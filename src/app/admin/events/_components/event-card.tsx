"use client"

import { Calendar, MapPin, Users, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import type{ EventManagementValues } from "@/types/events"
import { getEventStatus, getStatusColor } from "@/lib/utils"


interface EventCardProps {
  event: EventManagementValues
}

export function EventCard({ event }: EventCardProps) {

  return (
    <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm hover:bg-slate-800/70 hover:border-blue-600/50 transition-all cursor-pointer group overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.bannerURL ?? "/placeholder.svg"}
          alt={`${event.title} banner`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

        {/* Status Badge on Image */}
        <div className="absolute top-3 right-3">
          <Badge className={getStatusColor(getEventStatus(event.eventDate, event.registrationStartDate, event.registrationEndDate))}>
            {getEventStatus(event.eventDate, event.registrationStartDate, event.registrationEndDate)}
          </Badge>
        </div>

        {/* Dropdown Menu on Image */}
        <div className="absolute top-3 left-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-yellow-400 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-blue-700/50">
              <DropdownMenuItem asChild className="text-slate-300 hover:text-white hover:bg-blue-900/30">
                <Link href={`/admin/events/${event.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-blue-900/30">
                Edit Event
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-blue-900/30">
                Export Attendees
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                Cancel Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Link href={`/admin/events/${event.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                {event.title}
              </CardTitle>
              <p className="text-slate-400 text-sm line-clamp-2">{event.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-400" />
              {new Date(event.eventDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-yellow-400" />
              {event.location}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-white font-medium">
                {event.reservedSeats}/{event.totalSeats}
              </span>
              <span className="text-slate-400 text-sm">seats</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-yellow-500 h-2 rounded-full transition-all"
              style={{ width: `${(event.reservedSeats! / event.totalSeats!) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span
              className={`px-2 py-1 rounded-full ${
                event.registrationStartDate ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              Registration {event.registrationStartDate ? "Open" : "Closed"}
            </span>
            {event.luckyDrawEnabled && (
              <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">Lucky Draw Enabled</span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
