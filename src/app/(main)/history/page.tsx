"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Play } from "lucide-react";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

// Mock historical events data
const pastEvents = [
  {
    id: 1,
    title: "Blockchain Revolution in Africa",
    speaker: "Prof. Kwame Asante",
    date: "2024-01-20",
    attendees: 68,
    poster: "/placeholder.svg?height=300&width=200",
    videoUrl: "https://youtube.com/watch?v=example1",
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 2,
    title: "Sustainable Tech Solutions",
    speaker: "Dr. Fatima Al-Rashid",
    date: "2023-12-15",
    attendees: 70,
    poster: "/placeholder.svg?height=300&width=200",
    videoUrl: "https://youtube.com/watch?v=example2",
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 3,
    title: "Digital Innovation in Healthcare",
    speaker: "Dr. Michael Ochieng",
    date: "2023-11-10",
    attendees: 65,
    poster: "/placeholder.svg?height=300&width=200",
    videoUrl: "https://youtube.com/watch?v=example3",
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-orange-50 to-purple-50">
      {/* Header */}
      <header className="w-full border-b bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Unipod Talks</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Event History
              </Badge>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-orange-600">
                Current Event
              </Link>
              <Link
                href="/history"
                className="font-medium text-gray-900 hover:text-orange-600"
              >
                Past Events
              </Link>
              <Link
                href="/admin"
                className="text-gray-600 hover:text-orange-600"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col items-center">
        <div className="w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Past Events
            </h2>
            <p className="text-gray-600">
              Explore our previous talks and watch recordings
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="flex aspect-3/4 flex-col justify-end">
                  <img
                    src={event.poster || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="flex flex-col gap-1 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h3 className="mb-1 text-lg font-bold">{event.title}</h3>
                    <p className="text-sm opacity-90">{event.speaker}</p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attendees</span>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/history/${event.id}`}>
                      <Button className="w-full rounded-xl bg-linear-to-r from-orange-500 to-red-500 font-bold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-red-600 hover:shadow-xl">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        View Gallery
                      </Button>
                    </Link>

                    <a
                      href={event.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Watch Recording
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
