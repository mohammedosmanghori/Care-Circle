import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  ElderlyProfile,
  Medication,
  MedicationLog,
  Appointment,
  TeamMember,
  CareNote,
  AppNotification,
  ActivityItem,
  ActivePage,
  UserRole
} from '../types';
import {
  DEMO_USERS,
  INITIAL_PROFILE,
  INITIAL_MEDICATIONS,
  INITIAL_LOGS,
  INITIAL_APPOINTMENTS,
  INITIAL_TEAM,
  INITIAL_NOTES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY
} from '../mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: User;
  switchUser: (userId: string) => void;
  activeProfile: ElderlyProfile;
  medications: Medication[];
  medicationLogs: MedicationLog[];
  appointments: Appointment[];
  teamMembers: TeamMember[];
  careNotes: CareNote[];
  notifications: AppNotification[];
  activityTimeline: ActivityItem[];
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  
  // Accessibility
  highContrast: boolean;
  setHighContrast: (val: boolean | ((prev: boolean) => boolean)) => void;
  largeText: boolean;
  setLargeText: (val: boolean | ((prev: boolean) => boolean)) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  speakText: (text: string) => void;

  // Actions
  addMedication: (med: Omit<Medication, 'id' | 'profileId'>) => void;
  updateMedication: (id: string, med: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  confirmDose: (logId: string) => void;
  skipDose: (logId: string) => void;
  addAppointment: (apt: Omit<Appointment, 'id' | 'profileId' | 'status'>) => void;
  cancelAppointment: (aptId: string) => void;
  inviteMember: (name: string, email: string, role: 'family' | 'caregiver', relationship: string, permissions: any) => string;
  verifyPasscode: (passcode: string) => boolean;
  revokeMember: (memberId: string) => void;
  addCareNote: (content: string) => void;
  sendEmailReminder: (recipientEmail: string, recipientName: string, subject: string, message: string, type: any) => Promise<void>;
  
  // Demo mode banner
  isDemoMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]); // Default to Margaret (Elderly)
  const [activeProfile, setActiveProfile] = useState<ElderlyProfile>(INITIAL_PROFILE);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>(INITIAL_LOGS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM);
  const [careNotes, setCareNotes] = useState<CareNote[]>(INITIAL_NOTES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activityTimeline, setActivityTimeline] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  // Accessibility state
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isDemoMode] = useState<boolean>(true);

  // Text to speech helper
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const switchUser = (userId: string) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      // Trigger activity log
      addActivity('Switched User Session', `Logged in as ${found.name} (${found.role})`);
    }
  };

  const addActivity = (action: string, details: string) => {
    const newItem: ActivityItem = {
      id: 'act_' + Date.now(),
      profileId: activeProfile.id,
      actorName: currentUser.name,
      actorRole: currentUser.role === 'elderly' ? 'Elderly User' : currentUser.role === 'family' ? 'Family Member' : 'Caregiver',
      action,
      timestamp: new Date().toISOString(),
      details,
    };
    setActivityTimeline(prev => [newItem, ...prev]);
  };

  const addMedication = (medData: Omit<Medication, 'id' | 'profileId'>) => {
    const newMed: Medication = {
      ...medData,
      id: 'med_' + Date.now(),
      profileId: activeProfile.id,
    };
    setMedications(prev => [...prev, newMed]);

    // Also create initial log for today if applicable
    const todayStr = new Date().toISOString().split('T')[0];
    newMed.timings.forEach(time => {
      const newLog: MedicationLog = {
        id: 'log_' + Math.random().toString(36).substring(2, 9),
        medicationId: newMed.id,
        medicationName: newMed.name,
        dosage: newMed.dosage,
        profileId: activeProfile.id,
        scheduledDate: todayStr,
        scheduledTime: time,
        status: 'upcoming'
      };
      setMedicationLogs(prev => [...prev, newLog]);
    });

    addActivity('Added Medication', `Added ${newMed.name} (${newMed.dosage}) with ${newMed.frequency} schedule.`);
  };

  const updateMedication = (id: string, updatedFields: Partial<Medication>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    addActivity('Updated Medication', `Updated medication details for ID ${id}`);
  };

  const deleteMedication = (id: string) => {
    const target = medications.find(m => m.id === id);
    setMedications(prev => prev.filter(m => m.id !== id));
    setMedicationLogs(prev => prev.filter(l => l.medicationId !== id));
    addActivity('Deleted Medication', `Removed ${target?.name || id} from schedule.`);
  };

  const confirmDose = (logId: string) => {
    const nowIso = new Date().toISOString();
    setMedicationLogs(prev => prev.map(l => {
      if (l.id === logId) {
        return {
          ...l,
          status: 'taken',
          confirmedTime: nowIso,
          confirmedBy: currentUser.name
        };
      }
      return l;
    }));

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    const targetLog = medicationLogs.find(l => l.id === logId);
    addActivity('Confirmed Medication Taken', `Marked ${targetLog?.medicationName || 'Dose'} (${targetLog?.dosage || ''}) as taken.`);

    // Check stock depletion
    if (targetLog) {
      const med = medications.find(m => m.id === targetLog.medicationId);
      if (med && med.stockCount > 0) {
        const newStock = med.stockCount - 1;
        updateMedication(med.id, { stockCount: newStock });
        if (newStock <= med.lowStockThreshold) {
          // Trigger stock alert notification
          const stockNotif: AppNotification = {
            id: 'notif_' + Date.now(),
            profileId: activeProfile.id,
            type: 'stock',
            title: 'Low Medicine Stock Alert',
            message: `${med.name} stock is critically low (${newStock} remaining). Please refill soon.`,
            timestamp: nowIso,
            status: 'sent',
            recipientEmail: activeProfile.emergencyContact.phone ? 'sarah.smith@example.com' : currentUser.email,
            deliveryId: 'EMAIL_DELIV_' + Math.random().toString(36).substring(2, 7).toUpperCase()
          };
          setNotifications(n => [stockNotif, ...n]);
        }
      }
    }
  };

  const skipDose = (logId: string) => {
    setMedicationLogs(prev => prev.map(l => l.id === logId ? { ...l, status: 'skipped', confirmedBy: currentUser.name } : l));
    addActivity('Skipped Medication Dose', `Marked dose log ${logId} as skipped.`);
  };

  const addAppointment = (aptData: Omit<Appointment, 'id' | 'profileId' | 'status'>) => {
    const newApt: Appointment = {
      ...aptData,
      id: 'apt_' + Date.now(),
      profileId: activeProfile.id,
      status: 'upcoming'
    };
    setAppointments(prev => [...prev, newApt]);
    addActivity('Scheduled Doctor Appointment', `Booked appointment with ${newApt.doctorName} (${newApt.specialization}) on ${newApt.dateTime}`);

    // Create notification
    const aptNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      profileId: activeProfile.id,
      type: 'appointment',
      title: 'New Appointment Scheduled',
      message: `Appointment with ${newApt.doctorName} at ${newApt.hospital} set for ${newApt.dateTime}.`,
      timestamp: new Date().toISOString(),
      status: 'sent',
      recipientEmail: currentUser.email,
      deliveryId: 'EMAIL_DELIV_' + Math.random().toString(36).substring(2, 7).toUpperCase()
    };
    setNotifications(n => [aptNotif, ...n]);
  };

  const cancelAppointment = (aptId: string) => {
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: 'cancelled' } : a));
    addActivity('Cancelled Appointment', `Cancelled appointment ID ${aptId}`);
  };

  const inviteMember = (name: string, email: string, role: 'family' | 'caregiver', relationship: string, permissions: any) => {
    const passcode = Math.floor(100000 + Math.random() * 900000).toString();
    const newMember: TeamMember = {
      id: 'team_' + Date.now(),
      profileId: activeProfile.id,
      name,
      email,
      role,
      relationship,
      permissions,
      status: 'pending',
      passcode,
      passcodeExpires: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    };
    setTeamMembers(prev => [...prev, newMember]);
    addActivity('Invited Team Member', `Sent invitation to ${name} (${email}) as ${role} with 6-digit passcode ${passcode}`);
    return passcode;
  };

  const verifyPasscode = (passcode: string) => {
    const found = teamMembers.find(t => t.passcode === passcode && t.status === 'pending');
    if (found) {
      setTeamMembers(prev => prev.map(t => t.id === found.id ? { ...t, status: 'active', passcode: undefined } : t));
      addActivity('Verified Invitation Passcode', `${found.name} successfully verified invitation passcode and joined the care circle.`);
      return true;
    }
    return false;
  };

  const revokeMember = (memberId: string) => {
    const target = teamMembers.find(t => t.id === memberId);
    setTeamMembers(prev => prev.filter(t => t.id !== memberId));
    addActivity('Revoked Member Access', `Revoked care circle access for ${target?.name || memberId}`);
  };

  const addCareNote = (content: string) => {
    const newNote: CareNote = {
      id: 'note_' + Date.now(),
      profileId: activeProfile.id,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'elderly' ? 'Elderly User' : currentUser.role === 'family' ? 'Family Member' : 'Caregiver',
      content,
      timestamp: new Date().toISOString()
    };
    setCareNotes(prev => [newNote, ...prev]);
    addActivity('Recorded Care Note', `Added care update note by ${currentUser.name}`);
  };

  const sendEmailReminder = async (recipientEmail: string, recipientName: string, subject: string, message: string, type: any) => {
    try {
      const res = await fetch('/api/reminders/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientEmail, recipientName, subject, message, notificationType: type })
      });
      const data = await res.json();
      if (data.success) {
        const newNotif: AppNotification = {
          id: 'notif_' + Date.now(),
          profileId: activeProfile.id,
          type: type || 'system',
          title: subject,
          message,
          timestamp: data.timestamp,
          status: 'sent',
          recipientEmail,
          deliveryId: data.deliveryId
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    } catch (err) {
      console.error('Email Dispatch Simulation Error:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        activeProfile,
        medications,
        medicationLogs,
        appointments,
        teamMembers,
        careNotes,
        notifications,
        activityTimeline,
        activePage,
        setActivePage,
        highContrast,
        setHighContrast,
        largeText,
        setLargeText,
        theme,
        setTheme,
        speakText,
        addMedication,
        updateMedication,
        deleteMedication,
        confirmDose,
        skipDose,
        addAppointment,
        cancelAppointment,
        inviteMember,
        verifyPasscode,
        revokeMember,
        addCareNote,
        sendEmailReminder,
        isDemoMode,
      }}
    >
      <div className={`${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-200`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
