/*
  Warnings:

  - You are about to drop the column `body` on the `Task` table. All the data in the column will be lost.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `body`,
    ADD COLUMN `description` VARCHAR(255) NOT NULL;
