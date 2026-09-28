// CAREVAULT Audit Vault API Routes
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { auditVault } from '../services/auditVault.js';

const router = Router();

// Require authentication for audit log access
router.use(authenticateToken);

/**
 * Get audit log stream with optional filters
 * GET /api/audit/logs?role=&action=&result=&limit=
 */
router.get('/logs', (req, res) => {
  const { role, action, result, limit } = req.query;

  const logs = auditVault.getLogs({
    role,
    action,
    result,
    limit: limit ? parseInt(limit, 10) : 100,
  });

  const stats = auditVault.getStats();

  return res.json({
    totalCount: logs.length,
    stats,
    logs,
  });
});

/**
 * Get summary stats
 * GET /api/audit/stats
 */
router.get('/stats', (req, res) => {
  return res.json(auditVault.getStats());
});

export default router;
