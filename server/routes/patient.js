// CAREVAULT Patient Self-Service Portal API Routes
// Lightweight "My Health Access" view
import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { PATIENTS } from '../data/syntheticData.js';
import { auditVault } from '../services/auditVault.js';

const router = Router();

// Apply authentication AND require PATIENT role
router.use(authenticateToken);
router.use(requireRole(['PATIENT']));

/**
 * Get patient self profile & access audit trail
 * GET /api/patient/my-record
 */
router.get('/my-record', (req, res) => {
  const patientId = req.query.patientId || req.user.patientReference || 'PT-2048';
  const patient = PATIENTS[patientId];

  if (!patient) {
    return res.status(404).json({ error: 'PATIENT_NOT_FOUND' });
  }

  // Find all audit logs targeting this patient
  const patientLogs = auditVault.getLogs({ limit: 100 }).filter(l =>
    l.resource.includes(patientId)
  );

  return res.json({
    patient: {
      id: patient.id,
      qrCodeId: patient.qrCodeId,
      name: patient.demographics.name,
      age: patient.demographics.age,
      gender: patient.demographics.gender,
      bloodGroup: patient.demographics.bloodGroup,
      facility: patient.demographics.facility,
      consent: patient.consent,
      allergies: patient.longitudinalRecord?.allergies || [],
      chronicConditions: patient.longitudinalRecord?.chronicConditions || [],
      prescriptions: patient.longitudinalRecord?.prescriptions || [],
      recentVisitsCount: patient.longitudinalRecord?.visits?.length || 0,
    },
    accessHistory: patientLogs.map(l => ({
      id: l.id,
      timestamp: l.timestamp,
      actor: l.actor,
      role: l.role,
      facility: l.facility,
      purpose: l.purpose,
      action: l.action,
      result: l.result,
      reason: l.reason,
      scope: l.metadata?.scope || 'Standard Authorized Scope',
    })),
  });
});

/**
 * Toggle patient consent (Active / Revoked)
 * POST /api/patient/toggle-consent
 */
router.post('/toggle-consent', (req, res) => {
  const patientId = req.body?.patientId || req.user.patientReference || 'PT-2048';
  const patient = PATIENTS[patientId];

  if (!patient) {
    return res.status(404).json({ error: 'PATIENT_NOT_FOUND' });
  }

  const currentStatus = patient.consent.status;
  const newStatus = currentStatus === 'ACTIVE' ? 'REVOKED' : 'ACTIVE';
  patient.consent.status = newStatus;

  auditVault.logEvent({
    actor: patient.demographics.name,
    actorId: patient.id,
    role: 'PATIENT',
    facility: patient.demographics.facility,
    action: 'CONSENT_STATUS_MODIFIED',
    purpose: 'Patient Consent Self-Governance',
    resource: `Patient ${patientId}`,
    result: 'ALLOWED',
    reason: `Patient explicitly updated consent state to '${newStatus}'`,
    severity: 'MEDIUM',
    explainability: {
      identityVerified: true,
      rolePermitted: true,
    },
  });

  return res.json({
    status: 'UPDATED',
    consentStatus: newStatus,
    message: `Your clinical record consent is now ${newStatus}.`,
  });
});

export default router;
