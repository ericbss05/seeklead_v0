import { auth, currentUser } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";

export async function syncUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? null;

  const name =
    [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ") || null;

  return prisma.user.upsert({
    where: {
      clerkId: userId,
    },
    update: {
      email,
      name,
    },
    create: {
      clerkId: userId,
      email,
      name,
    },
  });
}