import { EventDetail } from "./_components/event-detail";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorUI } from "@/components/ui/error"

export default async function EventDetailPage(props: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  const userData = await auth.api.getSession({
    headers: await headers()
  })
  const userId = userData?.session.userId  
  const {success, error} = await auth.api.userHasPermission({
    body:{
      userId:userId,
      permissions:{
        user:["create"]
      }
    }
  })
  if(error){
    return <div>
      <ErrorUI title="An error occured while fetching user data" message={error}/>
    </div>
  }
  if(!success){
    redirect("/auth")
  }
  const eventId = (await props.params).eventId;
  const query = (await props.searchParams).query;
  return <EventDetail eventId={eventId} query={query} />;
}
