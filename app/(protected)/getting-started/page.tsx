"use client";

import { useState } from "react";

import ICPForm from "@/components/icp-form";
import { IcpChoicesDisplay } from "@/components/icp-form/icp-choices-display";
import { IcpProvider } from "@/components/icp-form/icp-context";
import { WelcomeDialog } from "./_components/welcome-dialog";
import Image from "next/image";

export default function OnboardingPage() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  return (
    <IcpProvider>
      <div className="flex h-screen flex-col bg-background">
        <WelcomeDialog
          open={welcomeOpen}
          onOpenChange={setWelcomeOpen}
        />

        {/* Header */}
        <header className="flex h-16 shrink-0 items-center border-b px-6">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
        </header>

        {/* Contenu */}
        <main className="flex min-h-0 flex-1">
          {/* 1/3 */}
          <section className="w-1/3 overflow-y-auto border-r">
            <div className="h-full p-6">
              <ICPForm />
            </div>
          </section>

          {/* 2/3 */}
          <section className="w-2/3 overflow-y-auto">
            <div className="h-full p-6">
              <IcpChoicesDisplay />
            </div>
          </section>
        </main>
      </div>
    </IcpProvider>
  );
}