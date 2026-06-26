/*
  Warnings:

  - The values [ALBERGE] on the enum `accommodations_space_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `accommodations` MODIFY `space_type` ENUM('ALL', 'BEDROOM', 'ALBERG') NULL;
