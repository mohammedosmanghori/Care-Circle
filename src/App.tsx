/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { InvitationModal } from './components/InvitationModal';
import { AddMedicationModal } from './components/AddMedicationModal';
import { AddAppointmentModal } from './components/AddAppointmentModal';

import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { MedicationsPage } from './pages/MedicationsPage';
import { SchedulePage } from './pages/SchedulePage';
import { AdherenceCalendarPage } from './pages/AdherenceCalendarPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { CollaborationPage } from './pages/CollaborationPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { TimelinePage } from './pages/TimelinePage';

function MainLayout() {
  const { activePage, highContrast, largeText } = useApp();

  const [authOpen, setAuthOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [addMedOpen, setAddMedOpen] = useState(false);
  const [addAptOpen, setAddAptOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage onOpenAuth={() => setAuthOpen(true)} />;
      case 'dashboard':
        return <Dashboard onOpenAddMed={() => setAddMedOpen(true)} onOpenAddApt={() => setAddAptOpen(true)} />;
      case 'medications':
      case 'add-medication':
        return <MedicationsPage onOpenAddMed={() => setAddMedOpen(true)} />;
      case 'schedule':
        return <SchedulePage />;
      case 'adherence':
        return <AdherenceCalendarPage />;
      case 'appointments':
      case 'add-appointment':
        return <AppointmentsPage onOpenAddApt={() => setAddAptOpen(true)} />;
      case 'collaboration':
        return <CollaborationPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'profile-settings':
        return <ProfileSettingsPage />;
      case 'timeline':
        return <TimelinePage />;
      default:
        return <Dashboard onOpenAddMed={() => setAddMedOpen(true)} onOpenAddApt={() => setAddAptOpen(true)} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'contrast-125 saturate-150' : ''} ${largeText ? 'text-lg' : 'text-sm'}`}>
      <Navbar onOpenAuth={() => setAuthOpen(true)} onOpenVerify={() => setVerifyOpen(true)} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <InvitationModal isOpen={verifyOpen} onClose={() => setVerifyOpen(false)} />
      <AddMedicationModal isOpen={addMedOpen} onClose={() => setAddMedOpen(false)} />
      <AddAppointmentModal isOpen={addAptOpen} onClose={() => setAddAptOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
