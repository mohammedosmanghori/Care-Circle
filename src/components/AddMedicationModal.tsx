import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Pill, Plus } from 'lucide-react';
import { MedicationFrequency } from '../types';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMedicationModal({ isOpen, onClose }: AddMedicationModalProps) {
  const { addMedication, theme, activeProfile } = useApp();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState<MedicationFrequency>('daily');
  const [timing, setTiming] = useState('08:00');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('2026-12-31');
  const [instructions, setInstructions] = useState('');
  const [doctorName, setDoctorName] = useState('Dr. Robert Chen');
  const [stockCount, setStockCount] = useState(30);
  const [lowStockThreshold, setLowStockThreshold] = useState(7);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) return;

    addMedication({
      name,
      dosage,
      frequency,
      timings: [timing],
      startDate,
      endDate,
      instructions,
      doctorName,
      stockCount: Number(stockCount),
      lowStockThreshold: Number(lowStockThreshold),
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className={`w-full max-w-lg rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-slate-900'} p-6 shadow-2xl border my-8`}>
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Add New Medication</h3>
              <p className="text-xs text-slate-500">Prescription details for {activeProfile.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Medicine Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Lisinopril"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Dosage *</label>
              <input
                type="text"
                required
                placeholder="e.g. 10mg"
                value={dosage}
                onChange={e => setDosage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={e => setFrequency(e.target.value as MedicationFrequency)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="daily">Daily</option>
                <option value="twice_daily">Twice Daily</option>
                <option value="weekly">Weekly</option>
                <option value="as_needed">As Needed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Schedule Timing</label>
              <input
                type="time"
                value={timing}
                onChange={e => setTiming(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Initial Stock Count</label>
              <input
                type="number"
                value={stockCount}
                onChange={e => setStockCount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Low Stock Alert Threshold</label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={e => setLowStockThreshold(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Prescribing Doctor</label>
              <input
                type="text"
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Instructions / Professional Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Take with a glass of water after breakfast."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
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
              <Plus className="w-4 h-4" /> Save Medication
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
