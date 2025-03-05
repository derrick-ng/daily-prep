-- CreateTable
CREATE TABLE "FormData" (
    "id" SERIAL NOT NULL,
    "city" TEXT,
    "traffic_start" TEXT,
    "traffic_end" TEXT,
    "traffic_transportation" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormData_userId_key" ON "FormData"("userId");

-- AddForeignKey
ALTER TABLE "FormData" ADD CONSTRAINT "FormData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
