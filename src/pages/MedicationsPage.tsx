import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Pill, Plus, Trash2, AlertTriangle, ShieldCheck, Search } from 'lucide-react';

interface MedicationsPageProps {
  onOpenAddMed: () => void;
}

export function MedicationsPage({ onOpenAddMed }: MedicationsPageProps) {
  const { medications, deleteMedication, theme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeds = medications.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Medication Management</h1>
          <p className="text-xs text-slate-500">View, add, edit, and track inventory for prescribed medications.</p>
        </div>
        <button
          onClick={onOpenAddMed}
          className="px-5 py-3 rounded-2xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Medicine
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search medications or doctor name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'} text-xs focus:ring-2 focus:ring-teal-500 outline-none`}
        />
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeds.map(med => {
          const isLowStock = med.stockCount <= med.lowStockThreshold;
          return (
            <div
              key={med.id}
              className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={med.imageUrl} alt={med.name} className="w-12 h-12 rounded-2xl object-cover border" />
                  <div>
                    <h3 className="font-bold text-base">{med.name}</h3>
                    <p className="text-xs font-semibold text-teal-600">{med.dosage} • {med.frequency}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteMedication(med.id)}
                  title="Delete Medication"
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Timings:</span>
                  <span className="font-semibold">{med.timings.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Prescribing Doctor:</span>
                  <span className="font-semibold">{med.doctorName}</span>
                </div>
                <div className="flex justify-between py-1 items-center">
                  <span className="text-slate-400">Available Stock:</span>
                  <span className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                    isLowStock ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {med.stockCount} tablets {isLowStock && '⚠️ Low'}
                  </span>
                </div>
              </div>

              {med.instructions && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  "{med.instructions}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
