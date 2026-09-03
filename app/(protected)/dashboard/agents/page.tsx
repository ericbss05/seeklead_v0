"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Bot,
  CircleHelp,
  Target,
  Pencil,
  AlertCircle,
  RefreshCw,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SIGNAL_LABELS: Record<string, string> = {
  "niche-interest": "Intérêt Niche",
  "profile-interactions": "Interactions Profil",
  "active-around-profiles": "Actifs autour de profils",
  "buying-signals": "Signaux d'achat",
};

const INTERACTION_LABELS: Record<string, string> = {
  posts: "Publications",
  likes: "Likes",
  comments: "Commentaires",
  all: "Toutes interactions",
};

interface AgentData {
  id: string;
  name: string;
  signalType: string;
  interactionTypes: string[];
  keywords: string[];
  status: "active" | "paused" | string;
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MAX_AGENTS = 1;
  const isLimitReached = agents.length >= MAX_AGENTS;

  /**
   * Charge les agents depuis l'API.
   * Cette fonction est utilisée par le bouton "Réessayer".
   */
  const fetchAgents = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/agents");

      if (!res.ok) {
        throw new Error("Impossible de charger les agents.");
      }

      const data: AgentData[] = await res.json();

      setAgents(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur est survenue.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Premier chargement.
   *
   * On ne réutilise pas fetchAgents ici car la règle
   * react-hooks/set-state-in-effect détecte les setState
   * synchrones présents dans cette fonction.
   */
  useEffect(() => {
    let cancelled = false;

    const loadAgents = async () => {
      try {
        const res = await fetch("/api/agents");

        if (!res.ok) {
          throw new Error("Impossible de charger les agents.");
        }

        const data: AgentData[] = await res.json();

        if (cancelled) {
          return;
        }

        setAgents(data);
        setError(null);
        setLoading(false);
      } catch (err: unknown) {
        if (cancelled) {
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : "Une erreur est survenue.";

        setError(message);
        setLoading(false);
      }
    };

    loadAgents();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      {/* Tâches d'ambiance pour flou backdrop */}
      <div className="pointer-events-none absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/20 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Agents de prospection
              </h1>

              <Badge
                variant="outline"
                className="border-white/40 bg-white/20 text-xs font-normal backdrop-blur-md"
              >
                {agents.length} / {MAX_AGENTS} utilisé
                {MAX_AGENTS > 1 ? "s" : ""}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Gérez vos agents autonomes de détection de prospects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-white/40 bg-white/30 backdrop-blur-md"
              title="Aide"
            >
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
            </Button>

            {isLimitReached ? (
              <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-medium text-amber-700 backdrop-blur-md dark:text-amber-400">
                <Zap className="h-3.5 w-3.5" />
                <span>Limite atteinte</span>
              </div>
            ) : (
              <Button  className="gap-2 shadow-sm">
                <Link href="/dashboard/agents/builds">
                  <Plus className="h-4 w-4" />
                  Créer un agent
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={fetchAgents}
                className="gap-1.5 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Réessayer
              </Button>
            </div>
          </div>
        )}

        {/* Skeleton loading */}
        {loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1].map((i) => (
              <div
                key={i}
                className="relative h-48 w-full animate-pulse rounded-2xl border border-white/60 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && agents.length === 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 p-12 text-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_2px_0_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 via-white/5 to-transparent dark:from-white/10 dark:via-transparent" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/50 text-indigo-500 shadow-xs dark:border-white/10 dark:bg-slate-800">
                <Bot className="h-7 w-7" />
              </div>

              <h3 className="text-base font-semibold">
                Aucun agent configuré
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Déployez votre premier bot pour surveiller les signaux d&apos;achat
                et qualifier vos leads.
              </p>

              <Button  className="mt-6 gap-2">
                <Link href="/dashboard/agents/builds">
                  <Plus className="h-4 w-4" />
                  Créer mon premier agent
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Grid des cartes Glassmorphism */}
        {!loading && !error && agents.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => {
              const isActive = agent.status === "active";

              return (
                <div
                  key={agent.id}
                  className="
                    group relative flex flex-col justify-between rounded-2xl
                    border border-white/60 bg-white/40 backdrop-blur-xl
                    shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_2px_0_rgba(0,0,0,0.04)]
                    transition-all duration-300 ease-in-out hover:scale-[1.02]
                    dark:border-white/10 dark:bg-slate-900/40
                    dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                  "
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 via-white/5 to-transparent dark:from-white/10 dark:via-transparent" />

                  <div className="relative z-10 space-y-4 p-6">
                    {/* Header carte */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/60 bg-white/60 text-indigo-600 shadow-xs dark:border-white/10 dark:bg-slate-800 dark:text-indigo-400">
                          <Bot className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="text-base font-semibold tracking-tight text-foreground">
                            {agent.name}
                          </h3>

                          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Target className="h-3.5 w-3.5 text-indigo-500" />

                            <span>
                              {SIGNAL_LABELS[agent.signalType] ||
                                agent.signalType}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-2.5 py-1 text-[11px] font-medium backdrop-blur-md dark:border-white/10 dark:bg-slate-800/60">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isActive
                              ? "animate-pulse bg-emerald-500"
                              : "bg-muted-foreground/40"
                          }`}
                        />

                        <span>
                          {isActive ? "Actif" : "En pause"}
                        </span>
                      </div>
                    </div>

                    {/* Cibles */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        Cibles
                      </span>

                      <div className="flex flex-wrap gap-1">
                        {agent.interactionTypes.includes("all") ? (
                          <Badge
                            variant="secondary"
                            className="border-white/30 bg-white/30 text-[11px] font-normal backdrop-blur-xs"
                          >
                            Toutes interactions
                          </Badge>
                        ) : (
                          agent.interactionTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="secondary"
                              className="border-white/30 bg-white/30 text-[11px] font-normal backdrop-blur-xs"
                            >
                              {INTERACTION_LABELS[type] || type}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Mots-clés */}
                    {agent.keywords.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                          Mots-clés
                        </span>

                        <div className="flex flex-wrap gap-1">
                          {agent.keywords.slice(0, 3).map((kw) => (
                            <Badge
                              key={kw}
                              variant="outline"
                              className="border-white/40 bg-white/20 text-[11px] font-normal"
                            >
                              {kw}
                            </Badge>
                          ))}

                          {agent.keywords.length > 3 && (
                            <Badge
                              variant="outline"
                              className="border-white/40 bg-white/20 text-[11px] font-normal"
                            >
                              +{agent.keywords.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 flex items-center justify-between border-t border-white/30 bg-white/10 px-6 py-3 backdrop-blur-md dark:border-white/10">
                    <span className="text-[11px] text-muted-foreground">
                      Créé le{" "}
                      {new Date(agent.createdAt).toLocaleDateString("fr-FR")}
                    </span>

                    <Button
                      
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 px-2 text-xs font-medium hover:bg-white/40"
                    >
                      <Link
                        href={`/dashboard/agents/edit/${agent.id}`}
                        className="flex items-center gap-1.5"
                      >
                        <Pencil className="h-3 w-3 shrink-0" />
                        <span>Configurer</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}