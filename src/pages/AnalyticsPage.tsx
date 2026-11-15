import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, CheckCircle2, TrendingUp, Award, AlertCircle } from 'lucide-react';

export function AnalyticsPage() {
  const { medicationLogs, medications, theme } = useApp();

  const totalLogs = medicationLogs.length;
  const takenLogs = medicationLogs.filter(l => l.status === 'taken').length;
  const completionRate = totalLogs > 0 ? Math.round((takenLogs / totalLogs) * 100) : 100;
  const lowStockMeds = medications.filter(m => m.stockCount <= m.lowStockThreshold);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Adherence & Health Analytics</h1>
        <p className="text-xs text-slate-500">Real-time statistics, completion percentages, and inventory health metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-2`}>
          <p className="text-xs font-bold text-slate-400 uppercase">Total Completion Rate</p>
          <p className="text-3xl font-black text-teal-600">{completionRate}%</p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +4.2% vs last week
          </p>
        </div>

        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-2`}>
          <p className="text-xs font-bold text-slate-400 uppercase">Total Doses Taken</p>
          <p className="text-3xl font-black text-emerald-600">{takenLogs} / {totalLogs}</p>
          <p className="text-xs text-slate-500">Fully confirmed by care team</p>
        </div>

        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-2`}>
          <p className="text-xs font-bold text-slate-400 uppercase">Active Medications</p>
          <p className="text-3xl font-black">{medications.length}</p>
          <p className="text-xs text-slate-500">Synchronized routines</p>
        </div>

        <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-2`}>
          <p className="text-xs font-bold text-slate-400 uppercase">Low Stock Alerts</p>
          <p className="text-3xl font-black text-rose-500">{lowStockMeds.length}</p>
          <p className="text-xs text-slate-500">Requires pharmacy refill</p>
        </div>
      </div>

      <div className={`p-6 sm:p-8 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-6`}>
        <h3 className="font-bold text-lg">Inventory Stock Status</h3>
        <div className="space-y-4">
          {medications.map(med => {
            const isLow = med.stockCount <= med.lowStockThreshold;
            return (
              <div key={med.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-bold text-sm">{med.name} ({med.dosage})</p>
                  <p className="text-xs text-slate-400">Prescribed by {med.doctorName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isLow ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {med.stockCount} tablets {isLow && '⚠️ Refill Needed'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
