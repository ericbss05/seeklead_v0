import AgentForm from "@/components/agent/form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewAgentPage() {
  return (
     <div className="flex min-h-full flex-1 flex-col p-6">
      {/* Bouton placé en haut à gauche dans le flux du document */}
      <div>
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux agents
        </Link>
      </div>

      {/* Zone centrale pour le formulaire */}
      <div className="flex flex-1 items-center justify-center">
        <AgentForm />
      </div>
    </div>
  );
}