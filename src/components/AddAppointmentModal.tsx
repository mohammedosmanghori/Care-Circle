import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Plus } from 'lucide-react';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAppointmentModal({ isOpen, onClose }: AddAppointmentModalProps) {
  const { addAppointment, theme, activeProfile } = useApp();

  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('Cardiologist');
  const [hospital, setHospital] = useState('');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName || !hospital) return;

    const dateTime = `${date}T${time}:00Z`;

    addAppointment({
      doctorName,
      specialization,
      hospital,
      dateTime,
      location,
      contact,
      reason,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className={`w-full max-w-lg rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-slate-900'} p-6 shadow-2xl border my-8`}>
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Book Doctor Appointment</h3>
              <p className="text-xs text-slate-500">New appointment for {activeProfile.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Doctor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Robert Chen"
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Specialization</label>
              <input
                type="text"
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Hospital / Clinic Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. City General Hospital"
              value={hospital}
              onChange={e => setHospital(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Appointment Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Appointment Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Location / Address</label>
              <input
                type="text"
                placeholder="e.g. 124 Medical Center Dr"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Contact Phone</label>
              <input
                type="text"
                placeholder="e.g. +1 (555) 382-9100"
                value={contact}
                onChange={e => setContact(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Reason for Appointment</label>
            <input
              type="text"
              placeholder="e.g. Routine quarterly blood pressure checkup"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Notes & Questions for Doctor</label>
            <textarea
              rows={2}
              placeholder="e.g. Bring blood pressure log diary."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Save Appointment
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
