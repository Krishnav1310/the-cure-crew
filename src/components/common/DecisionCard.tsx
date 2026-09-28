// CAREVAULT Explainable Decision Card Component
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';

interface DecisionCheck {
  name: string;
  passed: boolean;
  detail?: string;
  warning?: string;
  error?: string;
}

interface DecisionCardProps {
  type: 'GRANTED' | 'DENIED' | 'SUPPRESSED' | 'BLOCKED';
  title?: string;
  actor: string;
  role: string;
  resource: string;
  reason?: string;
  checks: DecisionCheck[];
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  type,
  title,
  actor,
  role,
  resource,
  reason,
  checks,
}) => {
  const isGranted = type === 'GRANTED';
  const isDenied = type === 'DENIED';
  const isSuppressed = type === 'SUPPRESSED';
  const isBlocked = type === 'BLOCKED';

  return (
    <div
      className={`rounded-xl border p-5 shadow-card transition-all ${
        isGranted
          ? 'bg-sage-subtle/40 border-sage/40'
          : isDenied
          ? 'bg-mutedRed-subtle/50 border-mutedRed/40'
          : isSuppressed
          ? 'bg-amber-subtle/50 border-amber/40'
          : 'bg-warm-100 border-terracotta/40'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-warm-300">
        <div className="flex items-center gap-2">
          {isGranted && <ShieldCheck className="w-5 h-5 text-sage-dark" />}
          {isDenied && <ShieldAlert className="w-5 h-5 text-mutedRed" />}
          {isSuppressed && <AlertTriangle className="w-5 h-5 text-amber-dark" />}
          {isBlocked && <XCircle className="w-5 h-5 text-terracotta" />}

          <span
            className={`font-mono text-xs font-bold uppercase tracking-wider ${
              isGranted
                ? 'text-sage-dark'
                : isDenied
                ? 'text-mutedRed-dark'
                : isSuppressed
                ? 'text-amber-dark'
                : 'text-terracotta-dark'
            }`}
          >
            {title || `ACCESS ${type}`}
          </span>
        </div>
        <span className="text-[11px] font-mono text-charcoal-muted">
          POLICY ENGINE v1.0
        </span>
      </div>

      {/* Metadata summary */}
      <div className="py-3 text-xs space-y-1">
        <div className="flex justify-between">
          <span className="text-charcoal-muted">Actor:</span>
          <span className="font-semibold text-ink">{actor} ({role})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-muted">Resource:</span>
          <span className="font-mono text-ink truncate max-w-[220px]">{resource}</span>
        </div>
        {reason && (
          <div className="pt-2 text-[11px] italic text-charcoal">
            "{reason}"
          </div>
        )}
      </div>

      {/* Checklist items */}
      <div className="pt-3 border-t border-warm-300/80 space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted font-bold">
          Policy Decision Verification:
        </div>
        {checks.map((c, i) => (
          <div key={i} className="flex items-start justify-between text-xs gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {c.passed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-mutedRed shrink-0" />
              )}
              <span className={`truncate ${c.passed ? 'text-charcoal' : 'text-mutedRed font-medium'}`}>
                {c.name}
              </span>
            </div>
            {c.detail && (
              <span className="text-[11px] font-mono text-charcoal-muted shrink-0">
                {c.detail}
              </span>
            )}
            {c.error && (
              <span className="text-[11px] font-mono text-mutedRed font-semibold shrink-0">
                {c.error}
              </span>
            )}
            {c.warning && (
              <span className="text-[11px] font-mono text-amber-dark shrink-0">
                {c.warning}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
