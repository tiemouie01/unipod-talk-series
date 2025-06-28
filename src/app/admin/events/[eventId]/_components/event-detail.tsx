"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, MapPin, Users, Download, Mail, Trophy, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface EventDetailProps {
  eventId: string
}

const mockEvent = {
  id: "1",
  name: "AI & VR Workshop",
  description: "Hands-on workshop exploring the intersection of AI and Virtual Reality",
  date: "2024-12-15T14:00:00",
  location: "Tech Hub, Building A",
  totalSeats: 50,
  registeredSeats: 45,
  status: "active" as const,
  luckyDrawEnabled: true,
  registrationOpen: true,
}

const mockAttendees = [
  { id: 1, name: "John Doe", email: "john@example.com", registeredAt: "2024-12-01", status: "confirmed" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", registeredAt: "2024-12-02", status: "confirmed" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", registeredAt: "2024-12-03", status: "waitlist" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", registeredAt: "2024-12-04", status: "confirmed" },
  { id: 5, name: "David Brown", email: "david@example.com", registeredAt: "2024-12-05", status: "waitlist" },
]

const mockLuckyDrawWinners = [
  { id: 1, name: "Alice Cooper", email: "alice@example.com", drawnAt: "2024-12-10T15:30:00" },
  { id: 2, name: "Bob Martin", email: "bob@example.com", drawnAt: "2024-12-10T15:30:00" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", drawnAt: "2024-12-10T15:30:00" },
]

export function EventDetail({ eventId }: EventDetailProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [event, setEvent] = useState(mockEvent)
  const [attendees] = useState(mockAttendees)

  useEffect(() => {
    // In a real app, fetch event data based on eventId
    console.log("Fetching event:", eventId)
  }, [eventId])

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const confirmedCount = attendees.filter((a) => a.status === "confirmed").length
  const waitlistCount = attendees.filter((a) => a.status === "waitlist").length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" className="text-slate-300 hover:text-blue-400 hover:bg-blue-900/30">
          <Link href="/events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </Button>
        <h2 className="text-2xl font-bold text-white">{event.name}</h2>
      </div>

      {/* Event Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-xl mb-2">{event.name}</CardTitle>
                  <p className="text-slate-400">{event.description}</p>
                </div>
                <Badge
                  className={`${
                    event.status === "active"
                      ? "bg-blue-500/20 text-blue-400"
                      : event.status === "upcoming"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  {event.location}
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Users className="h-4 w-4 text-cyan-400" />
                <span className="font-medium text-white">
                  {event.registeredSeats}/{event.totalSeats}
                </span>
                seats filled
              </div>

              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-yellow-500 h-3 rounded-full transition-all"
                  style={{ width: `${(event.registeredSeats / event.totalSeats) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 shadow-lg shadow-blue-500/25">
                <Download className="h-4 w-4 mr-2" />
                Export Attendees
              </Button>
              <Button variant="outline" className="w-full border-blue-600/50 text-blue-300 hover:bg-blue-900/30">
                <Mail className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
              {event.luckyDrawEnabled && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-yellow-600/50 text-yellow-400 hover:bg-yellow-900/30"
                >
                  <Link href="/lucky-draw">
                    <Trophy className="h-4 w-4 mr-2" />
                    Run Lucky Draw
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">Registration Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmed</span>
                <span className="text-blue-400 font-medium">{confirmedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Waitlist</span>
                <span className="text-yellow-400 font-medium">{waitlistCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Available</span>
                <span className="text-cyan-400 font-medium">{event.totalSeats - event.registeredSeats}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="attendees" className="space-y-4">
        <TabsList className="bg-slate-800 border-blue-700/50">
          <TabsTrigger
            value="attendees"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-300"
          >
            Attendees ({attendees.length})
          </TabsTrigger>
          <TabsTrigger
            value="lucky-draw"
            className="data-[state=active]:bg-yellow-900/50 data-[state=active]:text-yellow-300"
          >
            Lucky Draw
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-cyan-900/50 data-[state=active]:text-cyan-300"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendees">
          <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Attendee List</CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search attendees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-slate-700 border-blue-700/50 text-white focus:border-blue-500"
                  />
                  <Button variant="outline" className="border-blue-600/50 text-blue-300 hover:bg-blue-900/30">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-blue-800/30">
                    <TableHead className="text-slate-300">Name</TableHead>
                    <TableHead className="text-slate-300">Email</TableHead>
                    <TableHead className="text-slate-300">Registered</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id} className="border-blue-800/30 hover:bg-blue-900/20">
                      <TableCell className="text-white font-medium">{attendee.name}</TableCell>
                      <TableCell className="text-slate-300">{attendee.email}</TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(attendee.registeredAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            attendee.status === "confirmed"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }
                        >
                          {attendee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lucky-draw">
          <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Lucky Draw Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockLuckyDrawWinners.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockLuckyDrawWinners.map((winner, index) => (
                      <div
                        key={winner.id}
                        className="p-4 bg-gradient-to-r from-blue-600/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{winner.name}</p>
                            <p className="text-slate-400 text-sm">{winner.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 shadow-lg shadow-blue-500/25">
                      Rerun Draw
                    </Button>
                    <Button variant="outline" className="border-yellow-600/50 text-yellow-300 hover:bg-yellow-900/30">
                      Notify Winners
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">No lucky draw has been conducted yet</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 shadow-lg shadow-blue-500/25">
                    Run Lucky Draw
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Registration Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-slate-400">Analytics charts and insights coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
