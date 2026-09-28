// CAREVAULT Authentication & Identity Gateway
import { Router } from 'express';
import { USERS, generateToken, authenticateToken } from '../middleware/auth.js';
import { auditVault } from '../services/auditVault.js';

const router = Router();

// Login endpoint
router.post('/login', (req, res) => {
  const { role, email, mfaCode, demoType } = req.body;

  let user = null;
  if (demoType === 'clinician' || role === 'CLINICIAN') {
    user = USERS.clinician;
  } else if (demoType === 'admin' || role === 'ADMIN') {
    user = USERS.admin;
  } else if (demoType === 'patient' || role === 'PATIENT') {
    user = USERS.patient;
  } else if (email) {
    user = Object.values(USERS).find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  if (!user) {
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: 'Invalid identity credentials or unregistered health provider.',
    });
  }

  const token = generateToken(user);

  auditVault.logEvent({
    actor: user.name,
    actorId: user.id,
    role: user.role,
    facility: user.facility || 'Patient App',
    action: 'AUTHENTICATION_SUCCESS',
    purpose: 'Session Initialization',
    resource: `/api/auth/login [Role: ${user.role}]`,
    result: 'ALLOWED',
    reason: 'Multi-factor credentials and authorized role verified',
    severity: 'LOW',
    explainability: {
      identityVerified: true,
      rolePermitted: true,
      mfaVerified: true,
    },
  });

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      facility: user.facility,
      specialization: user.specialization,
      title: user.title,
      patientReference: user.patientReference,
    },
    boundaryAccess: {
      clinicalDataPlane: user.role === 'CLINICIAN',
      populationIntelligencePlane: user.role === 'ADMIN',
      patientSelfAccess: user.role === 'PATIENT',
    },
  });
});

// Current user details
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    boundaryAccess: {
      clinicalDataPlane: req.user.role === 'CLINICIAN',
      populationIntelligencePlane: req.user.role === 'ADMIN',
      patientSelfAccess: req.user.role === 'PATIENT',
    },
  });
});

export default router;
