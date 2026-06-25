/*
  Warnings:

  - The values [host,user,admin] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('HOST', 'USER', 'ADMIN') NOT NULL;
