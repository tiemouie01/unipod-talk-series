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
    <Card className="overflow-hidden border border-gray-200 bg-white/70 shadow-none backdrop-blur-md dark:border-white/10 dark:bg-black/60">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
              <Clock className="h-4 w-4 text-blue-700 dark:text-blue-200" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
              Event Starts In
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
                <span className="text-lg font-bold text-blue-700 dark:text-blue-100">
                  {timeLeft.days}
                </span>
              </div>
              <div className="text-xs font-medium tracking-wide text-blue-700 uppercase dark:text-blue-200">
                Days
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-300 bg-yellow-100 dark:border-yellow-300/40 dark:bg-yellow-300/10">
                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-100">
                  {timeLeft.hours}
                </span>
              </div>
              <div className="text-xs font-medium tracking-wide text-yellow-700 uppercase dark:text-yellow-200">
                Hours
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 dark:border-blue-400/40 dark:bg-blue-400/10">
                <span className="text-lg font-bold text-blue-700 dark:text-blue-100">
                  {timeLeft.minutes}
                </span>
              </div>
              <div className="text-xs font-medium tracking-wide text-blue-700 uppercase dark:text-blue-200">
                Minutes
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 animate-pulse items-center justify-center rounded-lg border border-yellow-300 bg-yellow-100 dark:border-yellow-300/40 dark:bg-yellow-300/10">
                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-100">
                  {timeLeft.seconds}
                </span>
              </div>
              <div className="text-xs font-medium tracking-wide text-yellow-700 uppercase dark:text-yellow-200">
                Seconds
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
