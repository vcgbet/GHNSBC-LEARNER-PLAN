import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, BookOpen, Users, Clock, UserCheck, CheckSquare, Layers, FileText, Zap, RotateCcw, Phone } from 'lucide-react';
import { PlanFormInputs, ExtractedSchemeDetails } from '../types';
import { GHANA_CURRICULUM_DATA } from '../data/ghanaCurriculum';
import { NACCA_CORE_COMPETENCIES, getAutoCoreCompetencies } from '../utils/coreCompetencies';
import { SchemeUploader } from './SchemeUploader';
import { LicenseInfo, normalizeWeekEnding } from '../utils/licenseManager';
import { getNaCCACurriculumReference } from '../utils/naccaReferences';

export const ALL_CLASS_LEVELS = [
  'Nursery 1',
  'Nursery 2',
  'KG 1',
  'KG 2',
  'Basic 1',
  'Basic 2',
  'Basic 3',
  'Basic 4',
  'Basic 5',
  'Basic 6',
  'Basic 7',
  'Basic 8',
  'Basic 9'
];

interface FormInputProps {
  onSubmit: (inputs: PlanFormInputs, mode: 'AI' | 'Offline Engine') => void;
  isLoading: boolean;
  isOnline: boolean;
  activeLicense: LicenseInfo;
  onOpenLicenseModal?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({ onSubmit, isLoading, isOnline, activeLicense, onOpenLicenseModal }) => {
  const [inputs, setInputs] = useState<PlanFormInputs>({
    weekEnding: '16th October, 2026',
    selectedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    schoolName: 'Adom Basic School',
    teacherName: 'Kofi Mensah',
    classLevel: 'Basic 4',
    subject: 'Mathematics',
    strand: 'Strand 1: Number',
    subStrand: 'Sub-strand 1: Counting, Representation & Cardinality',
    contentStandard: 'B4.1.1.1',
    indicator: 'B4.1.1.1.1',
    classSize: 45,
    duration: '60 Mins',
    numberOfDays: 5,
    nameOfHead: 'Mr. Kwesi Mensah',
    references: getNaCCACurriculumReference('Mathematics', 'Basic 4', 'Strand 1: Number', 'Sub-strand 1: Counting, Representation & Cardinality', 'B4.1.1.1.1'),
    exerciseTypes: {
      fillInBlanks: true,
      mcq: true,
      matching: true,
      application: true,
      diagram: true,
    },
    additionalInstructions: ''
  });

  const [generationMode, setGenerationMode] = useState<'AI' | 'Offline Engine'>('Offline Engine');

  // Automatically switch to Offline Engine when offline
  useEffect(() => {
    if (!isOnline) {
      setGenerationMode('Offline Engine');
    }
  }, [isOnline]);

  const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>(() =>
    getAutoCoreCompetencies(inputs.subject, inputs.strand, inputs.subStrand)
  );

  // Synchronize Core Competencies whenever Subject/Strand changes
  useEffect(() => {
    const autoComps = getAutoCoreCompetencies(inputs.subject, inputs.strand, inputs.subStrand);
    setSelectedCompetencies(autoComps);
  }, [inputs.subject, inputs.strand, inputs.subStrand]);

  const toggleCompetency = (fullName: string) => {
    setSelectedCompetencies(prev =>
      prev.includes(fullName)
        ? prev.filter(c => c !== fullName)
        : [...prev, fullName]
    );
  };

  const handleResetCompetencies = () => {
    setSelectedCompetencies(getAutoCoreCompetencies(inputs.subject, inputs.strand, inputs.subStrand));
  };

  // Helper to extract grade prefix (e.g., 'B4', 'B7', 'KG1')
  const getLevelPrefix = (classLevel: string) => {
    const lvl = (classLevel || '').toLowerCase().trim();
    if (lvl.includes('7') || lvl.includes('jhs 1') || lvl.includes('jhs1')) return 'B7';
    if (lvl.includes('8') || lvl.includes('jhs 2') || lvl.includes('jhs2')) return 'B8';
    if (lvl.includes('9') || lvl.includes('jhs 3') || lvl.includes('jhs3')) return 'B9';
    if (lvl.includes('1') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b1'))) return 'B1';
    if (lvl.includes('2') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b2'))) return 'B2';
    if (lvl.includes('3') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b3'))) return 'B3';
    if (lvl.includes('4') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b4'))) return 'B4';
    if (lvl.includes('5') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b5'))) return 'B5';
    if (lvl.includes('6') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b6'))) return 'B6';
    if (lvl.includes('kg 1') || lvl.includes('kg1') || lvl.includes('kindergarten 1')) return 'KG1';
    if (lvl.includes('kg 2') || lvl.includes('kg2') || lvl.includes('kindergarten 2')) return 'KG2';
    if (lvl.includes('nursery 1') || lvl.includes('n1')) return 'N1';
    if (lvl.includes('nursery 2') || lvl.includes('n2')) return 'N2';
    return 'B4';
  };

  // Helper to get best matching content standard for a given class level
  const getBestCSForSubStrand = (subStrand: any, classLevel: string) => {
    if (!subStrand || !subStrand.contentStandards || subStrand.contentStandards.length === 0) return undefined;
    const prefix = getLevelPrefix(classLevel);
    const matching = subStrand.contentStandards.find((cs: any) => cs.code.toUpperCase().startsWith(prefix));
    return matching || subStrand.contentStandards[0];
  };

  // Available subjects and cascading curriculum data from database
  const selectedSubjectData = GHANA_CURRICULUM_DATA.find(s => 
    s.name.toLowerCase() === inputs.subject.toLowerCase() || 
    inputs.subject.toLowerCase().includes(s.name.toLowerCase()) || 
    s.name.toLowerCase().includes(inputs.subject.toLowerCase())
  ) || GHANA_CURRICULUM_DATA[0];
  
  const availableStrands = selectedSubjectData ? selectedSubjectData.strands : [];
  
  const selectedStrandData = availableStrands.find(s => 
    s.name.toLowerCase() === inputs.strand.toLowerCase() || 
    inputs.strand.toLowerCase().includes(s.name.toLowerCase()) || 
    s.name.toLowerCase().includes(inputs.strand.toLowerCase())
  ) || availableStrands[0];
  
  const availableSubStrands = selectedStrandData ? selectedStrandData.subStrands : [];
  
  const selectedSubStrandData = availableSubStrands.find(ss => 
    ss.name.toLowerCase() === inputs.subStrand.toLowerCase() || 
    inputs.subStrand.toLowerCase().includes(ss.name.toLowerCase()) || 
    ss.name.toLowerCase().includes(inputs.subStrand.toLowerCase())
  ) || availableSubStrands[0];
  
  const availableContentStandards = selectedSubStrandData ? selectedSubStrandData.contentStandards : [];
  
  const selectedCSData = availableContentStandards.find(cs => 
    inputs.contentStandard.toLowerCase().startsWith(cs.code.toLowerCase()) ||
    cs.code.toLowerCase() === inputs.contentStandard.toLowerCase() || 
    inputs.contentStandard.toLowerCase().includes(cs.code.toLowerCase())
  ) || getBestCSForSubStrand(selectedSubStrandData, inputs.classLevel) || availableContentStandards[0];
  
  const availableIndicators = selectedCSData ? selectedCSData.indicators : [];
  
  const selectedIndData = availableIndicators.find(ind => 
    inputs.indicator.toLowerCase().startsWith(ind.code.toLowerCase()) ||
    ind.code.toLowerCase() === inputs.indicator.toLowerCase() || 
    inputs.indicator.toLowerCase().includes(ind.code.toLowerCase())
  ) || availableIndicators[0];

  // Auto update cascades when subject changes
  const handleSubjectChange = (subjectName: string) => {
    const subjData = GHANA_CURRICULUM_DATA.find(s => s.name.toLowerCase() === subjectName.toLowerCase()) || GHANA_CURRICULUM_DATA[0];
    const firstStrand = subjData.strands[0];
    const firstSubStrand = firstStrand?.subStrands[0];
    const bestCS = getBestCSForSubStrand(firstSubStrand, inputs.classLevel);
    const firstInd = bestCS?.indicators[0];

    const autoRef = getNaCCACurriculumReference(
      subjectName,
      inputs.classLevel,
      firstStrand ? firstStrand.name : '',
      firstSubStrand ? firstSubStrand.name : '',
      firstInd ? firstInd.code : ''
    );

    setInputs(prev => ({
      ...prev,
      subject: subjectName,
      strand: firstStrand ? firstStrand.name : '',
      subStrand: firstSubStrand ? firstSubStrand.name : '',
      contentStandard: bestCS ? `${bestCS.code}: ${bestCS.description}` : '',
      indicator: firstInd ? `${firstInd.code}: ${firstInd.description}` : '',
      references: autoRef
    }));
  };

  const handleStrandChange = (strandName: string) => {
    const strData = availableStrands.find(s => s.name === strandName);
    const firstSubStrand = strData?.subStrands[0];
    const bestCS = getBestCSForSubStrand(firstSubStrand, inputs.classLevel);
    const firstInd = bestCS?.indicators[0];

    const autoRef = getNaCCACurriculumReference(
      inputs.subject,
      inputs.classLevel,
      strandName,
      firstSubStrand ? firstSubStrand.name : '',
      firstInd ? firstInd.code : ''
    );

    setInputs(prev => ({
      ...prev,
      strand: strandName,
      subStrand: firstSubStrand ? firstSubStrand.name : '',
      contentStandard: bestCS ? `${bestCS.code}: ${bestCS.description}` : '',
      indicator: firstInd ? `${firstInd.code}: ${firstInd.description}` : '',
      references: autoRef
    }));
  };

  const handleSubStrandChange = (subStrandName: string) => {
    const subStrData = availableSubStrands.find(ss => ss.name === subStrandName);
    const bestCS = getBestCSForSubStrand(subStrData, inputs.classLevel);
    const firstInd = bestCS?.indicators[0];

    const autoRef = getNaCCACurriculumReference(
      inputs.subject,
      inputs.classLevel,
      inputs.strand,
      subStrandName,
      firstInd ? firstInd.code : ''
    );

    setInputs(prev => ({
      ...prev,
      subStrand: subStrandName,
      contentStandard: bestCS ? `${bestCS.code}: ${bestCS.description}` : '',
      indicator: firstInd ? `${firstInd.code}: ${firstInd.description}` : '',
      references: autoRef
    }));
  };

  const handleCSChange = (csCode: string) => {
    const csData = availableContentStandards.find(cs => 
      cs.code.toLowerCase() === csCode.toLowerCase() || 
      csCode.toLowerCase().startsWith(cs.code.toLowerCase())
    );
    const firstInd = csData?.indicators[0];

    const autoRef = getNaCCACurriculumReference(
      inputs.subject,
      inputs.classLevel,
      inputs.strand,
      inputs.subStrand,
      firstInd ? firstInd.code : ''
    );

    setInputs(prev => ({
      ...prev,
      contentStandard: csData ? `${csData.code}: ${csData.description}` : csCode,
      indicator: firstInd ? `${firstInd.code}: ${firstInd.description}` : '',
      references: autoRef
    }));
  };

  const handleIndicatorChange = (indCode: string) => {
    let foundInd: any = null;
    let foundCS: any = null;
    if (selectedSubStrandData) {
      for (const cs of selectedSubStrandData.contentStandards) {
        for (const ind of cs.indicators) {
          if (ind.code.toLowerCase() === indCode.toLowerCase() || indCode.toLowerCase().startsWith(ind.code.toLowerCase())) {
            foundInd = ind;
            foundCS = cs;
            break;
          }
        }
        if (foundInd) break;
      }
    }
    const indData = foundInd || availableIndicators.find(ind => ind.code === indCode);
    const csData = foundCS || selectedCSData;

    const autoRef = getNaCCACurriculumReference(
      inputs.subject,
      inputs.classLevel,
      inputs.strand,
      inputs.subStrand,
      indData ? indData.code : indCode
    );

    setInputs(prev => ({
      ...prev,
      ...(csData ? { contentStandard: `${csData.code}: ${csData.description}` } : {}),
      indicator: indData ? `${indData.code}: ${indData.description}` : indCode,
      references: autoRef
    }));
  };

  const handleClassLevelChange = (newLevel: string) => {
    const bestCS = getBestCSForSubStrand(selectedSubStrandData, newLevel);
    const firstInd = bestCS?.indicators[0];
    const autoRef = getNaCCACurriculumReference(
      inputs.subject,
      newLevel,
      inputs.strand,
      inputs.subStrand,
      firstInd ? firstInd.code : ''
    );

    setInputs(prev => ({
      ...prev,
      classLevel: newLevel,
      ...(bestCS ? {
        contentStandard: `${bestCS.code}: ${bestCS.description}`,
        indicator: firstInd ? `${firstInd.code}: ${firstInd.description}` : prev.indicator
      } : {}),
      references: autoRef
    }));
  };

  const handleResetToSubjectPresets = () => {
    handleSubjectChange(inputs.subject);
  };

  // Sample Preset Loader
  const loadPreset = (presetType: 'math' | 'science' | 'english' | 'owop') => {
    if (presetType === 'math') {
      handleSubjectChange('Mathematics');
      setInputs(prev => ({
        ...prev,
        weekEnding: '23rd October, 2026',
        classLevel: 'Basic 4',
        classSize: 42,
        duration: '60 Mins',
        numberOfDays: 4,
        nameOfHead: 'Mrs. Abigail Osei',
        teacherName: 'Kofi Mensah'
      }));
    } else if (presetType === 'science') {
      handleSubjectChange('Science');
      setInputs(prev => ({
        ...prev,
        weekEnding: '30th October, 2026',
        classLevel: 'Basic 5',
        classSize: 48,
        duration: '60 Mins',
        numberOfDays: 3,
        nameOfHead: 'Mr. Emmanuel Darko',
        teacherName: 'Akosua Appiah'
      }));
    } else if (presetType === 'english') {
      handleSubjectChange('English Language');
      setInputs(prev => ({
        ...prev,
        weekEnding: '6th November, 2026',
        classLevel: 'Basic 4',
        classSize: 45,
        duration: '60 Mins',
        numberOfDays: 4,
        nameOfHead: 'Mr. Kwesi Mensah',
        teacherName: 'Grace Ansah'
      }));
    } else if (presetType === 'owop') {
      handleSubjectChange('Our World Our People (OWOP)');
      setInputs(prev => ({
        ...prev,
        weekEnding: '13th November, 2026',
        classLevel: 'Basic 4',
        classSize: 40,
        duration: '30 Mins',
        numberOfDays: 2,
        nameOfHead: 'Mr. Kwesi Mensah',
        teacherName: 'Kwame Boateng'
      }));
    }
  };

  const [showSchemeExtractor, setShowSchemeExtractor] = useState(false);

  const handleApplyExtracted = (extracted: ExtractedSchemeDetails) => {
    setInputs(prev => {
      const updated = { ...prev };
      if (extracted.subject) updated.subject = extracted.subject;
      if (extracted.classLevel) updated.classLevel = extracted.classLevel;
      if (extracted.strand) updated.strand = extracted.strand;
      if (extracted.subStrand) updated.subStrand = extracted.subStrand;
      if (extracted.contentStandard) updated.contentStandard = extracted.contentStandard;
      if (extracted.indicator) updated.indicator = extracted.indicator;
      if (extracted.weekEnding) updated.weekEnding = extracted.weekEnding;
      if (extracted.schoolName) updated.schoolName = extracted.schoolName;
      if (extracted.teacherName) updated.teacherName = extracted.teacherName;
      if (extracted.duration) updated.duration = extracted.duration;
      if (extracted.classSize) updated.classSize = extracted.classSize;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...inputs,
      coreCompetencies: selectedCompetencies
    }, generationMode);
  };

  return (
    <div id="form-container" className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      
      {/* Form Card Header */}
      <div id="form-header" className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 p-5 text-white">
        <div id="form-header-row" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="form-title" className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>Learner Plan & Notes Generator</span>
            </h2>
            <p id="form-subtitle" className="text-xs text-blue-200/90 mt-0.5">
              Enter Ghana NSBC details below to generate comprehensive lesson plans, student notes, and exercises.
            </p>
          </div>

          {/* Preset & Scheme Extractor Buttons */}
          <div id="presets-box" className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              id="btn-toggle-scheme-extractor"
              onClick={() => setShowSchemeExtractor(!showSchemeExtractor)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>{showSchemeExtractor ? 'Close Extractor' : 'Upload Scheme of Learning'}</span>
            </button>

            <span className="text-[11px] text-blue-300 font-medium ml-1 hidden lg:inline">Presets:</span>
            <button
              type="button"
              id="preset-math"
              onClick={() => loadPreset('math')}
              className="px-2 py-1 bg-blue-800/60 hover:bg-blue-700 text-blue-100 text-[11px] font-medium rounded-lg border border-blue-600/50 transition-all"
            >
              Maths B4
            </button>
            <button
              type="button"
              id="preset-science"
              onClick={() => loadPreset('science')}
              className="px-2 py-1 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-[11px] font-medium rounded-lg border border-emerald-600/50 transition-all"
            >
              Science B5
            </button>
            <button
              type="button"
              id="preset-english"
              onClick={() => loadPreset('english')}
              className="px-2 py-1 bg-amber-800/60 hover:bg-amber-700 text-amber-100 text-[11px] font-medium rounded-lg border border-amber-600/50 transition-all"
            >
              English B4
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Scheme of Learning Extractor Section */}
      {showSchemeExtractor && (
        <div className="p-4 bg-slate-900 border-b border-slate-800">
          <SchemeUploader
            onApplyExtracted={handleApplyExtracted}
            onClose={() => setShowSchemeExtractor(false)}
          />
        </div>
      )}

      <form id="plan-generator-form" onSubmit={handleSubmit} className="p-5 space-y-6">

        {/* Section 1: Lesson Administrative & Logistics Details */}
        <div id="section-admin-details" className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>1. Lesson Administrative Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Week Ending */}
            <div>
              <label htmlFor="weekEnding" className="block text-xs font-semibold text-slate-700 mb-1">
                Week Ending <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="weekEnding"
                  value={inputs.weekEnding}
                  onChange={e => setInputs({ ...inputs, weekEnding: e.target.value })}
                  placeholder="e.g. 16th October, 2026"
                  required
                  className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute right-2 top-2 flex items-center justify-center p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors cursor-pointer" title="Pick date from calendar">
                  <Calendar className="w-4 h-4 pointer-events-none" />
                  <input
                    type="date"
                    title="Choose Week Ending Date"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) return;
                      const [year, month, day] = val.split('-');
                      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      const dayNum = dateObj.getDate();
                      const getOrdinal = (n: number) => {
                        const s = ["th", "st", "nd", "rd"];
                        const v = n % 100;
                        return n + (s[(v - 20) % 10] || s[v] || s[0]);
                      };
                      const monthName = dateObj.toLocaleString('default', { month: 'long' });
                      const formatted = `${getOrdinal(dayNum)} ${monthName}, ${year}`;
                      setInputs({ ...inputs, weekEnding: formatted });
                    }}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* School Name */}
            <div>
              <label htmlFor="schoolName" className="block text-xs font-semibold text-slate-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                id="schoolName"
                value={inputs.schoolName}
                onChange={e => setInputs({ ...inputs, schoolName: e.target.value })}
                placeholder="e.g. Adom Basic School"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Class Level */}
            <div>
              <label htmlFor="classLevel" className="block text-xs font-semibold text-slate-700 mb-1">
                Class / Grade Level <span className="text-red-500">*</span>
              </label>
              <select
                id="classLevel"
                value={inputs.classLevel}
                onChange={e => handleClassLevelChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {ALL_CLASS_LEVELS.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Teacher's Name */}
            <div>
              <label htmlFor="teacherName" className="block text-xs font-semibold text-slate-700 mb-1">
                Teacher's Name
              </label>
              <input
                type="text"
                id="teacherName"
                value={inputs.teacherName}
                onChange={e => setInputs({ ...inputs, teacherName: e.target.value })}
                placeholder="e.g. Kofi Mensah"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Class Size */}
            <div>
              <label htmlFor="classSize" className="block text-xs font-semibold text-slate-700 mb-1">
                Class Size (Learners) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="classSize"
                  min="1"
                  max="200"
                  value={inputs.classSize}
                  onChange={e => setInputs({ ...inputs, classSize: parseInt(e.target.value) || 0 })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pl-8"
                />
                <Users className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-xs font-semibold text-slate-700 mb-1">
                Lesson Duration <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="duration"
                  value={inputs.duration}
                  onChange={e => setInputs({ ...inputs, duration: e.target.value })}
                  placeholder="e.g. 60 Mins"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pl-8"
                />
                <Clock className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Number of Days */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="numberOfDays" className="block text-xs font-semibold text-slate-700">
                  Number of Days / Lessons <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {inputs.numberOfDays} {inputs.numberOfDays === 1 ? 'day' : 'days'}
                </span>
              </div>
              <select
                id="numberOfDays"
                value={inputs.numberOfDays}
                onChange={e => {
                  const num = Math.max(1, Math.min(5, parseInt(e.target.value) || 1));
                  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                  setInputs({
                    ...inputs,
                    numberOfDays: num,
                    selectedDays: weekDays.slice(0, num)
                  });
                }}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'day' : 'days'} ({num === 1 ? '1 lesson note' : `${num} daily lesson notes`})
                  </option>
                ))}
              </select>
            </div>

            {/* Name of Head */}
            <div>
              <label htmlFor="nameOfHead" className="block text-xs font-semibold text-slate-700 mb-1">
                Name of Head (Headteacher / HOD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nameOfHead"
                  value={inputs.nameOfHead}
                  onChange={e => setInputs({ ...inputs, nameOfHead: e.target.value })}
                  placeholder="e.g. Mr. Kwesi Mensah"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pl-8"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* References */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="references" className="block text-xs font-semibold text-slate-700">
                  Curriculum References (NaCCA)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, inputs.strand, inputs.subStrand, inputs.indicator);
                    setInputs(prev => ({ ...prev, references: autoRef }));
                  }}
                  className="text-[10px] text-blue-700 hover:text-blue-900 font-semibold hover:underline flex items-center gap-1"
                  title="Fetch authentic NaCCA curriculum document page number"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Auto-fetch Page</span>
                </button>
              </div>
              <input
                type="text"
                id="references"
                value={inputs.references || ''}
                onChange={e => setInputs({ ...inputs, references: e.target.value })}
                placeholder="e.g. NaCCA Mathematics Curriculum (B1-B6), Pg. 165–168"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Days Checkboxes Selector */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Lesson Days (Check the days assigned for this weekly lesson note):
              </label>
              <div className="flex flex-wrap items-center gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                  const isChecked = (inputs.selectedDays || []).includes(day);
                  return (
                    <label key={day} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={e => {
                          const current = inputs.selectedDays || [];
                          let updated: string[];
                          if (e.target.checked) {
                            updated = [...current, day];
                          } else {
                            updated = current.filter(d => d !== day);
                          }
                          setInputs({
                            ...inputs,
                            selectedDays: updated,
                            numberOfDays: updated.length || 1
                          });
                        }}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span>{day}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Ghana Curriculum Specifics (Subject, Strand, Sub-strand, Indicator) */}
        <div id="section-curriculum-details" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>2. NaCCA Standard Curriculum Mapping & Teacher Custom Fields</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Select from standard NaCCA dropdown presets to auto-fill, or freely type/edit your custom curriculum text in the fields below.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                id="btn-resync-subject-presets"
                onClick={handleResetToSubjectPresets}
                className="text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
                title="Reset strand, sub-strand, CS and indicator to subject standard presets"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Re-sync Presets</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Subject Selector & Editable Input */}
            <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <label htmlFor="subject-select" className="block text-xs font-bold text-slate-800">
                  Subject <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Preset Dropdown
                </span>
              </div>
              <select
                id="subject-select"
                value={GHANA_CURRICULUM_DATA.some(s => s.name.toLowerCase() === inputs.subject.toLowerCase()) ? inputs.subject : ''}
                onChange={e => {
                  if (e.target.value) handleSubjectChange(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
              >
                <option value="">-- Choose Subject from NaCCA Catalog --</option>
                {GHANA_CURRICULUM_DATA.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
              
              <div className="pt-1">
                <label htmlFor="subject" className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  Teacher Editable Subject Text:
                </label>
                <input
                  type="text"
                  id="subject"
                  value={inputs.subject}
                  onChange={e => setInputs({ ...inputs, subject: e.target.value })}
                  placeholder="e.g. Mathematics"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Strand Selector & Editable Input */}
            <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <label htmlFor="strand-select" className="block text-xs font-bold text-slate-800">
                  Strand <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Preset Dropdown ({availableStrands.length} available)
                </span>
              </div>
              
              <select
                id="strand-select"
                value={availableStrands.some(s => s.name.toLowerCase() === inputs.strand.toLowerCase() || inputs.strand.includes(s.name) || s.name.includes(inputs.strand)) ? selectedStrandData?.name : ''}
                onChange={e => {
                  if (e.target.value) handleStrandChange(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
              >
                <option value="">-- Choose Preset Strand for {inputs.subject} --</option>
                {availableStrands.map(str => (
                  <option key={str.id} value={str.name}>{str.name}</option>
                ))}
              </select>

              <div className="pt-1">
                <label htmlFor="strand" className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  Teacher Editable Strand Text:
                </label>
                <input
                  type="text"
                  id="strand"
                  value={inputs.strand}
                  onChange={e => setInputs({ ...inputs, strand: e.target.value })}
                  placeholder="e.g. Strand 1: Number"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Sub-strand Selector & Editable Input */}
            <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-slate-200 md:col-span-2">
              <div className="flex items-center justify-between">
                <label htmlFor="sub-strand-select" className="block text-xs font-bold text-slate-800">
                  Sub-strand <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Preset Dropdown ({availableSubStrands.length} available)
                </span>
              </div>
              
              <select
                id="sub-strand-select"
                value={availableSubStrands.some(ss => ss.name.toLowerCase() === inputs.subStrand.toLowerCase() || inputs.subStrand.includes(ss.name) || ss.name.includes(inputs.subStrand)) ? selectedSubStrandData?.name : ''}
                onChange={e => {
                  if (e.target.value) handleSubStrandChange(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
              >
                <option value="">-- Choose Preset Sub-strand --</option>
                {availableSubStrands.map(ss => (
                  <option key={ss.id} value={ss.name}>{ss.name}</option>
                ))}
              </select>

              <div className="pt-1">
                <label htmlFor="subStrand" className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  Teacher Editable Sub-strand Text:
                </label>
                <input
                  type="text"
                  id="subStrand"
                  value={inputs.subStrand}
                  onChange={e => setInputs({ ...inputs, subStrand: e.target.value })}
                  placeholder="e.g. Sub-strand 1: Counting, Representation & Cardinality"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Content Standard (CS) */}
            <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <label htmlFor="cs-select" className="block text-xs font-bold text-slate-800">
                  Content Standard (CS) <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Preset Dropdown ({availableContentStandards.length} available)
                </span>
              </div>
              
              <select
                id="cs-select"
                value={availableContentStandards.some(cs => cs.code.toLowerCase() === inputs.contentStandard.toLowerCase() || inputs.contentStandard.includes(cs.code)) ? selectedCSData?.code : ''}
                onChange={e => {
                  if (e.target.value) handleCSChange(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
              >
                <option value="">-- Choose Preset Content Standard --</option>
                {availableContentStandards.map(cs => (
                  <option key={cs.code} value={cs.code}>
                    {cs.code}: {cs.description.length > 45 ? `${cs.description.substring(0, 45)}...` : cs.description}
                  </option>
                ))}
              </select>

              <div className="pt-1">
                <label htmlFor="contentStandard" className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  Teacher Editable Content Standard:
                </label>
                <input
                  type="text"
                  id="contentStandard"
                  value={inputs.contentStandard}
                  onChange={e => setInputs({ ...inputs, contentStandard: e.target.value })}
                  placeholder="e.g. B4.1.1.1: Demonstrate understanding of whole numbers..."
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <label htmlFor="indicator-select" className="block text-xs font-bold text-slate-800">
                  Performance Indicator <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Preset Dropdown ({availableIndicators.length} available)
                </span>
              </div>
              
              <select
                id="indicator-select"
                value={availableIndicators.some(ind => ind.code.toLowerCase() === inputs.indicator.toLowerCase() || inputs.indicator.includes(ind.code)) ? selectedIndData?.code : ''}
                onChange={e => {
                  if (e.target.value) handleIndicatorChange(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
              >
                <option value="">-- Choose Preset Indicator --</option>
                {availableIndicators.map(ind => (
                  <option key={ind.code} value={ind.code}>
                    {ind.code}: {ind.description.length > 45 ? `${ind.description.substring(0, 45)}...` : ind.description}
                  </option>
                ))}
              </select>

              <div className="pt-1">
                <label htmlFor="indicator" className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  Teacher Editable Performance Indicator:
                </label>
                <input
                  type="text"
                  id="indicator"
                  value={inputs.indicator}
                  onChange={e => setInputs({ ...inputs, indicator: e.target.value })}
                  placeholder="e.g. B4.1.1.1.1: Model number quantities..."
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

          </div>

          {/* Indicator Intelligence & Curriculum Target Display */}
          <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/70 p-3.5 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-2">
            <div className="flex items-start gap-2">
              <Layers className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-blue-900 text-xs">Active Indicator Target Description:</span>
                  {selectedIndData?.code && (
                    <span className="font-mono text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                      {selectedIndData.code}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 text-xs leading-relaxed">
                  {selectedIndData?.description || selectedCSData?.description || inputs.indicator || 'Demonstrate understanding of key curriculum concepts.'}
                </p>
              </div>
            </div>

            {selectedIndData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-blue-200/60">
                {selectedIndData.suggestedTLMs && selectedIndData.suggestedTLMs.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-blue-900 block mb-1">Suggested Teaching Resources (TLMs):</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedIndData.suggestedTLMs.map((tlm, idx) => (
                        <span key={idx} className="text-[10px] bg-white/90 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200 font-medium">
                          {tlm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedIndData.keyWords && selectedIndData.keyWords.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-blue-900 block mb-1">Key Curriculum Keywords:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedIndData.keyWords.map((kw, idx) => (
                        <span key={idx} className="text-[10px] bg-white/90 text-indigo-800 px-2 py-0.5 rounded-md border border-indigo-200 font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auto-Generated Core Competencies Section */}
          <div id="core-competencies-form-box" className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800">Auto-Generated NaCCA Core Competencies</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  {selectedCompetencies.length} Selected
                </span>
              </div>
              <button
                type="button"
                id="btn-reset-competencies"
                onClick={handleResetCompetencies}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                title="Reset competencies to subject defaults"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Auto</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              NaCCA Core Competencies are automatically mapped based on <strong className="text-slate-700">{inputs.subject}</strong>. Click any badge to toggle:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {NACCA_CORE_COMPETENCIES.map(comp => {
                const isSelected = selectedCompetencies.includes(comp.fullName);
                return (
                  <button
                    key={comp.code}
                    type="button"
                    onClick={() => toggleCompetency(comp.fullName)}
                    className={`flex items-start gap-2 p-2 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-400 text-blue-950 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {comp.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold truncate leading-tight">
                        {comp.name}
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {comp.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Exercise Selection & Instructions */}
        <div id="section-exercises-options" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <span>3. Learner Exercise Configurations (2 Exercises × 5 Questions per Day)</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
              5 Questions per Exercise Tier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            {/* 1. Fill in the Blanks */}
            <label htmlFor="chk-fillInBlanks" className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-all">
              <input
                type="checkbox"
                id="chk-fillInBlanks"
                checked={inputs.exerciseTypes.fillInBlanks}
                onChange={e => setInputs({
                  ...inputs,
                  exerciseTypes: { ...inputs.exerciseTypes, fillInBlanks: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">1. Fill in the Blanks</span>
                <span className="text-[11px] text-slate-500">2 Exercises per day (Ex 1: Q1-5, Ex 2: Q1-5)</span>
              </div>
            </label>

            {/* 2. MCQs */}
            <label htmlFor="chk-mcq" className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-all">
              <input
                type="checkbox"
                id="chk-mcq"
                checked={inputs.exerciseTypes.mcq}
                onChange={e => setInputs({
                  ...inputs,
                  exerciseTypes: { ...inputs.exerciseTypes, mcq: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">2. Multiple Choice (MCQs)</span>
                <span className="text-[11px] text-slate-500">2 Exercises per day (Ex 1: Q1-5, Ex 2: Q1-5)</span>
              </div>
            </label>

            {/* 3. Matching Column */}
            <label htmlFor="chk-matching" className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-all">
              <input
                type="checkbox"
                id="chk-matching"
                checked={inputs.exerciseTypes.matching}
                onChange={e => setInputs({
                  ...inputs,
                  exerciseTypes: { ...inputs.exerciseTypes, matching: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">3. Matching Columns</span>
                <span className="text-[11px] text-slate-500">2 Exercises per day (Ex 1: Q1-5, Ex 2: Q1-5)</span>
              </div>
            </label>

            {/* 4. Application Exercise */}
            <label htmlFor="chk-application" className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-all">
              <input
                type="checkbox"
                id="chk-application"
                checked={inputs.exerciseTypes.application}
                onChange={e => setInputs({
                  ...inputs,
                  exerciseTypes: { ...inputs.exerciseTypes, application: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">4. Application Exercise</span>
                <span className="text-[11px] text-slate-500">Real-life Ghanaian scenarios & problem-solving (2 Ex per day, 5 Qs each)</span>
              </div>
            </label>

            {/* 5. Diagram Exercise */}
            <label htmlFor="chk-diagram" className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-all sm:col-span-2">
              <input
                type="checkbox"
                id="chk-diagram"
                checked={inputs.exerciseTypes.diagram}
                onChange={e => setInputs({
                  ...inputs,
                  exerciseTypes: { ...inputs.exerciseTypes, diagram: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">5. Diagram & Visual Exercise (Pictures, Labeling & Tracing)</span>
                <span className="text-[11px] text-slate-500">Picture identification, labeling diagrams, shape & letter tracing (Nursery, KG & Basic 1–3) or subject diagrams (Basic 4–9) (2 Ex per day, 5 Qs each)</span>
              </div>
            </label>
          </div>

          <div>
            <label htmlFor="additionalInstructions" className="block text-xs font-semibold text-slate-700 mb-1">
              Additional Teacher Notes / Custom Focus (Optional)
            </label>
            <input
              type="text"
              id="additionalInstructions"
              value={inputs.additionalInstructions || ''}
              onChange={e => setInputs({ ...inputs, additionalInstructions: e.target.value })}
              placeholder="e.g. Include local market application examples, tracing dotted outlines, or emphasis on group work..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Section 4: Engine Mode Selection & Generate Action */}
        <div id="section-generate-controls" className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Engine Selector */}
          <div id="engine-selector" className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-300 w-full sm:w-auto">
            <button
              type="button"
              id="btn-mode-offline"
              onClick={() => setGenerationMode('Offline Engine')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                generationMode === 'Offline Engine'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Offline Generator (Instant)</span>
            </button>

            <button
              type="button"
              id="btn-mode-ai"
              disabled={!isOnline}
              onClick={() => isOnline && setGenerationMode('AI')}
              title={!isOnline ? 'AI generation requires an active internet connection. Offline Engine is active.' : 'Use Gemini AI'}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                generationMode === 'AI' && isOnline
                  ? 'bg-blue-600 text-white shadow-sm'
                  : !isOnline
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-65'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Gemini AI Engine {!isOnline && '(Offline)'}</span>
            </button>
          </div>

          {/* Submit Button & License Usage Indicator */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {(() => {
              const generatedWeeks = activeLicense?.generatedWeeks || [];
              const used = generatedWeeks.length;
              const max = activeLicense?.maxWeeks || (activeLicense?.tier === 'Premium License' ? 12 : activeLicense?.tier === 'Pro License' ? 6 : 1);
              const normInput = normalizeWeekEnding(inputs.weekEnding);
              const isCurrentWeekGenerated = generatedWeeks.includes(normInput) || (generatedWeeks.length === 1 && generatedWeeks[0] === 'default_week');
              const isLimitForNewWeek = used >= max && !isCurrentWeekGenerated;

              return (
                <div className="text-center sm:text-right text-[11px]">
                  {isLimitForNewWeek ? (
                    <div className="flex flex-col items-center sm:items-end">
                      <span
                        onClick={onOpenLicenseModal}
                        className="text-red-600 font-bold cursor-pointer hover:underline flex items-center gap-1 justify-center sm:justify-end"
                        title="License limit reached for new week ending dates. Click to upgrade license."
                      >
                        ⚠️ Limit Reached ({used}/{max} Week Ending dates) — Upgrade License
                      </span>
                      <span className="text-amber-700 font-bold text-[10px]">
                        Contact developer on <a href="tel:0243302919" className="text-blue-700 underline hover:text-blue-900">0243302919</a> for Activation Key
                      </span>
                    </div>
                  ) : isCurrentWeekGenerated ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 justify-center sm:justify-end">
                      ✓ Active Week ({inputs.weekEnding || '16th October, 2026'}) — Unlimited Re-generations
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium">
                      License: <strong className="text-slate-800">{activeLicense?.tier || 'Free Trial'}</strong> ({max - used} new week ending date(s) remaining)
                    </span>
                  )}
                </div>
              );
            })()}

            <button
              type="submit"
              id="btn-generate-plan"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-800 hover:to-indigo-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Plan & Notes...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-yellow-300" />
                  <span>Generate Learner Plan & Notes</span>
                </>
              )}
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};
