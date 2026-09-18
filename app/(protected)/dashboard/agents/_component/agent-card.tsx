"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { AnimatedFolder } from "@/components/ui/animated-folder";
import { DeleteAgentAlert } from "./delete-agent-alert";

interface Agent {
  id: string;
  name?: string | null;
  locations?: string[];
  companyTypes?: string[];
  companySizes?: string[];
  jobTitles?: string[];
  industries?: string[];
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const secondaryFields = [
    {
      label: "Localisation",
      value: agent.locations?.[0],
    },
    {
      label: "Type d'entreprise",
      value: agent.companyTypes?.[0],
    },
    {
      label: "Taille d'entreprise",
      value: agent.companySizes?.[0],
    },
  ].filter(
    (field): field is { label: string; value: string } =>
      Boolean(field.value),
  );

  const folderProjects = secondaryFields.map((field, index) => ({
    id: `${agent.id}-${index}`,
    image: "/placeholder.svg",
    title: field.label,
    details: field.value,
  }));

  const targetName = agent.name || "Cible sans intitulé";

  return (
    <div className="relative">
      <Link
        href={`/dashboard/agents/${agent.id}`}
        className="block"
      >
        <AnimatedFolder
          title={targetName}
          details={
            agent.jobTitles?.[0]
              ? agent.industries?.[0]
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

      <DeleteAgentAlert
        agentId={agent.id}
        agentName={targetName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </div>
  );
}