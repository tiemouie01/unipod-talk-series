import { EventDetailsSkeleton } from "./_components/EventDetails";
import { SeatMapSkeleton } from "@/components/seat-map";
import { EventPosterSkeleton } from "./_components/EventPoster";

export default function Loading() {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 bg-white/60 p-8 md:grid-cols-3 md:gap-12 dark:bg-black/60">
      <div className="space-y-8 md:col-span-2">
        <EventDetailsSkeleton />
        <SeatMapSkeleton />
      </div>
      <div className="hidden md:block">
        <EventPosterSkeleton />
      </div>
    </div>
  );
}
