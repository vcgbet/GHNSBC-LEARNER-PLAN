export interface GhanaCurriculumIndicator {
  code: string; // e.g. "B4.1.1.1.1"
  description: string;
  exemplars?: string[];
  suggestedTLMs?: string[];
  keyWords?: string[];
}

export interface GhanaCurriculumContentStandard {
  code: string; // e.g. "B4.1.1.1"
  description: string;
  indicators: GhanaCurriculumIndicator[];
}

export interface GhanaCurriculumSubStrand {
  id: string;
  name: string; // e.g. "Whole Numbers: Counting, Representation and Cardinality"
  contentStandards: GhanaCurriculumContentStandard[];
}

export interface GhanaCurriculumStrand {
  id: string;
  name: string; // e.g. "Strand 1: Number"
  subStrands: GhanaCurriculumSubStrand[];
}

export interface GhanaSubjectData {
  id: string;
  name: string; // e.g. "Mathematics"
  levels: string[]; // e.g. ["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6", "Basic 7", "Basic 8", "Basic 9"]
  strands: GhanaCurriculumStrand[];
}

export interface PlanFormInputs {
  weekEnding: string;
  selectedDays?: string[]; // e.g. ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  schoolName: string;
  teacherName: string;
  classLevel: string; // e.g., "Basic 4"
  subject: string; // e.g., "Mathematics"
  strand: string;
  subStrand: string;
  contentStandard: string;
  indicator: string;
  classSize: number;
  duration: string; // e.g., "60 Mins"
  numberOfDays: number; // e.g., 4
  nameOfHead: string; // Headteacher / Head of Dept
  references?: string;
  coreCompetencies?: string[]; // Auto-generated or custom core competencies
  exerciseTypes: {
    fillInBlanks: boolean;
    mcq: boolean;
    matching: boolean;
    application: boolean;
    diagram: boolean;
  };
  additionalInstructions?: string;
}

export interface ExerciseFillInBlank {
  id: string;
  dayNumber?: number;
  exerciseNumber?: number; // 1 or 2
  questionNumber?: number; // 1 to 5
  question: string; // Question with "___" blank
  blankAnswer: string;
}

export interface ExerciseMCQ {
  id: string;
  dayNumber?: number;
  exerciseNumber?: number; // 1 or 2
  questionNumber?: number; // 1 to 5
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface ExerciseMatchingPair {
  id: string;
  dayNumber?: number;
  exerciseNumber?: number; // 1 or 2
  questionNumber?: number; // 1 to 5
  itemA: string; // Column A
  itemB: string; // Column B
  matchKey: string; // Correct itemB match
}

export interface ExerciseApplication {
  id: string;
  dayNumber?: number;
  exerciseNumber?: number; // 1 or 2
  questionNumber?: number; // 1 to 5
  scenarioOrContext?: string; // Real-world Ghanaian context / practical scenario
  question: string; // Application question testing problem solving / practical execution
  sampleAnswer: string; // Model answer or marking guideline
}

export interface ExerciseDiagram {
  id: string;
  dayNumber?: number;
  exerciseNumber?: number; // 1 or 2
  questionNumber?: number; // 1 to 5
  diagramCategory: 'Picture Identification' | 'Diagram Labeling' | 'Trace Diagram & Shapes' | 'Trace Letters & Words' | 'Draw & Illustrate';
  diagramTitle: string; // e.g. "Parts of a Flowering Plant", "Letter 'A' Tracing", "Ghana Flag Tracing"
  diagramPrompt: string; // Instructions for learners e.g. "Trace the dotted outline of the mango and color it" or "Identify the labeled part (i)"
  diagramAsciiOrDescription?: string; // Visual representation / ASCII diagram / guide box text
  question: string;
  expectedAnswer: string; // Expected answer or completion note
}

export interface LearnerExercises {
  fillInBlanks: ExerciseFillInBlank[];
  mcqs: ExerciseMCQ[];
  matching: ExerciseMatchingPair[];
  application?: ExerciseApplication[];
  diagram?: ExerciseDiagram[];
}

export interface LearnerWritingNotes {
  title: string;
  introduction: string;
  keyDefinitions: { term: string; definition: string }[];
  mainContentPoints: { heading: string; body: string; bulletPoints?: string[] }[];
  summary: string;
}

export interface DailyLessonPlan {
  dayNumber: number;
  starter: {
    duration: string;
    teacherActivities: string;
    learnerActivities: string;
  };
  mainPhase: {
    duration: string;
    step1Teacher: string;
    step1Learner: string;
    step2Teacher: string;
    step2Learner: string;
    step3Teacher: string;
    step3Learner: string;
    assessmentMethod: string;
  };
  plenaryReflection: {
    duration: string;
    teacherSummary: string;
    learnerReflection: string;
  };
}

export interface LearnerPlanOutput {
  id: string;
  createdAt: string;
  inputs: PlanFormInputs;
  header: {
    weekEnding: string;
    selectedDays?: string[];
    classLevel: string;
    classSize: number;
    subject: string;
    duration: string;
    numberOfDays: number;
    strand: string;
    subStrand: string;
    contentStandard: string;
    indicator: string;
    performanceIndicator: string;
    references?: string;
    teachingResources: string[]; // TLMs
    coreCompetencies: string[];
    keyWords: string[];
    nameOfHead: string;
    teacherName: string;
    schoolName: string;
  };
  starter: {
    duration: string;
    teacherActivities: string;
    learnerActivities: string;
  };
  mainPhase: {
    duration: string;
    step1Teacher: string;
    step1Learner: string;
    step2Teacher: string;
    step2Learner: string;
    step3Teacher: string;
    step3Learner: string;
    assessmentMethod: string;
  };
  plenaryReflection: {
    duration: string;
    teacherSummary: string;
    learnerReflection: string;
  };
  dailyPlans?: DailyLessonPlan[];
  rcaQuestions: {
    reflect: string;
    connect: string;
    apply: string;
  };
  learnerWritingNotes: LearnerWritingNotes;
  exercises: LearnerExercises;
  generationMode: 'AI' | 'Offline Engine';
}

export interface ExtractedSchemeDetails {
  subject?: string;
  classLevel?: string;
  strand?: string;
  subStrand?: string;
  contentStandard?: string;
  indicator?: string;
  weekEnding?: string;
  teachingResources?: string[];
  schoolName?: string;
  teacherName?: string;
  duration?: string;
  classSize?: number;
  additionalNotes?: string;
}
