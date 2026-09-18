"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface SaveKeywordData {
  signalId: string;
  raw: string;
}

export async function saveKeyword(data: SaveKeywordData) {
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

  const signal = await prisma.signal.findFirst({
    where: {
      id: data.signalId,
      agent: {
        userId: user.id,
      },
    },
  });

  if (!signal) {
    throw new Error("Signal introuvable");
  }

  const raw = data.raw.trim();

  if (!raw) {
    throw new Error("Le mot-clé est obligatoire");
  }

  const keyword = await prisma.keyword.create({
    data: {
      signalId: signal.id,
      raw,
    },
  });

  return {
    success: true,
    keyword,
  };
}