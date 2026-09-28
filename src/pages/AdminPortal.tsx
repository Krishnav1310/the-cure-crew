// CAREVAULT Public Health Intelligence & Privacy Gate — Clean & User-Friendly
import React, { useState } from 'react';
import {
  BarChart3,
  ShieldCheck,
  EyeOff,
  AlertTriangle,
  Lock,
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { PrivacyEvaluation } from '../types';

export const AdminPortal: React.FC<{ initialTab?: string }> = () => {
  const { token } = useAuth();

  // Privacy Gate Live Evaluation State
  const [evaluation, setEvaluation] = useState<PrivacyEvaluation>({
    status: 'PROTECTED',
    isAllowed: true,
    displayValue: 342,
    contributingRecords: 342,
    kThreshold: 5,
    reason: 'Threshold satisfied (N=342 ≥ 5); zero individual identifiers returned.',
    privacyChecks: [
      { name: 'Administrator authorized for aggregate analytics', passed: true },
      { name: 'Individual identifiers excluded', passed: true },
      { name: 'Minimum group threshold checked (K ≥ 5)', passed: true },
      { name: 'Query combination checked', passed: true },
      { name: 'Re-identification risk checked', passed: true },
    ],
    query: { region: 'Pune', condition: 'Dengue', subgroup: 'all' },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Time trend data for chart
  const trendData = [
    { week: 'W31', Dengue: 142, Respiratory: 230, Malaria: 45 },
    { week: 'W32', Dengue: 186, Respiratory: 245, Malaria: 52 },
    { week: 'W33', Dengue: 240, Respiratory: 270, Malaria: 68 },
    { week: 'W34', Dengue: 295, Respiratory: 290, Malaria: 74 },
    { week: 'W35', Dengue: 350, Respiratory: 310, Malaria: 88 },
    { week: 'W36', Dengue: 388, Respiratory: 335, Malaria: 94 },
    { week: 'W37', Dengue: 420, Respiratory: 360, Malaria: 102 },
    { week: 'W38', Dengue: 395, Respiratory: 340, Malaria: 89 },
  ];

  // Execute interactive queries through backend Privacy Gate
  const testNormalQuery = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics/query', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: 'Pune', condition: 'Dengue', subgroup: 'all' }),
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const testSmallGroup = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics/query', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: 'Kolhapur', condition: 'Malaria', subgroup: 'age_70_plus' }),
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const testDifferencingAttack = async () => {
    setIsLoading(true);
    try {
      // Step 1: All = 100
      await fetch('/api/analytics/query', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: 'Pune', condition: 'Dengue', subgroup: 'all' }),
      });
      // Step 2: Male = 96 (Difference is 4 < K!)
      const res = await fetch('/api/analytics/query', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: 'Pune', condition: 'Dengue', subgroup: 'male' }),
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-dusty-dark font-bold uppercase tracking-wider">
            Population Intelligence Plane
          </span>
          <h1 className="text-xl font-bold text-ink">Public Health Disease Surveillance</h1>
          <p className="text-xs text-charcoal-muted">
            Aggregated epidemiology monitoring across Maharashtra municipal zones • Zero PII guaranteed
          </p>
        </div>

        <div className="text-xs font-mono bg-dusty-subtle text-dusty-dark px-3 py-1.5 rounded-lg border border-dusty/30 font-bold self-start sm:self-auto">
          PRIVACY GATE: ACTIVE (K ≥ 5)
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-warm-50 p-4 rounded-xl border border-warm-300 shadow-subtle">
          <span className="text-xs font-mono text-charcoal-muted uppercase">Total Aggregated Cases</span>
          <div className="text-2xl font-bold text-ink mt-1">5,434</div>
          <span className="text-[11px] text-sage font-medium">All identifiers scrubbed</span>
        </div>

        <div className="bg-warm-50 p-4 rounded-xl border border-warm-300 shadow-subtle">
          <span className="text-xs font-mono text-charcoal-muted uppercase">Active Outbreak Priorities</span>
          <div className="text-2xl font-bold text-ink mt-1">6 Priority Conditions</div>
          <span className="text-[11px] text-dusty-dark font-medium">Dengue, Malaria, Respiratory</span>
        </div>

        <div className="bg-warm-50 p-4 rounded-xl border border-warm-300 shadow-subtle">
          <span className="text-xs font-mono text-charcoal-muted uppercase">Monitored Zones</span>
          <div className="text-2xl font-bold text-ink mt-1">5 Municipal Regions</div>
          <span className="text-[11px] text-charcoal-muted">Pune, Mumbai, Nashik, Nagpur, Kolhapur</span>
        </div>
      </div>

      {/* Epidemic Trends Chart */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-warm-300">
          <div>
            <h3 className="text-base font-bold text-ink">Weekly Outbreak Progression (August–September 2026)</h3>
            <p className="text-xs text-charcoal-muted">Cross-hospital symptom reporting & diagnosis curves</p>
          </div>
          <TrendingUp className="w-5 h-5 text-dusty" />
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFECE4" />
              <XAxis dataKey="week" stroke="#8B939A" fontSize={11} />
              <YAxis stroke="#8B939A" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FAF9F6', borderColor: '#E4DFD5', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="Dengue" stroke="#5E806B" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Respiratory" stroke="#7896A8" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Malaria" stroke="#C8755A" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* The Privacy Gate Interactive Tester */}
      <div className="bg-gradient-to-r from-warm-100 to-warm-50 border-2 border-amber/50 rounded-2xl p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-warm-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-dark animate-pulse" />
              <h3 className="text-base font-bold text-ink">Privacy Gate Firewall Inspector</h3>
            </div>
            <p className="text-xs text-charcoal-muted">
              Click any scenario below to see the backend Privacy Gate enforce K-anonymity and differencing protection in real-time.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-dark">K ≥ 5 RULE</span>
        </div>

        {/* 3 Clickable Test Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={testNormalQuery}
            disabled={isLoading}
            className="p-3 rounded-xl bg-white border border-warm-300 hover:border-sage text-left transition-all shadow-subtle"
          >
            <span className="text-[10px] font-mono text-sage-dark font-bold uppercase block">Test 1</span>
            <strong className="text-xs text-ink block mt-0.5">Normal Query (N=342)</strong>
            <span className="text-[11px] text-charcoal-muted block mt-1">Pune Dengue • Meets K=5</span>
          </button>

          <button
            onClick={testSmallGroup}
            disabled={isLoading}
            className="p-3 rounded-xl bg-white border border-warm-300 hover:border-amber text-left transition-all shadow-subtle"
          >
            <span className="text-[10px] font-mono text-amber-dark font-bold uppercase block">Test 2</span>
            <strong className="text-xs text-ink block mt-0.5">Small Group (N=3)</strong>
            <span className="text-[11px] text-charcoal-muted block mt-1">Kolhapur Malaria Age 70+ • &lt;5</span>
          </button>

          <button
            onClick={testDifferencingAttack}
            disabled={isLoading}
            className="p-3 rounded-xl bg-white border border-warm-300 hover:border-mutedRed text-left transition-all shadow-subtle"
          >
            <span className="text-[10px] font-mono text-mutedRed font-bold uppercase block">Test 3</span>
            <strong className="text-xs text-ink block mt-0.5">Differencing Attack (100 - 96)</strong>
            <span className="text-[11px] text-charcoal-muted block mt-1">Reconstructs 4 cases • Blocked</span>
          </button>
        </div>

        {/* Live Output Card */}
        <div
          className={`p-4 rounded-xl border text-xs space-y-3 ${
            evaluation.status === 'PROTECTED'
              ? 'bg-white border-sage/40'
              : evaluation.status === 'SUPPRESSED'
              ? 'bg-amber-subtle border-amber'
              : 'bg-mutedRed-subtle border-mutedRed'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-warm-200">
            <div>
              <span
                className={`font-mono text-xs font-bold uppercase ${
                  evaluation.status === 'PROTECTED'
                    ? 'text-sage-dark'
                    : evaluation.status === 'SUPPRESSED'
                    ? 'text-amber-dark'
                    : 'text-mutedRed'
                }`}
              >
                STATUS: {evaluation.status}
              </span>
              <p className="text-charcoal text-xs mt-0.5 italic">"{evaluation.reason}"</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-charcoal-muted uppercase block">Display Value</span>
              <span
                className={`text-xl font-bold font-mono ${
                  evaluation.status === 'PROTECTED'
                    ? 'text-sage-dark'
                    : evaluation.status === 'SUPPRESSED'
                    ? 'text-amber-dark'
                    : 'text-mutedRed'
                }`}
              >
                {evaluation.displayValue !== undefined
                  ? typeof evaluation.displayValue === 'number'
                    ? `${evaluation.displayValue} cases`
                    : evaluation.displayValue
                  : 'QUERY BLOCKED'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {evaluation.privacyChecks?.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                {c.passed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-mutedRed shrink-0" />
                )}
                <span className={c.passed ? 'text-charcoal' : 'text-mutedRed font-bold'}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
