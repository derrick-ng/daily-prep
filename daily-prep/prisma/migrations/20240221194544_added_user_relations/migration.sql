/*
  Warnings:

  - Added the required column `authorId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalInfo" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "weather" BOOLEAN NOT NULL DEFAULT false,
    "email" BOOLEAN NOT NULL DEFAULT false,
    "emailPriority" VARCHAR(255) NOT NULL,
    "eta" BOOLEAN NOT NULL DEFAULT false,
    "etaStart" VARCHAR(50) NOT NULL,
    "etaEnd" VARCHAR(50) NOT NULL,
    "modeOfTransportation" INTEGER NOT NULL,

    CONSTRAINT "AdditionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalInfo_authorId_key" ON "AdditionalInfo"("authorId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalInfo" ADD CONSTRAINT "AdditionalInfo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
