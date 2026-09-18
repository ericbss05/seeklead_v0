"use client";

import { Input } from "@/components/ui/input";

import type { ICPFormData } from "./types";

type Step1Props = {
  data: ICPFormData;
  onChange: (changes: Partial<ICPFormData>) => void;
};

export default function Step1({
  data,
  onChange,
}: Step1Props) {
  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor="target-name"
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Nom de ta cible
        </label>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Donne un nom pour retrouver facilement cette cible.
        </p>
      </div>

      <Input
        id="target-name"
        type="text"
        placeholder="Ex. Agences d'automatisation"
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