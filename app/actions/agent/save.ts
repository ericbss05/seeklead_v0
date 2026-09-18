"use server";

import { auth } from "@clerk/nextjs/server";
import prisma  from "@/lib/prisma";

interface SaveAgentData {
  name: string;
  icpId?: string;
}

export async function saveAgent(data: SaveAgentData) {
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

  const name = data.name.trim();

  if (!name) {
    throw new Error("Le nom de l'agent est obligatoire");
  }

  if (data.icpId) {
    const icp = await prisma.iCP.findFirst({
      where: {
        id: data.icpId,
        userId: user.id,
      },
    });

    if (!icp) {
      throw new Error("Cible introuvable");
    }
  }

  const agent = await prisma.agent.create({
    data: {
      userId: user.id,
      name,
      ...(data.icpId
        ? {
            icps: {
              connect: {
                id: data.icpId,
              },
            },
          }
        : {}),
    },
  });

  return {
    success: true,
    agent,
  };
}