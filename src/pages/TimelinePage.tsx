import React from 'react';
import { useApp } from '../context/AppContext';
import { History, Shield, CheckCircle2 } from 'lucide-react';

export function TimelinePage() {
  const { activityTimeline, theme } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Care Activity Audit Timeline</h1>
        <p className="text-xs text-slate-500">Real-time audit log tracking who confirmed medication doses, added notes, and updated appointments.</p>
      </div>

      <div className={`p-6 sm:p-8 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-6`}>
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-teal-200 dark:before:bg-teal-900">
          {activityTimeline.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-4 pl-10">
              <div className="absolute left-2 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                ✓
              </div>
              <div className={`flex-1 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-teal-700 dark:text-teal-400">{item.action}</h4>
                  <span className="text-[10px] text-slate-400">{new Date(item.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.actorName} ({item.actorRole})</p>
                <p className="text-xs text-slate-500">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
