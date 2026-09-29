# 农间诊 MVP 接口与 Mock 边界

## 1. 原则

前端可以 Mock 数据，但不能 Mock 业务边界。所有 Mock 都必须经过与真实服务一致的 API Client、字段校验和状态机，未来替换数据源时不改页面交互。

## 2. 实现边界

| 模块 | MVP 决策 | 允许 Mock 的部分 | 必须真实的部分 |
| --- | --- | --- | --- |
| 登录 | 模拟登录优先，保留微信登录适配层 | 微信 `code` 换取用户信息 | 登录态、用户 ID、退出登录、权限判断 |
| 图片 | 使用微信相机/相册 | 对象存储可先用本地文件适配器 | 选图、预览、失败重试、重复提交保护 |
| 图片质量 | 客户端先做基础判断 | 服务端复杂模型检测 | 模糊/过暗/尺寸提示和用户决策 |

### JEV 复查接口

`POST /api/v1/diagnoses/{id}/verify`

请求体：

```json
{ "outcome": "IMPROVED|UNCHANGED|WORSE|UNKNOWN", "note": "可选的复查备注" }
```

接口只记录复查结果并推进 Loop 状态，不替代模型判断。`IMPROVED` 进入 `CLOSED`；`UNCHANGED` 或 `WORSE` 进入 `REASSESSMENT`；`UNKNOWN` 保持 `VERIFICATION`。
| AI 诊断 | 先用确定性 Mock 模型 | 模型推理、向量检索 | API 契约、处理中/成功/失败状态、模型版本字段 |
| 风险与建议 | 规则配置驱动 | 初始病害识别结果 | 风险等级、建议结构、药剂安全校验入口 |
| 诊断历史 | Mock 数据源可用 | 初期数据 | 列表、详情、筛选、删除确认、持久化边界 |
| 农场/地块 | Mock 数据源可用 | 地区字典 | 创建、编辑、选择、上下文关联 |
| 农事任务 | 先用本地/Mock 服务 | 任务提醒调度 | 创建、状态变更、幂等、结果页回填 |
| 消息 | 站内消息真实实现 | 微信订阅消息 | 消息生成、未读数、已读、跳转目标 |
| 管理配置 | 本地 Mock 可先跑 | 后台登录和远端保存 | 字段校验、预览、版本、回滚结构 |

## 3. 统一响应格式

```json
{
  "code": "OK",
  "message": "success",
  "data": {},
  "requestId": "req_demo_001",
  "traceId": "trace_demo_001"
}
```

失败响应：

```json
{
  "code": "DIAGNOSIS_IMAGE_BLURRY",
  "message": "图片过于模糊，请重新拍摄叶片正面",
  "details": {
    "action": "RETAKE_PHOTO"
  },
  "requestId": "req_demo_002",
  "traceId": "trace_demo_002"
}
```

## 4. P0 接口草案

### 登录

```text
POST /api/v1/auth/mock-login
POST /api/v1/auth/wechat-login
POST /api/v1/auth/logout
GET  /api/v1/me
```

### 农场与地块

```text
GET  /api/v1/farms
POST /api/v1/farms
GET  /api/v1/farms/{farmId}/plots
POST /api/v1/farms/{farmId}/plots
PATCH /api/v1/plots/{plotId}
DELETE /api/v1/plots/{plotId}
```

### 诊断

```text
POST /api/v1/diagnoses
GET  /api/v1/diagnoses/{diagnosisId}
GET  /api/v1/diagnoses/{diagnosisId}/result
GET  /api/v1/diagnoses
DELETE /api/v1/diagnoses/{diagnosisId}
POST /api/v1/diagnoses/{diagnosisId}/retry
```

`GET /api/v1/diagnoses/{diagnosisId}` 同时返回当前状态和已生成结果，前端使用该接口轮询。状态统一使用小写：`created`、`uploading`、`analyzing`、`completed`、`need_more_images`、`need_expert_review`、`failed`。

创建诊断请求：

```json
{
  "plotId": "plot_demo_001",
  "cropName": "番茄",
  "growthStage": "开花期",
  "images": [
    {
      "objectKey": "users/user_p0_farmer_001/diagnoses/demo.jpg",
      "width": 1200,
      "height": 1600,
      "quality": {
        "status": "pass",
        "issues": []
      }
    }
  ],
  "clientRequestId": "client_req_demo_001"
}
```

诊断结果核心字段：

```json
{
  "id": "diag_demo_001",
  "status": "completed",
  "crop": "番茄",
  "stage": "开花期",
  "possibleProblems": [
    {
      "name": "疑似晚疫病",
      "confidence": 0.86,
      "riskLevel": "high",
      "evidence": ["叶片出现不规则暗褐色病斑"]
    }
  ],
  "actions": [
    {
      "title": "检查相邻植株是否出现相同病斑",
      "description": "记录扩展范围并补拍叶片背面",
      "priority": "now"
    }
  ],
  "needExpertReview": true,
  "disclaimer": "以上内容为辅助判断，不代表确诊；涉及用药请核对有效登记和产品标签。",
  "model": {
    "name": "demo-diagnosis-model",
    "version": "mock-1.0.0",
    "knowledgeVersion": "1.0.0-mvp",
    "traceId": "ai_demo_001"
  }
}
```

### 文件上传

```text
POST /api/v1/files/upload-url
POST /api/v1/files/{fileId}/complete
GET  /api/v1/files/{fileId}/access-url
```

客户端先获取预签名 URL，直接 `PUT` 图片到对象存储，再调用 `complete`。只有属于当前用户且状态为 `ready` 的 `objectKey` 可以提交诊断。

### 农事任务

```text
GET  /api/v1/tasks
POST /api/v1/tasks
PATCH /api/v1/tasks/{taskId}
POST /api/v1/tasks/{taskId}/complete
```

创建任务时可带 `clientRequestId`。客户端在网络超时或重复点击后必须复用同一个值；服务端按“用户 + clientRequestId”返回原任务，避免同一诊断生成重复农事任务。更新任务不会接受或修改该字段。

### 消息

```text
GET  /api/v1/messages
GET  /api/v1/messages/unread-count
POST /api/v1/messages/{messageId}/read
POST /api/v1/messages/read-all
GET  /api/v1/message-preferences
PATCH /api/v1/message-preferences
```

`POST /api/v1/messages/read-all` 返回 `{ "updated": 3 }`，只处理当前用户的未读消息。通知偏好字段为 `diagnosisCompleted`、`diagnosisFailed`、`taskDue`、`taskOverdue`、`system`；其中系统通知和逾期任务提醒始终保持开启。

当前小程序使用 `src/services/message.api.ts` 作为适配器，字段与以上接口一致。诊断完成/失败和任务临期/逾期会通过 `dedupeKey` 防止重复提醒；普通任务提醒可以关闭，系统通知和逾期消息不能被关闭。

### 农场与地块

```text
GET   /api/v1/farms/current
POST  /api/v1/farms
PATCH /api/v1/farms/{farmId}
POST  /api/v1/farms/{farmId}/plots
PATCH /api/v1/plots/{plotId}
```

当前原生小程序使用 `services/farm-service.js` 持久化同一组字段，开发阶段不需要页面直接读写 `wx` storage；接入真实接口时只替换服务适配器。

### 运营配置

```text
GET   /api/v1/ops/configs
GET   /api/v1/ops/configs/{key}
POST  /api/v1/ops/configs/preview
POST  /api/v1/ops/configs
PUT   /api/v1/ops/configs/{key}
POST  /api/v1/ops/configs/{key}/rollback
GET   /api/v1/ops/configs/{key}/versions
```

运营配置接口需要 `Bearer JWT`。普通配置允许 `OPERATOR`、`EXPERT`、`ADMIN` 角色访问和管理；`SAFETY` 安全配置只允许 `EXPERT`、`ADMIN` 创建、修改和回滚。农户或未知角色返回 `FORBIDDEN`。成功响应统一包装为：

```json
{
  "code": "OK",
  "message": "success",
  "data": {},
  "requestId": "req_demo_001",
  "traceId": "trace_demo_001"
}
```

创建配置请求体：

```json
{
  "key": "home.quick-start",
  "name": "首页拍照引导",
  "description": "首页提示语",
  "category": "HOME",
  "content": "请拍摄清晰的叶片正面和背面"
}
```

预览请求体使用 `key`、`category`（可选）和 `content`，只执行校验，不写入数据库。更新请求体为：

```json
{
  "content": "当前情况可能影响叶片，请在 24 小时内复查",
  "expectedVersion": "v3"
}
```

`expectedVersion` 不匹配时返回 `OPS_CONFIG_VERSION_CONFLICT`，避免覆盖其他运营人员的新版本。内容不能为空、不能超过 2000 个字符，也不能包含“确诊”“保证有效”“一定有效”“100%”等确定性或危险用药表述。

回滚请求体为 `{ "version": "v2" }`。回滚不会删除历史记录，而是生成一个新的递增版本；保存或回滚事务失败时旧版本保持不变。版本列表包含当前版本、历史内容、修改人、修改时间、动作以及 `requestId`、`traceId`。

当配置数据库读取失败时，列表和已知配置详情返回内置安全默认配置，并附带 `fallback: true`；这样诊断结果页可以继续渲染。写入失败返回 `STORAGE_UNAVAILABLE`，不会改变当前版本。

## 5. Mock 数据要求

- 每个 Mock 响应必须有固定的 `requestId` 格式和可复现结果。
- 必须覆盖成功、处理中、低置信度、图片不合格、服务失败五种诊断状态。
- Mock 延迟模拟 500–1500ms，验证加载态和重复提交保护。
- Mock 数据不直接写在 WXML/页面文件中，统一放在 `src/mocks` 或接口适配器。
- 每次替换 Mock 数据结构时同步更新本文件和验收记录。

## 6. 前端联调前待确认字段

以下内容当前没有完整响应契约，前端只提供适配器和 Mock 实现，不在真实模式中猜测字段：

- 媒体上传接口路径、鉴权方式、进度语义和成功响应中的文件 URL 字段。
- `mock-login`、`wechat-login`、`me` 的请求与响应字段，以及令牌刷新方式。
- 微信订阅消息模板 ID、模板字段映射和服务端发送状态。
- 前端埋点接收接口、事件白名单和用户标识脱敏规则。

上述字段确认后，先更新本文件与 `packages/types`，再接入页面。
