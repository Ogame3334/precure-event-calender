/*
  Warnings:

  - You are about to drop the column `end_time` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `icon_src` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[displayId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconSrc` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_user_id_fkey";

-- DropIndex
DROP INDEX "Events_event_id_key";

-- DropIndex
DROP INDEX "Users_user_id_key";

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "end_time",
DROP COLUMN "event_id",
DROP COLUMN "start_time",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "icon_src",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "displayId" TEXT NOT NULL,
ADD COLUMN     "iconSrc" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UserAuthentications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAuthentications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OldversionEvents" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventIdRef" INTEGER NOT NULL,

    CONSTRAINT "OldversionEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentications_id_key" ON "UserAuthentications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentications_userId_key" ON "UserAuthentications"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentications_email_key" ON "UserAuthentications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OldversionEvents_id_key" ON "OldversionEvents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OldversionEvents_eventId_key" ON "OldversionEvents"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToUsers_AB_unique" ON "_EventsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToUsers_B_index" ON "_EventsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Events_eventId_key" ON "Events"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_displayId_key" ON "Users"("displayId");

-- AddForeignKey
ALTER TABLE "UserAuthentications" ADD CONSTRAINT "UserAuthentications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OldversionEvents" ADD CONSTRAINT "OldversionEvents_eventIdRef_fkey" FOREIGN KEY ("eventIdRef") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUsers" ADD CONSTRAINT "_EventsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUsers" ADD CONSTRAINT "_EventsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
