"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function deleteKeyword(keywordId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Non authentifié");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const keyword = await prisma.keyword.findFirst({
    where: {
      id: keywordId,
      signal: {
        agent: {
          userId: user.id,
        },
      },
    },
  });

  if (!keyword) {
    throw new Error("Mot-clé introuvable");
  }

  await prisma.keyword.delete({
    where: {
      id: keyword.id,
    },
  });

  return {
    success: true,
  };
}