// CAREVAULT Doctor Workspace — Multi-Patient, QR Scanner & Patient History Log
import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Stethoscope,
  Clock,
  Shield,
  AlertTriangle,
  FileText,
  Pill,
  CheckCircle2,
  Activity,
  AlertOctagon,
  ArrowRight,
  Lock,
  Camera,
  UserCheck,
  History,
  X,
  Search,
  Eye,
  RefreshCw,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PatientRecord, CriticalSafetyRecord } from '../types';

interface PatientSummary {
  id: string;
  name: string;
  age: number;
  sex: string;
  bloodGroup: string;
  condition: string;
  consent: 'ACTIVE' | 'REVOKED';
  qrCodeId: string;
  facility: string;
}

const REGISTERED_PATIENTS: PatientSummary[] = [
  { id: 'PT-2048', name: 'Aarav Sharma', age: 38, sex: 'Male', bloodGroup: 'O+', condition: 'Dengue Fever / Type 2 Diabetes', consent: 'ACTIVE', qrCodeId: 'CV-QR-PT2048-SEC998', facility: 'CityCare Hospital, Pune' },
  { id: 'PT-1001', name: 'Priya Patel', age: 29, sex: 'Female', bloodGroup: 'B+', condition: 'P. Vivax Malaria / Antenatal Care', consent: 'ACTIVE', qrCodeId: 'CV-QR-PT1001-SEC512', facility: 'Metro General Hospital, Mumbai' },
  { id: 'PT-1002', name: 'Rohan Joshi', age: 45, sex: 'Male', bloodGroup: 'A+', condition: 'Stage 2 Hypertension / Dyslipidemia', consent: 'ACTIVE', qrCodeId: 'CV-QR-PT1002-SEC409', facility: 'Western Medical, Nashik' },
  { id: 'PT-1003', name: 'Sneha Kulkarni', age: 34, sex: 'Female', bloodGroup: 'AB+', condition: 'Migraine with Aura / Hypothyroidism', consent: 'ACTIVE', qrCodeId: 'CV-QR-PT1003-SEC881', facility: 'CityCare Hospital, Pune' },
  { id: 'PT-1004', name: 'Vikram Deshmukh', age: 52, sex: 'Male', bloodGroup: 'O-', condition: 'CKD Stage 3b (Consent Revoked Demo)', consent: 'REVOKED', qrCodeId: 'CV-QR-PT1004-SEC302', facility: 'Civil Hospital, Nagpur' },
  { id: 'PT-1005', name: 'Meera Nair', age: 41, sex: 'Female', bloodGroup: 'B-', condition: 'Persistent Asthma / Allergic Rhinitis', consent: 'ACTIVE', qrCodeId: 'CV-QR-PT1005-SEC774', facility: 'Apollo Clinic, Kolhapur' },
];

export const ClinicianPortal: React.FC<{ initialTab?: string }> = () => {
  const { user, token } = useAuth();

  // Active Patient State
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PT-2048');
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessError, setAccessError] = useState<string | null>(null);
  const [activeRecordTab, setActiveRecordTab] = useState<'timeline' | 'audit-log' | 'prescriptions' | 'safety'>('timeline');

  // Patient-specific Access & Audit History Log
  const [accessLogs, setAccessLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState<boolean>(false);

  // QR Access Modal State
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [qrModalTab, setQrModalTab] = useState<'scanner' | 'cards' | 'manual'>('scanner');
  const [manualTokenInput, setManualTokenInput] = useState<string>('PT-2048');
  const [previewCardPatient, setPreviewCardPatient] = useState<PatientSummary>(REGISTERED_PATIENTS[0]);

  // Break-Glass Emergency Modal State
  const [isBreakGlassOpen, setIsBreakGlassOpen] = useState<boolean>(false);
  const [breakGlassReason, setBreakGlassReason] = useState<string>(
    'Patient unconscious in trauma bay; urgent medication/allergy verification required.'
  );
  const [breakGlassData, setBreakGlassData] = useState<CriticalSafetyRecord | null>(null);
  const [isBreakGlassLoading, setIsBreakGlassLoading] = useState<boolean>(false);

  // Fetch Patient Record & Logs
  const fetchPatient = async (id: string) => {
    setIsLoading(true);
    setAccessError(null);
    setBreakGlassData(null);
    setSelectedPatientId(id);

    try {
      const res = await fetch(`/api/clinical/patients/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-purpose': 'Treatment',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setAccessError(data.message || 'Access denied by clinical firewall.');
        setPatientRecord(null);
      } else {
        setPatientRecord(data.patient);
        // Find matching summary for card preview
        const foundSummary = REGISTERED_PATIENTS.find(p => p.id === id);
        if (foundSummary) setPreviewCardPatient(foundSummary);
      }
    } catch (err: any) {
      setAccessError(err.message || 'Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch specific audit history logs for this patient
  const fetchPatientAccessLogs = async (id: string) => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch(`/api/clinical/patients/${id}/access-logs`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAccessLogs(data.accessLogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Load patient on initial mount and when selected ID changes
  useEffect(() => {
    fetchPatient(selectedPatientId);
    fetchPatientAccessLogs(selectedPatientId);
  }, [token, selectedPatientId]);

  // Handle Manual QR Token Verification
  const handleVerifyManualToken = () => {
    if (!manualTokenInput.trim()) return;
    const target = manualTokenInput.trim().toUpperCase();
    const matched = REGISTERED_PATIENTS.find(
      p => p.id.toUpperCase() === target || p.qrCodeId.toUpperCase() === target
    );
    if (matched) {
      fetchPatient(matched.id);
      setIsQRModalOpen(false);
    } else {
      alert(`No registered patient matches QR token '${manualTokenInput}'. Please try PT-2048, PT-1001, etc.`);
    }
  };

  // Handle Emergency Break-Glass
  const handleTriggerBreakGlass = async () => {
    setIsBreakGlassLoading(true);
    try {
      const res = await fetch(`/api/clinical/break-glass/${selectedPatientId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: breakGlassReason }),
      });
      const data = await res.json();
      if (res.ok) {
        setBreakGlassData(data.restrictedSafetyRecord);
        setIsBreakGlassOpen(false);
        fetchPatientAccessLogs(selectedPatientId);
      } else {
        alert(data.message || 'Failed to trigger emergency break-glass.');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsBreakGlassLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner: Doctor Context & Action Buttons */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-[11px] font-mono text-sage-dark font-bold uppercase tracking-wider">
              Clinical Data Plane // Point of Care
            </span>
          </div>
          <h1 className="text-xl font-bold text-ink mt-0.5">Dr. Ananya Kulkarni</h1>
          <p className="text-xs text-charcoal-muted">
            General Medicine • CityCare Hospital, Pune • Active Session (30 min limit)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Main Action: Open QR Scanner & Badges Hub */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-sage text-white text-xs font-bold hover:bg-sage-dark transition-all shadow-sm flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan / Access Patient QR</span>
          </button>

          {/* Break-Glass Emergency Action */}
          <button
            onClick={() => setIsBreakGlassOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-mutedRed/10 text-mutedRed border border-mutedRed/30 text-xs font-bold hover:bg-mutedRed hover:text-white transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Break-Glass Override</span>
          </button>
        </div>
      </div>

      {/* Multi-Patient Directory & Quick Switcher */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-4 shadow-subtle space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-sage" />
            Registered Patient Cohort ({REGISTERED_PATIENTS.length} Patients Available)
          </span>
          <span className="text-[11px] font-mono text-charcoal-muted hidden sm:inline">
            Click any patient to simulate QR card lookup
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {REGISTERED_PATIENTS.map((p) => {
            const isSelected = selectedPatientId === p.id;
            const isRevoked = p.consent === 'REVOKED';

            return (
              <button
                key={p.id}
                onClick={() => fetchPatient(p.id)}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? isRevoked
                      ? 'bg-mutedRed-subtle border-mutedRed shadow-sm'
                      : 'bg-sage-subtle border-sage shadow-sm'
                    : 'bg-white border-warm-200 hover:border-warm-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                    <span className="font-bold text-ink">{p.id}</span>
                    <span className={`px-1 py-0.2 rounded font-bold ${
                      isRevoked ? 'bg-mutedRed text-white' : 'bg-sage text-white'
                    }`}>
                      {isRevoked ? 'REVOKED' : 'ACTIVE'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ink truncate">{p.name}</h4>
                  <p className="text-[10px] text-charcoal-muted truncate">{p.condition}</p>
                </div>
                <div className="mt-2 pt-1 border-t border-warm-200 text-[10px] font-mono text-charcoal-muted flex items-center justify-between">
                  <span>{p.bloodGroup}</span>
                  <span className="text-sage-dark font-medium">Scan →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Access Denied Alert Box (e.g. for PT-1004 Revoked Consent) */}
      {accessError && (
        <div className="bg-mutedRed-subtle border-2 border-mutedRed/40 rounded-2xl p-6 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-mutedRed-dark">
              <AlertOctagon className="w-5 h-5 text-mutedRed" />
              <h3 className="font-bold text-base">Access Blocked by Privacy Boundary Firewall</h3>
            </div>
            <span className="text-xs font-mono bg-mutedRed text-white px-2.5 py-0.5 rounded font-bold">
              HTTP 403 FORBIDDEN
            </span>
          </div>

          <p className="text-xs text-charcoal leading-relaxed">{accessError}</p>

          <div className="p-3 bg-white/80 rounded-xl border border-mutedRed/20 text-xs font-mono space-y-1 text-charcoal">
            <div>• Identity Verification: <strong className="text-sage-dark">CLIN-8821 (Dr. Ananya Kulkarni) Verified ✓</strong></div>
            <div>• Role Enforcement: <strong className="text-sage-dark">CLINICIAN Authorized ✓</strong></div>
            <div>• Patient Consent Status: <strong className="text-mutedRed">REVOKED ✕ (Access Rejected)</strong></div>
            <div>• ABDM / HIPAA Rule: <strong className="text-ink">Patient consent is revocable at will. Clinician cannot bypass active consent in routine care.</strong></div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-charcoal-muted">
              Unconscious patient in emergency? Use Break-Glass override to access life-critical allergies.
            </span>
            <button
              onClick={() => setIsBreakGlassOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-mutedRed text-white text-xs font-bold hover:bg-mutedRed-dark transition-all"
            >
              Trigger Break-Glass Emergency →
            </button>
          </div>
        </div>
      )}

      {/* Break-Glass Restricted Safety Record (If Activated) */}
      {breakGlassData && (
        <div className="bg-mutedRed-subtle/40 border-2 border-mutedRed rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-mutedRed/30">
            <div className="flex items-center gap-2 text-mutedRed font-bold text-sm uppercase font-mono">
              <AlertOctagon className="w-5 h-5" />
              <span>Break-Glass Emergency Safety Profile ({selectedPatientId})</span>
            </div>
            <span className="text-[10px] font-mono bg-mutedRed text-white px-2.5 py-1 rounded-full font-bold">
              CRITICAL AUDIT EVENT SEALED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-warm-300">
              <span className="text-[10px] font-mono text-charcoal-muted uppercase block">Blood Group</span>
              <span className="text-2xl font-bold text-mutedRed mt-1 block">{breakGlassData.bloodGroup}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-warm-300 sm:col-span-2">
              <span className="text-[10px] font-mono text-charcoal-muted uppercase block mb-1">
                Life-Threatening Drug Allergies
              </span>
              {breakGlassData.criticalAllergies.length > 0 ? (
                breakGlassData.criticalAllergies.map((a, i) => (
                  <div key={i} className="flex justify-between items-center font-bold text-ink py-0.5">
                    <span>{a.allergen}</span>
                    <span className="text-mutedRed text-[11px] font-normal">{a.reaction}</span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-sage font-medium">No life-threatening drug allergies documented</span>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl border border-warm-300 sm:col-span-3">
              <span className="text-[10px] font-mono text-charcoal-muted uppercase block mb-1">
                Current Essential Medications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {breakGlassData.currentMedications.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-warm-100 font-bold text-ink flex justify-between">
                    <span>{m.name}</span>
                    <span className="text-charcoal-muted text-[11px] font-normal">{m.dosage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-warm-300 text-xs text-charcoal-muted flex items-center justify-between">
            <span>
              <strong>Data Minimization Guarantee:</strong> Non-emergency medical history, prior visits, and psychiatric notes are strictly withheld under Break-Glass safety policy.
            </span>
            <button
              onClick={() => setBreakGlassData(null)}
              className="text-xs font-mono font-bold text-mutedRed hover:underline"
            >
              Dismiss Emergency Overlay
            </button>
          </div>
        </div>
      )}

      {/* Main Longitudinal Clinical Record */}
      {patientRecord && !accessError && (
        <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card space-y-6">
          {/* Patient Overview Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-warm-300">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-sage-dark uppercase">
                  Longitudinal Clinical Record
                </span>
                <span className="text-xs font-mono bg-sage-subtle text-sage-dark px-2 py-0.5 rounded font-semibold border border-sage/20">
                  {patientRecord.id}
                </span>
                <span className="text-xs font-mono bg-warm-200 text-charcoal px-2 py-0.5 rounded">
                  QR Token: {patientRecord.qrCodeId || `CV-QR-${patientRecord.id}`}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-ink mt-1">
                {patientRecord.demographics.name}
              </h2>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Age: {patientRecord.demographics.age} • Sex: {patientRecord.demographics.sex} • Blood Group: {patientRecord.demographics.bloodGroup} • {patientRecord.demographics.facility}
              </p>
            </div>

            {/* Status Badges & QR Preview CTA */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setQrModalTab('cards');
                  setIsQRModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-warm-200 hover:bg-warm-300 text-ink border border-warm-300 flex items-center gap-1.5 transition-colors"
                title="View Patient's Physical QR Health Card"
              >
                <Eye className="w-3.5 h-3.5 text-sage-dark" />
                <span>View QR Card</span>
              </button>

              <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-sage-subtle text-sage-dark border border-sage/20 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                Consent: {patientRecord.consent.status}
              </span>

              <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-warm-200 text-charcoal flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-dusty-dark" />
                30-Min Session Active
              </span>
            </div>
          </div>

          {/* Critical Alerts Banner (Allergies + Current Meds) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Allergies Box */}
            <div className="bg-mutedRed-subtle/50 border border-mutedRed/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-mutedRed-dark uppercase mb-2">
                <AlertTriangle className="w-4 h-4 text-mutedRed" />
                <span>Confirmed Drug Allergies ({patientRecord.criticalSafety.criticalAllergies.length})</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {patientRecord.criticalSafety.criticalAllergies.length > 0 ? (
                  patientRecord.criticalSafety.criticalAllergies.map((a, i) => (
                    <div key={i} className="flex justify-between items-center font-bold text-ink">
                      <span>{a.allergen}</span>
                      <span className="text-mutedRed text-[11px] font-normal">{a.reaction}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-sage font-medium">No Known Drug Allergies (NKDA)</span>
                )}
              </div>
            </div>

            {/* Active Meds Box */}
            <div className="bg-warm-100 border border-warm-300 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-charcoal uppercase mb-2">
                <Pill className="w-4 h-4 text-sage" />
                <span>Active Prescription Regimen ({patientRecord.criticalSafety.currentMedications.length})</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {patientRecord.criticalSafety.currentMedications.map((m, i) => (
                  <div key={i} className="flex justify-between items-center font-bold text-ink">
                    <span>{m.name}</span>
                    <span className="text-charcoal-muted text-[11px] font-normal">{m.dosage} • {m.frequency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Inner Tabs for Comprehensive History */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-warm-300 pb-2 overflow-x-auto text-xs font-mono font-bold">
              <button
                onClick={() => setActiveRecordTab('timeline')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeRecordTab === 'timeline'
                    ? 'bg-ink text-warm-50 shadow-sm'
                    : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-sage" />
                <span>Longitudinal Timeline ({patientRecord.timeline.length} Visits)</span>
              </button>

              <button
                onClick={() => {
                  setActiveRecordTab('audit-log');
                  fetchPatientAccessLogs(selectedPatientId);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeRecordTab === 'audit-log'
                    ? 'bg-ink text-warm-50 shadow-sm'
                    : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
                }`}
              >
                <History className="w-3.5 h-3.5 text-amber-dark" />
                <span>Patient Access History Log ({accessLogs.length})</span>
              </button>

              <button
                onClick={() => setActiveRecordTab('prescriptions')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeRecordTab === 'prescriptions'
                    ? 'bg-ink text-warm-50 shadow-sm'
                    : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
                }`}
              >
                <Pill className="w-3.5 h-3.5 text-dusty-dark" />
                <span>Prescription Ledger</span>
              </button>

              <button
                onClick={() => setActiveRecordTab('safety')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeRecordTab === 'safety'
                    ? 'bg-ink text-warm-50 shadow-sm'
                    : 'text-charcoal-muted hover:text-ink hover:bg-warm-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-terracotta" />
                <span>Clinical Safety & Alerts</span>
              </button>
            </div>

            {/* TAB 1: Longitudinal Timeline */}
            {activeRecordTab === 'timeline' && (
              <div className="space-y-4">
                {patientRecord.timeline.length > 0 ? (
                  patientRecord.timeline.map((visit) => (
                    <div key={visit.id} className="p-5 bg-white rounded-xl border border-warm-300 shadow-subtle space-y-4">
                      {/* Visit Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-warm-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-sage-dark">{visit.date}</span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-warm-200 text-charcoal">
                              {visit.type}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-sage-subtle text-sage-dark font-semibold">
                              ICD-10: {visit.diagnosis.code}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-ink mt-0.5">{visit.diagnosis.condition}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-charcoal block">{visit.facility}</span>
                          <span className="text-[11px] text-charcoal-muted">{visit.clinician}</span>
                        </div>
                      </div>

                      {/* Complaint & Notes */}
                      <div className="space-y-1 text-xs">
                        <p className="text-charcoal">
                          <strong className="text-ink">Chief Complaint:</strong> {visit.chiefComplaint}
                        </p>
                        {visit.diagnosis.notes && (
                          <p className="text-charcoal-muted italic">
                            Clinical Notes: {visit.diagnosis.notes}
                          </p>
                        )}
                      </div>

                      {/* Recorded Vitals */}
                      {visit.vitals && (
                        <div className="bg-warm-100 p-3 rounded-xl grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                          <div>
                            <span className="text-charcoal-muted text-[10px] block">Temperature</span>
                            <strong className="text-ink">{visit.vitals.temperature}</strong>
                          </div>
                          <div>
                            <span className="text-charcoal-muted text-[10px] block">Blood Pressure</span>
                            <strong className="text-ink">{visit.vitals.bloodPressure}</strong>
                          </div>
                          <div>
                            <span className="text-charcoal-muted text-[10px] block">Heart Rate</span>
                            <strong className="text-ink">{visit.vitals.pulse}</strong>
                          </div>
                          <div>
                            <span className="text-charcoal-muted text-[10px] block">Respiratory</span>
                            <strong className="text-ink">{visit.vitals.respiratoryRate}</strong>
                          </div>
                          <div>
                            <span className="text-charcoal-muted text-[10px] block">Oxygen (SpO2)</span>
                            <strong className="text-sage-dark">{visit.vitals.spO2}</strong>
                          </div>
                        </div>
                      )}

                      {/* Prescriptions & Observations Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                        {/* Prescriptions */}
                        <div className="space-y-2">
                          <span className="font-mono text-charcoal-muted uppercase text-[10px] block font-bold">
                            Prescriptions Ordered
                          </span>
                          {visit.prescriptions.map((p, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-warm-50 border border-warm-200 space-y-0.5">
                              <div className="flex justify-between items-center font-bold text-ink">
                                <span>{p.drug}</span>
                                <span className="font-mono text-xs">{p.dosage}</span>
                              </div>
                              <div className="text-[11px] text-charcoal-muted">
                                {p.frequency} • {p.duration}
                              </div>
                              {p.instructions && (
                                <div className="text-[10px] text-sage-dark font-medium">
                                  Instructions: {p.instructions}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Observations / Lab Tests */}
                        <div className="space-y-2">
                          <span className="font-mono text-charcoal-muted uppercase text-[10px] block font-bold">
                            Laboratory Observations
                          </span>
                          {visit.observations.map((o, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-warm-50 border border-warm-200 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-ink">{o.test}</span>
                                <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                                  o.flag === 'NORMAL'
                                    ? 'bg-sage-subtle text-sage-dark'
                                    : 'bg-mutedRed-subtle text-mutedRed'
                                }`}>
                                  {o.result}
                                </span>
                              </div>
                              <div className="flex justify-between text-[10px] text-charcoal-muted">
                                <span>Normal: {o.normalRange || 'Standard'}</span>
                                {o.interpretation && <span className="italic">{o.interpretation}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-white rounded-xl border border-warm-300 text-charcoal-muted text-xs">
                    No prior outpatient visits documented for this patient reference.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Patient Access History Log */}
            {activeRecordTab === 'audit-log' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h4 className="text-sm font-bold text-ink">Access & Audit History Log</h4>
                    <p className="text-xs text-charcoal-muted">
                      Cryptographically signed audit records tracking every access event for {patientRecord.demographics.name} ({patientRecord.id})
                    </p>
                  </div>
                  <button
                    onClick={() => fetchPatientAccessLogs(selectedPatientId)}
                    className="text-xs font-mono text-sage-dark hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh Log</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-warm-300 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-warm-100 border-b border-warm-300 font-mono text-[11px] text-charcoal-muted uppercase">
                      <tr>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Clinician / Actor</th>
                        <th className="p-3">Facility</th>
                        <th className="p-3">Action & Purpose</th>
                        <th className="p-3">Scope Delivered</th>
                        <th className="p-3">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-200 font-mono text-[11px]">
                      {accessLogs.map((log, idx) => (
                        <tr key={idx} className="hover:bg-warm-50/80 transition-colors">
                          <td className="p-3 text-charcoal whitespace-nowrap">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Recent'}
                          </td>
                          <td className="p-3 font-bold text-ink whitespace-nowrap">
                            {log.actor} ({log.role})
                          </td>
                          <td className="p-3 text-charcoal-muted whitespace-nowrap">
                            {log.facility || 'CityCare Hospital'}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="text-ink font-semibold">{log.action}</span>
                            <span className="text-[10px] text-charcoal-muted block">Purpose: {log.purpose}</span>
                          </td>
                          <td className="p-3 text-charcoal-muted">
                            {log.scope || log.metadata?.scope || 'Full Longitudinal Timeline'}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              log.result === 'ALLOWED'
                                ? 'bg-sage-subtle text-sage-dark'
                                : log.severity === 'CRITICAL'
                                ? 'bg-mutedRed text-white'
                                : 'bg-mutedRed-subtle text-mutedRed'
                            }`}>
                              {log.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Prescriptions & Meds Master List */}
            {activeRecordTab === 'prescriptions' && (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-warm-300 space-y-3">
                  <h4 className="text-sm font-bold text-ink">Active & Historical Prescriptions</h4>
                  <div className="divide-y divide-warm-200 text-xs">
                    {patientRecord.timeline.flatMap(v => v.prescriptions).map((p, i) => (
                      <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <strong className="text-ink text-sm block">{p.drug} {p.dosage}</strong>
                          <span className="text-charcoal-muted text-xs">
                            Route: {p.route || 'Oral'} • Frequency: {p.frequency} • Course: {p.duration}
                          </span>
                          {p.instructions && (
                            <span className="text-[11px] text-sage-dark block font-medium mt-0.5">
                              Note: {p.instructions}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-warm-100 text-charcoal shrink-0 self-start sm:self-auto">
                          Dispensed & Logged ✓
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Safety & Alerts */}
            {activeRecordTab === 'safety' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-warm-300 space-y-2">
                    <span className="text-xs font-mono font-bold text-mutedRed uppercase block">
                      Drug Allergy Registry
                    </span>
                    {patientRecord.criticalSafety.criticalAllergies.map((a, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-mutedRed-subtle/40 border border-mutedRed/20 text-xs">
                        <div className="font-bold text-ink">{a.allergen}</div>
                        <div className="text-mutedRed text-[11px]">{a.reaction} (Severity: {a.severity})</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-warm-300 space-y-2">
                    <span className="text-xs font-mono font-bold text-sage-dark uppercase block">
                      Chronic Clinical Alerts
                    </span>
                    {patientRecord.criticalSafety.criticalAlerts?.map((alert, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-warm-100 border border-warm-200 text-xs text-charcoal">
                        {alert}
                      </div>
                    )) || <div className="text-xs text-charcoal-muted">No additional alerts.</div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          INTERACTIVE QR CODE SCANNER & DIGITAL BADGE MODAL
         ======================================================== */}
      {isQRModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-warm-50 max-w-2xl w-full rounded-2xl border border-warm-300 p-6 shadow-elevated space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-warm-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sage text-white flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">Patient QR Scanner & Identity Hub</h3>
                  <p className="text-[11px] text-charcoal-muted">
                    Zero raw PII embedded in QR • Resolves via backend cryptographic authorization
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQRModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-warm-200 hover:bg-warm-300 flex items-center justify-center text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center gap-2 p-1 bg-warm-200 rounded-xl text-xs font-mono font-bold">
              <button
                onClick={() => setQrModalTab('scanner')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  qrModalTab === 'scanner' ? 'bg-white text-ink shadow-sm' : 'text-charcoal hover:text-ink'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-sage" />
                <span>Camera Scanner HUD</span>
              </button>

              <button
                onClick={() => setQrModalTab('cards')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  qrModalTab === 'cards' ? 'bg-white text-ink shadow-sm' : 'text-charcoal hover:text-ink'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-dusty-dark" />
                <span>Digital Patient QR Cards</span>
              </button>

              <button
                onClick={() => setQrModalTab('manual')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  qrModalTab === 'manual' ? 'bg-white text-ink shadow-sm' : 'text-charcoal hover:text-ink'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-terracotta" />
                <span>Manual Token Input</span>
              </button>
            </div>

            {/* TAB 1: Camera Scanner Simulation */}
            {qrModalTab === 'scanner' && (
              <div className="space-y-4">
                {/* Viewfinder Frame */}
                <div className="relative w-full h-56 bg-ink rounded-2xl overflow-hidden flex flex-col items-center justify-center text-warm-50 border-2 border-sage/40 shadow-inner">
                  {/* Sweep Laser Animation Line */}
                  <div
                    className="absolute inset-x-0 h-1 bg-sage shadow-[0_0_12px_#5E806B] opacity-80"
                    style={{
                      animation: 'scan 2.4s ease-in-out infinite alternate',
                    }}
                  />

                  {/* Corner Reticles */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-sage" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-sage" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-sage" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-sage" />

                  {/* Center Target Box */}
                  <div className="w-28 h-28 border border-dashed border-warm-400/60 rounded-xl flex flex-col items-center justify-center p-2 text-center">
                    <QrCode className="w-14 h-14 text-warm-100/70 animate-pulse" />
                    <span className="text-[9px] font-mono text-sage mt-1">ALIGN QR CODE</span>
                  </div>

                  {/* Bottom Camera HUD text */}
                  <div className="absolute bottom-3 inset-x-0 text-center text-[10px] font-mono text-warm-300">
                    STATUS: CAMERA ACTIVE • DETECTING EPHEMERAL QR TOKEN
                  </div>
                </div>

                <div className="text-xs text-charcoal-muted text-center leading-relaxed">
                  Click any patient below to simulate holding their phone or physical health card up to the camera scanner:
                </div>

                {/* 1-Click Scan Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {REGISTERED_PATIENTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        fetchPatient(p.id);
                        setIsQRModalOpen(false);
                      }}
                      className="p-3 rounded-xl bg-white border border-warm-300 hover:border-sage hover:bg-sage-subtle/30 text-left transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-ink flex items-center gap-1.5">
                          <span>{p.name}</span>
                          <span className="text-[10px] font-mono text-charcoal-muted">({p.id})</span>
                        </div>
                        <div className="text-[11px] text-charcoal-muted truncate max-w-[200px]">
                          {p.condition}
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-sage-dark group-hover:translate-x-0.5 transition-transform">
                        Scan →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Digital Patient QR Cards (Physical ABDM Card Simulation) */}
            {qrModalTab === 'cards' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal-muted">
                    Select patient card to inspect digital badge and simulate physical QR presentation:
                  </span>
                  <select
                    value={previewCardPatient.id}
                    onChange={(e) => {
                      const found = REGISTERED_PATIENTS.find(p => p.id === e.target.value);
                      if (found) setPreviewCardPatient(found);
                    }}
                    className="text-xs p-1.5 rounded-lg border border-warm-300 bg-white font-mono"
                  >
                    {REGISTERED_PATIENTS.map(p => (
                      <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Physical Health Card Preview */}
                <div className="bg-gradient-to-br from-ink to-ink-light text-warm-50 rounded-2xl p-6 shadow-elevated border border-ink-light relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-ink-light mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-sage" />
                      <span className="font-bold text-xs tracking-wider uppercase font-mono">
                        CAREVAULT DIGITAL HEALTH IDENTIFICATION
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage/20 text-sage font-bold">
                      ABDM COMPLIANT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                    {/* Visual QR Code Display */}
                    <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-card">
                      <div className="w-28 h-28 bg-ink rounded-lg p-2 flex flex-col items-center justify-center text-warm-50">
                        <QrCode className="w-20 h-20 text-warm-100" />
                        <span className="text-[8px] font-mono text-sage truncate max-w-[95px] mt-0.5">
                          {previewCardPatient.qrCodeId}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-charcoal-muted mt-1">
                        Dynamic Cryptographic Payload
                      </span>
                    </div>

                    {/* Patient Information on Card */}
                    <div className="sm:col-span-2 space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-warm-400 block uppercase">Patient Full Name</span>
                        <h4 className="text-lg font-bold text-warm-50">{previewCardPatient.name}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-warm-300">
                        <div>
                          <span className="text-[9px] text-warm-400 block">CareVault ID</span>
                          <strong className="text-warm-100">{previewCardPatient.id}</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-warm-400 block">Blood Group</span>
                          <strong className="text-sage">{previewCardPatient.bloodGroup}</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-warm-400 block">Registered Facility</span>
                          <span className="truncate block">{previewCardPatient.facility}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-warm-400 block">Consent Token Status</span>
                          <span className={previewCardPatient.consent === 'ACTIVE' ? 'text-sage' : 'text-mutedRed'}>
                            {previewCardPatient.consent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-ink-light flex flex-col sm:flex-row items-center justify-between text-[11px] text-warm-400 gap-2">
                    <span>Token: <code className="text-sage font-mono">{previewCardPatient.qrCodeId}</code></span>
                    <button
                      onClick={() => {
                        fetchPatient(previewCardPatient.id);
                        setIsQRModalOpen(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-sage text-white font-bold hover:bg-sage-dark transition-all text-xs flex items-center gap-1.5"
                    >
                      <span>Simulate Clinician Scan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Manual Token Input */}
            {qrModalTab === 'manual' && (
              <div className="space-y-4">
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  For emergency clinical workstations without optical barcode scanners, clinicians can enter the patient reference ID or cryptographic token string:
                </p>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-charcoal">
                    Enter Patient Reference (e.g. PT-2048, PT-1001, PT-1002, PT-1003, PT-1004, PT-1005):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualTokenInput}
                      onChange={(e) => setManualTokenInput(e.target.value)}
                      placeholder="e.g. PT-2048 or CV-QR-PT2048-SEC998"
                      className="flex-1 p-2.5 rounded-xl border border-warm-300 bg-white text-xs font-mono uppercase"
                    />
                    <button
                      onClick={handleVerifyManualToken}
                      className="px-5 py-2.5 rounded-xl bg-ink text-warm-50 text-xs font-bold hover:bg-ink-light transition-all flex items-center gap-1.5"
                    >
                      <Search className="w-3.5 h-3.5 text-sage" />
                      <span>Verify & Open</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-warm-100 rounded-xl border border-warm-200 text-xs text-charcoal space-y-1">
                  <span className="font-bold block">Quick Reference IDs:</span>
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                    {REGISTERED_PATIENTS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setManualTokenInput(p.id)}
                        className="px-2 py-1 rounded bg-white border border-warm-300 hover:border-sage text-ink"
                      >
                        {p.id} ({p.name.split(' ')[0]})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          EMERGENCY BREAK-GLASS MODAL
         ======================================================== */}
      {isBreakGlassOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-warm-50 max-w-md w-full rounded-2xl border-2 border-mutedRed p-6 shadow-elevated space-y-4">
            <div className="flex items-center gap-2 text-mutedRed font-bold text-sm uppercase">
              <AlertTriangle className="w-5 h-5" />
              <span>Activate Break-Glass Emergency</span>
            </div>

            <p className="text-xs text-charcoal leading-relaxed">
              Use only when immediate clinical action is required and patient cannot provide consent.
              This access is permanently audited with <strong>CRITICAL</strong> severity in the hospital ledger.
            </p>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Clinical Justification / Reason:
              </label>
              <textarea
                rows={3}
                value={breakGlassReason}
                onChange={(e) => setBreakGlassReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-warm-300 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsBreakGlassOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-charcoal hover:bg-warm-200"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerBreakGlass}
                disabled={isBreakGlassLoading}
                className="px-4 py-2 rounded-lg bg-mutedRed text-white text-xs font-bold hover:bg-mutedRed-dark"
              >
                {isBreakGlassLoading ? 'Verifying...' : 'Confirm Emergency Override'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

