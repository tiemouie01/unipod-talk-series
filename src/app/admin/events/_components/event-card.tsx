"use client";

import { Calendar, MapPin, Users, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import type { EventManagementValues } from "@/types/events";
import { getEventStatus, getStatusColor } from "@/lib/utils";

interface EventCardProps {
  event: EventManagementValues;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden border-blue-800/30 bg-slate-800/50 backdrop-blur-sm transition-all hover:border-blue-600/50 hover:bg-slate-800/70">
      {/* Banner Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.bannerURL! || "/logo.png"}
          alt={`${event.title} banner`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

        {/* Status Badge on Image */}
        <div className="absolute top-3 right-3">
          <Badge
            className={getStatusColor(
              getEventStatus(
                event.eventDate,
                event.registrationStartDate,
                event.registrationEndDate,
              ),
            )}
          >
            {getEventStatus(
              event.eventDate,
              event.registrationStartDate,
              event.registrationEndDate,
            )}
          </Badge>
        </div>

        {/* Dropdown Menu on Image */}
        <div className="absolute top-3 left-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:text-yellow-400"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-blue-700/50 bg-slate-800"
            >
              <DropdownMenuItem
                asChild
                className="text-slate-300 hover:bg-blue-900/30 hover:text-white"
              >
                <Link href={`/admin/events/${event.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:bg-blue-900/30 hover:text-white">
                <Link href={`/admin/events/${event.id}/edit`}>Edit Event</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Link href={`/admin/events/${event.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="mb-2 text-lg text-white transition-colors group-hover:text-blue-300">
                {event.title}
              </CardTitle>
              <p className="line-clamp-2 text-sm text-slate-400">
                {event.description}
              </p>
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
              <span className="font-medium text-white">
                {event.reservedSeats}/{event.totalSeats}
              </span>
              <span className="text-sm text-slate-400">seats</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 transition-all"
              style={{
                width: `${(event.reservedSeats! / event.totalSeats!) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span
              className={`rounded-full px-2 py-1 ${
                event.registrationStartDate
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              Registration {event.registrationStartDate ? "Open" : "Closed"}
            </span>
            {event.luckyDrawEnabled && (
              <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-yellow-400">
                Lucky Draw Enabled
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
