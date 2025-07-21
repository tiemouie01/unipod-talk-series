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
      <Card className="unipod-glow border-none bg-gradient-to-br from-black/70 to-gray-800/60 shadow-xl backdrop-blur-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-yellow-400 shadow-md">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text text-white">Event Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/60 p-4 shadow-md backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-yellow-400 shadow">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Date & Time</p>
                <p className="text-gray-300">
                  {new Date(currentEvent.date).toLocaleDateString()} at{" "}
                  {currentEvent.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/60 p-4 shadow-md backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Venue</p>
                <p className="text-gray-300">{currentEvent.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/60 p-4 shadow-md backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow">
                <Users className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="font-semibold text-white">Availability</p>
                <p className="text-gray-300">
                  {availableSeats > 0
                    ? `${availableSeats} seats remaining`
                    : "Event full - Lottery only"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/60 p-4 shadow-md backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow">
                <Ticket className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Capacity</p>
                <p className="text-gray-300">
                  {currentEvent.totalSeats} total seats
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="mb-6 text-lg leading-relaxed text-gray-200">
              {currentEvent.description}
            </p>
            <div className="space-y-4">
              {availableSeats > 0 ? (
                <Button
                  onClick={() => setShowReservationModal(true)}
                  className="w-full transform rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-500 hover:shadow-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Reserve Your Seat Now!
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 py-4 text-lg text-white opacity-50"
                >
                  Regular Seats Full
                </Button>
              )}
              {canReserveLottery && (
                <Button
                  onClick={() => setShowLotteryModal(true)}
                  className="w-full transform rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-yellow-500 hover:to-yellow-400 hover:shadow-xl"
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
