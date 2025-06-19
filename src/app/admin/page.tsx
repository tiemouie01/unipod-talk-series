"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Calendar,
  Mail,
  Phone,
  Briefcase,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Mock data
const events = [
  {
    id: 1,
    title: "The Future of AI in Africa",
    speaker: "Dr. Amina Kone",
    date: "2024-02-15",
    time: "18:00",
    status: "active",
    reservations: 45,
    lotteryEntries: 23,
  },
  {
    id: 2,
    title: "Sustainable Energy Solutions",
    speaker: "Prof. John Mwangi",
    date: "2024-03-20",
    time: "18:00",
    status: "scheduled",
    reservations: 0,
    lotteryEntries: 0,
  },
];

const reservations = [
  {
    id: 1,
    eventId: 1,
    name: "Alice Banda",
    email: "alice@email.com",
    phone: "+265991234567",
    occupation: "Software Developer",
    gender: "Female",
    type: "regular",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    eventId: 1,
    name: "John Phiri",
    email: "john@email.com",
    phone: "+265997654321",
    occupation: "Data Scientist",
    gender: "Male",
    type: "regular",
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: 3,
    eventId: 1,
    name: "Mary Tembo",
    email: "mary@email.com",
    phone: "+265998765432",
    occupation: "Product Manager",
    gender: "Female",
    type: "regular",
    createdAt: "2024-01-17T09:15:00Z",
  },
];

const lotteryEntries = [
  {
    id: 1,
    eventId: 1,
    name: "David Mwale",
    email: "david@email.com",
    phone: "+265995432167",
    occupation: "UX Designer",
    gender: "Male",
    createdAt: "2024-01-18T16:45:00Z",
  },
  {
    id: 2,
    eventId: 1,
    name: "Grace Kunda",
    email: "grace@email.com",
    phone: "+265993216547",
    occupation: "Marketing Specialist",
    gender: "Female",
    createdAt: "2024-01-19T11:30:00Z",
  },
];

// Define a type for Event
interface Event {
  id: number;
  title: string;
  speaker: string;
  speakerTitle?: string;
  date: string;
  time: string;
  status: string;
  reservations: number;
  lotteryEntries: number;
  description?: string;
  poster?: string;
}

export default function AdminPage() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    speaker: "",
    speakerTitle: "",
    date: "",
    time: "",
    description: "",
    poster: "",
  });

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      speaker: "",
      speakerTitle: "",
      date: "",
      time: "",
      description: "",
      poster: "",
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      speaker: event.speaker,
      speakerTitle: event.speakerTitle ?? "",
      date: event.date,
      time: event.time,
      description: event.description ?? "",
      poster: event.poster ?? "",
    });
    setShowEventModal(true);
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingEvent ? "Event Updated" : "Event Created", {
      description: `${eventForm.title} has been ${editingEvent ? "updated" : "created"} successfully.`,
    });
    setShowEventModal(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    toast.success("Event Deleted", {
      description: "The event has been removed successfully.",
    });
  };

  const handleRevokeReservation = (reservationId: number) => {
    toast.success("Reservation Revoked", {
      description: "The reservation has been cancelled successfully.",
    });
  };

  const getEventReservations = (eventId: number) => {
    return reservations.filter((res) => res.eventId === eventId);
  };

  const getEventLotteryEntries = (eventId: number) => {
    return lotteryEntries.filter((entry) => entry.eventId === eventId);
  };

  return (
    <div className="gradient-bg flex min-h-screen flex-col">
      {/* Header */}
      <header className="w-full border-b border-white/20 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-[#1d9ed9] to-[#f4d41b]">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h1 className="gradient-text text-3xl font-bold">
                  Unipod Talks
                </h1>
              </div>
              <Badge className="bg-linear-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                🛠️ Admin Dashboard
              </Badge>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-lg font-semibold text-gray-600 transition-colors hover:text-[#1d9ed9]"
              >
                Current Event
              </Link>
              <Link
                href="/history"
                className="text-lg font-semibold text-gray-600 transition-colors hover:text-[#1d9ed9]"
              >
                Past Events
              </Link>
              <Link
                href="/admin"
                className="text-lg font-semibold text-gray-800 transition-colors hover:text-[#1d9ed9]"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col items-center">
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="gradient-text mb-2 text-3xl font-bold">
              Admin Dashboard
            </h2>
            <p className="text-lg text-gray-600">
              Manage events and reservations
            </p>
          </div>

          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-xs">
              <TabsTrigger
                value="events"
                className="data-[state=active]:bg-linear-to-r data-[state=active]:from-[#1d9ed9] data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                Events Management
              </TabsTrigger>
              <TabsTrigger
                value="reservations"
                className="data-[state=active]:bg-linear-to-r data-[state=active]:from-[#f4d41b] data-[state=active]:to-yellow-500 data-[state=active]:text-black"
              >
                All Reservations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="gradient-text text-2xl font-semibold">Events</h3>
                <Button
                  onClick={handleCreateEvent}
                  className="rounded-xl bg-linear-to-r from-[#1d9ed9] to-blue-600 font-bold text-white shadow-lg hover:from-[#1d9ed9]/90 hover:to-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="unipod-border bg-white/90 backdrop-blur-xs"
                  >
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                          value={`event-${event.id}`}
                          className="border-none"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex w-full items-center justify-between pr-4">
                              <div className="flex items-start gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <h4 className="gradient-text text-xl font-bold">
                                      {event.title}
                                    </h4>
                                    <Badge
                                      variant={
                                        event.status === "active"
                                          ? "default"
                                          : "secondary"
                                      }
                                      className={
                                        event.status === "active"
                                          ? "bg-linear-to-r from-green-500 to-emerald-600 text-white"
                                          : ""
                                      }
                                    >
                                      {event.status}
                                    </Badge>
                                  </div>
                                  <p className="font-medium text-gray-600">
                                    Speaker: {event.speaker}
                                  </p>
                                  <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <span className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(
                                        event.date,
                                      ).toLocaleDateString()}{" "}
                                      at {event.time}
                                    </span>
                                    <span className="flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      {event.reservations} reservations
                                    </span>
                                    <span className="font-semibold text-[#f4d41b]">
                                      {event.lotteryEntries} lottery entries
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditEvent(event);
                                  }}
                                  className="hover:bg-[#1d9ed9] hover:text-white"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                  }}
                                  className="hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                              {/* Regular Reservations */}
                              <div className="space-y-4">
                                <h5 className="flex items-center gap-2 text-lg font-semibold text-[#1d9ed9]">
                                  <Users className="h-5 w-5" />
                                  Regular Reservations (
                                  {getEventReservations(event.id).length})
                                </h5>
                                <div className="max-h-64 space-y-3 overflow-y-auto">
                                  {getEventReservations(event.id).map(
                                    (reservation) => (
                                      <div
                                        key={reservation.id}
                                        className="rounded-xl border border-blue-200 bg-linear-to-r from-blue-50 to-[#1d9ed9]/10 p-4"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                              <User className="h-4 w-4 text-[#1d9ed9]" />
                                              <span className="font-semibold">
                                                {reservation.name}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Mail className="h-3 w-3" />
                                              <span>{reservation.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Phone className="h-3 w-3" />
                                              <span>{reservation.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Briefcase className="h-3 w-3" />
                                              <span>
                                                {reservation.occupation}
                                              </span>
                                            </div>
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              handleRevokeReservation(
                                                reservation.id,
                                              )
                                            }
                                            className="hover:bg-red-500 hover:text-white"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                  {getEventReservations(event.id).length ===
                                    0 && (
                                    <p className="py-4 text-center text-gray-500">
                                      No reservations yet
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Lottery Entries */}
                              <div className="space-y-4">
                                <h5 className="flex items-center gap-2 text-lg font-semibold text-[#f4d41b]">
                                  <Calendar className="h-5 w-5" />
                                  Lottery Entries (
                                  {getEventLotteryEntries(event.id).length})
                                </h5>
                                <div className="max-h-64 space-y-3 overflow-y-auto">
                                  {getEventLotteryEntries(event.id).map(
                                    (entry) => (
                                      <div
                                        key={entry.id}
                                        className="rounded-xl border border-yellow-200 bg-linear-to-r from-[#f4d41b]/20 to-yellow-50 p-4"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                              <User className="h-4 w-4 text-[#f4d41b]" />
                                              <span className="font-semibold">
                                                {entry.name}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Mail className="h-3 w-3" />
                                              <span>{entry.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Phone className="h-3 w-3" />
                                              <span>{entry.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Briefcase className="h-3 w-3" />
                                              <span>{entry.occupation}</span>
                                            </div>
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              handleRevokeReservation(entry.id)
                                            }
                                            className="hover:bg-red-500 hover:text-white"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                  {getEventLotteryEntries(event.id).length ===
                                    0 && (
                                    <p className="py-4 text-center text-gray-500">
                                      No lottery entries yet
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reservations" className="space-y-6">
              <h3 className="gradient-text text-2xl font-semibold">
                All Reservations
              </h3>

              <Card className="unipod-border bg-white/90 backdrop-blur-xs">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Occupation</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell className="font-medium">
                            {reservation.name}
                          </TableCell>
                          <TableCell>{reservation.email}</TableCell>
                          <TableCell>{reservation.phone}</TableCell>
                          <TableCell>{reservation.occupation}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                reservation.type === "regular"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                reservation.type === "regular"
                                  ? "bg-linear-to-r from-[#1d9ed9] to-blue-600 text-white"
                                  : "bg-linear-to-r from-[#f4d41b] to-yellow-500 text-black"
                              }
                            >
                              {reservation.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(
                              reservation.createdAt,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleRevokeReservation(reservation.id)
                              }
                              className="hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Event Modal */}
        <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
          <DialogContent className="unipod-border bg-white/95 backdrop-blur-xs sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="gradient-text text-xl">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmitEvent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  required
                  className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-speaker">Speaker Name</Label>
                <Input
                  id="event-speaker"
                  value={eventForm.speaker}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, speaker: e.target.value })
                  }
                  required
                  className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-speaker-title">Speaker Title</Label>
                <Input
                  id="event-speaker-title"
                  value={eventForm.speakerTitle}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, speakerTitle: e.target.value })
                  }
                  className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    required
                    className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, time: e.target.value })
                    }
                    required
                    className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  rows={3}
                  className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-poster">Poster URL</Label>
                <Input
                  id="event-poster"
                  value={eventForm.poster}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, poster: e.target.value })
                  }
                  placeholder="https://example.com/poster.jpg"
                  className="focus:border-[#1d9ed9] focus:ring-[#1d9ed9]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-[#1d9ed9] to-blue-600 font-bold text-white hover:from-[#1d9ed9]/90 hover:to-blue-700"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
