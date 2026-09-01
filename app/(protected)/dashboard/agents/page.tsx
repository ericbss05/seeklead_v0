"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Bot, CircleHelp, Target, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SIGNAL_LABELS: Record<string, string> = {
  "niche-interest": "Personnes intéressées par votre niche",
  "profile-interactions": "Interagissent avec votre profil",
  "active-around-profiles": "Actifs autour de profils pertinents",
  "buying-signals": "Événements révélateurs d'un besoin",
};

const INTERACTION_LABELS: Record<string, string> = {
  posts: "Publications",
  likes: "Likes",
  comments: "Commentaires",
  all: "Tout",
};

interface AgentData {
  id: string;
  name: string;
  signalType: string;
  interactionTypes: string[];
  keywords: string[];
  status: string;
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch("/api/agents");
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAgents();
  }, []);

  const canCreateMore = agents.length < 1;

  return (
    <div className="px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm">
          <span className="text-muted-foreground">Agents</span>
        </nav>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <CircleHelp className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Vos agents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez vos agents de prospection automatique.
          </p>
        </div>

        {canCreateMore ? (
          <Button  className="gap-2">
            <Link href="/dashboard/agents/builds">
              <Plus className="h-4 w-4" />
              Nouvel agent
            </Link>
          </Button>
        ) : (
          <Badge variant="secondary" className="gap-1">
            <span>Limite atteinte</span>
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 w-32 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : agents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Bot className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium mb-1">Aucun agent</h3>
            <p className="text-xs text-muted-foreground text-center mb-4 max-w-xs">
              Créez votre premier agent pour commencer à détecter automatiquement des prospects qualifiés.
            </p>
            <Button  size="sm" className="gap-2">
              <Link href="/dashboard/agents/builds">
                <Plus className="h-4 w-4" />
                Créer un agent
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="group relative">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-sm font-medium">
                      {agent.name}
                    </CardTitle>
                  </div>
                  <Button
                    
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Link href={`/dashboard/agents/edit/${agent.id}`} aria-label="Modifier">
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {SIGNAL_LABELS[agent.signalType] || agent.signalType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {agent.interactionTypes.includes("all") ? (
                    <Badge variant="secondary" className="text-[10px]">
                      Tout
                    </Badge>
                  ) : (
                    agent.interactionTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-[10px]">
                        {INTERACTION_LABELS[type] || type}
                      </Badge>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {agent.keywords.slice(0, 3).map((kw) => (
                    <Badge key={kw} variant="outline" className="text-[10px]">
                      {kw}
                    </Badge>
                  ))}
                  {agent.keywords.length > 3 && (
                    <Badge variant="outline" className="text-[10px]">
                      +{agent.keywords.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge
                    variant={agent.status === "active" ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {agent.status === "active" ? "Actif" : agent.status}
                  </Badge>
                  <Button
                    
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs h-7"
                  >
                    <Link href={`/dashboard/agents/edit/${agent.id}`}>
                      <Pencil className="h-3 w-3" />
                      Modifier
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}