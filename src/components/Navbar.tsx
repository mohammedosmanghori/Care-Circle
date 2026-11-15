import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartPulse,
  Bell,
  Sun,
  Moon,
  Volume2,
  ShieldCheck,
  UserCheck,
  Menu,
  X,
  KeyRound
} from 'lucide-react';
import { DEMO_USERS } from '../mockData';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenVerify: () => void;
}

export function Navbar({ onOpenAuth, onOpenVerify }: NavbarProps) {
  const {
    currentUser,
    switchUser,
    activeProfile,
    notifications,
    theme,
    setTheme,
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    speakText,
    setActivePage
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.status === 'pending' || n.type === 'stock').length;

  return (
    <header className={`${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} sticky top-0 z-40 border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('dashboard')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                CareCircle
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                Secure SaaS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Active Profile: <strong className="text-teal-700 dark:text-teal-400">{activeProfile.name}</strong>
            </p>
          </div>
        </div>

        {/* Quick Accessibility & Role Controls */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Text-to-Speech Helper */}
          <button
            onClick={() => speakText(`CareCircle dashboard for ${activeProfile.name}. You have active medication schedules and secure family access.`)}
            title="Read Screen Aloud (Accessibility)"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <Volume2 className="w-4 h-4 text-teal-600" />
            <span>Read Page</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(prev => !prev)}
            title="Toggle High Contrast"
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
              highContrast ? 'bg-amber-500 text-white border-amber-600' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Contrast
          </button>

          {/* Large Text Mode Toggle */}
          <button
            onClick={() => setLargeText(prev => !prev)}
            title="Toggle Large Text Mode for Seniors"
            className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
              largeText ? 'bg-teal-600 text-white border-teal-700' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            A+ Large Font
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="Toggle Light/Dark Theme"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setActivePage('notifications')}
            className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Verify Passcode Button */}
          <button
            onClick={onOpenVerify}
            className="px-3 py-2 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-teal-100 transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Join with Passcode</span>
          </button>

          {/* Current User & Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-teal-500"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-teal-600 dark:text-teal-400">
                  {currentUser.role}
                </p>
              </div>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Switch Demo Role / User
                </p>
                <div className="space-y-1 mt-1">
                  {DEMO_USERS.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setShowUserDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-colors ${
                        currentUser.id === u.id ? 'bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{u.name}</p>
                        <p className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 capitalize">{u.role} Account</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 mt-3 pt-2">
                  <button
                    onClick={() => {
                      onOpenAuth();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Custom Login & Registration →
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setActivePage('notifications')}
            className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-500" />
            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{currentUser.name}</p>
              <p className="text-xs text-teal-600 uppercase font-semibold">{currentUser.role} Account</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { speakText(`CareCircle dashboard for ${activeProfile.name}`); setShowMobileMenu(false); }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-teal-600" /> Read Aloud
            </button>
            <button
              onClick={() => { setLargeText(!largeText); setShowMobileMenu(false); }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              A+ Font Mode
            </button>
          </div>
          <button
            onClick={() => { onOpenVerify(); setShowMobileMenu(false); }}
            className="w-full py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" /> Join with Invitation Passcode
          </button>
        </div>
      )}
    </header>
  );
}
