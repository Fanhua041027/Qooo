# QA / 发布负责人代码工具

本轮新增脚本用于把 P0-11 验收变成可重复执行的命令。脚本不会代替微信开发者工具或 Android/iPhone 真机回归；缺少这些证据时，发布门禁仍然输出“阻塞”。

## 真实 API smoke

后端和数据库启动后执行：

```bash
npm run qa:init:p0-11
npm run qa:smoke:p0-11
npm run qa:reset:p0-11
```

可通过 `BASE_URL`、`QA_ACCOUNT_ID`、`QA_SMOKE_CONFIG_KEY`、`QA_HTTP_TIMEOUT_MS` 覆盖默认值。smoke 会检查模拟登录、正常读取、新增、编辑、空内容保存失败、版本历史、回滚、未授权访问，以及 `code/message/data/requestId` 字段契约。

## 发布代码门禁

```bash
npm run release:check:code
npm run release:check
```

`release:check:code` 执行前后端类型检查、单元测试、页面契约测试、原生回归测试、微信小程序构建、后端构建和 Prisma 校验。完整 `release:check` 还要求以下环境变量全部为 `true`：

- `REAL_API_SMOKE_PASSED`
- `WECHAT_DEVTOOLS_REGRESSION`
- `ANDROID_REGRESSION`
- `IPHONE_REGRESSION`
- `LARGE_FONT_EVIDENCE`
- `SMALL_SCREEN_EVIDENCE`

任一代码检查失败或验收证据缺失，脚本只会输出“阻塞”并返回非零退出码。所有代码检查和证据齐全时才输出“通过”。

## CI

`.github/workflows/qa.yml` 在 Pull Request、`main` 分支推送和手动触发时执行代码门禁。手动触发且配置仓库变量 `REAL_API_BASE_URL` 后，会额外运行真实 API smoke。
