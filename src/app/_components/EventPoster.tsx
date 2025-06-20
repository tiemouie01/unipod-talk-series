import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Zap } from "lucide-react";
import React from "react";

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
    <Card className="card-hover unipod-border overflow-hidden bg-white/60 shadow-xl backdrop-blur-lg">
      <div className="flex aspect-3/4 flex-col justify-end">
        <Image
          src={currentEvent.poster ?? "/placeholder.svg"}
          alt={currentEvent.title}
          className="h-full w-full object-cover"
          fill
        />
        <div className="flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#f4d41b]" />
            <Badge className="bg-[#f4d41b] font-bold text-black">
              Featured Speaker
            </Badge>
          </div>
          <h2 className="text-shadow mb-3 text-3xl font-bold">
            {currentEvent.title}
          </h2>
          <p className="text-xl font-semibold">{currentEvent.speaker}</p>
          <p className="text-sm opacity-90">{currentEvent.speakerTitle}</p>
        </div>
      </div>
    </Card>
  );
}
