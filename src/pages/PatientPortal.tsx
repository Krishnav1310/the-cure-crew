// CAREVAULT Patient Self-Service Portal — "My Health Access"
import React, { useState, useEffect } from 'react';
import {
  QrCode,
  UserCheck,
  Shield,
  Clock,
  Pill,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Hospital,
  ArrowRight,
  Lock,
  HeartPulse,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PATIENT_OPTIONS = [
  { id: 'PT-2048', name: 'Aarav Sharma', condition: 'Dengue Fever', defaultStatus: 'ACTIVE' },
  { id: 'PT-1001', name: 'Priya Patel', condition: 'P. Vivax Malaria', defaultStatus: 'ACTIVE' },
  { id: 'PT-1002', name: 'Rohan Joshi', condition: 'Hypertension', defaultStatus: 'ACTIVE' },
  { id: 'PT-1003', name: 'Sneha Kulkarni', condition: 'Migraine with Aura', defaultStatus: 'ACTIVE' },
  { id: 'PT-1004', name: 'Vikram Deshmukh', condition: 'CKD Stage 3b', defaultStatus: 'REVOKED' },
  { id: 'PT-1005', name: 'Meera Nair', condition: 'Bronchial Asthma', defaultStatus: 'ACTIVE' },
];

export const PatientPortal: React.FC = () => {
  const { token } = useAuth();
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PT-2048');
  const [patientData, setPatientData] = useState<any>(null);
  const [accessHistory, setAccessHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTogglingConsent, setIsTogglingConsent] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'access_logs' | 'medications' | 'safety'>('access_logs');

  const fetchPatientRecord = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/patient/my-record?patientId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPatientData(data.patient);
        setAccessHistory(data.accessHistory || []);
      }
    } catch (err) {
      console.error('Failed to load patient record:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientRecord(selectedPatientId);
  }, [selectedPatientId]);

  const handleToggleConsent = async () => {
    setIsTogglingConsent(true);
    try {
      const res = await fetch('/api/patient/toggle-consent', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId: selectedPatientId }),
      });
      if (res.ok) {
        await fetchPatientRecord(selectedPatientId);
      }
    } catch (err) {
      console.error('Failed to toggle consent:', err);
    } finally {
      setIsTogglingConsent(false);
    }
  };

  const isConsentActive = patientData?.consent?.status === 'ACTIVE';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Patient Switcher for Demo / Multi-Patient Experience */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-4 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-muted font-bold">
              PATIENT IDENTITY SIMULATOR
            </span>
            <p className="text-xs text-charcoal-muted">
              Select which citizen profile to view as the patient. You can control consent and review access logs.
            </p>
          </div>
          <span className="text-[11px] font-mono bg-warm-200 text-charcoal px-2.5 py-1 rounded-lg self-start sm:self-auto font-semibold">
            Active: {patientData?.id || selectedPatientId}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PATIENT_OPTIONS.map((p) => {
            const isSelected = selectedPatientId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-ink bg-ink text-warm-50 shadow-sm'
                    : 'border-warm-300 bg-white text-charcoal hover:border-warm-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-sage' : 'text-charcoal-muted'}`}>
                    {p.id}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.defaultStatus === 'REVOKED' ? 'bg-mutedRed' : 'bg-sage'
                    }`}
                  />
                </div>
                <div className="font-bold text-xs truncate leading-snug">{p.name}</div>
                <div className={`text-[10px] truncate ${isSelected ? 'text-warm-200' : 'text-charcoal-muted'}`}>
                  {p.condition}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-dark font-bold uppercase tracking-wider mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Patient Self-Service Boundary • My Health Access</span>
          </div>
          <h1 className="text-2xl font-bold text-ink">
            {patientData?.name || 'Citizen Portal'}
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            You own your health data. Inspect clinical access logs, manage medical consent, and view your digital health QR card.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-warm-200 text-charcoal">
            ABDM ID: {patientData?.id}
          </span>
          <button
            onClick={() => fetchPatientRecord(selectedPatientId)}
            className="p-1.5 rounded-lg border border-warm-300 bg-white text-charcoal-muted hover:text-ink hover:bg-warm-100 transition-colors"
            title="Refresh patient data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Identity QR Card & Consent Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Digital Identity QR Card */}
        <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-warm-300 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-muted font-bold flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-sage-dark" />
                <span>Digital Health Pass</span>
              </span>
              <span className="text-[10px] font-mono bg-sage-subtle text-sage-dark px-2 py-0.5 rounded font-bold">
                Zero-PII Token
              </span>
            </div>

            <div className="bg-white rounded-xl p-5 border border-warm-300 shadow-sm flex flex-col items-center text-center">
              {/* Dynamic SVG QR Pattern */}
              <div className="w-40 h-40 bg-ink p-3 rounded-xl flex flex-col items-center justify-center relative shadow-inner mb-3">
                <svg className="w-full h-full text-warm-50" viewBox="0 0 100 100" fill="currentColor">
                  {/* Position Finder Top-Left */}
                  <rect x="5" y="5" width="26" height="26" rx="3" fill="#FAF8F5" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="#17212B" />
                  <rect x="13" y="13" width="10" height="10" rx="1" fill="#FAF8F5" />

                  {/* Position Finder Top-Right */}
                  <rect x="69" y="5" width="26" height="26" rx="3" fill="#FAF8F5" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="#17212B" />
                  <rect x="77" y="13" width="10" height="10" rx="1" fill="#FAF8F5" />

                  {/* Position Finder Bottom-Left */}
                  <rect x="5" y="69" width="26" height="26" rx="3" fill="#FAF8F5" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="#17212B" />
                  <rect x="13" y="77" width="10" height="10" rx="1" fill="#FAF8F5" />

                  {/* Simulated Dynamic Data Dots */}
                  <rect x="36" y="8" width="6" height="6" rx="1" fill="#8FA89B" />
                  <rect x="46" y="8" width="6" height="6" rx="1" fill="#FAF8F5" />
                  <rect x="56" y="8" width="6" height="6" rx="1" fill="#8FA89B" />
                  <rect x="36" y="18" width="6" height="6" rx="1" fill="#FAF8F5" />
                  <rect x="46" y="18" width="6" height="6" rx="1" fill="#8FA89B" />
                  <rect x="56" y="18" width="6" height="6" rx="1" fill="#FAF8F5" />

                  <rect x="8" y="36" width="6" height="6" rx="1" fill="#FAF8F5" />
                  <rect x="18" y="36" width="6" height="6" rx="1" fill="#8FA89B" />
                  <rect x="28" y="36" width="6" height="6" rx="1" fill="#FAF8F5" />
                  <rect x="8" y="46" width="6" height="6" rx="1" fill="#8FA89B" />
                  <rect x="18" y="46" width="6" height="6" rx="1" fill="#FAF8F5" />
                  <rect x="28" y="46" width="6" height="6" rx="1" fill="#8FA89B" />

                  <rect x="36" y="36" width="12" height="12" rx="2" fill="#FAF8F5" />
                  <rect x="52" y="36" width="12" height="12" rx="2" fill="#8FA89B" />
                  <rect x="68" y="36" width="10" height="10" rx="2" fill="#FAF8F5" />
                  <rect x="82" y="36" width="10" height="10" rx="2" fill="#8FA89B" />

                  <rect x="36" y="52" width="10" height="10" rx="2" fill="#8FA89B" />
                  <rect x="50" y="52" width="14" height="14" rx="2" fill="#FAF8F5" />
                  <rect x="68" y="52" width="12" height="12" rx="2" fill="#8FA89B" />

                  <rect x="36" y="68" width="10" height="10" rx="2" fill="#FAF8F5" />
                  <rect x="50" y="68" width="12" height="12" rx="2" fill="#8FA89B" />
                  <rect x="66" y="68" width="10" height="10" rx="2" fill="#FAF8F5" />
                  <rect x="80" y="68" width="12" height="12" rx="2" fill="#8FA89B" />
                </svg>
              </div>

              <div className="font-mono text-xs text-charcoal font-bold bg-warm-100 px-3 py-1 rounded-md border border-warm-300 mb-2">
                {patientData?.qrCodeId || `CV-QR-${patientData?.id}-SEC998`}
              </div>

              <div className="text-xs text-charcoal-muted leading-tight">
                Present this card to authorized clinicians at triage or registration.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-warm-300 flex items-center justify-between text-xs text-charcoal-muted">
            <span>Blood Group: <strong className="text-ink">{patientData?.bloodGroup || 'O+'}</strong></span>
            <span>Facility: <strong className="text-ink">{patientData?.facility || 'CityCare'}</strong></span>
          </div>
        </div>

        {/* Consent Governance */}
        <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-warm-300 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-muted font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sage-dark" />
                <span>Consent Governance</span>
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  isConsentActive
                    ? 'bg-sage-subtle text-sage-dark'
                    : 'bg-mutedRed-subtle text-mutedRed'
                }`}
              >
                STATUS: {patientData?.consent?.status || 'ACTIVE'}
              </span>
            </div>

            <p className="text-xs text-charcoal leading-relaxed mb-4">
              {isConsentActive ? (
                <>
                  Your clinical consent is currently <strong>ACTIVE</strong>. Certified doctors with valid medical rationale (Treatment, Follow-up) can view your longitudinal visits and prescriptions.
                </>
              ) : (
                <>
                  Your clinical consent is currently <strong>REVOKED</strong>. All standard doctor access requests will be blocked immediately with a 403 Forbidden boundary check.
                </>
              )}
            </p>

            <div className="space-y-2 text-xs font-mono text-charcoal-muted bg-warm-100 p-3.5 rounded-xl border border-warm-300 mb-6">
              <div className="flex justify-between">
                <span>Allowed Clinical Purposes:</span>
                <span className="font-semibold text-ink">Treatment, Emergency</span>
              </div>
              <div className="flex justify-between">
                <span>Patient Revocation Right:</span>
                <span className="font-semibold text-sage-dark">Instant 1-Click</span>
              </div>
              <div className="flex justify-between">
                <span>Policy Validity:</span>
                <span className="font-semibold text-ink">
                  {patientData?.consent?.expiresAt?.substring(0, 10) || '2026-12-31'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleConsent}
            disabled={isTogglingConsent}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
              isConsentActive
                ? 'bg-mutedRed text-white hover:bg-mutedRed-dark'
                : 'bg-sage text-white hover:bg-sage-dark'
            }`}
          >
            {isTogglingConsent ? (
              'Updating Consent Policy...'
            ) : isConsentActive ? (
              <>
                <XCircle className="w-4 h-4" />
                <span>Revoke Doctor Access Consent</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Re-Activate Clinical Consent</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs for Patient Self-Service Insights */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-warm-300 gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('access_logs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'access_logs'
                  ? 'bg-ink text-warm-50'
                  : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Who Checked My File ({accessHistory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('medications')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'medications'
                  ? 'bg-ink text-warm-50'
                  : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>My Medications ({patientData?.prescriptions?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'safety'
                  ? 'bg-ink text-warm-50'
                  : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Allergies ({patientData?.allergies?.length || 0})</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-charcoal-muted">
            Data boundary: Personal Citizen View
          </span>
        </div>

        {/* Tab 1: Access Logs */}
        {activeTab === 'access_logs' && (
          <div>
            {accessHistory.length === 0 ? (
              <div className="text-center py-8 text-xs text-charcoal-muted font-mono">
                No access events recorded yet for this session. Visit Doctor View to trigger clinical queries.
              </div>
            ) : (
              <div className="divide-y divide-warm-200">
                {accessHistory.map((item, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">{item.actor}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-200 text-charcoal">
                          {item.facility}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            item.result === 'ALLOWED'
                              ? 'bg-sage-subtle text-sage-dark'
                              : 'bg-mutedRed-subtle text-mutedRed'
                          }`}
                        >
                          {item.result}
                        </span>
                      </div>
                      <div className="text-[11px] text-charcoal-muted mt-0.5">
                        Clinical Purpose: <strong className="text-charcoal">{item.purpose}</strong> • Scope: {item.scope}
                      </div>
                    </div>

                    <div className="text-right text-[11px] font-mono text-charcoal-muted shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Medications */}
        {activeTab === 'medications' && (
          <div className="space-y-3">
            {patientData?.prescriptions?.length === 0 ? (
              <p className="text-xs text-charcoal-muted font-mono py-4">No active prescriptions on file.</p>
            ) : (
              patientData?.prescriptions?.map((rx: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-warm-300 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-ink">{rx.drugName || rx.medication}</div>
                    <div className="text-[11px] text-charcoal-muted">
                      Dosage: {rx.dosage} • Frequency: {rx.frequency} • Prescribed by: {rx.prescriber || 'Staff Clinician'}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-warm-200 text-charcoal px-2.5 py-1 rounded font-semibold">
                    {rx.duration || 'Active'}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Allergies & Safety */}
        {activeTab === 'safety' && (
          <div className="space-y-3">
            {patientData?.allergies?.length === 0 ? (
              <p className="text-xs text-charcoal-muted font-mono py-4">No known drug allergies recorded (NKDA).</p>
            ) : (
              patientData?.allergies?.map((allergy: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-mutedRed-subtle/50 border border-mutedRed/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-mutedRed flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{allergy.substance || allergy}</span>
                    </div>
                    <div className="text-[11px] text-charcoal-muted mt-0.5">
                      Reaction: {allergy.reaction || 'Severe Hypersensitivity'} • Severity: {allergy.severity || 'CRITICAL'}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-mutedRed text-white px-2 py-0.5 rounded font-bold">
                    CONTRAINDICATED
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
