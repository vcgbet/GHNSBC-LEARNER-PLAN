import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound, Sparkles, Phone } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose, onVerified }) => {
  const [devName, setDevName] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = devName.trim();
    if (cleaned.toLowerCase() === 'victor c. gbetodeme' || cleaned.toLowerCase() === 'victor c.gbetodeme' || cleaned.toLowerCase() === 'victor gbetodeme') {
      setError(null);
      setDevName('');
      onVerified();
    } else {
      setError('Incorrect User Name. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-1.5 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Admin Access Verification
            </h3>
            <p className="text-xs text-slate-400">Developer Security Check</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Please enter the authorized user name below to unlock the <strong className="text-yellow-400">Admin License Generator</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1 tracking-wider">
              User Name
            </label>
            <input
              type="text"
              value={devName}
              onChange={(e) => setDevName(e.target.value)}
              placeholder="e.g. Kwesi Mensah"
              autoFocus
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-950/50 border border-red-800/60 p-2.5 rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-yellow-300" />
              <span>Unlock License Generator</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Developer Contact: <a href="tel:0243302919" className="text-yellow-300 font-bold hover:underline">0243302919</a>
        </div>

      </div>
    </div>
  );
};
