"use client";

import { Label } from "@/components/ui/label";
import { InputWithTags } from "@/components/ui/tag-input";

import type { ICPFormData } from "./types";

type Step4Props = {
  data: ICPFormData;
  onChange: (data: Partial<ICPFormData>) => void;
};

export default function Step4({ data, onChange }: Step4Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Label htmlFor="exclude">Exclusions</Label>

        <InputWithTags
          value={data.exclude}
          onChange={(tags) => onChange({ exclude: tags })}
          placeholder="Ex. recrutement, freelance, agence"
        />

        <p className="text-xs text-muted-foreground">
          Appuyez sur Entrée pour ajouter une exclusion.
        </p>
      </div>
    </div>
  );
}