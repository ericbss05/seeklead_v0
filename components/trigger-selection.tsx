"use client";

import { useState } from "react";
import {
  Heart,
  MessageSquare,
  SquarePen,
  Briefcase,
  Search,
  Hash,
  UsersRound,
  Building2,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Données
// ---------------------------------------------------------------------------

interface Trigger {
  id: string;
  icon: LucideIcon;
  source: "LinkedIn" | "Recherche";
  title: string;
  description: string;
}

const TRIGGERS: Trigger[] = [
  {
    id: "liked-posts",
    icon: Heart,
    source: "LinkedIn",
    title: "Publications aimées",
    description:
      "Découvrez quelles publications vos prospects ou clients aiment pour comprendre leurs intérêts actuels.",
  },
  {
    id: "commented-posts",
    icon: MessageSquare,
    source: "LinkedIn",
    title: "Publications commentées",
    description:
      "Allez au-delà des likes et analysez les publications où vos prospects s'engagent activement et partagent leurs opinions.",
  },
  {
    id: "new-posts",
    icon: SquarePen,
    source: "LinkedIn",
    title: "Nouvelles publications",
    description:
      "Capturez chaque nouvelle prise de parole des profils ou pages qui comptent pour votre veille.",
  },
  {
    id: "job-changes",
    icon: Briefcase,
    source: "LinkedIn",
    title: "Changements de poste",
    description:
      "Suivez l'évolution de carrière de vos contacts. Un nouveau poste est souvent un signal d'achat majeur.",
  },
  {
    id: "keyword-posts",
    icon: Search,
    source: "Recherche",
    title: "Publications par mots-clés",
    description:
      "Détectez les intentions en surveillant l'apparition de termes spécifiques dans les publications.",
  },
  {
    id: "hashtag-posts",
    icon: Hash,
    source: "Recherche",
    title: "Publications par hashtags",
    description:
      "Identifiez les tendances et suivez les conversations sectorielles autour de vos thématiques clés.",
  },
  {
    id: "profile-mentions",
    icon: UsersRound,
    source: "LinkedIn",
    title: "Identifications de profils",
    description:
      "Soyez alerté instantanément lorsqu'un décideur que vous ciblez est mentionné par son réseau.",
  },
  {
    id: "page-mentions",
    icon: Building2,
    source: "LinkedIn",
    title: "Identifications de pages",
    description:
      "Surveillez l'e-réputation et les interactions sociales liées à vos entreprises cibles ou concurrents.",
  },
];

const STEPS = ["Déclencheur", "Cibles", "Configurer", "Réviser"] as const;

// ---------------------------------------------------------------------------
// Stepper
// ---------------------------------------------------------------------------

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i === current ? "bg-foreground" : "bg-muted-foreground/30"
              )}
            />
            <span
              className={cn(
                "text-xs",
                i === current ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && <span className="h-px w-6 bg-border" />}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Carte déclencheur
// ---------------------------------------------------------------------------

function TriggerCard({
  trigger,
  selected,
  onSelect,
}: {
  trigger: Trigger;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = trigger.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-start rounded-xl border bg-card p-5 text-left transition-colors hover:border-foreground/20 hover:shadow-sm",
        selected ? "border-foreground/40 ring-1 ring-foreground/10" : "border-border"
      )}
    >
      <div className="mb-4 flex w-full items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-foreground/70" strokeWidth={1.75} />
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "rounded-md text-[10px] font-medium tracking-wide",
            trigger.source === "LinkedIn"
              ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
              : "bg-muted text-muted-foreground"
          )}
        >
          {trigger.source === "LinkedIn" ? "LINKEDIN" : "RECHERCHE"}
        </Badge>
      </div>

      <h3 className="text-sm font-semibold text-foreground">{trigger.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
        {trigger.description}
      </p>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page principale
// ---------------------------------------------------------------------------

export default function TriggerSelectionPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* TOP BAR */}
      <div className="mb-10 flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm">
          <span className="text-muted-foreground">Signaux</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">Création</span>
        </nav>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Aide"
        >
          <CircleHelp className="h-4 w-4" />
        </button>
      </div>

      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold tracking-tight">Sélectionnez un déclencheur</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choisissez l&apos;événement social qui initiera votre recherche. Ces signaux
            automatisés parcourent l&apos;activité pour identifier des opportunités qualifiées.
          </p>
        </div>
        <Stepper current={0} />
      </div>

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRIGGERS.map((trigger) => (
          <TriggerCard
            key={trigger.id}
            trigger={trigger}
            selected={selected === trigger.id}
            onSelect={() => setSelected(trigger.id)}
          />
        ))}
      </div>
    </div>
  );
}