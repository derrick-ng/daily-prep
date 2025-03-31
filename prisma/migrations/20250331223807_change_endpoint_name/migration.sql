/*
  Warnings:

  - You are about to drop the column `endpoint_url` on the `PushSubscription` table. All the data in the column will be lost.
  - Added the required column `endpoint` to the `PushSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PushSubscription" DROP COLUMN "endpoint_url",
ADD COLUMN     "endpoint" TEXT NOT NULL;
