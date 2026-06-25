/*
  Warnings:

  - You are about to drop the column `complete` on the `accommodations` table. All the data in the column will be lost.
  - The values [apartamento,casa,pousada,chalê,quarto,hotel,resort] on the enum `accommodations_property_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[accommodationId]` on the table `rules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `AddressAccommodation` table without a default value. This is not possible if the table is not empty.
  - Made the column `lat` on table `addressaccommodation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lon` on table `addressaccommodation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accommodationId` to the `rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accommodations` DROP COLUMN `complete`,
    ADD COLUMN `currentStep` ENUM('PROPERTY_TYPE', 'SPACE_TYPE', 'SERVICES', 'LOCATION', 'DETAILS', 'PHOTOS', 'RULES', 'FINISH', 'COMPLETED') NOT NULL DEFAULT 'PROPERTY_TYPE',
    ADD COLUMN `space_type` ENUM('ALL', 'BEDROOM', 'ALBERQUE') NULL,
    MODIFY `property_type` ENUM('APARTAMENTO', 'CASA', 'POUSADA', 'CHALÊ', 'QUARTO', 'HOTEL', 'RESORT') NULL;

-- AlterTable
ALTER TABLE `addressaccommodation` ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `lat` DECIMAL(10, 8) NOT NULL,
    MODIFY `lon` DECIMAL(11, 8) NOT NULL,
    MODIFY `cep` CHAR(9) NOT NULL;

-- AlterTable
ALTER TABLE `media_accommodations` ADD COLUMN `cover` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `rules` ADD COLUMN `accommodationId` VARCHAR(35) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `rules_accommodationId_key` ON `rules`(`accommodationId`);
