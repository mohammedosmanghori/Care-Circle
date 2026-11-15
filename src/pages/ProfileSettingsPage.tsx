import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, User, Shield, Moon, Sun, Volume2 } from 'lucide-react';

export function ProfileSettingsPage() {
  const {
    activeProfile,
    currentUser,
    theme,
    setTheme,
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    speakText
  } = useApp();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Healthcare Profile & Accessibility Settings</h1>
        <p className="text-xs text-slate-500">Configure profile details, medical conditions, and senior-friendly accessibility preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card */}
        <div className={`lg:col-span-6 p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-6`}>
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <img src={activeProfile.avatar} alt={activeProfile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500" />
            <div>
              <h3 className="font-bold text-lg">{activeProfile.name}</h3>
              <p className="text-xs text-teal-600 font-semibold">Age {activeProfile.age} • Blood Group {activeProfile.bloodGroup}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Date of Birth:</span>
              <span className="font-semibold">{activeProfile.dob}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Emergency Contact:</span>
              <span className="font-semibold">{activeProfile.emergencyContact.name} ({activeProfile.emergencyContact.relation}) • {activeProfile.emergencyContact.phone}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Medical Conditions:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProfile.medicalConditions.map((cond, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-semibold text-[11px]">
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Theme Settings */}
        <div className={`lg:col-span-6 p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-6`}>
          <h3 className="font-bold text-lg">Senior Accessibility Preferences</h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold">High Contrast Mode</p>
                <p className="text-slate-400">Enhance visual distinction for low vision</p>
              </div>
              <button
                onClick={() => setHighContrast(prev => !prev)}
                className={`px-4 py-2 rounded-xl font-bold text-xs ${
                  highContrast ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {highContrast ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold">Large Font Mode (A+)</p>
                <p className="text-slate-400">Increase reading font size across all screens</p>
              </div>
              <button
                onClick={() => setLargeText(prev => !prev)}
                className={`px-4 py-2 rounded-xl font-bold text-xs ${
                  largeText ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {largeText ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold">Theme Mode</p>
                <p className="text-slate-400">Switch between light and dark themes</p>
              </div>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs flex items-center gap-2"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="capitalize">{theme}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
