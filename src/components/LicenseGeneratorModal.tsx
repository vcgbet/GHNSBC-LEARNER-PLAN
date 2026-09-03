import React, { useState } from 'react';
import { Key, Copy, Check, Sparkles, X, User, Crown, Zap } from 'lucide-react';
import { generateLicenseKey, activateLicenseKey, saveLicense, LicenseTier } from '../utils/licenseManager';

interface LicenseGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLicenseUpdated: () => void;
}

export const LicenseGeneratorModal: React.FC<LicenseGeneratorModalProps> = ({
  isOpen,
  onClose,
  onLicenseUpdated
}) => {
  const [tier, setTier] = useState<'Pro License' | 'Premium License'>('Pro License');
  const [clientName, setClientName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activationNotice, setActivationNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const key = generateLicenseKey(tier, clientName);
    setGeneratedKey(key);
    setCopied(false);
    setActivationNotice(null);
  };

  const handleCopy = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelfActivate = () => {
    if (!generatedKey) return;
    const res = activateLicenseKey(generatedKey);
    if (res.valid && res.tier) {
      saveLicense({
        tier: res.tier,
        key: generatedKey,
        clientName: clientName || 'Victor C. Gbetodeme',
        activatedAt: new Date().toISOString(),
        maxWeeks: res.tier === 'Premium License' ? 12 : 6,
        generationsUsed: 0
      });
      setActivationNotice(`Activated ${res.tier} on this device!`);
      onLicenseUpdated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-blue-500/40 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-1.5 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Key className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Admin License Generator</h3>
              <span className="text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2 py-0.5 rounded-full font-bold uppercase">
                Developer Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">Welcome Victor C. Gbetodeme! Issue keys to clients.</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          
          {/* Select Tier */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
              Select License Tier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTier('Pro License')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${
                  tier === 'Pro License'
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500/50'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                    Pro License
                  </span>
                  <span className="text-xs font-bold text-blue-400">GHC 100</span>
                </div>
                <p className="text-[11px] text-slate-300">6 Weeks Planning per Subject/Class</p>
              </button>

              <button
                type="button"
                onClick={() => setTier('Premium License')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${
                  tier === 'Premium License'
                    ? 'bg-amber-500/20 border-amber-500 text-white ring-2 ring-amber-500/50'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1 text-amber-300">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    Premium License
                  </span>
                  <span className="text-xs font-bold text-amber-400">GHC 150</span>
                </div>
                <p className="text-[11px] text-slate-300">Whole Term Planning per Subject/Class</p>
              </button>
            </div>
          </div>

          {/* Client Name Optional */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Client / School Name (Optional)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. St. Augustine Basic School"
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Generate Action Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Generate New Client Key</span>
          </button>
        </form>

        {/* Output Section */}
        {generatedKey && (
          <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Generated License Key:</span>
              <span className="text-[10px] text-amber-300 font-semibold">{tier}</span>
            </div>

            <div className="bg-slate-950 border border-amber-500/40 p-3 rounded-xl flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-bold text-yellow-300 tracking-wider break-all">
                {generatedKey}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Send this key to your client. They can paste it in their app's <strong>Activate License</strong> window to unlock {tier}.
            </p>

            {activationNotice ? (
              <div className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 p-2 rounded-lg text-center font-bold">
                {activationNotice}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSelfActivate}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 rounded-lg transition"
              >
                Test Activation on this Device
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
