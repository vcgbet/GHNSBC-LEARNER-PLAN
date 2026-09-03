// Exam Paper + Scheme of Learning tabs (combined single-file build).
// Contains: exam generator, scheme generator, PDF exporters, and both tab
// components. Everything is offline/deterministic from preloaded NaCCA data.

import React, { useMemo, useState } from 'react';
import { FileText, Download, ClipboardList, ChevronDown, ChevronUp, AlertCircle, CalendarRange } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GHANA_CURRICULUM_DATA } from '../data/ghanaCurriculum';
import {
  ExamPaper, ExamObjectiveQuestion, ExamObjectiveAnswer, ExamTheoryQuestion, ExamTheoryAnswer,
  SchemeRow, SchemeTerm, GhanaCurriculumContentStandard, GhanaCurriculumIndicator
} from '../types';
import {
  escapeRegExp, splitSentences, ClozeSpan, findClozeSpan, numberDistractors,
  termDistractors, getTermDefinition, extractKeyTerms, deriveDefinitionFromText,
  isCircularDefinition
} from '../utils/offlineGenerator';
import { ALL_CLASS_LEVELS } from './FormInput';

interface SchemeInputs {
  subject: string;
  classLevel: string;
  term: string; // 'First Term' | 'Second Term' | 'Third Term'
  termStart: string; // ISO date (yyyy-mm-dd)
  schoolName: string;
  teacherName: string;
  headName: string;
}

interface IndicatorEntry {
  strand: string;
  subStrand: string;
  csCode: string;
  indCode: string;
  indDesc: string;
  tlms: string[];
}

const DEFAULT_TLMS = ['Charts and posters', 'Chalkboard / Whiteboard', 'Real-life physical objects (Realia)', 'Learner workbooks', 'Flashcards'];
const LESSON_DAYS = ['Monday', 'Wednesday', 'Friday'];
const LESSON_DAY_OFFSETS = [0, 2, 4]; // days after the term's Monday

const cleanDesc = (desc: string) =>
  (desc || '').replace(/^(Learners?\s+will\s+be\s+able\s+to|Learners?\s+can)\s*:?/i, '').trim();

// All indicators for the subject at the exact class level, in the official
// curriculum order (strand → sub-strand → content standard → indicator).
function indicatorsForLevel(subjectName: string, classLevel: string): IndicatorEntry[] {
  const subj = GHANA_CURRICULUM_DATA.find(s => s.name.toLowerCase() === (subjectName || '').toLowerCase());
  if (!subj) return [];
  const out: IndicatorEntry[] = [];
  for (const strand of subj.strands) {
    if (strand.levels && strand.levels.length > 0 && !strand.levels.includes(classLevel)) continue;
    for (const ss of strand.subStrands) {
      for (const cs of ss.contentStandards) {
        for (const ind of cs.indicators) {
          out.push({
            strand: strand.name,
            subStrand: ss.name,
            csCode: cs.code,
            indCode: ind.code,
            indDesc: ind.description,
            tlms: Array.isArray(ind.suggestedTLMs) && ind.suggestedTLMs.length > 0 ? ind.suggestedTLMs : DEFAULT_TLMS
          });
        }
      }
    }
  }
  return out;
}

// Monday of the week containing the given date.
function mondayOf(isoDate: string): Date {
  const d = new Date(isoDate + 'T00:00:00');
  if (isNaN(d.getTime())) return new Date('2026-09-14T00:00:00');
  const dow = d.getDay(); // 0 = Sunday
  const diff = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + diff);
  return d;
}

function fmtDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function schoolYearOf(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  const y = d.getFullYear();
  return d.getMonth() >= 7 ? `${y}/${y + 1}` : `${y - 1}/${y}`; // Ghana academic year runs Aug–Jul
}

export function generateScheme(rawInputs: SchemeInputs): SchemeTerm {
  const str = (v: unknown, fb: string) => (typeof v === 'string' && v.trim() !== '' ? v : fb);
  const inputs: SchemeInputs = {
    subject: str(rawInputs?.subject, 'Mathematics'),
    classLevel: str(rawInputs?.classLevel, 'Basic 8'),
    term: str(rawInputs?.term, 'First Term'),
    termStart: str(rawInputs?.termStart, '2026-09-14'),
    schoolName: str(rawInputs?.schoolName, 'Adom Basic School'),
    teacherName: str(rawInputs?.teacherName, 'Class Teacher'),
    headName: str(rawInputs?.headName, 'Head of School')
  };

  const pool = indicatorsForLevel(inputs.subject, inputs.classLevel);
  if (pool.length === 0) {
    throw new Error(`No curriculum data found for ${inputs.subject} at ${inputs.classLevel}. Please re-select.`);
  }

  const start = mondayOf(inputs.termStart);
  const rows: SchemeRow[] = [];
  let slot = 0;

  const pushRow = (row: Omit<SchemeRow, 'week' | 'date' | 'day'>) => {
    const week = Math.floor(slot / LESSON_DAYS.length) + 1;
    const dayIdx = slot % LESSON_DAYS.length;
    const d = new Date(start);
    d.setDate(d.getDate() + (week - 1) * 7 + LESSON_DAY_OFFSETS[dayIdx]);
    rows.push({
      week,
      date: fmtDate(d),
      day: LESSON_DAYS[dayIdx],
      ...row
    });
    slot++;
  };

  // One indicator per lesson, in official curriculum order.
  pool.forEach((e) => {
    pushRow({
      strand: e.strand,
      subStrand: e.subStrand,
      contentStandard: e.csCode,
      indicator: e.indCode,
      performanceIndicator: `Learner can: ${cleanDesc(e.indDesc).charAt(0).toLowerCase()}${cleanDesc(e.indDesc).slice(1)}`,
      tlms: e.tlms,
      type: 'lesson'
    });
  });

  // Closing: revision + end-of-term examination.
  const last = pool[pool.length - 1];
  pushRow({
    strand: last.strand,
    subStrand: last.subStrand,
    contentStandard: last.csCode,
    indicator: '—',
    performanceIndicator: `Revision and consolidation of ${last.subStrand.replace(/^(Sub-)?Strand\s+\d+\s*:?/i, '').trim()}`,
    tlms: last.tlms,
    type: 'revision'
  });
  pushRow({
    strand: last.strand,
    subStrand: last.subStrand,
    contentStandard: last.csCode,
    indicator: '—',
    performanceIndicator: `End of ${inputs.term} Examination: ${inputs.subject} (${inputs.classLevel})`,
    tlms: ['Past question papers', 'Answer sheets'],
    type: 'examination'
  });

  return {
    id: `scheme_${Date.now()}`,
    createdAt: new Date().toISOString(),
    meta: {
      schoolName: inputs.schoolName,
      subject: inputs.subject,
      classLevel: inputs.classLevel,
      term: `${inputs.term} ${schoolYearOf(inputs.termStart)}`,
      termStart: inputs.termStart,
      lessonsPerWeek: LESSON_DAYS.length,
      lessonDays: LESSON_DAYS,
      teacherName: inputs.teacherName,
      headName: inputs.headName,
      totalWeeks: rows.length > 0 ? rows[rows.length - 1].week : 0,
      totalLessons: rows.length
    },
    rows
  };
}


interface ExamInputs {
  subject: string;
  classLevel: string;
  strand: string;
  subStrand: string;
  indicatorCodes: string[];
  mcqCount: number;
  theoryCount: number;
  schoolName: string;
  examTitle: string;
  term: string;
  duration: string;
  teacherName?: string;
}

interface IndicatorContext {
  cs: GhanaCurriculumContentStandard;
  ind: GhanaCurriculumIndicator;
  topic: string;
  sentences: string[];
  terms: string[];
  exemplarText: string;
  siblings: string[]; // cleaned descriptions of sibling indicators
}

const cleanDescExam = (desc: string) =>
  (desc || '').replace(/^(Learners?\s+will\s+be\s+able\s+to|Learners?\s+can)\s*:?/i, '').trim();

const prettyTopic = (s: string) => {
  const c = (s || '').replace(/^(Sub-)?Strand\s+\d+\s*:?/i, '').trim();
  return c === c.toUpperCase() && !c.includes(' ') ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c;
};

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Deterministic option rotation (no Math.random — repeated generations stable).
function rotateOptions(correct: string, distractors: string[], seed: number): { options: { A: string; B: string; C: string; D: string }; letter: 'A' | 'B' | 'C' | 'D' } {
  const pool: string[] = [correct];
  for (const d of distractors) {
    if (pool.length >= 4) break;
    if (!pool.some(p => p.toLowerCase() === d.toLowerCase())) pool.push(d);
  }
  const pads = ['None of the above', 'All of the above', 'Not enough information', 'None of these'];
  let pi = 0;
  while (pool.length < 4 && pi < pads.length) pool.push(pads[pi++]);
  const all = pool.slice(0, 4);
  const shift = ((seed % all.length) + all.length) % all.length;
  const shuffled = all.slice(shift).concat(all.slice(0, shift));
  const letters = ['A', 'B', 'C', 'D'] as const;
  const idx = shuffled.indexOf(correct);
  return {
    options: { A: shuffled[0], B: shuffled[1], C: shuffled[2], D: shuffled[3] },
    letter: letters[idx]
  };
}

function buildIndicatorContext(inputs: ExamInputs, indCode: string): IndicatorContext | null {
  const subj = GHANA_CURRICULUM_DATA.find(
    s => s.name.toLowerCase() === (inputs.subject || '').toLowerCase()
  );
  if (!subj) return null;
  let matched: { cs: GhanaCurriculumContentStandard; ind: GhanaCurriculumIndicator } | null = null;
  for (const strand of subj.strands) {
    if (strand.levels && strand.levels.length > 0 && !strand.levels.includes(inputs.classLevel)) continue;
    for (const ss of strand.subStrands) {
      if (inputs.subStrand && !ss.name.toLowerCase().includes(inputs.subStrand.toLowerCase().replace(/^sub-?\s*strand\s*\d*\s*:?\s*/i, '').trim())) {
        // Loose containment on the meaningful part of the sub-strand name.
      }
      for (const cs of ss.contentStandards) {
        for (const ind of cs.indicators) {
          if (ind.code.toLowerCase() === indCode.toLowerCase()) matched = { cs, ind };
        }
      }
    }
  }
  if (!matched) return null;
  const { cs, ind } = matched;
  const topic = prettyTopic(inputs.subStrand) || prettyTopic(inputs.strand) || inputs.subject;
  const exemplarText = (ind.exemplars || []).map(e => (typeof e === 'string' ? e : '')).join(' ');
  const sentences = splitSentences(exemplarText);
  let terms = Array.isArray(ind.keyWords) && ind.keyWords.length > 0
    ? ind.keyWords
    : extractKeyTerms(inputs.subject, `${ind.description} ${exemplarText}`);
  terms = terms.filter(t => !isCircularDefinition(getTermDefinition(t, inputs.subject, topic, 0, exemplarText)));
  if (terms.length === 0) terms = ['Concept', 'Principle', 'Procedure', 'Application'];
  const siblings = cs.indicators.filter(i => i.code !== ind.code).map(i => cleanDescExam(i.description));
  return { cs, ind, topic, sentences, terms: terms.slice(0, 8), exemplarText, siblings };
}

interface PooledMCQ {
  question: string;
  correct: string;
  distractors: string[];
  explanation: string;
  indicatorCode: string;
}

// Quality-ordered question pool for one indicator:
// 1) clozes of official NaCCA exemplar sentences (real numbers / terms,
//    plausible numeric or sibling-term distractors)
// 2) definition MCQs (real dictionary/derived definitions as options)
// 3) fact MCQs (the indicator's own description vs sibling descriptions)
// 4) controlled generic fallback anchored to the topic
function buildQuestionPool(ctx: IndicatorContext, subject: string): PooledMCQ[] {
  const pool: PooledMCQ[] = [];
  const topic = ctx.topic;

  // 1) Exemplar clozes
  const clozes: ClozeSpan[] = [];
  const seen = new Set<string>();
  for (const s of ctx.sentences) {
    const c = findClozeSpan(s, ctx.terms);
    if (c && !seen.has(c.sentence)) {
      seen.add(c.sentence);
      clozes.push(c);
    }
  }
  clozes.slice(0, 10).forEach((c, i) => {
    const isNumeric = /^\d/.test(c.answer.replace(/,/g, ''));
    pool.push({
      question: `Complete the statement with the correct option: \u201C${c.blanked}\u201D`,
      correct: c.answer,
      distractors: isNumeric ? numberDistractors(c.answer) : termDistractors(c.answer, ctx.terms),
      explanation: `The official curriculum example reads: \u201C${c.sentence}\u201D`,
      indicatorCode: ctx.ind.code
    });
  });

  // 2) Definition MCQs — sibling-term definitions make strong distractors
  const defs = ctx.terms.map((t, i) => ({ term: t, def: getTermDefinition(t, subject, topic, i, ctx.exemplarText) }));
  const usableDefs = defs.filter(d => !isCircularDefinition(d.def));
  usableDefs.slice(0, 8).forEach((d, i) => {
    const others = usableDefs.filter(o => o.term.toLowerCase() !== d.term.toLowerCase() && o.def !== d.def).map(o => o.def);
    pool.push({
      question: `Which of the following best defines \u201C${d.term}\u201D as used in ${topic}?`,
      correct: d.def,
      distractors: others.slice(0, 3),
      explanation: `${d.term}: ${d.def}`,
      indicatorCode: ctx.ind.code
    });
  });

  // 3) Fact MCQs — description vs sibling descriptions
  const own = cleanDescExam(ctx.ind.description);
  if (own) {
    const wrongs = ctx.siblings.slice(0, 3).filter(s => s.toLowerCase() !== own.toLowerCase());
    const genericWrongs = [
      `Describe unrelated everyday activities without using ${topic} skills.`,
      `Memorize ${topic} facts without being able to apply them.`,
      `Repeat the definition of ${topic} without any practical work.`
    ];
    pool.push({
      question: `Which of the following best describes what learners should be able to do under \u201C${topic}\u201D?`,
      correct: own,
      distractors: [...wrongs, ...genericWrongs].slice(0, 3),
      explanation: `Curriculum indicator ${ctx.ind.code}: Learner can ${own.charAt(0).toLowerCase()}${own.slice(1)}.`,
      indicatorCode: ctx.ind.code
    });
  }

  // 4) Controlled generic fallback (topic-anchored, no filler)
  pool.push({
    question: `What is the first step learners should follow when working on a ${topic} task?`,
    correct: 'Read the task carefully, identify the given facts, and decide which rule or method applies.',
    distractors: [
      'Start writing the answer before reading the full question.',
      'Copy the example without understanding it.',
      'Leave the task for another learner to complete.'
    ],
    explanation: 'Systematic reading and method selection prevent errors in every subject task.',
    indicatorCode: ctx.ind.code
  });
  pool.push({
    question: `When checking a completed ${topic} solution, learners should:`,
    correct: 'Verify each step against the original question and confirm the final answer is reasonable.',
    distractors: [
      'Accept the first answer without checking.',
      'Change the answer only when a classmate disagrees.',
      'Skip verification to finish early.'
    ],
    explanation: 'Verification is the standard final step in step-by-step problem solving.',
    indicatorCode: ctx.ind.code
  });

  return pool;
}

function distributeQuota(n: number, total: number): number[] {
  if (n <= 0) return [];
  const base = Math.floor(total / n);
  let extra = total - base * n;
  return Array.from({ length: n }, (_, i) => base + (i < extra ? 1 : 0));
}

function buildObjective(ctxs: IndicatorContext[], subject: string, total: number): ExamObjectiveQuestion[] {
  const pools = ctxs.map(c => buildQuestionPool(c, subject));
  const quotas = distributeQuota(ctxs.length, total);
  const picked: { q: PooledMCQ; used: number }[] = ctxs.map((_, i) => ({ q: pools[i][0], used: 0 }));
  // Rebuild: track per-context pointer
  const ptr = ctxs.map(() => 0);
  const chosen: PooledMCQ[] = [];
  const quotaLeft = [...quotas];

  // Pass 1: fill each context's quota in pool order.
  for (let round = 0; round < Math.max(...quotas, 0); round++) {
    for (let ci = 0; ci < ctxs.length; ci++) {
      if (quotaLeft[ci] <= 0) continue;
      if (ptr[ci] < pools[ci].length) {
        chosen.push(pools[ci][ptr[ci]]);
        ptr[ci]++;
        quotaLeft[ci]--;
      }
    }
  }
  // Pass 2: if any pool ran dry, top up from the others (round-robin).
  if (chosen.length < total) {
    let ci = 0;
    let guard = 0;
    while (chosen.length < total && guard < 200) {
      const pool = pools[ci % pools.length];
      if (ptr[ci % pools.length] < pool.length) {
        chosen.push(pool[ptr[ci % pools.length]]);
        ptr[ci % pools.length]++;
      }
      ci++;
      guard++;
    }
  }
  // Safety: still short (e.g. a single indicator with a tiny pool) — duplicate with fresh stems.
  while (chosen.length < total && chosen.length > 0) {
    const src = chosen[chosen.length % chosen.length];
    chosen.push({ ...src, question: src.question + ' (Variant ' + (Math.floor(chosen.length / Math.max(1, chosen.length % chosen.length + 1)) + 1) + ')' });
  }

  return chosen.slice(0, total).map((q, i) => {
    const { options, letter } = rotateOptions(q.correct, q.distractors, i * 3 + 1);
    return {
      number: i + 1,
      question: q.question,
      options,
      marks: 1,
      indicatorCode: q.indicatorCode
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Theory section: structured questions with sub-parts, mark allocations and
// a full model-answer mark scheme, all drawn from the official curriculum
// content of the examined indicators.
// ─────────────────────────────────────────────────────────────────────────
interface TheoryTemplate {
  title: string;
  build: (ctx: IndicatorContext, subject: string) => {
    question: string;
    parts: { label: string; text: string; marks: number; answer: string }[];
  };
}

const THEORY_TEMPLATES: TheoryTemplate[] = [
  {
    title: 'Worked Example',
    build: (ctx) => {
      const ex = ctx.sentences[0] || `A worked example is presented on ${ctx.topic} using the official curriculum method.`;
      return {
        question: `Study the official curriculum example below and show all steps in your answer book:\n\u201C${ex}\u201D`,
        parts: [
          { label: '(a)', text: `State the rule or method being applied in the example.`, marks: 2, answer: `Learners state the method used (e.g. reading and writing numbers, applying the ${ctx.topic} procedure) — 1 mark for identifying the method, 1 mark for stating the rule accurately.` },
          { label: '(b)', text: 'Solve a similar NEW problem following exactly the same steps. Show all working.', marks: 3, answer: 'Full step-by-step working (2 marks) and correct final answer (1 mark), following the same procedure as the official example.' }
        ]
      };
    }
  },
  {
    title: 'Definitions',
    build: (ctx, subject) => {
      const t = ctx.terms.slice(0, 3);
      return {
        question: `Define the following terms as used in ${ctx.topic}:`,
        parts: [
          { label: '(a)', text: `${t[0]}`, marks: 1, answer: getTermDefinition(t[0], subject, ctx.topic, 0, ctx.exemplarText) },
          { label: '(b)', text: `${t[1] || t[0]}`, marks: 1, answer: getTermDefinition(t[1] || t[0], subject, ctx.topic, 1, ctx.exemplarText) },
          { label: '(c)', text: `${t[2] || t[0]} (explain in your own words with one example)`, marks: 2, answer: `Accurate definition (1 mark) plus one correct local example (1 mark). Accepted: ${getTermDefinition(t[2] || t[0], subject, ctx.topic, 2, ctx.exemplarText)}` }
        ]
      };
    }
  },
  {
    title: 'Application',
    build: (ctx) => ({
      question: `Create and solve a word problem based on: \u201CLearner can ${cleanDescExam(ctx.ind.description).toLowerCase()}\u201D. Set your problem in a realistic Ghanaian context (market, farming, school, transport, or household).`,
      parts: [
        { label: '(a)', text: 'Write the word problem (2 marks).', marks: 2, answer: 'A clear, solvable problem correctly involving the indicator content (1 mark for correct context, 1 mark for correct numbers/quantities).' },
        { label: '(b)', text: 'Solve your problem showing all steps (3 marks).', marks: 3, answer: 'Correct method with full working (2 marks) and correct final answer with units where needed (1 mark).' }
      ]
    })
  },
  {
    title: 'Explanation',
    build: (ctx) => ({
      question: `Answer the following questions on ${ctx.topic}:`,
      parts: [
        { label: '(a)', text: `State two key points a learner must master when studying ${ctx.topic}.`, marks: 2, answer: `Any two accurate points drawn from: ${cleanDescExam(ctx.ind.description)}. (1 mark each)` },
        { label: '(b)', text: `Explain how the concept of \u201C${ctx.terms[0]}\u201D is applied in solving ${ctx.topic} tasks.`, marks: 2, answer: `Correct explanation linking the term to the task (2 marks). Accepted: ${getTermDefinition(ctx.terms[0], 'subject', ctx.topic, 0, ctx.exemplarText)}` },
        { label: '(c)', text: 'Give one example of how this lesson is used in everyday Ghanaian life.', marks: 1, answer: 'Any realistic Ghanaian example (e.g. counting money at a market, measuring land, sharing farm produce) — 1 mark.' }
      ]
    })
  },
  {
    title: 'Analysis & Consolidation',
    build: (ctx) => ({
      question: `A classmate made a mistake while working on a task under \u201CLearner can ${cleanDescExam(ctx.ind.description).toLowerCase()}\u201D. Answer the following:`,
      parts: [
        { label: '(a)', text: 'State what the correct method or rule should be (2 marks).', marks: 2, answer: `Correct statement of the method/rule: ${cleanDescExam(ctx.ind.description)}. (2 marks)` },
        { label: '(b)', text: 'Show a correct worked example, step by step (3 marks).', marks: 3, answer: `Accurate step-by-step working (2 marks) and correct result (1 mark). Model: ${ctx.sentences[0] || 'follow the official curriculum example for this indicator.'}` },
        { label: '(c)', text: 'State one tip that helps avoid this kind of mistake (1 mark).', marks: 1, answer: 'Any valid tip (read carefully, show all working, verify the answer) — 1 mark.' }
      ]
    })
  }
];

function buildTheory(ctxs: IndicatorContext[], subject: string, total: number): { questions: ExamTheoryQuestion[]; answers: ExamTheoryAnswer[] } {
  const questions: ExamTheoryQuestion[] = [];
  const answers: ExamTheoryAnswer[] = [];
  for (let i = 0; i < total; i++) {
    const ctx = ctxs[i % ctxs.length];
    const template = THEORY_TEMPLATES[i % THEORY_TEMPLATES.length];
    const built = template.build(ctx, subject);
    const totalMarks = built.parts.reduce((s, p) => s + p.marks, 0);
    questions.push({
      number: i + 1,
      question: built.question,
      parts: built.parts.map(p => ({ label: p.label, text: p.text, marks: p.marks })),
      totalMarks,
      indicatorCode: ctx.ind.code
    });
    answers.push({
      number: i + 1,
      parts: built.parts.map(p => ({ label: p.label, answer: p.answer, marks: p.marks })),
      totalMarks
    });
  }
  return { questions, answers };
}

// ─────────────────────────────────────────────────────────────────────────
export function generateExam(rawInputs: ExamInputs): ExamPaper {
  const str = (v: unknown, fb: string) => (typeof v === 'string' && v.trim() !== '' ? v : fb);
  const num = (v: unknown, fb: number, lo: number, hi: number) => {
    const n = typeof v === 'number' && isFinite(v) ? Math.round(v) : fb;
    return Math.min(hi, Math.max(lo, n));
  };
  const inputs: ExamInputs = {
    subject: str(rawInputs?.subject, 'Mathematics'),
    classLevel: str(rawInputs?.classLevel, 'Basic 8'),
    strand: str(rawInputs?.strand, ''),
    subStrand: str(rawInputs?.subStrand, ''),
    indicatorCodes: Array.isArray(rawInputs?.indicatorCodes) ? rawInputs.indicatorCodes.filter(c => typeof c === 'string' && c) : [],
    mcqCount: num(rawInputs?.mcqCount, 40, 5, 50),
    theoryCount: num(rawInputs?.theoryCount, 5, 1, 10),
    schoolName: str(rawInputs?.schoolName, 'Adom Basic School'),
    examTitle: str(rawInputs?.examTitle, 'END OF TERM EXAMINATION'),
    term: str(rawInputs?.term, 'First Term'),
    duration: str(rawInputs?.duration, '1 Hour 30 Mins'),
    teacherName: str(rawInputs?.teacherName, '')
  };

  if (inputs.indicatorCodes.length === 0) {
    throw new Error('Select at least one indicator to examine.');
  }

  // Build contexts, dropping any indicator code not found in the data.
  const ctxs: IndicatorContext[] = [];
  for (const code of inputs.indicatorCodes) {
    const c = buildIndicatorContext(inputs, code);
    if (c) ctxs.push(c);
  }
  if (ctxs.length === 0) {
    throw new Error('The selected indicators were not found in the curriculum data. Please re-select.');
  }

  const objectiveQuestions = buildObjective(ctxs, inputs.subject, inputs.mcqCount);
  const { questions: theoryQuestions, answers: theoryAnswers } = buildTheory(ctxs, inputs.subject, inputs.theoryCount);

  // The option rotation is deterministic (index-based), so re-running the
  // identical selection + rotation yields the correct letter for every
  // numbered question.
  const answerMap = buildObjectiveAnswerMap(ctxs, inputs.subject, inputs.mcqCount);

  const objectiveMarks = objectiveQuestions.length;
  const theoryMarks = theoryQuestions.reduce((s, q) => s + q.totalMarks, 0);

  return {
    id: `exam_${Date.now()}`,
    createdAt: new Date().toISOString(),
    meta: {
      schoolName: inputs.schoolName,
      examTitle: inputs.examTitle,
      term: inputs.term,
      subject: inputs.subject,
      classLevel: inputs.classLevel,
      duration: inputs.duration,
      totalMarks: objectiveMarks + theoryMarks
    },
    instructions: [
      'Answer ALL questions in Section A and Section B.',
      'Section A: Choose the correct option from A, B, C or D and write it in the answer book. Each question carries ONE mark.',
      'Section B: Show all working steps clearly. Marks are allocated to each part.',
      `The examination lasts ${inputs.duration}.`,
      'Use a pencil for all rough work and diagrams.'
    ],
    objective: {
      sectionTitle: 'SECTION A: OBJECTIVE QUESTIONS',
      instruction: `Answer ALL questions. Each question carries 1 mark. (${objectiveMarks} marks)`,
      totalMarks: objectiveMarks,
      questions: objectiveQuestions
    },
    theory: {
      sectionTitle: 'SECTION B: THEORY',
      instruction: 'Answer ALL questions. Show all steps where required.',
      totalMarks: theoryMarks,
      questions: theoryQuestions
    },
    markScheme: {
      objectiveAnswers: answerMap,
      theoryAnswers: theoryAnswers
    },
    coverage: ctxs.map(c => c.ind.code)
  };
}

// Re-run the exact same selection + rotation used in buildObjective to know
// the correct letter for every numbered question (deterministic ⇒ identical).
function buildObjectiveAnswerMap(ctxs: IndicatorContext[], subject: string, total: number): ExamObjectiveAnswer[] {
  const pools = ctxs.map(c => buildQuestionPool(c, subject));
  const quotas = distributeQuota(ctxs.length, total);
  const ptr = ctxs.map(() => 0);
  const chosen: PooledMCQ[] = [];
  const quotaLeft = [...quotas];
  for (let round = 0; round < Math.max(...quotas, 0); round++) {
    for (let ci = 0; ci < ctxs.length; ci++) {
      if (quotaLeft[ci] <= 0) continue;
      if (ptr[ci] < pools[ci].length) {
        chosen.push(pools[ci][ptr[ci]]);
        ptr[ci]++;
        quotaLeft[ci]--;
      }
    }
  }
  if (chosen.length < total) {
    let ci = 0;
    let guard = 0;
    while (chosen.length < total && guard < 200) {
      const pool = pools[ci % pools.length];
      if (ptr[ci % pools.length] < pool.length) {
        chosen.push(pool[ptr[ci % pools.length]]);
        ptr[ci % pools.length]++;
      }
      ci++;
      guard++;
    }
  }
  while (chosen.length < total && chosen.length > 0) {
    const src = chosen[chosen.length % chosen.length];
    chosen.push({ ...src, question: src.question + ' (Variant ' + (Math.floor(chosen.length / Math.max(1, chosen.length % chosen.length + 1)) + 1) + ')' });
  }
  return chosen.slice(0, total).map((q, i) => {
    const { letter } = rotateOptions(q.correct, q.distractors, i * 3 + 1);
    return { number: i + 1, answer: letter, explanation: q.explanation };
  });
}


function applyAutoTable(doc: jsPDF, options: any) {
  try {
    if (typeof autoTable === 'function') {
      autoTable(doc, options);
    } else if (typeof (autoTable as any)?.default === 'function') {
      (autoTable as any).default(doc, options);
    } else if (typeof (doc as any).autoTable === 'function') {
      (doc as any).autoTable(options);
    }
  } catch (err) {
    console.error('autoTable plugin not available:', err);
  }
}

const EXAM_M = 12; // margin mm
const EXAM_PAGE_W = 210;
const PAGE_BOT = 282;

function newDoc(): jsPDF {
  return new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_BOT) {
    doc.addPage();
    return 16;
  }
  return y;
}

function writeWrapped(doc: jsPDF, y: number, text: string, x: number, maxW: number, size = 9, style: 'normal' | 'bold' | 'italic' = 'normal', gap = 4.2): number {
  doc.setFont('helvetica', style);
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, maxW);
  for (const line of lines) {
    y = ensureSpace(doc, y, size + 1);
    doc.text(line, x, y);
    y += gap;
  }
  return y;
}

function header(doc: jsPDF, paper: ExamPaper) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 58, 138);
  doc.text(paper.meta.schoolName.toUpperCase(), EXAM_PAGE_W / 2, 12, { align: 'center' });
  doc.setFontSize(9.5);
  doc.setTextColor(29, 78, 216);
  doc.text(`GHANA STANDARD-BASED CURRICULUM (NSBC) — ${paper.meta.examTitle}`, EXAM_PAGE_W / 2, 17, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6);
  doc.text(`Powered by VCGMEDIA • Developer: Victor C. Gbetodeme`, EXAM_PAGE_W / 2, 21, { align: 'center' });
  doc.setDrawColor(200, 200, 200);
  doc.line(EXAM_M, 24, EXAM_PAGE_W - EXAM_M, 24);
}

export function exportExamToPdf(paper: ExamPaper, includeMarkScheme = true) {
  const doc = newDoc();
  header(doc, paper);

  let y = 30;
  // Meta lines
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Subject: ${paper.meta.subject}`, EXAM_M, y);
  doc.text(`Class: ${paper.meta.classLevel}`, EXAM_M + 95, y);
  y += 5;
  doc.text(`Term: ${paper.meta.term}`, EXAM_M, y);
  doc.text(`Duration: ${paper.meta.duration}`, EXAM_M + 95, y);
  y += 5;
  doc.text(`Total Marks: ${paper.meta.totalMarks}`, EXAM_M, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Name: ______________________________', EXAM_M, y);
  doc.text('Candidate No: ______________', EXAM_M + 95, y);
  y += 8;

  // Instructions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('INSTRUCTIONS:', EXAM_M, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  paper.instructions.forEach((ins, i) => {
    y = writeWrapped(doc, y, `${i + 1}. ${ins}`, EXAM_M + 2, EXAM_PAGE_W - 2 * EXAM_M - 2, 8.5, 'normal', 4);
  });
  y += 4;

  // ── Section A ──
  y = ensureSpace(doc, y + 4, 12);
  doc.setFillColor(238, 242, 255);
  doc.rect(EXAM_M, y - 4.5, EXAM_PAGE_W - 2 * EXAM_M, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text(paper.objective.sectionTitle, EXAM_M + 2, y);
  y += 6;
  doc.setTextColor(30, 41, 59);
  y = writeWrapped(doc, y, paper.objective.instruction, EXAM_M, EXAM_PAGE_W - 2 * EXAM_M, 9, 'italic' as any, 4);
  y += 1;

  paper.objective.questions.forEach(q => {
    y = ensureSpace(doc, y, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const qLines = doc.splitTextToSize(`${q.number}. ${q.question}`, EXAM_PAGE_W - 2 * EXAM_M - 4);
    doc.text(qLines, EXAM_M + 2, y);
    y += qLines.length * 4.2 + 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const halfW = (EXAM_PAGE_W - 2 * EXAM_M - 8) / 2;
    doc.text(`A. ${q.options.A}`, EXAM_M + 4, y);
    doc.text(`B. ${q.options.B}`, EXAM_M + 4 + halfW, y);
    y += 4.4;
    doc.text(`C. ${q.options.C}`, EXAM_M + 4, y);
    doc.text(`D. ${q.options.D}`, EXAM_M + 4 + halfW, y);
    y += 5.6;
  });

  // ── Section B ──
  y = ensureSpace(doc, y + 4, 12);
  doc.setFillColor(238, 242, 255);
  doc.rect(EXAM_M, y - 4.5, EXAM_PAGE_W - 2 * EXAM_M, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text(paper.theory.sectionTitle, EXAM_M + 2, y);
  y += 6;
  doc.setTextColor(30, 41, 59);
  y = writeWrapped(doc, y, paper.theory.instruction, EXAM_M, EXAM_PAGE_W - 2 * EXAM_M, 9, 'italic' as any, 4);
  y += 1;

  paper.theory.questions.forEach(q => {
    y = ensureSpace(doc, y, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const qLines = doc.splitTextToSize(`${q.number}. ${q.question}`, EXAM_PAGE_W - 2 * EXAM_M - 16);
    doc.text(qLines, EXAM_M + 2, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`[${q.totalMarks} marks]`, EXAM_PAGE_W - EXAM_M - 2, y, { align: 'right' });
    y += qLines.length * 4.2 + 1;
    doc.setFontSize(8.5);
    q.parts.forEach(p => {
      const pLines = doc.splitTextToSize(`${p.label} ${p.text}`, EXAM_PAGE_W - 2 * EXAM_M - 18);
      doc.text(pLines, EXAM_M + 5, y);
      doc.text(`[${p.marks}]`, EXAM_PAGE_W - EXAM_M - 2, y, { align: 'right' });
      y += pLines.length * 4 + 2.5;
    });
    y += 2;
  });

  // ── Mark Scheme ──
  if (includeMarkScheme) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('MARK SCHEME / ANSWER KEY', EXAM_PAGE_W / 2, 14, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`${paper.meta.examTitle} — ${paper.meta.subject} (${paper.meta.classLevel}) — ${paper.meta.term}`, EXAM_PAGE_W / 2, 19, { align: 'center' });
    doc.setDrawColor(200, 200, 200);
    doc.line(EXAM_M, 22, EXAM_PAGE_W - EXAM_M, 22);

    applyAutoTable(doc, {
      startY: 26,
      head: [['Section A: Objective Questions', 'Answer', 'Key Point / Explanation']],
      body: paper.markScheme.objectiveAnswers.map(a => [
        String(a.number),
        a.answer,
        a.explanation || ''
      ]),
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [30, 58, 138], fontSize: 8.5 },
      columnStyles: {
        0: { cellWidth: 14 },
        1: { cellWidth: 14 },
        2: { cellWidth: 'auto' }
      }
    });

    let ty = (doc as any).lastAutoTable?.finalY ?? 30;
    ty += 8;
    applyAutoTable(doc, {
      startY: ty,
      head: [['Section B: Theory — Model Answers', 'Marks']],
      body: paper.markScheme.theoryAnswers.flatMap(a => [
        [`${a.number}. (Section B Question ${a.number})`, `${a.totalMarks}`],
        ...a.parts.map(p => [`${p.label} ${p.answer}`, `${p.marks}`])
      ]),
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [30, 58, 138], fontSize: 8.5 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 16 }
      }
    });
  }

  doc.save(`Exam_${paper.meta.subject.replace(/\s+/g, '_')}_${paper.meta.classLevel.replace(/\s+/g, '')}.pdf`);
}



const SCHEME_PAGE_W = 297; // A4 landscape
const SCHEME_M = 10;

export function exportSchemeToPdf(scheme: SchemeTerm) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 58, 138);
  doc.text(scheme.meta.schoolName.toUpperCase(), SCHEME_PAGE_W / 2, 12, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(29, 78, 216);
  doc.text('SCHEME OF LEARNING', SCHEME_PAGE_W / 2, 17, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6);
  doc.text('Powered by VCGMEDIA • Developer: Victor C. Gbetodeme', SCHEME_PAGE_W / 2, 21, { align: 'center' });
  doc.setDrawColor(200, 200, 200);
  doc.line(SCHEME_M, 23.5, SCHEME_PAGE_W - SCHEME_M, 23.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(
    `${scheme.meta.term}   |   Subject: ${scheme.meta.subject}   |   Class: ${scheme.meta.classLevel}   |   Lessons per week: ${scheme.meta.lessonsPerWeek} (${scheme.meta.lessonDays.join(', ')})   |   Teacher: ${scheme.meta.teacherName}   |   Head: ${scheme.meta.headName}`,
    SCHEME_PAGE_W / 2,
    28,
    { align: 'center' }
  );

  // Table body: a "WEEK n" banner row opens each week block.
  const body: string[][] = [];
  const bodyRowRef: number[] = []; // -1 = week banner, else index into scheme.rows
  let lastWeek = 0;
  scheme.rows.forEach((r, rowIdx) => {
    if (r.week !== lastWeek) {
      lastWeek = r.week;
      body.push([`WEEK ${r.week}`, '', '', '', '', '', '', '']);
      bodyRowRef.push(-1);
    }
    body.push([
      r.date,
      r.day,
      r.strand,
      r.subStrand,
      r.contentStandard,
      r.indicator,
      r.performanceIndicator,
      r.tlms.join(', ')
    ]);
    bodyRowRef.push(rowIdx);
  });

  applyAutoTable(doc, {
    startY: 32,
    head: [['Date', 'Day', 'Strand', 'Sub-Strand', 'Content Std.', 'Indicator', 'Performance Indicator (Learner can…)', 'Teaching & Learning Materials']],
    body,
    theme: 'grid',
    styles: { fontSize: 7.2, cellPadding: 1.4, valign: 'middle' },
    headStyles: { fillColor: [30, 58, 138], fontSize: 7.5, textColor: 255 },
    columnStyles: {
      0: { cellWidth: 17 },
      1: { cellWidth: 16 },
      2: { cellWidth: 34 },
      3: { cellWidth: 34 },
      4: { cellWidth: 19 },
      5: { cellWidth: 19 },
      6: { cellWidth: 96 },
      7: { cellWidth: 48 }
    },
    didParseCell: (data: any) => {
      if (data.section !== 'body') return;
      const ref = bodyRowRef[data.row.index];
      if (ref === -1) {
        data.cell.styles.fillColor = [219, 234, 254];
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.textColor = [30, 58, 138];
      } else {
        const row = scheme.rows[ref];
        if (row && row.type === 'examination') {
          data.cell.styles.textColor = [153, 27, 27];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    }
  });

  doc.save(`Scheme_${scheme.meta.subject.replace(/\s+/g, '_')}_${scheme.meta.classLevel.replace(/\s+/g, '')}.pdf`);
}


interface ExamGeneratorProps {}

const examSelectCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500';
const examLabelCls = 'block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1';

export const ExamGenerator: React.FC<ExamGeneratorProps> = () => {
  const [subject, setSubject] = useState('Mathematics');
  const [classLevel, setClassLevel] = useState('Basic 8');
  const [strand, setStrand] = useState('');
  const [subStrand, setSubStrand] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const [mcqCount, setMcqCount] = useState(40);
  const [theoryCount, setTheoryCount] = useState(5);
  const [schoolName, setSchoolName] = useState('Adom Basic School');
  const [examTitle, setExamTitle] = useState('END OF TERM EXAMINATION');
  const [term, setTerm] = useState('First Term');
  const [duration, setDuration] = useState('1 Hour 30 Mins');
  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMarkScheme, setShowMarkScheme] = useState(true);

  const subjectData = useMemo(() => GHANA_CURRICULUM_DATA.find(s => s.name === subject), [subject]);
  const levels = useMemo(
    () => (subjectData ? ALL_CLASS_LEVELS.filter(l => subjectData.levels.includes(l)) : ALL_CLASS_LEVELS),
    [subjectData]
  );
  const safeClass = levels.includes(classLevel) ? classLevel : (levels[0] || 'Basic 8');
  const strands = useMemo(
    () => (subjectData ? subjectData.strands.filter(st => !st.levels || st.levels.length === 0 || st.levels.includes(safeClass)) : []),
    [subjectData, safeClass]
  );
  const safeStrand = strands.some(s => s.name === strand) ? strand : (strands[0]?.name || '');
  const subStrands = useMemo(
    () => (strands.find(s => s.name === safeStrand)?.subStrands || []),
    [strands, safeStrand]
  );
  const safeSub = subStrands.some(s => s.name === subStrand) ? subStrand : (subStrands[0]?.name || '');
  const indicators = useMemo(
    () => (subStrands.find(s => s.name === safeSub)?.contentStandards || []).flatMap(cs => cs.indicators),
    [subStrands, safeSub]
  );
  const allCodes = indicators.map(i => i.code);
  const safeSelection = selectedIndicators.filter(c => allCodes.includes(c));
  const effectiveSelection = safeSelection.length > 0 || safeSelection.length === selectedIndicators.length
    ? safeSelection
    : allCodes; // pre-tick all by default

  const toggleIndicator = (code: string) => {
    const base = effectiveSelection.length === allCodes.length && effectiveSelection.includes(code) && selectedIndicators.length === 0
      ? allCodes
      : effectiveSelection;
    setSelectedIndicators(base.includes(code) ? base.filter(c => c !== code) : [...base, code]);
  };

  const handleGenerate = () => {
    setError(null);
    setPaper(null);
    try {
      const inputs: ExamInputs = {
        subject,
        classLevel: safeClass,
        strand: safeStrand,
        subStrand: safeSub,
        indicatorCodes: effectiveSelection,
        mcqCount,
        theoryCount,
        schoolName,
        examTitle,
        term,
        duration
      };
      setPaper(generateExam(inputs));
    } catch (e: any) {
      setError(e?.message || 'Failed to generate the examination.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-blue-700" />
          <h2 className="text-sm font-bold text-slate-800">End-of-Term Examination Generator</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={examLabelCls}>Subject</label>
            <select className={examSelectCls} value={subject} onChange={e => { setSubject(e.target.value); setStrand(''); setSubStrand(''); setSelectedIndicators([]); }}>
              {GHANA_CURRICULUM_DATA.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className={examLabelCls}>Class Level</label>
            <select className={examSelectCls} value={safeClass} onChange={e => { setClassLevel(e.target.value); setStrand(''); setSubStrand(''); setSelectedIndicators([]); }}>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={examLabelCls}>Strand</label>
            <select className={examSelectCls} value={safeStrand} onChange={e => { setStrand(e.target.value); setSubStrand(''); setSelectedIndicators([]); }}>
              {strands.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className={examLabelCls}>Sub-Strand</label>
            <select className={examSelectCls} value={safeSub} onChange={e => { setSubStrand(e.target.value); setSelectedIndicators([]); }}>
              {subStrands.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
        </div>

        {/* Indicator selection */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <label className={examLabelCls + ' mb-0'}>Indicators to Examine ({effectiveSelection.length}/{indicators.length} selected)</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSelectedIndicators(allCodes)} className="text-[10px] font-bold text-blue-700 hover:underline">Select all</button>
              <button type="button" onClick={() => setSelectedIndicators([])} className="text-[10px] font-bold text-slate-500 hover:underline">None</button>
            </div>
          </div>
          <div className="max-h-44 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {indicators.map(ind => {
              const checked = effectiveSelection.includes(ind.code);
              return (
                <label key={ind.code} className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer border text-[11px] leading-snug transition ${checked ? 'bg-blue-50 border-blue-300 text-slate-800' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleIndicator(ind.code)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span><span className="font-bold text-blue-800">{ind.code}</span> — {ind.description}</span>
                </label>
              );
            })}
            {indicators.length === 0 && <p className="text-[11px] text-slate-400">No indicators found for this selection.</p>}
          </div>
        </div>

        {/* Paper settings */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className={examLabelCls}>Objective Qs</label>
            <input type="number" min={5} max={50} value={mcqCount} onChange={e => setMcqCount(Number(e.target.value) || 30)} className={examSelectCls} />
          </div>
          <div>
            <label className={examLabelCls}>Theory Qs</label>
            <input type="number" min={1} max={10} value={theoryCount} onChange={e => setTheoryCount(Number(e.target.value) || 5)} className={examSelectCls} />
          </div>
          <div className="col-span-2">
            <label className={examLabelCls}>School Name</label>
            <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} className={examSelectCls} />
          </div>
          <div>
            <label className={examLabelCls}>Term</label>
            <select className={examSelectCls} value={term} onChange={e => setTerm(e.target.value)}>
              <option>First Term</option><option>Second Term</option><option>Third Term</option>
            </select>
          </div>
          <div>
            <label className={examLabelCls}>Duration</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className={examSelectCls} />
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <label className={examLabelCls}>Exam Title</label>
            <input type="text" value={examTitle} onChange={e => setExamTitle(e.target.value)} className={examSelectCls} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <FileText className="w-4 h-4" />
            Generate Examination
          </button>
          <span className="text-[10px] text-slate-400">Built from the official NaCCA curriculum data — instant, no AI required.</span>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Generated paper */}
      {paper && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <h3 className="text-xs font-bold text-slate-800">{paper.meta.examTitle} — {paper.meta.subject} ({paper.meta.classLevel})</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => exportExamToPdf(paper, false)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-900 transition">
                <Download className="w-3.5 h-3.5" /> Paper (PDF)
              </button>
              <button onClick={() => exportExamToPdf(paper, true)} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700 transition">
                <Download className="w-3.5 h-3.5" /> Paper + Mark Scheme (PDF)
              </button>
            </div>
          </div>

          <div className="px-6 py-5 text-slate-800">
            {/* Paper header */}
            <div className="text-center border-b border-slate-300 pb-3 mb-4">
              <p className="text-sm font-bold text-blue-900">{paper.meta.schoolName.toUpperCase()}</p>
              <p className="text-[11px] font-semibold text-blue-700 mt-0.5">GHANA STANDARD-BASED CURRICULUM (NSBC) — {paper.meta.examTitle}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[11px] font-semibold">
                <span>Subject: {paper.meta.subject}</span>
                <span>Class: {paper.meta.classLevel}</span>
                <span>Term: {paper.meta.term}</span>
                <span>Duration: {paper.meta.duration}</span>
                <span>Total Marks: {paper.meta.totalMarks}</span>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-x-8 text-[11px]">
                <span>Name: ______________________________</span>
                <span>Candidate No: ______________</span>
              </div>
            </div>

            {/* Instructions */}
            <ol className="mb-5 list-decimal list-inside space-y-0.5 text-[11px] text-slate-600">
              {paper.instructions.map((ins, i) => <li key={i}>{ins}</li>)}
            </ol>

            {/* Section A */}
            <div className="mb-5">
              <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-[12px] font-bold text-blue-900">{paper.objective.sectionTitle}</div>
              <p className="mt-1.5 text-[11px] italic text-slate-500">{paper.objective.instruction}</p>
              <div className="mt-3 space-y-3">
                {paper.objective.questions.map(q => (
                  <div key={q.number} className="text-[11.5px] leading-relaxed">
                    <p><span className="font-bold">{q.number}.</span> {q.question}</p>
                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 pl-4">
                      <span>A. {q.options.A}</span>
                      <span>B. {q.options.B}</span>
                      <span>C. {q.options.C}</span>
                      <span>D. {q.options.D}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B */}
            <div className="mb-5">
              <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-[12px] font-bold text-blue-900">{paper.theory.sectionTitle}</div>
              <p className="mt-1.5 text-[11px] italic text-slate-500">{paper.theory.instruction}</p>
              <div className="mt-3 space-y-4">
                {paper.theory.questions.map(q => (
                  <div key={q.number} className="text-[11.5px] leading-relaxed">
                    <div className="flex items-start justify-between gap-4">
                      <p><span className="font-bold">{q.number}.</span> <span className="whitespace-pre-line">{q.question}</span></p>
                      <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{q.totalMarks} marks</span>
                    </div>
                    <div className="mt-1 space-y-1 pl-4">
                      {q.parts.map(p => (
                        <p key={p.label}>{p.label} {p.text} <span className="text-[10px] text-slate-400">[{p.marks}]</span></p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mark scheme */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50">
              <button
                onClick={() => setShowMarkScheme(v => !v)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-[12px] font-bold text-amber-900"
              >
                <span>MARK SCHEME / ANSWER KEY</span>
                {showMarkScheme ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showMarkScheme && (
                <div className="border-t border-amber-200 px-4 py-3 space-y-4 text-[11px]">
                  <div>
                    <p className="mb-1.5 font-bold text-amber-900">Section A — Objective Answers</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                      {paper.markScheme.objectiveAnswers.map(a => (
                        <div key={a.number} className="rounded bg-white border border-amber-200 px-2 py-1 text-center" title={a.explanation || ''}>
                          <span className="font-bold text-slate-700">{a.number}.</span> <span className="font-bold text-blue-800">{a.answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-amber-900">Section B — Model Answers</p>
                    {paper.markScheme.theoryAnswers.map(a => (
                      <div key={a.number} className="rounded bg-white border border-amber-200 p-2.5">
                        <p className="font-bold text-slate-700 mb-1">Question {a.number} <span className="text-[10px] font-semibold text-slate-400">({a.totalMarks} marks)</span></p>
                        {a.parts.map(p => (
                          <p key={p.label} className="mb-1 text-slate-600"><span className="font-semibold text-slate-700">{p.label}</span> {p.answer} <span className="text-[10px] text-slate-400">[{p.marks}]</span></p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


interface SchemeGeneratorProps {}

const schemeSelectCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500';
const schemeLabelCls = 'block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1';

const TERM_START_DEFAULTS: Record<string, string> = {
  'First Term': '2026-09-14',
  'Second Term': '2027-01-04',
  'Third Term': '2027-04-19'
};

export const SchemeGenerator: React.FC<SchemeGeneratorProps> = () => {
  const [subject, setSubject] = useState('Mathematics');
  const [classLevel, setClassLevel] = useState('Basic 8');
  const [term, setTerm] = useState('First Term');
  const [termStart, setTermStart] = useState(TERM_START_DEFAULTS['First Term']);
  const [schoolName, setSchoolName] = useState('Adom Basic School');
  const [teacherName, setTeacherName] = useState('Class Teacher');
  const [headName, setHeadName] = useState('Head of School');
  const [scheme, setScheme] = useState<SchemeTerm | null>(null);
  const [error, setError] = useState<string | null>(null);

  const subjectData = useMemo(() => GHANA_CURRICULUM_DATA.find(s => s.name === subject), [subject]);
  const levels = useMemo(
    () => (subjectData ? ALL_CLASS_LEVELS.filter(l => subjectData.levels.includes(l)) : ALL_CLASS_LEVELS),
    [subjectData]
  );
  const safeClass = levels.includes(classLevel) ? classLevel : (levels[0] || 'Basic 8');

  const handleGenerate = () => {
    setError(null);
    setScheme(null);
    try {
      const inputs: SchemeInputs = { subject, classLevel: safeClass, term, termStart, schoolName, teacherName, headName };
      setScheme(generateScheme(inputs));
    } catch (e: any) {
      setError(e?.message || 'Failed to generate the scheme of learning.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CalendarRange className="w-5 h-5 text-blue-700" />
          <h2 className="text-sm font-bold text-slate-800">Scheme of Learning Generator</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className={schemeLabelCls}>Subject</label>
            <select className={schemeSelectCls} value={subject} onChange={e => { setSubject(e.target.value); setClassLevel(levels.includes(classLevel) ? classLevel : 'Basic 8'); }}>
              {GHANA_CURRICULUM_DATA.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className={schemeLabelCls}>Class Level</label>
            <select className={schemeSelectCls} value={safeClass} onChange={e => setClassLevel(e.target.value)}>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={schemeLabelCls}>Term</label>
            <select className={schemeSelectCls} value={term} onChange={e => { setTerm(e.target.value); setTermStart(TERM_START_DEFAULTS[e.target.value] || termStart); }}>
              <option>First Term</option><option>Second Term</option><option>Third Term</option>
            </select>
          </div>
          <div>
            <label className={schemeLabelCls}>Term Start (Monday)</label>
            <input type="date" value={termStart} onChange={e => setTermStart(e.target.value)} className={schemeSelectCls} />
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <label className={schemeLabelCls}>School Name</label>
            <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} className={schemeSelectCls} />
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <label className={schemeLabelCls}>Teacher</label>
            <input type="text" value={teacherName} onChange={e => setTeacherName(e.target.value)} className={schemeSelectCls} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={schemeLabelCls}>Head of School</label>
            <input type="text" value={headName} onChange={e => setHeadName(e.target.value)} className={schemeSelectCls} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <CalendarRange className="w-4 h-4" />
            Generate Scheme
          </button>
          <span className="text-[10px] text-slate-400">Follows the official NaCCA curriculum sequence — 3 lessons per week (Mon / Wed / Fri). Instant, no AI required.</span>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Generated scheme */}
      {scheme && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <CalendarRange className="w-4 h-4 text-blue-700" />
              <h3 className="text-xs font-bold text-slate-800">
                SCHEME OF LEARNING — {scheme.meta.term} • {scheme.meta.subject} • {scheme.meta.classLevel}
              </h3>
              <span className="text-[10px] text-slate-400">
                {scheme.meta.totalWeeks} weeks • {scheme.meta.totalLessons} lessons
              </span>
            </div>
            <button onClick={() => exportSchemeToPdf(scheme)} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700 transition">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-[11px]">
              <thead>
                <tr className="bg-blue-900 text-left text-white">
                  <th className="px-3 py-2 font-bold w-20">Date</th>
                  <th className="px-3 py-2 font-bold w-20">Day</th>
                  <th className="px-3 py-2 font-bold w-40">Strand</th>
                  <th className="px-3 py-2 font-bold w-44">Sub-Strand</th>
                  <th className="px-3 py-2 font-bold w-20">Content Std.</th>
                  <th className="px-3 py-2 font-bold w-20">Indicator</th>
                  <th className="px-3 py-2 font-bold">Performance Indicator (Learner can…)</th>
                  <th className="px-3 py-2 font-bold w-44">Teaching &amp; Learning Materials</th>
                </tr>
              </thead>
              <tbody>
                {scheme.rows.map((r, i) => (
                  <React.Fragment key={i}>
                    {(i === 0 || scheme.rows[i - 1].week !== r.week) && (
                      <tr className="bg-blue-100 text-blue-900 font-bold">
                        <td colSpan={8} className="px-3 py-1">WEEK {r.week}</td>
                      </tr>
                    )}
                    <tr className={`border-b border-slate-100 align-top ${r.type === 'examination' ? 'bg-red-50 text-red-800 font-semibold' : i % 2 ? 'bg-slate-50/60' : 'bg-white'}`}>
                      <td className="px-3 py-1.5 whitespace-nowrap">{r.date}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">{r.day}</td>
                      <td className="px-3 py-1.5">{r.strand}</td>
                      <td className="px-3 py-1.5">{r.subStrand}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">{r.contentStandard}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">{r.indicator}</td>
                      <td className="px-3 py-1.5">{r.performanceIndicator}</td>
                      <td className="px-3 py-1.5">{r.tlms.join(', ')}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-[10px] text-slate-500">
            <span>Teacher: {scheme.meta.teacherName}</span>
            <span>Head of School: {scheme.meta.headName}</span>
            <span>School: {scheme.meta.schoolName}</span>
            <span>Lessons per week: {scheme.meta.lessonsPerWeek} ({scheme.meta.lessonDays.join(', ')})</span>
          </div>
        </div>
      )}
    </div>
  );
};
