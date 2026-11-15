import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarCheck, Check, Clock, AlertCircle, SkipForward } from 'lucide-react';

export function SchedulePage() {
  const { medicationLogs, confirmDose, skipDose, theme } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredLogs = medicationLogs.filter(l => l.scheduledDate === selectedDate);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Daily Medication Schedule</h1>
          <p className="text-xs text-slate-500">Track scheduled doses, confirm adherence, and review timing records.</p>
        </div>
        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className={`px-4 py-2.5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'} text-xs font-semibold focus:ring-2 focus:ring-teal-500 outline-none`}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border`}>
            <CalendarCheck className="w-12 h-12 text-teal-600 mx-auto mb-3 opacity-50" />
            <h3 className="font-bold text-base">No Doses Scheduled</h3>
            <p className="text-xs text-slate-400 mt-1">There are no medication logs for {selectedDate}.</p>
          </div>
        ) : (
          filteredLogs.map(log => {
            const isTaken = log.status === 'taken';
            const isSkipped = log.status === 'skipped';
            return (
              <div
                key={log.id}
                className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  isTaken
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                    : isSkipped
                    ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
                    : theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm ${
                    isTaken ? 'bg-emerald-600 text-white' : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                  }`}>
                    {log.scheduledTime}
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{log.medicationName} <span className="text-teal-600 font-normal">({log.dosage})</span></h3>
                    <p className="text-xs text-slate-500">
                      Status: <span className="capitalize font-semibold text-teal-600">{log.status}</span>
                      {log.confirmedBy && ` • Confirmed by ${log.confirmedBy}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {isTaken ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Taken
                    </span>
                  ) : isSkipped ? (
                    <span className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold">
                      Skipped
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => skipDose(log.id)}
                        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Skip
                      </button>
                      <button
                        onClick={() => confirmDose(log.id)}
                        className="px-5 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> Mark as Taken
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
