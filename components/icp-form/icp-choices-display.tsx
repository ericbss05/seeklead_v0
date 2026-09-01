"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCheck,
  Building2,
  MapPin,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";
import { useIcp } from "./icp-context";

function getInitials(names: string[]): string {
  if (names.length === 0) return "?";
  const first = names[0].split(" ").pop() || names[0];
  const second = names.length > 1 ? names[1].split(" ").pop() || names[1] : "";
  return (first[0] + (second[0] || "")).toUpperCase();
}

function getCompanyFromType(types: string[]): string {
  if (types.includes("Startup")) return "TechStartup";
  if (types.includes("Agency")) return "Agency Co";
  if (types.includes("Non-profit")) return "Non-Profit Org";
  return "Entreprise cible";
}

export function IcpChoicesDisplay() {
  const { icp } = useIcp();

  const jobTitle = icp.jobTitles[0] || "Décideur";
  const location = icp.locations[0] || "France";
  const company = getCompanyFromType(icp.companyTypes);
  const size = icp.companySizes[0] || "";
  const industry = icp.industries[0] || "";

  return (
    <div className="py-6">
      <div className="w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        {/* Bannière */}
        <div className="relative h-28 bg-[linear-gradient(135deg,#0a66c2_0%,#0a66c2_40%,#4a90d9_100%)]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="px-5">
          {/* Avatar chevauchant la bannière */}
          <div className="-mt-12 flex items-end justify-between">
            <Avatar className="h-24 w-24 border-4 border-background bg-muted shadow-sm">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-100 text-xl font-semibold text-blue-700">
                {getInitials(icp.jobTitles)}
              </AvatarFallback>
            </Avatar>

            <div className="mb-2 flex gap-2">
              <button className="rounded-full border border-[#0a66c2] px-4 py-1.5 text-sm font-semibold text-[#0a66c2] hover:bg-blue-50">
                Se connecter
              </button>
              <button className="rounded-full border border-border px-3 py-1.5 text-muted-foreground hover:bg-muted">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Identité */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-semibold leading-tight text-foreground">
                {jobTitle}
              </h1>
              <BadgeCheck className="h-4 w-4 fill-[#0a66c2] text-background" />
            </div>

            <p className="mt-0.5 text-[15px] leading-snug text-foreground/90">
              {industry ? `${jobTitle} · ${industry}` : jobTitle}
              {size ? ` (${size})` : ""}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-1 text-sm text-muted-foreground">
              <MapPin className="mr-0.5 h-3.5 w-3.5" />
              <span>{location}</span>
              <span className="mx-1">·</span>
              <button className="font-semibold text-[#0a66c2] hover:underline">
                Coordonnées
              </button>
            </div>

            <p className="mt-2 text-sm font-semibold text-[#0a66c2] hover:underline cursor-pointer w-fit">
              {icp.locations.length + icp.industries.length + 120}+ profils correspondants
            </p>
          </div>

          {/* Badges secteur / type d'entreprise */}
          {(icp.industries.length > 0 || icp.companyTypes.length > 0) && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {icp.industries.map((ind) => (
                <Badge
                  key={ind}
                  variant="secondary"
                  className="rounded-md bg-[#eef3f8] text-[#0a66c2] hover:bg-[#e1ebf5]"
                >
                  {ind}
                </Badge>
              ))}
              {icp.companyTypes.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="rounded-md border-border text-foreground/80"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="my-4" />

          {/* Infos */}
          <div>
            <p className="mb-2 text-base font-semibold text-foreground">Infos</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Décideur dans le secteur{" "}
              <span className="font-medium text-foreground">
                {industry || "cible"}
              </span>
              , au sein d&apos;entreprises de type{" "}
              <span className="font-medium text-foreground">
                {icp.companyTypes.join(", ") || "variées"}
              </span>
              {size ? (
                <>
                  {" "}
                  et de taille{" "}
                  <span className="font-medium text-foreground">{size}</span>
                </>
              ) : (
                ""
              )}
              . Profil identifié comme prioritaire pour la prospection.
            </p>
          </div>

          <Separator className="my-4" />

          {/* Expérience façon LinkedIn */}
          <div>
            <p className="mb-3 text-base font-semibold text-foreground">
              Expérience
            </p>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-muted">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">{jobTitle}</p>
                <p className="text-foreground/80">
                  {company}
                  {icp.funding && icp.funding !== "Toutes les étapes"
                    ? ` · ${icp.funding}`
                    : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {size || "Taille non renseignée"}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Critères de ciblage, présentés comme une section "Formation" LinkedIn */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <p className="text-base font-semibold text-foreground">
                Critères de ciblage
              </p>
            </div>
            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
              {icp.jobTitles.length > 0 && (
                <div className="flex gap-2 text-sm">
                  <span className="w-20 shrink-0 text-muted-foreground">Postes</span>
                  <span className="text-foreground">{icp.jobTitles.join(", ")}</span>
                </div>
              )}
              {icp.locations.length > 0 && (
                <div className="flex gap-2 text-sm">
                  <span className="w-20 shrink-0 text-muted-foreground">Zone</span>
                  <span className="text-foreground">{icp.locations.join(", ")}</span>
                </div>
              )}
              {icp.industries.length > 0 && (
                <div className="flex gap-2 text-sm">
                  <span className="w-20 shrink-0 text-muted-foreground">Secteur</span>
                  <span className="text-foreground">{icp.industries.join(", ")}</span>
                </div>
              )}
              {icp.companySizes.length > 0 && (
                <div className="flex gap-2 text-sm">
                  <span className="w-20 shrink-0 text-muted-foreground">Taille</span>
                  <span className="text-foreground">{icp.companySizes.join(", ")}</span>
                </div>
              )}
              {icp.funding && icp.funding !== "Toutes les étapes" && (
                <div className="flex gap-2 text-sm">
                  <span className="w-20 shrink-0 text-muted-foreground">Funding</span>
                  <span className="text-foreground">{icp.funding}</span>
                </div>
              )}
              {(icp.headcountMin || icp.headcountMax) && (
                <div className="flex gap-2 text-sm">
                  <span className="w-20 shrink-0 text-muted-foreground">Effectif</span>
                  <span className="text-foreground">
                    {icp.headcountMin || "?"} – {icp.headcountMax || "?"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {icp.exclude.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="pb-5">
                <p className="mb-2 text-sm font-semibold text-destructive">
                  Exclusions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {icp.exclude.map((ex) => (
                    <Badge
                      key={ex}
                      variant="destructive"
                      className="rounded-md text-xs"
                    >
                      ✕ {ex}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {icp.exclude.length === 0 && <div className="pb-5" />}
        </div>
      </div>
    </div>
  );
}