"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { saveAgent } from "@/app/actions/agent/save";
import { updateAgent } from "@/app/actions/agent/update";

import { saveSignal } from "@/app/actions/signal/save";
import { updateSignal } from "@/app/actions/signal/update";

import { saveKeyword } from "@/app/actions/signal/keyword/save";
import { updateKeyword } from "@/app/actions/signal/keyword/update";

import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

import type {
  AgentFormData,
  AgentFormProps,
} from "./types";

const STEP_COUNT = 3;

const steps = [
  {
    title: "Crée ton agent",
    subtitle:
      "Choisis un nom pour retrouver facilement cet agent.",
  },
  {
    title: "Choisis tes signaux",
    subtitle:
      "Sélectionne les types de signaux que ton agent doit détecter.",
  },
  {
    title: "Ajoute tes mots-clés",
    subtitle:
      "Configure les mots-clés de chaque signal.",
  },
];

function normalizeFormData(
  data?: Partial<AgentFormData>,
): AgentFormData {
  return {
    name: data?.name ?? "",
    signals: data?.signals ?? [],
  };
}

const signalNames = {
  keywords: "Mots-clés",
  "profile-interactions":
    "Interactions avec un profil",
  "profile-activity":
    "Activité autour d'un profil",
  "buying-signals": "Signaux d'achat",
};

export default function AgentForm({
  initialData,
  onSubmitSuccess,
  agentId,
}: AgentFormProps = {}) {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [data, setData] = useState<AgentFormData>(() =>
    normalizeFormData(initialData),
  );

  const updateData = (
    changes: Partial<AgentFormData>,
  ) => {
    setData((current) => ({
      ...current,
      ...changes,
    }));
  };

  const nextStep = () => {
    if (step === 0 && !data.name.trim()) {
      return;
    }

    if (step === 1 && data.signals.length === 0) {
      return;
    }

    setStep((current) =>
      Math.min(current + 1, STEP_COUNT - 1),
    );
  };

  const previousStep = () => {
    setStep((current) =>
      Math.max(current - 1, 0),
    );
  };

  const handleSubmit = async () => {
    if (!data.name.trim()) {
      setStep(0);
      return;
    }

    if (data.signals.length === 0) {
      setStep(1);
      return;
    }

    const hasEmptyKeywords = data.signals.some(
      (signal) => signal.keywords.length === 0,
    );

    if (hasEmptyKeywords) {
      setStep(2);
      return;
    }

    try {
      setIsSubmitting(true);

      const agentData = {
        name: data.name.trim(),
      };

      let savedAgentId: string;

      if (agentId) {
        const result = await updateAgent(
          agentId,
          agentData,
        );

        savedAgentId = result.agent.id;
      } else {
        const result = await saveAgent(agentData);

        savedAgentId = result.agent.id;
      }

      for (const signal of data.signals) {
        let savedSignalId: string;

        if (signal.id) {
          const result = await updateSignal(
            signal.id,
            {
              name: signalNames[signal.type],
            },
          );

          savedSignalId = result.signal.id;
        } else {
          const result = await saveSignal({
            agentId: savedAgentId,
            name: signalNames[signal.type],
          });

          savedSignalId = result.signal.id;
        }

        for (const keyword of signal.keywords) {
          if (keyword.id) {
            await updateKeyword(keyword.id, {
              raw: keyword.raw,
            });
          } else {
            await saveKeyword({
              signalId: savedSignalId,
              raw: keyword.raw,
            });
          }
        }
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        router.push("/dashboard/agents");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const current = steps[step];

  const isStep1Valid =
    data.name.trim().length > 0;

  const isStep2Valid =
    data.signals.length > 0;

  const isStep3Valid =
    data.signals.length > 0 &&
    data.signals.every(
      (signal) => signal.keywords.length > 0,
    );

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {current.title}
      </h1>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {current.subtitle}
      </p>

      <div className="mt-6 flex gap-2">
        {Array.from({
          length: STEP_COUNT,
        }).map((_, index) => (
          <div
            key={index}
            className={`h-0.5 w-12 rounded-full transition-colors ${
              index <= step
                ? "bg-gray-900 dark:bg-gray-100"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <div className="mt-8">
        {step === 0 && (
          <Step1
            data={data}
            onChange={updateData}
          />
        )}

        {step === 1 && (
          <Step2
            data={data}
            onChange={updateData}
          />
        )}

        {step === 2 && (
          <Step3
            data={data}
            onChange={updateData}
          />
        )}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            disabled={isSubmitting}
          >
            Précédent
          </Button>
        )}

        {step < STEP_COUNT - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={
              isSubmitting ||
              (step === 0 && !isStep1Valid) ||
              (step === 1 && !isStep2Valid)
            }
          >
            Suivant
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              isSubmitting || !isStep3Valid
            }
          >
            {isSubmitting
              ? "Enregistrement..."
              : agentId
                ? "Enregistrer les modifications"
                : "Créer mon agent"}
          </Button>
        )}
      </div>
    </div>
  );
}