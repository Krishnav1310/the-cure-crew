// CAREVAULT Animated Data Boundary Visual Component
import React, { useState } from 'react';
import { QrCode, User, Stethoscope, FileText, Database, Layers, ShieldCheck, BarChart3, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const DataBoundaryVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="w-full bg-warm-50 rounded-2xl border border-warm-300 p-6 shadow-card overflow-hidden">
      {/* Header explanation */}
      <div className="flex items-center justify-between pb-4 border-b border-warm-300 mb-6">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-wider text-charcoal-muted uppercase">
            Architectural Separation Engine
          </span>
          <h3 className="text-base font-bold text-ink">Two Distinct Planes. Zero Identifiable Leakage.</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-warm-200 px-2.5 py-1 rounded text-ink border border-warm-300">
          <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
          <span>BOUNDARY: ENFORCED</span>
        </div>
      </div>

      {/* Grid showing two separated paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Central barrier divider (visible on large screens) */}
        <div className="hidden lg:flex absolute inset-y-0 left-1/2 -ml-px w-0.5 bg-gradient-to-b from-warm-300 via-sage/40 to-warm-300 items-center justify-center pointer-events-none">
          <div className="bg-ink text-warm-100 text-[9px] font-mono uppercase px-2 py-1 rounded -rotate-90 shadow-sm border border-warm-400">
            AIR-GAPPED DATA BOUNDARY
          </div>
        </div>

        {/* ========================================================
            PATH 1: CLINICAL DATA PLANE (Individual Care)
           ======================================================== */}
        <div className="bg-warm-100/60 rounded-xl p-5 border border-sage/20 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sage" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sage-dark">
                Plane 1: Clinical Data Plane
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage-subtle text-sage-dark border border-sage/30">
              INDIVIDUAL & IDENTIFIABLE
            </span>
          </div>

          <p className="text-xs text-charcoal-muted mb-6 leading-relaxed">
            Authorized clinicians access full longitudinal medical histories via authenticated QR identification and explicit patient consent.
          </p>

          {/* Step-by-step flow */}
          <div className="space-y-3">
            {/* Step 1: Patient */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-warm-300 shadow-subtle hover:border-sage/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-sage-subtle flex items-center justify-center text-sage-dark shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink">1. Patient (PT-2048)</div>
                <div className="text-[11px] text-charcoal-muted truncate">Presents dynamic identity QR with active consent token</div>
              </div>
              <span className="text-xs font-mono text-sage-dark font-medium shrink-0">Active</span>
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center text-sage/60">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 2: QR Token Scan */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-warm-300 shadow-subtle hover:border-sage/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-sage-subtle flex items-center justify-center text-sage-dark shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink">2. QR Token Handshake</div>
                <div className="text-[11px] text-charcoal-muted truncate">Verified cryptographic reference; no raw PII in URL</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center text-sage/60">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 3: Clinician Auth & Purpose */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-warm-300 shadow-subtle hover:border-sage/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-sage-subtle flex items-center justify-center text-sage-dark shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink">3. Authenticated Clinician</div>
                <div className="text-[11px] text-charcoal-muted truncate">Dr. Ananya Kulkarni • Purpose: Treatment • MFA verified</div>
              </div>
              <span className="text-[10px] font-mono bg-sage/10 text-sage-dark px-1.5 py-0.5 rounded font-medium shrink-0">
                Policy: PASS
              </span>
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center text-sage/60">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 4: Authorized Clinical Record */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-sage shadow-card">
              <div className="w-9 h-9 rounded-md bg-sage text-white flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink flex items-center gap-2">
                  <span>4. Longitudinal Clinical Record</span>
                  <span className="text-[10px] font-mono text-sage font-normal">(30m Session)</span>
                </div>
                <div className="text-[11px] text-charcoal-muted truncate">Visits, Diagnoses, Prescriptions, Lab Observations, Allergies</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PATH 2: POPULATION INTELLIGENCE PLANE (Surveillance)
           ======================================================== */}
        <div className="bg-warm-100/60 rounded-xl p-5 border border-dusty/20 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-dusty" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-dusty-dark">
                Plane 2: Population Intelligence
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dusty-subtle text-dusty-dark border border-dusty/30">
              ANONYMIZED & AGGREGATED
            </span>
          </div>

          <p className="text-xs text-charcoal-muted mb-6 leading-relaxed">
            Public health administrators monitor regional outbreaks through a zero-PII privacy firewall enforcing minimum cell sizes.
          </p>

          {/* Step-by-step flow */}
          <div className="space-y-3">
            {/* Step 1: Raw Health Cases */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-warm-300 shadow-subtle hover:border-dusty/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-dusty-subtle flex items-center justify-center text-dusty-dark shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink">1. Electronic Health Events</div>
                <div className="text-[11px] text-charcoal-muted truncate">Cross-hospital symptom reporting & diagnosis logs</div>
              </div>
              <span className="text-xs font-mono text-dusty-dark font-medium shrink-0">2,500+ Cases</span>
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center text-dusty/60">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 2: Anonymization & Aggregation */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-warm-300 shadow-subtle hover:border-dusty/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-dusty-subtle flex items-center justify-center text-dusty-dark shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink">2. Aggregation & Scrubbing</div>
                <div className="text-[11px] text-charcoal-muted truncate">All identifiers, names, and contact details permanently discarded</div>
              </div>
              <span className="text-[10px] font-mono bg-dusty/10 text-dusty-dark px-1.5 py-0.5 rounded font-medium shrink-0">
                PII STRIPPED
              </span>
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center text-dusty/60">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 3: Privacy Gate / Firewall */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-amber shadow-subtle hover:border-amber-dark transition-colors">
              <div className="w-9 h-9 rounded-md bg-amber-subtle text-amber-dark flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink flex items-center gap-2">
                  <span>3. Privacy Gate Firewall</span>
                  <span className="text-[10px] font-mono bg-amber text-ink font-semibold px-1 py-0.2 rounded">K ≥ 5</span>
                </div>
                <div className="text-[11px] text-charcoal-muted truncate">Enforces small-cell suppression & blocks differencing attacks</div>
              </div>
              <span className="text-[10px] font-mono text-amber-dark font-medium shrink-0">ACTIVE</span>
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center text-dusty/60">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 4: Public Health Insights */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-dusty shadow-card">
              <div className="w-9 h-9 rounded-md bg-dusty text-white flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink">4. Population Trend Insights</div>
                <div className="text-[11px] text-charcoal-muted truncate">Regional heatmaps, time-series curves, outbreak alerts</div>
              </div>
              <span className="text-[10px] font-mono bg-dusty-subtle text-dusty-dark px-2 py-0.5 rounded font-medium shrink-0">
                ZERO RE-ID
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom guarantee badge */}
      <div className="mt-6 pt-4 border-t border-warm-300 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted gap-2">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-terracotta" />
          <span>
            <strong>Security Proof:</strong> An administrator calling <code className="text-[11px] font-mono bg-warm-200 px-1 py-0.5 rounded text-ink">/api/clinical/*</code> receives a hard <strong>403 Forbidden</strong> from the backend API.
          </span>
        </div>
        <div className="font-mono text-[11px] text-sage font-semibold">
          RFC-9110 RBAC ENFORCED
        </div>
      </div>
    </div>
  );
};
