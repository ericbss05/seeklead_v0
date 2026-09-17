"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

import type { ICPFormData } from "@/components/icp/form/types";

export async function saveICP(data: ICPFormData) {
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

  return prisma.iCP.upsert({
    where: {
      userId: user.id,
    },
    update: {
      jobTitles: data.jobTitles,
      locations: data.locations,
      industries: data.industries,
      companyTypes: data.companyTypes,
      companySizes: data.companySizes,
      exclude: data.exclude,
    },
    create: {
      userId: user.id,
      jobTitles: data.jobTitles,
      locations: data.locations,
      industries: data.industries,
      companyTypes: data.companyTypes,
      companySizes: data.companySizes,
      exclude: data.exclude,
    },
  });
}