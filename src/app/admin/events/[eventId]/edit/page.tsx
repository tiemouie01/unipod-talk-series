import { getEventById } from "@/server/db/queries";
import { UpdateEventForm } from "./_components/update-event-form";
import { ErrorUI } from "@/components/ui/error";

export default async function UpdateEventPage(props:{
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await props.params).eventId;
  const {eventData, error} = await getEventById({eventId})

  if (error) {
    return (
      <ErrorUI 
        title="Failed to load event"
        message={error}
      />
    );
  }

  return <UpdateEventForm values={eventData} />
}