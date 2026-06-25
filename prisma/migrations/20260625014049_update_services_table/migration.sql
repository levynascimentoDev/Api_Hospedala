/*
  Warnings:

  - The values [CHALÊ,QUARTO] on the enum `accommodations_property_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `academy` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accommodations` MODIFY `property_type` ENUM('APARTAMENTO', 'CASA', 'POUSADA', 'MOTEL', 'HOTEL', 'RESORT') NULL;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `academy`,
    ADD COLUMN `gym` BOOLEAN NOT NULL DEFAULT false;
