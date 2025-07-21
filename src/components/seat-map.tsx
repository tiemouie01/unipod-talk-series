"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Seat {
  id: number;
  status: "available" | "reserved" | "lottery" | "lottery-winner";
}

interface SeatMapProps {
  seats: Seat[];
}

export function SeatMap({ seats }: SeatMapProps) {
  // const getSeatColor = (status: Seat["status"]) => {
  //   switch (status) {
  //     case "available":
  //       return "seat-available";
  //     case "reserved":
  //       return "seat-reserved";
  //     case "lottery":
  //       return "seat-lottery";
  //     case "lottery-winner":
  //       return "seat-lottery-winner";
  //     default:
  //       return "seat-available";
  //   }
  // };

  // Arrange seats in rows (7 rows of 10 seats each)
  const rows = [];
  for (let i = 0; i < 7; i++) {
    const rowSeats = seats.slice(i * 10, (i + 1) * 10);
    rows.push(rowSeats);
  }

  const getStatusCount = (status: Seat["status"]) => {
    return seats.filter((seat) => seat.status === status).length;
  };

  return (
    <div className="space-y-8">
      {/* Minimalist Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/70 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
          <div className="seat-available h-5 w-5 rounded border border-green-400/60 bg-green-100 dark:border-green-400/60 dark:bg-green-400/10" />
          <span className="text-sm font-medium text-green-700 dark:text-green-200">
            Available ({getStatusCount("available")})
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/70 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
          <div className="seat-reserved h-5 w-5 rounded border border-red-400/60 bg-red-100 dark:border-red-400/60 dark:bg-red-400/10" />
          <span className="text-sm font-medium text-red-700 dark:text-red-200">
            Reserved ({getStatusCount("reserved")})
          </span>
        </div>
      </div>

      {/* Stage */}
      <div className="text-center">
        <div className="mb-8 inline-block rounded-xl border border-gray-200 bg-white/70 px-10 py-3 text-gray-900 backdrop-blur-md dark:border-white/10 dark:bg-black/60 dark:text-white">
          <span className="text-base font-semibold tracking-wide text-yellow-700 dark:text-yellow-200">
            STAGE
          </span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((seat) => (
              <div
                key={seat.id}
                className={cn(
                  "seat flex h-8 w-8 items-center justify-center rounded border text-xs font-semibold transition-colors duration-150",
                  seat.status === "available"
                    ? "border-green-400/60 bg-green-100 text-green-700 dark:border-green-400/60 dark:bg-green-400/10 dark:text-green-100"
                    : seat.status === "reserved"
                      ? "border-red-400/60 bg-red-100 text-red-700 dark:border-red-400/60 dark:bg-red-400/10 dark:text-red-100"
                      : seat.status === "lottery"
                        ? "border-yellow-300/60 bg-yellow-100 text-yellow-700 dark:border-yellow-300/60 dark:bg-yellow-300/10 dark:text-yellow-100"
                        : seat.status === "lottery-winner"
                          ? "border-blue-400/60 bg-blue-100 text-blue-700 dark:border-blue-400/60 dark:bg-blue-400/10 dark:text-blue-100"
                          : "border-gray-200 bg-white text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80",
                )}
                title={`Seat ${seat.id} - ${seat.status}`}
                style={{
                  boxShadow: "none",
                }}
              >
                {seat.id}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Minimalist Info */}
      <div className="space-y-2 text-center">
        <div className="flex justify-center gap-4 text-xs">
          <Badge className="border border-gray-200 bg-white/70 px-3 py-1 font-normal text-gray-900 backdrop-blur-md dark:border-white/10 dark:bg-black/60 dark:text-white/80">
            Total Capacity: 70 seats
          </Badge>
          <Badge className="border border-gray-200 bg-white/70 px-3 py-1 font-normal text-gray-900 backdrop-blur-md dark:border-white/10 dark:bg-black/60 dark:text-white/80">
            7 Rows
          </Badge>
        </div>
      </div>
    </div>
  );
}

export function SeatMapSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-white/10" />
        <Skeleton className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-white/10" />
      </div>
      <div className="text-center">
        <Skeleton className="mb-8 inline-block h-12 w-64 rounded-xl bg-gray-200 dark:bg-white/10" />
      </div>
      {Array.from({ length: 7 }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1">
          {Array.from({ length: 10 }).map((_, seatIdx) => (
            <Skeleton
              key={seatIdx}
              className="h-8 w-8 rounded bg-gray-200 dark:bg-white/10"
            />
          ))}
        </div>
      ))}
      <div className="space-y-2 text-center">
        <div className="flex justify-center gap-4 text-xs">
          <Skeleton className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-white/10" />
          <Skeleton className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
