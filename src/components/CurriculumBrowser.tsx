import React, { useState } from 'react';
import { Compass, BookOpen, Layers, CheckCircle2, Search, ChevronRight, BookmarkCheck } from 'lucide-react';
import { GHANA_CURRICULUM_DATA } from '../data/ghanaCurriculum';

// Map a class level ("Basic 7", "KG 1", "Nursery 2", ...) to its code prefix
const levelToPrefix = (level: string): string | null => {
  const m = level.toLowerCase().match(/^basic\s+(\d)$/);
  if (m) return `B${m[1]}`;
  const kg = level.toLowerCase().match(/^kg\s*(\d)$/);
  if (kg) return `K${kg[1]}`;
  const n = level.toLowerCase().match(/^nursery\s*(\d)$/);
  if (n) return `N${n[1]}`;
  return null;
};

export const CurriculumBrowser: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(GHANA_CURRICULUM_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('All');

  const subject = GHANA_CURRICULUM_DATA.find(s => s.id === selectedSubjectId) || GHANA_CURRICULUM_DATA[0];

  // Ordered, de-duplicated levels offered as filter chips for this subject
  const levelOptions: string[] = [];
  for (const lvl of subject.levels) {
    if (!levelOptions.includes(lvl)) levelOptions.push(lvl);
  }
  const effectiveLevel = levelOptions.includes(levelFilter) ? levelFilter : 'All';

  // Apply the level filter: strands with an explicit `levels` tag show only
  // for their level(s); untagged (primary) strands get their content
  // standards filtered by the level's code prefix.
  const prefix = effectiveLevel === 'All' ? null : levelToPrefix(effectiveLevel);
  const visibleStrands = subject.strands
    .map(strand => {
      if (strand.levels && strand.levels.length > 0) {
        return effectiveLevel === 'All' || strand.levels.includes(effectiveLevel) ? strand : null;
      }
      if (!prefix) return strand;
      const filtered = {
        ...strand,
        subStrands: strand.subStrands
          .map(ss => ({
            ...ss,
            contentStandards: ss.contentStandards.filter(cs => cs.code.toUpperCase().startsWith(prefix))
          }))
          .filter(ss => ss.contentStandards.length > 0)
      };
      return filtered.subStrands.length > 0 ? filtered : null;
    })
    .filter(s => s !== null);

  return (
    <div id="curriculum-browser-container" className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-0">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 p-5 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-400" />
          <span>Ghana NSBC Syllabus Reference Guide</span>
        </h2>
        <p className="text-xs text-blue-200/90 mt-0.5">
          Browse official NaCCA strands, sub-strands, content standards, indicators, and recommended TLMs offline.
        </p>
      </div>

      {/* Subject Tabs */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 overflow-x-auto flex items-center gap-2">
        {GHANA_CURRICULUM_DATA.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSubjectId(s.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSubjectId === s.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Main Syllabus Content */}
      <div className="p-5 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">{subject.name} Syllabus Framework</h3>
            <p className="text-xs text-slate-500">Applicable for: {subject.levels.join(', ')}</p>
          </div>

          {/* Class-level filter (JHS strand entries are per-level) */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {['All', ...levelOptions].map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                  effectiveLevel === lvl
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {visibleStrands.length === 0 && (
            <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-4">
              No syllabus content for {effectiveLevel} in this subject.
            </p>
          )}
          {visibleStrands.map(strand => (
            <div key={strand.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4">
              <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2 border-b border-slate-200 pb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>{strand.name}</span>
              </h4>

              <div className="space-y-4 pl-2">
                {strand.subStrands.map(ss => (
                  <div key={ss.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{ss.name}</span>
                    </h5>

                    <div className="space-y-3 pl-3">
                      {ss.contentStandards.map(cs => (
                        <div key={cs.code} className="space-y-2 border-l-2 border-blue-500 pl-3">
                          <div className="text-xs">
                            <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              Content Standard: {cs.code}
                            </span>
                            <p className="text-slate-700 mt-1 font-medium">{cs.description}</p>
                          </div>

                          {/* Indicators */}
                          <div className="space-y-2 pt-1">
                            {cs.indicators.map(ind => (
                              <div key={ind.code} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>Indicator {ind.code}: {ind.description}</span>
                                </div>

                                {ind.exemplars && ind.exemplars.length > 0 && (
                                  <div className="text-[11px] text-slate-600 pl-5">
                                    <span className="font-semibold text-slate-800">Exemplars:</span>
                                    <ul className="list-disc list-inside space-y-0.5">
                                      {ind.exemplars.map((ex, exi) => (
                                        <li key={exi}>{ex}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {ind.suggestedTLMs && (
                                  <div className="text-[11px] text-blue-900 bg-blue-50/60 p-2 rounded border border-blue-100 flex items-center gap-1">
                                    <span className="font-bold">Suggested TLMs:</span> {ind.suggestedTLMs.join(', ')}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
