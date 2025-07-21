"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Seat {
  id: number;
  status: "available" | "reserved" | "lottery" | "lottery-winner";
}

interface SeatMapProps {
  seats: Seat[];
}

export function SeatMap({ seats }: SeatMapProps) {
  const getSeatColor = (status: Seat["status"]) => {
    switch (status) {
      case "available":
        return "seat-available";
      case "reserved":
        return "seat-reserved";
      case "lottery":
        return "seat-lottery";
      case "lottery-winner":
        return "seat-lottery-winner";
      default:
        return "seat-available";
    }
  };

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
      {/* Enhanced Legend */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-300 via-green-200 to-green-100 px-4 py-2 shadow-lg ring-2 shadow-green-400/30 ring-green-300/30">
          <div className="seat-available h-6 w-6 rounded-lg shadow-lg ring-2 shadow-green-400/40 ring-green-300/60"></div>
          <span className="font-semibold text-green-900 drop-shadow-[0_1px_4px_rgba(34,197,94,0.5)]">
            Available ({getStatusCount("available")})
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-300 via-red-200 to-red-100 px-4 py-2 shadow-lg ring-2 shadow-red-400/30 ring-red-300/30">
          <div className="seat-reserved h-6 w-6 rounded-lg shadow-lg ring-2 shadow-red-400/40 ring-red-300/60"></div>
          <span className="font-semibold text-red-900 drop-shadow-[0_1px_4px_rgba(239,68,68,0.5)]">
            Reserved ({getStatusCount("reserved")})
          </span>
        </div>
        {/*
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 px-4 py-2 shadow-lg shadow-yellow-300/30 ring-2 ring-yellow-200/30">
          <div className="seat-lottery h-6 w-6 rounded-lg shadow-lg shadow-yellow-300/40 ring-2 ring-yellow-200/60"></div>
          <span className="font-semibold text-yellow-900 drop-shadow-[0_1px_4px_rgba(244,212,27,0.5)]">Lottery ({getStatusCount("lottery")})</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 px-4 py-2 shadow-lg shadow-blue-300/30 ring-2 ring-blue-200/30">
          <div className="seat-lottery-winner h-6 w-6 rounded-lg shadow-lg shadow-blue-300/40 ring-2 ring-blue-200/60"></div>
          <span className="font-semibold text-blue-900 drop-shadow-[0_1px_4px_rgba(29,158,217,0.5)]">Winners ({getStatusCount("lottery-winner")})</span>
        </div>
        */}
      </div>

      {/* Stage */}
      <div className="text-center">
        <div className="mb-8 inline-block rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-yellow-400 px-12 py-4 text-white shadow-2xl ring-2 shadow-yellow-300/30 ring-yellow-300/40">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-400 shadow-md shadow-yellow-300/60"></div>
            <span className="text-xl font-bold tracking-wide drop-shadow-[0_1px_8px_rgba(244,212,27,0.7)]">
              STAGE
            </span>
            <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-400 shadow-md shadow-yellow-300/60"></div>
          </div>
        </div>
      </div>

      {/* Seat Grid - Removed row numbers */}
      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seat) => (
              <div
                key={seat.id}
                className={cn(
                  "seat flex h-10 w-10 cursor-pointer items-center justify-center text-xs font-bold shadow-xl ring-2",
                  getSeatColor(seat.status),
                )}
                title={`Seat ${seat.id} - ${seat.status}`}
                style={{
                  boxShadow:
                    seat.status === "available"
                      ? "0 0 12px 2px rgba(34,197,94,0.4)"
                      : seat.status === "reserved"
                        ? "0 0 12px 2px rgba(239,68,68,0.4)"
                        : seat.status === "lottery"
                          ? "0 0 12px 2px rgba(244,212,27,0.4)"
                          : seat.status === "lottery-winner"
                            ? "0 0 12px 2px rgba(29,158,217,0.4)"
                            : undefined,
                  borderColor:
                    seat.status === "available"
                      ? "#4ade80"
                      : seat.status === "reserved"
                        ? "#f87171"
                        : seat.status === "lottery"
                          ? "#fde047"
                          : seat.status === "lottery-winner"
                            ? "#38bdf8"
                            : undefined,
                }}
              >
                {seat.id}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Enhanced Info */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center gap-8 text-sm">
          <Badge className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 px-4 py-2 text-white shadow-lg ring-2 shadow-blue-400/40 ring-blue-400/60">
            Total Capacity: 70 seats
          </Badge>
          <Badge className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 px-4 py-2 text-black shadow-lg ring-2 shadow-yellow-300/40 ring-yellow-300/60">
            7 Rows
          </Badge>
        </div>
      </div>
    </div>
  );
}
