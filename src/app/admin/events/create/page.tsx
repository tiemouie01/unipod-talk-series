import { CreateEventForm } from "./_components/create-event-form";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorUI } from "@/components/ui/error"

export default async function CreateEventPage() {
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
  return (
    <div className="min-h-[calc(100vh-3rem)]">
      <CreateEventForm />
    </div>
  );
}