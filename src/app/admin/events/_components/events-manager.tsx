

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EventCard } from "./event-card"
import { getEvents } from "@/server/db/queries"
import type { EventManagementValues } from "@/types/events"
import SearchInput from "@/components/search-input"
import { ErrorUI } from "@/components/ui/error"

export async function EventsManager({query}:{query:string}) {
  const {eventsData,error} = await getEvents({query:query || ""})

  if (error) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <ErrorUI 
          title="Failed to load events" 
          message="There was an error loading the events. Please try refreshing the page."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
          Events Management
        </h2>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 shadow-lg shadow-blue-500/25"
        >
          <Link href="/admin/events/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md relative">
          <SearchInput placeholder="Search events..." />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData?.map((event: EventManagementValues) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {eventsData?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No events found</p>
        </div>
      )}
    </div>
  )
}
