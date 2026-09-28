// CAREVAULT Editorial Footer
import React from 'react';
import { Shield, Lock, EyeOff } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-ink text-warm-200 border-t border-ink-light pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-ink-light">
          {/* Brand & core mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-warm-100 flex items-center justify-center text-ink">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-warm-50 tracking-tight">CAREVAULT</span>
            </div>
            <p className="text-sm text-warm-400 max-w-md leading-relaxed">
              Connected care. Protected identities. A privacy-enforced architectural bridge separating
              individual clinical care records from population-level health intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-sage font-mono">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <span>SYNTHETIC DEMO DATA ONLY — STRICTLY NO REAL PATIENT INFORMATION</span>
            </div>
          </div>

          {/* Boundaries */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-warm-400 mb-3">
              Data Planes
            </h4>
            <ul className="space-y-2 text-sm text-warm-300">
              <li>
                <button onClick={() => setCurrentTab('clinician-scan')} className="hover:text-white transition-colors">
                  Doctor View (Clinical Care)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin-dashboard')} className="hover:text-white transition-colors">
                  Public Health (Disease Trends)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('patient-dashboard')} className="hover:text-white transition-colors">
                  Patient View (Consent & QR)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('security-lab')} className="hover:text-white transition-colors">
                  Security Lab (Attack Simulation)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('presentation')} className="hover:text-white transition-colors">
                  Pitch Deck (Project Slides)
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Governance */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-warm-400 mb-3">
              Guarantees
            </h4>
            <ul className="space-y-2 text-sm text-warm-300">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sage" />
                <span>K-Anonymity (K ≥ 5)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <EyeOff className="w-3.5 h-3.5 text-sage" />
                <span>Differencing Defense</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sage" />
                <span>Role-Based API Enforcement</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-sage font-mono">01</span>
                <span>Immutable Audit Vault</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-400 gap-4">
          <p>© 2026 CAREVAULT Architectural Prototype. Built for College Hackathon Demonstration.</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentTab('home')} className="hover:text-white">Overview</button>
            <button onClick={() => setCurrentTab('clinician-scan')} className="hover:text-white">Doctor View</button>
            <button onClick={() => setCurrentTab('admin-dashboard')} className="hover:text-white">Public Health</button>
            <button onClick={() => setCurrentTab('security-lab')} className="hover:text-white">Security Lab</button>
            <button onClick={() => setCurrentTab('presentation')} className="hover:text-white">Pitch Deck</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
