# 农间诊农业知识数据包

当前版本：`1.0.0-mvp`  
更新时间：`2026-09-28`

本目录是首版 MVP 的农业内容交付物，可由小程序直接读取，也可以导入后端知识服务。首批覆盖番茄、黄瓜、水稻、玉米和柑橘，共 40 个问题，包含病害、虫害、生理性问题和缺素问题。

## 文件说明

- `issues.v1.json`：40 个结构化问题条目。
- `schema.json`：字段、枚举和校验约束。
- `ai-review-policy.json`：AI 输出审核、拒答、转专家和用药安全规则。
- `ai-review-examples.json`：10 条已审核的通过/驳回样例，可直接作为回归测试夹具。
- `plain-language.json`：老人友好用语和专业词替换表。
- `image-manifest.json`：已核验的公开图片、易混淆负例和后续采集要求。
- `sources.json`：内容与合规参考来源。
- `operations.v1.json`：首批运营配置，包含风险说明、图片质量提示、下一步行动、安全边界和专家复核文案。当前为待审批草稿。
- `task-templates.v1.json`：由诊断行动生成的农事任务模板，包含执行时间、优先级和完成凭证要求。当前为待审批草稿。

开发环境中的运营配置 Mock 由 `src/content/ops-config-seed.ts` 从 `operations.v1.json` 生成，运营配置页和诊断结果页共用这份映射；兼容 key 只用于保持已有页面读取路径，不代表新增内容已完成审批。

运营配置的审核表和版本说明见：

- `docs/CONTENT-REVIEW-MVP.md`
- `docs/CONTENT-COPY-VERSION.md`

## 前端使用原则

1. 首屏展示 `plainLanguage.summary` 和 `recommendedActions.immediate`，专业解释折叠显示。
2. `riskLevel` 为 `high` 或 `critical` 时，必须显示专家复核入口。
3. `safeInterval.policy` 为 `label_required` 时，不得自行显示固定天数。
4. `aiReview.decision` 为 `ask_more` 或 `expert_review` 时，不得渲染为“已确诊”。
5. 风险不能只靠颜色表达，必须同时显示“低风险、中风险、高风险”文字。
6. `operations.v1.json` 在农艺专家确认和产品负责人批准前，不得复制到测试环境。
7. 发布前运行 `pnpm content:validate`；只有双重审批完成后才运行 `pnpm content:validate:approved`。

## 合规边界

本数据包用于辅助识别和农事决策，不替代现场诊断。农药登记范围、使用剂量、使用次数和安全间隔期会随产品、作物、地区和法规变化，必须以中国农药信息网可查询到的有效登记信息及产品标签为准。首版不输出具体商品名、统一剂量或统一安全间隔天数。
