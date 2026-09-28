// CAREVAULT Role Selection & Dedicated Authentication Screen
import React, { useState } from 'react';
import {
  Stethoscope,
  BarChart3,
  UserCheck,
  Shield,
  Lock,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  initialRole?: 'clinician' | 'admin' | 'patient' | null;
  onSuccess: (role: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialRole = null, onSuccess }) => {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'clinician' | 'admin' | 'patient' | null>(initialRole);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [mfaCode, setMfaCode] = useState('882190');
  const [error, setError] = useState<string | null>(null);

  // Set default values when role changes
  const handleSelectRole = (role: 'clinician' | 'admin' | 'patient') => {
    setSelectedRole(role);
    setError(null);
    if (role === 'clinician') {
      setEmail('dr.kulkarni@citycare.org');
      setMfaCode('882190');
    } else if (role === 'admin') {
      setEmail('rajesh.varma@publichealth.gov');
      setMfaCode('441092');
    } else {
      setEmail('aarav.sharma@gmail.com');
      setMfaCode('102948');
    }
  };

  const handleDemoLogin = async (role: 'clinician' | 'admin' | 'patient') => {
    setError(null);
    const success = await login(role);
    if (success) {
      onSuccess(role);
    } else {
      setError('Authentication failed. Please verify credentials.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    handleDemoLogin(selectedRole);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-4xl mx-auto px-4 py-12">
      {/* Title & context */}
      <div className="text-center mb-10">
        <div className="w-12 h-12 rounded-xl bg-ink text-sage mx-auto flex items-center justify-center mb-4 shadow-sm border border-warm-300">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          How are you accessing CAREVAULT?
        </h1>
        <p className="text-sm text-charcoal-muted mt-2 max-w-lg mx-auto">
          Security policy strictly bounds identity credentials to their authorized data plane.
        </p>
      </div>

      {/* Security message banner */}
      <div className="bg-warm-100 border border-warm-300 rounded-lg p-3 text-xs text-charcoal flex items-center justify-center gap-2 mb-8 font-mono">
        <Lock className="w-3.5 h-3.5 text-sage-dark shrink-0" />
        <span>Your role determines what information you are authorized to access.</span>
      </div>

      {/* STEP 1: If role is not yet selected, show role selection cards */}
      {!selectedRole ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Clinician */}
          <div
            onClick={() => handleSelectRole('clinician')}
            className="group bg-warm-50 border-2 border-warm-300 hover:border-sage rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-sage-subtle text-sage-dark flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sage-dark">
                Clinical Workspace
              </span>
              <h3 className="text-2xl font-bold text-ink mt-1 mb-2">CLINICIAN</h3>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                Access authorized patient records, verify treatment consent, review longitudinal history,
                and invoke emergency Break-Glass protocols.
              </p>

              <div className="space-y-2 text-xs font-mono text-charcoal-muted mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>QR Patient Identification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>Longitudinal EHR Timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>Emergency Break-Glass Override</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectRole('clinician');
              }}
              className="w-full py-3 px-4 rounded-lg bg-ink text-warm-50 font-semibold text-sm hover:bg-ink-light transition-colors flex items-center justify-center gap-2 group-hover:bg-sage group-hover:text-white"
            >
              <span>Continue as Clinician</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Public Health Administrator */}
          <div
            onClick={() => handleSelectRole('admin')}
            className="group bg-warm-50 border-2 border-warm-300 hover:border-dusty rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-dusty-subtle text-dusty-dark flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-dusty-dark">
                Surveillance Intelligence
              </span>
              <h3 className="text-2xl font-bold text-ink mt-1 mb-2">PUBLIC HEALTH ADMINISTRATOR</h3>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                Monitor population health trends, regional outbreak heatmaps, and seasonal curves
                under strict K-anonymity privacy gate protection.
              </p>

              <div className="space-y-2 text-xs font-mono text-charcoal-muted mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-dusty" />
                  <span>Macro Disease Surveillance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-dusty" />
                  <span>Privacy Gate Firewall (K ≥ 5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-dusty" />
                  <span>Differencing Attack Blocker</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectRole('admin');
              }}
              className="w-full py-3 px-4 rounded-lg bg-ink text-warm-50 font-semibold text-sm hover:bg-ink-light transition-colors flex items-center justify-center gap-2 group-hover:bg-dusty group-hover:text-white"
            >
              <span>Continue as Administrator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: Dedicated role login screen */
        <div className="max-w-md mx-auto w-full bg-warm-50 rounded-2xl border border-warm-300 p-8 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-warm-300 mb-6">
            <div className="flex items-center gap-2">
              {selectedRole === 'clinician' && <Stethoscope className="w-5 h-5 text-sage-dark" />}
              {selectedRole === 'admin' && <BarChart3 className="w-5 h-5 text-dusty-dark" />}
              {selectedRole === 'patient' && <UserCheck className="w-5 h-5 text-amber-dark" />}
              <h3 className="font-bold text-ink text-lg uppercase tracking-tight">
                {selectedRole} Authentication
              </h3>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs text-charcoal-muted hover:text-ink underline"
            >
              Switch Role
            </button>
          </div>

          {error && (
            <div className="p-3 mb-6 bg-mutedRed-subtle border border-mutedRed/30 rounded-lg text-xs text-mutedRed-dark flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Button (Highlighted for hackathon presentation) */}
          <div className="mb-6 p-4 bg-warm-100 rounded-xl border border-warm-300 text-center">
            <span className="text-[11px] font-mono text-charcoal-muted uppercase tracking-wider block mb-2">
              Fast Hackathon Evaluation
            </span>
            <button
              type="button"
              onClick={() => handleDemoLogin(selectedRole)}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-semibold text-xs tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 ${
                selectedRole === 'clinician'
                  ? 'bg-sage hover:bg-sage-dark'
                  : selectedRole === 'admin'
                  ? 'bg-dusty hover:bg-dusty-dark'
                  : 'bg-amber-dark hover:bg-amber'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>
                {isLoading ? 'Verifying...' : `Use Demo ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Identity`}
              </span>
            </button>
            <span className="text-[10px] text-charcoal-muted mt-1.5 block font-mono">
              Auto-populates verified credentials & MFA token
            </span>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-warm-300 w-full" />
            <span className="bg-warm-50 px-3 text-[11px] font-mono text-charcoal-muted uppercase">
              Or Manual Sign-In
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                {selectedRole === 'clinician'
                  ? 'Professional Hospital ID / Email'
                  : selectedRole === 'admin'
                  ? 'Official Health Department Email'
                  : 'Patient Registered Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-warm-300 bg-white focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-warm-300 bg-white focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-charcoal">
                  MFA Code (FIDO2 / TOTP)
                </label>
                <span className="text-[10px] font-mono text-sage-dark">Verified</span>
              </div>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                maxLength={6}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-warm-300 bg-white focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage font-mono tracking-widest text-center"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-2.5 px-4 rounded-lg bg-ink text-warm-50 font-semibold text-xs hover:bg-ink-light transition-colors"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Data Plane'}
            </button>
          </form>
        </div>
      )}

      {/* Lightweight Patient Option */}
      {!selectedRole && (
        <div className="text-center mt-12 pt-6 border-t border-warm-300">
          <p className="text-xs text-charcoal-muted mb-2">
            Are you a patient looking to inspect your health access history?
          </p>
          <button
            onClick={() => handleSelectRole('patient')}
            className="text-xs font-bold text-ink hover:text-sage-dark transition-colors inline-flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-sage" />
            <span>Open Patient "My Health Access" Portal →</span>
          </button>
        </div>
      )}
    </div>
  );
};
