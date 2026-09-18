import prisma from "@/lib/prisma";

export async function getSignal(
  clerkId: string,
  agentId: string,
) {
  console.log("Recherche du signal");
  console.log("Agent ID :", agentId);

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    console.log("Utilisateur introuvable :", clerkId);

    return [];
  }

  const signals = await prisma.signal.findMany({
    where: {
      agentId,
      agent: {
        userId: user.id,
      },
    },
    include: {
      keywords: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (signals.length === 0) {
    console.log("Aucun signal trouvé pour cet agent");
    return [];
  }

  console.log("Nombre de signaux :", signals.length);
  console.log(
    "Signaux :",
    JSON.stringify(signals, null, 2),
  );

  return signals;
}