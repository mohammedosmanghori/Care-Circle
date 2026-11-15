import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Pill,
  CalendarCheck,
  Calendar,
  Users,
  Sparkles,
  BellRing,
  BarChart3,
  Settings,
  History,
  PlusCircle,
  Home,
  ShieldCheck
} from 'lucide-react';
import { ActivePage } from '../types';

export function Sidebar() {
  const { activePage, setActivePage, theme, currentUser } = useApp();

  const navItems: { id: ActivePage; label: string; icon: any; section?: string }[] = [
    { id: 'landing', label: 'Welcome Overview', icon: Home, section: 'Overview' },
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard, section: 'Overview' },
    
    { id: 'medications', label: 'Medication Inventory', icon: Pill, section: 'Medications' },
    { id: 'add-medication', label: 'Add New Medicine', icon: PlusCircle, section: 'Medications' },
    { id: 'schedule', label: 'Daily Schedule', icon: CalendarCheck, section: 'Medications' },
    { id: 'adherence', label: 'Adherence Calendar', icon: BarChart3, section: 'Medications' },

    { id: 'appointments', label: 'Doctor Appointments', icon: Calendar, section: 'Appointments' },
    { id: 'add-appointment', label: 'Book Appointment', icon: PlusCircle, section: 'Appointments' },

    { id: 'collaboration', label: 'Family & Caregivers', icon: Users, section: 'Collaboration' },
    { id: 'timeline', label: 'Care Activity Timeline', icon: History, section: 'Collaboration' },

    { id: 'ai-assistant', label: 'AI Care Assistant', icon: Sparkles, section: 'Smart AI & Reports' },
    { id: 'analytics', label: 'Adherence Analytics', icon: BarChart3, section: 'Smart AI & Reports' },
    { id: 'notifications', label: 'Notifications & Emails', icon: BellRing, section: 'Smart AI & Reports' },

    { id: 'profile-settings', label: 'Profile & Settings', icon: Settings, section: 'Configuration' },
  ];

  return (
    <aside className={`w-72 shrink-0 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r min-h-[calc(100vh-4.5rem)] p-4 hidden lg:block`}>
      <div className="space-y-6">
        
        {/* Role Badge Info */}
        <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              {currentUser.name}
            </p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-400 capitalize">
              Role: {currentUser.role}
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </aside>
  );
}
