export type DiagnosisStatus =
  | 'created'
  | 'uploading'
  | 'analyzing'
  | 'completed'
  | 'need_more_images'
  | 'need_expert_review'
  | 'failed';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'pending' | 'completed' | 'overdue' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ApiSuccess<T> {
  code: 'OK';
  message: 'success';
  data: T;
  requestId: string;
  traceId: string;
}

export interface ApiFailure {
  code: string;
  message: string;
  details: Record<string, unknown>;
  requestId: string;
  traceId: string;
}

export interface DiagnosisProblem {
  name: string;
  confidence: number;
  riskLevel: RiskLevel;
  evidence: string[];
  lookalikes: string[];
}

export interface DiagnosisAction {
  type?: 'DO_NOW' | 'OBSERVE' | 'AVOID' | 'EXPERT_REVIEW';
  title: string;
  description: string;
  priority: 'now' | 'today' | 'follow_up';
  dueAt?: string;
  safetyLevel?: 'OBSERVATION' | 'BIOSECURITY' | 'CHEMICAL_REVIEW';
}

export interface DiagnosisResult {
  decision: 'result' | 'ask_more' | 'expert_review' | 'rejected';
  model: {
    name: string;
    version: string;
    traceId: string;
    knowledgeVersion: string;
    promptVersion: string;
    policyVersion: string;
    configVersion?: string;
    configSnapshot?: Record<string, string>;
  };
  crop: string;
  stage: string;
  possibleProblems: DiagnosisProblem[];
  actions: DiagnosisAction[];
  avoidActions: string[];
  followUpQuestions: Array<{ code: string; prompt: string; captureHint?: string }>;
  needExpertReview: boolean;
  expertReviewReasons: string[];
  needMoreImages: boolean;
  safety: { passed: boolean; violationCodes: string[] };
  disclaimer: string;
}

export interface DiagnosisRecord {
  id: string;
  status: DiagnosisStatus;
  cropName?: string | null;
  growthStage?: string | null;
  result?: DiagnosisResult | null;
  failureCode?: string | null;
  failureMessage?: string | null;
  requestId: string;
  traceId: string;
  createdAt: string;
  updatedAt: string;
}
