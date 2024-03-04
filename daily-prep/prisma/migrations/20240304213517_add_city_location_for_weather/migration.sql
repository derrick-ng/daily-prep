/*
  Warnings:

  - Added the required column `weatherCity` to the `AdditionalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdditionalInfo" ADD COLUMN     "weatherCity" TEXT NOT NULL;
