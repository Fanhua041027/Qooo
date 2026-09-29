# 农间诊 MVP 后端

基于 NestJS 的模块化单体。业务按未来微服务边界组织，但 MVP 只部署一个 API 进程和一组基础设施，降低联调、部署与排错成本。

## 技术栈

- NestJS + TypeScript
- PostgreSQL + Prisma
- Redis
- RabbitMQ
- MinIO（兼容 S3 的本地对象存储）
- Swagger

## 模块

```text
src/modules/
  auth/          模拟登录、微信登录适配入口、JWT
  farm/          农场、地块、作物上下文
  diagnosis/     异步诊断编排、AI Provider、状态机
  task/          农事任务
  notification/  站内消息
  file/          预签名上传和临时访问 URL
  knowledge/     MVP 农技知识查询
  ops/            运营配置、版本、权限、回滚
  health/        依赖健康检查
```

## 本地开发

要求 Node.js 20+、Docker Desktop 和 Docker Compose。

```powershell
cd backend
.\scripts\dev.ps1
```

脚本会复制开发配置、启动 PostgreSQL/Redis/RabbitMQ/MinIO、执行数据库迁移和种子数据，然后以监听模式启动 API。

手动启动方式：

```powershell
Copy-Item .env.example .env
docker compose up -d --wait
npm install
npm run prisma:generate
npm run db:deploy
npm run db:seed
npm run start:dev
```

服务入口：

- API：`http://localhost:3000/api`
- Swagger：`http://localhost:3000/api/docs`
- RabbitMQ 管理台：`http://localhost:15672`
- MinIO 管理台：`http://localhost:9001`

## 体验环境

在安装 Docker Compose 的体验服务器上执行：

```bash
export JWT_SECRET='replace-with-a-random-secret'
docker compose --profile experience up -d --build --wait
```

该命令会先执行迁移和测试数据初始化，再启动 API。公网接入时应在 API 前配置 HTTPS 反向代理，并把基础设施端口限制在内网。

## 联调顺序

1. `POST /api/v1/auth/mock-login` 获取访问令牌。
2. `POST /api/v1/files/upload-url` 获取预签名 URL。
3. 使用 `PUT` 将图片直接上传到返回的 URL。
4. `POST /api/v1/files/{fileId}/complete` 确认上传完成。
5. `POST /api/v1/diagnoses` 创建诊断，立即获得 `diagnosisId` 和 `created` 状态。
6. 轮询 `GET /api/v1/diagnoses/{diagnosisId}`，直到进入终态。

诊断终态包括 `completed`、`need_more_images`、`need_expert_review` 和 `failed`。

## 测试账号

```json
{
  "accountId": "user_p0_farmer_001"
}
```

其余账号见 `../docs/TEST-ACCOUNTS.md`。模拟登录只应在开发和体验环境开启。

运营配置联调账号为 `ops_p0_001`（角色 `OPERATOR`）；`ops_expert_p0_001`（角色 `EXPERT`）和 `ops_admin_p0_001`（角色 `ADMIN`）可执行安全配置发布和回滚。普通农户账号 `user_p0_farmer_001` 访问运营配置写接口会返回 `FORBIDDEN`。

## 验证

```bash
npm run typecheck
npm test
npm run build
npx prisma validate
```

Mock AI 仅用于流程联调，不可作为真实农业用药依据。切换真实神农模型时设置 `AI_PROVIDER=shennong` 和 `SHENNONG_API_KEY`，API 响应结构保持不变。
