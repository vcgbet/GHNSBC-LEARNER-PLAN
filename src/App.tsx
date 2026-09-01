import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FormInput } from './components/FormInput';
import { PlanViewer } from './components/PlanViewer';
import { SavedPlans } from './components/SavedPlans';
import { CurriculumBrowser } from './components/CurriculumBrowser';
import { DeveloperModal } from './components/DeveloperModal';
import { LicenseGeneratorModal } from './components/LicenseGeneratorModal';
import { LicenseModal } from './components/LicenseModal';
import { PlanFormInputs, LearnerPlanOutput } from './types';
import { generateOfflinePlan } from './utils/offlineGenerator';
import { getActiveLicense, checkLicenseCanGenerate, recordLicenseGeneration, LicenseInfo } from './utils/licenseManager';
import { BookOpen, Sparkles, AlertCircle, RefreshCw, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'saved' | 'curriculum'>('generator');
  const [currentPlan, setCurrentPlan] = useState<LearnerPlanOutput | null>(null);
  const [savedPlans, setSavedPlans] = useState<LearnerPlanOutput[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // License & Developer Modals State
  const [activeLicense, setActiveLicense] = useState<LicenseInfo>(() => getActiveLicense());
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState<boolean>(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState<boolean>(false);
  const [isLicenseGeneratorOpen, setIsLicenseGeneratorOpen] = useState<boolean>(false);

  const refreshLicense = () => {
    setActiveLicense(getActiveLicense());
  };

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load saved plans from localStorage
    try {
      const stored = localStorage.getItem('ghana_nsbc_saved_plans');
      if (stored) {
        setSavedPlans(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse saved plans:", e);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save plans to local storage
  const handleSavePlan = (planToSave: LearnerPlanOutput) => {
    try {
      const exists = savedPlans.some(p => p.id === planToSave.id);
      let updated: LearnerPlanOutput[];
      if (exists) {
        updated = savedPlans.map(p => p.id === planToSave.id ? planToSave : p);
      } else {
        updated = [planToSave, ...savedPlans];
      }
      setSavedPlans(updated);
      localStorage.setItem('ghana_nsbc_saved_plans', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save plan to storage:", e);
    }
  };

  const handleDeletePlan = (id: string) => {
    const updated = savedPlans.filter(p => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem('ghana_nsbc_saved_plans', JSON.stringify(updated));
    if (currentPlan && currentPlan.id === id) {
      setCurrentPlan(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all saved plans?")) {
      setSavedPlans([]);
      localStorage.removeItem('ghana_nsbc_saved_plans');
    }
  };

  // Generate Plan Handler
  const handleGeneratePlan = async (inputs: PlanFormInputs, mode: 'AI' | 'Offline Engine') => {
    // Check active license limits before generating based on Week Ending date
    const check = checkLicenseCanGenerate(inputs.weekEnding);
    if (!check.allowed) {
      setErrorMsg(check.reason || "License generation limit reached.");
      setIsLicenseModalOpen(true);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    if (mode === 'Offline Engine' || !isOnline) {
      // Use client-side offline generator
      setTimeout(() => {
        const plan = generateOfflinePlan(inputs);
        setCurrentPlan(plan);
        const updatedLicense = recordLicenseGeneration(inputs.weekEnding);
        setActiveLicense(updatedLicense);
        setIsLoading(false);
      }, 400);
      return;
    }

    // AI Generation via backend API
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const plan: LearnerPlanOutput = await response.json();
      setCurrentPlan(plan);
      const updatedLicense = recordLicenseGeneration(inputs.weekEnding);
      setActiveLicense(updatedLicense);
    } catch (err: any) {
      console.warn("AI generation failed, using offline engine fallback:", err);
      setErrorMsg("Gemini AI API connection unavailable. Generated using high-precision Offline Engine instead.");
      const fallbackPlan = generateOfflinePlan(inputs);
      setCurrentPlan(fallbackPlan);
      const updatedLicense = recordLicenseGeneration(inputs.weekEnding);
      setActiveLicense(updatedLicense);
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentPlanSaved = currentPlan ? savedPlans.some(p => p.id === currentPlan.id) : false;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      
      {/* Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedPlans.length}
        isOnline={isOnline}
        activeLicense={activeLicense}
        onOpenLicenseModal={() => setIsLicenseModalOpen(true)}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Error / Alert Notice */}
        {errorMsg && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-amber-700 hover:text-amber-950 font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View Switcher based on Active Tab */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* Input Form */}
            <FormInput
              onSubmit={handleGeneratePlan}
              isLoading={isLoading}
              isOnline={isOnline}
              activeLicense={activeLicense}
              onOpenLicenseModal={() => setIsLicenseModalOpen(true)}
            />

            {/* Generated Plan Viewer */}
            {currentPlan && (
              <div id="generated-output-section" className="scroll-mt-6">
                <PlanViewer
                  plan={currentPlan}
                  onSavePlan={handleSavePlan}
                  isSaved={isCurrentPlanSaved}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <SavedPlans
            plans={savedPlans}
            onSelectPlan={(plan) => {
              setCurrentPlan(plan);
              setActiveTab('generator');
            }}
            onDeletePlan={handleDeletePlan}
            onClearAll={handleClearAll}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumBrowser />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-5 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-amber-400">VCGMEDIA</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-slate-300">Ghana Standard-Based Curriculum (NSBC) Learner Plan & Notes</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap justify-center sm:justify-end">
            <span>
              Developer:{' '}
              <button
                onClick={() => setIsDeveloperModalOpen(true)}
                className="text-yellow-400 hover:text-yellow-300 underline font-bold cursor-pointer transition"
                title="Click 'Victor' to open Admin Developer Access"
              >
                Victor
              </button>{' '}
              <strong className="text-slate-200 font-semibold">C. Gbetodeme</strong>
            </span>
            <span className="text-slate-700">•</span>
            <a
              href="tel:0243302919"
              className="text-yellow-300 hover:underline font-bold inline-flex items-center gap-1"
              title="Call Developer on 0243302919"
            >
              <Phone className="w-3 h-3 text-yellow-400" />
              <span>Developer Contact: 0243302919</span>
            </a>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsLicenseModalOpen(true)}
              className="text-amber-300 hover:underline font-bold"
            >
              Licensing Tiers
            </button>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500">NaCCA & MoE Ghana Aligned</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        activeLicense={activeLicense}
        onLicenseUpdated={refreshLicense}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
      />

      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        onVerified={() => {
          setIsDeveloperModalOpen(false);
          setIsLicenseGeneratorOpen(true);
        }}
      />

      <LicenseGeneratorModal
        isOpen={isLicenseGeneratorOpen}
        onClose={() => setIsLicenseGeneratorOpen(false)}
        onLicenseUpdated={refreshLicense}
      />

    </div>
  );
}
