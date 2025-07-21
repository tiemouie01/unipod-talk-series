"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

// Mock event detail data
type EventDetail = {
  title: string;
  speaker: string;
  speakerBio: string;
  date: string;
  attendees: number;
  description: string;
  poster: string;
  videoUrl: string;
  gallery: string[];
};

const eventDetails: Record<string, EventDetail> = {
  "1": {
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
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = String(params.id);
  const event: EventDetail | undefined = eventDetails[eventId];

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-orange-50 to-purple-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Event Not Found
          </h1>
          <Link href="/history">
            <Button>Back to History</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-orange-50 to-purple-50">
      {/* Header */}
      <header className="w-full border-b bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to History
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Unipod Talks</h1>
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
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
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

                  <div className="border-t pt-4">
                    <h4 className="mb-2 font-semibold">Speaker</h4>
                    <p className="font-medium">{event.speaker}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {event.speakerBio}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="mb-2 font-semibold">About the Talk</h4>
                    <p className="text-gray-600">{event.description}</p>
                  </div>

                  <div className="pt-4">
                    <a
                      href={event.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Play className="mr-2 h-4 w-4" />
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
                <div className="flex aspect-3/4 flex-col justify-end">
                  <Image
                    src={event.poster || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover"
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {event.gallery.map((photo: string, index: number) => (
                  <div
                    key={index}
                    className="flex aspect-4/3 flex-col justify-end overflow-hidden rounded-lg"
                  >
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`Event photo ${index + 1}`}
                      className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
