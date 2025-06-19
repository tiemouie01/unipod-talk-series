"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <Card className="overflow-hidden card-hover unipod-border bg-white/90 backdrop-blur-xs">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 bg-linear-to-r from-[#1d9ed9] to-[#f4d41b] rounded-full flex items-center justify-center">
              <Clock className="h-3 w-3 text-white" />
            </div>
            <h3 className="text-lg font-bold gradient-text">Event Starts In</h3>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-linear-to-br from-[#1d9ed9] to-blue-600 rounded-xl flex items-center justify-center mb-2 shadow-md">
                <span className="text-lg font-bold text-white">{timeLeft.days}</span>
              </div>
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Days</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-linear-to-br from-[#f4d41b] to-yellow-500 rounded-xl flex items-center justify-center mb-2 shadow-md">
                <span className="text-lg font-bold text-black">{timeLeft.hours}</span>
              </div>
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Hours</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-linear-to-br from-[#1d9ed9] to-blue-600 rounded-xl flex items-center justify-center mb-2 shadow-md">
                <span className="text-lg font-bold text-white">{timeLeft.minutes}</span>
              </div>
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Minutes</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-linear-to-br from-[#f4d41b] to-yellow-500 rounded-xl flex items-center justify-center mb-2 shadow-md animate-pulse">
                <span className="text-lg font-bold text-black">{timeLeft.seconds}</span>
              </div>
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Seconds</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
