import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Users,
  Bell,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Heart,
  Pill
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: () => void;
}

export function LandingPage({ onOpenAuth }: LandingPageProps) {
  const { setActivePage, theme } = useApp();

  return (
    <div className={`min-h-[calc(100vh-4.5rem)] ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-16`}>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Smart Elderly Care & Medication Management Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Compassionate Care, <br />
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Connected Together.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              CareCircle empowers elderly individuals to remain at the center of their healthcare routines while keeping authorized family members and caregivers instantly informed and aligned.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setActivePage('dashboard')}
                className="px-8 py-4 rounded-2xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-600/30 flex items-center gap-3 transition-all"
              >
                <span>Launch Main Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenAuth}
                className={`px-8 py-4 rounded-2xl border ${theme === 'dark' ? 'border-slate-800 hover:bg-slate-900' : 'border-slate-200 hover:bg-white'} font-bold text-sm transition-all`}
              >
                Demo Roles & Login
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border space-y-4`}>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                  MS
                </div>
                <div>
                  <h3 className="font-bold text-base">Margaret Smith</h3>
                  <p className="text-xs text-teal-600 font-semibold">Active Elderly Profile (Age 78)</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Today's Adherence</p>
                    <p className="text-lg font-extrabold text-emerald-700">100% (2/2 Taken)</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-teal-800 dark:text-teal-300">Next Doctor Appointment</p>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Dr. Robert Chen • Nov 20, 10:00 AM</p>
                  </div>
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Designed for Seniors & Care Teams</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every feature is built with high contrast, large readable fonts, and zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-3`}>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Smart Medication Tracking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clear dosage instructions, exact timings, stock level monitoring, and simple one-tap confirmation for elderly users.
            </p>
          </div>

          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-3`}>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Family & Caregiver Collaboration</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Secure 6-digit passcode invitations, permission tiers, shared activity timelines, and care handover shift notes.
            </p>
          </div>

          <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border space-y-3`}>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Gemini AI Care Assistant</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intelligent routine summaries, adherence trend analysis, doctor discussion question generator, and email reminders.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
