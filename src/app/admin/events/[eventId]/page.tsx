import { EventDetail } from "./_components/event-detail";

export default async function EventDetailPage(props: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  const eventId = (await props.params).eventId;
  const query = (await props.searchParams).query;
  return <EventDetail eventId={eventId} query={query} />;
}
