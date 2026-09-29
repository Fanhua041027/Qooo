export type JevStage = 'JUDGMENT' | 'EXECUTION' | 'VERIFICATION' | 'REASSESSMENT' | 'CLOSED';

const transitions: Record<JevStage, JevStage[]> = {
  JUDGMENT: ['EXECUTION', 'REASSESSMENT', 'CLOSED'],
  EXECUTION: ['VERIFICATION', 'REASSESSMENT'],
  VERIFICATION: ['REASSESSMENT', 'CLOSED'],
  REASSESSMENT: ['JUDGMENT', 'CLOSED'],
  CLOSED: [],
};

export function canTransitionJev(input: {
  from: JevStage;
  to: JevStage;
  hasTask?: boolean;
  hasNewEvidence?: boolean;
}): { allowed: boolean; reasonCode?: 'TRANSITION_NOT_ALLOWED' | 'TASK_REQUIRED' | 'NEW_EVIDENCE_REQUIRED' } {
  if (!transitions[input.from].includes(input.to)) return { allowed: false, reasonCode: 'TRANSITION_NOT_ALLOWED' };
  if (input.to === 'EXECUTION' && !input.hasTask) return { allowed: false, reasonCode: 'TASK_REQUIRED' };
  if (input.from === 'REASSESSMENT' && input.to === 'JUDGMENT' && !input.hasNewEvidence) {
    return { allowed: false, reasonCode: 'NEW_EVIDENCE_REQUIRED' };
  }
  return { allowed: true };
}

