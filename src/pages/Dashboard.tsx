import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  PhoneCall,
  Pill,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Stethoscope,
  Check
} from 'lucide-react';

interface DashboardProps {
  onOpenAddMed: () => void;
  onOpenAddApt: () => void;
}

export function Dashboard({ onOpenAddMed, onOpenAddApt }: DashboardProps) {
  const {
    activeProfile,
    currentUser,
    medications,
    medicationLogs,
    appointments,
    teamMembers,
    confirmDose,
    setActivePage,
    speakText,
    theme
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysLogs = medicationLogs.filter(l => l.scheduledDate === todayStr);
  const takenCount = todaysLogs.filter(l => l.status === 'taken').length;
  const totalToday = todaysLogs.length;
  const completionRate = totalToday > 0 ? Math.round((takenCount / totalToday) * 100) : 100;

  const dueNowDoses = todaysLogs.filter(l => l.status === 'due_now' || l.status === 'upcoming');
  const nextAppointment = appointments.find(a => a.status === 'upcoming');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Personalized Greeting & Time Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl ${
        theme === 'dark' ? 'bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 border-slate-800' : 'bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white shadow-xl'
      } relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
                Role: {currentUser.role.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold backdrop-blur-md">
                Active Routine
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Hello, {activeProfile.name}! 👋
            </h1>
            <p className="text-teal-100 text-sm max-w-xl">
              Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Your health routines are fully synchronized.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-right">
              <p className="text-xs text-teal-200 uppercase font-bold tracking-wider">Today's Adherence</p>
              <p className="text-2xl font-black">{completionRate}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {takenCount}/{totalToday}
            </div>
          </div>
        </div>
      </div>

      {/* Large Easy-to-Understand Action Buttons */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Quick Actions (Elderly Friendly)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => setActivePage('schedule')}
            className="p-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-2 shadow-lg shadow-teal-600/20 transition-all text-center"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>Mark as Taken</span>
          </button>
          <button
            onClick={() => setActivePage('medications')}
            className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'} font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center`}
          >
            <Pill className="w-6 h-6 text-teal-600" />
            <span>View Medicines</span>
          </button>
          <button
            onClick={() => setActivePage('appointments')}
            className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'} font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center`}
          >
            <Calendar className="w-6 h-6 text-teal-600" />
            <span>View Appointments</span>
          </button>
          <button
            onClick={() => speakText(`Emergency contact is ${activeProfile.emergencyContact.name}, relationship ${activeProfile.emergencyContact.relation}, phone ${activeProfile.emergencyContact.phone}`)}
            className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'} font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center`}
          >
            <PhoneCall className="w-6 h-6 text-emerald-600" />
            <span>Contact Caregiver</span>
          </button>
          <button
            onClick={() => setActivePage('collaboration')}
            className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'} font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center col-span-2 sm:col-span-1`}
          >
            <Users className="w-6 h-6 text-teal-600" />
            <span>View Family</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Medication Schedule Widget */}
        <div className={`lg:col-span-7 p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-lg">Today's Medication Schedule</h3>
            </div>
            <button
              onClick={() => setActivePage('schedule')}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todaysLogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No medications scheduled for today.</p>
            ) : (
              todaysLogs.map(log => {
                const isTaken = log.status === 'taken';
                return (
                  <div
                    key={log.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      isTaken
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                        : theme === 'dark' ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isTaken ? 'bg-emerald-600 text-white' : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                      }`}>
                        {log.scheduledTime}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{log.medicationName} ({log.dosage})</p>
                        <p className="text-xs text-slate-500">Status: <span className="capitalize font-semibold text-teal-600">{log.status}</span></p>
                      </div>
                    </div>

                    <div>
                      {isTaken ? (
                        <span className="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Taken
                        </span>
                      ) : (
                        <button
                          onClick={() => confirmDose(log.id)}
                          className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Mark Taken
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Appointments & Connected Team */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upcoming Appointment */}
          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-lg">Next Appointment</h3>
              </div>
              <button
                onClick={() => setActivePage('appointments')}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                View All
              </button>
            </div>

            {nextAppointment ? (
              <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-2">
                <p className="font-bold text-sm text-teal-900 dark:text-teal-200">{nextAppointment.doctorName} ({nextAppointment.specialization})</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{nextAppointment.hospital}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 pt-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(nextAppointment.dateTime).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 text-center">No upcoming appointments.</p>
            )}
          </div>

          {/* Connected Family & Caregivers */}
          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-lg">Care Circle Members</h3>
              </div>
              <button
                onClick={() => setActivePage('collaboration')}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs">{member.name}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{member.role} • {member.relationship}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
