import { getEventById } from "@/server/db/queries";
import { UpdateEventForm } from "./_components/update-event-form";
import { ErrorUI } from "@/components/ui/error";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function UpdateEventPage(props:{
  params: Promise<{ eventId: string }>;
}) {
  const userData = await auth.api.getSession({
    headers: await headers()
  })
  const userId = userData?.session.userId  
  const {success, error:permissionError} = await auth.api.userHasPermission({
    body:{
      userId:userId,
      permissions:{
        user:["create"]
      }
    }
  })
  if(permissionError){
    return <div>
      <ErrorUI title="An error occured while fetching user data" message={permissionError}/>
    </div>
  }
  if(!success){
    redirect("/auth")
  }
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