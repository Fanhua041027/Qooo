# API 契约检查表

检查日期：2026-09-29  
检查范围：`packages/types`、`packages/api-client`、前端 API、Mock、NestJS DTO/Controller/Prisma

状态含义：通过 = 可直接联调；部分通过 = 有适配或未覆盖字段；阻塞 = 当前不能切换到真实链路；规划中 = 文档声明但代码未实现。

| 模块/接口 | 前端模型与 Client | Mock | 后端 DTO/Controller | 状态 | 差异、处理人与时间 |
|---|---|---|---|---|---|
| 认证 `mock-login` / `wechat-login` | `ApiClient.mockLogin`、`wechatLogin` | 已有 | `mock-login` 已有；微信登录已实现 `code2Session`、用户 upsert 和 JWT | 部分通过 | `BLOCK-AUTH-001`，需配置微信环境变量并完成真机联调，1 个工作日 |
| `GET /me` | 有 `me()` | 已有 | 有 | 通过 | 继续保留 JWT 归属校验；前端负责人，已完成 |
| 诊断创建/查询/重试/复核 | `ServerDiagnosis* -> DiagnosisRecord`，状态与风险已 normalize | 已有 | 有 | 通过 | 结果空列表需补契约测试；AI/前端，0.5 个工作日 |
| 诊断 `loop/followUpQuestions/expertReview/safety/model` | 已定义并归一化 | 已有 | 结果 JSON 支持 | 部分通过 | 需固定字段版本和默认值；AI 负责人，1 个工作日 |
| 农场 `region -> location` | `normalizeFarm` 已转换 | 已有 | DTO 使用 `region` | 通过 | 页面禁止直接读取 `region`；已完成 |
| 地块创建 | `CreatePlotInput` 已要求 `plantedAt`，可传 `cropVariety` | 已有 | `plantedAt` 必填，`cropVariety` 可选 | 通过 | 本轮已修复类型不一致；前端负责人，已完成 |
| 地块返回 | `normalizePlot` 保留 `cropVariety` | 已有 | `ServerPlot.cropVariety` | 通过 | 本轮已修复适配层字段丢失；已完成 |
| 任务列表/创建/更新 | 状态、优先级大小写转换；`assignee` 已透传并可编辑 | 已有 | 有 | 通过 | 产品仍需确认是否在 MVP 展示负责人 |
| 消息列表/未读/单条已读/全部已读/偏好 | Client 与 Mock 已有 | 已有 | `NotificationController` 已有 | 通过 | 批量已读、偏好局部更新和强制开启系统/逾期提醒均已覆盖自动化测试 |
| `POST /messages/read-all` | `ApiClient.markAllMessagesRead` | `mockTransport` 已有 | `NotificationController.markAllRead` 已有 | 通过 | 只更新当前用户未读消息，返回 `updated` 数量；前端消息页已接入 |
| `GET/PATCH /message-preferences` | `ApiClient.getMessagePreferences/updateMessagePreferences` | `mockTransport` 已有 | `NotificationController`、`NotificationPreference` 模型和迁移已实现 | 通过 | `system`、`taskOverdue` 始终为 `true`；诊断通知按偏好发送 |
| 文件上传凭证/完成 | `createUpload`、`completeUpload` | 已有 | 有 | 通过 | 生产对象存储凭证需安全审计；媒体负责人，0.5 个工作日 |
| 运营配置列表/保存 | `ops-config.api.ts` 通过 `ApiClient`；Mock 为独立存储 | 有列表、新建、预览、保存 | `OpsConfigController/Service`、Prisma 模型已实现 | 部分通过 | `OPERATOR/EXPERT/ADMIN` 角色规则已统一；仍需真实迁移/缓存验收 |
| 运营配置版本/回滚 | Client 有版本和回滚方法 | Mock 保留历史并生成新版本 | Controller/Service 已实现新版本回滚 | 部分通过 | 需补数据库迁移、跨页面失效和乐观锁验收；后端+前端，1 个工作日 |
| 错误信封与鉴权 | HTTP 有基础错误解析 | Mock 可模拟 | 全局 `JwtAuthGuard` | 部分通过 | 401 清理登录态、403/409 需统一错误码；前端，0.5 个工作日 |

## 已确认的字段映射

| 服务端字段 | 前端字段 | 适配位置 |
|---|---|---|
| `region` | `location` | `normalizeFarm`、`createFarm`、`updateFarm` |
| `created/uploading/analyzing/...` | `PENDING/PROCESSING/...` | `normalizeDiagnosis` |
| `low/medium/high/critical` | `LOW/MEDIUM/HIGH/CRITICAL` | `riskMap` |
| 小写任务状态/优先级（含 `cancelled`） | 大写任务状态/优先级（含 `CANCELLED`） | `normalizeTask`、Client 请求转换 |
| 小写消息类型 | 大写消息类型 | `normalizeMessage` |
| `plantedAt` 必填 | `CreatePlotInput.plantedAt` 必填 | `packages/types`（本轮修复） |

## 契约替换验收

同一页面切换 `API_MODE=mock/real` 时只能更换 `ApiTransport`；请求方法、路径、body、响应 envelope、错误码必须相同。每个新增字段必须有 Mock fixture 和真实 DTO 的序列化测试。运营配置接口已具备替换条件，完成真实 migration、缓存失效和多端冲突测试后才可作为生产持久化能力。

