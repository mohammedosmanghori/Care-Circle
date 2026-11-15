import {
  ElderlyProfile,
  Medication,
  MedicationLog,
  Appointment,
  TeamMember,
  CareNote,
  AppNotification,
  ActivityItem,
  User
} from './types';

export const DEMO_USERS: User[] = [
  {
    id: 'user_elderly_1',
    name: 'Margaret Smith',
    email: 'margaret.smith@example.com',
    role: 'elderly',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    activeProfileId: 'profile_margaret_1',
  },
  {
    id: 'user_family_1',
    name: 'Sarah Smith (Daughter)',
    email: 'sarah.smith@example.com',
    role: 'family',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    activeProfileId: 'profile_margaret_1',
  },
  {
    id: 'user_caregiver_1',
    name: 'David Miller (Caregiver)',
    email: 'david.miller@carecircle.org',
    role: 'caregiver',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    activeProfileId: 'profile_margaret_1',
  }
];

export const INITIAL_PROFILE: ElderlyProfile = {
  id: 'profile_margaret_1',
  name: 'Margaret Smith',
  age: 78,
  dob: '1948-04-12',
  bloodGroup: 'A+',
  emergencyContact: {
    name: 'Sarah Smith',
    relation: 'Daughter',
    phone: '+1 (555) 234-5678',
  },
  medicalConditions: ['Hypertension', 'Type 2 Diabetes', 'Mild Osteoarthritis'],
  notes: 'Prefers morning medication with breakfast. Gentle reminders work best.',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
};

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med_1',
    profileId: 'profile_margaret_1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'daily',
    timings: ['08:00'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    instructions: 'Take with a full glass of water in the morning before breakfast.',
    doctorName: 'Dr. Robert Chen',
    stockCount: 14,
    lowStockThreshold: 5,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'med_2',
    profileId: 'profile_margaret_1',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'twice_daily',
    timings: ['08:30', '19:00'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    instructions: 'Take with meals to reduce stomach upset.',
    doctorName: 'Dr. Emily Watson',
    stockCount: 22,
    lowStockThreshold: 7,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'med_3',
    profileId: 'profile_margaret_1',
    name: 'Calcium + Vitamin D3',
    dosage: '600mg / 400IU',
    frequency: 'daily',
    timings: ['13:00'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    instructions: 'Take with lunch.',
    doctorName: 'Dr. Robert Chen',
    stockCount: 4, // Low stock trigger
    lowStockThreshold: 5,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'med_4',
    profileId: 'profile_margaret_1',
    name: 'Low-Dose Aspirin',
    dosage: '81mg',
    frequency: 'daily',
    timings: ['08:00'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    instructions: 'Take with breakfast.',
    doctorName: 'Dr. Robert Chen',
    stockCount: 28,
    lowStockThreshold: 6,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=200'
  }
];

const todayStr = new Date().toISOString().split('T')[0];

export const INITIAL_LOGS: MedicationLog[] = [
  {
    id: 'log_1',
    medicationId: 'med_1',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    profileId: 'profile_margaret_1',
    scheduledDate: todayStr,
    scheduledTime: '08:00',
    confirmedTime: `${todayStr}T08:12:00Z`,
    status: 'taken',
    confirmedBy: 'Margaret Smith',
  },
  {
    id: 'log_2',
    medicationId: 'med_2',
    medicationName: 'Metformin',
    dosage: '500mg',
    profileId: 'profile_margaret_1',
    scheduledDate: todayStr,
    scheduledTime: '08:30',
    confirmedTime: `${todayStr}T08:35:00Z`,
    status: 'taken',
    confirmedBy: 'David Miller (Caregiver)',
  },
  {
    id: 'log_3',
    medicationId: 'med_3',
    medicationName: 'Calcium + Vitamin D3',
    dosage: '600mg / 400IU',
    profileId: 'profile_margaret_1',
    scheduledDate: todayStr,
    scheduledTime: '13:00',
    status: 'due_now',
  },
  {
    id: 'log_4',
    medicationId: 'med_2',
    medicationName: 'Metformin',
    dosage: '500mg',
    profileId: 'profile_margaret_1',
    scheduledDate: todayStr,
    scheduledTime: '19:00',
    status: 'upcoming',
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    profileId: 'profile_margaret_1',
    doctorName: 'Dr. Robert Chen',
    specialization: 'Cardiologist',
    hospital: 'City General Hospital, Cardiology Wing 3B',
    dateTime: '2026-11-20T10:00:00Z',
    location: '124 Medical Center Dr, Suite 400',
    contact: '+1 (555) 382-9100',
    reason: 'Routine quarterly blood pressure & cardiovascular checkup',
    notes: 'Bring blood pressure log diary. Fasting required beforehand.',
    status: 'upcoming',
  },
  {
    id: 'apt_2',
    profileId: 'profile_margaret_1',
    doctorName: 'Dr. Emily Watson',
    specialization: 'Endocrinologist',
    hospital: 'Metro Health Clinic',
    dateTime: '2026-11-28T14:30:00Z',
    location: '88 Wellness Ave, Floor 2',
    contact: '+1 (555) 491-8822',
    reason: 'HbA1c diabetes follow-up consultation',
    notes: 'Review recent glucose testing logs with doctor.',
    status: 'upcoming',
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team_1',
    profileId: 'profile_margaret_1',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    role: 'family',
    relationship: 'Daughter',
    permissions: {
      viewOnly: false,
      manageMedications: true,
      manageAppointments: true,
      confirmDoses: true,
      manageFamilyAccess: true,
    },
    status: 'active',
  },
  {
    id: 'team_2',
    profileId: 'profile_margaret_1',
    name: 'David Miller',
    email: 'david.miller@carecircle.org',
    role: 'caregiver',
    relationship: 'Assigned Home Nurse',
    permissions: {
      viewOnly: false,
      manageMedications: true,
      manageAppointments: true,
      confirmDoses: true,
      manageFamilyAccess: false,
    },
    status: 'active',
  },
  {
    id: 'team_3',
    profileId: 'profile_margaret_1',
    name: 'Michael Smith',
    email: 'michael.smith@example.com',
    role: 'family',
    relationship: 'Son',
    permissions: {
      viewOnly: true,
      manageMedications: false,
      manageAppointments: false,
      confirmDoses: false,
      manageFamilyAccess: false,
    },
    status: 'pending',
    passcode: '849201',
    passcodeExpires: '2026-11-20T23:59:59Z'
  }
];

export const INITIAL_NOTES: CareNote[] = [
  {
    id: 'note_1',
    profileId: 'profile_margaret_1',
    authorName: 'David Miller',
    authorRole: 'Caregiver',
    content: 'Margaret had a pleasant morning walk. Blood pressure checked at 122/78 mmHg. Morning medications taken on schedule.',
    timestamp: '2026-11-15T09:15:00Z',
  },
  {
    id: 'note_2',
    profileId: 'profile_margaret_1',
    authorName: 'Sarah Smith',
    authorRole: 'Family Member',
    content: 'Dropped off fresh groceries and verified refill stock for Lisinopril.',
    timestamp: '2026-11-14T16:30:00Z',
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    profileId: 'profile_margaret_1',
    type: 'stock',
    title: 'Low Medicine Stock Alert',
    message: 'Calcium + Vitamin D3 stock is running low (4 tablets remaining). Refill recommended soon.',
    timestamp: '2026-11-15T08:00:00Z',
    status: 'sent',
    recipientEmail: 'sarah.smith@example.com',
    deliveryId: 'EMAIL_DELIV_9482A',
  },
  {
    id: 'notif_2',
    profileId: 'profile_margaret_1',
    type: 'appointment',
    title: 'Upcoming Appointment Reminder',
    message: 'Dr. Robert Chen appointment in 5 days (Nov 20 at 10:00 AM).',
    timestamp: '2026-11-15T08:00:00Z',
    status: 'sent',
    recipientEmail: 'margaret.smith@example.com',
    deliveryId: 'EMAIL_DELIV_3310B',
  }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'act_1',
    profileId: 'profile_margaret_1',
    actorName: 'Margaret Smith',
    actorRole: 'Elderly User',
    action: 'Confirmed Medication Taken',
    timestamp: '2026-11-15T08:12:00Z',
    details: 'Confirmed Lisinopril (10mg) scheduled for 08:00 AM.',
  },
  {
    id: 'act_2',
    profileId: 'profile_margaret_1',
    actorName: 'David Miller',
    actorRole: 'Caregiver',
    action: 'Confirmed Medication Taken',
    timestamp: '2026-11-15T08:35:00Z',
    details: 'Confirmed Metformin (500mg) scheduled for 08:30 AM.',
  },
  {
    id: 'act_3',
    profileId: 'profile_margaret_1',
    actorName: 'Sarah Smith',
    actorRole: 'Family Member',
    action: 'Added Care Note',
    timestamp: '2026-11-14T16:30:00Z',
    details: 'Recorded shift & stock update note.',
  }
];
