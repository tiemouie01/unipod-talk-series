import { EventsManager } from "@/app/admin/events/_components/events-manager"
import { EventsSkeleton } from "./_components/events-skeleton"
import { Suspense } from "react"

export default async function EventsPage(props:{searchParams:Promise<{query?:string, page?:string}>}) {
  const query = (await props.searchParams).query ?? ""
  const page = (await props.searchParams).page ?? "1"
  return (
    <Suspense  fallback={<EventsSkeleton />}>
      <EventsManager query={query} page={Number(page)} />
    </Suspense>
  )
}
