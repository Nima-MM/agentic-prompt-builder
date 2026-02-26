-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled Prompt',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptBlock" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PromptBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PromptBlock_promptId_orderIndex_idx" ON "PromptBlock"("promptId", "orderIndex");

-- AddForeignKey
ALTER TABLE "PromptBlock" ADD CONSTRAINT "PromptBlock_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
