export type DefaultOpsConfig = {
  key: string;
  name: string;
  description: string;
  category: 'RISK' | 'ACTION' | 'IMAGE_QUALITY' | 'SAFETY' | 'EXPERT_REVIEW' | 'HOME';
  content: string;
};

/** 配置服务不可用或尚未初始化时使用的安全默认值。 */
export const DEFAULT_OPS_CONFIGS: DefaultOpsConfig[] = [
  { key: 'risk.low', name: '低风险等级文案', description: '诊断结果中的低风险标题和解释。', category: 'RISK', content: JSON.stringify({ level: 'LOW', label: '低风险', description: '暂未发现需要立即处置的明显信号。', actionWindow: '7天内复查', marker: 'success' }) },
  { key: 'risk.medium', name: '中风险等级文案', description: '诊断结果中的中风险标题和解释。', category: 'RISK', content: JSON.stringify({ level: 'MEDIUM', label: '中风险', description: '可能影响叶片、果实或长势。', actionWindow: '24小时内复查', marker: 'warning' }) },
  { key: 'risk.high', name: '高风险等级文案', description: '诊断结果中的高风险标题和解释。', category: 'RISK', content: JSON.stringify({ level: 'HIGH', label: '高风险', description: '存在较快扩散、较大损失或判断混淆可能。', actionWindow: '当天处理并复核', marker: 'danger' }) },
  { key: 'risk.critical', name: '极高风险等级文案', description: '检疫、整批损失或人员安全相关提示。', category: 'RISK', content: JSON.stringify({ level: 'CRITICAL', label: '极高风险', description: '可能涉及检疫、整批损失或人员安全。', actionWindow: '立即升级', marker: 'critical' }) },
  { key: 'action.do_now', name: '现在做建议', description: '结果页优先展示的立即行动。', category: 'ACTION', content: JSON.stringify({ type: 'DO_NOW', title: '隔离并标记异常植株', description: '避免在潮湿时修剪，并记录病斑变化。', dueRule: 'TODAY', safetyLevel: 'SAFE_NON_CHEMICAL', taskDefault: true }) },
  { key: 'action.observe', name: '继续观察建议', description: '低置信度或暂时无需处理时的下一步行动。', category: 'ACTION', content: JSON.stringify({ type: 'OBSERVE', title: '继续观察', description: '按同一角度拍照，记录病斑大小、颜色和扩散方向。', dueRule: 'WITHIN_24H', safetyLevel: 'SAFE_NON_CHEMICAL', taskDefault: false }) },
  { key: 'action.avoid', name: '暂时不要做建议', description: '涉及混配、加量或安全间隔期时的阻断提示。', category: 'ACTION', content: JSON.stringify({ type: 'AVOID', title: '暂时不要自行用药', description: '不要自行混配、加量或缩短安全间隔期。', dueRule: 'AFTER_EXPERT_REVIEW', safetyLevel: 'BLOCKED', taskDefault: false }) },
  { key: 'image_quality.too_dark', name: '图片质量：画面偏暗', description: '图片质量检查提示。', category: 'IMAGE_QUALITY', content: JSON.stringify({ issueCode: 'IMAGE_TOO_DARK', title: '画面偏暗', message: '建议移到自然光下重新拍摄；也可以继续提交。', allowContinue: true, severity: 'WARNING' }) },
  { key: 'safety.uncertain-pesticide', name: '安全提醒：暂不自行用药', description: '涉及用药时的安全边界。', category: 'SAFETY', content: JSON.stringify({ ruleCode: 'UNVERIFIED_PESTICIDE', title: '暂不建议自行用药', message: '结果不足以支持具体用药，请先查询有效登记和产品标签，或咨询当地农技人员。', blockAction: true, requiredEscalation: 'LOCAL_AGRONOMIST', allowDose: false }) },
  { key: 'expert_review.high-risk', name: '专家复核：高风险', description: '高风险时的升级提示。', category: 'EXPERT_REVIEW', content: JSON.stringify({ triggerCode: 'HIGH_RISK', title: '建议农技人员复核', message: '当前风险较高，请先隔离标记并联系当地农技人员复核。', actionLabel: '补拍并提交复核', required: true }) },
  { key: 'home.quick-start', name: '首页拍照引导', description: '首页主操作区域的辅助说明。', category: 'HOME', content: JSON.stringify({ title: '拍下作物异常部位', description: '靠近病斑，保持光线均匀，拍清叶片边缘。', badge: '约 30 秒得到初步判断' }) },
  { key: 'home.disclaimer', name: '首页辅助判断声明', description: '首页对 AI 结果边界的说明。', category: 'HOME', content: JSON.stringify({ title: '辅助判断', description: '结果需要结合田间情况确认，不代替农技人员诊断。' }) },
];
