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
        <div className="flex items-center gap-3 rounded-xl bg-linear-to-r from-green-50 to-green-100 px-4 py-2">
          <div className="seat-available h-6 w-6 rounded-lg shadow-md"></div>
          <span className="font-semibold text-green-800">
            Available ({getStatusCount("available")})
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-linear-to-r from-red-50 to-red-100 px-4 py-2">
          <div className="seat-reserved h-6 w-6 rounded-lg shadow-md"></div>
          <span className="font-semibold text-red-800">
            Reserved ({getStatusCount("reserved")})
          </span>
        </div>
        {/* <div className="flex items-center gap-3 bg-linear-to-r from-[#f4d41b]/20 to-yellow-100 px-4 py-2 rounded-xl">
          <div className="w-6 h-6 rounded-lg seat-lottery shadow-md"></div>
          <span className="font-semibold text-yellow-800">Lottery ({getStatusCount("lottery")})</span>
        </div>
        <div className="flex items-center gap-3 bg-linear-to-r from-[#1d9ed9]/20 to-blue-100 px-4 py-2 rounded-xl">
          <div className="w-6 h-6 rounded-lg seat-lottery-winner shadow-md"></div>
          <span className="font-semibold text-blue-800">Winners ({getStatusCount("lottery-winner")})</span>
        </div> */}
      </div>

      {/* Stage */}
      <div className="text-center">
        <div className="mb-8 inline-block rounded-2xl bg-linear-to-r from-gray-800 to-gray-900 px-12 py-4 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#f4d41b]"></div>
            <span className="text-xl font-bold tracking-wide">STAGE</span>
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#f4d41b]"></div>
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
                  "seat flex h-10 w-10 cursor-pointer items-center justify-center text-xs font-bold shadow-md",
                  getSeatColor(seat.status),
                )}
                title={`Seat ${seat.id} - ${seat.status}`}
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
          <Badge className="bg-linear-to-r from-[#1d9ed9] to-blue-600 px-4 py-2 text-white">
            Total Capacity: 70 seats
          </Badge>
          <Badge className="bg-linear-to-r from-[#f4d41b] to-yellow-500 px-4 py-2 text-black">
            7 Rows
          </Badge>
        </div>
      </div>
    </div>
  );
}
