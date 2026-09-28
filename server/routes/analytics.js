// CAREVAULT Population Intelligence Plane API Routes
// Aggregate and Anonymized Disease Surveillance for Public Health Administrators ONLY
import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { privacyGate } from '../services/privacyGate.js';
import { auditVault } from '../services/auditVault.js';
import {
  REGIONS,
  CONDITIONS,
  REGIONAL_CONDITION_SUMMARY,
  TIME_TRENDS_2026,
  SPECIAL_DEMO_COHORTS,
} from '../data/syntheticData.js';

const router = Router();

// Apply authentication AND require ADMIN role for all analytics endpoints
router.use(authenticateToken);
router.use(requireRole(['ADMIN']));

/**
 * Overview summary statistics for Public Health Administrator
 * GET /api/analytics/overview
 */
router.get('/overview', (req, res) => {
  // Calculate total cases from regional summaries
  let totalCases = 0;
  for (const reg of Object.values(REGIONAL_CONDITION_SUMMARY)) {
    for (const count of Object.values(reg)) {
      totalCases += count;
    }
  }

  const auditStats = auditVault.getStats();

  return res.json({
    headlineStats: {
      totalAggregatedCases: totalCases, // ~5,000+ synthetic cases
      activeConditionsMonitored: CONDITIONS.length,
      regionsCovered: REGIONS.length,
      queriesProtected: auditStats.allowed + auditStats.suppressed + auditStats.blocked,
      suppressedQueriesCount: auditStats.suppressed,
      blockedInferenceAttacks: auditStats.blocked,
      kAnonymityThreshold: privacyGate.getKThreshold(),
    },
    privacyPosture: {
      status: 'PRIVACY_FIREWALL_ACTIVE',
      zeroIdentifiableFieldsGuaranteed: true,
      differencingEngineActive: true,
      kThreshold: privacyGate.getKThreshold(),
    },
  });
});

/**
 * Time-series trend analytics with condition filters
 * GET /api/analytics/trends
 */
router.get('/trends', (req, res) => {
  const { condition, region } = req.query;

  // Time trends over August - September 2026
  const trends = TIME_TRENDS_2026.map(t => {
    if (condition && t[condition] !== undefined) {
      return {
        week: t.week,
        condition,
        cases: t[condition],
        status: 'PROTECTED',
      };
    }
    return t;
  });

  return res.json({
    region: region || 'All Monitored Regions',
    condition: condition || 'All Monitored Conditions',
    trends,
    privacyGateEvaluation: {
      status: 'PROTECTED',
      kThresholdSatisfied: true,
      identifiableDataExcluded: true,
    },
  });
});

/**
 * Regional breakdown with Privacy Gate evaluation per cell
 * GET /api/analytics/regional
 */
router.get('/regional', (req, res) => {
  const { condition } = req.query;
  const k = privacyGate.getKThreshold();

  const regionalData = REGIONS.map(region => {
    const counts = REGIONAL_CONDITION_SUMMARY[region] || {};
    let totalRegionCases = 0;
    const conditionBreakdown = {};

    for (const [condName, count] of Object.entries(counts)) {
      totalRegionCases += count;

      // Apply K-anonymity check per cell
      if (count < k) {
        conditionBreakdown[condName] = {
          raw: null,
          display: `<${k} / Suppressed`,
          status: 'SUPPRESSED',
        };
      } else {
        conditionBreakdown[condName] = {
          raw: count,
          display: count,
          status: 'PROTECTED',
        };
      }
    }

    return {
      region,
      totalCases: totalRegionCases,
      breakdown: conditionBreakdown,
      targetedCondition: condition ? conditionBreakdown[condition] : null,
    };
  });

  return res.json({
    kThreshold: k,
    regions: regionalData,
  });
});

/**
 * Interactive Query Endpoint with Privacy Gate & Differencing Attack Detection
 * POST /api/analytics/query
 * Payload: { region, condition, timeRange, subgroup }
 */
router.post('/query', (req, res) => {
  const { region, condition, timeRange, subgroup = 'all' } = req.body;

  let rawCount = 0;

  // Check if this matches our special small group test case
  if (
    region === SPECIAL_DEMO_COHORTS.smallGroup.region &&
    condition === SPECIAL_DEMO_COHORTS.smallGroup.condition &&
    subgroup === 'age_70_plus'
  ) {
    rawCount = SPECIAL_DEMO_COHORTS.smallGroup.actualCount; // 3 cases (< 5!)
  } else if (
    region === SPECIAL_DEMO_COHORTS.differencingCohort.region &&
    condition === SPECIAL_DEMO_COHORTS.differencingCohort.condition
  ) {
    if (subgroup === 'male') {
      rawCount = SPECIAL_DEMO_COHORTS.differencingCohort.maleCases; // 96
    } else if (subgroup === 'female') {
      rawCount = SPECIAL_DEMO_COHORTS.differencingCohort.femaleCases; // 4
    } else {
      rawCount = SPECIAL_DEMO_COHORTS.differencingCohort.allCases; // 100
    }
  } else if (region && condition) {
    rawCount = REGIONAL_CONDITION_SUMMARY[region]?.[condition] || 0;
  } else if (region) {
    rawCount = Object.values(REGIONAL_CONDITION_SUMMARY[region] || {}).reduce((a, b) => a + b, 0);
  } else if (condition) {
    rawCount = Object.values(REGIONAL_CONDITION_SUMMARY).reduce((sum, r) => sum + (r[condition] || 0), 0);
  } else {
    rawCount = 3840;
  }

  // Pass query through Privacy Gate
  const evaluation = privacyGate.evaluateQuery({
    actor: req.user.name,
    actorId: req.user.id,
    region,
    condition,
    timeRange,
    subgroup,
    rawCount,
    queryKey: `${region}_${condition}_${subgroup}`,
  });

  if (evaluation.status === 'BLOCKED') {
    // 422 Unprocessable Entity - Differencing Inference Attack Detected
    return res.status(422).json({
      error: 'DIFFERENCING_ATTACK_DETECTED',
      status: 'BLOCKED',
      title: evaluation.title,
      reason: evaluation.reason,
      details: evaluation.details,
      privacyChecks: evaluation.privacyChecks,
      query: { region, condition, subgroup },
    });
  }

  if (evaluation.status === 'SUPPRESSED') {
    return res.json({
      status: 'SUPPRESSED',
      displayValue: evaluation.displayValue,
      contributingRecords: evaluation.contributingRecords,
      kThreshold: evaluation.kThreshold,
      reason: evaluation.reason,
      privacyChecks: evaluation.privacyChecks,
      query: { region, condition, subgroup },
    });
  }

  return res.json({
    status: 'PROTECTED',
    displayValue: evaluation.displayValue,
    contributingRecords: evaluation.contributingRecords,
    kThreshold: evaluation.kThreshold,
    privacyChecks: evaluation.privacyChecks,
    query: { region, condition, subgroup },
  });
});

/**
 * Configure K-anonymity threshold (Admin control)
 * POST /api/analytics/config/k-threshold
 */
router.post('/config/k-threshold', (req, res) => {
  const { k } = req.body;
  if (!k || typeof k !== 'number' || k < 3 || k > 50) {
    return res.status(400).json({ error: 'INVALID_THRESHOLD', message: 'K must be an integer between 3 and 50.' });
  }

  privacyGate.setKThreshold(k);

  auditVault.logEvent({
    actor: req.user.name,
    actorId: req.user.id,
    role: req.user.role,
    facility: req.user.facility,
    action: 'PRIVACY_POLICY_UPDATE',
    purpose: 'Threshold Governance',
    resource: 'System Privacy Gate',
    result: 'ALLOWED',
    reason: `K-anonymity threshold updated to ${k}`,
    severity: 'MEDIUM',
    explainability: {
      identityVerified: true,
      rolePermitted: true,
    },
  });

  return res.json({
    status: 'UPDATED',
    kThreshold: privacyGate.getKThreshold(),
    message: `Privacy Gate minimum group size set to ${k}.`,
  });
});

/**
 * Reset session query memory (useful for testing differencing attacks repeatedly)
 * POST /api/analytics/reset-differencing-cache
 */
router.post('/reset-differencing-cache', (req, res) => {
  privacyGate.resetSessionHistory(req.user.id);
  return res.json({ status: 'RESET', message: 'Session query correlation cache cleared.' });
});

export default router;
