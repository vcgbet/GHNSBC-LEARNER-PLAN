import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { PlanFormInputs, LearnerPlanOutput } from "./src/types";
import { generateOfflinePlan } from "./src/utils/offlineGenerator";
import { sanitizeAiPlan, backfillExercises } from "./src/utils/aiPlanGuard";
import { getAutoCoreCompetencies } from "./src/utils/coreCompetencies";
import { parseSchemeText } from "./src/utils/schemeParser";
import { getNaCCACurriculumReference } from "./src/utils/naccaReferences";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hasApiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Model retry strategy: the primary model periodically returns 503
// UNAVAILABLE ("high demand"), and models get deprecated over time
// (e.g. gemini-2.5-flash → 404 "no longer available to new users").
// So instead of hardcoding a chain, the server auto-discovers which
// models THIS API key can actually use (cached), and remembers any
// model that 404s so it is never called again.
const MODEL_PREFERENCE = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.1-flash",
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite"
];
const DEAD_MODELS = new Set<string>();
let modelsPromise: Promise<string[] | null> | null = null;

function getAvailableModels(): Promise<string[] | null> {
  if (!modelsPromise) {
    modelsPromise = (async () => {
      if (!ai) return null;
      try {
        const page: any = await (ai as any).models.list();
        const names: string[] = (page?.models || [])
          .map((m: any) => String(m?.name || "").replace(/^models\//, ""))
          .filter(Boolean);
        console.log("[AI] Models available to this key:", names.join(", "));
        return names;
      } catch (e: any) {
        console.warn("[AI] models.list() failed:", String(e?.message || e).slice(0, 200));
        return null;
      }
    })();
  }
  return modelsPromise;
}

async function getAiSlots(): Promise<Array<{ model: string; delayMs: number }>> {
  const available = await getAvailableModels();
  let pool: string[];
  if (available) {
    const usable = available.filter(m => !DEAD_MODELS.has(m) && /flash/i.test(m));
    pool = [
      ...MODEL_PREFERENCE.filter(m => usable.includes(m)),
      ...usable.filter(m => !MODEL_PREFERENCE.includes(m))
    ];
  } else {
    pool = MODEL_PREFERENCE.filter(m => !DEAD_MODELS.has(m));
  }
  if (pool.length === 0) pool = ["gemini-3.6-flash"];
  const primary = pool[0];
  const secondary = pool[1] || pool[0];
  return [
    { model: primary, delayMs: 0 },
    { model: secondary, delayMs: 0 },
    { model: primary, delayMs: 20000 },
    { model: secondary, delayMs: 45000 }
  ];
}

// Shared LESSON PARAMETERS block used by every AI call.
function buildLessonParams(inputs: PlanFormInputs): string {
  return `LESSON PARAMETERS:
- Week Ending: ${inputs.weekEnding || '16th October, 2026'}
- School Name: ${inputs.schoolName || 'Adom Basic School'}
- Teacher's Name: ${inputs.teacherName || 'Class Teacher'}
- Class / Grade Level: ${inputs.classLevel || 'Basic 4'}
- Subject: ${inputs.subject}
- Strand: ${inputs.strand}
- Sub-strand: ${inputs.subStrand}
- Content Standard: ${inputs.contentStandard || 'B4.1.1.1'}
- Indicator: ${inputs.indicator || 'B4.1.1.1.1'}
- Class Size: ${inputs.classSize || 45} learners
- Lesson Duration: ${inputs.duration || '60 Mins'}
- Number of Days/Lessons: ${inputs.numberOfDays || 4}
- Head of School / Headteacher: ${inputs.nameOfHead || 'Mr. Kwesi Mensah'}
- Additional Instructions: ${inputs.additionalInstructions || 'Ensure authentic Ghanaian educational terminology and exercises.'}`;
}

const STYLE_RULES = `STYLE & COMPLETENESS:
   - Write EVERY text field as clean, natural, concise prose (1-3 sentences). Never repeat the same word or phrase. Never output instructions, formatting notes, JSON comments, or any meta text about how you are generating the plan.
   - Questions must be about the lesson CONTENT (the indicator), never about the plan's own structure (strands, sub-strands, content standards, performance indicators). Refer to the topic by its plain name.`;

// Generate Plan API Endpoint
app.post("/api/generate-plan", async (req, res) => {
  const inputs: PlanFormInputs = req.body;

  // Validate basic inputs
  if (!inputs || !inputs.subject || !inputs.strand || !inputs.subStrand) {
    return res.status(400).json({ error: "Missing required fields: subject, strand, subStrand" });
  }

  // Check if AI is available and configured
  if (!ai || !process.env.GEMINI_API_KEY) {
    console.log("Gemini API key not found. Using high-quality offline generator engine.");
    const offlinePlan = generateOfflinePlan(inputs);
    return res.json(offlinePlan);
  }

  const aiClient = ai;
  const days = Math.max(1, Number(inputs.numberOfDays) || 4);

  // ------------------------------------------------------------------
  // Robust JSON call: model fallback slots + re-sampling on malformed
  // JSON (truncated / unterminated output). Non-transient API errors
  // (auth, invalid request) abort immediately.
  // ------------------------------------------------------------------
  const callGeminiJson = async (contents: string, config: any, label: string): Promise<any> => {
    let lastErr: any = null;
    const slots = await getAiSlots();
    for (const slot of slots) {
      if (slot.delayMs > 0) await new Promise(r => setTimeout(r, slot.delayMs));
      for (let sample = 1; sample <= 2; sample++) {
        try {
          const response = await aiClient.models.generateContent({
            model: slot.model,
            contents,
            config
          });
          const raw = response.text || "{}";
          try {
            return JSON.parse(raw);
          } catch (parseErr) {
            lastErr = parseErr;
            console.warn(`[AI:${label}] model=${slot.model} sample=${sample} returned invalid JSON (${raw.length} chars): ${String(parseErr).slice(0, 160)}`);
            await new Promise(r => setTimeout(r, 2000));
            continue; // re-sample (next sample, then next model slot)
          }
        } catch (e: any) {
          lastErr = e;
          const code = String(e?.code ?? e?.status ?? '');
          const msg = String(e?.message ?? e);
          console.warn(`[AI:${label}] model=${slot.model} sample=${sample} failed: code=${code} ${msg.slice(0, 250)}`);
          // Model no longer exists for this key → remember it, try next slot.
          const deadModel = /404|not_found|no longer available/i.test(`${code} ${msg}`) && /model/i.test(msg);
          if (deadModel) {
            DEAD_MODELS.add(slot.model);
            console.warn(`[AI] Marking model ${slot.model} as unavailable for this key.`);
          }
          const transient = /429|500|502|503|unavailable|resource_exhausted|quota|rate ?limit|deadline|timeout|socket/i
            .test(`${code} ${msg}`);
          if (!transient && !deadModel) throw e; // auth / invalid request — do not retry
          break; // transient API error or dead model — next slot (its delay applies)
        }
      }
    }
    throw lastErr || new Error(`AI call failed: ${label}`);
  };

  // ------------------------------------------------------------------
  // Split generation: one small call for the plan core, plus one small
  // call PER DAY for that day's 50-item exercise bank. A full plan in a
  // single response (~67KB of JSON) frequently exceeds the model output
  // limit and comes back truncated/invalid; ~15-30KB responses are safe.
  // All calls run in parallel, so total time ≈ the slowest single call.
  // ------------------------------------------------------------------
  const coreConfig = {
    systemInstruction: "You are a NaCCA Ghana Curriculum Master Specialist. Return strict, valid JSON matching the given schema exactly.",
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        header: {
          type: Type.OBJECT,
          properties: {
            performanceIndicator: { type: Type.STRING },
            teachingResources: { type: Type.ARRAY, items: { type: Type.STRING } },
            coreCompetencies: { type: Type.ARRAY, items: { type: Type.STRING } },
            keyWords: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["performanceIndicator", "teachingResources", "coreCompetencies", "keyWords"]
        },
        starter: {
          type: Type.OBJECT,
          properties: {
            duration: { type: Type.STRING },
            teacherActivities: { type: Type.STRING },
            learnerActivities: { type: Type.STRING }
          },
          required: ["teacherActivities", "learnerActivities"]
        },
        mainPhase: {
          type: Type.OBJECT,
          properties: {
            duration: { type: Type.STRING },
            step1Teacher: { type: Type.STRING },
            step1Learner: { type: Type.STRING },
            step2Teacher: { type: Type.STRING },
            step2Learner: { type: Type.STRING },
            step3Teacher: { type: Type.STRING },
            step3Learner: { type: Type.STRING },
            assessmentMethod: { type: Type.STRING }
          },
          required: ["step1Teacher", "step1Learner", "step2Teacher", "step2Learner", "step3Teacher", "step3Learner", "assessmentMethod"]
        },
        plenaryReflection: {
          type: Type.OBJECT,
          properties: {
            duration: { type: Type.STRING },
            teacherSummary: { type: Type.STRING },
            learnerReflection: { type: Type.STRING }
          },
          required: ["teacherSummary", "learnerReflection"]
        },
        dailyPlans: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dayNumber: { type: Type.NUMBER },
              starter: {
                type: Type.OBJECT,
                properties: {
                  duration: { type: Type.STRING },
                  teacherActivities: { type: Type.STRING },
                  learnerActivities: { type: Type.STRING }
                },
                required: ["teacherActivities", "learnerActivities"]
              },
              mainPhase: {
                type: Type.OBJECT,
                properties: {
                  duration: { type: Type.STRING },
                  step1Teacher: { type: Type.STRING },
                  step1Learner: { type: Type.STRING },
                  step2Teacher: { type: Type.STRING },
                  step2Learner: { type: Type.STRING },
                  step3Teacher: { type: Type.STRING },
                  step3Learner: { type: Type.STRING },
                  assessmentMethod: { type: Type.STRING }
                },
                required: ["step1Teacher", "step1Learner", "step2Teacher", "step2Learner", "step3Teacher", "step3Learner", "assessmentMethod"]
              },
              plenaryReflection: {
                type: Type.OBJECT,
                properties: {
                  duration: { type: Type.STRING },
                  teacherSummary: { type: Type.STRING },
                  learnerReflection: { type: Type.STRING }
                },
                required: ["teacherSummary", "learnerReflection"]
              }
            },
            required: ["dayNumber", "starter", "mainPhase", "plenaryReflection"]
          }
        },
        rcaQuestions: {
          type: Type.OBJECT,
          properties: {
            reflect: { type: Type.STRING },
            connect: { type: Type.STRING },
            apply: { type: Type.STRING }
          },
          required: ["reflect", "connect", "apply"]
        },
        learnerWritingNotes: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            introduction: { type: Type.STRING },
            keyDefinitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  definition: { type: Type.STRING }
                },
                required: ["term", "definition"]
              }
            },
            mainContentPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  heading: { type: Type.STRING },
                  body: { type: Type.STRING },
                  bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["heading", "body"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["title", "introduction", "keyDefinitions", "mainContentPoints", "summary"]
        }
      },
      required: [
        "header",
        "starter",
        "mainPhase",
        "plenaryReflection",
        "dailyPlans",
        "rcaQuestions",
        "learnerWritingNotes"
      ]
    }
  };

  const dayConfig = {
    systemInstruction: "You are a NaCCA Ghana Curriculum Master Specialist. Return strict, valid JSON matching the given schema exactly.",
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        fillInBlanks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              exerciseNumber: { type: Type.NUMBER },
              questionNumber: { type: Type.NUMBER },
              question: { type: Type.STRING },
              blankAnswer: { type: Type.STRING }
            },
            required: ["exerciseNumber", "questionNumber", "question", "blankAnswer"]
          }
        },
        mcqs: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              exerciseNumber: { type: Type.NUMBER },
              questionNumber: { type: Type.NUMBER },
              question: { type: Type.STRING },
              options: {
                type: Type.OBJECT,
                properties: {
                  A: { type: Type.STRING },
                  B: { type: Type.STRING },
                  C: { type: Type.STRING },
                  D: { type: Type.STRING }
                },
                required: ["A", "B", "C", "D"]
              },
              correctOption: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["exerciseNumber", "questionNumber", "question", "options", "correctOption"]
          }
        },
        matching: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              exerciseNumber: { type: Type.NUMBER },
              questionNumber: { type: Type.NUMBER },
              itemA: { type: Type.STRING },
              itemB: { type: Type.STRING },
              matchKey: { type: Type.STRING }
            },
            required: ["exerciseNumber", "questionNumber", "itemA", "itemB", "matchKey"]
          }
        },
        application: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              exerciseNumber: { type: Type.NUMBER },
              questionNumber: { type: Type.NUMBER },
              scenarioOrContext: { type: Type.STRING },
              question: { type: Type.STRING },
              sampleAnswer: { type: Type.STRING }
            },
            required: ["exerciseNumber", "questionNumber", "question", "sampleAnswer"]
          }
        },
        diagram: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              exerciseNumber: { type: Type.NUMBER },
              questionNumber: { type: Type.NUMBER },
              diagramCategory: { type: Type.STRING },
              diagramTitle: { type: Type.STRING },
              diagramPrompt: { type: Type.STRING },
              diagramAsciiOrDescription: { type: Type.STRING },
              question: { type: Type.STRING },
              expectedAnswer: { type: Type.STRING }
            },
            required: ["exerciseNumber", "questionNumber", "diagramTitle", "diagramPrompt", "question", "expectedAnswer"]
          }
        }
      },
      required: ["fillInBlanks", "mcqs", "matching", "application", "diagram"]
    }
  };

  const corePrompt = `
You are an expert Ghanaian Educator and NaCCA (National Council for Curriculum and Assessment) Curriculum Specialist for Ghana's New Standard-Based Curriculum (NSBC).
Generate the LESSON PLAN AND STUDY NOTES portion of a Learner Plan for the following lesson.
IMPORTANT: Exercises are generated separately — do NOT include any exercises or exercise arrays in your response.

${buildLessonParams(inputs)}

REQUIREMENTS:
1. Header & Performance Indicator(s):
   - MANDATORY: Always use "Learner can:" prefix (DO NOT use "Learner will be able to:").
   - If the lesson spans ${days} day(s)/lesson(s), YOU MUST INCLUDE ALL PERFORMANCE INDICATORS FOR EACH DAY in the 'performanceIndicator' string field, formatted as:
     Day 1: Learner can: [Day 1 performance indicator]
     Day 2: Learner can: [Day 2 performance indicator]
     (For a 1-day plan, format as "Learner can: [performance indicator]")
2. Teaching & Learning Materials (TLMs): 4-6 specific local materials.
3. Core Competencies & Key Words: Automatically generate 3-5 specific NaCCA Core Competencies tailored to this subject and indicator (e.g. Critical Thinking and Problem Solving (CP), Communication and Collaboration (CC), Creativity and Innovation (CI), Digital Literacy (DL), Personal Development and Leadership (PL), Cultural Identity and Global Citizenship (CG)). Explain briefly how each competency is fostered in the lesson.
4. Starter Phase (Phase 1): Warm-up activity, introduction, prior knowledge check.
5. Main Phase Activities (Phase 2): Detailed step-by-step teacher actions and learner actions, group work, independent practice, assessment methods.
6. Plenary/Reflection (Phase 3): Lesson summary and learner reflection.
7. RCA Questions: 3 distinct questions - Reflect, Connect, and Apply (focusing on local Ghanaian life and everyday context).
8. Learner Writing Notes: Very detailed, thorough, student-friendly notes for learners to write in their notebooks. Must include a comprehensive introduction, 5-8 key vocabulary definitions, 3 detailed main content sections with rich explanatory text and step-by-step bullet points, and a thorough summary.
9. Daily Lesson Plans:
   - This plan is for ${days} day(s)/lesson(s).
   - In 'dailyPlans' array, generate EXACTLY ${days} item(s) (tagged dayNumber: 1..${days}). Each day must have a distinct Starter, Main Phase (Step 1, Step 2, Step 3, Assessment), and Plenary/Reflection showing realistic progression across the days.
10. ${STYLE_RULES}
`;

  const dayPrompt = (day: number): string => `
You are an expert Ghanaian Educator and NaCCA (National Council for Curriculum and Assessment) Curriculum Specialist for Ghana's New Standard-Based Curriculum (NSBC).
Generate ONLY the learner exercise bank for DAY ${day} of the following lesson.
IMPORTANT: Do NOT include lesson plans, notes, headers, or any other day's exercises — exercises for day ${day} only.

${buildLessonParams(inputs)}
- FOCUS: Day ${day} of ${days} — all questions target THIS day's portion of the lesson content.

REQUIREMENTS — exactly 10 items per tier (Exercise 1: questions 1-5; Exercise 2: questions 1-5):
a) fillInBlanks: 10 items. Each question is a clear sentence with a "____" blank and the exact single answer. Tag each with exerciseNumber (1 or 2) and questionNumber (1 to 5).
b) mcqs: 10 items. 4 distinct options (A, B, C, D), correctOption, and a short explanation. Tag each with exerciseNumber (1 or 2) and questionNumber (1 to 5).
c) matching: 10 items. Column A item, matching Column B description, and matchKey. Tag each with exerciseNumber (1 or 2) and questionNumber (1 to 5).
d) application: 10 items. Real-life Ghanaian situations, problem-solving prompts, and practical scenarios testing deep conceptual transfer, with model answer/guideline. Tag each with exerciseNumber (1 or 2) and questionNumber (1 to 5).
e) diagram: 10 items. Tailored strictly to class level:
   - For Early Years & Lower Primary (Nursery, KG1, KG2, Basic 1, Basic 2, Basic 3): identify pictures (animals, community tools, Ghanaian symbols, fruits), label simple diagrams, trace dotted line diagrams/shapes/letters/words, draw illustrations.
   - For Upper Primary & JHS (Basic 4 to Basic 9): identify subject diagrams, label structures (plant/human organs, maps, computer components, geometric nets, place value charts), complete visual tasks.
   - Tag each with exerciseNumber (1 or 2), questionNumber (1 to 5), diagramCategory, diagramTitle, diagramPrompt, diagramAsciiOrDescription, question, and expectedAnswer.
10. ${STYLE_RULES}
`;

  const buildAiPlan = async (): Promise<LearnerPlanOutput> => {
    // One core call + one call per day — all in parallel.
    // If the CORE call fails after exhausting every retry, it throws and
    // the outer catch serves the full offline plan (with aiError shown).
    // If a single DAY's exercise bank fails, only that day's exercises
    // fall back to the offline engine (via backfillExercises below); the
    // AI core and all other days are kept.
    const dayCallPromises = Array.from({ length: days }, (_, i) =>
      callGeminiJson(dayPrompt(i + 1), dayConfig, `exercises-day${i + 1}`).catch((e: any) => {
        console.error(`[AI] exercises-day${i + 1} exhausted all retries — that day's exercises will come from the offline engine:`, String(e?.message || e).slice(0, 250));
        return null;
      })
    );
    const [coreData, ...dayParts] = await Promise.all([
      callGeminiJson(corePrompt, coreConfig, "core-plan"),
      ...dayCallPromises
    ]);

    // Merge per-day exercise banks, normalising tags server-side.
    const tierKeys = ["fillInBlanks", "mcqs", "matching", "application", "diagram"] as const;
    const exercises: any = {
      fillInBlanks: [],
      mcqs: [],
      matching: [],
      application: [],
      diagram: []
    };
    dayParts.forEach((part, idx) => {
      const dayNum = idx + 1;
      for (const key of tierKeys) {
        const arr = Array.isArray(part?.[key]) ? part[key] : [];
        for (const item of arr) {
          if (!item || typeof item !== "object") continue;
          item.dayNumber = dayNum;
          if (!item.id) {
            item.id = `${key}_d${dayNum}_e${item.exerciseNumber ?? 1}_q${item.questionNumber ?? 1}`;
          }
          (exercises[key] as any[]).push(item);
        }
      }
    });

    const fullPlan: LearnerPlanOutput = {
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
      inputs,
      header: {
        weekEnding: inputs.weekEnding || '16th October, 2026',
        classLevel: inputs.classLevel || 'Basic 4',
        classSize: inputs.classSize || 45,
        subject: inputs.subject,
        duration: inputs.duration || '60 Mins',
        numberOfDays: days,
        strand: inputs.strand,
        subStrand: inputs.subStrand,
        contentStandard: inputs.contentStandard || 'B4.1.1.1',
        indicator: inputs.indicator || 'B4.1.1.1.1',
        performanceIndicator: coreData?.header?.performanceIndicator || `Learners will demonstrate understanding of ${inputs.subStrand}.`,
        selectedDays: (inputs.selectedDays && inputs.selectedDays.length > 0)
          ? inputs.selectedDays
          : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, days),
        references: (inputs.references && inputs.references.trim() !== '' && !inputs.references.toLowerCase().includes('nacca standard curriculum guide'))
          ? inputs.references
          : getNaCCACurriculumReference(inputs.subject || 'Mathematics', inputs.classLevel || 'Basic 4', inputs.strand, inputs.subStrand, inputs.indicator),
        teachingResources: coreData?.header?.teachingResources || ['Textbooks', 'Chalkboard', 'Charts'],
        coreCompetencies: (coreData?.header?.coreCompetencies && coreData.header.coreCompetencies.length > 0)
          ? coreData.header.coreCompetencies
          : (inputs.coreCompetencies && inputs.coreCompetencies.length > 0)
            ? inputs.coreCompetencies
            : getAutoCoreCompetencies(inputs.subject, inputs.strand, inputs.subStrand),
        keyWords: coreData?.header?.keyWords || ['Concept', 'Definition'],
        nameOfHead: inputs.nameOfHead || 'Mr. Kwesi Mensah',
        teacherName: inputs.teacherName || 'Class Teacher',
        schoolName: inputs.schoolName || 'Adom Basic School'
      },
      starter: {
        duration: coreData?.starter?.duration || '10 Mins',
        teacherActivities: coreData?.starter?.teacherActivities || 'Welcome learners and review previous lesson.',
        learnerActivities: coreData?.starter?.learnerActivities || 'Respond to warm-up questions.'
      },
      mainPhase: {
        duration: coreData?.mainPhase?.duration || '40 Mins',
        step1Teacher: coreData?.mainPhase?.step1Teacher || 'Explain new concepts.',
        step1Learner: coreData?.mainPhase?.step1Learner || 'Observe and take notes.',
        step2Teacher: coreData?.mainPhase?.step2Teacher || 'Guide group work.',
        step2Learner: coreData?.mainPhase?.step2Learner || 'Collaborate in groups.',
        step3Teacher: coreData?.mainPhase?.step3Teacher || 'Assign individual practice.',
        step3Learner: coreData?.mainPhase?.step3Learner || 'Solve exercises in workbooks.',
        assessmentMethod: coreData?.mainPhase?.assessmentMethod || 'Class observation and workbook checks.'
      },
      plenaryReflection: {
        duration: coreData?.plenaryReflection?.duration || '10 Mins',
        teacherSummary: coreData?.plenaryReflection?.teacherSummary || 'Summarize key points.',
        learnerReflection: coreData?.plenaryReflection?.learnerReflection || 'State lesson takeaways.'
      },
      rcaQuestions: {
        reflect: coreData?.rcaQuestions?.reflect || `What was the most important thing you learned about ${inputs.subStrand}?`,
        connect: coreData?.rcaQuestions?.connect || `How does this lesson connect to what you already knew?`,
        apply: coreData?.rcaQuestions?.apply || `How can you use this knowledge in your daily life?`
      },
      learnerWritingNotes: coreData?.learnerWritingNotes || {
        title: `LEARNER NOTES: ${inputs.subject.toUpperCase()} - ${inputs.subStrand.toUpperCase()}`,
        introduction: `Key study notes on ${inputs.subStrand}.`,
        keyDefinitions: [],
        mainContentPoints: [],
        summary: `Review notes regularly.`
      },
      exercises,
      ...(dayParts.some(d => d == null) ? { aiPartial: true } : {}),
      dailyPlans: (coreData?.dailyPlans && coreData.dailyPlans.length > 0) ? coreData.dailyPlans : undefined,
      generationMode: 'AI'
    } as LearnerPlanOutput;
    return fullPlan;
  };

  try {
    let plan = await buildAiPlan();

    // Guard against degenerated LLM output (repetition loops that sometimes
    // regurgitate prompt fragments): scrub bad fields, retry once if needed.
    const first = sanitizeAiPlan(plan);
    if (first.changed) {
      console.warn("AI plan contained degenerated text - retrying generation once.");
      let retryPlan: LearnerPlanOutput | null = null;
      try {
        retryPlan = await buildAiPlan();
      } catch (retryErr) {
        console.warn("AI retry failed; using sanitized plan.", retryErr);
      }
      if (retryPlan) {
        const second = sanitizeAiPlan(retryPlan);
        plan = second.changed ? first.plan : retryPlan;
        if (second.changed) console.warn("Retry also contained degenerated text - using sanitized plan.");
      } else {
        plan = first.plan;
      }
    }

    // Guarantee a structurally complete plan: any missing day/section is
    // filled from the deterministic offline engine (same indicator).
    const finalPlan = backfillExercises(plan, generateOfflinePlan(inputs));
    return res.json(finalPlan);
  } catch (err: any) {
    const errMsg = String(err?.message || err || 'unknown AI error');
    const errCode = String(err?.code || err?.status || '');
    console.error(`Gemini AI plan generation failed (code=${errCode}), falling back to offline engine:`, errMsg);
    const offlinePlan = generateOfflinePlan(inputs);
    // aiFailed/aiError are surfaced to the client so the UI can tell the
    // teacher exactly why the offline engine was used.
    return res.json({
      ...offlinePlan,
      generationMode: 'Offline Engine',
      aiFailed: true,
      aiError: errMsg,
      aiErrorCode: errCode
    });
  }
});

// Parse Scheme of Learning API Endpoint
app.post("/api/parse-scheme", async (req, res) => {
  const { schemeText } = req.body;

  if (!schemeText || typeof schemeText !== 'string' || !schemeText.trim()) {
    return res.status(400).json({ error: "Missing or empty schemeText" });
  }

  // Fallback to offline regex/keyword extraction if AI is not configured
  if (!ai || !process.env.GEMINI_API_KEY) {
    console.log("Parsing scheme of learning using offline heuristic parser...");
    const parsedOffline = parseSchemeText(schemeText);
    return res.json(parsedOffline);
  }

  try {
    const prompt = `
You are an expert Ghanaian NaCCA Curriculum Specialist.
Extract curriculum lesson details from the following Scheme of Learning document snippet or text.

DOC TEXT:
${schemeText.slice(0, 8000)}

Extract the following fields accurately for the Ghana Standard-Based Curriculum:
1. subject: Full Subject Name (e.g. "Mathematics", "Science", "English Language", "Our World Our People (OWOP)", "Computing", "Creative Arts", "Religious and Moral Education (RME)", "History")
2. classLevel: e.g., "Basic 4", "Basic 7", "KG 2", "Basic 1"
3. strand: Full Strand name and number (e.g., "Strand 1: Number", "Strand 2: Geometry")
4. subStrand: Full Sub-strand name (e.g., "Sub-strand 1: Whole Numbers")
5. contentStandard: Content Standard code and description (e.g., "B4.1.1.1: Demonstrate understanding of whole numbers...")
6. indicator: Indicator code and description (e.g., "B4.1.1.1.1: Model number quantities...")
7. weekEnding: e.g. "24th October, 2026"
8. teachingResources: Array of string TLM materials mentioned (e.g. ["Abacus", "Counters", "Flashcards"])
9. schoolName: School Name if mentioned
10. teacherName: Teacher's Name if mentioned
11. duration: e.g. "60 Mins"
12. classSize: e.g. 45
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            classLevel: { type: Type.STRING },
            strand: { type: Type.STRING },
            subStrand: { type: Type.STRING },
            contentStandard: { type: Type.STRING },
            indicator: { type: Type.STRING },
            weekEnding: { type: Type.STRING },
            teachingResources: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            schoolName: { type: Type.STRING },
            teacherName: { type: Type.STRING },
            duration: { type: Type.STRING },
            classSize: { type: Type.NUMBER }
          }
        }
      }
    });

    if (response.text) {
      const extracted = JSON.parse(response.text);
      // Merge with offline heuristics to ensure no empty values if AI missed obvious codes
      const offlineFallback = parseSchemeText(schemeText);
      const merged = {
        ...offlineFallback,
        ...extracted,
        teachingResources: extracted.teachingResources?.length ? extracted.teachingResources : offlineFallback.teachingResources
      };
      return res.json(merged);
    } else {
      const offlineFallback = parseSchemeText(schemeText);
      return res.json(offlineFallback);
    }
  } catch (err) {
    console.error("AI Scheme extraction failed, using offline scheme parser:", err);
    const offlineFallback = parseSchemeText(schemeText);
    return res.json(offlineFallback);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Vercel imports this Express app as a serverless function.
// Local development still uses the existing Express/Vite server.
export default app;

if (!process.env.VERCEL) {
  startServer();
}
