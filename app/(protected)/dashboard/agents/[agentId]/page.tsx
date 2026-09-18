import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import AgentForm from "@/components/agent/form";
import { getAgent } from "@/lib/services/get-agent";

import type { AgentSignalType } from "@/components/agent/form/types";

type AgentPageProps = {
  params: Promise<{
    agentId: string;
  }>;
};

const signalTypes: Record<
  string,
  AgentSignalType
> = {
  "Mots-clés": "keywords",
  "Interactions avec un profil":
    "profile-interactions",
  "Activité autour d'un profil":
    "profile-activity",
  "Signaux d'achat": "buying-signals",
};

export default async function AgentPage({
  params,
}: AgentPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const { agentId } = await params;

  const agents = await getAgent(userId, agentId);
  const agent = agents[0];

  if (!agent) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-1 flex-col p-6">
      <div>
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux agents
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AgentForm
          agentId={agent.id}
          initialData={{
            name: agent.name,

            signals: agent.signals.map(
              (signal) => ({
                id: signal.id,

                type:
                  signalTypes[signal.name] ??
                  "keywords",

                keywords: signal.keywords.map(
                  (keyword) => ({
                    id: keyword.id,
                    raw: keyword.raw,
                  }),
                ),
              }),
            ),
          }}
        />
      </div>
    </div>
  );
}