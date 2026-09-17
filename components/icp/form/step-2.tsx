"use client";

import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { InputWithTags } from "@/components/ui/tag-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ICPFormData } from "./types";

type Step2Props = {
  data: ICPFormData;
  onChange: (data: Partial<ICPFormData>) => void;
};

const COMPANY_TYPES_OPTIONS = [
  "Startup",
  "PME",
  "ETI",
  "Grand Groupe",
  "Agence",
  "Indépendant / TPE",
];

const COMPANY_SIZES_OPTIONS = [
  "1-10 employés",
  "11-50 employés",
  "51-200 employés",
  "201-500 employés",
  "501-1000 employés",
  "1000+ employés",
];

export default function Step2({ data, onChange }: Step2Props) {
  // Gestion de la sélection multiple pour les types d'entreprise
  const handleSelectCompanyType = (value: string | null) => {
    if (value && !data.companyTypes.includes(value)) {
      onChange({ companyTypes: [...data.companyTypes, value] });
    }
  };

  const removeCompanyType = (typeToRemove: string) => {
    onChange({
      companyTypes: data.companyTypes.filter((type) => type !== typeToRemove),
    });
  };

  // Gestion de la sélection multiple pour les tailles d'entreprise
  const handleSelectCompanySize = (value: string | null) => {
    if (value && !data.companySizes.includes(value)) {
      onChange({ companySizes: [...data.companySizes, value] });
    }
  };

  const removeCompanySize = (sizeToRemove: string) => {
    onChange({
      companySizes: data.companySizes.filter((size) => size !== sizeToRemove),
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. LOCALISATIONS (TAG INPUT) */}
      <div className="space-y-3">
        <Label htmlFor="locations" className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          Localisations
        </Label>

        <InputWithTags
          value={data.locations}
          onChange={(locations: string[]) => onChange({ locations })}
          placeholder="Ex. Paris, Lyon, France..."
        />

        <p className="text-xs text-muted-foreground">
          Appuyez sur <kbd className="rounded border bg-gray-100 px-1 dark:bg-gray-800">Entrée</kbd> ou ajoutez une virgule pour valider une ville ou un pays.
        </p>
      </div>

      {/* 2. TYPES D'ENTREPRISE (SELECT MULTIPLE) */}
      <div className="space-y-3">
        <Label htmlFor="companyTypes" className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          Types d&apos;entreprise
        </Label>

        <Select onValueChange={handleSelectCompanyType}>
          <SelectTrigger className="h-12 w-full rounded-2xl border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <SelectValue placeholder="Sélectionnez un ou plusieurs types" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {COMPANY_TYPES_OPTIONS.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {data.companyTypes.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {data.companyTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              >
                {type}
                <button
                  type="button"
                  onClick={() => removeCompanyType(type)}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. TAILLE DES ENTREPRISES (SELECT MULTIPLE) */}
      <div className="space-y-3">
        <Label htmlFor="companySizes" className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          Taille des entreprises
        </Label>

        <Select onValueChange={handleSelectCompanySize}>
          <SelectTrigger className="h-12 w-full rounded-2xl border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <SelectValue placeholder="Sélectionnez une ou plusieurs tailles" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {COMPANY_SIZES_OPTIONS.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {data.companySizes.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {data.companySizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeCompanySize(size)}
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