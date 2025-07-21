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
      <Card className="border border-gray-200 bg-white/70 shadow-none backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white/90">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
              <Calendar className="h-4 w-4 text-blue-700 dark:text-blue-200" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white/90">
              Event Details
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 rounded border border-gray-200 bg-white/70 p-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
                <Clock className="h-4 w-4 text-blue-700 dark:text-blue-200" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white/80">
                  Date & Time
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  {new Date(currentEvent.date).toLocaleDateString()} at{" "}
                  {currentEvent.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-gray-200 bg-white/70 p-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
                <MapPin className="h-4 w-4 text-blue-700 dark:text-blue-200" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white/80">
                  Venue
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  {currentEvent.venue}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-gray-200 bg-white/70 p-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-yellow-300 bg-yellow-100 dark:border-yellow-300/40 dark:bg-yellow-300/10">
                <Users className="h-4 w-4 text-yellow-700 dark:text-yellow-200" />
              </div>
              <div>
                <p className="font-medium text-yellow-700 dark:text-yellow-100">
                  Availability
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-100">
                  {availableSeats > 0
                    ? `${availableSeats} seats remaining`
                    : "Event full - Lottery only"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-gray-200 bg-white/70 p-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
                <Ticket className="h-4 w-4 text-blue-700 dark:text-blue-200" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white/80">
                  Capacity
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  {currentEvent.totalSeats} total seats
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 dark:border-white/10">
            <p className="mb-6 text-base leading-relaxed text-gray-900 dark:text-white/80">
              {currentEvent.description}
            </p>
            <div className="space-y-3">
              {availableSeats > 0 ? (
                <Button
                  onClick={() => setShowReservationModal(true)}
                  className="w-full rounded border border-blue-300 bg-white/70 py-3 text-base font-semibold text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-400/40 dark:bg-black/60 dark:text-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-100"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Reserve Your Seat Now!
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full rounded border border-gray-200 bg-white/70 py-3 text-base text-gray-400 opacity-60 dark:border-white/10 dark:bg-black/60 dark:text-white/50"
                >
                  Regular Seats Full
                </Button>
              )}
              {canReserveLottery && (
                <Button
                  onClick={() => setShowLotteryModal(true)}
                  className="w-full rounded border border-yellow-300 bg-white/70 py-3 text-base font-semibold text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 dark:border-yellow-300/40 dark:bg-black/60 dark:text-yellow-200 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-100"
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
        <Card className="overflow-hidden border border-gray-200 bg-white/70 shadow-none backdrop-blur-md dark:border-white/10 dark:bg-black/60">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="mb-2 h-7 w-40 rounded-lg bg-gray-200 dark:bg-white/10" />
              <div className="grid w-full grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-white/10"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border border-gray-200 bg-white/70 shadow-none backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded border border-gray-200 bg-white/70 p-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60"
              >
                <Skeleton className="h-8 w-8 rounded bg-gray-200 dark:bg-white/10" />
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10" />
                  <Skeleton className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6 dark:border-white/10">
            <Skeleton className="mb-6 h-6 w-full rounded bg-gray-200 dark:bg-white/10" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full rounded bg-gray-200 dark:bg-white/10" />
              <Skeleton className="h-12 w-full rounded bg-gray-200 dark:bg-white/10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
