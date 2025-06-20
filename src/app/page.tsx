"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
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
    <div
      className="grid min-h-screen w-full"
      style={{ gridTemplateRows: "1fr" }}
    >
      {/* Full-page background image and dark overlay using grid */}
      <div className="col-start-1 row-start-1 grid h-full w-full">
        <Image
          src="/unipod_banner.jpg"
          alt="Unipod Banner"
          fill
          className="h-full w-full object-cover"
          priority
        />
        <div
          className="absolute inset-0 h-full w-full bg-black/60"
          style={{ gridArea: "1 / 1 / 2 / 2" }}
        />
      </div>

      {/* Main content with glassy containers */}
      <main className="flex w-full flex-1 flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-7xl gap-12">
          <div className="mb-12 grid grid-cols-1 gap-12 xl:grid-cols-2">
            {/* Event Poster */}
            <div className="space-y-8">
              <Card className="card-hover unipod-border overflow-hidden bg-white/60 shadow-xl backdrop-blur-lg">
                <div className="flex aspect-3/4 flex-col justify-end">
                  <Image
                    src={currentEvent.poster || "/placeholder.svg"}
                    alt={currentEvent.title}
                    className="h-full w-full object-cover"
                    fill
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

              <Card className="card-hover unipod-border unipod-glow bg-white/60 shadow-xl backdrop-blur-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <span className="gradient-text">Event Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4 rounded-xl bg-white/40 p-4 backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
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

                    <div className="flex items-center gap-4 rounded-xl bg-white/40 p-4 backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Venue</p>
                        <p className="text-gray-600">{currentEvent.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-white/40 p-4 backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
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

                    <div className="flex items-center gap-4 rounded-xl bg-white/40 p-4 backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
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
                          className="w-full transform rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
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
                          className="w-full transform rounded-xl bg-yellow-400 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
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
          <Card className="card-hover unipod-border unipod-glow bg-white/60 shadow-xl backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-text">Live Seat Map</span>
                <Badge className="animate-pulse bg-blue-600 text-white">
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
