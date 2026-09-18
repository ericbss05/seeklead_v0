"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface UpdateAgentData {
  name?: string;
  isActive?: boolean;
  icpId?: string;
}

export async function updateAgent(
  agentId: string,
  data: UpdateAgentData,
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

  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
      userId: user.id,
    },
  });

  if (!agent) {
    throw new Error("Agent introuvable");
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

  const name = data.name?.trim();

  if (data.name !== undefined && !name) {
    throw new Error("Le nom de l'agent est obligatoire");
  }

  const updatedAgent = await prisma.agent.update({
    where: {
      id: agent.id,
    },
    data: {
      ...(name !== undefined && {
        name,
      }),

      ...(data.isActive !== undefined && {
        isActive: data.isActive,
      }),

      ...(data.icpId !== undefined && {
        icps: {
          set: data.icpId
            ? [{ id: data.icpId }]
            : [],
        },
      }),
    },
  });

  return {
    success: true,
    agent: updatedAgent,
  };
}