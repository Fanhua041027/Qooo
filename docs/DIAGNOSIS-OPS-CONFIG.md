# 诊断运营配置契约

运营配置通过 `packages/diagnosis-engine/src/decision-config.ts` 定义。`schemaVersion` 用于校验结构，`configVersion` 写入每一次诊断的 `result.model.configVersion`，因此 Mock、第三方模型和未来自研模型可以使用同一份版本化契约。

## 配置 schema

```ts
interface DiagnosisOperationsConfig {
  schemaVersion: string
  configVersion: string
  riskLevels: Record<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', {
    label: string
    resultHint: string
    minimumReviewConfidence: number
    forceExpertReview: boolean
    displayOrder: number
  }>
  safety: {
    allowChemicalAdvice: false
    allowDosage: false
    requireRegisteredProduct: true
    requireExpertReviewForChemical: true
    blockedTextPatterns: string[]
    restrictedPesticides: string[]
    fallbackAction: {
      type: 'EXPERT_REVIEW'
      title: string
      description: string
      dueAt?: string
      safetyLevel: 'OBSERVATION' | 'BIOSECURITY'
    }
    fallbackDisclaimer: string
  }
  jev: {
    allowedTransitions: Partial<Record<DiagnosisLoopStage, DiagnosisLoopStage[]>>
    requireTaskForExecution: true
    verificationOutcomes: ('IMPROVED' | 'UNCHANGED' | 'WORSE' | 'UNKNOWN')[]
    reassessmentRequiresNewEvidence: true
  }
}
```

处理建议统一为 `type`、`title`、`description`、`dueAt`、`safetyLevel`。`type` 表示动作意图，`safetyLevel` 表示允许的安全边界：观察记录用 `OBSERVATION`，隔离和人工复核用 `BIOSECURITY`，任何涉及药剂的候选都只能进入 `CHEMICAL_REVIEW`，不能直接执行。

## 风险配置如何影响结果页

结果页使用最高风险候选的 `label` 和 `resultHint` 渲染风险卡片；`minimumReviewConfidence` 与模型置信度比较，低于阈值时展示“需要补充证据/专家复核”；`forceExpertReview` 会把结果状态提升为 `NEED_EXPERT_REVIEW`。`displayOrder` 只影响多个风险标签的排序。风险配置不会修改模型的原始候选、证据或置信度。

配置错误时使用安全默认配置，并将结果强制为人工复核。任何安全校验失败只保留 `EXPERT_REVIEW` 复核动作。

## 只影响文案与会影响决策的配置

只影响文案的字段包括风险 `label`、`resultHint`、建议的 `title`、`description`、默认 `dueAt` 和 `fallbackDisclaimer`。它们不能改变安全等级、模型候选、证据、置信度或是否需要复核。

会影响决策的字段包括 `minimumReviewConfidence`、`forceExpertReview`、`blockedTextPatterns`、`restrictedPesticides`、JEV 的 `allowedTransitions`、`requireTaskForExecution`、`verificationOutcomes` 和 `reassessmentRequiresNewEvidence`。`allowDosage` 永远必须为 `false`，`allowChemicalAdvice` 永远必须为 `false`；运营文案不能覆盖安全过滤器。

## AI 结果映射与 JEV

- `JUDGMENT`：读取风险阈值、强制复核开关、补拍/追问和首步安全动作；高风险或置信度不足进入复核。
- `EXECUTION`：必须先创建任务才能执行，任务截止时间来自 `dueAt`；药剂候选只能进入人工复核。
- `VERIFICATION`：只能提交配置中的 `verificationOutcomes`，结果页展示对应复查入口。
- `REASSESSMENT`：必须有新图片、描述或复查证据才能回到 `JUDGMENT`；没有新证据只能继续复核或结束。

模型输出先映射为统一动作，再执行安全过滤和运营配置；供应商模型不能自行决定 `safetyLevel`。Mock 也走同一动作结构，并在 `model.configVersion` 和免责声明中标记为辅助判断。

## 配置测试用例

1. 默认配置校验通过，并携带 `ops-1.0.0` 版本。
2. `allowDosage: true` 校验失败。
3. 缺少 `HIGH` 风险配置校验失败。
4. 高风险配置即使置信度为 `0.99` 仍触发专家复核。
5. 安全校验失败时只返回 `EXPERT_REVIEW`、`BIOSECURITY` 动作，且不包含剂量。
6. 关闭 `requireTaskForExecution` 或 `reassessmentRequiresNewEvidence` 时校验失败。
7. 非法 schema 自动回退安全默认配置。

## 固定评测集与 JEV 校验

`packages/diagnosis-engine/src/evaluation-fixtures.ts` 提供固定评测样例和 `evaluateDiagnosisFixture`，覆盖高风险、图片质量警告、图片失败、未知作物、检疫风险和危险药剂输出。评测样例不依赖真实图片内容，适合在模型或配置变更的 CI 中重复执行。

`validateJevTransition` 在进入任务执行、复查和重新判断前校验状态转换。没有任务不能进入 `EXECUTION`，没有新证据不能从 `REASSESSMENT` 回到 `JUDGMENT`，未知复查结果不能写入闭环。

后端复查接口也通过 `backend/src/modules/diagnosis/jev-policy.ts` 执行同样的状态边界校验，避免只在小程序端校验而被直接调用 API 绕过。

