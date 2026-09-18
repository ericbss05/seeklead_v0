"use server";

import { auth } from "@clerk/nextjs/server";
import prisma  from "@/lib/prisma";

export async function deleteICP(icpId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Non authentifié");
  }

  const icp = await prisma.iCP.findFirst({
    where: {
      id: icpId,
      userId,
    },
  });

  if (!icp) {
    throw new Error("Cible introuvable");
  }

  await prisma.iCP.delete({
    where: {
      id: icp.id,
    },
  });

  return { success: true };
}