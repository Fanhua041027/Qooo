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

## 前端使用原则

1. 首屏展示 `plainLanguage.summary` 和 `recommendedActions.immediate`，专业解释折叠显示。
2. `riskLevel` 为 `high` 或 `critical` 时，必须显示专家复核入口。
3. `safeInterval.policy` 为 `label_required` 时，不得自行显示固定天数。
4. `aiReview.decision` 为 `ask_more` 或 `expert_review` 时，不得渲染为“已确诊”。
5. 风险不能只靠颜色表达，必须同时显示“低风险、中风险、高风险”文字。

## 合规边界

本数据包用于辅助识别和农事决策，不替代现场诊断。农药登记范围、使用剂量、使用次数和安全间隔期会随产品、作物、地区和法规变化，必须以中国农药信息网可查询到的有效登记信息及产品标签为准。首版不输出具体商品名、统一剂量或统一安全间隔天数。
