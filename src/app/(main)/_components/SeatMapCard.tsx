import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { SeatMap } from "@/components/seat-map";
import React from "react";

type Seat = {
  id: number;
  status: "available" | "reserved" | "lottery" | "lottery-winner";
};

export function SeatMapCard({ seats }: { seats: Seat[] }) {
  return (
    <Card className="unipod-glow mx-auto flex w-full flex-col border-none bg-gradient-to-br from-blue-950 via-gray-900 to-black/90 p-0 py-2 shadow-2xl backdrop-blur-xl sm:p-0 md:p-2 lg:p-6">
      <CardHeader className="px-4 pb-2 sm:px-6 sm:pb-4">
        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-yellow-400 to-indigo-500 shadow-lg ring-2 shadow-blue-400/40 ring-yellow-300/60 sm:mb-0">
            <Users className="h-5 w-5 text-white drop-shadow-[0_1px_4px_rgba(244,212,27,0.7)]" />
          </div>
          <span className="gradient-text text-white drop-shadow-[0_1px_8px_rgba(29,158,217,0.7)]">
            Live Seat Map
          </span>
          <Badge className="ml-0 animate-pulse bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-400 text-white shadow-lg ring-2 shadow-blue-400/40 ring-blue-400/60 sm:ml-2">
            Real-time Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-2 py-2 sm:px-6 sm:py-4">
        <div className="grid w-full grid-cols-1">
          <SeatMap seats={seats} />
        </div>
      </CardContent>
    </Card>
  );
}
