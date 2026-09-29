# 农间诊 MVP 部署说明

## 环境分层

| 环境 | 登录 | AI | 数据 | 入口 |
| --- | --- | --- | --- | --- |
| 开发环境 | Mock | Mock，可切神农沙箱 | 本机 Docker Volume | `localhost:3000` |
| 体验环境 | Mock | 默认 Mock，可切神农 | 独立服务器 Volume | HTTPS 测试域名 |
| 生产环境 | 微信 | 经农业专家验收的 Provider | 托管数据库和对象存储 | 已备案 HTTPS 域名 |

## 体验环境发布

服务器需要 Docker Engine 24+ 和 Compose v2。首次发布：

```bash
cd backend
export JWT_SECRET='至少 32 位随机字符串'
docker compose --profile experience up -d --build --wait
curl https://your-domain.example/api/health
```

升级：

```bash
git pull --ff-only
docker compose --profile experience up -d --build --wait
```

回滚应使用上一版本镜像标签，并保留数据库向前兼容。数据库迁移在 API 启动前由一次性 `migrate` 容器执行；迁移失败时 API 不启动。

## 生产前必须替换

- 使用密钥管理系统提供 `JWT_SECRET`、微信密钥和 AI 密钥。
- PostgreSQL、Redis、RabbitMQ 和对象存储改用独立实例或托管服务。
- 关闭 `MOCK_LOGIN_ENABLED`。
- 限制 RabbitMQ、PostgreSQL、Redis、MinIO 管理端口的公网访问。
- 配置 HTTPS、访问日志、指标、告警、备份和恢复演练。
- 完成农业专家对首批固定测试图片和输出结果的联合审核。

## 健康与追踪

`GET /api/health` 检查 PostgreSQL、Redis、RabbitMQ 和对象存储。所有请求接受 `X-Request-Id` 与 `X-Trace-Id`，响应头和 JSON 响应会回传二者。故障排查时优先按 `traceId` 串联 API、队列和 AI Provider 日志。
