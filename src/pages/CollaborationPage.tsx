import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, UserPlus, Shield, Trash2, KeyRound, CheckCircle2 } from 'lucide-react';

export function CollaborationPage() {
  const { teamMembers, inviteMember, revokeMember, theme, activeProfile } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'family' | 'caregiver'>('family');
  const [relationship, setRelationship] = useState('Son');
  const [permissions, setPermissions] = useState({
    viewOnly: false,
    manageMedications: true,
    manageAppointments: true,
    confirmDoses: true,
    manageFamilyAccess: false,
  });
  const [generatedPasscode, setGeneratedPasscode] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const passcode = inviteMember(name, email, role, relationship, permissions);
    setGeneratedPasscode(passcode);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Family & Caregiver Collaboration</h1>
        <p className="text-xs text-slate-500">Manage connected care circle members, permission tiers, and 6-digit invitation passcodes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Connected Members List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-lg">Connected Care Circle Members</h3>
          <div className="space-y-4">
            {teamMembers.map(member => (
              <div
                key={member.id}
                className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{member.name}</h4>
                      <p className="text-xs text-slate-500">{member.email} • <strong className="capitalize text-teal-600">{member.role}</strong> ({member.relationship})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      member.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {member.status}
                    </span>
                    <button
                      onClick={() => revokeMember(member.id)}
                      title="Revoke Access"
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {member.passcode && (
                  <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-teal-900 dark:text-teal-200">Pending Passcode: <span className="font-mono text-sm tracking-widest">{member.passcode}</span></span>
                    </div>
                    <span className="text-[10px] text-slate-400">Expires in 48h</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Invite New Member Form */}
        <div className="lg:col-span-5">
          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <UserPlus className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-lg">Invite Family or Caregiver</h3>
            </div>

            {generatedPasscode && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Invitation Generated!</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Passcode: <strong className="font-mono text-sm">{generatedPasscode}</strong></p>
              </div>
            )}

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael Smith"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Role Type</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="family">Family Member</option>
                    <option value="caregiver">Caregiver</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Relationship</label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Send Invitation & Generate Passcode
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
