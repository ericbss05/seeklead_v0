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
    return null;
  }

  return prisma.iCP.findUnique({
    where: {
      userId: user.id,
    },
  });
}