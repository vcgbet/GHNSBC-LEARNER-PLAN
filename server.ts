import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { PlanFormInputs, LearnerPlanOutput } from "./src/types";
import { generateOfflinePlan } from "./src/utils/offlineGenerator";
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

  try {
    const prompt = `
You are an expert Ghanaian Educator and NaCCA (National Council for Curriculum and Assessment) Curriculum Specialist for Ghana's New Standard-Based Curriculum (NSBC).
Generate a complete, highly detailed Learner Plan (Lesson Plan/Notes) and Learner Writing Notes with Exercises for the following lesson:

LESSON PARAMETERS:
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
- Additional Instructions: ${inputs.additionalInstructions || 'Ensure authentic Ghanaian educational terminology and exercises.'}

REQUIREMENTS:
1. Header & Performance Indicator(s):
   - MANDATORY: Always use "Learner can:" prefix (DO NOT use "Learner will be able to:").
   - If the lesson spans ${inputs.numberOfDays || 1} day(s)/lesson(s), YOU MUST INCLUDE ALL PERFORMANCE INDICATORS FOR EACH DAY in 'performanceIndicator' string field, formatted as:
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
   - This plan is for ${inputs.numberOfDays || 1} day(s)/lesson(s).
   - In 'dailyPlans' array, generate EXACTLY ${inputs.numberOfDays || 1} items (tagged dayNumber: 1..${inputs.numberOfDays || 1}). Each day must have a distinct Starter, Main Phase (Step 1, Step 2, Step 3, Assessment), and Plenary/Reflection showing realistic progression across the days.
10. Learner Exercises:
   - FOR EVERY SINGLE LESSON DAY (Day 1 to Day ${inputs.numberOfDays || 1}), YOU MUST GENERATE ALL 5 EXERCISE TIERS, WITH EXACTLY 2 EXERCISES PER TIER, AND EXACTLY 5 QUESTIONS PER EXERCISE:
     a) Fill in the Blanks: 2 Exercises per day (Exercise 1: Questions 1 to 5; Exercise 2: Questions 1 to 5). Each question has a clear sentence with "____" blank and the exact single answer. Tagged with dayNumber, exerciseNumber (1 or 2), and questionNumber (1 to 5). Total: ${(inputs.numberOfDays || 1) * 10} items.
     b) Multiple Choice (MCQs): 2 Exercises per day (Exercise 1: Questions 1 to 5; Exercise 2: Questions 1 to 5). 4 distinct options (A, B, C, D), correctOption, and explanation. Tagged with dayNumber, exerciseNumber (1 or 2), and questionNumber (1 to 5). Total: ${(inputs.numberOfDays || 1) * 10} items.
     c) Matching Columns: 2 Exercises per day (Exercise 1: Questions 1 to 5; Exercise 2: Questions 1 to 5). Column A items with matching Column B descriptions and matchKey. Tagged with dayNumber, exerciseNumber (1 or 2), and questionNumber (1 to 5). Total: ${(inputs.numberOfDays || 1) * 10} items.
     d) Application Exercises: 2 Exercises per day (Exercise 1: Questions 1 to 5; Exercise 2: Questions 1 to 5). Real-life Ghanaian situations, problem-solving prompts, and practical scenarios testing deep conceptual transfer, with model answer/guideline. Tagged with dayNumber, exerciseNumber (1 or 2), and questionNumber (1 to 5). Total: ${(inputs.numberOfDays || 1) * 10} items.
     e) Diagram Exercises: 2 Exercises per day (Exercise 1: Questions 1 to 5; Exercise 2: Questions 1 to 5). Tailored strictly to class level:
        - For Early Years & Lower Primary (Nursery, KG1, KG2, Basic 1, Basic 2, Basic 3): Questions asking learners to identify pictures (e.g. animals, community tools, Ghanaian symbols, fruits), label simple diagrams, trace dotted line diagrams/shapes, trace letters/words, and draw illustrations.
        - For Upper Primary & JHS (Basic 4 to Basic 9): Questions asking learners to identify subject diagrams, label structures (e.g. plant/human organs, maps, computer components, geometric nets, place value charts), and complete visual tasks.
        - Tagged with dayNumber, exerciseNumber (1 or 2), questionNumber (1 to 5), diagramCategory, diagramTitle, diagramPrompt, diagramAsciiOrDescription, question, and expectedAnswer. Total: ${(inputs.numberOfDays || 1) * 10} items.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a NaCCA Ghana Curriculum Master Specialist. Return strict, valid JSON matching the schema for a Ghana Standard-Based Curriculum Lesson Plan and Notes.",
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
            },
            exercises: {
              type: Type.OBJECT,
              properties: {
                fillInBlanks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      dayNumber: { type: Type.NUMBER },
                      exerciseNumber: { type: Type.NUMBER },
                      questionNumber: { type: Type.NUMBER },
                      question: { type: Type.STRING },
                      blankAnswer: { type: Type.STRING }
                    },
                    required: ["id", "question", "blankAnswer"]
                  }
                },
                mcqs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      dayNumber: { type: Type.NUMBER },
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
                    required: ["id", "question", "options", "correctOption"]
                  }
                },
                matching: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      dayNumber: { type: Type.NUMBER },
                      exerciseNumber: { type: Type.NUMBER },
                      questionNumber: { type: Type.NUMBER },
                      itemA: { type: Type.STRING },
                      itemB: { type: Type.STRING },
                      matchKey: { type: Type.STRING }
                    },
                    required: ["id", "itemA", "itemB", "matchKey"]
                  }
                },
                application: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      dayNumber: { type: Type.NUMBER },
                      exerciseNumber: { type: Type.NUMBER },
                      questionNumber: { type: Type.NUMBER },
                      scenarioOrContext: { type: Type.STRING },
                      question: { type: Type.STRING },
                      sampleAnswer: { type: Type.STRING }
                    },
                    required: ["id", "question", "sampleAnswer"]
                  }
                },
                diagram: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      dayNumber: { type: Type.NUMBER },
                      exerciseNumber: { type: Type.NUMBER },
                      questionNumber: { type: Type.NUMBER },
                      diagramCategory: { type: Type.STRING },
                      diagramTitle: { type: Type.STRING },
                      diagramPrompt: { type: Type.STRING },
                      diagramAsciiOrDescription: { type: Type.STRING },
                      question: { type: Type.STRING },
                      expectedAnswer: { type: Type.STRING }
                    },
                    required: ["id", "diagramTitle", "diagramPrompt", "question", "expectedAnswer"]
                  }
                }
              },
              required: ["fillInBlanks", "mcqs", "matching", "application", "diagram"]
            }
          },
          required: [
            "header",
            "starter",
            "mainPhase",
            "plenaryReflection",
            "rcaQuestions",
            "learnerWritingNotes",
            "exercises"
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");

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
        numberOfDays: inputs.numberOfDays || 4,
        strand: inputs.strand,
        subStrand: inputs.subStrand,
        contentStandard: inputs.contentStandard || 'B4.1.1.1',
        indicator: inputs.indicator || 'B4.1.1.1.1',
        performanceIndicator: parsedData.header?.performanceIndicator || `Learners will demonstrate understanding of ${inputs.subStrand}.`,
        selectedDays: (inputs.selectedDays && inputs.selectedDays.length > 0)
          ? inputs.selectedDays
          : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, inputs.numberOfDays || 1),
        references: (inputs.references && inputs.references.trim() !== '' && !inputs.references.toLowerCase().includes('nacca standard curriculum guide'))
          ? inputs.references
          : getNaCCACurriculumReference(inputs.subject || 'Mathematics', inputs.classLevel || 'Basic 4', inputs.strand, inputs.subStrand, inputs.indicator),
        teachingResources: parsedData.header?.teachingResources || ['Textbooks', 'Chalkboard', 'Charts'],
        coreCompetencies: (parsedData.header?.coreCompetencies && parsedData.header.coreCompetencies.length > 0)
          ? parsedData.header.coreCompetencies
          : (inputs.coreCompetencies && inputs.coreCompetencies.length > 0)
            ? inputs.coreCompetencies
            : getAutoCoreCompetencies(inputs.subject, inputs.strand, inputs.subStrand),
        keyWords: parsedData.header?.keyWords || ['Concept', 'Definition'],
        nameOfHead: inputs.nameOfHead || 'Mr. Kwesi Mensah',
        teacherName: inputs.teacherName || 'Class Teacher',
        schoolName: inputs.schoolName || 'Adom Basic School'
      },
      starter: {
        duration: parsedData.starter?.duration || '10 Mins',
        teacherActivities: parsedData.starter?.teacherActivities || 'Welcome learners and review previous lesson.',
        learnerActivities: parsedData.starter?.learnerActivities || 'Respond to warm-up questions.'
      },
      mainPhase: {
        duration: parsedData.mainPhase?.duration || '40 Mins',
        step1Teacher: parsedData.mainPhase?.step1Teacher || 'Explain new concepts.',
        step1Learner: parsedData.mainPhase?.step1Learner || 'Observe and take notes.',
        step2Teacher: parsedData.mainPhase?.step2Teacher || 'Guide group work.',
        step2Learner: parsedData.mainPhase?.step2Learner || 'Collaborate in groups.',
        step3Teacher: parsedData.mainPhase?.step3Teacher || 'Assign individual practice.',
        step3Learner: parsedData.mainPhase?.step3Learner || 'Solve exercises in workbooks.',
        assessmentMethod: parsedData.mainPhase?.assessmentMethod || 'Class observation and workbook checks.'
      },
      plenaryReflection: {
        duration: parsedData.plenaryReflection?.duration || '10 Mins',
        teacherSummary: parsedData.plenaryReflection?.teacherSummary || 'Summarize key points.',
        learnerReflection: parsedData.plenaryReflection?.learnerReflection || 'State lesson takeaways.'
      },
      rcaQuestions: {
        reflect: parsedData.rcaQuestions?.reflect || `What was the most important thing you learned about ${inputs.subStrand}?`,
        connect: parsedData.rcaQuestions?.connect || `How does this lesson connect to what you already knew?`,
        apply: parsedData.rcaQuestions?.apply || `How can you use this knowledge in your daily life?`
      },
      learnerWritingNotes: parsedData.learnerWritingNotes || {
        title: `LEARNER NOTES: ${inputs.subject.toUpperCase()} - ${inputs.subStrand.toUpperCase()}`,
        introduction: `Key study notes on ${inputs.subStrand}.`,
        keyDefinitions: [],
        mainContentPoints: [],
        summary: `Review notes regularly.`
      },
      exercises: parsedData.exercises || {
        fillInBlanks: [],
        mcqs: [],
        matching: [],
        application: [],
        diagram: []
      },
      dailyPlans: (parsedData.dailyPlans && parsedData.dailyPlans.length > 0) ? parsedData.dailyPlans : undefined,
      generationMode: 'AI'
    };

    return res.json(fullPlan);
  } catch (err: any) {
    console.error("Gemini AI plan generation failed, falling back to offline engine:", err);
    const offlinePlan = generateOfflinePlan(inputs);
    return res.json(offlinePlan);
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

startServer();
