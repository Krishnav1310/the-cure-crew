// CAREVAULT Clean & User-Friendly App Controller
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { ClinicianPortal } from './pages/ClinicianPortal';
import { AdminPortal } from './pages/AdminPortal';
import { PatientPortal } from './pages/PatientPortal';
import { SecurityCenter } from './pages/SecurityCenter';
import { AuditVaultPage } from './pages/AuditVaultPage';
import { PresentationPage } from './pages/PresentationPage';

const MainContent: React.FC = () => {
  const { user, login } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');

  const handleSelectRole = (role: 'clinician' | 'admin' | 'patient') => {
    login(role).then(success => {
      if (success) {
        if (role === 'clinician') setCurrentTab('clinician-scan');
        else if (role === 'admin') setCurrentTab('admin-dashboard');
        else setCurrentTab('patient-dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm selection:bg-sage/20 selection:text-ink">
      {/* Clean Single Top Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {(currentTab === 'home' || currentTab === 'how-it-works' || currentTab === 'privacy') && (
          <LandingPage
            setCurrentTab={setCurrentTab}
            onSelectRole={handleSelectRole}
          />
        )}

        {(currentTab === 'clinician-scan' || currentTab === 'clinician-dashboard' || currentTab === 'clinician-emergency') && (
          <ClinicianPortal initialTab="scan" />
        )}

        {(currentTab === 'admin-dashboard' || currentTab === 'admin-trends') && (
          <AdminPortal initialTab="overview" />
        )}

        {currentTab === 'patient-dashboard' && (
          <PatientPortal />
        )}

        {currentTab === 'security-lab' && (
          <SecurityCenter />
        )}

        {currentTab === 'audit-vault' && (
          <AuditVaultPage />
        )}

        {currentTab === 'presentation' && (
          <PresentationPage />
        )}
      </main>

      {/* Bottom Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default App;
