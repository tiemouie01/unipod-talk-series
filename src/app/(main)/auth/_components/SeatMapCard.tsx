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
    <Card className="unipod-glow mx-auto flex w-full max-w-2xl flex-col bg-white/40 p-0 py-2 shadow-lg backdrop-blur-md sm:p-0 md:p-2 lg:p-6">
      <CardHeader className="px-4 pb-2 sm:px-6 sm:pb-4">
        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 sm:mb-0">
            <Users className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text">Live Seat Map</span>
          <Badge className="ml-0 animate-pulse bg-blue-600 text-white sm:ml-2">
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
