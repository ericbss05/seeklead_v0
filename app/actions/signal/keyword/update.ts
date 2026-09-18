"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface UpdateKeywordData {
  raw?: string;
}

export async function updateKeyword(
  keywordId: string,
  data: UpdateKeywordData,
) {
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

  const raw = data.raw?.trim();

  if (data.raw !== undefined && !raw) {
    throw new Error("Le mot-clé est obligatoire");
  }

  const updatedKeyword = await prisma.keyword.update({
    where: {
      id: keyword.id,
    },
    data: {
      ...(raw !== undefined && {
        raw,
      }),
    },
  });

  return {
    success: true,
    keyword: updatedKeyword,
  };
}