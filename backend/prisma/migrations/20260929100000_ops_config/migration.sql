CREATE TYPE "OpsConfigCategory" AS ENUM ('RISK', 'ACTION', 'IMAGE_QUALITY', 'SAFETY', 'EXPERT_REVIEW', 'HOME');
CREATE TYPE "OpsConfigStatus" AS ENUM ('PUBLISHED', 'DRAFT');
CREATE TYPE "OpsConfigVersionAction" AS ENUM ('UPDATE', 'ROLLBACK');

CREATE TABLE "OpsConfig" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" "OpsConfigCategory" NOT NULL,
  "status" "OpsConfigStatus" NOT NULL DEFAULT 'PUBLISHED',
  "content" TEXT NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "updatedById" TEXT NOT NULL,
  "updatedBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "OpsConfig_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OpsConfigVersion" (
  "id" TEXT NOT NULL,
  "configId" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "content" TEXT NOT NULL,
  "action" "OpsConfigVersionAction" NOT NULL,
  "changedById" TEXT NOT NULL,
  "changedBy" TEXT NOT NULL,
  "requestId" TEXT NOT NULL,
  "traceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OpsConfigVersion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "OpsConfig_key_key" ON "OpsConfig"("key");
CREATE INDEX "OpsConfig_category_status_idx" ON "OpsConfig"("category", "status");
CREATE UNIQUE INDEX "OpsConfigVersion_configId_version_key" ON "OpsConfigVersion"("configId", "version");
CREATE INDEX "OpsConfigVersion_configId_createdAt_idx" ON "OpsConfigVersion"("configId", "createdAt");

ALTER TABLE "OpsConfig" ADD CONSTRAINT "OpsConfig_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OpsConfigVersion" ADD CONSTRAINT "OpsConfigVersion_configId_fkey" FOREIGN KEY ("configId") REFERENCES "OpsConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OpsConfigVersion" ADD CONSTRAINT "OpsConfigVersion_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
