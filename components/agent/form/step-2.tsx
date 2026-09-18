"use client";

import { Check } from "lucide-react";

import type {
  AgentFormData,
  AgentSignalType,
} from "./types";

type Step2Props = {
  data: AgentFormData;
  onChange: (changes: Partial<AgentFormData>) => void;
};

const signalTypes: {
  value: AgentSignalType;
  label: string;
  description: string;
  available: boolean;
}[] = [
  {
    value: "keywords",
    label: "Mots-clés",
    description:
      "Détecte les personnes qui parlent de sujets correspondant à tes mots-clés.",
    available: true,
  },
  {
    value: "profile-interactions",
    label: "Interactions avec un profil",
    description:
      "Détecte les personnes qui interagissent avec certains profils.",
    available: false,
  },
  {
    value: "profile-activity",
    label: "Activité autour d'un profil",
    description:
      "Détecte les personnes actives autour de profils ciblés.",
    available: false,
  },
  {
    value: "buying-signals",
    label: "Signaux d'achat",
    description:
      "Détecte les signaux indiquant un besoin ou une intention d'achat.",
    available: false,
  },
];

export default function Step2({
  data,
  onChange,
}: Step2Props) {
  const toggleSignal = (
    signalType: AgentSignalType,
  ) => {
    const exists = data.signals.some(
      (signal) => signal.type === signalType,
    );

    if (exists) {
      onChange({
        signals: data.signals.filter(
          (signal) => signal.type !== signalType,
        ),
      });

      return;
    }

    onChange({
      signals: [
        ...data.signals,
        {
          type: signalType,
          keywords: [],
        },
      ],
    });
  };

  return (
    <div className="space-y-3">
      {signalTypes.map((signal) => {
        const isSelected = data.signals.some(
          (item) => item.type === signal.value,
        );

        return (
          <button
            key={signal.value}
            type="button"
            disabled={!signal.available}
            onClick={() =>
              toggleSignal(signal.value)
            }
            className={`relative flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
              isSelected
                ? "border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-900"
                : "border-gray-200 dark:border-gray-800"
            } ${
              signal.available
                ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                isSelected
                  ? "border-gray-900 bg-gray-900 dark:border-gray-100 dark:bg-gray-100"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              {isSelected && (
                <Check className="h-3 w-3 text-white dark:text-gray-900" />
              )}
            </div>

            <div className="pr-2">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {signal.label}
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {signal.description}
              </p>

              {!signal.available && (
                <p className="mt-2 text-xs font-medium text-gray-400">
                  Bientôt disponible
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}