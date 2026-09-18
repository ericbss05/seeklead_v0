import prisma from "@/lib/prisma";

export async function getAgent(
  clerkId: string,
  agentId?: string,
) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    return [];
  }

  return prisma.agent.findMany({
    where: {
      userId: user.id,
      ...(agentId
        ? {
            id: agentId,
          }
        : {}),
    },
    include: {
      signals: {
        include: {
          keywords: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}