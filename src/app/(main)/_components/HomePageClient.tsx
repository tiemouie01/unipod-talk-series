"use client";

import { useState, useEffect } from "react";
import { ReservationModal } from "@/components/reservation-modal";
import { LotteryModal } from "@/components/lottery-modal";
import { BackgroundImage } from "./BackgroundImage";
import { EventPoster } from "./EventPoster";
import { EventDetails } from "./EventDetails";
import { SeatMapCard } from "./SeatMapCard";
import type { EventData } from "./EventPoster";

interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  eventDate: Date;
  registrationStartDate: Date | null;
  registrationEndDate: Date | null;
  bannerURL: string | null;
  luckyDrawEnabled: boolean;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  reservedSeats: number;
  totalSeats: number;
  speaker: string;
  speakerTitle: string;
}

interface HomePageClientProps {
  event: Event;
}

// Transform database event to component-compatible format
function transformEventToEventData(event: Event): EventData {
  const eventDate = new Date(event.eventDate);
  const timeString = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateString = eventDate.toISOString().split("T")[0];

  return {
    id: 1, // Using a number as expected by components
    title: event.title,
    speaker: event.speaker,
    speakerTitle: event.speakerTitle,
    date: dateString ?? "",
    time: timeString ?? "",
    venue: event.location ?? "Unipod Malawi",
    description: event.description ?? "Join us for an insightful discussion.",
    poster: event.bannerURL ?? "/unipod_banner.jpg",
    totalSeats: event.totalSeats,
    reservedSeats: event.reservedSeats,
    lotterySeats: 6, // Default lottery seats
    lotteryAssigned: false, // Default value
    lotteryDate: eventDate.toISOString(),
  };
}

export function HomePageClient({ event }: HomePageClientProps) {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showLotteryModal, setShowLotteryModal] = useState(false);
  const [seats, setSeats] = useState<
    Array<{
      id: number;
      status: "available" | "reserved" | "lottery" | "lottery-winner";
    }>
  >([]);

  const eventData = transformEventToEventData(event);

  useEffect(() => {
    // Initialize seats
    const initialSeats: Array<{
      id: number;
      status: "available" | "reserved" | "lottery" | "lottery-winner";
    }> = Array.from({ length: event.totalSeats }, (_, i) => ({
      id: i + 1,
      status: i < event.reservedSeats ? "reserved" : "available",
    }));

    // Mark last 6 seats as lottery if regular seats are almost full
    if (event.reservedSeats >= event.totalSeats - 6) {
      for (let i = event.totalSeats - 6; i < event.totalSeats; i++) {
        const seat = initialSeats[i];
        if (seat) {
          seat.status = "lottery";
        }
      }
    }

    setSeats(initialSeats);
  }, [event.reservedSeats, event.totalSeats]);

  const availableSeats = event.totalSeats - event.reservedSeats;
  const canReserveLottery =
    event.reservedSeats >= event.totalSeats - 6 && event.luckyDrawEnabled;

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
              <EventPoster currentEvent={eventData} />
            </div>
            <EventDetails
              currentEvent={eventData}
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
        eventId={1} // Using number as expected by modal
      />
      <LotteryModal
        open={showLotteryModal}
        onOpenChange={setShowLotteryModal}
        eventId={1} // Using number as expected by modal
      />
    </div>
  );
}
