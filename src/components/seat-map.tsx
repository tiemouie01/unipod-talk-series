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
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md">
          <div className="seat-available h-5 w-5 rounded border border-green-400/60 bg-green-400/10" />
          <span className="text-sm font-medium text-green-200">
            Available ({getStatusCount("available")})
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md">
          <div className="seat-reserved h-5 w-5 rounded border border-red-400/60 bg-red-400/10" />
          <span className="text-sm font-medium text-red-200">
            Reserved ({getStatusCount("reserved")})
          </span>
        </div>
      </div>

      {/* Stage */}
      <div className="text-center">
        <div className="mb-8 inline-block rounded-xl border border-white/10 bg-black/60 px-10 py-3 text-white backdrop-blur-md">
          <span className="text-base font-semibold tracking-wide text-yellow-200">
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
                    ? "border-green-400/60 bg-green-400/10 text-green-100"
                    : seat.status === "reserved"
                      ? "border-red-400/60 bg-red-400/10 text-red-100"
                      : seat.status === "lottery"
                        ? "border-yellow-300/60 bg-yellow-300/10 text-yellow-100"
                        : seat.status === "lottery-winner"
                          ? "border-blue-400/60 bg-blue-400/10 text-blue-100"
                          : "border-white/10 bg-white/5 text-white/80",
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
          <Badge className="border border-white/10 bg-black/60 px-3 py-1 font-normal text-white/80 backdrop-blur-md">
            Total Capacity: 70 seats
          </Badge>
          <Badge className="border border-white/10 bg-black/60 px-3 py-1 font-normal text-white/80 backdrop-blur-md">
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
      <div className="flex flex-wrap justify-center gap-6">
        <Skeleton className="h-8 w-40 rounded-xl" />
        <Skeleton className="h-8 w-40 rounded-xl" />
      </div>
      <div className="text-center">
        <Skeleton className="mb-8 inline-block h-12 w-64 rounded-2xl" />
      </div>
      <div className="space-y-3">
        {[...Array(7).keys()].map((_, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-2">
            {[...Array(10).keys()].map((_, seatIdx) => (
              <Skeleton key={seatIdx} className="h-10 w-10 rounded-lg" />
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-4 text-center">
        <div className="flex justify-center gap-8 text-sm">
          <Skeleton className="h-8 w-40 rounded-xl" />
          <Skeleton className="h-8 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
