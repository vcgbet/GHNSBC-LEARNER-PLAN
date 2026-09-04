import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Copy, Check, Save, Sparkles, BookOpen, Layers, CheckSquare, Eye, EyeOff, Share2, Award, ArrowLeft, CheckCircle } from 'lucide-react';
import { LearnerPlanOutput, ExerciseFillInBlank, ExerciseMCQ, ExerciseMatchingPair, ExerciseApplication, ExerciseDiagram } from '../types';
import { DiagramVisual } from './DiagramVisual';
import { downloadDocx } from '../utils/docxExporter';
import { exportToPdf } from '../utils/pdfExporter';
import { sanitizePerformanceIndicator } from '../utils/formatUtils';
import { getNaCCACurriculumReference } from '../utils/naccaReferences';

interface PlanViewerProps {
  plan: LearnerPlanOutput;
  onSavePlan: (plan: LearnerPlanOutput) => void;
  isSaved: boolean;
  onBack?: () => void;
}

function filterByExerciseNumber<T extends { exerciseNumber?: number }>(arr: T[], exNum: number): T[] {
  const filtered = arr.filter(item => item.exerciseNumber === exNum);
  if (filtered.length > 0) return filtered;
  return exNum === 1 ? arr.slice(0, 5) : arr.slice(5, 10);
}

export const PlanViewer: React.FC<PlanViewerProps> = ({ plan, onSavePlan, isSaved, onBack }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'notes' | 'exercises'>('plan');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  const [selectedDayFilter, setSelectedDayFilter] = useState<number>(0); // 0 = All Days

  const { header, starter, mainPhase, plenaryReflection, rcaQuestions, learnerWritingNotes, exercises } = plan;

  const safeJoin = (arr: any, separator: string = ", ") => {
    if (!arr) return "";
    if (Array.isArray(arr)) return arr.join(separator);
    return String(arr);
  };

  const cleanActivityText = (text?: string) => {
    if (!text) return '';
    return text
      .replace(/^\[?Teacher:?\]?\s*/gi, '')
      .replace(/^\[?Learners?:?\]?\s*/gi, '')
      .replace(/\[Teacher\]/gi, '')
      .replace(/\[Learner\]/gi, '')
      .trim();
  };

  const renderStepActivities = (teacherText?: string, learnerText?: string) => {
    const t = cleanActivityText(teacherText);
    const l = cleanActivityText(learnerText);
    return (
      <div className="space-y-1.5 text-slate-800 leading-relaxed text-xs">
        {t && (
          <div>
            <span className="font-bold text-blue-900">Teacher:</span> {t}
          </div>
        )}
        {l && (
          <div>
            <span className="font-bold text-emerald-900">Learners:</span> {l}
          </div>
        )}
      </div>
    );
  };

  const getEffectiveDailyPlans = () => {
    if (plan.dailyPlans && plan.dailyPlans.length > 0) {
      return plan.dailyPlans;
    }
    const numDays = plan.header?.numberOfDays || 1;
    const days = [];
    for (let d = 1; d <= numDays; d++) {
      days.push({
        dayNumber: d,
        starter: starter || { duration: '10 Mins', teacherActivities: '', learnerActivities: '' },
        mainPhase: mainPhase || { duration: '40 Mins', step1Teacher: '', step1Learner: '', step2Teacher: '', step2Learner: '', step3Teacher: '', step3Learner: '', assessmentMethod: '' },
        plenaryReflection: plenaryReflection || { duration: '10 Mins', teacherSummary: '', learnerReflection: '' }
      });
    }
    return days;
  };

  const effectiveDailyPlans = getEffectiveDailyPlans();
  const displayedDailyPlans = selectedDayFilter === 0
    ? effectiveDailyPlans
    : effectiveDailyPlans.filter(d => d.dayNumber === selectedDayFilter);

  // Export DOCX
  const handleExportDocx = async () => {
    try {
      setIsExportingDocx(true);
      await downloadDocx(plan);
    } catch (err) {
      console.error("DOCX Export Error:", err);
      alert("Failed to export Word document. Please try again.");
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Export PDF
  const handleExportPdf = () => {
    try {
      setIsExportingPdf(true);
      exportToPdf(plan);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("Failed to export PDF document. Please try again.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Copy Notes
  const handleCopyNotes = () => {
    if (!learnerWritingNotes) return;
    let notesText = `${learnerWritingNotes.title || ''}\n\n`;
    notesText += `${learnerWritingNotes.introduction || ''}\n\n`;
    notesText += `A. KEY VOCABULARY & DEFINITIONS:\n`;
    (learnerWritingNotes.keyDefinitions || []).forEach(def => {
      notesText += `• ${def.term}: ${def.definition}\n`;
    });
    notesText += `\nB. LESSON NOTES:\n`;
    (learnerWritingNotes.mainContentPoints || []).forEach(pt => {
      notesText += `${pt.heading}\n${pt.body}\n`;
      pt.bulletPoints?.forEach(bp => {
        notesText += `  - ${bp}\n`;
      });
      notesText += `\n`;
    });
    notesText += `SUMMARY:\n${learnerWritingNotes.summary || ''}\n`;

    navigator.clipboard.writeText(notesText);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2500);
  };

  return (
    <div id="plan-viewer-container" className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-0">
      
      {/* Top Banner Toolbar */}
      <div id="viewer-toolbar" className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-4 text-white border-b border-blue-900/60">
        <div id="toolbar-flex" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Header Title Info */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                id="btn-back-to-list"
                className="p-1.5 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-lg transition-all"
                title="Back to Form"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold rounded-full uppercase">
                  {plan.generationMode} Mode
                </span>
                <span className="text-xs text-blue-200 font-semibold">{header?.classLevel} • {header?.subject}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {header?.subStrand || 'Learner Plan Overview'}
              </h2>
            </div>
          </div>

          {/* Action Export Buttons */}
          <div id="viewer-action-buttons" className="flex items-center gap-2 flex-wrap">
            
            {/* Save Plan */}
            <button
              onClick={() => onSavePlan(plan)}
              id="btn-save-plan"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isSaved
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to History' : 'Save Plan'}</span>
            </button>

            {/* Copy Notes */}
            <button
              onClick={handleCopyNotes}
              id="btn-copy-notes"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold rounded-lg transition-all"
            >
              {copiedNotes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-300" />}
              <span>{copiedNotes ? 'Notes Copied!' : 'Copy Notes'}</span>
            </button>

            {/* Export DOCX */}
            <button
              onClick={handleExportDocx}
              disabled={isExportingDocx}
              id="btn-export-docx"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-yellow-300" />
              <span>{isExportingDocx ? 'Building DOCX...' : 'Export Word (.docx)'}</span>
            </button>

            {/* Export PDF */}
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              id="btn-export-pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>{isExportingPdf ? 'Building PDF...' : 'Export PDF (.pdf)'}</span>
            </button>

          </div>

        </div>

        {/* Viewer Sub-Navigation Tabs */}
        <div id="viewer-tabs" className="flex items-center gap-2 mt-4 pt-3 border-t border-blue-900/60 overflow-x-auto">
          <button
            id="tab-btn-plan"
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-white text-blue-950 shadow-md'
                : 'bg-blue-950/60 text-blue-200 hover:bg-blue-900/50 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>1. NaCCA Learner Plan Table</span>
          </button>

          <button
            id="tab-btn-notes"
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-white text-blue-950 shadow-md'
                : 'bg-blue-950/60 text-blue-200 hover:bg-blue-900/50 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>2. Learner Writing Notes</span>
          </button>

          <button
            id="tab-btn-exercises"
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-white text-blue-950 shadow-md'
                : 'bg-blue-950/60 text-blue-200 hover:bg-blue-900/50 hover:text-white'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>3. Exercises & Worksheets</span>
          </button>
        </div>

      </div>

      {/* Main Content Render Area */}
      <div id="tab-content-area" className="p-5">
        
        {/* TAB 1: NaCCA Learner Plan Table */}
        {activeTab === 'plan' && (
          <div id="plan-tab-content" className="space-y-6">
            
            {/* Header NaCCA Table */}
            <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-sm bg-white">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white font-bold">
                    <th colSpan={4} className="px-4 py-3 text-xs tracking-wider uppercase border-b border-blue-950">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-extrabold text-sm tracking-wide">1. LESSON OVERVIEW & NACCA CURRICULUM HEADER</span>
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded shadow-2xs uppercase">
                          VCGMEDIA • Dev: Victor C. Gbetodeme
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800 w-1/5">Week Ending:</td>
                    <td className="px-3 py-2.5 text-slate-900 w-3/10 font-medium">{header?.weekEnding}</td>
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800 w-1/5">Class Level:</td>
                    <td className="px-3 py-2.5 text-slate-900 w-3/10 font-medium">{header?.classLevel}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Subject:</td>
                    <td className="px-3 py-2.5 text-slate-900">{header?.subject}</td>
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Class Size:</td>
                    <td className="px-3 py-2.5 text-slate-900">{header?.classSize} Learners</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Duration:</td>
                    <td className="px-3 py-2.5 text-slate-900">{header?.duration}</td>
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">No. of Lessons:</td>
                    <td className="px-3 py-2.5 text-slate-900">{header?.numberOfDays} {header?.numberOfDays === 1 ? 'Day' : 'Days'}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Lesson Days:</td>
                    <td className="px-3 py-2.5 text-blue-900 font-bold">
                      {header?.selectedDays && header.selectedDays.length > 0
                        ? header.selectedDays.join(', ')
                        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, header?.numberOfDays || 1).join(', ')}
                    </td>
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">References:</td>
                    <td className="px-3 py-2.5 text-slate-900 font-medium">
                      {(header?.references && header.references.trim() !== '' && !header.references.toLowerCase().includes('nacca standard curriculum guide'))
                        ? header.references
                        : getNaCCACurriculumReference(header?.subject || 'Mathematics', header?.classLevel || 'Basic 4', header?.strand, header?.subStrand, header?.indicator)}
                    </td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Strand:</td>
                    <td colSpan={3} className="px-3 py-2.5 text-slate-900 font-semibold">{header?.strand}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Sub-strand:</td>
                    <td colSpan={3} className="px-3 py-2.5 text-slate-900 font-semibold">{header?.subStrand}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Content Standard:</td>
                    <td className="px-3 py-2.5 text-slate-900 font-mono text-[11px]">{header?.contentStandard}</td>
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Indicator Code:</td>
                    <td className="px-3 py-2.5 text-slate-900 font-mono text-[11px]">{header?.indicator}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Performance Indicator(s):</td>
                    <td colSpan={3} className="px-3 py-2.5 text-blue-950 font-bold bg-blue-50/50 whitespace-pre-line leading-relaxed">{sanitizePerformanceIndicator(header?.performanceIndicator)}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Teaching Resources (TLMs):</td>
                    <td colSpan={3} className="px-3 py-2.5 text-slate-900">{safeJoin(header?.teachingResources, ', ')}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Core Competencies:</td>
                    <td colSpan={3} className="px-3 py-2.5 text-slate-900">
                      <div className="flex flex-wrap gap-1.5 py-0.5">
                        {(header?.coreCompetencies || []).map((comp, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-semibold rounded-md shadow-2xs"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Key Vocabulary:</td>
                    <td colSpan={3} className="px-3 py-2.5 text-slate-900 font-mono text-[11px]">{safeJoin(header?.keyWords, ', ')}</td>
                  </tr>
                  <tr className="divide-x divide-slate-200">
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Teacher's Name:</td>
                    <td className="px-3 py-2.5 text-slate-900">{header?.teacherName}</td>
                    <td className="px-3 py-2.5 bg-slate-100 font-bold text-slate-800">Headteacher / HOD:</td>
                    <td className="px-3 py-2.5 text-slate-900">{header?.nameOfHead}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Multi-Day Filter Sub-Bar */}
            {effectiveDailyPlans.length > 1 && (
              <div id="day-filter-bar" className="bg-blue-50/80 border border-blue-200 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    Lesson Plan Span: {effectiveDailyPlans.length} Days
                  </span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                    {selectedDayFilter === 0 ? 'Viewing All Days' : `Viewing Day ${selectedDayFilter}`}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDayFilter(0)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedDayFilter === 0
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                  >
                    All Days (1-{effectiveDailyPlans.length})
                  </button>
                  {effectiveDailyPlans.map(dp => (
                    <button
                      key={dp.dayNumber}
                      type="button"
                      onClick={() => setSelectedDayFilter(dp.dayNumber)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedDayFilter === dp.dayNumber
                          ? 'bg-blue-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      }`}
                    >
                      Day {dp.dayNumber}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Instructional Phases Tables per Day */}
            {displayedDailyPlans.map(dailyPlan => (
              <div key={dailyPlan.dayNumber} className="overflow-x-auto border border-slate-300 rounded-xl shadow-sm bg-white">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-900 text-white font-bold">
                      <th colSpan={3} className="px-4 py-3 text-xs tracking-wider uppercase border-b border-blue-950 flex items-center justify-between">
                        <span>
                          2. PEDAGOGICAL PHASES & INSTRUCTIONAL ACTIVITIES {effectiveDailyPlans.length > 1 ? `- DAY ${dailyPlan.dayNumber} OF ${effectiveDailyPlans.length}` : '(NaCCA STANDARD)'}
                        </span>
                        {effectiveDailyPlans.length > 1 && (
                          <span className="bg-yellow-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                            Day {dailyPlan.dayNumber}
                          </span>
                        )}
                      </th>
                    </tr>
                    <tr className="bg-slate-200 text-slate-800 font-bold divide-x divide-slate-300 text-[11px]">
                      <th className="px-3 py-2 w-1/5">PHASE & DURATION</th>
                      <th className="px-3 py-2 w-3/5">TEACHER & LEARNER ACTIVITIES</th>
                      <th className="px-3 py-2 w-1/5">RESOURCES & ASSESSMENT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    
                    {/* Phase 1 */}
                    <tr className="divide-x divide-slate-200 align-top">
                      <td className="px-3 py-3 bg-blue-50/80 font-bold text-blue-950">
                        <div className="text-xs uppercase font-extrabold text-blue-900">Phase 1: Starter</div>
                        <div className="text-[11px] text-blue-700 mt-1 font-semibold">Duration: {dailyPlan.starter?.duration || '10 Mins'}</div>
                      </td>
                      <td className="px-3 py-3 text-slate-900 space-y-2">
                        <div>
                          <span className="font-bold text-blue-900 uppercase text-[11px]">[Teacher Activities]</span>
                          <div className="text-slate-800 mt-0.5 whitespace-pre-line leading-relaxed">{dailyPlan.starter?.teacherActivities}</div>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                          <span className="font-bold text-emerald-900 uppercase text-[11px]">[Learner Activities]</span>
                          <div className="text-slate-800 mt-0.5 whitespace-pre-line leading-relaxed">{dailyPlan.starter?.learnerActivities}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 bg-slate-50 text-slate-700 font-medium">
                        <div className="font-bold text-slate-900 mb-1">Starter Assessment:</div>
                        <div>Diagnostic review & prior knowledge verification.</div>
                      </td>
                    </tr>

                    {/* Phase 2 */}
                    <tr className="divide-x divide-slate-200 align-top">
                      <td className="px-3 py-3 bg-blue-50/80 font-bold text-blue-950">
                        <div className="text-xs uppercase font-extrabold text-blue-900">Phase 2: Main Phase</div>
                        <div className="text-[11px] text-blue-700 mt-1 font-semibold">Duration: {dailyPlan.mainPhase?.duration || '40 Mins'}</div>
                      </td>
                      <td className="px-3 py-3 text-slate-900 space-y-3">
                        {/* Step 1 */}
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <div className="font-bold text-slate-900 text-xs mb-1">Step 1: Demonstration & Explanation</div>
                          {renderStepActivities(dailyPlan.mainPhase?.step1Teacher, dailyPlan.mainPhase?.step1Learner)}
                        </div>
                        {/* Step 2 */}
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <div className="font-bold text-slate-900 text-xs mb-1">Step 2: Collaborative Group Work</div>
                          {renderStepActivities(dailyPlan.mainPhase?.step2Teacher, dailyPlan.mainPhase?.step2Learner)}
                        </div>
                        {/* Step 3 */}
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <div className="font-bold text-slate-900 text-xs mb-1">Step 3: Independent Practice</div>
                          {renderStepActivities(dailyPlan.mainPhase?.step3Teacher, dailyPlan.mainPhase?.step3Learner)}
                        </div>
                      </td>
                      <td className="px-3 py-3 bg-slate-50 text-slate-700 font-medium space-y-3">
                        <div>
                          <span className="font-bold text-slate-900">Assessment Strategy:</span>
                          <p className="mt-1 text-slate-800 font-semibold">{dailyPlan.mainPhase?.assessmentMethod}</p>
                        </div>

                        {/* RCA Questions immediately after Assessment Method */}
                        {rcaQuestions && (
                          <div className="bg-blue-50/90 p-3 rounded-lg border border-blue-200 space-y-1.5 mt-2">
                            <div className="font-bold text-blue-950 text-xs uppercase flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                              <span>RCA Questions (Reflect, Connect & Apply)</span>
                            </div>
                            <div className="text-[11px] text-slate-800"><span className="font-bold text-blue-900">Reflect (R):</span> {rcaQuestions.reflect}</div>
                            <div className="text-[11px] text-slate-800"><span className="font-bold text-blue-900">Connect (C):</span> {rcaQuestions.connect}</div>
                            <div className="text-[11px] text-slate-800"><span className="font-bold text-blue-900">Apply (A):</span> {rcaQuestions.apply}</div>
                          </div>
                        )}
                      </td>
                    </tr>

                    {/* Phase 3 */}
                    <tr className="divide-x divide-slate-200 align-top">
                      <td className="px-3 py-3 bg-blue-50/80 font-bold text-blue-950">
                        <div className="text-xs uppercase font-extrabold text-blue-900">Phase 3: Plenary</div>
                        <div className="text-[11px] text-blue-700 mt-1 font-semibold">Duration: {dailyPlan.plenaryReflection?.duration || '10 Mins'}</div>
                      </td>
                      <td className="px-3 py-3 text-slate-900 space-y-2">
                        <div>
                          <span className="font-bold text-blue-900 uppercase text-[11px]">[Teacher Summary]</span>
                          <div className="text-slate-800 mt-0.5 whitespace-pre-line leading-relaxed">{dailyPlan.plenaryReflection?.teacherSummary}</div>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                          <span className="font-bold text-emerald-900 uppercase text-[11px]">[Learner Reflection]</span>
                          <div className="text-slate-800 mt-0.5 whitespace-pre-line leading-relaxed">{dailyPlan.plenaryReflection?.learnerReflection}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 bg-slate-50 text-slate-700 font-medium">
                        <div className="font-bold text-slate-900 mb-1">Closure & Reflection:</div>
                        <div>Learner self-assessment & summary check.</div>
                      </td>
                    </tr>

                  </tbody>
                </table>

                {/* Day Endorsement & Vetting */}
                <div className="bg-slate-100/90 border-t border-slate-300 p-3 text-xs font-medium text-slate-800">
                  <div className="font-bold text-blue-900 uppercase text-[11px] mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Endorsement (Vetting) - Day {dailyPlan.dayNumber} Lesson</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <span className="font-bold text-slate-900">Name of Head:</span>{' '}
                      <span className="font-bold text-blue-950">{header?.nameOfHead || '.......................................'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Signature:</span>{' '}
                      <span className="text-slate-500 font-mono">...........................................</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Date:</span>{' '}
                      <span className="text-slate-500 font-mono">...................</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Remarks / Feedback:</span>{' '}
                      <span className="text-slate-800 font-medium"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* TAB 2: Learner Writing Notes */}
        {activeTab === 'notes' && (
          <div id="notes-tab-content" className="max-w-4xl mx-auto space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="border-b border-slate-300 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-blue-950">{learnerWritingNotes?.title || 'Learner Notes'}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Ready for learners to write in their exercise workbooks.</p>
              </div>
              <button
                onClick={handleCopyNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                {copiedNotes ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNotes ? 'Copied' : 'Copy All Notes'}</span>
              </button>
            </div>

            {/* Introduction */}
            <div className="text-xs text-slate-700 italic bg-white p-3.5 rounded-xl border border-slate-200">
              {learnerWritingNotes?.introduction}
            </div>

            {/* Key Vocabulary */}
            {learnerWritingNotes?.keyDefinitions && learnerWritingNotes.keyDefinitions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">A. Key Vocabulary & Definitions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {learnerWritingNotes.keyDefinitions.map((def, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-blue-900">{def.term}: </span>
                      <span className="text-slate-700">{def.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Points */}
            {learnerWritingNotes?.mainContentPoints && learnerWritingNotes.mainContentPoints.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">B. Main Lesson Explanation</h4>
                {learnerWritingNotes.mainContentPoints.map((pt, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <h5 className="font-bold text-slate-900 text-sm">{pt.heading}</h5>
                    <p className="text-slate-700">{pt.body}</p>
                    {pt.bulletPoints && pt.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                        {pt.bulletPoints.map((bp, bidx) => (
                          <li key={bidx}>{bp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Summary Box */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
              <span className="font-bold text-amber-900">SUMMARY: </span>
              {learnerWritingNotes?.summary}
            </div>
          </div>
        )}

        {/* TAB 3: Exercises & Worksheets */}
        {activeTab === 'exercises' && (
          <div id="exercises-tab-content" className="space-y-6">
            
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Learner Assessment Worksheets (5-Tier Configuration)</h3>
                <p className="text-xs text-slate-500">Each Day contains 2 Exercises (5 Questions each) for FIBs, MCQs, Matching, Application, and Diagram/Visual tasks.</p>
              </div>

              {/* Toggle Teacher Answer Key */}
              <button
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                id="btn-toggle-answer-key"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  showAnswerKey
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {showAnswerKey ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showAnswerKey ? 'Answer Key Visible' : 'Show Answer Key'}</span>
              </button>
            </div>

            {/* Render Exercises by Day */}
            {(() => {
              const numDays = header?.numberOfDays || 1;
              const daysList = Array.from({ length: numDays }, (_, i) => i + 1);
              const daysToRender = selectedDayFilter === 0 ? daysList : [selectedDayFilter];

              return daysToRender.map(dayNum => {
                const dayFIBs: ExerciseFillInBlank[] = (exercises?.fillInBlanks || []).filter(f => (f.dayNumber || 1) === dayNum);
                const dayMCQs: ExerciseMCQ[] = (exercises?.mcqs || []).filter(m => (m.dayNumber || 1) === dayNum);
                const dayMatching: ExerciseMatchingPair[] = (exercises?.matching || []).filter(m => (m.dayNumber || 1) === dayNum);
                const dayApp: ExerciseApplication[] = (exercises?.application || []).filter(a => (a.dayNumber || 1) === dayNum);
                const dayDiag: ExerciseDiagram[] = (exercises?.diagram || []).filter(d => (d.dayNumber || 1) === dayNum);

                return (
                  <div key={dayNum} className="space-y-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-300 shadow-sm">
                    {/* Day Banner */}
                    <div className="flex items-center justify-between bg-blue-900 text-white px-4 py-2.5 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-extrabold tracking-wide uppercase">
                          DAY {dayNum} LEARNER EXERCISES
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-blue-200 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-700">
                        {header?.selectedDays?.[dayNum - 1] || `Day ${dayNum}`}
                      </span>
                    </div>

                    {/* SECTION A: Fill in Blanks */}
                    {dayFIBs.length > 0 && (
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                          <span>SECTION A: Fill in the Blanks</span>
                          <span className="text-[11px] font-semibold text-slate-500 lowercase">(2 exercises • 5 questions each)</span>
                        </h4>
                        
                        {[1, 2].map(exNum => {
                          const items = filterByExerciseNumber<ExerciseFillInBlank>(dayFIBs, exNum);
                          if (items.length === 0) return null;
                          return (
                            <div key={exNum} className="space-y-2 pt-1">
                              <div className="text-xs font-bold text-slate-900 bg-blue-50/70 px-3 py-1 rounded-md border border-blue-100">
                                Day {dayNum} • Exercise {exNum} (Fill in the blanks)
                              </div>
                              <div className="space-y-1.5 pl-2">
                                {items.map((fib, qIdx) => (
                                  <div key={fib.id || qIdx} className="text-xs text-slate-800 p-2 rounded-lg hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 last:border-0">
                                    <span><strong className="text-blue-950">{fib.questionNumber || qIdx + 1}.</strong> {fib.question}</span>
                                    {showAnswerKey && (
                                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 shrink-0">
                                        Answer: {fib.blankAnswer}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* SECTION B: Multiple Choice Questions */}
                    {dayMCQs.length > 0 && (
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                          <span>SECTION B: Multiple Choice Questions (MCQs)</span>
                          <span className="text-[11px] font-semibold text-slate-500 lowercase">(2 exercises • 5 questions each)</span>
                        </h4>

                        {[1, 2].map(exNum => {
                          const items = filterByExerciseNumber<ExerciseMCQ>(dayMCQs, exNum);
                          if (items.length === 0) return null;
                          return (
                            <div key={exNum} className="space-y-3 pt-1">
                              <div className="text-xs font-bold text-slate-900 bg-blue-50/70 px-3 py-1 rounded-md border border-blue-100">
                                Day {dayNum} • Exercise {exNum} (Multiple Choice)
                              </div>
                              <div className="grid grid-cols-1 gap-3 pl-1">
                                {items.map((mcq, qIdx) => (
                                  <div key={mcq.id || qIdx} className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 space-y-2 text-xs">
                                    <div className="font-bold text-slate-900">
                                      <span className="text-blue-950">{mcq.questionNumber || qIdx + 1}.</span> {mcq.question}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 pl-2">
                                      <div className={`p-1.5 rounded ${showAnswerKey && mcq.correctOption === 'A' ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300' : ''}`}>
                                        A) {mcq.options?.A}
                                      </div>
                                      <div className={`p-1.5 rounded ${showAnswerKey && mcq.correctOption === 'B' ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300' : ''}`}>
                                        B) {mcq.options?.B}
                                      </div>
                                      <div className={`p-1.5 rounded ${showAnswerKey && mcq.correctOption === 'C' ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300' : ''}`}>
                                        C) {mcq.options?.C}
                                      </div>
                                      <div className={`p-1.5 rounded ${showAnswerKey && mcq.correctOption === 'D' ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300' : ''}`}>
                                        D) {mcq.options?.D}
                                      </div>
                                    </div>
                                    {showAnswerKey && (
                                      <div className="mt-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                                        <span className="font-bold">Correct Option: {mcq.correctOption}</span>
                                        {mcq.explanation && <span> — {mcq.explanation}</span>}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* SECTION C: Matching Exercise Columns */}
                    {dayMatching.length > 0 && (
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                          <span>SECTION C: Matching Exercise Columns</span>
                          <span className="text-[11px] font-semibold text-slate-500 lowercase">(2 exercises • 5 pairs each)</span>
                        </h4>

                        {[1, 2].map(exNum => {
                          const items = filterByExerciseNumber<ExerciseMatchingPair>(dayMatching, exNum);
                          if (items.length === 0) return null;
                          return (
                            <div key={exNum} className="space-y-2 pt-1">
                              <div className="text-xs font-bold text-slate-900 bg-blue-50/70 px-3 py-1 rounded-md border border-blue-100">
                                Day {dayNum} • Exercise {exNum} (Match Column A with Column B)
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                                  <thead>
                                    <tr className="bg-slate-100 text-slate-800 font-bold">
                                      <th className="p-2 border border-slate-300 w-1/2">Column A (Item)</th>
                                      <th className="p-2 border border-slate-300 w-1/2">Column B (Match)</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200 font-medium">
                                    {items.map((m, qIdx) => (
                                      <tr key={m.id || qIdx} className="hover:bg-slate-50">
                                        <td className="p-2 border border-slate-300 text-slate-900 font-semibold">
                                          {m.questionNumber || qIdx + 1}. {m.itemA}
                                        </td>
                                        <td className="p-2 border border-slate-300 text-slate-700">
                                          [ &nbsp; ] {m.itemB}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              {showAnswerKey && (
                                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-xs text-emerald-950 space-y-1">
                                  <div className="font-bold text-emerald-900 text-[11px]">Exercise {exNum} Answer Key:</div>
                                  {items.map((m, qIdx) => (
                                    <div key={m.id || qIdx} className="text-[11px]">
                                      <span className="font-semibold">{m.itemA}</span> &rarr; <span className="font-bold text-emerald-700">{m.matchKey}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* SECTION D: Application Exercises */}
                    {dayApp.length > 0 && (
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                          <span>SECTION D: Application Exercises (Real-Life Ghanaian Context)</span>
                          <span className="text-[11px] font-semibold text-slate-500 lowercase">(2 exercises • 5 questions each)</span>
                        </h4>

                        {[1, 2].map(exNum => {
                          const items = filterByExerciseNumber<ExerciseApplication>(dayApp, exNum);
                          if (items.length === 0) return null;
                          return (
                            <div key={exNum} className="space-y-3 pt-1">
                              <div className="text-xs font-bold text-slate-900 bg-amber-50/80 px-3 py-1 rounded-md border border-amber-200 text-amber-950">
                                Day {dayNum} • Exercise {exNum} (Practical Problem-Solving & Application)
                              </div>
                              <div className="space-y-3 pl-1">
                                {items.map((app, qIdx) => (
                                  <div key={app.id || qIdx} className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200 space-y-2 text-xs">
                                    <div className="text-[11px] font-semibold text-slate-600 bg-white p-2 rounded-lg border border-slate-200 italic">
                                      <span className="font-bold text-slate-800 not-italic">Scenario / Context:</span> {app.scenarioOrContext}
                                    </div>
                                    <div className="font-bold text-slate-900 pt-1">
                                      <span className="text-blue-950">{app.questionNumber || qIdx + 1}.</span> {app.question}
                                    </div>
                                    {showAnswerKey && (
                                      <div className="mt-2 text-[11px] text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                                        <span className="font-bold text-emerald-950">Sample Answer / Marking Guide:</span> {app.sampleAnswer}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* SECTION E: Diagram & Visual Exercises */}
                    {dayDiag.length > 0 && (
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                          <span>SECTION E: Diagram & Visual Exercises (Pictures, Labeling, Tracing & Drawing)</span>
                          <span className="text-[11px] font-semibold text-slate-500 lowercase">(2 exercises • 5 tasks each)</span>
                        </h4>

                        {[1, 2].map(exNum => {
                          const items = filterByExerciseNumber<ExerciseDiagram>(dayDiag, exNum);
                          if (items.length === 0) return null;
                          return (
                            <div key={exNum} className="space-y-3 pt-1">
                              <div className="text-xs font-bold text-slate-900 bg-purple-50/80 px-3 py-1 rounded-md border border-purple-200 text-purple-950">
                                Day {dayNum} • Exercise {exNum} (Visual Tasks: Pictures, Tracing & Diagrams)
                              </div>
                              <div className="space-y-4 pl-1">
                                {items.map((diag, qIdx) => (
                                  <div key={diag.id || qIdx} className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                                      <span className="font-bold text-slate-900 text-xs">
                                        Task {diag.questionNumber || qIdx + 1}: {diag.diagramTitle}
                                      </span>
                                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-purple-900 rounded border border-purple-300">
                                        {diag.diagramCategory}
                                      </span>
                                    </div>
                                    <div className="text-slate-700 italic">{diag.diagramPrompt}</div>
                                    
                                    {/* Visual Diagram Box */}
                                    {diag.diagramSvg ? (
                                      <div className="bg-white rounded-lg border-2 border-slate-300 p-3 flex justify-center shadow-inner">
                                        <DiagramVisual svg={diag.diagramSvg} />
                                      </div>
                                    ) : (
                                      <div className="bg-slate-900 text-emerald-300 p-3.5 rounded-lg font-mono text-[11px] whitespace-pre overflow-x-auto border border-slate-800 shadow-inner">
                                        {diag.diagramAsciiOrDescription}
                                      </div>
                                    )}

                                    <div className="font-bold text-slate-900 pt-1">
                                      <span>Question: {diag.question}</span>
                                    </div>

                                    {showAnswerKey && (
                                      <div className="mt-1.5 text-[11px] text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                                        <span className="font-bold text-emerald-950">Expected Outcome / Solution:</span> {diag.expectedAnswer}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              });
            })()}

          </div>
        )}

      </div>

    </div>
  );
};
