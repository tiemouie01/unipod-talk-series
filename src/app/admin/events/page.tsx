import { EventsManager } from "@/app/admin/events/_components/events-manager"


export default async function EventsPage(props:{searchParams:Promise<{query?:string}>}) {
    const query = (await props.searchParams).query ?? ""
  return <EventsManager query={query} />
}
