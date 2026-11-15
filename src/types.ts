export type UserRole = 'elderly' | 'family' | 'caregiver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  activeProfileId: string;
}

export interface ElderlyProfile {
  id: string;
  name: string;
  age: number;
  dob: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalConditions: string[];
  notes: string;
  avatar: string;
}

export type MedicationFrequency = 'daily' | 'twice_daily' | 'weekly' | 'as_needed';

export interface Medication {
  id: string;
  profileId: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  timings: string[]; // e.g. ["08:00", "20:00"]
  startDate: string;
  endDate: string;
  instructions: string;
  doctorName: string;
  stockCount: number;
  lowStockThreshold: number;
  imageUrl?: string;
}

export type MedicationStatus = 'upcoming' | 'due_now' | 'taken' | 'missed' | 'skipped';

export interface MedicationLog {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  profileId: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  confirmedTime?: string;
  status: MedicationStatus;
  confirmedBy?: string;
}

export interface Appointment {
  id: string;
  profileId: string;
  doctorName: string;
  specialization: string;
  hospital: string;
  dateTime: string; // ISO string
  location: string;
  contact: string;
  reason: string;
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface TeamMember {
  id: string;
  profileId: string;
  name: string;
  email: string;
  role: 'family' | 'caregiver';
  relationship: string;
  permissions: {
    viewOnly: boolean;
    manageMedications: boolean;
    manageAppointments: boolean;
    confirmDoses: boolean;
    manageFamilyAccess: boolean;
  };
  status: 'active' | 'pending';
  passcode?: string;
  passcodeExpires?: string;
}

export interface CareNote {
  id: string;
  profileId: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
}

export type NotificationType = 'medication' | 'appointment' | 'stock' | 'system';

export interface AppNotification {
  id: string;
  profileId: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
  recipientEmail: string;
  deliveryId?: string;
}

export interface ActivityItem {
  id: string;
  profileId: string;
  actorName: string;
  actorRole: string;
  action: string;
  timestamp: string;
  details: string;
}

export type ActivePage =
  | 'landing'
  | 'dashboard'
  | 'medications'
  | 'add-medication'
  | 'schedule'
  | 'adherence'
  | 'appointments'
  | 'add-appointment'
  | 'collaboration'
  | 'ai-assistant'
  | 'notifications'
  | 'profile-settings'
  | 'analytics'
  | 'timeline';
