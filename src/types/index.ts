// CAREVAULT TypeScript Domain Models

export type UserRole = 'CLINICIAN' | 'ADMIN' | 'PATIENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  facility?: string;
  specialization?: string;
  title?: string;
  patientReference?: string;
}

export interface PatientDemographics {
  name: string;
  age: number;
  sex: string;
  bloodGroup: string;
  contact?: string;
  facility: string;
  primaryCarePhysician?: string;
}

export interface PatientConsent {
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  grantedAt: string;
  expiresAt: string;
  allowedPurposes: string[];
  allowedScopes: string[];
  revocableByPatient?: boolean;
}

export interface Allergy {
  allergen: string;
  reaction: string;
  severity: 'LOW' | 'MODERATE' | 'HIGH';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency?: string;
  purpose?: string;
}

export interface CriticalSafetyRecord {
  bloodGroup: string;
  criticalAllergies: Allergy[];
  currentMedications: Medication[];
  criticalAlerts: string[];
  note?: string;
}

export interface Observation {
  test: string;
  result: string;
  normalRange?: string;
  flag?: 'NORMAL' | 'LOW' | 'HIGH' | 'ABNORMAL' | 'SLIGHTLY_ELEVATED' | 'ELEVATED';
  interpretation?: string;
}

export interface Prescription {
  drug: string;
  dosage: string;
  route?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
}

export interface ClinicalVisit {
  id: string;
  date: string;
  facility: string;
  clinician: string;
  type: string;
  chiefComplaint: string;
  diagnosis: {
    code: string;
    condition: string;
    category: string;
    notes?: string;
  };
  vitals?: {
    temperature: string;
    bloodPressure: string;
    pulse: string;
    respiratoryRate: string;
    spO2: string;
  };
  prescriptions: Prescription[];
  observations: Observation[];
}

export interface PatientRecord {
  id: string;
  qrCodeId?: string;
  demographics: PatientDemographics;
  consent: PatientConsent;
  criticalSafety: CriticalSafetyRecord;
  timeline: ClinicalVisit[];
}

export interface PrivacyCheckItem {
  name: string;
  passed: boolean;
  detail?: string;
  warning?: string;
  error?: string;
}

export interface PrivacyEvaluation {
  status: 'PROTECTED' | 'SUPPRESSED' | 'BLOCKED';
  isAllowed?: boolean;
  isSuppressed?: boolean;
  isBlocked?: boolean;
  displayValue?: string | number;
  contributingRecords?: number;
  kThreshold?: number;
  reason?: string;
  title?: string;
  details?: string;
  privacyChecks?: PrivacyCheckItem[];
  query?: {
    region?: string;
    condition?: string;
    subgroup?: string;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorId: string;
  role: string;
  facility: string;
  action: string;
  purpose: string;
  resource: string;
  result: 'ALLOWED' | 'DENIED' | 'SUPPRESSED' | 'BLOCKED';
  reason: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  explainability?: Record<string, boolean>;
  metadata?: Record<string, any>;
}

export interface SecurityScenario {
  id: number;
  title: string;
  category: string;
  actorRole: string;
  endpoint: string;
  description: string;
  expectedStatus: number;
  expectedOutcome: string;
}
