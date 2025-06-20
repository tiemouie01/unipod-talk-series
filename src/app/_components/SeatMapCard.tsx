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
    <Card className="card-hover unipod-border unipod-glow bg-white/60 shadow-xl backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Users className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text">Live Seat Map</span>
          <Badge className="animate-pulse bg-blue-600 text-white">
            Real-time Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SeatMap seats={seats} />
      </CardContent>
    </Card>
  );
}
