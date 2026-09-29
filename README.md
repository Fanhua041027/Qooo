# 农间诊

农间诊是面向农户、家庭农场主和农技员的微信小程序。用户上传作物照片后，可以获得初步判断、风险等级和下一步行动建议，并把建议转成农事任务。

## 项目状态

- 已支持 Mock API 与真实 API 切换，可并行开发和接口联调。
- 已覆盖首页、图片诊断、诊断结果、诊断历史、农场与地块、任务、消息、个人中心和运营配置。
- 已支持图片质量检查、上传进度、诊断状态轮询、失败重试、配置预览、版本回滚和权限提示。
- 自定义底部导航已适配安全区、375px 小屏和微信大字号。
- 后端以模块化单体部署，模块边界按未来微服务方向组织。
- 微信开发者工具加载 dist/ 目录。

## 功能

- 拍照或从相册选择图片，压缩、检查、上传并显示进度。
- 诊断结果展示风险、证据、行动建议、安全边界和专家复核状态。
- 管理农场、地块、作物上下文和农事任务。
- 查看诊断历史、站内消息和消息偏好。
- 运营人员维护动态文案，支持校验、预览、保存、失败重试和回滚。
- Mock 数据持久化，刷新或重新进入页面后可恢复最新状态。

## 架构

```text
微信小程序
  └─ dist/                         微信开发者工具加载目录
      ├─ Taro + React 页面
      └─ 自定义底部导航

src/                                Taro + React + TypeScript 前端
  ├─ pages/                         页面
  ├─ components/                    qd-ui 和业务组件
  ├─ services/                      API 适配器
  ├─ store/                         Zustand 状态
  ├─ mocks/                         Mock Transport 和数据
  └─ styles/                        设计 Token

packages/types/                     前后端共享类型
packages/api-client/                统一 API Client 和 Transport
packages/diagnosis-engine/          诊断状态机、风险规则和安全校验
backend/                            NestJS API、Prisma 和业务模块
data/agriculture/                   农业内容和任务模板
docs/                               产品、接口、QA 和联调文档
scripts/                            校验、QA 和发布脚本
```

后端模块包括 auth、farm、diagnosis、task、notification、file、knowledge、ops 和 field-services。基础设施使用 PostgreSQL、Redis、RabbitMQ 和 MinIO。当前采用模块化单体，后续可按模块边界独立迁移微服务。

## 环境要求

- Node.js 20+
- pnpm 9+
- 微信开发者工具
- 后端本地开发需要 Docker Desktop 和 Docker Compose

## 安装

```bash
pnpm install
cd backend
npm install
```

## 启动前端 Mock

Mock 是默认模式，不需要启动数据库或后端：

```bash
TARO_APP_API_MODE=mock pnpm dev:weapp
```

PowerShell：

```powershell
$env:TARO_APP_API_MODE = "mock"
pnpm dev:weapp
```

然后在微信开发者工具中导入 dist/。一次性构建：

```bash
pnpm build:weapp
```

## 启动后端

推荐执行：

```powershell
cd backend
.\scripts\dev.ps1
```

手动执行：

```bash
cd backend
cp .env.example .env
docker compose up -d --wait
npm run prisma:generate
npm run db:deploy
npm run db:seed
npm run start:dev
```

Windows PowerShell 复制配置文件：

```powershell
Copy-Item .env.example .env
```

服务地址：

- API：localhost:3000/api
- Swagger：localhost:3000/api/docs
- RabbitMQ：localhost:15672
- MinIO：localhost:9001

## 切换真实 API

```bash
TARO_APP_API_MODE=real \
TARO_APP_API_BASE_URL=http://127.0.0.1:3000 \
pnpm dev:weapp
```

PowerShell：

```powershell
$env:TARO_APP_API_MODE = "real"
$env:TARO_APP_API_BASE_URL = "http://127.0.0.1:3000"
pnpm dev:weapp
```

常用变量：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| TARO_APP_API_MODE | mock | mock 或 real |
| TARO_APP_API_BASE_URL | http://127.0.0.1:3000 | 真实 API 根地址 |
| TARO_APP_SUBSCRIBE_TEMPLATE_IDS | 空 | 微信订阅模板 ID，逗号分隔 |

Mock 与真实接口必须遵循 packages/types 和 packages/api-client 的契约。接入真实接口时先更新 docs/API-CONTRACT.md 和共享类型，再同步实现 Mock Transport。

## 核心 API

```text
POST  /api/v1/auth/mock-login
POST  /api/v1/auth/wechat-login
GET   /api/v1/me
GET   /api/v1/farms
GET   /api/v1/farms/{farmId}/plots
POST  /api/v1/files/upload-url
POST  /api/v1/diagnoses
GET   /api/v1/diagnoses/{diagnosisId}
GET   /api/v1/diagnoses/{diagnosisId}/result
POST  /api/v1/diagnoses/{diagnosisId}/verify
GET   /api/v1/tasks
POST  /api/v1/tasks
POST  /api/v1/tasks/{taskId}/complete
GET   /api/v1/messages
GET   /api/v1/ops/configs
POST  /api/v1/ops/configs/preview
PUT   /api/v1/ops/configs/{key}
POST  /api/v1/ops/configs/{key}/rollback
```

统一响应格式：

```json
{
  "code": "OK",
  "message": "success",
  "data": {},
  "requestId": "req_demo_001",
  "traceId": "trace_demo_001"
}
```

## 测试

```bash
pnpm typecheck
pnpm test -- --run
pnpm content:validate
pnpm build:weapp
pnpm qa:smoke:p0-11
pnpm release:check:code
```

后端检查：

```bash
cd backend
npm run typecheck
npm test
npm run build
npx prisma validate
```

完整发布检查：

```bash
pnpm release:check
```

## 开发约定

1. 页面不直接维护 Mock 业务数据，也不直接调用 Taro.request。
2. 字段先在 packages/types 和 docs/API-CONTRACT.md 中约定。
3. Mock 与真实 API 使用同一套请求方法、响应类型和状态机。
4. 诊断结果使用“初步判断”“疑似”“建议复核”，不使用“确诊”。
5. 风险必须同时使用文字、图形标记和颜色表达。
6. 固定 CTA 和底部导航必须为滚动内容预留空间，并适配 safe-area-inset-bottom。
7. 图片上传、诊断创建和任务创建使用幂等请求 ID。
8. 修改 src/ 后重新执行 pnpm build:weapp，再验证 dist/。

## 文档

- PRODUCT.md：产品定位和用户场景
- DESIGN.md：设计系统和可访问性规范
- docs/FRONTEND-ARCHITECTURE.md：前端分层和 Transport 约定
- docs/API-CONTRACT.md：接口和字段约定
- docs/UX-STATE-MATRIX.md：页面状态矩阵
- docs/QDUI-SPEC.md：基础组件契约
- docs/TEST-ACCOUNTS.md：测试账号
- backend/README.md：后端开发和体验环境

## 免责声明

农间诊提供辅助判断和农事行动建议，不替代农技员、植保专家或当地监管要求。Mock AI 结果仅用于开发和流程联调，不可作为真实农业用药依据。
