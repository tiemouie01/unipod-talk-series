"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import Link from "next/link"
import { EventCard } from "./event-card"

interface Event {
  id: string
  name: string
  description: string
  date: string
  location: string
  totalSeats: number
  registeredSeats: number
  status: "upcoming" | "active" | "completed" | "cancelled"
  luckyDrawEnabled: boolean
  registrationOpen: boolean
  bannerImage: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    name: "AI & VR Workshop",
    description: "Hands-on workshop exploring the intersection of AI and Virtual Reality",
    date: "2024-12-15T14:00:00",
    location: "Tech Hub, Building A",
    totalSeats: 50,
    registeredSeats: 45,
    status: "active",
    luckyDrawEnabled: true,
    registrationOpen: true,
    bannerImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    name: "Tech Innovation Summit",
    description: "Annual summit featuring the latest in technology innovation",
    date: "2024-12-20T09:00:00",
    location: "Convention Center",
    totalSeats: 200,
    registeredSeats: 120,
    status: "upcoming",
    luckyDrawEnabled: false,
    registrationOpen: true,
    bannerImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    name: "Startup Pitch Night",
    description: "Local startups present their ideas to investors",
    date: "2024-12-22T18:00:00",
    location: "Innovation Lab",
    totalSeats: 100,
    registeredSeats: 94,
    status: "active",
    luckyDrawEnabled: true,
    registrationOpen: false,
    bannerImage: "/placeholder.svg?height=200&width=400",
  },
]

const searchSchema = z.object({
  query: z.string().max(100, "Search query must be less than 100 characters"),
})

type SearchFormData = z.infer<typeof searchSchema>

export function EventsManager() {
  const [events] = useState<Event[]>(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  })

  const onSearch = (data: SearchFormData) => {
    setSearchTerm(data.query)
  }

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <Link href="/events/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)} className="flex-1 max-w-md">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search events..."
                        className="pl-10 bg-slate-700 border-blue-700/50 text-white placeholder-slate-400 focus:border-blue-500"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          // Real-time search
                          setSearchTerm(e.target.value)
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button variant="outline" className="border-blue-600/50 text-blue-300 hover:bg-blue-900/30">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-slate-400">No events found matching &quot;{searchTerm}&quot;</p>
        </div>
      )}
    </div>
  )
}
