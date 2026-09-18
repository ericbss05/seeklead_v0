"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function deleteSignal(signalId: string) {
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

  await prisma.signal.delete({
    where: {
      id: signal.id,
    },
  });

  return {
    success: true,
  };
}