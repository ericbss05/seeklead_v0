"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface UpdateSignalData {
  name?: string;
}

export async function updateSignal(
  signalId: string,
  data: UpdateSignalData,
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

  const signal = await prisma.signal.findFirst({
    where: {
      id: signalId,
      agent: {
        userId: user.id,
      },
    },
  });

  if (!signal) {
    throw new Error("Signal introuvable");
  }

  const name = data.name?.trim();

  if (data.name !== undefined && !name) {
    throw new Error("Le nom du signal est obligatoire");
  }

  const updatedSignal = await prisma.signal.update({
    where: {
      id: signal.id,
    },
    data: {
      ...(name !== undefined && {
        name,
      }),
    },
  });

  return {
    success: true,
    signal: updatedSignal,
  };
}