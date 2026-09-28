// CAREVAULT Interactive Presentation Deck (Minimal Text, Zero AI Plagiarism, Smooth Animations)
import React, { useState, useEffect } from 'react';
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Shield,
  Layers,
  Activity,
  Lock,
  AlertTriangle,
  FileText,
  BarChart3,
  Stethoscope,
  EyeOff,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface SlideData {
  id: number;
  eyebrow: string;
  title: string;
  theme: 'dark' | 'light';
  content: React.ReactNode;
  notes: string;
}

export const PresentationPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [revealedPoints, setRevealedPoints] = useState<number>(3); // Reveal counter for step animations

  // Slide definitions
  const slides: SlideData[] = [
    // Slide 1: Title
    {
      id: 1,
      eyebrow: 'PRIVACY-FIRST HEALTH INTELLIGENCE',
      title: 'CAREVAULT',
      theme: 'dark',
      notes: 'Introduce the core thesis: We do not need to choose between helping clinicians treat patients and letting public health officers track disease outbreaks.',
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-2xl sm:text-3xl font-semibold text-sage">
            Connected care. Protected identities.
          </div>
          <p className="text-base sm:text-lg text-warm-300 max-w-2xl leading-relaxed">
            A privacy-enforced architectural bridge separating individual clinical records
            from population-level disease surveillance.
          </p>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-ink-light/50 border border-warm-300/10 text-warm-200">
              <span className="text-sage font-bold block mb-1">01 / CLINICAL PLANE</span>
              Point-of-care history for authorized treating doctors via QR handshake.
            </div>
            <div className="p-3.5 rounded-xl bg-ink-light/50 border border-warm-300/10 text-warm-200">
              <span className="text-amber font-bold block mb-1">02 / PRIVACY FIREWALL</span>
              K-anonymity (K ≥ 5) & differencing inference blocker at API layer.
            </div>
            <div className="p-3.5 rounded-xl bg-ink-light/50 border border-warm-300/10 text-warm-200">
              <span className="text-dusty font-bold block mb-1">03 / SURVEILLANCE PLANE</span>
              Zero-PII aggregated outbreak tracking across municipal zones.
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: The Core Problem
    {
      id: 2,
      eyebrow: 'THE SYSTEMIC CONFLICT',
      title: 'One healthcare system. Two conflicting data demands.',
      theme: 'light',
      notes: 'Explain why single-database models fail: Hospitals either over-share identifiable records or completely blind public health departments.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-fadeIn">
          {/* Card 1: Clinician Need */}
          <div className="bg-white rounded-2xl border-2 border-sage/40 p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-sage-dark font-mono text-xs font-bold uppercase">
              <Stethoscope className="w-4 h-4" />
              <span>Frontline Clinician</span>
            </div>
            <h3 className="text-lg font-bold text-ink">Needs deep, identifiable context:</h3>
            <ul className="text-xs sm:text-sm text-charcoal space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-sage font-bold">✓</span>
                <span>Past prescriptions to stop fatal drug-drug interactions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage font-bold">✓</span>
                <span>Life-threatening allergy warnings (e.g. Penicillin anaphylaxis).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage font-bold">✓</span>
                <span>Longitudinal lab curves (Platelet counts, HbA1c trajectory).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage font-bold">✓</span>
                <span>Immediate emergency access during acute trauma.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Public Health Need */}
          <div className="bg-white rounded-2xl border-2 border-dusty/40 p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-dusty-dark font-mono text-xs font-bold uppercase">
              <BarChart3 className="w-4 h-4" />
              <span>Surveillance Officer</span>
            </div>
            <h3 className="text-lg font-bold text-ink">Needs macro, aggregated trends:</h3>
            <ul className="text-xs sm:text-sm text-charcoal space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-dusty font-bold">✓</span>
                <span>Early outbreak detection across municipal wards.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-dusty font-bold">✓</span>
                <span>Condition distribution curves (Dengue, Malaria, Influenza).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mutedRed font-bold">✕</span>
                <span><strong>Zero access</strong> to patient names, IDs, or phone numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mutedRed font-bold">✕</span>
                <span>Absolute protection against small-cohort re-identification.</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 3: Two Data Planes
    {
      id: 3,
      eyebrow: 'ARCHITECTURAL DUALITY',
      title: 'One Health Ecosystem. Two Data Boundaries.',
      theme: 'light',
      notes: 'Highlight that the Privacy Firewall sits directly in between the two worlds. Nothing crosses without policy evaluation.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs animate-fadeIn">
          <div className="bg-sage-subtle/50 rounded-2xl border border-sage/30 p-5 space-y-3">
            <span className="font-mono font-bold text-sage-dark uppercase block">Plane 1: Clinical</span>
            <h4 className="text-sm font-bold text-ink">Authorized Doctors</h4>
            <p className="text-charcoal-muted leading-relaxed">
              Cryptographic QR handshake unlocks patient records for treatment purpose with 30-min session limits.
            </p>
            <div className="font-mono text-[11px] text-sage-dark font-semibold">
              Status: RESTRICTED IDENTIFIABLE
            </div>
          </div>

          <div className="bg-amber-subtle/50 rounded-2xl border-2 border-amber/60 p-5 space-y-3 shadow-subtle">
            <span className="font-mono font-bold text-amber-dark uppercase block">Center: Privacy Firewall</span>
            <h4 className="text-sm font-bold text-ink">The Privacy Gate</h4>
            <p className="text-charcoal-muted leading-relaxed">
              Hard backend RBAC (HTTP 403), K-anonymity suppression ($K \ge 5$), and query differencing blocker.
            </p>
            <div className="font-mono text-[11px] text-amber-dark font-semibold">
              Status: ZERO-LEAKAGE ENFORCED
            </div>
          </div>

          <div className="bg-dusty-subtle/50 rounded-2xl border border-dusty/30 p-5 space-y-3">
            <span className="font-mono font-bold text-dusty-dark uppercase block">Plane 2: Population</span>
            <h4 className="text-sm font-bold text-ink">Surveillance Officers</h4>
            <p className="text-charcoal-muted leading-relaxed">
              Real-time regional outbreak heatmaps and time-series curves with all patient identifiers scrubbed.
            </p>
            <div className="font-mono text-[11px] text-dusty-dark font-semibold">
              Status: AGGREGATED ANONYMIZED
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Clinician QR & Consent Handshake
    {
      id: 4,
      eyebrow: 'POINT-OF-CARE DELIVERY',
      title: 'Fast, authorized access at the bedside.',
      theme: 'light',
      notes: 'Demonstrate that QR access is not just opening a link; it requires active consent validation and purpose specification.',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 text-xs animate-fadeIn">
          {[
            { step: '01', title: 'QR Identity Handshake', desc: 'Patient presents dynamic QR token (PT-2048). No unencrypted PII in URLs.' },
            { step: '02', title: 'Clinician Authentication', desc: 'Doctor credentials & MFA token verified against Hospital Directory.' },
            { step: '03', title: 'Consent Verification', desc: 'Active consent verified. If patient toggled "Revoked", access halts immediately.' },
            { step: '04', title: '30-Minute Safe View', desc: 'Longitudinal visits, diagnoses, platelet observations, and drug allergy alerts.' },
          ].map(s => (
            <div key={s.step} className="bg-white rounded-xl border border-warm-300 p-4 shadow-subtle space-y-2">
              <span className="text-lg font-mono font-bold text-sage-dark">{s.step}</span>
              <h4 className="font-bold text-ink text-sm">{s.title}</h4>
              <p className="text-charcoal-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      ),
    },

    // Slide 5: The Privacy Gate
    {
      id: 5,
      eyebrow: 'POPULATION SURVEILLANCE',
      title: 'Small-group suppression via the Privacy Gate.',
      theme: 'light',
      notes: 'Explain K-anonymity: If only 3 people have Malaria in Kolhapur, showing 3 lets neighbors identify them. CAREVAULT forces <5 / Suppressed.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-sage/40 p-6 shadow-subtle space-y-3">
            <span className="text-xs font-mono font-bold text-sage-dark uppercase">Normal Aggregate (N ≥ 5)</span>
            <div className="text-3xl font-bold font-mono text-ink">342 Cases</div>
            <p className="text-xs text-charcoal-muted">Pune • Dengue • August–September</p>
            <div className="pt-2 text-xs text-charcoal space-y-1">
              <div>✓ Minimum group threshold satisfied ($342 \ge 5$)</div>
              <div>✓ Zero identifiable fields returned</div>
              <div className="text-sage font-bold font-mono">STATUS: PROTECTED</div>
            </div>
          </div>

          <div className="bg-amber-subtle/40 rounded-2xl border-2 border-amber p-6 shadow-subtle space-y-3">
            <span className="text-xs font-mono font-bold text-amber-dark uppercase">Small Group Cell (N &lt; 5)</span>
            <div className="text-3xl font-bold font-mono text-amber-dark">&lt;5 / Suppressed</div>
            <p className="text-xs text-charcoal-muted">Kolhapur • Malaria • Age 70+ (Raw: 3 cases)</p>
            <div className="pt-2 text-xs text-charcoal space-y-1">
              <div>✕ Raw count (3) is below privacy threshold ($K=5$)</div>
              <div>✓ Justification: "Displaying this statistic increases re-identification risk"</div>
              <div className="text-amber-dark font-bold font-mono">STATUS: SUPPRESSED FOR PRIVACY</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 6: Differencing & Inference Attack Blocker
    {
      id: 6,
      eyebrow: 'CORE USP INNOVATION',
      title: 'Blocking inference through differencing attacks.',
      theme: 'light',
      notes: 'This is our biggest technical differentiator: We prevent attackers from recovering suppressed numbers through mathematical subtraction.',
      content: (
        <div className="bg-white rounded-2xl border-2 border-terracotta/40 p-6 shadow-card space-y-4 animate-fadeIn">
          <div className="text-xs font-mono font-bold text-terracotta uppercase">
            How Attackers Bypass Standard Dashboards:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-warm-100 border border-warm-200">
              <span className="text-charcoal-muted block text-[10px]">QUERY 1 (ALL)</span>
              <span className="text-base font-bold text-ink">Total = 100</span>
              <span className="text-[10px] text-sage block mt-1">Allowed (100 ≥ 5)</span>
            </div>
            <div className="p-3 rounded-lg bg-warm-100 border border-warm-200">
              <span className="text-charcoal-muted block text-[10px]">QUERY 2 (SUBSET)</span>
              <span className="text-base font-bold text-ink">Male = 96</span>
              <span className="text-[10px] text-sage block mt-1">Allowed (96 ≥ 5)</span>
            </div>
            <div className="p-3 rounded-lg bg-mutedRed-subtle border border-mutedRed/30">
              <span className="text-mutedRed-dark block text-[10px]">IMPLIED DIFFERENCE</span>
              <span className="text-base font-bold text-mutedRed">Female = 4</span>
              <span className="text-[10px] text-mutedRed block mt-1">Suppressed cell recovered!</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sage-subtle/50 border border-sage/30 text-xs text-charcoal space-y-1">
            <strong className="text-sage-dark font-bold font-mono">CAREVAULT DEFENSE:</strong>
            <p className="leading-relaxed">
              Our Privacy Gate tracks query correlation history per session. When Query 2 is received, it detects
              that comparing it to Query 1 reveals a suppressed cohort ($100 - 96 = 4 &lt; K$), and immediately blocks
              the call with <strong>HTTP 422: "Potential inference through differencing detected."</strong>
            </p>
          </div>
        </div>
      ),
    },

    // Slide 7: Break-Glass Emergency Access
    {
      id: 7,
      eyebrow: 'EMERGENCY PROTOCOL',
      title: 'Break-Glass: Life safety with data minimization.',
      theme: 'light',
      notes: 'Explain that emergency override should not mean total data dump. We only give what keeps the patient alive.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border-2 border-mutedRed/40 p-6 shadow-subtle space-y-3">
            <span className="text-xs font-mono font-bold text-mutedRed uppercase">When Trauma Arrives</span>
            <h4 className="text-sm font-bold text-ink">Emergency Clinical Intervention</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Used when an unconscious patient arrives in resuscitation and normal consent flow cannot be completed.
            </p>
            <div className="pt-2 text-xs text-charcoal space-y-1.5 font-mono">
              <div>• Mandatory clinical justification required</div>
              <div>• Example: "Patient unconscious; acute anaphylaxis risk"</div>
              <div>• Flagged with CRITICAL severity in Audit Vault</div>
            </div>
          </div>

          <div className="bg-mutedRed-subtle/40 rounded-2xl border border-mutedRed/40 p-6 shadow-subtle space-y-3">
            <span className="text-xs font-mono font-bold text-mutedRed uppercase">Restricted Safety Profile Delivered</span>
            <ul className="text-xs sm:text-sm text-charcoal space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-mutedRed font-bold">✓</span>
                <span><strong>Blood Group: O+</strong> (verified cross-match)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mutedRed font-bold">✓</span>
                <span><strong>Critical Allergies:</strong> Penicillin anaphylaxis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mutedRed font-bold">✓</span>
                <span><strong>Active Meds:</strong> Metformin, Telmisartan</span>
              </li>
              <li className="flex items-center gap-2 text-charcoal-muted">
                <span className="text-mutedRed font-bold">✕</span>
                <span>Outpatient visit notes & psychiatric history: <em>WITHHELD</em></span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 8: Real Backend Security
    {
      id: 8,
      eyebrow: 'ZERO SMOKE & MIRRORS',
      title: 'Security enforced at the API boundary, not UI buttons.',
      theme: 'light',
      notes: 'Emphasize that judges can test this live with cURL or the Security Center. An admin calling clinical endpoints gets a genuine 403 Forbidden.',
      content: (
        <div className="space-y-4 pt-4 animate-fadeIn">
          <div className="overflow-x-auto rounded-xl border border-warm-300 bg-white">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ink text-warm-100 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Test Scenario</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Endpoint</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-200">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-ink">Authorized Care</td>
                  <td className="py-2.5 px-3">CLINICIAN</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">GET /api/clinical/patients/PT-2048</td>
                  <td className="py-2.5 px-3 font-bold text-sage">200 OK</td>
                  <td className="py-2.5 px-3">ALLOWED</td>
                </tr>
                <tr className="bg-mutedRed-subtle/30">
                  <td className="py-2.5 px-3 font-bold text-mutedRed">Admin Patient Breach</td>
                  <td className="py-2.5 px-3 font-bold text-mutedRed">ADMIN</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">GET /api/clinical/patients/PT-2048</td>
                  <td className="py-2.5 px-3 font-bold text-mutedRed">403 Forbidden</td>
                  <td className="py-2.5 px-3 font-bold text-mutedRed">DENIED BY FIREWALL</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-ink">Small Cell (N=3)</td>
                  <td className="py-2.5 px-3">ADMIN</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">POST /api/analytics/query</td>
                  <td className="py-2.5 px-3 font-bold text-amber-dark">200 OK</td>
                  <td className="py-2.5 px-3 font-bold text-amber-dark">&lt;5 / Suppressed</td>
                </tr>
                <tr className="bg-terracotta-subtle/30">
                  <td className="py-2.5 px-3 font-bold text-terracotta">Differencing Attack</td>
                  <td className="py-2.5 px-3 font-bold text-terracotta">ADMIN</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">POST /api/analytics/query (100-96)</td>
                  <td className="py-2.5 px-3 font-bold text-terracotta">422 Unproc.</td>
                  <td className="py-2.5 px-3 font-bold text-terracotta">BLOCKED</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-charcoal-muted italic">
            "Even if an attacker uses cURL with an admin token, the backend RBAC middleware rejects the request. Security is never left to frontend state."
          </p>
        </div>
      ),
    },

    // Slide 9: Summary & Closing
    {
      id: 9,
      eyebrow: 'FINAL SUMMARY',
      title: '"Privacy is not a policy written on a page.\nIt is enforced at the data boundary."',
      theme: 'dark',
      notes: 'Final strong closing statement.',
      content: (
        <div className="space-y-6 pt-2 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-4">
            <div className="p-4 rounded-xl bg-ink-light/50 border border-warm-300/10 text-warm-200">
              <span className="text-sage font-bold block mb-1 text-sm">FRONTLINE SPEED</span>
              Doctors retrieve full longitudinal records in seconds via QR with active consent & emergency overrides.
            </div>
            <div className="p-4 rounded-xl bg-ink-light/50 border border-warm-300/10 text-warm-200">
              <span className="text-dusty font-bold block mb-1 text-sm">MACRO SURVEILLANCE</span>
              Epidemiologists monitor regional outbreaks and growth curves without ever touching identifiable patient files.
            </div>
            <div className="p-4 rounded-xl bg-ink-light/50 border border-warm-300/10 text-warm-200">
              <span className="text-amber font-bold block mb-1 text-sm">MATHEMATICAL DEFENSE</span>
              K-anonymity (K ≥ 5) and session query differencing prevention stop subtle small-cell re-identification.
            </div>
          </div>

          <div className="pt-8 text-center">
            <a
              href="/api/presentation/download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage text-white font-bold text-sm hover:bg-sage-dark transition-all shadow-card"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Presentation (.PPTX)</span>
            </a>
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className={`min-h-screen ${slide.theme === 'dark' ? 'bg-ink text-warm-50' : 'bg-warm text-charcoal'} flex flex-col justify-between transition-colors duration-300`}>
      {/* Top Deck Bar */}
      <div className={`px-6 py-4 flex items-center justify-between border-b ${slide.theme === 'dark' ? 'border-ink-light' : 'border-warm-300'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ink text-sage flex items-center justify-center font-bold text-xs border border-warm-300/20">
            CV
          </div>
          <div>
            <span className="text-xs font-bold tracking-tight uppercase">CAREVAULT Pitch Deck</span>
            <span className="text-[10px] font-mono text-charcoal-muted block">16:9 Editorial Presentation</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/presentation/download"
            className="px-3.5 py-1.5 rounded-lg bg-sage text-white text-xs font-bold hover:bg-sage-dark flex items-center gap-1.5 shadow-sm transition-colors"
            title="Download PowerPoint PPTX File"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .PPTX</span>
          </a>

          <div className="text-xs font-mono font-semibold px-2 py-1 rounded bg-warm-200/20">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Main Slide Stage (Widescreen 16:9 aspect box) */}
      <div className="max-w-6xl w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        <div
          key={slide.id}
          className={`w-full rounded-3xl p-8 sm:p-12 transition-all duration-300 shadow-elevated ${
            slide.theme === 'dark'
              ? 'bg-ink-dark border border-ink-light'
              : 'bg-warm-50 border border-warm-300'
          }`}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${slide.theme === 'dark' ? 'bg-sage' : 'bg-sage-dark'}`} />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-sage">
              {slide.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
            {slide.title}
          </h2>

          {/* Slide Dynamic Body */}
          <div className="min-h-[280px]">
            {slide.content}
          </div>

          {/* Presenter Note Hint */}
          <div className="mt-8 pt-4 border-t border-warm-300/30 text-[11px] font-mono text-charcoal-muted flex justify-between">
            <span>Speaker Focus: {slide.notes}</span>
            <span>Use Arrow Keys or Space to Navigate</span>
          </div>
        </div>
      </div>

      {/* Bottom Deck Controls & Thumbnails */}
      <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${slide.theme === 'dark' ? 'border-ink-light bg-ink-dark' : 'border-warm-300 bg-warm-50'}`}>
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev))}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg bg-warm-200/30 hover:bg-warm-200/50 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-lg bg-warm-200/30 hover:bg-warm-200/50 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono ml-2">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Thumbnail Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'w-6 bg-sage'
                  : 'w-2 bg-warm-300/50 hover:bg-warm-300'
              }`}
              title={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* PPTX File reminder */}
        <div className="text-[11px] font-mono text-charcoal-muted flex items-center gap-2">
          <span>CAREVAULT_Pitch_Deck.pptx</span>
          <span className="text-sage font-bold">• READY FOR UPLOAD</span>
        </div>
      </div>
    </div>
  );
};
