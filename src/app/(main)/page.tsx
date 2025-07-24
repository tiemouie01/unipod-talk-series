import { getUpcomingEvent } from "@/server/db/queries";
import { HomePageClient } from "./_components/HomePageClient";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data: event, error } = await getUpcomingEvent();

  if (error || !event) {
    return <ErrorState />;
  }

  return <HomePageClient event={event} />;
}

// --- ErrorState component ---
function ErrorState() {
  return (
    <div className="flex h-dvh w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background image */}

      <Card className="mx-auto w-full max-w-md border-none bg-white/70 p-8 shadow-lg backdrop-blur-md dark:bg-black/70">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-yellow-100 p-4 dark:bg-yellow-300/20">
            <AlertCircle className="h-10 w-10 text-yellow-600 dark:text-yellow-300" />
          </span>
          <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm dark:text-white/90">
            Oops! No Events Found
          </h1>
          <p className="text-gray-700 dark:text-gray-200">
            There are currently no upcoming events. Please check back soon for
            more inspiring talks at Unipod.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-blue-400 bg-blue-700 px-4 py-2 text-white shadow hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-blue-400 dark:text-blue-950 dark:hover:bg-blue-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
