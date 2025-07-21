"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0 overflow-hidden bg-slate-800/50 animate-pulse" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
            disabled
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>

        {/* Event Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-3/4 bg-blue-800/50" />
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <Skeleton className="h-4 w-32 bg-blue-800/50" />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <Skeleton className="h-4 w-48 bg-blue-800/50" />
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <Skeleton className="h-4 w-24 bg-blue-800/50" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 md:col-span-2">
            {/* Event Image Skeleton */}
            <div className="aspect-video overflow-hidden rounded-xl bg-slate-800/50">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Description Skeleton */}
            <Card className="border-blue-800/30 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-300">About This Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full bg-blue-800/50" />
                <Skeleton className="h-4 w-5/6 bg-blue-800/50" />
                <Skeleton className="h-4 w-4/6 bg-blue-800/50" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-800/30 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-300">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-blue-800/50" />
                  <Skeleton className="h-4 w-full bg-blue-800/50" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 bg-blue-800/50" />
                  <Skeleton className="h-4 w-5/6 bg-blue-800/50" />
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" disabled>
              Loading...
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
