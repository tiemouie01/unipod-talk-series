"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="overflow-hidden border border-white/10 bg-gradient-to-br from-blue-950/80 via-gray-900/70 to-black/70 shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-blue-500/80 via-yellow-400/80 to-indigo-500/80 shadow-lg ring-2 shadow-blue-400/40 ring-white/30 backdrop-blur-xl">
              <Clock className="h-4 w-4 text-white drop-shadow-[0_1px_4px_rgba(244,212,27,0.7)]" />
            </div>
            <h3 className="gradient-text text-lg font-bold text-white drop-shadow-[0_1px_8px_rgba(29,158,217,0.7)]">
              Event Starts In
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-blue-500/80 via-indigo-500/80 to-blue-400/80 shadow-xl ring-2 shadow-blue-400/40 ring-white/30 backdrop-blur-2xl">
                <span className="text-xl font-bold text-white drop-shadow-[0_1px_8px_rgba(29,158,217,0.7)]">
                  {timeLeft.days}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                Days
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-yellow-400/80 via-yellow-500/80 to-orange-400/80 shadow-xl ring-2 shadow-yellow-300/40 ring-white/30 backdrop-blur-2xl">
                <span className="text-xl font-bold text-black drop-shadow-[0_1px_8px_rgba(244,212,27,0.7)]">
                  {timeLeft.hours}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-yellow-200 uppercase">
                Hours
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-blue-500/80 via-indigo-500/80 to-blue-400/80 shadow-xl ring-2 shadow-blue-400/40 ring-white/30 backdrop-blur-2xl">
                <span className="text-xl font-bold text-white drop-shadow-[0_1px_8px_rgba(29,158,217,0.7)]">
                  {timeLeft.minutes}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                Minutes
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-14 w-14 animate-pulse items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-yellow-400/80 via-yellow-500/80 to-orange-400/80 shadow-xl ring-2 shadow-yellow-300/40 ring-white/30 backdrop-blur-2xl">
                <span className="text-xl font-bold text-black drop-shadow-[0_1px_8px_rgba(244,212,27,0.7)]">
                  {timeLeft.seconds}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-yellow-200 uppercase">
                Seconds
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
