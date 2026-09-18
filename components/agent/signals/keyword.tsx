"use client";

import { InputWithTags } from "@/components/ui/tag-input";

import type {
  AgentFormData,
  AgentSignalType,
} from "../form/types";

type KeywordSignalProps = {
  data: AgentFormData;
  signalType: AgentSignalType;
  onChange: (changes: Partial<AgentFormData>) => void;
};

export default function KeywordSignal({
  data,
  signalType,
  onChange,
}: KeywordSignalProps) {
  const signal = data.signals.find(
    (item) => item.type === signalType,
  );

  if (!signal) {
    return null;
  }

  const updateKeywords = (keywords: string[]) => {
    onChange({
      signals: data.signals.map((item) =>
        item.type === signalType
          ? {
              ...item,
              keywords: keywords.map((raw) => ({
                raw,
              })),
            }
          : item,
      ),
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor={`keywords-${signalType}`}
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Mots-clés
        </label>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ajoute les mots-clés que ton agent doit
          surveiller.
        </p>
      </div>

      <InputWithTags
        placeholder="Ex. n8n"
        value={signal.keywords.map(
          (keyword) => keyword.raw,
        )}
        onChange={updateKeywords}
      />
    </div>
  );
}