import { EventDetailsSkeleton } from "./_components/EventDetails";
import { SeatMapSkeleton } from "@/components/seat-map";
import { EventPosterSkeleton } from "./_components/EventPoster";

export default function Loading() {
  return (
    <div
      className="grid min-h-screen w-full"
      style={{ gridTemplateRows: "1fr" }}
    >
      <main className="flex w-full flex-1 flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-7xl gap-12">
          <div className="mb-12 grid grid-cols-1 gap-12 xl:grid-cols-2">
            <div className="space-y-8">
              <EventPosterSkeleton />
            </div>
            <EventDetailsSkeleton />
          </div>
          <SeatMapSkeleton />
        </div>
      </main>
    </div>
  );
}
