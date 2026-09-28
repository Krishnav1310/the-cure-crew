// CAREVAULT Streamlined & User-Friendly Top Navigation
import React from 'react';
import { Shield, Stethoscope, BarChart3, Lock, Presentation, UserCheck, History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, login } = useAuth();

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    // Auto-switch role for seamless user-friendliness
    if (tab === 'clinician-scan' || tab === 'clinician-dashboard') {
      if (user?.role !== 'CLINICIAN') login('clinician');
    } else if (tab === 'admin-dashboard') {
      if (user?.role !== 'ADMIN') login('admin');
    } else if (tab === 'patient-dashboard') {
      if (user?.role !== 'PATIENT') login('patient');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-warm-50/95 backdrop-blur-md border-b border-warm-300 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center text-sage border border-warm-300 group-hover:border-sage transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-ink">CAREVAULT</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sage-subtle text-sage-dark font-semibold">
                FIREWALL
              </span>
            </div>
            <p className="text-[11px] text-charcoal-muted leading-none hidden sm:block">
              Connected care. Protected identities.
            </p>
          </div>
        </div>

        {/* Primary Simple Navigation */}
        <nav className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold">
          {/* Tab 1: Overview */}
          <button
            onClick={() => handleNavClick('home')}
            className={`px-2.5 sm:px-3 py-2 rounded-lg transition-colors ${
              currentTab === 'home' || currentTab === 'how-it-works' || currentTab === 'privacy'
                ? 'bg-ink text-warm-50 shadow-sm'
                : 'text-charcoal hover:bg-warm-200'
            }`}
          >
            Overview
          </button>

          {/* Tab 2: Doctor View */}
          <button
            onClick={() => handleNavClick('clinician-scan')}
            className={`px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              currentTab === 'clinician-scan' || currentTab === 'clinician-dashboard' || currentTab === 'clinician-emergency'
                ? 'bg-sage text-white shadow-sm'
                : 'text-sage-dark hover:bg-sage-subtle'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor View</span>
          </button>

          {/* Tab 3: Patient View */}
          <button
            onClick={() => handleNavClick('patient-dashboard')}
            className={`px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              currentTab === 'patient-dashboard'
                ? 'bg-amber-dark text-white shadow-sm'
                : 'text-amber-dark hover:bg-amber-subtle'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Patient View</span>
          </button>

          {/* Tab 4: Public Health Admin */}
          <button
            onClick={() => handleNavClick('admin-dashboard')}
            className={`px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              currentTab === 'admin-dashboard' || currentTab === 'admin-trends'
                ? 'bg-dusty text-white shadow-sm'
                : 'text-dusty-dark hover:bg-dusty-subtle'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Public Health</span>
            <span className="md:hidden">Health</span>
          </button>

          {/* Tab 5: Security Center */}
          <button
            onClick={() => handleNavClick('security-lab')}
            className={`px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              currentTab === 'security-lab'
                ? 'bg-terracotta text-white shadow-sm'
                : 'text-terracotta hover:bg-terracotta/10'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Security Lab</span>
            <span className="md:hidden">Lab</span>
          </button>

          {/* Tab 6: Pitch Deck */}
          <button
            onClick={() => handleNavClick('presentation')}
            className={`px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              currentTab === 'presentation'
                ? 'bg-ink text-white shadow-sm'
                : 'text-charcoal hover:bg-warm-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Pitch Deck</span>
            <span className="lg:hidden">Deck</span>
          </button>
        </nav>

        {/* Right Utility: Audit Vault */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentTab('audit-vault')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 border ${
              currentTab === 'audit-vault'
                ? 'bg-warm-200 border-ink text-ink font-bold'
                : 'bg-warm-100 border-warm-300 text-charcoal-muted hover:text-ink hover:bg-warm-200'
            }`}
            title="Inspect Immutable Audit Stream"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audit Log</span>
          </button>
        </div>
      </div>
    </header>
  );
};
