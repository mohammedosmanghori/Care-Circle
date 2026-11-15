import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Send, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';

export function NotificationsPage() {
  const { notifications, sendEmailReminder, currentUser, activeProfile, theme } = useApp();

  const [testEmail, setTestEmail] = useState(currentUser.email);
  const [testSubject, setTestSubject] = useState('CareCircle Test Medication Reminder');
  const [testMessage, setTestMessage] = useState('This is a simulated automated email reminder for morning medications.');
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccessMsg('');
    await sendEmailReminder(testEmail, activeProfile.name, testSubject, testMessage, 'system');
    setSending(false);
    setSuccessMsg('Test email successfully dispatched and logged.');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Notifications & Email Delivery History</h1>
        <p className="text-xs text-slate-500">Monitor automated reminder deliveries, missed medication alerts, and test email dispatcher.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Notification History List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-lg">Recent Notification Logs</h3>
          <div className="space-y-3">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`p-5 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-600" />
                    <h4 className="font-bold text-sm">{notif.title}</h4>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                    notif.status === 'sent' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {notif.status} {notif.deliveryId && `(${notif.deliveryId})`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{notif.message}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                  <span>Recipient: {notif.recipientEmail}</span>
                  <span>{new Date(notif.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Email Dispatcher */}
        <div className="lg:col-span-5">
          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Mail className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-lg">Test Email Reminder Dispatcher</h3>
            </div>

            {successMsg && (
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleTestEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Recipient Email</label>
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={e => setTestEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={testSubject}
                  onChange={e => setTestSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Message Body</label>
                <textarea
                  rows={3}
                  required
                  value={testMessage}
                  onChange={e => setTestMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Test Email
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
