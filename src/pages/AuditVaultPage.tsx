// CAREVAULT Audit Vault Page — Immutable Security & Privacy Audit Trail
import React, { useState, useEffect } from 'react';
import {
  History,
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
  RefreshCw,
  Search,
  Eye,
  FileText,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuditLogEntry } from '../types';

export const AuditVaultPage: React.FC = () => {
  const { token } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [stats, setStats] = useState<any>({ total: 0, allowed: 0, denied: 0, suppressed: 0, blocked: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [resultFilter, setResultFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Selected log for detailed drilldown
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit/logs', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    if (roleFilter !== 'ALL' && log.role !== roleFilter) return false;
    if (resultFilter !== 'ALL' && log.result !== resultFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        log.actor.toLowerCase().includes(term) ||
        log.resource.toLowerCase().includes(term) ||
        log.reason.toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sage-dark font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span>Immutable Security Audit Log Stream</span>
          </div>
          <h1 className="text-2xl font-bold text-ink">CAREVAULT Audit Vault</h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Cryptographic ledger tracking all clinical reads, aggregate queries, blocked perimeter breaches, and break-glass emergencies.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-3.5 py-2 rounded-lg bg-warm-200 text-charcoal text-xs font-bold hover:bg-warm-300 flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-warm-50 p-4 rounded-xl border border-warm-300 shadow-subtle">
          <span className="text-[10px] font-mono text-charcoal-muted uppercase">Total Events</span>
          <div className="text-xl font-bold text-ink mt-0.5">{stats.total}</div>
        </div>

        <div className="bg-warm-50 p-4 rounded-xl border border-sage/40 shadow-subtle">
          <span className="text-[10px] font-mono text-sage-dark uppercase font-semibold">Allowed</span>
          <div className="text-xl font-bold text-sage-dark mt-0.5">{stats.allowed}</div>
        </div>

        <div className="bg-warm-50 p-4 rounded-xl border border-mutedRed/40 shadow-subtle">
          <span className="text-[10px] font-mono text-mutedRed uppercase font-semibold">Denied</span>
          <div className="text-xl font-bold text-mutedRed mt-0.5">{stats.denied}</div>
        </div>

        <div className="bg-warm-50 p-4 rounded-xl border border-amber/40 shadow-subtle">
          <span className="text-[10px] font-mono text-amber-dark uppercase font-semibold">Suppressed</span>
          <div className="text-xl font-bold text-amber-dark mt-0.5">{stats.suppressed}</div>
        </div>

        <div className="bg-warm-50 p-4 rounded-xl border border-terracotta/40 shadow-subtle">
          <span className="text-[10px] font-mono text-terracotta uppercase font-semibold">Differencing Blocked</span>
          <div className="text-xl font-bold text-terracotta mt-0.5">{stats.blocked}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-warm-50 border border-warm-300 rounded-xl p-4 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-charcoal-muted font-mono text-[11px]">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-warm-300 bg-white text-xs font-medium"
            >
              <option value="ALL">All Roles</option>
              <option value="CLINICIAN">Clinician</option>
              <option value="ADMIN">Administrator</option>
              <option value="PATIENT">Patient</option>
            </select>
          </div>

          {/* Result Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-charcoal-muted font-mono text-[11px]">Result:</span>
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-warm-300 bg-white text-xs font-medium"
            >
              <option value="ALL">All Results</option>
              <option value="ALLOWED">Allowed</option>
              <option value="DENIED">Denied</option>
              <option value="SUPPRESSED">Suppressed</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search actor, resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-warm-300 bg-white"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-warm-50 border border-warm-300 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warm-100/80 text-charcoal-muted font-mono uppercase text-[11px] border-b border-warm-300">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor (WHO)</th>
                <th className="py-3 px-4">Action (WHAT)</th>
                <th className="py-3 px-4">Purpose (WHY)</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {filteredLogs.map((log) => {
                const isAllowed = log.result === 'ALLOWED';
                const isDenied = log.result === 'DENIED';
                const isSuppressed = log.result === 'SUPPRESSED';
                const isBlocked = log.result === 'BLOCKED';

                return (
                  <tr key={log.id} className="hover:bg-warm-100/50 transition-colors">
                    {/* Timestamp */}
                    <td className="py-3 px-4 font-mono text-[11px] text-charcoal-muted whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>

                    {/* Actor */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-ink">{log.actor}</div>
                      <div className="text-[10px] font-mono text-charcoal-muted">
                        {log.role} • {log.facility?.split(',')[0]}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span
                        className={`px-1.5 py-0.5 rounded font-semibold ${
                          log.action === 'BREAK_GLASS_ACCESS'
                            ? 'bg-mutedRed text-white'
                            : 'bg-warm-200 text-charcoal'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>

                    {/* Purpose */}
                    <td className="py-3 px-4 text-charcoal">{log.purpose}</td>

                    {/* Resource */}
                    <td className="py-3 px-4 font-mono text-[11px] text-ink truncate max-w-[200px]" title={log.resource}>
                      {log.resource}
                    </td>

                    {/* Result Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold inline-flex items-center gap-1 ${
                          isAllowed
                            ? 'bg-sage-subtle text-sage-dark border border-sage/20'
                            : isDenied
                            ? 'bg-mutedRed-subtle text-mutedRed border border-mutedRed/20'
                            : isSuppressed
                            ? 'bg-amber-subtle text-amber-dark border border-amber/20'
                            : 'bg-terracotta-subtle text-terracotta border border-terracotta/20'
                        }`}
                      >
                        {isAllowed && <CheckCircle2 className="w-3 h-3" />}
                        {isDenied && <XCircle className="w-3 h-3" />}
                        {isSuppressed && <AlertTriangle className="w-3 h-3" />}
                        {isBlocked && <ShieldAlert className="w-3 h-3" />}
                        {log.result}
                      </span>
                    </td>

                    {/* Detail Drilldown */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="p-1 rounded text-charcoal-muted hover:text-ink hover:bg-warm-200"
                        title="View explainability details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drilldown Modal for Selected Log */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-warm-50 max-w-lg w-full rounded-2xl border border-warm-300 p-6 shadow-elevated space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-300">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sage-dark" />
                <h3 className="font-bold text-ink text-sm">Audit Record Detail</h3>
              </div>
              <span className="text-[11px] font-mono text-charcoal-muted">
                UUID: {selectedLog.id.substring(0, 8)}...
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Timestamp:</span>
                <span className="font-mono text-ink">{selectedLog.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Actor:</span>
                <span className="font-bold text-ink">{selectedLog.actor} ({selectedLog.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Action:</span>
                <span className="font-mono font-bold text-ink">{selectedLog.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Resource:</span>
                <span className="font-mono text-ink">{selectedLog.resource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Reason:</span>
                <span className="italic text-charcoal">{selectedLog.reason}</span>
              </div>
            </div>

            {/* Explainability Breakdown */}
            {selectedLog.explainability && (
              <div className="pt-3 border-t border-warm-300 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted font-bold block">
                  Explainability Verification Matrix:
                </span>
                {Object.entries(selectedLog.explainability).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-xs">
                    <span className="text-charcoal font-mono capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className={`font-mono text-[11px] font-bold ${v ? 'text-sage-dark' : 'text-mutedRed'}`}>
                      {v ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-lg bg-ink text-warm-50 text-xs font-semibold hover:bg-ink-light"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
