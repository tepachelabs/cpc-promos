-- CreateTable
CREATE TABLE "Claim" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "verificationToken" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Sticker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "claimId" INTEGER,
    CONSTRAINT "Sticker_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Claim_email_key" ON "Claim"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Claim_verificationToken_key" ON "Claim"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_claimId_key" ON "Sticker"("claimId");
