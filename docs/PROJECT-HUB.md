# 农间诊 · MVP 项目中枢

本文件是产品负责人维护的唯一入口。需求、接口、设计、测试账号和每日状态都从这里跳转，避免信息分散。

## 产品目标

在用户发现作物异常后，5 分钟内完成“拍照 → 初步判断 → 下一步行动”的闭环。MVP 只围绕这一件事展开。

## 当前唯一优先级

**打通拍照上传到可执行处理建议的最短闭环。**

今天的决策规则：任何不能让用户更快拿到可靠下一步行动的改动，都不进入当前迭代；新增需求统一进入 `P1/P2` 排队。

## 文档入口

- [MVP PRD](./PRD-MVP.md)
- [产品设计上下文](../PRODUCT.md)
- [视觉与交互规范](../DESIGN.md)
- [QdUI 组件规范](./QDUI-SPEC.md)
- [页面与状态矩阵](./UX-STATE-MATRIX.md)
- [接口与 Mock 边界](./API-CONTRACT.md)
- [任务看板](./TASK-BOARD.md)
- [每日状态与阻塞项](./DAILY-STATUS.md)
- [测试账号登记](./TEST-ACCOUNTS.md)

## 外部资产登记

| 资产 | 地址/状态 | 负责人 | 更新时间 |
| --- | --- | --- | --- |
| Figma 设计稿 | 待补充；当前以 `pages/` 和 `components/` 为实现源 | 产品负责人 | 2026-09-28 |
| 接口文档 | [API-CONTRACT.md](./API-CONTRACT.md) | 产品负责人/后端 | 2026-09-28 |
| 任务看板 | [TASK-BOARD.md](./TASK-BOARD.md) | 产品负责人 | 2026-09-28 |
| 测试账号 | [TEST-ACCOUNTS.md](./TEST-ACCOUNTS.md) | 测试/产品 | 2026-09-28 |

## 当前实现判断

微信小程序端仍在按 P0 页面推进；后端已建立 `backend/` NestJS 模块化单体，当前不拆分为多个部署单元。后端以未来微服务边界组织模块，使用 PostgreSQL/Prisma 持久化、Redis、RabbitMQ 和 MinIO，诊断通过队列异步执行，AI 通过可替换 Provider 接口接入 Mock 或神农服务。

后端启动、迁移、种子数据和体验环境部署见 [backend README](../backend/README.md) 与 [部署说明](./DEPLOYMENT.md)。

## 每日工作方式

1. 每天开始先更新 [DAILY-STATUS.md](./DAILY-STATUS.md)，只保留一个“今日唯一优先级”。
2. 开发前先看 [TASK-BOARD.md](./TASK-BOARD.md)，没有任务编号的改动不进入开发。
3. 接口改动先更新 [API-CONTRACT.md](./API-CONTRACT.md)，再改代码。
4. 每项完成必须对照 PRD 的验收标准，并记录测试结果。
5. 发现新想法先进入 `P1/P2`，不在开发中途改变 P0 目标。
