import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Sparkles,
  Zap,
} from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { LotteryWinners } from "@/components/lottery-winners";
import React from "react";
import type { EventData } from "./EventPoster";
import { Skeleton } from "@/components/ui/skeleton";

export function EventDetails({
  currentEvent,
  availableSeats,
  canReserveLottery,
  setShowReservationModal,
  setShowLotteryModal,
}: {
  currentEvent: EventData;
  availableSeats: number;
  canReserveLottery: boolean;
  setShowReservationModal: (open: boolean) => void;
  setShowLotteryModal: (open: boolean) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <CountdownTimer
          targetDate={new Date(currentEvent.date + "T" + currentEvent.time)}
        />
      </div>
      <Card className="border border-white/10 bg-black/60 shadow-none backdrop-blur-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-white/90">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-400/40 bg-blue-400/10">
              <Calendar className="h-4 w-4 text-blue-200" />
            </div>
            <span className="font-semibold text-white/90">Event Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 rounded border border-white/10 bg-black/60 p-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-400/40 bg-blue-400/10">
                <Clock className="h-4 w-4 text-blue-200" />
              </div>
              <div>
                <p className="font-medium text-white/80">Date & Time</p>
                <p className="text-sm text-blue-200">
                  {new Date(currentEvent.date).toLocaleDateString()} at{" "}
                  {currentEvent.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-white/10 bg-black/60 p-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-400/40 bg-blue-400/10">
                <MapPin className="h-4 w-4 text-blue-200" />
              </div>
              <div>
                <p className="font-medium text-white/80">Venue</p>
                <p className="text-sm text-blue-200">{currentEvent.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-white/10 bg-black/60 p-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-yellow-300/40 bg-yellow-300/10">
                <Users className="h-4 w-4 text-yellow-200" />
              </div>
              <div>
                <p className="font-medium text-yellow-100">Availability</p>
                <p className="text-sm text-yellow-100">
                  {availableSeats > 0
                    ? `${availableSeats} seats remaining`
                    : "Event full - Lottery only"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-white/10 bg-black/60 p-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-400/40 bg-blue-400/10">
                <Ticket className="h-4 w-4 text-blue-200" />
              </div>
              <div>
                <p className="font-medium text-white/80">Capacity</p>
                <p className="text-sm text-blue-200">
                  {currentEvent.totalSeats} total seats
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="mb-6 text-base leading-relaxed text-white/80">
              {currentEvent.description}
            </p>
            <div className="space-y-3">
              {availableSeats > 0 ? (
                <Button
                  onClick={() => setShowReservationModal(true)}
                  className="w-full rounded border border-blue-400/40 bg-black/60 py-3 text-base font-semibold text-blue-200 hover:bg-blue-900/30 hover:text-blue-100"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Reserve Your Seat Now!
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full rounded border border-white/10 bg-black/60 py-3 text-base text-white/50 opacity-60"
                >
                  Regular Seats Full
                </Button>
              )}
              {canReserveLottery && (
                <Button
                  onClick={() => setShowLotteryModal(true)}
                  className="w-full rounded border border-yellow-300/40 bg-black/60 py-3 text-base font-semibold text-yellow-200 hover:bg-yellow-900/30 hover:text-yellow-100"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Enter Lottery (Last 6 Seats)
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {currentEvent.lotteryAssigned && <LotteryWinners />}
    </div>
  );
}

export function EventDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <Card className="overflow-hidden border border-white/10 bg-gradient-to-br from-blue-950/80 via-gray-900/70 to-black/70 shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="mb-2 h-7 w-40" />
              <div className="grid w-full grid-cols-4 gap-3">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-14 w-14 rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="unipod-glow border border-white/10 bg-gradient-to-br from-blue-950/80 via-gray-900/70 to-black/70 shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[...Array(4).keys()].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/70 via-gray-900/60 to-black/60 p-4 shadow-xl ring-1 shadow-blue-400/30 ring-white/20 backdrop-blur-2xl"
              >
                <Skeleton className="h-11 w-11 rounded-full" />
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-900 pt-6">
            <Skeleton className="mb-6 h-6 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
