-- CreateTable
CREATE TABLE "chatBot" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "image" TEXT,
    "buttonLink" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "keyword" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "branchId" TEXT NOT NULL,

    CONSTRAINT "chatBot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chatBot" ADD CONSTRAINT "chatBot_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
