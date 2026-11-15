import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  const { verifyPasscode, theme } = useApp();
  const [passcode, setPasscode] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = verifyPasscode(passcode);
    if (success) {
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setPasscode('');
        onClose();
      }, 1500);
    } else {
      setErrorMsg('Invalid or expired 6-digit passcode. Please check with the family administrator.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md rounded-3xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-slate-900'} p-6 shadow-2xl border`}>
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Join Care Circle</h3>
              <p className="text-xs text-slate-500">Enter 6-digit invitation passcode</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="font-bold text-lg text-emerald-600">Verification Successful!</h4>
            <p className="text-xs text-slate-500">You are now securely connected to the care circle.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2">6-Digit Passcode</label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 849201"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                Demo Hint: Check the Family & Caregivers page for pending invitation passcodes.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20"
            >
              Verify & Join Profile
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
