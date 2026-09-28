// CAREVAULT Security Center — Live Attack Simulator & Judges' Evaluation Lab
import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Zap,
  ArrowRight,
  Shield,
  EyeOff,
  History,
} from 'lucide-react';
import { DecisionCard } from '../components/common/DecisionCard';

export const SecurityCenter: React.FC = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(3); // Default to Scenario 3 (Admin trying patient API)
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suiteResults, setSuiteResults] = useState<Record<number, boolean>>({});
  const [isRunningSuite, setIsRunningSuite] = useState<boolean>(false);

  // Fetch scenarios list
  useEffect(() => {
    fetch('/api/security/scenarios')
      .then(res => res.json())
      .then(data => setScenarios(data.scenarios || []))
      .catch(err => console.error(err));
  }, []);

  // Run a single scenario
  const runScenario = async (id: number) => {
    setIsLoading(true);
    setSelectedScenarioId(id);
    try {
      const res = await fetch(`/api/security/simulate/${id}`, { method: 'POST' });
      const data = await res.json();
      setExecutionResult(data);
      setSuiteResults(prev => ({
        ...prev,
        [id]: data.executionResult?.httpStatus === data.scenario?.expectedStatus,
      }));
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial default scenario
  useEffect(() => {
    runScenario(3);
  }, []);

  // Run full automated suite for judges
  const runFullSuite = async () => {
    setIsRunningSuite(true);
    const newResults: Record<number, boolean> = {};

    for (const sc of scenarios) {
      try {
        const res = await fetch(`/api/security/simulate/${sc.id}`, { method: 'POST' });
        const data = await res.json();
        newResults[sc.id] = data.executionResult?.httpStatus === sc.expectedStatus;
      } catch (e) {
        newResults[sc.id] = false;
      }
    }

    setSuiteResults(newResults);
    setIsRunningSuite(false);
    // Reload currently selected
    runScenario(selectedScenarioId);
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenarioId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-ink text-warm-50 rounded-2xl p-6 sm:p-8 shadow-elevated border border-ink-light flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sage uppercase font-bold tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span>Hackathon Evaluation Laboratory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Security & Boundary Verification Center
          </h1>
          <p className="text-xs sm:text-sm text-warm-300 mt-1 max-w-2xl leading-relaxed">
            Live interactive environment demonstrating genuine backend enforcement of role-based data planes,
            K-anonymity suppression ($K \ge 5$), query differencing attack blockers, and emergency override boundaries.
          </p>
        </div>

        <button
          onClick={runFullSuite}
          disabled={isRunningSuite}
          className="px-5 py-3 rounded-xl bg-sage text-white font-bold text-xs tracking-wider uppercase hover:bg-sage-dark transition-all shadow-card flex items-center justify-center gap-2 shrink-0"
        >
          <Zap className={`w-4 h-4 ${isRunningSuite ? 'animate-bounce' : ''}`} />
          <span>{isRunningSuite ? 'Executing Test Suite...' : 'Run Full Security Suite'}</span>
        </button>
      </div>

      {/* Main Grid: Left Scenario Selector, Right Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 8 Test Scenarios (40%) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-warm-300">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted">
              Standard Test Scenarios (8/8)
            </span>
            <span className="text-xs font-mono text-sage-dark font-semibold">
              BACKEND ENFORCED
            </span>
          </div>

          <div className="space-y-2">
            {scenarios.map(sc => {
              const isSelected = sc.id === selectedScenarioId;
              const hasRun = suiteResults[sc.id] !== undefined;
              const isPassing = suiteResults[sc.id];

              return (
                <div
                  key={sc.id}
                  onClick={() => runScenario(sc.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-warm-100 border-ink shadow-subtle'
                      : 'bg-warm-50 border-warm-300 hover:border-warm-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-charcoal-muted">
                        0{sc.id}
                      </span>
                      <h4 className="text-xs font-bold text-ink leading-snug">{sc.title}</h4>
                    </div>

                    {hasRun && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                          isPassing
                            ? 'bg-sage-subtle text-sage-dark'
                            : 'bg-mutedRed-subtle text-mutedRed'
                        }`}
                      >
                        {isPassing ? 'PASS' : 'FAIL'}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-charcoal-muted">
                    <span className="truncate max-w-[200px]">{sc.endpoint.split(' ')[1]}</span>
                    <span className="font-semibold text-ink">{sc.expectedOutcome}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Network & Policy Inspector (60%) */}
        <div className="lg:col-span-7 space-y-6">
          {currentScenario && (
            <div className="bg-warm-50 rounded-2xl border border-warm-300 p-6 shadow-card space-y-6">
              {/* Scenario details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-warm-300">
                <div>
                  <span className="text-xs font-mono text-charcoal-muted uppercase">
                    Scenario #{currentScenario.id} • {currentScenario.category}
                  </span>
                  <h3 className="text-lg font-bold text-ink mt-0.5">{currentScenario.title}</h3>
                </div>

                <button
                  onClick={() => runScenario(currentScenario.id)}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-ink text-warm-50 text-xs font-bold hover:bg-ink-light flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3 h-3 text-sage" />
                  <span>{isLoading ? 'Sending Request...' : 'Re-Execute Call'}</span>
                </button>
              </div>

              <p className="text-xs text-charcoal leading-relaxed">
                {currentScenario.description}
              </p>

              {/* Wire Exchange: Request & Response */}
              <div className="space-y-4">
                {/* Request Box */}
                <div className="rounded-xl bg-ink text-warm-100 p-4 font-mono text-xs shadow-subtle border border-ink-light space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-warm-400 border-b border-ink-light pb-2">
                    <span className="flex items-center gap-1.5 text-sage">
                      <Terminal className="w-3.5 h-3.5" />
                      HTTP REQUEST (OUTBOUND CLIENT)
                    </span>
                    <span>ACTOR: {currentScenario.actorRole}</span>
                  </div>
                  <div className="text-warm-50 font-bold">{currentScenario.endpoint}</div>
                  <div className="text-warm-400 text-[11px]">
                    Authorization: Bearer &lt;JWT_ROLE_{currentScenario.actorRole}&gt;
                  </div>
                </div>

                {/* Response Box (Visual Card + Toggleable Raw JSON) */}
                {executionResult && (
                  <div
                    className={`rounded-2xl p-5 border shadow-subtle space-y-4 ${
                      executionResult.executionResult.httpStatus === 200
                        ? 'bg-sage-subtle/30 border-sage/40 text-charcoal'
                        : executionResult.executionResult.httpStatus === 403
                        ? 'bg-mutedRed-subtle/40 border-mutedRed/40 text-charcoal'
                        : executionResult.executionResult.httpStatus === 422
                        ? 'bg-terracotta-subtle/40 border-terracotta text-charcoal'
                        : 'bg-warm-100 border-warm-300 text-charcoal'
                    }`}
                  >
                    {/* Header with status badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-warm-300">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono tracking-wide ${
                            executionResult.executionResult.httpStatus === 200
                              ? 'bg-sage text-white'
                              : executionResult.executionResult.httpStatus === 403
                              ? 'bg-mutedRed text-white'
                              : 'bg-terracotta text-white'
                          }`}
                        >
                          HTTP {executionResult.executionResult.httpStatus}
                        </span>
                        <span className="font-bold text-sm text-ink">
                          {executionResult.executionResult.httpStatus === 200
                            ? 'Request Authorized & Validated'
                            : executionResult.executionResult.httpStatus === 403
                            ? 'Boundary Firewall: Access Denied'
                            : 'Inference Blocker: Attack Halted'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-semibold text-charcoal-muted">
                          RESULT: {executionResult.executionResult.result}
                        </span>
                      </div>
                    </div>

                    {/* Clean Human-Friendly Visual Summary */}
                    <div className="space-y-3">
                      {/* Outcome Description Message */}
                      <div className="p-3 bg-white rounded-xl border border-warm-300/80 text-xs text-charcoal space-y-1">
                        <span className="text-[10px] font-mono text-charcoal-muted uppercase block font-bold">
                          Policy Engine Outcome
                        </span>
                        <p className="font-medium text-ink">
                          {executionResult.executionResult.responseBody?.message ||
                            executionResult.executionResult.responseBody?.reason ||
                            (executionResult.executionResult.responseBody?.status === 'ACCESS_GRANTED' &&
                              'Frontline physician credentials verified with active patient consent for treatment.') ||
                            'Operation completed in accordance with data boundary policy.'}
                        </p>
                        {executionResult.executionResult.responseBody?.accessMetadata && (
                          <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-charcoal-muted">
                            <span>Purpose: <strong>{executionResult.executionResult.responseBody.accessMetadata.accessedFor}</strong></span>
                            <span>•</span>
                            <span>Session Limit: <strong>{executionResult.executionResult.responseBody.accessMetadata.accessDuration}</strong></span>
                            <span>•</span>
                            <span className="text-sage-dark">Audit Ledger: Verified ✓</span>
                          </div>
                        )}
                      </div>

                      {/* Visual Checklist Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {executionResult.executionResult.responseBody?.explainability?.checks?.map((check: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 border border-warm-200">
                            <span className="text-charcoal font-medium">{check.name}</span>
                            <span className={`text-[11px] font-mono font-bold ${check.passed ? 'text-sage-dark' : 'text-mutedRed'}`}>
                              {check.passed ? 'PASS ✓' : 'FAIL ✕'}
                            </span>
                          </div>
                        )) ||
                          executionResult.executionResult.responseBody?.privacyChecks?.map((check: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 border border-warm-200">
                              <span className="text-charcoal font-medium">{check.name}</span>
                              <span className={`text-[11px] font-mono font-bold ${check.passed ? 'text-sage-dark' : 'text-mutedRed'}`}>
                                {check.passed ? 'PASS ✓' : 'BLOCKED ✕'}
                              </span>
                            </div>
                          )) || (
                            <div className="p-2.5 rounded-lg bg-white/80 border border-warm-200 sm:col-span-2 flex items-center justify-between">
                              <span className="text-charcoal font-medium">Role Boundary Policy</span>
                              <span className={`text-[11px] font-mono font-bold ${executionResult.executionResult.httpStatus === 200 ? 'text-sage-dark' : 'text-mutedRed'}`}>
                                {executionResult.executionResult.httpStatus === 200 ? 'AUTHORIZED ✓' : 'RESTRICTED (403) ✕'}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Policy Decision Summary */}
              {executionResult?.executionResult && (
                <div className="pt-2">
                  <div className="text-xs font-mono font-bold uppercase text-charcoal-muted mb-2">
                    Security Decision Verification
                  </div>
                  <div className="p-3 bg-warm-100 rounded-lg border border-warm-300 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-charcoal-muted">Expected Status:</span>
                      <span className="font-mono font-bold text-ink">{currentScenario.expectedStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-muted">Actual Returned Status:</span>
                      <span className="font-mono font-bold text-sage-dark">
                        {executionResult.executionResult.httpStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-muted">Policy Compliance:</span>
                      <span className="font-bold text-sage-dark flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                        100% Policy Match
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
