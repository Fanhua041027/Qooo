# 阻塞清单

更新时间：2026-09-29。预计时间按工作日估算，需负责人确认排期后转为具体日期。

| ID | 优先级/状态 | 模块 | 现象与影响 | 负责人 | 解决方案 | 预计完成 | 验收标准 |
|---|---|---|---|---|---|---|---|
| BLOCK-OPS-001 | P1 / 接口已完成，待联调 | 运营配置 | Controller、Service、Prisma、Client、Mock 和 `expectedVersion` 冲突校验已具备；数据库迁移、跨页面缓存失效和多端发布尚未验收 | 后端负责人、前端负责人、运营配置负责人 | 执行 Prisma migration/seed；保存和回滚后广播失效事件；补真实环境两设备验收并统一 `OPS_CONFIG_VERSION_CONFLICT` 到前端错误码 | 1 个工作日 | 两台设备可看到发布结果；回滚生成新版本；冲突可恢复；降级默认配置可渲染 |
| BLOCK-RESULT-001 | P1 / 已修复 | 诊断结果页 | 配置缺失或 AI 返回空 actions 时行动区域可能为空，影响用户下一步操作 | 前端负责人、内容负责人 | 已增加 `displayActions` 安全兜底，空结果显示继续观察建议并可转任务 | 已完成 | 删除配置或返回空 actions 时结果页仍可渲染 |
| BLOCK-AI-001 | P1 / 未开始 | AI/内容 | Prompt、安全规则和知识版本硬编码，无法审计结果来源 | AI/农业负责人 | 引入 Prompt/Policy/Knowledge version；写入诊断 `model` 元数据；内容变更走发布记录 | 1 个工作日 | 结果可追溯到三类版本，回归样例通过 |
| BLOCK-AUTH-001 | P0 / 代码已完成，待环境联调 | 认证 | `wechat-login` 已实现 `code2Session`、微信用户 upsert 和 JWT；真实登录仍依赖微信 AppID/AppSecret 和真机回归 | 后端认证负责人、发布负责人 | 配置 `WECHAT_APP_ID`、`WECHAT_APP_SECRET`，执行真机登录、过期、撤销和重新登录验收 | 1 个工作日 | 真机登录闭环通过，AppSecret 不进入仓库 |
| BLOCK-AUTH-002 | P1 / 已修复 | 前端鉴权 | 401 曾只抛错，没有统一清理 token 和恢复登录态 | 前端负责人 | HTTP Transport 统一触发 `auth-session` 事件，清理 token/identity 并恢复登录态 | 已完成 | 任一接口 401 后用户可重新登录且不会死循环 |
| BLOCK-TASK-001 | P1 / 已实现待产品确认 | 任务 | 后端支持 `assignee` 和 `cancelled` 状态，前端此前未完整暴露 | 产品负责人、前端负责人 | 已补齐 types、Mock、Client 透传、任务负责人编辑 UI 和已取消状态筛选；产品确认是否在 MVP 展示负责人 | 0.5 个工作日（产品确认） | 创建、编辑、回显负责人和取消状态一致 |
| BLOCK-FARM-001 | P1 / 已修复 | 农场/地块 | `plantedAt` 曾在前端可选、后端必填；`cropVariety` 曾在适配层丢失 | 前端负责人 | 已将 `plantedAt` 改为必填并保留 `cropVariety`；已通过 typecheck 和测试 | 已完成 | 前后端创建和回显字段一致 |
| BLOCK-MSG-001 | P2 / 已实现待环境联调 | 消息 | 批量已读和通知偏好接口已补齐，仍需真实环境验证消息生成与偏好持久化 | QA、后端消息负责人 | 执行迁移并验证诊断完成、诊断失败、任务到期、任务逾期消息及偏好开关 | 已完成代码 | 文档、Client、Mock、Controller、Prisma 五处一致 |
| BLOCK-PRISMA-001 | P2 / 提醒 | 基础设施 | Prisma 提示 `package.json#prisma` 将在 Prisma 7 移除 | 后端负责人 | 升级窗口中评估 `prisma.config.ts`；保持 Prisma 6.19.3 时不强行迁移 | 下个迭代 | Prisma 7 兼容分支验证通过 |
| BLOCK-RELEASE-001 | P1 / 待安排 | 发布验收 | 自动化构建通过，但尚缺真机、真实域名、对象存储和微信登录回归 | QA 负责人、发布负责人 | 按 QA 测试计划执行 Mock/Real、弱网、权限、回滚和结果空状态矩阵 | 1 个工作日 | 真机回归报告无 P0/P1 未关闭项 |

## 范围变化通知

已向产品负责人发出范围提醒：运营配置持久化、版本回滚、冲突校验、任务 `assignee` 和正式微信登录代码已经完成，但跨设备缓存、微信环境和真机验收仍需排期；消息偏好接口仍不属于当前已完成 MVP 闭环。若要进入本次发布，必须关闭对应 P0/P1 阻塞；若维持 MVP 范围，则消息偏好从验收清单移至后续版本。

