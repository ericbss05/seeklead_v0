import prisma from "@/lib/prisma";

export async function getICP(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUserId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return [];
  }

  return prisma.iCP.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}