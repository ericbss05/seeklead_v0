"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

import type { ICPFormData } from "@/components/icp/form/types";

export async function updateICP(
  icpId: string,
  data: ICPFormData,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Utilisateur non authentifié");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const icp = await prisma.iCP.findFirst({
    where: {
      id: icpId,
      userId: user.id,
    },
  });

  if (!icp) {
    throw new Error("Cible introuvable");
  }

  return prisma.iCP.update({
    where: {
      id: icpId,
    },
    data: {
      name: data.name,
      jobTitles: data.jobTitles,
      locations: data.locations,
      industries: data.industries,
      companyTypes: data.companyTypes,
      companySizes: data.companySizes,
      exclude: data.exclude,
    },
  });
}