import { headers } from "next/headers";
import { DashboardOverview } from "../_components/dashboard-overview";
import { auth } from "@/lib/auth";
import { ErrorUI } from "@/components/ui/error";
import { redirect } from "next/navigation";
export default async function AdminPage() {
  const userData = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userData) {
    redirect("/");
  }
  const userId = userData?.session.userId;
  const { success, error } = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        user: ["create"],
      },
    },
  });
  if (error) {
    return (
      <div>
        <ErrorUI
          title="An error occured while fetching user data"
          message={error}
        />
      </div>
    );
  }
  if (!success) {
    redirect("/");
  }
  return (
    <div>
      <DashboardOverview />
    </div>
  );
}
