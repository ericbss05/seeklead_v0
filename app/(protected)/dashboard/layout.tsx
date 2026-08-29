import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const icpProfile = await prisma.icpProfile.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!icpProfile) {
    redirect("/getting-started");
  }

  return <>{children}</>;
}