import React from 'react';
import { BookOpen, Sparkles, Wifi, WifiOff, FolderKanban, Compass, Key, Crown, Zap, Phone } from 'lucide-react';
import { LicenseInfo } from '../utils/licenseManager';

interface NavbarProps {
  activeTab: 'generator' | 'saved' | 'curriculum';
  setActiveTab: (tab: 'generator' | 'saved' | 'curriculum') => void;
  savedCount: number;
  isOnline: boolean;
  activeLicense: LicenseInfo;
  onOpenLicenseModal: () => void;
  onOpenDeveloperModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  isOnline,
  activeLicense,
  onOpenLicenseModal,
  onOpenDeveloperModal
}) => {
  return (
    <header id="main-header" className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md border-b border-blue-800/50">
      <div id="header-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div id="header-content" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Ghana GES Branding */}
          <div id="brand-section" className="flex items-center gap-3">
            <div id="logo-icon-box" className="w-11 h-11 rounded-xl bg-gradient-to-tr from-yellow-500 via-red-500 to-green-600 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-blue-950 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div>
              <div id="app-title-box" className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
                  Ghana NSBC <span className="text-yellow-400">Learner Plan</span> & Notes
                </h1>
                <span id="badge-vcgmedia" className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  VCGMEDIA
                </span>
                <span id="badge-nacca" className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  NaCCA Standard
                </span>
              </div>
              <p className="text-xs text-blue-200/80 flex items-center gap-2 flex-wrap mt-0.5">
                <span>New Standard-Based Curriculum • Plan & Notes Generator</span>
                <span className="text-blue-400/60 hidden sm:inline">•</span>
                <span className="text-amber-200/90 font-medium">
                  Developer:{' '}
                  <button
                    onClick={onOpenDeveloperModal}
                    className="text-yellow-300 hover:text-yellow-200 underline font-bold cursor-pointer transition inline-block"
                    title="Click 'Victor' to open Admin Developer Access"
                  >
                    Victor
                  </button>{' '}
                  C. Gbetodeme
                </span>
                <span className="text-blue-400/60 hidden sm:inline">•</span>
                <a
                  href="tel:0243302919"
                  className="inline-flex items-center gap-1.5 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 border border-yellow-400/40 px-2.5 py-0.5 rounded-full font-bold transition text-[11px] shadow-sm hover:scale-105"
                  title="Call Developer on 0243302919"
                >
                  <Phone className="w-3 h-3 text-yellow-400 shrink-0" />
                  <span>Developer Contact: 0243302919</span>
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Controls & Connectivity Badge */}
          <div id="header-actions" className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 flex-wrap">
            
            {/* License Tier Badge / Upgrade Button */}
            {(() => {
              const used = activeLicense.generatedWeeks ? activeLicense.generatedWeeks.length : (activeLicense.generationsUsed || 0);
              const max = activeLicense.maxWeeks || (activeLicense.tier === 'Premium License' ? 12 : activeLicense.tier === 'Pro License' ? 6 : 1);
              const isLimit = used >= max;
              return (
                <button
                  onClick={onOpenLicenseModal}
                  title={isLimit ? `${activeLicense.tier} limit reached (${used}/${max} distinct Week Ending dates). Click to upgrade.` : `${activeLicense.tier}: ${used}/${max} Week Ending dates generated`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                    isLimit
                      ? 'bg-red-950/90 text-red-200 border-red-500 animate-pulse hover:bg-red-900'
                      : activeLicense.tier === 'Premium License'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-yellow-300 hover:brightness-105'
                      : activeLicense.tier === 'Pro License'
                      ? 'bg-blue-600/90 text-white border-blue-400 hover:bg-blue-600'
                      : 'bg-slate-800 text-yellow-300 border-amber-500/40 hover:bg-slate-700'
                  }`}
                >
                  {activeLicense.tier === 'Premium License' ? (
                    <Crown className="w-3.5 h-3.5 shrink-0 text-slate-950" />
                  ) : activeLicense.tier === 'Pro License' ? (
                    <Zap className="w-3.5 h-3.5 shrink-0 text-yellow-300" />
                  ) : (
                    <Key className="w-3.5 h-3.5 shrink-0 text-yellow-400" />
                  )}
                  <span>
                    {activeLicense.tier} ({used}/{max})
                  </span>
                </button>
              );
            })()}

            {/* Nav Tabs */}
            <nav id="navigation-tabs" className="flex items-center bg-blue-950/80 p-1 rounded-xl border border-blue-800/60 shadow-inner">
              <button
                id="btn-nav-generator"
                onClick={() => setActiveTab('generator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'generator'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Generator</span>
              </button>

              <button
                id="btn-nav-saved"
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'saved'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5 text-blue-300" />
                <span>Saved Plans</span>
                {savedCount > 0 && (
                  <span id="saved-plans-badge" className="ml-0.5 px-1.5 py-0.2 bg-yellow-500/30 text-yellow-200 text-[10px] rounded-full font-bold">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                id="btn-nav-curriculum"
                onClick={() => setActiveTab('curriculum')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'curriculum'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-emerald-300" />
                <span>Syllabus Guide</span>
              </button>
            </nav>

            {/* Offline Status Badge */}
            <div id="status-badge" className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-slate-300">
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-medium text-[11px]">Online (AI & Local)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-medium text-[11px]">Offline Engine Active</span>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

