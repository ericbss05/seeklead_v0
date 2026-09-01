"use client";

import { useState, useEffect, useTransition } from "react";
import { useParams, useRouter as useNextRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  CircleHelp,
  Bot,
  Check,
  Eye,
  Target,
  Users,
  Briefcase,
  Lock,
  ChevronDown,
  Loader2,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { updateAgent } from "@/actions/agents";

const INTERACTION_TYPES = [
  { id: "posts", label: "Publications" },
  { id: "likes", label: "Likes" },
  { id: "comments", label: "Commentaires" },
  { id: "all", label: "Tout" },
] as const;

const OPTIONS: { id: string; icon: LucideIcon; title: string; description: string; available: boolean }[] = [
  {
    id: "profile-interactions",
    icon: Eye,
    title: "Détectez les personnes qui interagissent avec votre profil",
    description:
      "Identifiez les personnes ayant récemment consulté votre profil ou interagi avec vos contenus.",
    available: false,
  },
  {
    id: "niche-interest",
    icon: Target,
    title: "Identifiez les personnes intéressées par votre niche",
    description:
      "Repérez les personnes qui interagissent récemment avec des contenus LinkedIn pertinents contenant des mots-clés liés à votre niche, que ce soit par des likes, des commentaires ou des publications.",
    available: true,
  },
  {
    id: "active-around-profiles",
    icon: Users,
    title: "Repérez les personnes actives autour des profils pertinents",
    description:
      "Identifiez les personnes qui interagissent avec des profils importants de votre niche : concurrents, experts, créateurs de contenu ou leaders d'opinion.",
    available: false,
  },
  {
    id: "buying-signals",
    icon: Briefcase,
    title: "Détectez les événements révélateurs d'un besoin",
    description:
      "Repérez les changements de poste, nouvelles embauches, levées de fonds et autres événements professionnels pouvant signaler un besoin ou une intention d'achat.",
    available: false,
  },
];

const STEPS = [
  { id: 0, label: "Nom de l'agent" },
  { id: 1, label: "Type d'agent" },
  { id: 2, label: "Mots-clés" },
] as const;

function KeywordField({
  values,
  onChange,
}: {
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function commit() {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  }

  return (
    <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-input bg-background p-1.5 focus-within:ring-1 focus-within:ring-ring">
      {values.map((v) => (
        <Badge key={v} variant="secondary" className="gap-1 rounded-md font-normal">
          {v}
          <button
            type="button"
            onClick={() => onChange(values.filter((x) => x !== v))}
            className="text-muted-foreground hover:text-foreground"
            aria-label={`Retirer ${v}`}
          >
            ×
          </button>
        </Badge>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          } else if (e.key === "Backspace" && !draft && values.length) {
            onChange(values.slice(0, -1));
          }
        }}
        placeholder={values.length ? "Ajouter..." : "SaaS, B2B, Intelligence Artificielle..."}
        className="h-7 flex-1 min-w-[90px] bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              i === current ? "bg-foreground" : "bg-muted"
            )}
          />
          <span
            className={cn(
              "text-xs transition-colors",
              i === current ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && (
            <span className="mx-1 h-px w-4 bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}

function OptionCard({
  option,
  index,
  selected,
  onSelect,
}: {
  option: (typeof OPTIONS)[number];
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon;
  const isAvailable = option.available;

  return (
    <button
      type="button"
      onClick={isAvailable ? onSelect : undefined}
      disabled={!isAvailable}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
        !isAvailable && "cursor-not-allowed opacity-60",
        isAvailable && "hover:bg-muted/50",
        selected ? "border-foreground/20 bg-muted/30" : "border-border"
      )}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-background text-xs font-medium text-muted-foreground">
        {index + 1}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">{option.title}</h3>
          {!isAvailable ? (
            <Badge variant="outline" className="gap-1 text-[10px] font-normal">
              <Lock className="h-3 w-3" />
              Arrive bientôt
            </Badge>
          ) : (
            selected && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </div>
            )
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {option.description}
        </p>
      </div>
    </button>
  );
}

export default function EditAgentPage() {
  const params = useParams<{ agentId: string }>();
  const router = useNextRouter();
  const agentId = params.agentId;

  const [currentStep, setCurrentStep] = useState(0);
  const [agentName, setAgentName] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [interactionTypes, setInteractionTypes] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [responseLog, setResponseLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`/api/agents/${agentId}`);
        if (!res.ok) throw new Error("Agent non trouvé");
        const data = await res.json();
        setAgentName(data.name);
        setSelectedOption(data.signalType);
        setInteractionTypes(data.interactionTypes || []);
        setKeywords(data.keywords || []);
      } catch (err) {
        console.error("Failed to fetch agent:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchAgent();
  }, [agentId]);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return agentName.trim().length > 0;
      case 1:
        return selectedOption === "niche-interest" ? interactionTypes.length > 0 : selectedOption !== null;
      case 2:
        return keywords.length > 0;
      default:
        return false;
    }
  };

  function toggleInteractionType(id: string) {
    if (id === "all") {
      setInteractionTypes(["all"]);
    } else {
      const filtered = interactionTypes.filter((t) => t !== "all");
      if (filtered.includes(id)) {
        setInteractionTypes(filtered.filter((t) => t !== id));
      } else {
        setInteractionTypes([...filtered, id]);
      }
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      try {
        const logs: string[] = [];
        logs.push(`[${new Date().toLocaleTimeString()}] Mise à jour de l'agent "${agentName}"...`);
        logs.push(`[${new Date().toLocaleTimeString()}] Type d'agent: ${OPTIONS.find((o) => o.id === selectedOption)?.title}`);

        const selectedInteractionTypes = interactionTypes.includes("all")
          ? ["all"]
          : interactionTypes;

        if (selectedOption === "niche-interest" && selectedInteractionTypes.length > 0) {
          const labels = interactionTypes.includes("all")
            ? ["Tout"]
            : INTERACTION_TYPES.filter((t) => interactionTypes.includes(t.id)).map((t) => t.label);
          logs.push(`[${new Date().toLocaleTimeString()}] Interactions: ${labels.join(", ")}`);
        }

        logs.push(`[${new Date().toLocaleTimeString()}] Configuration des mots-clés: ${keywords.join(", ")}`);

        await updateAgent(agentId, {
          name: agentName,
          signalType: selectedOption!,
          interactionTypes: selectedInteractionTypes,
          keywords: keywords,
        });

        logs.push(`[${new Date().toLocaleTimeString()}] Agent mis à jour avec succès !`);
        setResponseLog(logs);

        setTimeout(() => {
          router.push("/dashboard/agents");
        }, 1500);
      } catch (err) {
        console.error("Failed to update agent:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link href="/dashboard/agents" className="text-muted-foreground hover:text-foreground">
            Agents
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Modifier</span>
        </nav>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <CircleHelp className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Modifier l&apos;agent
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Mettez à jour la configuration de votre agent.
          </p>
        </div>
        <StepIndicator current={currentStep} />
      </div>

      <Card>
        <CardContent className="pt-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-sm font-medium">Nom de l&apos;agent</h2>
                <p className="text-xs text-muted-foreground">
                  Modifiez le nom de votre agent.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-name" className="text-xs">
                  Nom de l&apos;agent
                </Label>
                <Input
                  id="agent-name"
                  placeholder="Ex: Agent Prospection SaaS France"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-sm font-medium">Type d&apos;agent</h2>
                <p className="text-xs text-muted-foreground">
                  Sélectionnez le type d&apos;agent qui correspond à votre besoin.
                </p>
              </div>
              <div className="grid gap-2">
                {OPTIONS.map((option, index) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    index={index}
                    selected={selectedOption === option.id}
                    onSelect={() => {
                      setSelectedOption(option.id);
                      if (option.id !== "niche-interest") {
                        setInteractionTypes([]);
                      }
                    }}
                  />
                ))}
              </div>

              {selectedOption === "niche-interest" && (
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Type d&apos;interaction</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {INTERACTION_TYPES.map((type) => (
                      <label
                        key={type.id}
                        className="flex items-center gap-2 rounded-md border bg-background p-2.5 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          checked={interactionTypes.includes(type.id)}
                          onCheckedChange={() => toggleInteractionType(type.id)}
                        />
                        <span className="text-xs">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-sm font-medium">Mots-clés</h2>
                <p className="text-xs text-muted-foreground">
                  Mettez à jour les mots-clés que votre agent utilisera pour ses recherches.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Mots-clés ciblés</Label>
                <p className="text-[11px] text-muted-foreground">
                  Appuyez sur Entrée ou virgule pour valider chaque mot-clé.
                </p>
                <KeywordField values={keywords} onChange={setKeywords} />
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              {responseLog.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs">Log de réponse</Label>
                  <div className="rounded-md border bg-muted/50 p-3 font-mono text-xs text-muted-foreground">
                    {responseLog.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext} disabled={!canProceed()} className="gap-1.5">
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
            >
              Mettre à jour
            </Button>
          )}
        </CardFooter>
      </Card>

      {agentName && (
        <div className="mt-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">Aperçu</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {agentName}
            </Badge>
            {selectedOption && (
              <Badge variant="secondary" className="text-xs">
                {OPTIONS.find((o) => o.id === selectedOption)?.title}
              </Badge>
            )}
            {interactionTypes.includes("all") && (
              <Badge variant="outline" className="text-xs">
                Tout
              </Badge>
            )}
            {interactionTypes.filter((t) => t !== "all").map((t) => (
              <Badge key={t} variant="outline" className="text-xs">
                {INTERACTION_TYPES.find((it) => it.id === t)?.label}
              </Badge>
            ))}
            {keywords.map((kw) => (
              <Badge key={kw} variant="outline" className="text-xs">
                {kw}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}