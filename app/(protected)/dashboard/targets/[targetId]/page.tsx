import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import prisma from "@/lib/prisma";

import ICPForm from "@/components/icp/form";
import TargetPreview from "@/components/icp/target-preview";

type TargetPageProps = {
  params: Promise<{
    targetId: string;
  }>;
};

export default async function TargetPage({
  params,
}: TargetPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const { targetId } = await params;

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    notFound();
  }

  const icp = await prisma.iCP.findFirst({
    where: {
      id: targetId,
      userId: user.id,
    },
  });

  if (!icp) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950">
      <header className="absolute inset-x-0 top-0 z-20 h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <Link
            href="/dashboard/targets"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux cibles
          </Link>
        </div>
      </header>

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <section className="flex items-center justify-center overflow-y-auto p-8 pt-24 md:items-start md:justify-center md:pt-[25vh]">
          <ICPForm
            icpId={icp.id}
            initialData={{
              name: `${icp.name}`,
              jobTitles: icp.jobTitles,
              locations: icp.locations,
              industries: icp.industries,
              companyTypes: icp.companyTypes,
              companySizes: icp.companySizes,
              exclude: icp.exclude,
            }}
          />
        </section>

        <section className="relative hidden md:block">
          <div className="absolute -bottom-16 -right-16 w-[42rem] max-w-none">
            <TargetPreview />
          </div>
        </section>
      </div>
    </main>
  );
}