"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Sparkles,
  Zap,
} from "lucide-react";
import { ReservationModal } from "@/components/reservation-modal";
import { LotteryModal } from "@/components/lottery-modal";
import { SeatMap } from "@/components/seat-map";
import { CountdownTimer } from "@/components/countdown-timer";
import { LotteryWinners } from "@/components/lottery-winners";
import Link from "next/link";

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
};

export default function HomePage() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showLotteryModal, setShowLotteryModal] = useState(false);
  const [seats, setSeats] = useState<
    Array<{
      id: number;
      status: "available" | "reserved" | "lottery" | "lottery-winner";
    }>
  >([]);

  useEffect(() => {
    // Initialize seats
    const initialSeats = Array.from({ length: 70 }, (_, i) => ({
      id: i + 1,
      status:
        i < currentEvent.reservedSeats
          ? ("reserved" as const)
          : ("available" as const),
    }));

    // Mark last 6 seats as lottery if regular seats are almost full
    if (currentEvent.reservedSeats >= 64) {
      for (let i = 64; i < 70; i++) {
        initialSeats[i].status = "lottery";
      }
    }

    setSeats(initialSeats);
  }, []);

  const availableSeats = 64 - currentEvent.reservedSeats;
  const canReserveLottery =
    currentEvent.reservedSeats >= 64 && !currentEvent.lotteryAssigned;

  return (
    <div className="gradient-bg flex min-h-screen flex-col">
      {/* Animated Background Elements - now using grid for layout */}
      <div className="mt-20 mb-8 flex h-0 w-full flex-row items-start justify-center gap-8">
        <div className="h-32 w-32 animate-pulse rounded-full bg-blue-400/20 blur-xl" />
        <div className="h-24 w-24 animate-pulse rounded-full bg-yellow-400/20 blur-xl" />
        <div className="h-40 w-40 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
        <div className="h-28 w-28 animate-pulse rounded-full bg-yellow-500/20 blur-xl" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-white/20 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-[#1d9ed9] to-[#f4d41b]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="gradient-text text-3xl font-bold">
                  Unipod Talks
                </h1>
              </div>
              <Badge className="bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] px-4 py-2 text-sm font-semibold text-white">
                🔥 Live Event Registration
              </Badge>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-lg font-semibold text-gray-800 transition-colors hover:text-[#1d9ed9]"
              >
                Current Event
              </Link>
              <Link
                href="/history"
                className="text-lg font-semibold text-gray-600 transition-colors hover:text-[#1d9ed9]"
              >
                Past Events
              </Link>
              <Link
                href="/admin"
                className="text-lg font-semibold text-gray-600 transition-colors hover:text-[#1d9ed9]"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col items-center">
        <div className="relative w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-12 xl:grid-cols-2">
            {/* Event Poster */}
            <div className="space-y-8">
              <Card className="card-hover unipod-border overflow-hidden bg-white/90 backdrop-blur-xs">
                <div className="flex aspect-3/4 flex-col justify-end">
                  <img
                    src={currentEvent.poster || "/placeholder.svg"}
                    alt={currentEvent.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
                    <div className="mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-[#f4d41b]" />
                      <Badge className="bg-[#f4d41b] font-bold text-black">
                        Featured Speaker
                      </Badge>
                    </div>
                    <h2 className="text-shadow mb-3 text-3xl font-bold">
                      {currentEvent.title}
                    </h2>
                    <p className="text-xl font-semibold">
                      {currentEvent.speaker}
                    </p>
                    <p className="text-sm opacity-90">
                      {currentEvent.speakerTitle}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Event Details with Countdown Timer */}
            <div className="space-y-8">
              {/* Compact Countdown Timer */}
              <div className="mb-6">
                <CountdownTimer
                  targetDate={
                    new Date(currentEvent.date + "T" + currentEvent.time)
                  }
                />
              </div>

              <Card className="card-hover unipod-border unipod-glow bg-white/90 backdrop-blur-xs">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-[#1d9ed9] to-[#f4d41b]">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <span className="gradient-text">Event Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-blue-50 to-[#1d9ed9]/10 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#1d9ed9] to-blue-600">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Date & Time
                        </p>
                        <p className="text-gray-600">
                          {new Date(currentEvent.date).toLocaleDateString()} at{" "}
                          {currentEvent.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-green-50 to-teal-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-teal-600">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Venue</p>
                        <p className="text-gray-600">{currentEvent.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-[#f4d41b]/20 to-yellow-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#f4d41b] to-yellow-500">
                        <Users className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Availability
                        </p>
                        <p className="text-gray-600">
                          {availableSeats > 0
                            ? `${availableSeats} seats remaining`
                            : "Event full - Lottery only"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-[#1d9ed9]/20 to-blue-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#1d9ed9] to-blue-600">
                        <Ticket className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Capacity</p>
                        <p className="text-gray-600">
                          {currentEvent.totalSeats} total seats
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="mb-6 text-lg leading-relaxed text-gray-700">
                      {currentEvent.description}
                    </p>

                    <div className="space-y-4">
                      {availableSeats > 0 ? (
                        <Button
                          onClick={() => setShowReservationModal(true)}
                          className="w-full transform rounded-xl bg-linear-to-r from-[#1d9ed9] to-blue-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#1d9ed9]/90 hover:to-blue-700 hover:shadow-xl"
                        >
                          <Sparkles className="mr-2 h-5 w-5" />
                          Reserve Your Seat Now!
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="w-full rounded-xl py-4 text-lg opacity-50"
                        >
                          Regular Seats Full
                        </Button>
                      )}

                      {canReserveLottery && (
                        <Button
                          onClick={() => setShowLotteryModal(true)}
                          className="w-full transform rounded-xl bg-linear-to-r from-[#f4d41b] to-yellow-500 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#f4d41b]/90 hover:to-yellow-600 hover:shadow-xl"
                        >
                          <Zap className="mr-2 h-5 w-5" />
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
          <Card className="card-hover unipod-border unipod-glow bg-white/90 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-[#1d9ed9] to-[#f4d41b]">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-text">Live Seat Map</span>
                <Badge className="animate-pulse bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] text-white">
                  Real-time Updates
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SeatMap seats={seats} />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modals */}
      <ReservationModal
        open={showReservationModal}
        onOpenChange={setShowReservationModal}
        eventId={currentEvent.id}
      />
      <LotteryModal
        open={showLotteryModal}
        onOpenChange={setShowLotteryModal}
        eventId={currentEvent.id}
      />
    </div>
  );
}
