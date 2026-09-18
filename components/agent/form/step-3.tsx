"use client";

import { InputWithTags } from "@/components/ui/tag-input";

import type {
  AgentFormData,
  AgentSignalType,
} from "./types";

type Step3Props = {
  data: AgentFormData;
  onChange: (changes: Partial<AgentFormData>) => void;
};

const signalNames: Record<
  AgentSignalType,
  string
> = {
  keywords: "Mots-clés",
  "profile-interactions":
    "Interactions avec un profil",
  "profile-activity":
    "Activité autour d'un profil",
  "buying-signals": "Signaux d'achat",
};

export default function Step3({
  data,
  onChange,
}: Step3Props) {
  const updateSignalKeywords = (
    signalType: AgentSignalType,
    keywords: string[],
  ) => {
    onChange({
      signals: data.signals.map((signal) =>
        signal.type === signalType
          ? {
              ...signal,
              keywords: keywords.map((raw) => ({
                raw,
              })),
            }
          : signal,
      ),
    });
  };

  return (
    <div className="space-y-8">
      {data.signals.map((signal) => (
        <div
          key={signal.type}
          className="space-y-4"
        >
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {signalNames[signal.type]}
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ajoute les éléments que ton agent doit
              surveiller.
            </p>
          </div>

          <InputWithTags
            placeholder="Ex. n8n"
            value={signal.keywords.map(
              (keyword) => keyword.raw,
            )}
            onChange={(keywords) =>
              updateSignalKeywords(
                signal.type,
                keywords,
              )
            }
          />
        </div>
      ))}
    </div>
  );
}