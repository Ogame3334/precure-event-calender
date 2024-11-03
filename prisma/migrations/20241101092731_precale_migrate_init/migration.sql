/*
  Warnings:

  - Added the required column `icon_src` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "icon_src" TEXT NOT NULL;
