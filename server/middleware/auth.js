// CAREVAULT Role-Based Access Control (RBAC) & Boundary Enforcement Middleware
import jwt from 'jsonwebtoken';
import { auditVault } from '../services/auditVault.js';

const JWT_SECRET = process.env.JWT_SECRET || 'carevault-secret-key-2026-hackathon';

export const USERS = {
  clinician: {
    id: 'CLIN-8821',
    email: 'dr.kulkarni@citycare.org',
    role: 'CLINICIAN',
    name: 'Dr. Ananya Kulkarni',
    facility: 'CityCare Hospital, Pune',
    specialization: 'General Medicine',
    mfaVerified: true,
  },
  admin: {
    id: 'ADM-9012',
    email: 'rajesh.varma@publichealth.gov',
    role: 'ADMIN',
    name: 'Dr. Rajesh Varma',
    facility: 'State Epidemiological Bureau',
    title: 'Director of Public Health Surveillance',
    mfaVerified: true,
  },
  patient: {
    id: 'PT-2048',
    email: 'aarav.sharma@gmail.com',
    role: 'PATIENT',
    name: 'Aarav Sharma',
    patientReference: 'PT-2048',
    mfaVerified: true,
  },
};

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      facility: user.facility || null,
      patientReference: user.patientReference || null,
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
}

/**
 * Validates JWT token from Authorization header or query parameter
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) || req.query.token;

  if (!token) {
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Authentication token required to access CAREVAULT boundary.',
      policyCheck: {
        authentication: false,
        authorization: false,
        boundary: 'BLOCKED_AT_PERIMETER',
      },
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'Session has expired or token signature is invalid.',
      policyCheck: {
        authentication: false,
        authorization: false,
      },
    });
  }
}

/**
 * Enforces role boundaries at API route level
 * @param {string[]} allowedRoles Array of permitted roles (e.g. ['CLINICIAN'])
 */
export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'UNAUTHENTICATED' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      // Log boundary breach attempt in Audit Vault
      const endpoint = req.originalUrl;
      const isClinicalAttemptByAdmin = req.user.role === 'ADMIN' && endpoint.includes('/clinical/');
      const reason = isClinicalAttemptByAdmin
        ? 'Patient-level access is not permitted for this role.'
        : `Role '${req.user.role}' is not authorized to access endpoint '${endpoint}'.`;

      auditVault.logEvent({
        actor: req.user.name || 'Unknown Actor',
        actorId: req.user.id,
        role: req.user.role,
        facility: req.user.facility || 'External',
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        purpose: req.headers['x-purpose'] || 'Direct Endpoint Probe',
        resource: endpoint,
        result: 'DENIED',
        reason,
        severity: 'HIGH',
        explainability: {
          identityVerified: true,
          rolePermitted: false,
          facilityMatch: false,
          consentActive: false,
          purposePermitted: false,
          scopePermitted: false,
        },
        metadata: {
          requestedEndpoint: endpoint,
          userRole: req.user.role,
          requiredRoles: allowedRoles,
          clientIp: req.ip || '127.0.0.1',
        },
      });

      return res.status(403).json({
        error: 'FORBIDDEN',
        message: reason,
        policyDecision: {
          identityVerified: true,
          rolePermitted: false,
          facilityMatch: false,
          consentActive: false,
          purposePermitted: false,
          scopePermitted: false,
          userRole: req.user.role,
          permittedRoles: allowedRoles,
          boundaryStatus: 'ACCESS_DENIED_AT_DATA_BOUNDARY',
        },
      });
    }

    next();
  };
}
