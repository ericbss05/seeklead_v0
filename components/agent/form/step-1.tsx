"use client";

import { Input } from "@/components/ui/input";

import type { AgentFormData } from "./types";

type Step1Props = {
  data: AgentFormData;
  onChange: (changes: Partial<AgentFormData>) => void;
};

export default function Step1({
  data,
  onChange,
}: Step1Props) {
  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor="agent-name"
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Nom de ton agent
        </label>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Donne un nom pour retrouver facilement cet agent.
        </p>
      </div>

      <Input
        id="agent-name"
        type="text"
        placeholder="Ex. Détection prospects n8n"
        value={data.name}
        onChange={(event) =>
          onChange({
            name: event.target.value,
          })
        }
        autoFocus
      />
    </div>
  );
}