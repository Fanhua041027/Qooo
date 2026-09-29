# 农间诊小程序前端架构

## 数据流

```text
页面 pages
  → 业务功能 features / services
  → @nongjianzhen/api-client
  → ApiTransport
      ├─ mockTransport
      └─ taroTransport
  → /api/v1/*
```

页面不得直接调用 `Taro.request`，也不得在页面文件中维护 Mock 业务数据。Mock 与真实请求必须经过同一个 `ApiClient`，使用 `packages/types` 中的请求和响应类型。

## 环境变量

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `TARO_APP_API_MODE` | `mock` / `real` | 默认 `mock` |
| `TARO_APP_API_BASE_URL` | `http://127.0.0.1:3000` | 真实 API 根地址 |
| `TARO_APP_SUBSCRIBE_TEMPLATE_IDS` | `id1,id2` | 微信订阅消息模板 ID，未配置时只使用站内任务 |

## 真实接口接入规则

1. 先在 `docs/API-CONTRACT.md` 确认字段。
2. 更新 `packages/types`。
3. 必要时更新 `packages/api-client` 的路径或方法。
4. Mock Transport 同步实现相同契约。
5. 页面只处理明确的业务状态，不判断后端私有字段。

媒体上传、微信登录响应和埋点接收端目前缺少完整契约，真实模式会给出明确错误，不会自行假定响应字段。
