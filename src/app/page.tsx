"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Ticket, Sparkles, Zap } from "lucide-react"
import { ReservationModal } from "@/components/reservation-modal"
import { LotteryModal } from "@/components/lottery-modal"
import { SeatMap } from "@/components/seat-map"
import { CountdownTimer } from "@/components/countdown-timer"
import { LotteryWinners } from "@/components/lottery-winners"
import Link from "next/link"

// Mock data - in a real app, this would come from an API
const currentEvent = {
  id: 1,
  title: "The Future of AI in Africa",
  speaker: "Dr. Amina Kone",
  speakerTitle: "AI Research Director",
  date: "2024-02-15",
  time: "18:00",
  venue: "Unipod Malawi",
  description:
    "Join us for an insightful discussion on how artificial intelligence is shaping the future of technology and innovation across Africa.",
  poster: "/placeholder.svg?height=600&width=400",
  totalSeats: 70,
  reservedSeats: 45,
  lotterySeats: 6,
  lotteryAssigned: false,
  lotteryDate: "2024-02-14T18:00:00Z",
}

export default function HomePage() {
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showLotteryModal, setShowLotteryModal] = useState(false)
  const [seats, setSeats] = useState<
    Array<{ id: number; status: "available" | "reserved" | "lottery" | "lottery-winner" }>
  >([])

  useEffect(() => {
    // Initialize seats
    const initialSeats = Array.from({ length: 70 }, (_, i) => ({
      id: i + 1,
      status: i < currentEvent.reservedSeats ? ("reserved" as const) : ("available" as const),
    }))

    // Mark last 6 seats as lottery if regular seats are almost full
    if (currentEvent.reservedSeats >= 64) {
      for (let i = 64; i < 70; i++) {
        initialSeats[i].status = "lottery"
      }
    }

    setSeats(initialSeats)
  }, [])

  const availableSeats = 64 - currentEvent.reservedSeats
  const canReserveLottery = currentEvent.reservedSeats >= 64 && !currentEvent.lotteryAssigned

  return (
    <div className="min-h-screen gradient-bg">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl floating-animation"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-500/20 rounded-full blur-xl floating-animation"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold gradient-text">Unipod Talks</h1>
              </div>
              <Badge className="bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] text-white px-4 py-2 text-sm font-semibold">
                🔥 Live Event Registration
              </Badge>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-800 hover:text-[#1d9ed9] font-semibold text-lg transition-colors">
                Current Event
              </Link>
              <Link
                href="/history"
                className="text-gray-600 hover:text-[#1d9ed9] font-semibold text-lg transition-colors"
              >
                Past Events
              </Link>
              <Link
                href="/admin"
                className="text-gray-600 hover:text-[#1d9ed9] font-semibold text-lg transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
          {/* Event Poster */}
          <div className="space-y-8">
            <Card className="overflow-hidden card-hover unipod-border bg-white/90 backdrop-blur-xs">
              <div className="aspect-3/4 relative">
                <img
                  src={currentEvent.poster || "/placeholder.svg"}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-[#f4d41b]" />
                    <Badge className="bg-[#f4d41b] text-black font-bold">Featured Speaker</Badge>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 text-shadow">{currentEvent.title}</h2>
                  <p className="text-xl font-semibold">{currentEvent.speaker}</p>
                  <p className="text-sm opacity-90">{currentEvent.speakerTitle}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Event Details with Countdown Timer */}
          <div className="space-y-8">
            {/* Compact Countdown Timer */}
            <div className="mb-6">
              <CountdownTimer targetDate={new Date(currentEvent.date + "T" + currentEvent.time)} />
            </div>

            <Card className="card-hover unipod-border bg-white/90 backdrop-blur-xs unipod-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-8 h-8 bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <span className="gradient-text">Event Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-linear-to-r from-blue-50 to-[#1d9ed9]/10 rounded-xl">
                    <div className="w-10 h-10 bg-linear-to-r from-[#1d9ed9] to-blue-600 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Date & Time</p>
                      <p className="text-gray-600">
                        {new Date(currentEvent.date).toLocaleDateString()} at {currentEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-linear-to-r from-green-50 to-teal-50 rounded-xl">
                    <div className="w-10 h-10 bg-linear-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Venue</p>
                      <p className="text-gray-600">{currentEvent.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-linear-to-r from-[#f4d41b]/20 to-yellow-50 rounded-xl">
                    <div className="w-10 h-10 bg-linear-to-r from-[#f4d41b] to-yellow-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Availability</p>
                      <p className="text-gray-600">
                        {availableSeats > 0 ? `${availableSeats} seats remaining` : "Event full - Lottery only"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-linear-to-r from-[#1d9ed9]/20 to-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-linear-to-r from-[#1d9ed9] to-blue-600 rounded-full flex items-center justify-center">
                      <Ticket className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Capacity</p>
                      <p className="text-gray-600">{currentEvent.totalSeats} total seats</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{currentEvent.description}</p>

                  <div className="space-y-4">
                    {availableSeats > 0 ? (
                      <Button
                        onClick={() => setShowReservationModal(true)}
                        className="w-full bg-linear-to-r from-[#1d9ed9] to-blue-600 hover:from-[#1d9ed9]/90 hover:to-blue-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Reserve Your Seat Now!
                      </Button>
                    ) : (
                      <Button disabled className="w-full py-4 text-lg rounded-xl opacity-50">
                        Regular Seats Full
                      </Button>
                    )}

                    {canReserveLottery && (
                      <Button
                        onClick={() => setShowLotteryModal(true)}
                        className="w-full bg-linear-to-r from-[#f4d41b] to-yellow-500 hover:from-[#f4d41b]/90 hover:to-yellow-600 text-black font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Enter Lottery (Last 6 Seats)
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lottery Winners Display */}
            {currentEvent.lotteryAssigned && <LotteryWinners />}
          </div>
        </div>

        {/* Seat Map */}
        <Card className="card-hover unipod-border bg-white/90 backdrop-blur-xs unipod-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-8 h-8 bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="gradient-text">Live Seat Map</span>
              <Badge className="bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] text-white animate-pulse">
                Real-time Updates
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatMap seats={seats} />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ReservationModal open={showReservationModal} onOpenChange={setShowReservationModal} eventId={currentEvent.id} />
      <LotteryModal open={showLotteryModal} onOpenChange={setShowLotteryModal} eventId={currentEvent.id} />
    </div>
  )
}
