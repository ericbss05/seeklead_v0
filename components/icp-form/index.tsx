"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { TagField } from "./tag-field";
import { MultiSelectField } from "./multi-select-field";
import { MatchingModeSection } from "./matching-mode";
import { AdvancedFilters } from "./advanced-filters";
import { getIcpProfile, saveIcpProfile } from "@/actions/get-icp";
import {
  LOCATION_OPTIONS,
  INDUSTRY_OPTIONS,
  COMPANY_TYPE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  type MatchingMode,
} from "./constants";
import { useIcp } from "./icp-context";

export default function ICPForm() {
  const router = useRouter();
  const { setIcp } = useIcp();

  const [jobTitles, setJobTitles] = useState<string[]>([
    "CEO",
    "Founder",
    "Co-founder",
  ]);
  const [locations, setLocations] = useState<string[]>(["France"]);
  const [industries, setIndustries] = useState<string[]>([
    "Software",
    "SaaS",
    "Marketing",
    "Consulting",
  ]);
  const [companyTypes, setCompanyTypes] = useState<string[]>([
    "Private Company",
    "Startup",
  ]);
  const [companySizes, setCompanySizes] = useState<string[]>([
    "1–10 employés",
    "11–50 employés",
  ]);
  const [exclude, setExclude] = useState<string[]>([
    "Google",
    "Architecte",
  ]);

  const [mode, setMode] = useState<MatchingMode>("precision");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [funding, setFunding] = useState("Toutes les étapes");
  const [headcountMin, setHeadcountMin] = useState("");
  const [headcountMax, setHeadcountMax] = useState("");

  const [footerHint, setFooterHint] = useState(
    "Modifications enregistrées automatiquement"
  );
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadIcp() {
      try {
        const profile = await getIcpProfile();

        if (profile) {
          setJobTitles(profile.jobTitles);
          setLocations(profile.locations);
          setIndustries(profile.industries);
          setCompanyTypes(profile.companyTypes);
          setCompanySizes(profile.companySizes);
          setExclude(profile.exclude);

          setMode(profile.mode as MatchingMode);
          setFunding(profile.funding);
          setHeadcountMin(
            profile.headcountMin !== null
              ? String(profile.headcountMin)
              : ""
          );
          setHeadcountMax(
            profile.headcountMax !== null
              ? String(profile.headcountMax)
              : ""
          );

          setFooterHint("ICP existant chargé — vous pouvez le modifier");
        }
      } catch (err) {
        console.error("Failed to load ICP profile:", err);
        setError("Impossible de charger votre ICP");
      } finally {
        setIsLoading(false);
      }
    }

    loadIcp();
  }, []);

  useEffect(() => {
    setIcp({
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
  }, [
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
    setIcp,
  ]);

  function handleSubmit() {
    setError(null);

    startTransition(async () => {
      try {
        await saveIcpProfile({
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

        setFooterHint("ICP enregistré en base");

        router.push("/dashboard");
      } catch (err) {
        console.error("Failed to save ICP profile:", err);
        setError(
          err instanceof Error ? err.message : "Erreur inconnue"
        );
        setFooterHint("Échec de l'enregistrement");
      }
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6 pt-6">
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

          <MatchingModeSection
            mode={mode}
            onChange={setMode}
          />

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

          {error && (
            <p className="text-xs text-destructive">
              {error}
            </p>
)}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 py-4">
          <span className="text-xs text-muted-foreground">
            {footerHint}
          </span>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {isPending
              ? "Enregistrement..."
              : "Configurer les signaux"}

            {!isPending && (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
    </div>
  );
}