/*
  Warnings:

  - Changed the type of `type` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'both');

-- CreateEnum
CREATE TYPE "DocType" AS ENUM ('CNH', 'RG');

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "type",
ADD COLUMN     "type" "CardType" NOT NULL;

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "type" "DocType" NOT NULL,
    "number" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emissionDate" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "emissionInstitution" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
