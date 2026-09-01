import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import { ExtractedSchemeDetails } from '../types';
import { parseSchemeText } from '../utils/schemeParser';

interface SchemeUploaderProps {
  onApplyExtracted: (details: ExtractedSchemeDetails) => void;
  onClose?: () => void;
}

export const SchemeUploader: React.FC<SchemeUploaderProps> = ({ onApplyExtracted, onClose }) => {
  const [pasteText, setPasteText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedSchemeDetails | null>(null);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Sample Scheme snippet for quick demonstration
  const handleLoadSample = () => {
    const sample = `GHANA EDUCATION SERVICE - TERM 1 SCHEME OF LEARNING
School: Adom Demonstration Basic School
Teacher: Victor C. Gbetodeme
Class: Basic 4 | Subject: Mathematics | Duration: 60 Mins
Week Ending: 24th October, 2026

Strand 1: Number
Sub-strand 1: Whole Numbers - Counting, Representation and Cardinality
Content Standard: B4.1.1.1 Demonstrate understanding of quantities and place value for numbers up to 100,000.
Indicator: B4.1.1.1.1 Model number quantities up to 100,000 using graph sheets, multi-base ten materials and place value charts.
TLMs / Teaching Resources: Place value charts, base-ten blocks, number cards, counters, graph sheets.`;

    setPasteText(sample);
    setFileName('Sample_Term1_Scheme.txt');
    setExtractError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setExtractError(null);
    setAppliedSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPasteText(content);
      }
    };
    reader.onerror = () => {
      setExtractError('Failed to read file. Please paste text directly into the text area.');
    };

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.csv') || file.name.endsWith('.json') || file.name.endsWith('.md')) {
      reader.readAsText(file);
    } else {
      // For binary files like docx/pdf where browser FileReader text mode gets raw bytes,
      // prompt the user or attempt text extraction
      reader.readAsText(file);
    }
  };

  const handleExtract = async () => {
    if (!pasteText.trim()) {
      setExtractError('Please paste text or upload a Scheme of Learning document first.');
      return;
    }

    setIsExtracting(true);
    setExtractError(null);
    setAppliedSuccess(false);

    try {
      // Try backend AI parser first
      const response = await fetch('/api/parse-scheme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeText: pasteText })
      });

      if (response.ok) {
        const data: ExtractedSchemeDetails = await response.json();
        setExtractedData(data);
      } else {
        // Fallback to client-side local parser
        const offlineData = parseSchemeText(pasteText);
        setExtractedData(offlineData);
      }
    } catch {
      // Offline fallback
      const offlineData = parseSchemeText(pasteText);
      setExtractedData(offlineData);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleApply = () => {
    if (extractedData) {
      onApplyExtracted(extractedData);
      setAppliedSuccess(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    }
  };

  return (
    <div id="scheme-uploader-box" className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-xl border border-blue-700/50 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-blue-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500 text-slate-950 rounded-xl shadow-md font-bold">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Scheme of Learning Extractor</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase">
                Smart AI & Offline
              </span>
            </h3>
            <p className="text-xs text-blue-200/90">
              Upload or paste your termly Scheme of Learning table to auto-extract Strand, Sub-strand, Indicator, & TLMs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs font-semibold bg-blue-800/80 hover:bg-blue-700 text-amber-300 px-3 py-1.5 rounded-lg border border-blue-600/60 transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Try Sample Scheme</span>
        </button>
      </div>

      {/* Upload and Paste Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* File Dropzone / Upload */}
        <div className="md:col-span-1 space-y-2">
          <label className="block text-xs font-semibold text-blue-200">
            Upload Scheme File (.txt, .doc, .pdf text, .csv)
          </label>
          <div className="relative border-2 border-dashed border-blue-500/50 hover:border-amber-400/80 rounded-xl p-4 text-center transition-all bg-blue-950/40 hover:bg-blue-950/70 group cursor-pointer">
            <input
              type="file"
              accept=".txt,.csv,.doc,.docx,.pdf,.json"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
              <FileText className="w-8 h-8 text-blue-300 group-hover:text-amber-300 transition-colors" />
              <span className="text-xs font-semibold text-blue-100 group-hover:text-white">
                {fileName ? fileName : 'Click to Upload or Drag File'}
              </span>
              <span className="text-[10px] text-blue-300/70">
                Supports TXT, CSV, DOCX text, PDF extracts
              </span>
            </div>
          </div>
        </div>

        {/* Textarea for Direct Copy-Pasting */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-blue-200">
              Or Paste Scheme Text / Table Row Below:
            </label>
            {pasteText && (
              <button
                type="button"
                onClick={() => { setPasteText(''); setFileName(null); setExtractedData(null); }}
                className="text-[11px] text-blue-300 hover:text-white underline"
              >
                Clear
              </button>
            )}
          </div>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows={4}
            placeholder="Paste your Scheme of Learning text here... e.g. Subject: Mathematics, Strand 1: Number, Sub-strand: Whole numbers, Content Standard: B4.1.1.1, Indicator: B4.1.1.1.1..."
            className="w-full text-xs p-3 rounded-xl bg-slate-950/80 border border-blue-700/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono resize-y"
          />
        </div>
      </div>

      {extractError && (
        <div className="flex items-center gap-2 p-2.5 bg-rose-950/80 border border-rose-500/60 text-rose-200 rounded-lg text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{extractError}</span>
        </div>
      )}

      {/* Extract Trigger Button */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-[11px] text-blue-300/80 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Extracts standard NaCCA codes (e.g. B4.1.1.1.1), Strands, TLMs & Week details automatically.</span>
        </div>

        <button
          type="button"
          id="btn-extract-scheme"
          onClick={handleExtract}
          disabled={isExtracting || !pasteText.trim()}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
            isExtracting || !pasteText.trim()
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 active:scale-95'
          }`}
        >
          {isExtracting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>Extracting Scheme Details...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Extract Scheme Details</span>
            </>
          )}
        </button>
      </div>

      {/* Extracted Details Preview Box */}
      {extractedData && (
        <div className="mt-4 p-4 bg-slate-950/90 rounded-xl border border-amber-500/40 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                Extracted Curriculum Details
              </h4>
            </div>
            <span className="text-[10px] text-slate-400">Review before applying</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">Subject:</span>
              <span className="font-semibold text-white">{extractedData.subject || 'Not detected'}</span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">Class Level:</span>
              <span className="font-semibold text-white">{extractedData.classLevel || 'Not detected'}</span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">Week Ending:</span>
              <span className="font-semibold text-white">{extractedData.weekEnding || 'Not detected'}</span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded border border-slate-800 lg:col-span-3">
              <span className="text-[10px] text-slate-400 block font-bold">Strand:</span>
              <span className="font-semibold text-blue-200">{extractedData.strand || 'Not detected'}</span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded border border-slate-800 lg:col-span-3">
              <span className="text-[10px] text-slate-400 block font-bold">Sub-strand:</span>
              <span className="font-semibold text-blue-200">{extractedData.subStrand || 'Not detected'}</span>
            </div>

            {extractedData.contentStandard && (
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 lg:col-span-3">
                <span className="text-[10px] text-slate-400 block font-bold">Content Standard:</span>
                <span className="font-mono text-emerald-300 font-semibold">{extractedData.contentStandard}</span>
              </div>
            )}

            {extractedData.indicator && (
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 lg:col-span-3">
                <span className="text-[10px] text-slate-400 block font-bold">Performance Indicator:</span>
                <span className="font-mono text-amber-300 font-semibold">{extractedData.indicator}</span>
              </div>
            )}

            {extractedData.teachingResources && extractedData.teachingResources.length > 0 && (
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 lg:col-span-3">
                <span className="text-[10px] text-slate-400 block font-bold">Teaching Resources (TLMs):</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {extractedData.teachingResources.map((tlm, idx) => (
                    <span key={idx} className="bg-blue-900/60 text-blue-200 border border-blue-700/50 px-2 py-0.5 rounded text-[11px]">
                      {tlm}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            {appliedSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully Applied to Form Fields!</span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400">
                Clicking apply will fill these details directly into your Lesson Plan form.
              </span>
            )}

            <button
              type="button"
              id="btn-apply-scheme"
              onClick={handleApply}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <span>Apply Details to Lesson Plan Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
