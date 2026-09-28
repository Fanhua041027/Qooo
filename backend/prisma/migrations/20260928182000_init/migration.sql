CREATE TYPE "UserRole" AS ENUM ('FARMER', 'EXPERT', 'OPERATOR', 'ADMIN');
CREATE TYPE "DiagnosisStatus" AS ENUM ('CREATED', 'UPLOADING', 'ANALYZING', 'COMPLETED', 'NEED_MORE_IMAGES', 'NEED_EXPERT_REVIEW', 'FAILED');
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE', 'CANCELLED');
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "NotificationType" AS ENUM ('DIAGNOSIS_COMPLETED', 'DIAGNOSIS_FAILED', 'TASK_DUE', 'TASK_OVERDUE', 'SYSTEM');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "phone" TEXT,
  "wechatOpenId" TEXT,
  "nickname" TEXT NOT NULL,
  "avatarUrl" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'FARMER',
  "mockAccount" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Farm" (
  "id" TEXT NOT NULL,
  "ownerId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "address" TEXT,
  "areaMu" DECIMAL(10,2),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Plot" (
  "id" TEXT NOT NULL,
  "farmId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "areaMu" DECIMAL(10,2),
  "cropName" TEXT NOT NULL,
  "cropVariety" TEXT,
  "plantedAt" TIMESTAMP(3) NOT NULL,
  "growthStage" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Diagnosis" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "farmId" TEXT,
  "plotId" TEXT,
  "clientRequestId" TEXT NOT NULL,
  "status" "DiagnosisStatus" NOT NULL DEFAULT 'CREATED',
  "cropName" TEXT,
  "growthStage" TEXT,
  "description" TEXT,
  "result" JSONB,
  "failureCode" TEXT,
  "failureMessage" TEXT,
  "modelName" TEXT,
  "modelVersion" TEXT,
  "modelTraceId" TEXT,
  "requestId" TEXT NOT NULL,
  "traceId" TEXT NOT NULL,
  "expertReviewNeeded" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "completedAt" TIMESTAMP(3),
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DiagnosisImage" (
  "id" TEXT NOT NULL,
  "diagnosisId" TEXT NOT NULL,
  "objectKey" TEXT NOT NULL,
  "width" INTEGER,
  "height" INTEGER,
  "quality" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DiagnosisImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Task" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "farmId" TEXT,
  "plotId" TEXT,
  "diagnosisId" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "assignee" TEXT,
  "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
  "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
  "dueAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "completedNote" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" "NotificationType" NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "targetType" TEXT,
  "targetId" TEXT,
  "readAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FileObject" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "objectKey" TEXT NOT NULL,
  "bucket" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "size" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FileObject_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "KnowledgeArticle" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "cropName" TEXT,
  "tags" TEXT[],
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "KnowledgeArticle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "action" TEXT NOT NULL,
  "resource" TEXT NOT NULL,
  "resourceId" TEXT,
  "requestId" TEXT NOT NULL,
  "traceId" TEXT NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_wechatOpenId_key" ON "User"("wechatOpenId");
CREATE INDEX "Farm_ownerId_deletedAt_idx" ON "Farm"("ownerId", "deletedAt");
CREATE INDEX "Plot_farmId_deletedAt_idx" ON "Plot"("farmId", "deletedAt");
CREATE INDEX "Diagnosis_userId_status_createdAt_idx" ON "Diagnosis"("userId", "status", "createdAt");
CREATE INDEX "Diagnosis_plotId_createdAt_idx" ON "Diagnosis"("plotId", "createdAt");
CREATE UNIQUE INDEX "Diagnosis_userId_clientRequestId_key" ON "Diagnosis"("userId", "clientRequestId");
CREATE INDEX "DiagnosisImage_diagnosisId_idx" ON "DiagnosisImage"("diagnosisId");
CREATE INDEX "Task_userId_status_dueAt_idx" ON "Task"("userId", "status", "dueAt");
CREATE INDEX "Notification_userId_readAt_createdAt_idx" ON "Notification"("userId", "readAt", "createdAt");
CREATE UNIQUE INDEX "FileObject_objectKey_key" ON "FileObject"("objectKey");
CREATE INDEX "FileObject_userId_createdAt_idx" ON "FileObject"("userId", "createdAt");
CREATE UNIQUE INDEX "KnowledgeArticle_slug_key" ON "KnowledgeArticle"("slug");
CREATE INDEX "AuditLog_resource_resourceId_createdAt_idx" ON "AuditLog"("resource", "resourceId", "createdAt");

ALTER TABLE "Farm" ADD CONSTRAINT "Farm_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "DiagnosisImage" ADD CONSTRAINT "DiagnosisImage_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "FileObject" ADD CONSTRAINT "FileObject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
