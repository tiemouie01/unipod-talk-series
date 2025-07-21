import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Trophy,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  getEventById,
  getReservationsForEvent,
  getLuckyDrawWinnersForEvent,
} from "@/server/db/queries";
import { getEventStatus, getStatusColor } from "@/lib/utils";
import SearchInput from "@/components/search-input";
import { ErrorUI } from "@/components/ui/error";
interface EventDetailProps {
  eventId: string;
  query: string;
}

export async function EventDetail({ eventId, query }: EventDetailProps) {
  const { eventData, error } = await getEventById({ eventId });
  const { reservations, error: reservationsError } =
    await getReservationsForEvent({ eventId, query: query || "" });
  const { luckyDrawWinnersData, error: luckyDrawWinnersError } =
    await getLuckyDrawWinnersForEvent({ eventId });

  // Calculate reservation counts

  if (error) {
    return <ErrorUI title="Failed to load event" message={error} />;
  }

  if (!eventData) {
    return (
      <ErrorUI
        title="Event not found"
        message="The requested event could not be found."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          asChild
          variant="ghost"
          className="text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
        >
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
        <h2 className="text-2xl font-bold text-white">{eventData?.title}</h2>
      </div>

      {/* Event Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2 text-xl text-white">
                    {eventData?.title}
                  </CardTitle>
                  <p className="text-slate-400">{eventData?.description}</p>
                </div>
                <Badge
                  className={getStatusColor(
                    getEventStatus(
                      eventData?.eventDate ?? new Date(),
                      eventData?.registrationStartDate ?? null,
                      eventData?.registrationEndDate ?? null,
                    ),
                  )}
                >
                  {getEventStatus(
                    eventData?.eventDate ?? new Date(),
                    eventData?.registrationStartDate ?? null,
                    eventData?.registrationEndDate ?? null,
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(eventData?.speaker ?? eventData?.speakerTitle) && (
                <div className="mb-4 rounded-lg bg-slate-700/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-blue-300">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-medium text-slate-300">
                        Speaker:
                      </span>
                      {eventData.speakerTitle && (
                        <span className="text-sm text-slate-400">
                          {eventData.speakerTitle}
                        </span>
                      )}
                      <span className="font-medium text-white">
                        {eventData.speaker}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  {new Date(
                    eventData?.eventDate ?? "",
                  ).toLocaleDateString()} at{" "}
                  {new Date(eventData?.eventDate ?? "").toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  {eventData?.location}
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Users className="h-4 w-4 text-cyan-400" />
                <span className="font-medium text-white">
                  {eventData?.reservedSeats}/{eventData?.totalSeats}
                </span>
                seats filled
              </div>

              <div className="h-3 w-full rounded-full bg-slate-700">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 transition-all"
                  style={{
                    width: `${((eventData?.reservedSeats ?? 0) / (eventData?.totalSeats ?? 1)) * 100}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventData?.luckyDrawEnabled && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-yellow-600/50 text-yellow-400 hover:bg-yellow-900/30"
                >
                  <Link href="/lucky-draw">
                    <Trophy className="mr-2 h-4 w-4" />
                    Run Lucky Draw
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Registration Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Available</span>
                <span className="font-medium text-cyan-400">
                  {(eventData?.totalSeats ?? 0) -
                    (eventData?.reservedSeats ?? 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="attendees" className="space-y-4">
        <TabsList className="border-blue-700/50 bg-slate-800">
          <TabsTrigger
            value="attendees"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-300"
          >
            Attendees ({reservations?.length})
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
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Attendee List</CardTitle>
                <div className="flex items-center gap-2">
                  <SearchInput placeholder="Search attendees..." />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {reservationsError ? (
                <ErrorUI
                  title="Failed to load reservations"
                  message={reservationsError}
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-800/30">
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">
                        Registered
                      </TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations?.map((reservation) => (
                      <TableRow
                        key={reservation.attendeeId}
                        className="border-blue-800/30 hover:bg-blue-900/20"
                      >
                        <TableCell className="font-medium text-white">
                          {reservation.name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {reservation.email}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {new Date(
                            reservation.registeredAt,
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              reservation.status === "active"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {reservation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-blue-400"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lucky-draw">
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Lucky Draw Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {luckyDrawWinnersError ? (
                <ErrorUI
                  title="Failed to load lucky draw winners"
                  message={luckyDrawWinnersError}
                />
              ) : luckyDrawWinnersData && luckyDrawWinnersData.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {luckyDrawWinnersData.map((winner, index) => (
                      <div
                        key={winner.userId}
                        className="rounded-lg border border-yellow-500/30 bg-gradient-to-r from-blue-600/20 to-yellow-600/20 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 font-bold text-white">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {winner.name}
                            </p>
                            <p className="text-sm text-slate-400">
                              {winner.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-yellow-500 shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-yellow-600">
                      Rerun Draw
                    </Button>
                    <Button
                      variant="outline"
                      className="border-yellow-600/50 text-yellow-300 hover:bg-yellow-900/30"
                    >
                      Notify Winners
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Trophy className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                  <p className="mb-4 text-slate-400">
                    No lucky draw has been conducted yet
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-yellow-500 shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-yellow-600">
                    Run Lucky Draw
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Registration Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="text-slate-400">
                  Analytics charts and insights coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
