"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function deleteAgent(agentId: string) {
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

  await prisma.agent.delete({
    where: {
      id: agent.id,
    },
  });

  return {
    success: true,
  };
}