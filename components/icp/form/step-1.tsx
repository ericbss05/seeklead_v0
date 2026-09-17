"use client";

import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { InputWithTags } from "@/components/ui/tag-input"; // Ajustez le chemin d'import selon l'emplacement de votre fichier
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ICPFormData } from "./types";

type Step1Props = {
  data: ICPFormData;
  onChange: (data: Partial<ICPFormData>) => void;
};

const INDUSTRIES_OPTIONS = [
  "SaaS & Software",
  "Marketing & Publicité",
  "Finance & Banque",
  "E-commerce",
  "Santé & Biotech",
  "Conseil & Services aux entreprises",
  "Éducation",
  "Immobilier",
];

export default function Step1({ data, onChange }: Step1Props) {
  const handleSelectIndustry = (value: string | null) => {
    if (value && !data.industries.includes(value)) {
      onChange({ industries: [...data.industries, value] });
    }
  };

  const removeIndustry = (industryToRemove: string) => {
    onChange({
      industries: data.industries.filter((ind) => ind !== industryToRemove),
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. TAG INPUT (POSTES RECHERCHÉS) */}
      <div className="space-y-3">
        <Label htmlFor="jobTitles" className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          Postes recherchés
        </Label>

        <InputWithTags
          value={data.jobTitles}
          onChange={(jobTitles) => onChange({ jobTitles })}
          placeholder="Ex. Founder, CEO..."
        />

        <p className="text-xs text-muted-foreground">
          Appuyez sur <kbd className="rounded border bg-gray-100 px-1 dark:bg-gray-800">Entrée</kbd> ou ajoutez une virgule pour valider un poste.
        </p>
      </div>

      {/* 2. SELECT (SECTEURS D'ACTIVITÉ) */}
      <div className="space-y-3">
        <Label htmlFor="industries" className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          Secteurs d&apos;activité
        </Label>

        <Select onValueChange={handleSelectIndustry}>
          <SelectTrigger className="h-12 w-full rounded-2xl border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <SelectValue placeholder="Sélectionnez un secteur d'activité" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {INDUSTRIES_OPTIONS.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {data.industries.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {data.industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              >
                {industry}
                <button
                  type="button"
                  onClick={() => removeIndustry(industry)}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}