import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Zap } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface EventData {
  id: number;
  title: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  poster?: string;
  totalSeats: number;
  reservedSeats: number;
  lotterySeats: number;
  lotteryAssigned: boolean;
  lotteryDate: string;
}

export function EventPoster({ currentEvent }: { currentEvent: EventData }) {
  return (
    <Card className="grid h-full w-full overflow-hidden bg-black/60 p-0 shadow-none backdrop-blur-md">
      <div className="grid grid-cols-1 grid-rows-1">
        {/* Image as background layer */}
        <Image
          src={currentEvent.poster ?? "/unipod_banner.jpg"}
          alt={currentEvent.title}
          className="col-start-1 row-start-1 h-full w-full object-cover"
          fill
        />
        {/* Overlay layer */}
        <div className="z-10 col-start-1 row-start-1 h-full w-full bg-black/60" />
        {/* Content layer */}
        <div className="z-20 col-start-1 row-start-1 flex flex-col justify-end gap-2 bg-black/40 p-6 text-white">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-300" />
            <Badge className="bg-yellow-300/80 font-semibold text-black/80">
              Featured Speaker
            </Badge>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white/90">
            {currentEvent.title}
          </h2>
          <p className="text-lg font-medium text-white/80">
            {currentEvent.speaker}
          </p>
          <p className="text-xs text-white/60">{currentEvent.speakerTitle}</p>
        </div>
      </div>
    </Card>
  );
}

export function EventPosterSkeleton() {
  return (
    <div className="grid h-full w-full overflow-hidden bg-white/40 p-0 shadow-lg backdrop-blur-md">
      <div className="grid grid-cols-1 grid-rows-1">
        <Skeleton className="col-start-1 row-start-1 h-full w-full" />
        <div className="z-20 col-start-1 row-start-1 flex flex-col justify-end gap-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
          <Skeleton className="mb-3 h-8 w-40" />
          <Skeleton className="mb-3 h-10 w-64" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
