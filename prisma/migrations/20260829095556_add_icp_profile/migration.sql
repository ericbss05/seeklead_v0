-- CreateTable
CREATE TABLE "icp_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobTitles" TEXT[],
    "locations" TEXT[],
    "industries" TEXT[],
    "companyTypes" TEXT[],
    "companySizes" TEXT[],
    "exclude" TEXT[],
    "mode" TEXT NOT NULL,
    "funding" TEXT NOT NULL,
    "headcountMin" INTEGER,
    "headcountMax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "icp_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "icp_profile_userId_key" ON "icp_profile"("userId");

-- AddForeignKey
ALTER TABLE "icp_profile" ADD CONSTRAINT "icp_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
