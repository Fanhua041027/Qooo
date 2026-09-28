# 农间诊 MVP 错误码

所有错误响应都包含 `code`、`message`、`details`、`requestId` 和 `traceId`。客户端根据 `code` 决定交互，不解析 `message`。

| 错误码 | HTTP | 含义 | 客户端建议 |
| --- | ---: | --- | --- |
| `VALIDATION_ERROR` | 400 | 请求字段不合法 | 标出对应字段 |
| `UNAUTHORIZED` | 401 | 未登录或令牌失效 | 清理登录态并重新登录 |
| `FORBIDDEN` | 403 | 无权执行操作 | 显示权限说明 |
| `MOCK_LOGIN_DISABLED` | 403 | 当前环境关闭模拟登录 | 改用微信登录 |
| `MOCK_ACCOUNT_NOT_FOUND` | 404 | 测试账号不存在 | 使用已登记测试账号 |
| `WECHAT_LOGIN_NOT_CONFIGURED` | 501 | 尚未配置微信登录 | 体验环境使用模拟登录 |
| `FARM_NOT_FOUND` | 404 | 农场不存在或不属于当前用户 | 刷新农场列表 |
| `PLOT_NOT_FOUND` | 404 | 地块不存在或不属于当前用户 | 重新选择地块 |
| `FILE_NOT_FOUND` | 404/409 | 文件不存在或尚未上传完成 | 保留本地图片并重试上传 |
| `FILE_TYPE_NOT_ALLOWED` | 400 | 文件类型不允许 | 选择 JPG、PNG 或 WebP |
| `DIAGNOSIS_EVIDENCE_REQUIRED` | 400 | 缺少图片和症状描述 | 引导补充证据 |
| `DIAGNOSIS_NOT_FOUND` | 404 | 诊断记录不存在 | 返回诊断历史 |
| `DIAGNOSIS_INVALID_STATE` | 409 | 当前状态不允许重试 | 刷新诊断状态 |
| `DIAGNOSIS_IMAGE_BLURRY` | 422 | 图片质量不足 | 展示拍摄指导并补拍 |
| `TASK_NOT_FOUND` | 404 | 农事任务不存在 | 刷新任务列表 |
| `NOTIFICATION_NOT_FOUND` | 404 | 消息不存在 | 刷新消息列表 |
| `INTERNAL_ERROR` | 500 | 未预期的服务端错误 | 携带 `requestId` 联系支持 |
