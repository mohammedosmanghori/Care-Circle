import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Plus, Stethoscope, MapPin, Phone, Trash2 } from 'lucide-react';

interface AppointmentsPageProps {
  onOpenAddApt: () => void;
}

export function AppointmentsPage({ onOpenAddApt }: AppointmentsPageProps) {
  const { appointments, cancelAppointment, theme } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Doctor Appointments</h1>
          <p className="text-xs text-slate-500">Manage consultations, hospital visits, and automated reminders.</p>
        </div>
        <button
          onClick={onOpenAddApt}
          className="px-5 py-3 rounded-2xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base">{apt.doctorName}</h3>
                  <p className="text-xs font-semibold text-teal-600">{apt.specialization} • {apt.hospital}</p>
                </div>
              </div>
              <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                apt.status === 'upcoming' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' : 'bg-slate-100 text-slate-600'
              }`}>
                {apt.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span className="font-bold">{new Date(apt.dateTime).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{apt.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{apt.contact}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-1">
              <p className="text-xs font-bold text-teal-900 dark:text-teal-200">Reason: {apt.reason}</p>
              {apt.notes && <p className="text-xs text-slate-500 italic">Notes: {apt.notes}</p>}
            </div>

            {apt.status === 'upcoming' && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => cancelAppointment(apt.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  Cancel Appointment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
