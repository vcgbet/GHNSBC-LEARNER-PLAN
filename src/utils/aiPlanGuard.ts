import { LearnerPlanOutput } from '../types';

// ─────────────────────────────────────────────────────────────────────────
// AI output guard.
// LLM generation can occasionally (a) degenerate into a repetition loop in
// one field ("…fine format fine format fine format…", sometimes regurgitating
// prompt fragments) or (b) run out of budget and skip whole exercise
// sections on later days. Both make the exported PDF unusable.
//
// This module (1) scrubs degenerated text fields back to clean, generic
// content, and (2) backfills any missing day/exercise slots from the
// deterministic offline engine (same indicator → same day structure), so a
// complete, readable plan is always delivered.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Detects LLM repetition loops in a string:
 *  - an exact 4-word phrase repeated 8+ times anywhere, or
 *  - any 80-word window whose 4-word-phrase diversity is very low.
 * Legitimate lesson prose repeats single terms ("place value") but never
 * whole 4-word phrases at this density, so false positives are unlikely.
 */
export function isDegenerateText(s: string): boolean {
  if (!s || s.length < 100) return false;
  const words = s
    .toLowerCase()
    .replace(/[^a-z0-9\s'’-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length < 25) return false;

  // Rule 1: one exact 4-gram repeated 8+ times.
  const counts = new Map<string, number>();
  for (let i = 0; i + 4 <= words.length; i++) {
    const g = `${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`;
    const c = (counts.get(g) || 0) + 1;
    counts.set(g, c);
    if (c >= 8) return true;
  }

  // Rule 2: a low-diversity 80-word window (repetition loop mid-text).
  const W = 80;
  if (words.length >= W) {
    for (let i = 0; i + W <= words.length; i += 20) {
      const seen = new Set<string>();
      let total = 0;
      for (let j = i; j + 4 <= i + W; j++) {
        seen.add(`${words[j]} ${words[j + 1]} ${words[j + 2]} ${words[j + 3]}`);
        total++;
      }
      if (seen.size / total < 0.25) return true;
    }
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────
// Meta-rubric / template garbage detection.
// Sometimes the LLM (or a stale template) leaks the PLAN'S OWN STRUCTURE
// into learner-facing text: self-referential "definitions" like
// 'Key subject terminology in Science representing "Concept" as studied
// under ...', questions about strands/sub-strands/content standards as if
// they were lesson content, or literal unfilled placeholders like
// '[ Stage X ]'. Such text must never reach the exported plan.
// ─────────────────────────────────────────────────────────────────────────
const META_GARBAGE_PATTERNS: RegExp[] = [
  /key subject terminology in/i,
  /as studied under/i,
  /\[ ?stage x ?\]/i,
  /\b(concept|definition|structure|application|analysis|example)\b is (one of|a key|an essential|vital|the core|a core)/i,
  /what is the (primary )?(definition or )?meaning of (concept|definition|structure|application|analysis|example)\b/i,
];

export function isMetaGarbage(s: string): boolean {
  if (!s || s.length < 15) return false;
  return META_GARBAGE_PATTERNS.some(p => p.test(s));
}

// Clean, content-neutral replacements for degenerated fields, keyed by field
// name so a scrubbed plan still reads sensibly in the exported PDF.
const FIELD_FALLBACKS: Record<string, string> = {
  performanceIndicator: 'Learner can: demonstrate understanding of the lesson topic using the day\u2019s activities.',
  scenarioOrContext: 'A learner is working on a class activity related to the lesson topic in a familiar Ghanaian setting.',
  question: 'Explain the key idea from today\u2019s lesson in your own words, giving one example.',
  sampleAnswer: 'Learners should explain the lesson idea clearly using the correct subject terms and one real-life example.',
  explanation: 'This is the correct answer, based on the content of the lesson.',
  definition: 'Refer to the learner notes for the full definition of this term.',
  diagramAsciiOrDescription: '[ Draw the diagram clearly in your exercise book and label the parts. ]',
  diagramTitle: 'Lesson Diagram Task',
  diagramPrompt: 'Study the lesson topic and complete the visual task below.',
  teacherActivities: 'Review the previous lesson, teach the day\u2019s focus step by step, and check learner understanding.',
  learnerActivities: 'Learners join in the warm-up, take notes, and complete the practice tasks.',
  teacherSummary: 'Summarize the day\u2019s main points and assign the revision task.',
  learnerReflection: 'Learners share one key takeaway and record their homework.',
  assessmentMethod: 'Class exercises, oral questions, and exercise book checks.',
  reflect: 'What was the most important idea you learned in today\u2019s lesson?',
  connect: 'How does today\u2019s lesson connect to what you already knew?',
  apply: 'How can you use what you learned today in your daily life?',
  summary: 'Review the key definitions and practice the assigned exercises regularly.',
  introduction: 'These notes support your study of the lesson topic in this subject.',
  title: 'Learner Notes & Study Summary',
};

const GENERIC_FALLBACK = 'Refer to the lesson notes for details.';

/**
 * Walks the whole plan and replaces any degenerated string with a clean,
 * field-appropriate fallback. Returns the (possibly modified) plan and a
 * flag indicating whether anything was scrubbed.
 */
export function sanitizeAiPlan(plan: LearnerPlanOutput): { plan: LearnerPlanOutput; changed: boolean } {
  let changed = false;

  const walk = (node: any, key: string = ''): any => {
    if (typeof node === 'string') {
      if (!isDegenerateText(node) && !isMetaGarbage(node)) return node;
      changed = true;
      return FIELD_FALLBACKS[key] ?? GENERIC_FALLBACK;
    }
    if (Array.isArray(node)) return node.map(item => walk(item, key));
    if (node && typeof node === 'object') {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(node)) out[k] = walk(v, k);
      return out;
    }
    return node;
  };

  return { plan: walk(plan) as LearnerPlanOutput, changed };
}

const EXERCISE_TYPES = ['fillInBlanks', 'mcqs', 'matching', 'application', 'diagram'] as const;
type ExerciseType = (typeof EXERCISE_TYPES)[number];

/**
 * Guarantees structural completeness: for every day and every exercise tier
 * (A-E) the AI plan has the same number of items as the offline plan for the
 * same indicator. Missing days get the full offline set; partially filled
 * days get the missing (exerciseNumber, questionNumber) slots appended.
 */
export function backfillExercises(
  aiPlan: LearnerPlanOutput,
  offlinePlan: LearnerPlanOutput
): LearnerPlanOutput {
  const numDays = Math.max(
    Number(aiPlan.inputs?.numberOfDays) || 1,
    Number(offlinePlan.inputs?.numberOfDays) || 1
  );
  const ex: Record<string, any> = { ...(aiPlan.exercises as any) };

  for (const t of EXERCISE_TYPES) {
    const aiItems: any[] = Array.isArray(ex[t]) ? [...(ex[t] as any[])] : [];
    const offItems: any[] = Array.isArray((offlinePlan.exercises as any)?.[t])
      ? ((offlinePlan.exercises as any)[t] as any[])
      : [];

    for (let d = 1; d <= numDays; d++) {
      const aiDay = aiItems.filter(i => Number(i?.dayNumber) === d);
      const offDay = offItems.filter(i => Number(i?.dayNumber) === d);
      if (offDay.length === 0) continue;

      if (aiDay.length === 0) {
        aiItems.push(...offDay.map(i => ({ ...i, id: `off_d${d}_${t}_${i.id || 'item'}` })));
        continue;
      }

      const have = new Set(aiDay.map(i => `${i?.exerciseNumber}-${i?.questionNumber}`));
      for (const o of offDay) {
        const slot = `${o?.exerciseNumber}-${o?.questionNumber}`;
        if (!have.has(slot)) {
          aiItems.push({ ...o, id: `off_d${d}_${t}_${o.id || 'item'}` });
          have.add(slot);
        }
      }
    }

    ex[t] = aiItems.sort(
      (a, b) =>
        (Number(a?.dayNumber) || 1) - (Number(b?.dayNumber) || 1) ||
        (Number(a?.exerciseNumber) || 1) - (Number(b?.exerciseNumber) || 1) ||
        (Number(a?.questionNumber) || 1) - (Number(b?.questionNumber) || 1)
    );
  }

  return { ...aiPlan, exercises: ex as LearnerPlanOutput['exercises'] };
}
