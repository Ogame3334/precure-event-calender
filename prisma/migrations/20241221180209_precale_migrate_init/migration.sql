-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_id_key" ON "Tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_value_key" ON "Tokens"("value");
