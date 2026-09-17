import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getICP } from "@/lib/services/get-icp";

import OnboardingForm from "./_components/onboarding-form";
import TargetPreview from "@/components/icp/target-preview";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const icp = await getICP(userId);

  if (icp) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950">
      <header className="absolute inset-x-0 top-0 z-20 h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center gap-2 px-6">
          <Image src="/logo.svg" alt="Seeklead" width={28} height={28} priority />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Seeklead
          </h1>
        </div>
      </header>

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <section className="flex items-center justify-center p-8 pt-24 md:items-start md:justify-center md:pt-[25vh]">
          <OnboardingForm />
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