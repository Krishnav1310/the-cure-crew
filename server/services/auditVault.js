// CAREVAULT Audit Vault Service
// Immutable, explainable security and privacy audit log stream

import { v4 as uuidv4 } from 'uuid';

class AuditVault {
  constructor() {
    this.logs = [];
    this.seedInitialLogs();
  }

  seedInitialLogs() {
    const baseTime = new Date('2026-09-27T08:00:00Z').getTime();
    const initialEvents = [
      {
        id: uuidv4(),
        timestamp: new Date(baseTime + 12 * 60000).toISOString(),
        actor: 'Dr. Ananya Kulkarni',
        actorId: 'CLIN-8821',
        role: 'CLINICIAN',
        facility: 'CityCare Hospital, Pune',
        action: 'CLINICAL_RECORD_VIEW',
        purpose: 'Treatment',
        resource: 'Patient PT-2048',
        result: 'ALLOWED',
        reason: 'Valid treatment relationship and active patient consent verified',
        severity: 'LOW',
        explainability: {
          identityVerified: true,
          rolePermitted: true,
          facilityMatch: true,
          consentActive: true,
          purposePermitted: true,
          scopePermitted: true,
        },
      },
      {
        id: uuidv4(),
        timestamp: new Date(baseTime + 45 * 60000).toISOString(),
        actor: 'Dr. Rajesh Varma',
        actorId: 'ADM-9012',
        role: 'ADMIN',
        facility: 'State Epidemiological Bureau',
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        purpose: 'Direct Patient Investigation',
        resource: 'Patient PT-2048 (/api/clinical/patients/PT-2048)',
        result: 'DENIED',
        reason: 'Patient-level access is prohibited for Administrator role by backend firewall policy',
        severity: 'HIGH',
        explainability: {
          identityVerified: true,
          rolePermitted: false,
          facilityMatch: false,
          consentActive: false,
          purposePermitted: false,
          scopePermitted: false,
        },
      },
      {
        id: uuidv4(),
        timestamp: new Date(baseTime + 72 * 60000).toISOString(),
        actor: 'Dr. Rajesh Varma',
        actorId: 'ADM-9012',
        role: 'ADMIN',
        facility: 'State Epidemiological Bureau',
        action: 'AGGREGATE_QUERY',
        purpose: 'Regional Dengue Surveillance',
        resource: 'Region: Pune, Condition: Dengue, Period: August–September',
        result: 'ALLOWED',
        reason: 'Threshold satisfied (N=342 >= 5); zero individual identifiers returned',
        severity: 'LOW',
        explainability: {
          identityVerified: true,
          rolePermitted: true,
          kThresholdSatisfied: true,
          differencingRiskCleared: true,
          identifiersExcluded: true,
        },
      },
      {
        id: uuidv4(),
        timestamp: new Date(baseTime + 95 * 60000).toISOString(),
        actor: 'Dr. Rajesh Varma',
        actorId: 'ADM-9012',
        role: 'ADMIN',
        facility: 'State Epidemiological Bureau',
        action: 'AGGREGATE_QUERY',
        purpose: 'Vulnerable Population Surveillance',
        resource: 'Region: Kolhapur, Condition: Malaria, Age: 70+',
        result: 'SUPPRESSED',
        reason: 'Group size (3) is below privacy threshold (K=5). Re-identification risk mitigated.',
        severity: 'MEDIUM',
        explainability: {
          identityVerified: true,
          rolePermitted: true,
          kThresholdSatisfied: false,
          differencingRiskCleared: true,
          identifiersExcluded: true,
        },
      },
    ];

    this.logs = initialEvents;
  }

  logEvent({
    actor = 'System',
    actorId = 'SYS-001',
    role = 'SYSTEM',
    facility = 'CAREVAULT Core',
    action,
    purpose = 'General Operation',
    resource,
    result,
    reason,
    severity = 'LOW',
    explainability = {},
    metadata = {},
  }) {
    const logEntry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      actor,
      actorId,
      role,
      facility,
      action,
      purpose,
      resource,
      result,
      reason,
      severity,
      explainability,
      metadata,
    };

    // Prepend new logs to maintain reverse chronological order
    this.logs.unshift(logEntry);

    // Keep up to 500 audit entries in memory
    if (this.logs.length > 500) {
      this.logs = this.logs.slice(0, 500);
    }

    return logEntry;
  }

  getLogs({ role, action, result, limit = 50 } = {}) {
    let filtered = [...this.logs];

    if (role) {
      filtered = filtered.filter(l => l.role.toUpperCase() === role.toUpperCase());
    }
    if (action) {
      filtered = filtered.filter(l => l.action.toUpperCase() === action.toUpperCase());
    }
    if (result) {
      filtered = filtered.filter(l => l.result.toUpperCase() === result.toUpperCase());
    }

    return filtered.slice(0, limit);
  }

  getStats() {
    const total = this.logs.length;
    const allowed = this.logs.filter(l => l.result === 'ALLOWED').length;
    const denied = this.logs.filter(l => l.result === 'DENIED').length;
    const suppressed = this.logs.filter(l => l.result === 'SUPPRESSED').length;
    const blocked = this.logs.filter(l => l.result === 'BLOCKED').length;
    const breakGlass = this.logs.filter(l => l.action === 'BREAK_GLASS_ACCESS').length;

    return { total, allowed, denied, suppressed, blocked, breakGlass };
  }
}

export const auditVault = new AuditVault();
