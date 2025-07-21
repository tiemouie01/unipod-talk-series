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
    <Card className="mx-auto flex w-full flex-col border border-white/10 bg-black/60 p-0 py-2 shadow-none backdrop-blur-md sm:p-0 md:p-2 lg:p-6">
      <CardHeader className="px-4 pb-2 sm:px-6 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded border border-blue-400/40 bg-blue-400/10 sm:mb-0">
            <Users className="h-4 w-4 text-blue-200" />
          </div>
          <span className="font-semibold text-white/90">Live Seat Map</span>
          <Badge className="ml-0 border border-blue-400/40 bg-black/60 text-blue-200 sm:ml-2">
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
