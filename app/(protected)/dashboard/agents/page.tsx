import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getAgent } from "@/lib/services/get-agent";
import { AgentCard } from "./_component/agent-card";

export default async function AgentPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const agents = await getAgent(userId);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Mes agents
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Les profils que vous souhaitez identifier.
          </p>
        </div>

        <Button size="sm">
          <Link href="/dashboard/agents/build">
            + Ajouter un agent
          </Link>
        </Button>
      </header>

      {agents.length === 0 ? (
        <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/50">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Aucun agent pour le moment.
            </p>

            <Button
              variant="outline"
              size="sm"
              className="mt-4"
            >
              <Link href="/dashboard/agents/build">
                Créer un agent
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
            />
          ))}
        </div>
      )}
    </div>
  );
}