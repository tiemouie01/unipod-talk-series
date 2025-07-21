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
    <Card className="overflow-hidden border-none bg-gradient-to-br from-black/70 to-gray-800/60 shadow-xl backdrop-blur-md">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-700/80 to-gray-900/80 shadow-md backdrop-blur-sm">
              <Clock className="h-3 w-3 text-white" />
            </div>
            <h3 className="gradient-text text-lg font-bold text-white">
              Event Starts In
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/70 shadow-lg backdrop-blur-md">
                <span className="text-lg font-bold text-white">
                  {timeLeft.days}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-gray-300 uppercase">
                Days
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700/80 to-gray-800/70 shadow-lg backdrop-blur-md">
                <span className="text-lg font-bold text-white">
                  {timeLeft.hours}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-gray-300 uppercase">
                Hours
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/70 shadow-lg backdrop-blur-md">
                <span className="text-lg font-bold text-white">
                  {timeLeft.minutes}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-gray-300 uppercase">
                Minutes
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 animate-pulse items-center justify-center rounded-xl bg-gradient-to-br from-gray-700/80 to-gray-800/70 shadow-lg backdrop-blur-md">
                <span className="text-lg font-bold text-white">
                  {timeLeft.seconds}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide text-gray-300 uppercase">
                Seconds
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
