/*
  Warnings:

  - You are about to drop the column `authorId` on the `AdditionalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdditionalInfo" DROP CONSTRAINT "AdditionalInfo_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorId_fkey";

-- DropIndex
DROP INDEX "AdditionalInfo_authorId_key";

-- AlterTable
ALTER TABLE "AdditionalInfo" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "authorId";
