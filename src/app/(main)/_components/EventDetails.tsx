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
      <Card className="unipod-glow border-none bg-gradient-to-br from-blue-950 via-gray-900 to-black/90 shadow-2xl backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-yellow-400 to-indigo-500 shadow-lg ring-2 shadow-blue-400/40 ring-yellow-300/60">
              <Calendar className="h-5 w-5 text-white drop-shadow-[0_1px_4px_rgba(244,212,27,0.7)]" />
            </div>
            <span className="gradient-text text-white drop-shadow-[0_1px_8px_rgba(29,158,217,0.7)]">
              Event Details
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-blue-900/80 via-gray-900/80 to-black/80 p-4 shadow-xl ring-1 shadow-blue-400/30 ring-blue-400/30 backdrop-blur-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-yellow-400 to-indigo-500 shadow-lg ring-2 shadow-blue-400/40 ring-yellow-300/60">
                <Clock className="h-5 w-5 text-white drop-shadow-[0_1px_4px_rgba(244,212,27,0.7)]" />
              </div>
              <div>
                <p className="font-semibold text-white">Date & Time</p>
                <p className="text-blue-200">
                  {new Date(currentEvent.date).toLocaleDateString()} at{" "}
                  {currentEvent.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-blue-900/80 via-gray-900/80 to-black/80 p-4 shadow-xl ring-1 shadow-blue-400/30 ring-blue-400/30 backdrop-blur-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-indigo-400 shadow-lg ring-2 shadow-blue-400/40 ring-blue-400/60">
                <MapPin className="h-5 w-5 text-white drop-shadow-[0_1px_4px_rgba(29,158,217,0.7)]" />
              </div>
              <div>
                <p className="font-semibold text-white">Venue</p>
                <p className="text-blue-200">{currentEvent.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-yellow-400/30 via-yellow-500/20 to-blue-900/60 p-4 shadow-xl ring-1 shadow-yellow-300/30 ring-yellow-300/30 backdrop-blur-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 shadow-lg ring-2 shadow-yellow-300/40 ring-yellow-300/60">
                <Users className="h-5 w-5 text-black drop-shadow-[0_1px_4px_rgba(244,212,27,0.7)]" />
              </div>
              <div>
                <p className="font-semibold text-yellow-200">Availability</p>
                <p className="text-yellow-100">
                  {availableSeats > 0
                    ? `${availableSeats} seats remaining`
                    : "Event full - Lottery only"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-blue-900/80 via-gray-900/80 to-black/80 p-4 shadow-xl ring-1 shadow-blue-400/30 ring-blue-400/30 backdrop-blur-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-indigo-400 shadow-lg ring-2 shadow-blue-400/40 ring-blue-400/60">
                <Ticket className="h-5 w-5 text-white drop-shadow-[0_1px_4px_rgba(29,158,217,0.7)]" />
              </div>
              <div>
                <p className="font-semibold text-white">Capacity</p>
                <p className="text-blue-200">
                  {currentEvent.totalSeats} total seats
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-900 pt-6">
            <p className="mb-6 text-lg leading-relaxed text-blue-100">
              {currentEvent.description}
            </p>
            <div className="space-y-4">
              {availableSeats > 0 ? (
                <Button
                  onClick={() => setShowReservationModal(true)}
                  className="w-full transform rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-400 py-4 text-lg font-bold text-white shadow-xl shadow-blue-400/40 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-500 hover:shadow-2xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Reserve Your Seat Now!
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-400 py-4 text-lg text-white opacity-50"
                >
                  Regular Seats Full
                </Button>
              )}
              {canReserveLottery && (
                <Button
                  onClick={() => setShowLotteryModal(true)}
                  className="w-full transform rounded-xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 py-4 text-lg font-bold text-black shadow-xl shadow-yellow-300/40 transition-all duration-300 hover:scale-105 hover:from-yellow-500 hover:to-yellow-400 hover:shadow-2xl"
                >
                  <Zap className="mr-2 h-5 w-5" />
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
