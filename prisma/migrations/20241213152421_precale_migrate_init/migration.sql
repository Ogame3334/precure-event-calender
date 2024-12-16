-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followers" TEXT[],
ADD COLUMN     "follows" TEXT[];

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
