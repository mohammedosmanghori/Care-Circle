import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../mockData';
import { X, Shield, UserCheck, Stethoscope, Heart, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { switchUser, theme } = useApp();
  const [selectedRole, setSelectedRole] = useState<'elderly' | 'family' | 'caregiver'>('elderly');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleQuickSelect = (userId: string) => {
    switchUser(userId);
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Find matching demo user or switch to first of role
    const match = DEMO_USERS.find(u => u.role === selectedRole);
    if (match) {
      switchUser(match.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-slate-900'} p-6 shadow-2xl border`}>
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">CareCircle Access</h3>
              <p className="text-xs text-slate-500">Secure Healthcare Authentication</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Role & Demo Profile
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('elderly')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedRole === 'elderly' ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <Heart className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                <span className="text-xs">Elderly User</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('family')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedRole === 'family' ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <UserCheck className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                <span className="text-xs">Family Member</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('caregiver')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedRole === 'caregiver' ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <Stethoscope className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                <span className="text-xs">Caregiver</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Demo Logins</p>
            {DEMO_USERS.filter(u => u.role === selectedRole).map(u => (
              <button
                key={u.id}
                onClick={() => handleQuickSelect(u.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className="text-left">
                    <p className="text-sm font-bold">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-600 text-white">Login</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomLogin} className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20"
            >
              Access CareCircle Platform
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
