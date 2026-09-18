"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface SaveSignalData {
  agentId: string;
  name: string;
}

export async function saveSignal(data: SaveSignalData) {
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
      id: data.agentId,
      userId: user.id,
    },
  });

  if (!agent) {
    throw new Error("Agent introuvable");
  }

  const name = data.name.trim();

  if (!name) {
    throw new Error("Le nom du signal est obligatoire");
  }

  const signal = await prisma.signal.create({
    data: {
      agentId: agent.id,
      name,
    },
  });

  return {
    success: true,
    signal,
  };
}