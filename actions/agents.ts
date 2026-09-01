"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export interface SaveAgentInput {
  name: string;
  signalType: string;
  interactionTypes: string[];
  keywords: string[];
}

export async function saveAgent(input: SaveAgentInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Utilisateur non authentifié.");
  }

  const saved = await prisma.agent.create({
    data: {
      userId: session.user.id,
      name: input.name,
      signalType: input.signalType,
      interactionTypes: input.interactionTypes,
      keywords: input.keywords,
      status: "active",
    },
  });

  return saved;
}

export async function getAgents() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Utilisateur non authentifié.");
  }

  const agents = await prisma.agent.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return agents;
}

export async function getAgent(agentId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Utilisateur non authentifié.");
  }

  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
      userId: session.user.id,
    },
  });

  return agent;
}

export async function updateAgent(agentId: string, input: SaveAgentInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Utilisateur non authentifié.");
  }

  const updated = await prisma.agent.updateMany({
    where: {
      id: agentId,
      userId: session.user.id,
    },
    data: {
      name: input.name,
      signalType: input.signalType,
      interactionTypes: input.interactionTypes,
      keywords: input.keywords,
    },
  });

  return updated;
}
