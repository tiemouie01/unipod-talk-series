"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Play, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock event detail data
const eventDetails = {
  1: {
    title: "Blockchain Revolution in Africa",
    speaker: "Prof. Kwame Asante",
    speakerBio:
      "Professor of Computer Science at University of Ghana, specializing in blockchain technology and cryptocurrency applications in developing economies.",
    date: "2024-01-20",
    attendees: 68,
    description:
      "An in-depth exploration of how blockchain technology is transforming financial systems, governance, and business operations across the African continent.",
    poster: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://youtube.com/watch?v=example1",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const event = eventDetails[eventId as keyof typeof eventDetails]

  if (!event) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/history">
            <Button>Back to History</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-xs border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to History
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Unipod Talks</h1>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-orange-600">
                Current Event
              </Link>
              <Link href="/history" className="text-gray-900 hover:text-orange-600 font-medium">
                Past Events
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-orange-600">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Event Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attendees</span>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Speaker</h4>
                  <p className="font-medium">{event.speaker}</p>
                  <p className="text-sm text-gray-600 mt-1">{event.speakerBio}</p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">About the Talk</h4>
                  <p className="text-gray-600">{event.description}</p>
                </div>

                <div className="pt-4">
                  <a href={event.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Play className="h-4 w-4 mr-2" />
                      Watch on YouTube
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Poster */}
          <div>
            <Card className="overflow-hidden">
              <div className="aspect-3/4 relative">
                <img
                  src={event.poster || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Photo Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Event Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.gallery.map((photo, index) => (
                <div key={index} className="aspect-4/3 relative overflow-hidden rounded-lg">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Event photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
