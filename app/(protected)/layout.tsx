import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { syncUser } from "@/lib/services/user";
import { getICP } from "@/lib/services/get-icp";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  await syncUser();

const icps = await getICP(userId);

if (icps.length === 0) {
  redirect("/onboarding");
}

  return children;
}