import { getUpcomingEvent } from "@/server/db/queries";
import { HomePageClient } from "./_components/HomePageClient";

export default async function HomePage() {
  const { data: event, error } = await getUpcomingEvent();

  if (error || !event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            {error || "No events available"}
          </h1>
          <p className="text-gray-600">
            Please check back later for upcoming events.
          </p>
        </div>
      </div>
    );
  }

  return <HomePageClient event={event} />;
}
