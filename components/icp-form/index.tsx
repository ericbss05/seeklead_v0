"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { TagField } from "./tag-field";
import { MultiSelectField } from "./multi-select-field";
import { MatchingModeSection } from "./matching-mode";
import { AdvancedFilters } from "./advanced-filters";
import { saveIcpProfile } from "@/actions/get-icp";
import {
  LOCATION_OPTIONS,
  INDUSTRY_OPTIONS,
  COMPANY_TYPE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  type MatchingMode,
} from "./constants";

export default function ICPForm() {
  const [jobTitles, setJobTitles] = useState<string[]>(["CEO", "Founder", "Co-founder"]);
  const [locations, setLocations] = useState<string[]>(["France"]);
  const [industries, setIndustries] = useState<string[]>(["Software", "SaaS", "Marketing", "Consulting"]);
  const [companyTypes, setCompanyTypes] = useState<string[]>(["Private Company", "Startup"]);
  const [companySizes, setCompanySizes] = useState<string[]>(["1–10 employés", "11–50 employés"]);
  const [exclude, setExclude] = useState<string[]>(["Google", "Architecte"]);

  const [mode, setMode] = useState<MatchingMode>("precision");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [funding, setFunding] = useState("Toutes les étapes");
  const [headcountMin, setHeadcountMin] = useState("");
  const [headcountMax, setHeadcountMax] = useState("");

  const [footerHint, setFooterHint] = useState("Modifications enregistrées automatiquement");
  const [, setLastSaved] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      try {
        const saved = await saveIcpProfile({
          jobTitles,
          locations,
          industries,
          companyTypes,
          companySizes,
          exclude,
          mode,
          funding,
          headcountMin,
          headcountMax,
        });
        // Réponse réelle renvoyée par la base après écriture.
        console.log("ICP profile saved:", saved);
        setLastSaved(saved);
        setFooterHint("ICP enregistré en base — direction Signaux");
      } catch (err) {
        console.error("Failed to save ICP profile:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setFooterHint("Échec de l'enregistrement");
      }
    });
  }

  return (
    <div>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <TagField
              label="Intitulés de poste ciblés"
              values={jobTitles}
              onChange={setJobTitles}
              placeholder="Ajouter un intitulé..."
            />

            <MultiSelectField
              label="Localisations ciblées"
              options={LOCATION_OPTIONS}
              values={locations}
              onChange={setLocations}
            />

            <MultiSelectField
              label="Secteurs d'activité"
              options={INDUSTRY_OPTIONS}
              values={industries}
              onChange={setIndustries}
            />

            <MultiSelectField
              label="Types d'entreprises"
              options={COMPANY_TYPE_OPTIONS}
              values={companyTypes}
              onChange={setCompanyTypes}
            />

            <MultiSelectField
              label="Taille des entreprises"
              options={COMPANY_SIZE_OPTIONS}
              values={companySizes}
              onChange={setCompanySizes}
            />

            <TagField
              label="Entreprises & mots-clés à exclure"
              hint="Ces entreprises ou mots-clés ne seront jamais proposés comme prospects."
              values={exclude}
              onChange={setExclude}
              placeholder="Ajouter..."
            />
          </div>

          <Separator />

          <MatchingModeSection mode={mode} onChange={setMode} />

          <AdvancedFilters
            open={advancedOpen}
            onOpenChange={setAdvancedOpen}
            funding={funding}
            onFundingChange={setFunding}
            headcountMin={headcountMin}
            onHeadcountMinChange={setHeadcountMin}
            headcountMax={headcountMax}
            onHeadcountMaxChange={setHeadcountMax}
          />

          {error && <p className="text-xs text-destructive">{error}</p>}
        </CardContent>

        <CardFooter className="flex flex-col items-stretch justify-between gap-3 border-t bg-muted/30 py-4 sm:flex-row sm:items-center">
          <span className="text-xs text-muted-foreground">{footerHint}</span>
          <Button type="button" onClick={handleSubmit} disabled={isPending} className="gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Configurer les signaux
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}