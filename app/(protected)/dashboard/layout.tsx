import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérification de la session
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Vérification du profil ICP
  const icpProfile = await prisma.icpProfile.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  if (!icpProfile) {
    redirect("/getting-started");
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <SidebarTrigger className="p-4" />

        {/* Contenu des pages */}
        <main className="flex flex-1 flex-col gap-6 p-6 pt-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}