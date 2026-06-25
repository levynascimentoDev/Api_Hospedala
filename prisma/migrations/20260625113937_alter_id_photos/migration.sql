/*
  Warnings:

  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `photos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `photos` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`key`);
