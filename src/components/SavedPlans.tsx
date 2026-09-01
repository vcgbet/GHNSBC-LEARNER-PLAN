import React, { useState } from 'react';
import { FolderKanban, Trash2, Eye, Download, FileSpreadsheet, Calendar, BookOpen, Users, Search } from 'lucide-react';
import { LearnerPlanOutput } from '../types';
import { downloadDocx } from '../utils/docxExporter';
import { exportToPdf } from '../utils/pdfExporter';

interface SavedPlansProps {
  plans: LearnerPlanOutput[];
  onSelectPlan: (plan: LearnerPlanOutput) => void;
  onDeletePlan: (id: string) => void;
  onClearAll: () => void;
}

export const SavedPlans: React.FC<SavedPlansProps> = ({ plans, onSelectPlan, onDeletePlan, onClearAll }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = plans.filter(p => {
    const term = searchTerm.toLowerCase();
    return (
      p.header.subject.toLowerCase().includes(term) ||
      p.header.strand.toLowerCase().includes(term) ||
      p.header.subStrand.toLowerCase().includes(term) ||
      p.header.classLevel.toLowerCase().includes(term)
    );
  });

  return (
    <div id="saved-plans-container" className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-blue-300" />
            <span>Saved Learner Plans & Notes ({plans.length})</span>
          </h2>
          <p className="text-xs text-blue-200/90 mt-0.5">
            Access and export previously generated Ghana NSBC lesson plans offline anytime.
          </p>
        </div>

        {plans.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Saved</span>
          </button>
        )}
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search saved plans by subject, class, strand..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* List Content */}
      <div className="p-5">
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">No Saved Learner Plans Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm ? 'No plans match your current search query.' : 'Generations saved will appear here for instant offline access and export.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map(p => (
              <div
                key={p.id}
                className="bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-bold rounded-full">
                      {p.header.classLevel}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {p.header.subject}: {p.header.subStrand}
                  </h3>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Week Ending: {p.header.weekEnding}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Strand: {p.header.strand}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectPlan(p)}
                    className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => downloadDocx(p)}
                    className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-all"
                    title="Export DOCX"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-blue-700" />
                  </button>

                  <button
                    onClick={() => exportToPdf(p)}
                    className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-all"
                    title="Export PDF"
                  >
                    <Download className="w-4 h-4 text-red-600" />
                  </button>

                  <button
                    onClick={() => onDeletePlan(p.id)}
                    className="p-1.5 bg-slate-200 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-lg transition-all"
                    title="Delete Plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
