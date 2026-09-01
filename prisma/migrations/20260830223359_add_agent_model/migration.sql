-- CreateTable
CREATE TABLE "agent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "signalType" TEXT NOT NULL,
    "interactionTypes" TEXT[],
    "keywords" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
