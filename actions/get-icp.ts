"use server";

import { auth } from "@/auth"; // adapter si votre helper de session a un autre chemin/nom
import { prisma } from "@/lib/prisma";
import type { MatchingMode } from "@/components/icp-form/constants";

export interface SaveIcpProfileInput {
  jobTitles: string[];
  locations: string[];
  industries: string[];
  companyTypes: string[];
  companySizes: string[];
  exclude: string[];
  mode: MatchingMode;
  funding: string;
  headcountMin: string; // vide si non renseigné
  headcountMax: string;
}

export async function saveIcpProfile(input: SaveIcpProfileInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Utilisateur non authentifié.");
  }

  const headcountMin = input.headcountMin ? parseInt(input.headcountMin, 10) : null;
  const headcountMax = input.headcountMax ? parseInt(input.headcountMax, 10) : null;

  const saved = await prisma.icpProfile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      jobTitles: input.jobTitles,
      locations: input.locations,
      industries: input.industries,
      companyTypes: input.companyTypes,
      companySizes: input.companySizes,
      exclude: input.exclude,
      mode: input.mode,
      funding: input.funding,
      headcountMin,
      headcountMax,
    },
    update: {
      jobTitles: input.jobTitles,
      locations: input.locations,
      industries: input.industries,
      companyTypes: input.companyTypes,
      companySizes: input.companySizes,
      exclude: input.exclude,
      mode: input.mode,
      funding: input.funding,
      headcountMin,
      headcountMax,
    },
  });

  return saved;
}