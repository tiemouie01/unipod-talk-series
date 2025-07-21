import { EventsManager } from "@/app/admin/events/_components/events-manager"
import { EventsSkeleton } from "./_components/events-skeleton"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorUI } from "@/components/ui/error"

export default async function EventsPage(props:{searchParams:Promise<{query?:string, page?:string}>}) {
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
    redirect("/")
  }
  
  const query = (await props.searchParams).query ?? ""
  const page = (await props.searchParams).page ?? "1"
  return (
    <Suspense  fallback={<EventsSkeleton />}>
      <EventsManager query={query} page={Number(page)} />
    </Suspense>
  )
}
