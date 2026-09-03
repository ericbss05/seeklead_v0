"use client";

import { useState, useEffect, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveAgent, updateAgent, getAgent } from "@/actions/agents";

import { STEPS } from "./constants";

import { StepIndicator } from "./step-indicator";
import { NameStep } from "./name-step";
import { TypeStep } from "./type-step";
import { KeywordsStep } from "./keywords-step";

interface AgentFormProps {
  agentId?: string;
}

export function AgentForm({ agentId: propsAgentId }: AgentFormProps) {
  const params = useParams();
  const router = useRouter();

  // Extraction sécurisée de l'ID (gestion du type string | string[])
  const rawAgentId = propsAgentId ?? params?.agentId;
  const agentId = Array.isArray(rawAgentId) ? rawAgentId[0] : rawAgentId;
  const isEditing = Boolean(agentId);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(isEditing);

  // États du formulaire
  const [agentName, setAgentName] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [interactionTypes, setInteractionTypes] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const [responseLog, ] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Récupération de isPending pour bloquer l'UI pendant la soumission
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!agentId) return;

    // Capture la valeur narrowée dans un nouveau const : TypeScript ne peut
    // pas garantir que `agentId` reste `string` à l'intérieur de la closure
    // async ci-dessous, donc on fixe la valeur ici (résout l'erreur TS2345).
    const id = agentId;

    let isMounted = true;

    async function fetchAgentData() {
      try {
        setIsLoadingData(true);
        setError(null);

        const agent = await getAgent(id);

        if (!isMounted) return;

        if (agent) {
          setAgentName(agent.name ?? "");
          setSelectedOption(agent.signalType ?? null);
          setInteractionTypes(agent.interactionTypes ?? []);
          setKeywords(agent.keywords ?? []);
        } else {
          setError("L'agent demandé n'existe pas.");
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Erreur lors de la récupération de l'agent :", err);
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger les données de l'agent."
        );
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    }

    fetchAgentData();

    return () => {
      isMounted = false;
    };
  }, [agentId]);

  const canProceed = () => {
    if (isPending) return false; // Bloque la navigation si une action est en cours

    switch (currentStep) {
      case 0:
        return agentName.trim().length > 0;
      case 1:
        return selectedOption === "niche-interest"
          ? interactionTypes.length > 0
          : Boolean(selectedOption);
      case 2:
        return keywords.length > 0;
      default:
        return false;
    }
  };

  function handleSelectOption(id: string) {
    setSelectedOption(id);
    if (id !== "niche-interest") {
      setInteractionTypes([]);
    }
  }

  function toggleInteractionType(id: string) {
    if (id === "all") {
      setInteractionTypes(["all"]);
      return;
    }

    const filtered = interactionTypes.filter((type) => type !== "all");

    if (filtered.includes(id)) {
      setInteractionTypes(filtered.filter((type) => type !== id));
    } else {
      setInteractionTypes([...filtered, id]);
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError("Veuillez sélectionner un type d'agent.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const selectedInteractionTypes = interactionTypes.includes("all")
          ? ["all"]
          : interactionTypes;

        const payload = {
          name: agentName.trim(),
          signalType: selectedOption,
          interactionTypes: selectedInteractionTypes,
          keywords,
        };

        if (isEditing && agentId) {
          await updateAgent(agentId, payload);
        } else {
          await saveAgent(payload);
        }

        // Redirection après succès
        router.push("/dashboard/agents");
        router.refresh(); // Force la mise à jour des données côté serveur
      } catch (err) {
        console.error("Failed to save agent:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement."
        );
      }
    });
  };

  if (isLoadingData) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Chargement des données de l&apos;agent...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-6 rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* TITLE + STEPS */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {isEditing ? "Modifier votre agent" : "Créer un nouvel agent"}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {isEditing
              ? "Modifiez la configuration de votre agent."
              : "Configurez votre agent intelligent en quelques étapes simples."}
          </p>
        </div>

        <StepIndicator current={currentStep} />
      </div>

      {/* FORM */}
      <div className="flex justify-center">
        <Card className="w-full">
          <CardContent className="pt-6">
            {currentStep === 0 && (
              <NameStep agentName={agentName} onChange={setAgentName} />
            )}

            {currentStep === 1 && (
              <TypeStep
                selectedOption={selectedOption}
                interactionTypes={interactionTypes}
                onSelectOption={handleSelectOption}
                onToggleInteractionType={toggleInteractionType}
              />
            )}

            {currentStep === 2 && (
              <KeywordsStep
                keywords={keywords}
                onChange={setKeywords}
                error={error}
                responseLog={responseLog}
              />
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t pt-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0 || isPending}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-1.5"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed() || isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Enregistrer" : "Créer l'agent"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}