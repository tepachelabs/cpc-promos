-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "verificationToken" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "claimId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Claim_email_key" ON "Claim"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Claim_verificationToken_key" ON "Claim"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_token_key" ON "Reward"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_claimId_key" ON "Reward"("claimId");

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE SET NULL ON UPDATE CASCADE;
