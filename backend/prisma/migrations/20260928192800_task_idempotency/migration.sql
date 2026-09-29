ALTER TABLE "Task" ADD COLUMN "clientRequestId" TEXT;

CREATE UNIQUE INDEX "Task_userId_clientRequestId_key" ON "Task"("userId", "clientRequestId");
