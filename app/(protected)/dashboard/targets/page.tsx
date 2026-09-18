import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getICP } from "@/lib/services/get-icp";
import { TargetCard } from "./_components/target-card";

export default async function TargetsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const icps = await getICP(userId);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Mes cibles
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Les profils que vous souhaitez identifier.
          </p>
        </div>

        <Button size="sm">
          <Link href="/dashboard/targets/add">
            + Ajouter une cible
          </Link>
        </Button>
      </header>

      {icps.length === 0 ? (
        <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/50">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Aucune cible pour le moment.
            </p>

            <Button variant="outline" size="sm" className="mt-4">
              <Link href="/dashboard/targets/add">
                Créer une cible
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {icps.map((icp) => (
            <TargetCard key={icp.id} icp={icp} />
          ))}
        </div>
      )}
    </div>
  );
}