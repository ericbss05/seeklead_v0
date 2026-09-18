"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { AnimatedFolder } from "@/components/ui/animated-folder";
import { DeleteTargetAlert } from "./delete-target-alert";

interface ICP {
  id: string;
  name?: string | null;
  locations?: string[];
  companyTypes?: string[];
  companySizes?: string[];
  jobTitles?: string[];
  industries?: string[];
}

interface TargetCardProps {
  icp: ICP;
}

export function TargetCard({ icp }: TargetCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const secondaryFields = [
    {
      label: "Localisation",
      value: icp.locations?.[0],
    },
    {
      label: "Type d'entreprise",
      value: icp.companyTypes?.[0],
    },
    {
      label: "Taille d'entreprise",
      value: icp.companySizes?.[0],
    },
  ].filter(
    (field): field is { label: string; value: string } =>
      Boolean(field.value),
  );

  const folderProjects = secondaryFields.map((field, index) => ({
    id: `${icp.id}-${index}`,
    image: "/placeholder.svg",
    title: field.label,
    details: field.value,
  }));

  const targetName = icp.name || "Cible sans intitulé";

  return (
    <div className="relative">
      <Link
        href={`/dashboard/targets/${icp.id}`}
        className="block"
      >
        <AnimatedFolder
          title={targetName}
          details={
            icp.jobTitles?.[0]
              ? icp.industries?.[0]
              : undefined
          }
          projects={folderProjects}
          className="w-full"
        />
      </Link>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDeleteOpen(true);
        }}
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-md border bg-background/90 text-muted-foreground shadow-sm transition-colors"
        aria-label={`Supprimer ${targetName}`}
      >
        <Trash2 className="h-4 w-4 hover:text-red-500" />
      </button>

      <DeleteTargetAlert
        icpId={icp.id}
        icpName={targetName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </div>
  );
}