import React, { useState } from 'react';
import { ShieldCheck, Key, CheckCircle, Zap, Crown, Sparkles, X, AlertCircle, Phone, PhoneCall, MessageSquare } from 'lucide-react';
import { LicenseInfo, TIER_LIMITS, validateLicenseKey, saveLicense } from '../utils/licenseManager';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLicense: LicenseInfo;
  onLicenseUpdated: () => void;
  onOpenDeveloperModal?: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  activeLicense,
  onLicenseUpdated,
  onOpenDeveloperModal
}) => {
  const [inputKey, setInputKey] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(activeLicense.tier === 'Free Trial' ? 'Pro License' : activeLicense.tier);

  const generatedWeeksList = activeLicense.generatedWeeks || [];
  const usedCount = generatedWeeksList.length > 0 ? generatedWeeksList.length : (activeLicense.generationsUsed || 0);
  const maxWeeks = activeLicense.maxWeeks || (activeLicense.tier === 'Premium License' ? 16 : activeLicense.tier === 'Pro License' ? 6 : 1);
  const isLimitReached = usedCount >= maxWeeks;

  if (!isOpen) return null;

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    if (!inputKey.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid license key.' });
      return;
    }

    const res = validateLicenseKey(inputKey);
    if (res.valid && res.tier) {
      const enteredKey = inputKey.trim().toUpperCase();
      const currentKey = (activeLicense.key || '').trim().toUpperCase();
      if (currentKey && enteredKey === currentKey) {
        setStatusMsg({ type: 'error', text: 'This key is already active on this device. Please purchase a NEW license key to continue generating new Week Ending dates.' });
        return;
      }
      const updated: LicenseInfo = {
        tier: res.tier,
        key: inputKey.trim().toUpperCase(),
        activatedAt: new Date().toISOString(),
        maxWeeks: res.tier === 'Premium License' ? 16 : 6,
        generationsUsed: 0
      };
      saveLicense(updated);
      setStatusMsg({ type: 'success', text: res.message });
      setInputKey('');
      onLicenseUpdated();
    } else {
      setStatusMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-1.5 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monetization & Licensing</span>
          </div>
          <h2 className="text-xl font-bold text-white">Choose Your Planning License</h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate high-precision Ghana NSBC Learner Plans & Notes tailored to your class and subject.
          </p>
        </div>

        {/* Usage Overview Banner */}
        <div className="bg-slate-800/90 border border-slate-700 p-3.5 rounded-xl mb-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active License:</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeLicense.tier === 'Premium License'
                  ? 'bg-amber-500/20 text-yellow-300 border border-yellow-500/40'
                  : activeLicense.tier === 'Pro License'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-700 text-slate-300 border border-slate-600'
              }`}>
                {activeLicense.tier}
              </span>
              {activeLicense.key && (
                <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  {activeLicense.key}
                </span>
              )}
            </div>
            <div className="text-xs font-bold text-yellow-400">
              Usage: {usedCount} / {maxWeeks} Week Ending Date(s) Generated
            </div>
          </div>

          {/* Usage Bar */}
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                isLimitReached
                  ? 'bg-red-500'
                  : usedCount / maxWeeks >= 0.7
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, Math.round((usedCount / maxWeeks) * 100))}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] pt-1 gap-1">
            {isLimitReached ? (
              <span className="text-red-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Limit Reached ({usedCount}/{maxWeeks} distinct Week Ending dates used). Upgrade below for new dates.
              </span>
            ) : (
              <span className="text-slate-300">
                <strong className="text-yellow-300">{maxWeeks - usedCount}</strong> new Week Ending date(s) remaining under this active tier.
              </span>
            )}
            <span className="text-slate-400 text-[10px]">
              (Re-generating for previously generated Week Ending dates is unlimited)
            </span>
          </div>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          
          {/* Tier 1: Free Trial */}
          <div
            onClick={() => setSelectedTier('Free Trial')}
            className={`p-4 rounded-xl border flex flex-col justify-between relative cursor-pointer transition-all duration-150 ${
              selectedTier === 'Free Trial'
                ? 'bg-slate-800 border-yellow-400 ring-2 ring-yellow-400/80 shadow-lg scale-[1.02]'
                : activeLicense.tier === 'Free Trial'
                ? 'bg-slate-800/90 border-slate-500'
                : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-500'
            }`}
          >
            {activeLicense.tier === 'Free Trial' && (
              <span className="absolute -top-2.5 right-3 bg-slate-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Current Tier
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300">1. Free Trial</span>
                <span className="text-xs font-bold text-slate-400">FREE</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">1 Week</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Generates Learner Plans for only one week per generation session.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 border-t border-slate-700/60 pt-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-slate-400" />
                <span>Basic 1-Week Planning</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('Free Trial');
                }}
                className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                  selectedTier === 'Free Trial'
                    ? 'bg-yellow-500 text-slate-950'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {selectedTier === 'Free Trial' ? '✓ Selected' : 'Choose Free Trial'}
              </button>
            </div>
          </div>

          {/* Tier 2: Pro License */}
          <div
            onClick={() => setSelectedTier('Pro License')}
            className={`p-4 rounded-xl border flex flex-col justify-between relative cursor-pointer transition-all duration-150 ${
              selectedTier === 'Pro License'
                ? 'bg-blue-950/90 border-yellow-400 ring-2 ring-yellow-400/80 shadow-lg scale-[1.02]'
                : activeLicense.tier === 'Pro License'
                ? 'bg-blue-900/50 border-blue-400 ring-2 ring-blue-500'
                : 'bg-slate-800/40 border-slate-700/60 hover:border-blue-500'
            }`}
          >
            {activeLicense.tier === 'Pro License' && (
              <span className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Current Tier
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  2. Pro License
                </span>
                <span className="text-xs font-bold text-yellow-400">GHC 50</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">6 Weeks</div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Generates Learner Plans for 6 weeks per subject per class.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-blue-200 border-t border-slate-700/60 pt-2 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3 h-3 text-blue-400" />
                <span>Extended 6-Week Planning</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('Pro License');
                }}
                className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                  selectedTier === 'Pro License'
                    ? 'bg-yellow-500 text-slate-950'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {selectedTier === 'Pro License' ? '✓ Selected' : 'Choose Pro Tier'}
              </button>
            </div>
          </div>

          {/* Tier 3: Premium License */}
          <div
            onClick={() => setSelectedTier('Premium License')}
            className={`p-4 rounded-xl border flex flex-col justify-between relative cursor-pointer transition-all duration-150 ${
              selectedTier === 'Premium License'
                ? 'bg-gradient-to-b from-amber-950 to-slate-900 border-yellow-400 ring-2 ring-yellow-400/80 shadow-lg scale-[1.02]'
                : activeLicense.tier === 'Premium License'
                ? 'bg-gradient-to-b from-amber-950/80 to-slate-900 border-amber-400 ring-2 ring-amber-400'
                : 'bg-slate-800/40 border-slate-700/60 hover:border-amber-500'
            }`}
          >
            {activeLicense.tier === 'Premium License' && (
              <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Current Tier
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  3. Premium
                </span>
                <span className="text-xs font-bold text-yellow-400">GHC 150</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">Whole Term</div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Generates Learner Plans for whole Term per subject per class.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-amber-300 border-t border-slate-700/60 pt-2 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3 h-3 text-yellow-400" />
                <span>Full Term Unlimited Access</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('Premium License');
                }}
                className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                  selectedTier === 'Premium License'
                    ? 'bg-yellow-500 text-slate-950'
                    : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950'
                }`}
              >
                {selectedTier === 'Premium License' ? '✓ Selected' : 'Choose Premium'}
              </button>
            </div>
          </div>

        </div>

        {/* Selected Tier Developer Activation Callout */}
        {selectedTier && (
          <div className="mb-5 bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border-2 border-yellow-400 p-4 rounded-xl text-yellow-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-yellow-400">
                  {selectedTier} Tier Selected
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  Contact developer on <a href="tel:0243302919" className="text-yellow-300 underline hover:text-yellow-200">0243302919</a> for Activation Key
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <a
                href="tel:0243302919"
                className="flex-1 sm:flex-initial px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 0243302919</span>
              </a>
              <a
                href="https://wa.me/233243302919?text=Hello%20Victor,%20I%20would%20like%20to%20request%20an%20Activation%20Key%20for%20Ghana%20NSBC%20Learner%20Plan%20Generator."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* License Activation Form */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-yellow-400" />
              <span>Activate Pro or Premium License Key</span>
            </h4>
            <span className="text-[11px] text-slate-400">
              Contact developer on <a href="tel:0243302919" className="text-yellow-300 font-bold hover:underline">0243302919</a> for Activation Key
            </span>
          </div>

          <form onSubmit={handleActivate} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="e.g. PRO50-VCG-892F1 or PREM150-VCG-742A9"
              className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow transition shrink-0 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Activate Key</span>
            </button>
          </form>

          {statusMsg && (
            <div className={`mt-3 p-2.5 rounded-lg text-xs flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                : 'bg-red-950/70 border border-red-800 text-red-300'
            }`}>
              {statusMsg.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>

        {/* Notice line */}
        <div className="text-center mt-4 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Contact developer on <a href="tel:0243302919" className="text-yellow-300 font-bold hover:underline">0243302919</a> for Activation Key</span>
          <span>•</span>
          <span>Developer: <button type="button" onClick={() => { onClose(); if (onOpenDeveloperModal) onOpenDeveloperModal(); }} className="text-yellow-400 hover:text-yellow-300 underline font-bold">Victor</button> C. Gbetodeme</span>
        </div>

      </div>
    </div>
  );
};

