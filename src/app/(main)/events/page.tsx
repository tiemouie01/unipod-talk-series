"use client";

import { useState, useEffect } from "react";
import { ReservationModal } from "@/components/reservation-modal";
import { LotteryModal } from "@/components/lottery-modal";
import { BackgroundImage } from "./_components/BackgroundImage";
import { EventPoster } from "./_components/EventPoster";
import { EventDetails } from "./_components/EventDetails";
import { SeatMapCard } from "./_components/SeatMapCard";

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
  poster: "/test-poster.jpg",
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
    const initialSeats: Array<{
      id: number;
      status: "available" | "reserved" | "lottery" | "lottery-winner";
    }> = Array.from({ length: 70 }, (_, i) => ({
      id: i + 1,
      status: i < currentEvent.reservedSeats ? "reserved" : "available",
    }));

    // Mark last 6 seats as lottery if regular seats are almost full
    if (currentEvent.reservedSeats >= 64) {
      for (let i = 64; i < 70; i++) {
        const seat = initialSeats[i];
        if (seat) {
          seat.status = "lottery";
        }
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
      <BackgroundImage />
      <main className="flex w-full flex-1 flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-7xl gap-12">
          <div className="mb-12 grid grid-cols-1 gap-12 xl:grid-cols-2">
            <div className="space-y-8">
              <EventPoster currentEvent={currentEvent} />
            </div>
            <EventDetails
              currentEvent={currentEvent}
              availableSeats={availableSeats}
              canReserveLottery={canReserveLottery}
              setShowReservationModal={setShowReservationModal}
              setShowLotteryModal={setShowLotteryModal}
            />
          </div>
          <SeatMapCard seats={seats} />
        </div>
      </main>
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
