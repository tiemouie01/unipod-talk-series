import { EventDetail } from "./_components/event-detail"



export default async function EventDetailPage(props:{params:Promise<{eventId:string}>}) {
  const eventId = (await props.params).eventId
  return <EventDetail eventId={eventId} />
}
