import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, CheckCircle2, Award, Calendar } from 'lucide-react';

export function AdherenceCalendarPage() {
  const { medicationLogs, theme } = useApp();

  // Generate last 14 days for visual adherence streaks
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Medication Adherence Calendar</h1>
        <p className="text-xs text-slate-500">Visual streaks and history of medication adherence performance.</p>
      </div>

      <div className={`p-6 sm:p-8 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">14-Day Consistency Streak</h3>
            <p className="text-xs text-slate-400">Consistent daily dose confirmation history</p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>98% Adherence Rate</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
          {days.map(day => {
            const dayLogs = medicationLogs.filter(l => l.scheduledDate === day);
            const total = dayLogs.length;
            const taken = dayLogs.filter(l => l.status === 'taken').length;
            const rate = total > 0 ? Math.round((taken / total) * 100) : 100;
            const isPerfect = rate >= 100;

            return (
              <div
                key={day}
                className={`p-4 rounded-2xl border text-center space-y-2 ${
                  isPerfect
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                    : theme === 'dark' ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {new Date(day).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs ${
                  isPerfect ? 'bg-emerald-600 text-white' : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                }`}>
                  {rate}%
                </div>
                <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  {taken}/{total} Doses
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
