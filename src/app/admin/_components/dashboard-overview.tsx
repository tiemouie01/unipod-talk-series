import { getRecentEvents } from "@/server/db/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getEventStatus, getStatusColor } from "@/lib/utils";
import { ErrorUI } from "@/components/ui/error";

export async function DashboardOverview() {
  const { recentEvents, error } = await getRecentEvents();
  if (error) {
    return (
      <div>
        <ErrorUI
          title="Failed to load events"
          message="There was an error loading the events. Please try refreshing the page."
        />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Hero Section with Mural Background */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-800/30 bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900 p-8">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/unipod_banner.jpg"
            alt="UniPod Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="mb-2 text-3xl font-bold text-white">
            Welcome to UniPod Admin
          </h2>
          <p className="mb-6 text-blue-100">
            Manage your events, track registrations, and run lucky draws
            seamlessly.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-yellow-600"
          >
            <Link href="/admin/events/create">Create New Event</Link>
          </Button>
        </div>
      </div>

      {/* Recent Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!recentEvents || recentEvents.length === 0 ? (
                <div className="p-4 text-center text-slate-400">
                  No recent events found
                </div>
              ) : (
                recentEvents.map((event, index) => (
                  <Link key={index} href={`/admin/events/${event?.id}`}>
                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-blue-800/20 bg-slate-700/50 p-4 transition-all hover:border-blue-600/30">
                      <div>
                        <h4 className="font-medium text-white">
                          {event?.title}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {event?.eventDate?.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          {event?.reservedSeats}/{event?.totalSeats} attendees
                        </p>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${getStatusColor(getEventStatus(event!.eventDate!, event!.registrationStartDate!, event!.registrationEndDate!))}`}
                        >
                          {getEventStatus(
                            event!.eventDate!,
                            event!.registrationStartDate!,
                            event!.registrationEndDate!,
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-yellow-600"
            >
              <Link href="/admin/events/create">Create New Event</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
