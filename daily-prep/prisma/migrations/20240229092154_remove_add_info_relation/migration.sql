/*
  Warnings:

  - You are about to drop the column `authorId` on the `AdditionalInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdditionalInfo" DROP CONSTRAINT "AdditionalInfo_authorId_fkey";

-- DropIndex
DROP INDEX "AdditionalInfo_authorId_key";

-- AlterTable
ALTER TABLE "AdditionalInfo" DROP COLUMN "authorId";
