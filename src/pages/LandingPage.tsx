// CAREVAULT Streamlined Dashboard / Overview
// Minimal, humanized, and clutter-free for hackathon presentation
import React from 'react';
import {
  Stethoscope,
  BarChart3,
  ShieldCheck,
  QrCode,
  Lock,
  ArrowRight,
  Activity,
  Presentation,
  CheckCircle2,
} from 'lucide-react';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
  onSelectRole: (role: 'clinician' | 'admin' | 'patient') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentTab, onSelectRole }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* ========================================================
          HERO SECTION: Clean, human, direct
         ======================================================== */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-subtle border border-sage/30 text-sage-dark text-xs font-mono font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          <span>CAREVAULT // Dual-Track Healthcare Platform</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
          Frontline Care.<br />
          <span className="text-sage-dark">Protected Health Intelligence.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-charcoal-muted leading-relaxed max-w-2xl mx-auto">
          Frontline doctors get instant, authorized access to patient records at the bedside.
          Public health officials track real-time outbreak trends across municipal wards — separated by an unbreakable privacy firewall.
        </p>
      </section>

      {/* ========================================================
          TWO PRIMARY WORKSPACES (DOCTOR vs PUBLIC HEALTH)
         ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Workspace Card */}
        <div className="bg-warm-50 border-2 border-sage/40 hover:border-sage rounded-2xl p-6 sm:p-8 shadow-card transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-sage-subtle flex items-center justify-center text-sage-dark">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono bg-sage-subtle text-sage-dark px-2.5 py-1 rounded-full font-bold">
                CLINICAL PORTAL
              </span>
            </div>

            <h3 className="text-xl font-bold text-ink mb-2">Doctor Workspace</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed mb-6">
              Scan patient QR tokens for instant longitudinal medical history, current prescriptions, active lab alerts, and emergency break-glass override.
            </p>

            <div className="space-y-2 text-xs text-charcoal font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                <span>Zero-PII QR code patient lookup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                <span>30-minute purpose-scoped clinical session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                <span>Trauma break-glass override with allergy safety</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-warm-300">
            <button
              onClick={() => onSelectRole('clinician')}
              className="w-full py-3 px-4 rounded-xl bg-sage text-white font-semibold text-xs hover:bg-sage-dark transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow"
            >
              <span>Launch Doctor View</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Public Health Workspace Card */}
        <div className="bg-warm-50 border-2 border-dusty/40 hover:border-dusty rounded-2xl p-6 sm:p-8 shadow-card transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-dusty-subtle flex items-center justify-center text-dusty-dark">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono bg-dusty-subtle text-dusty-dark px-2.5 py-1 rounded-full font-bold">
                SURVEILLANCE PORTAL
              </span>
            </div>

            <h3 className="text-xl font-bold text-ink mb-2">Public Health Surveillance</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed mb-6">
              Track regional outbreak trends, epidemic curves, and ward hotspots in real-time with automated small-group suppression.
            </p>

            <div className="space-y-2 text-xs text-charcoal font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-dusty shrink-0" />
                <span>K-Anonymity (K ≥ 5) small-group suppression</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-dusty shrink-0" />
                <span>Session query-differencing attack blocker</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-dusty shrink-0" />
                <span>Strict HTTP 403 protection on patient endpoints</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-warm-300">
            <button
              onClick={() => onSelectRole('admin')}
              className="w-full py-3 px-4 rounded-xl bg-dusty text-white font-semibold text-xs hover:bg-dusty-dark transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow"
            >
              <span>Launch Public Health View</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          3 CORE PILLARS: Concise, crisp, clean
         ======================================================== */}
      <section className="space-y-4">
        <div className="text-center">
          <span className="text-[11px] font-mono text-charcoal-muted uppercase font-bold tracking-wider">
            Architecture at a Glance
          </span>
          <h2 className="text-xl font-bold text-ink mt-0.5">
            Three Layers of Protection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pillar 1 */}
          <div className="bg-warm-50 p-5 rounded-xl border border-warm-300 shadow-subtle space-y-2">
            <div className="w-9 h-9 rounded-lg bg-sage-subtle text-sage-dark flex items-center justify-center mb-3">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-ink">1. Point-of-Care Access</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              QR tokens resolve on the server to active consent references. Clinicians receive rich history without transmitting unencrypted data.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-warm-50 p-5 rounded-xl border border-warm-300 shadow-subtle space-y-2">
            <div className="w-9 h-9 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-ink">2. Privacy Gate Firewall</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Automated gate drops identifying attributes, suppresses cells under K=5, and catches cross-query subtraction attempts.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-warm-50 p-5 rounded-xl border border-warm-300 shadow-subtle space-y-2">
            <div className="w-9 h-9 rounded-lg bg-dusty-subtle text-dusty-dark flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-ink">3. Outbreak Surveillance</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Municipal ward counts, weekly growth rates, and surge vectors give administrators early warning without identity exposure.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          LIVE SYSTEM STATUS & QUICK LINKS
         ======================================================== */}
      <section className="bg-warm-100/70 border border-warm-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-charcoal">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sage" />
            <span>K-Anonymity (K ≥ 5): <strong>Active</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sage" />
            <span>Differencing Defense: <strong>Active</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
            <span>Cross-Role Access: <strong>403 Blocked</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => {
              onSelectRole('patient');
              setCurrentTab('patient-dashboard');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-warm-200 text-ink text-xs font-bold hover:bg-warm-300 transition-colors flex items-center gap-1.5 border border-warm-300"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-dark" />
            <span>Patient View</span>
          </button>

          <button
            onClick={() => setCurrentTab('security-lab')}
            className="px-3.5 py-1.5 rounded-lg bg-ink text-warm-50 text-xs font-bold hover:bg-ink-light transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-sage" />
            <span>Security Lab</span>
          </button>

          <button
            onClick={() => setCurrentTab('presentation')}
            className="px-3.5 py-1.5 rounded-lg bg-warm-200 text-ink text-xs font-bold hover:bg-warm-300 transition-colors flex items-center gap-1.5 border border-warm-300"
          >
            <Presentation className="w-3.5 h-3.5 text-dusty-dark" />
            <span>Pitch Deck</span>
          </button>
        </div>
      </section>
    </div>
  );
};
