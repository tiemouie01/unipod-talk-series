"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Sparkles, Crown } from "lucide-react"

// Mock lottery winners data
const lotteryWinners = [
  { name: "John Banda", email: "j.banda@email.com" },
  { name: "Mary Phiri", email: "m.phiri@email.com" },
  { name: "David Mwale", email: "d.mwale@email.com" },
  { name: "Grace Tembo", email: "g.tembo@email.com" },
  { name: "Peter Zulu", email: "p.zulu@email.com" },
  { name: "Sarah Kunda", email: "s.kunda@email.com" },
]

export function LotteryWinners() {
  return (
    <Card className="card-hover neon-border bg-linear-to-br from-purple-50 to-pink-50 border-purple-200 glow-effect">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <span className="gradient-text">🎉 Lottery Winners Announced!</span>
          <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg font-bold animate-pulse">
            Congratulations! 🎊
          </Badge>
        </div>

        <p className="text-purple-700 mb-6 text-center font-semibold">
          🎯 Our lucky winners have been selected! Check your email for confirmation details.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lotteryWinners.map((winner, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-2 border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-gray-800">{winner.name}</span>
              </div>
              <Badge className="bg-linear-to-r from-yellow-400 to-orange-500 text-white font-bold animate-pulse">
                🏆 Winner
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
