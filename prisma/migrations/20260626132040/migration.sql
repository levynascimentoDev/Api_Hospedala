/*
  Warnings:

  - You are about to alter the column `lat` on the `addressaccommodation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,8)`.
  - You are about to alter the column `lon` on the `addressaccommodation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(11,8)`.

*/
-- AlterTable
ALTER TABLE `addressaccommodation` MODIFY `lat` DECIMAL(10, 8) NOT NULL,
    MODIFY `lon` DECIMAL(11, 8) NOT NULL;
