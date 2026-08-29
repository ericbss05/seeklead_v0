"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ICPForm from "@/components/icp-form";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Définissez votre Ideal Customer Profile
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Configurez les profils que votre agent doit cibler lors de la recherche de prospects.
            </p>
          </div>
          <Button className="shrink-0 gap-2">
            <Sparkles className="h-4 w-4" />
            Générer mon ICP avec l&apos;IA
          </Button>
        </div>

        <ICPForm />
      </div>
    </main>
  );
}