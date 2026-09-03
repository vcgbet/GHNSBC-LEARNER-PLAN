import { LearnerPlanOutput, PlanFormInputs, ExerciseFillInBlank, ExerciseMCQ, ExerciseMatchingPair, ExerciseApplication, ExerciseDiagram, DailyLessonPlan } from '../types';
import { GHANA_CURRICULUM_DATA } from '../data/ghanaCurriculum';
import { getAutoCoreCompetencies } from './coreCompetencies';
import { sanitizePerformanceIndicator } from './formatUtils';
import { getNaCCACurriculumReference } from './naccaReferences';

export function generateOfflinePlan(rawInputs: PlanFormInputs): LearnerPlanOutput {
  // Defensive normalisation — the server calls this with raw request bodies
  // that may be missing or null fields. Never let a partial payload crash
  // generation (on the server that would kill the whole process).
  const str = (v: unknown, fb: string) => (typeof v === 'string' && v.trim() !== '' ? v : fb);
  const num = (v: unknown, fb: number) => (typeof v === 'number' && isFinite(v) && v > 0 ? v : fb);
  const inputs: PlanFormInputs = {
    subject: str(rawInputs?.subject, 'Mathematics'),
    strand: str(rawInputs?.strand, 'Strand 1'),
    subStrand: str(rawInputs?.subStrand, 'General'),
    contentStandard: str(rawInputs?.contentStandard, 'B4.1.1.1'),
    indicator: str(rawInputs?.indicator, 'B4.1.1.1.1'),
    classLevel: str(rawInputs?.classLevel, 'Basic 4'),
    classSize: num(rawInputs?.classSize, 45),
    duration: str(rawInputs?.duration, '60 Mins'),
    numberOfDays: num(rawInputs?.numberOfDays, 4),
    weekEnding: str(rawInputs?.weekEnding, ''),
    schoolName: str(rawInputs?.schoolName, ''),
    teacherName: str(rawInputs?.teacherName, ''),
    nameOfHead: str(rawInputs?.nameOfHead, ''),
    selectedDays: Array.isArray(rawInputs?.selectedDays) ? rawInputs!.selectedDays : undefined,
    references: str(rawInputs?.references, ''),
    coreCompetencies: Array.isArray(rawInputs?.coreCompetencies) ? rawInputs!.coreCompetencies : undefined,
    additionalInstructions: str(rawInputs?.additionalInstructions, ''),
    exerciseTypes: {
      fillInBlanks: rawInputs?.exerciseTypes?.fillInBlanks !== false,
      mcq: rawInputs?.exerciseTypes?.mcq !== false,
      matching: rawInputs?.exerciseTypes?.matching !== false,
      application: rawInputs?.exerciseTypes?.application !== false,
      diagram: rawInputs?.exerciseTypes?.diagram !== false,
    },
  };

  // Find matching subject/indicator info if available
  const subj = GHANA_CURRICULUM_DATA.find(s => s.name.toLowerCase() === inputs.subject.toLowerCase()) || GHANA_CURRICULUM_DATA[0];

  // Find matching indicator or fallback
  let matchedIndicator = null;
  let matchedCS: any = null;
  for (const strand of subj.strands) {
    for (const subStrand of strand.subStrands) {
      for (const cs of subStrand.contentStandards) {
        for (const ind of cs.indicators) {
          if (ind.code.toLowerCase() === inputs.indicator.toLowerCase() || inputs.indicator.includes(ind.code)) {
            matchedIndicator = ind;
            matchedCS = cs;
            break;
          }
        }
      }
    }
  }

  const indicatorCode = matchedIndicator ? matchedIndicator.code : (inputs.indicator || 'B4.1.1.1.1');
  const indicatorDesc = matchedIndicator ? matchedIndicator.description : (inputs.indicator || 'Demonstrate understanding of key curriculum concepts.');
  const tlms = matchedIndicator?.suggestedTLMs || ['Charts and posters', 'Chalkboard / Whiteboard', 'Real-life physical objects (Realia)', 'Learner workbooks', 'Flashcards'];

  // Real curriculum material: the indicator's official NaCCA exemplars.
  // These contain worked examples (real numbers, real procedures) and are
  // used to make the offline notes/exercises specific to the actual topic
  // instead of generic filler.
  const exemplarText = ((matchedIndicator as any)?.exemplars || []).map((e: any) => (typeof e === 'string' ? e : '')).join(' ');
  const exemplarSentences = splitSentences(exemplarText);

  // Key vocabulary: prefer the indicator's own keywords, then real subject
  // terms found in the indicator description / exemplars.
  let keywords: string[] = (Array.isArray((matchedIndicator as any)?.keyWords) && (matchedIndicator as any).keyWords.length > 0)
    ? ((matchedIndicator as any).keyWords as string[])
    : extractKeyTerms(inputs.subject, `${indicatorDesc} ${exemplarText}`);

  const topic = inputs.subStrand || inputs.strand || inputs.subject;

  // Drop vocabulary candidates that have no real definition (they would only
  // produce circular "Key subject terminology ..." filler downstream), then
  // fall back to the generic list when nothing survives.
  keywords = keywords.filter(t => !isCircularDefinition(getTermDefinition(t, inputs.subject, topic, 0, exemplarText)));
  if (keywords.length === 0) keywords = ['Concept', 'Definition', 'Structure', 'Application', 'Analysis', 'Example'];
  keywords = keywords.slice(0, 8);
  const numDays = Math.max(1, inputs.numberOfDays || 1);

  // Helper to clean indicator description
  const cleanDesc = (desc: string) => desc.replace(/^(Learners?\s+will\s+be\s+able\s+to|Learners?\s+can)\s*:?\s*/i, '').trim();

  let siblingIndicators: string[] = [];
  if (matchedCS && matchedCS.indicators && matchedCS.indicators.length > 0) {
    siblingIndicators = matchedCS.indicators.map((i: any) => cleanDesc(i.description));
  }

  // Construct Performance Indicator(s)
  let performanceIndicator = '';
  if (numDays === 1) {
    performanceIndicator = `Learner can: ${cleanDesc(indicatorDesc)}`;
  } else {
    const dayIndicators: string[] = [];
    for (let d = 1; d <= numDays; d++) {
      let dayText = '';
      if (siblingIndicators[d - 1]) {
        dayText = siblingIndicators[d - 1];
      } else if (d === 1) {
        dayText = cleanDesc(indicatorDesc);
      } else if (d === 2) {
        dayText = `Demonstrate step-by-step application and problem solving for ${cleanDesc(indicatorDesc)}`;
      } else if (d === 3) {
        dayText = `Collaborate in group activities to analyze real-life scenarios related to ${cleanDesc(indicatorDesc)}`;
      } else if (d === 4) {
        dayText = `Independently solve tasks and evaluate understanding of ${cleanDesc(indicatorDesc)}`;
      } else {
        dayText = `Synthesize, review, and apply knowledge of ${cleanDesc(indicatorDesc)} in assessment exercises`;
      }
      dayIndicators.push(`Day ${d}: Learner can: ${dayText}`);
    }
    performanceIndicator = dayIndicators.join('\n');
  }

  // Automatically generated NaCCA Core Competencies
  const coreCompetencies = (inputs.coreCompetencies && inputs.coreCompetencies.length > 0)
    ? inputs.coreCompetencies
    : getAutoCoreCompetencies(inputs.subject, inputs.strand, inputs.subStrand);

  // Phase 1: Starter
  const starterTeacher = `1. Welcome learners warmheartedly and review prior knowledge on previous topic related to ${inputs.strand}.
2. Pose an engaging warm-up hook question or riddle on ${topic} to spark curiosity.
3. State the lesson objectives clearly and explain why learning about ${inputs.indicator || topic} is important in everyday Ghanaian life.`;

  const starterLearner = `1. Learners actively participate in warm-up activity and answer introductory questions.
2. Learners listen attentively to the lesson goals and state what they expect to learn today.`;

  // Phase 2: Main Phase (Formatted with Teacher: and Learners: pre-text)
  const step1Teacher = `Teacher:\n1. Introduce the main concept of ${topic} using ${tlms.slice(0, 2).join(' and ')}.\n2. Explicitly demonstrate step-by-step how to analyze and explain concepts related to ${indicatorDesc}.\n3. Highlight key vocabulary terms: ${keywords.slice(0, 4).join(', ')}. Ask probing questions to assess immediate understanding.`;

  const step1Learner = `Learners:\n1. Learners observe the teacher's step-by-step demonstration closely.\n2. Learners repeat key terminology, ask clarifying questions, and write detailed notes in their exercise books.`;

  const step2Teacher = `Teacher:\n1. Organize learners into heterogeneous small groups of 4-5 learners.\n2. Assign group tasks on ${topic} requiring learners to collaborate using provided ${tlms.slice(1, 3).join(' and ')}.\n3. Move around the classroom to facilitate group discussions, offer targeted guidance, and assess core competencies (Communication & Collaboration).`;

  const step2Learner = `Learners:\n1. Learners collaborate in groups, share ideas, discuss solutions, and record their findings on flipcharts/boards.\n2. Selected group leaders present their group work to the rest of the class.`;

  const step3Teacher = `Teacher:\n1. Distribute individual practice tasks from the workbook on ${indicatorCode}.\n2. Observe individual learner execution and provide constructive real-time feedback.\n3. Call on representative learners to share their solutions on the chalkboard.`;

  const step3Learner = `Learners:\n1. Learners work independently to complete assigned exercises in their exercise books.\n2. Learners peer-check and self-correct work under teacher direction.`;

  // Phase 3: Plenary / Reflection
  const plenaryTeacher = `1. Guide learners to summarize the core learning points of the lesson.
2. Commend active participation and address any lingering misconceptions about ${topic}.
3. Assign follow-up homework or practice questions.`;

  const plenaryLearner = `1. Learners state key takeaways from the lesson in their own words.
2. Learners record their homework assignment in their diaries/exercise books.`;

  // RCA Questions
  const rcaQuestions = {
    reflect: `Reflect: What was the most important concept or skill you mastered during our lessons on ${topic}?`,
    connect: `Connect: How does what we learned about ${topic} connect to your previous knowledge in ${inputs.strand}?`,
    apply: `Apply: How can you apply the knowledge of ${topic} to solve a real-life problem at home, in school, or in your local community in Ghana?`
  };

  // Subject-Tailored Learner Writing Notes
  const isHistoryOrHumanities = /history|social|owop|rme|culture|citizenship/i.test(inputs.subject);
  const isStem = /math|sci|comp|ict|tech/i.test(inputs.subject);

  const mainContentPoints = isHistoryOrHumanities ? [
    {
      heading: `1. Historical & Conceptual Context of ${topic}`,
      body: `Understanding the background and significance of ${topic} helps learners appreciate Ghana's heritage and historical development.`,
      bulletPoints: [
        `Curriculum Objective (${indicatorCode}): ${indicatorDesc}`,
        `Historical Significance: ${topic} plays an essential role in understanding past events, key people, and traditions in Ghana.`,
        `Core Vocabulary: Master key historical terms such as ${keywords.slice(0, 4).join(', ')}.`,
        `Civic & National Value: Learning about ${topic} fosters national identity, unity, patriotism, and community responsibility.`
      ]
    },
    {
      heading: `2. Key Historical Events, Evidence & Significance`,
      body: `When studying ${topic}, focus on the following core facts, timelines, and primary/secondary evidence:`,
      bulletPoints: [
        `Historical Evidence: Examine photographs, oral traditions, artifacts, or written documents related to ${topic}.`,
        `Causes and Consequences: Understand why events occurred and how they impacted local communities and Ghana as a nation.`,
        `Sequential Timeline: Follow a chronological order when recording historical events in your exercise book.`
      ]
    },
    {
      heading: `3. Revision Guidelines & Key Lessons`,
      body: `To perform excellently in exercises and test questions on ${topic}, follow these study tips:`,
      bulletPoints: [
        `Memorize key definitions and historical details for terms like ${keywords.slice(0, 3).join(', ')}.`,
        `Answer exercise questions neatly with clear explanations and accurate facts.`,
        `Participate actively in group discussions and present your findings confidently.`
      ]
    }
  ] : isStem ? [
    {
      heading: `1. Fundamentals & Core Rules of ${topic}`,
      body: `Understanding the essential principles of ${topic} allows learners to build accuracy, logical reasoning, and problem-solving speed.`,
      bulletPoints: [
        `Curriculum Objective (${indicatorCode}): ${indicatorDesc}`,
        `Primary Rule: Always follow a systematic, step-by-step procedure when working with ${topic}.`,
        `Standard Representation: Use clear diagrams, standard units, symbols, and mathematical/scientific notation.`,
        `Everyday Application: ${topic} is frequently used in local trading, measurement, computing, and environmental management in Ghana.`
      ]
    },
    {
      heading: `2. Step-by-Step Problem Solving & Principles`,
      body: `When solving exercises or real-life problems related to ${topic}, follow this proven 3-step method:`,
      bulletPoints: [
        `Step 1 (Analyze): Read the problem carefully. Identify given facts and what you are required to calculate or explain.`,
        `Step 2 (Execute): Choose the appropriate rule, method, or formula for ${topic} and carry out the steps systematically.`,
        `Step 3 (Verify): Double-check your final answer against the original question to ensure accuracy and correct units.`
      ]
    },
    {
      heading: `3. Key Strategies & Common Errors to Avoid`,
      body: `To achieve high scores in class exercises and term tests, keep these tips in mind:`,
      bulletPoints: [
        `Show all working steps clearly in your exercise book rather than writing only final answers.`,
        `Master all key terminology: ${keywords.slice(0, 3).join(', ')}.`,
        `Avoid rushing: double-check calculations, spelling, or scientific labels before turning in your exercise book.`
      ]
    },
    ...(exemplarSentences.length > 0 ? [{
      heading: `4. Worked Example from the Official Curriculum`,
      body: `Work through this example from the NaCCA curriculum guide, copying each step into your exercise book:`,
      bulletPoints: exemplarSentences.slice(0, 3)
    }] : [])
  ] : [
    {
      heading: `1. Core Concepts & Overview of ${topic}`,
      body: `Mastering ${topic} under ${inputs.strand} provides learners with essential knowledge and practical skills.`,
      bulletPoints: [
        `Curriculum Objective (${indicatorCode}): ${indicatorDesc}`,
        `Key Vocabulary: Understand definitions for ${keywords.slice(0, 4).join(', ')}.`,
        `Practical Significance: Apply these concepts in daily school and community activities.`
      ]
    },
    {
      heading: `2. Detailed Explanation & Guidance`,
      body: `Follow these key points when studying ${topic} in your exercise book:`,
      bulletPoints: [
        `Pay close attention to teacher demonstrations and group discussion findings.`,
        `Use standard terminology and neat handwriting when answering questions.`,
        `Review key examples and practice tasks regularly.`
      ]
    },
    {
      heading: `3. Summary & Study Advice`,
      body: `To excel in class assessment exercises:`,
      bulletPoints: [
        `Revise key vocabulary and definitions every day.`,
        `Complete all assigned classwork and homework exercises neatly.`,
        `Ask clarifying questions during lesson sessions.`
      ]
    }
  ];

  const learnerNotes = {
    title: `LEARNER NOTES & STUDY SUMMARY: ${inputs.subject.toUpperCase()} - ${inputs.subStrand.toUpperCase()}`,
    introduction: `Welcome to our study guide on ${topic} under ${inputs.strand}. In Ghana's National Standard-Based Curriculum (NSBC), mastering ${topic} provides you with foundational knowledge, logical reasoning skills, and practical tools for academic success and everyday decision-making in your community.`,
    keyDefinitions: keywords.map((kw, idx) => ({
      term: kw,
      definition: getTermDefinition(kw, inputs.subject, topic, idx, exemplarText)
    })),
    mainContentPoints,
    summary: `SUMMARY & REVISION TAKEAWAY: ${topic} is an integral part of ${inputs.strand} (${inputs.contentStandard || 'NSBC Standard'}). To master this topic, regularly review your key definitions (${keywords.join(', ')}), practice all assigned exercises across the ${numDays} lesson day(s), and apply these principles in daily activities!`
  };

  // Generate Multi-Day Exercises (2 FIBs, 2 MCQs, 2 Matching, 2 Application, 2 Diagram per day - 5 Qs each)
  const fillInBlanks: ExerciseFillInBlank[] = [];
  const mcqs: ExerciseMCQ[] = [];
  const matching: ExerciseMatchingPair[] = [];
  const application: ExerciseApplication[] = [];
  const diagram: ExerciseDiagram[] = [];

  for (let day = 1; day <= numDays; day++) {
    fillInBlanks.push(...generateDailyFillInBlanks(day, inputs, keywords, topic, exemplarSentences));
    mcqs.push(...generateDailyMCQs(day, inputs, keywords, topic, exemplarSentences));
    matching.push(...generateDailyMatchingPairs(day, inputs, keywords, topic, exemplarSentences, exemplarText));
    application.push(...generateDailyApplicationExercises(day, inputs, keywords, topic, exemplarSentences));
    diagram.push(...generateDailyDiagramExercises(day, inputs, keywords, topic, exemplarSentences));
  }

  // Generate Daily Lesson Plans
  const dailyPlans: DailyLessonPlan[] = [];
  for (let day = 1; day <= numDays; day++) {
    dailyPlans.push({
      dayNumber: day,
      starter: {
        duration: '10 Mins',
        teacherActivities: `1. (Day ${day}) Warmly welcome learners and review prior learning on ${topic}.\n2. Share Day ${day}'s key objective for ${indicatorCode}.\n3. Ask an engaging introductory hook question to spark curiosity.`,
        learnerActivities: `1. Learners actively answer review questions from previous work.\n2. Learners share their thoughts on Day ${day}'s warm-up question.`
      },
      mainPhase: {
        duration: '40 Mins',
        step1Teacher: `Teacher:\n1. (Day ${day} Demonstration) Introduce Day ${day}'s specific concept under ${topic} using ${tlms[0] || 'TLMs'}.\n2. Explicitly model problem-solving and historical/conceptual analysis step-by-step, highlighting key terms (${keywords.slice(0, 3).join(', ')}).`,
        step1Learner: `Learners:\n1. Learners observe teacher demonstration attentively and write detailed notes in their exercise books.\n2. Learners ask clarifying questions.`,
        step2Teacher: `Teacher:\n1. (Day ${day} Group Work) Assign group activity task #${day} on ${indicatorDesc}.\n2. Monitor group discussions and assess collaboration and critical thinking.`,
        step2Learner: `Learners:\n1. Learners collaborate in small groups to solve assigned tasks on flipcharts.\n2. Group leaders present their solutions to the class.`,
        step3Teacher: `Teacher:\n1. (Day ${day} Independent Practice) Assign Day ${day}'s exercises (MCQs, Fill-in-the-Blanks, and Matching Pairs).\n2. Provide targeted assistance to individual learners.`,
        step3Learner: `Learners:\n1. Learners independently complete Day ${day}'s exercises in their exercise books.`,
        assessmentMethod: `Day ${day} Assessment: Group work evaluation, exercise book marking, and oral Q&A.`
      },
      plenaryReflection: {
        duration: '10 Mins',
        teacherSummary: `1. Summarize Day ${day}'s main lesson points.\n2. Address lingering questions and assign Day ${day}'s revision task.`,
        learnerReflection: `1. Learners share their key takeaway from Day ${day}'s lesson.\n2. Learners record homework in their exercise books.`
      }
    });
  }

  return {
    id: `plan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    inputs,
    header: {
      weekEnding: inputs.weekEnding || '16th October, 2026',
      selectedDays: (inputs.selectedDays && inputs.selectedDays.length > 0)
        ? inputs.selectedDays
        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, numDays),
      classLevel: inputs.classLevel || 'Basic 4',
      classSize: inputs.classSize || 45,
      subject: inputs.subject || 'Mathematics',
      duration: inputs.duration || '60 Mins',
      numberOfDays: numDays,
      strand: inputs.strand || 'Strand 1',
      subStrand: inputs.subStrand || 'Sub-strand 1',
      contentStandard: inputs.contentStandard || 'B4.1.1.1',
      indicator: indicatorCode,
      performanceIndicator,
      references: (inputs.references && inputs.references.trim() !== '' && !inputs.references.toLowerCase().includes('nacca standard curriculum guide'))
        ? inputs.references
        : getNaCCACurriculumReference(inputs.subject || 'Mathematics', inputs.classLevel || 'Basic 4', inputs.strand, inputs.subStrand, indicatorCode),
      teachingResources: tlms,
      coreCompetencies,
      keyWords: keywords,
      nameOfHead: inputs.nameOfHead || 'Mr. Kwesi Mensah',
      teacherName: inputs.teacherName || 'Class Teacher',
      schoolName: inputs.schoolName || 'Adom Basic School'
    },
    starter: dailyPlans[0].starter,
    mainPhase: dailyPlans[0].mainPhase,
    plenaryReflection: dailyPlans[0].plenaryReflection,
    dailyPlans,
    rcaQuestions,
    learnerWritingNotes: learnerNotes,
    exercises: {
      fillInBlanks,
      mcqs,
      matching,
      application,
      diagram
    },
    generationMode: 'Offline Engine'
  };
}

function getTermDefinition(term: string, subject: string, topic: string, index: number, exemplarText: string = ''): string {
  const definitions: Record<string, string> = {
    // History Terms
    'History': 'The study and systematic recording of past human events, achievements, and developments.',
    'Past Events': 'Occurrences, actions, and milestones that happened in earlier times.',
    'Evidence': 'Facts, artifacts, or records used to prove or support historical claims.',
    'Patriotism': 'Love, devotion, and sense of attachment to one\'s country, Ghana.',
    'Sources of History': 'Materials, oral accounts, or objects that provide information about the past.',
    'Oral Tradition': 'Historical knowledge, stories, and customs passed down by word of mouth through generations.',
    'Primary Source': 'First-hand, contemporary evidence from the period being studied (e.g., artifacts, eyewitness accounts).',
    'Secondary Source': 'Second-hand accounts or interpretations written after an event (e.g., history textbooks, biographies).',
    'Artifacts': 'Man-made objects of cultural or historical interest, such as ancient tools, beads, and pottery.',
    'Archaeology': 'The study of human history and prehistory through the excavation of sites and analysis of artifacts.',
    'Written Records': 'Documents, letters, and books that preserve information in written text.',
    'Migration': 'The movement of people from one region or homeland to settle in a new location.',
    'Ethnic Group': 'A group of people sharing a common culture, language, heritage, and ancestral lineage.',
    'Ancestors': 'Forebears or family members from past generations from whom people are descended.',
    'Settlement': 'A community or location established by a group of people as their permanent home.',
    'Gold Coast': 'The historical name given to the coastal territory of present-day Ghana due to its abundance of gold.',
    'Tradition': 'Customs, beliefs, and practices handed down from generation to generation.',
    'Heritage': 'Valued cultural traditions, monuments, and history passed down from ancestors.',
    'Forts': 'Strong fortified buildings erected by Europeans along the coast for trade and defense.',
    'Castles': 'Large fortified residences and administrative centers built by Europeans along the coast of Ghana.',
    'Cape Coast Castle': 'A major historical castle located in Cape Coast used during European trade and the slave trade era.',
    'Elmina Castle': 'The oldest European building in Sub-Saharan Africa, erected by the Portuguese in 1482 at Elmina.',
    'Trans-Atlantic Trade': 'The historical trade network across the Atlantic Ocean involving goods and enslaved human beings.',
    'Dungeon': 'A dark, underground cell in castles where captives were held prior to transportation.',
    'UNESCO Heritage': 'Sites recognized internationally by UNESCO for their outstanding universal historical value.',
    'Portuguese': 'The European nation whose navigators were the first to arrive on the Gold Coast in 1471.',
    'Diego d\'Azambuja': 'The Portuguese explorer who led the construction of Elmina Castle (Castle of St. George) in 1482.',
    'Barter Trade': 'The exchange of goods directly for other goods without using paper money.',
    'Elmina': 'A historic coastal town in Ghana famous for its early Portuguese contact and castle.',
    'Ivory': 'Hard white material from the tusks of elephants, historically traded along the Gold Coast.',
    'Bond of 1844': 'An agreement signed on 6th March 1844 between British Lieutenant-Governor Commander Hill and Fante Chiefs.',
    'Commander Hill': 'The British official who signed the Bond of 1844 with Fante traditional rulers.',
    'Fante Confederation': 'An alliance formed by Fante chiefs to promote self-governance and economic independence.',
    'Colonial Rule': 'Control and governance of a territory and its people by a foreign power.',
    'Jurisdiction': 'The official power or authority to make legal decisions and judgments in a defined area.',
    'Gold Coast Colony': 'The name of the British colony established in southern Ghana in 1874.',
    'Big Six': 'The six leading Ghanaian nationalist leaders who spearheaded the fight for independence (Nkrumah, Danquah, Akufo-Addo, Obetsebi-Lamptey, Ako-Adjei, Ofori Atta).',
    'Kwame Nkrumah': 'Ghana\'s first Prime Minister and President, who declared independence on 6th March 1957.',
    'J.B. Danquah': 'A prominent scholar, lawyer, and nationalist who coined the name "Ghana" for the Gold Coast.',
    '1948 Riots': 'Civil unrest in 1948 following the shooting of ex-servicemen at Christiansborg Crossroads.',
    'Sergeant Adjetey': 'An ex-serviceman who was shot and killed at Christiansborg Crossroads on 28th February 1948.',
    'UGCC': 'United Gold Coast Convention, the first political movement formed in 1947 to seek self-government.',
    'CPP': 'Convention People\'s Party, the political party founded by Kwame Nkrumah in 1949 that led Ghana to independence.',
    'Independence': 'Freedom from foreign colonial rule and attaining full political self-governance.',
    '6th March 1957': 'The historic day Ghana officially gained independence from British rule.',
    'Theodosia Okoh': 'The distinguished Ghanaian woman who designed the Ghana national flag (Red, Gold, Green with Black Star).',
    'Amon Kotei': 'The Ghanaian artist who designed the national Coat of Arms of Ghana.',
    'Self-Government': 'The right and capacity of a country\'s people to govern themselves independently.',

    // Math Terms
    'Thousands': 'A place value position equal to 10 hundreds (1,000).',
    'Place Value': 'The numerical value a digit has by virtue of its position in a number.',
    'Expanded Form': 'A way to write numbers by showing the value of each digit added together.',
    'Digit': 'A single symbol used to make numerals (0, 1, 2, 3, 4, 5, 6, 7, 8, 9).',
    'Representation': 'Modeling a mathematical or scientific idea using charts, blocks, or symbols.',
    'Compare': 'To analyze two or more numbers to determine which is greater, lesser, or equal.',
    'Sum': 'The result obtained by adding two or more numbers together.',
    'Difference': 'The result obtained by subtracting one number from another.',
    'Algorithm': 'A step-by-step procedure or set of rules for solving a problem.',
    'Numerator': 'The top number in a fraction indicating how many equal parts are taken.',
    'Denominator': 'The bottom number in a fraction indicating the total number of equal parts.',

    // Science Terms
    'Photosynthesis': 'The process by which green plants make food using sunlight, water, and carbon dioxide.',
    'Chlorophyll': 'The green pigment in plant leaves that absorbs light energy for photosynthesis.',
    'Roots': 'The underground part of a plant that absorbs water and minerals from the soil.',
    'Hygiene': 'Conditions or practices conducive to maintaining health and preventing disease.',
    'Sanitation': 'Public health practices related to clean water supply and hygienic waste disposal.',
    'Environment': 'The surrounding physical conditions, living organisms, and climate in an area.',

    // Computing Terms
    'Hardware': 'Physical components of a computer system that you can see and touch.',
    'Software': 'Programs and operating instructions used by a computer.',
    'Input Device': 'Hardware used to enter data into a computer (e.g. keyboard, mouse).',
    'Output Device': 'Hardware used to display or print results from a computer (e.g. monitor, printer).',

    // Core Science Terms
    'Solid': 'A state of matter that has a definite shape and volume (e.g. ice, wood, stone).',
    'Liquid': 'A state of matter that flows and takes the shape of its container (e.g. water, oil).',
    'Gas': 'A state of matter that spreads out to fill its container (e.g. air, steam).',
    'Matter': 'Anything that has mass and takes up space.',
    'Mixture': 'A substance made by combining two or more materials without a chemical reaction (e.g. sand and sugar).',
    'Solution': 'A mixture in which one substance is dissolved evenly in another (e.g. salt solution).',
    'Energy': 'The ability to do work or cause change (e.g. light, heat, sound, chemical energy).',
    'Force': 'A push or a pull acting on an object.',

    // JHS Math Terms
    'Standard Form': 'Writing a number using digits only (for example 2,408,321 instead of words).',
    'Significant Figures': 'The meaningful digits in a number, starting from the first non-zero digit, used for approximation.',
    'Decimal Places': 'The digits that appear after the decimal point in a decimal numeral.',
    'Rounding': 'Approximating a number to the nearest place value (nearest ten, hundred, thousand, etc.).',
    'Round Off': 'To replace a number by an approximation to the nearest specified place value.',
    'Billion': 'A number equal to one thousand million (1,000,000,000).',
    'Million': 'A number equal to one thousand thousand (1,000,000).',
    'Hundred-Thousand': 'A place value equal to one hundred thousands (100,000).',
    'Skip Count': 'Counting forwards or backwards in equal steps (for example 10, 20, 30 or 10,000, 20,000).',
    'Order': 'Arranging numbers from smallest to largest (ascending) or largest to smallest (descending).',
    'Integer': 'A whole number, positive or negative, with no fractional part.',
    'Numeral': 'A symbol or group of symbols used to represent a number (for example 8 or VIII).',
    'Number Words': 'The word form of a number (for example "one million" for 1,000,000).'
  };

  if (definitions[term]) return definitions[term];

  // Derive a real definition from the official curriculum text if the term
  // appears in the indicator description or its exemplars.
  const derived = deriveDefinitionFromText(term, `${topic} ${exemplarText}`);
  if (derived) return derived;

  return `Key subject terminology in ${subject} representing "${term}" as studied under ${topic}.`;
}

// ─────────────────────────────────────────────────────────────────────────
// Exemplar-driven content helpers.
// The curriculum data carries official NaCCA "exemplars" for each indicator
// (real worked examples, real numbers). These helpers turn that material
// into topic-accurate fill-in-the-blank / MCQ / matching / diagram content
// so the offline engine stops emitting generic filler. Everything here is
// deterministic (no Math.random) so repeated generations are stable.
// ─────────────────────────────────────────────────────────────────────────

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function splitSentences(text: string): string[] {
  if (!text) return [];
  const norm = text.replace(/\s+/g, ' ').trim();
  const parts = norm.split(/(?<=[.!?])\s+/);
  const out: string[] = [];
  const seen = new Set<string>();
  for (let p of parts) {
    p = p.trim();
    // Strip list markers that the source text glues onto sentence fragments
    // ("(i) ..." at the start, "iii." at the end).
    p = p.replace(/^\s*\([ivx]+\)\s*/i, '').replace(/\s*\(?[ivx]+\)?\.\s*$/i, '').trim();
    if (p.length < 25) continue;
    if (!/[a-zA-Z]{3}/.test(p)) continue;
    const key = p.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
    if (out.length >= 60) break;
  }
  return out;
}

interface ClozeSpan { sentence: string; blanked: string; answer: string; }

function findClozeSpan(sentence: string, terms: string[]): ClozeSpan | null {
  // Prefer a substantial number (with or without a unit word).
  const matches = [...sentence.matchAll(/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*(?:billion|million|thousand|percent|degrees?))?/g)];
  matches.sort((a, b) => b[0].length - a[0].length);
  for (const m of matches) {
    const span = m[0].trim();
    const digits = span.replace(/[^\d.]/g, '');
    if (digits.length < 3) continue; // skip list markers like "i." or trivial counts
    if (sentence.split(span).length - 1 > 1) continue; // answer would stay visible
    const blanked = sentence.replace(m[0], '____');
    if (/^\s*____[a-zA-Z]*\)/.test(blanked)) continue; // blank inside a fragment like "4.5kg)"
    if (blanked.length > 20 && blanked !== sentence) return { sentence, blanked, answer: span };
  }
  // Otherwise blank a real subject term (singular or plural, exactly once).
  for (const t of terms) {
    if (!t) continue;
    const re = new RegExp(`\\b(${escapeRegExp(t)}s?)\\b`, 'gi');
    const hits = sentence.match(re);
    if (!hits || new Set(hits.map(h => h.toLowerCase())).size > 1) continue;
    if (hits.length > 1) continue;
    const blanked = sentence.replace(re, '____');
    if (/^\s*____[a-zA-Z]*\)/.test(blanked)) continue;
    if (blanked.length > 20) return { sentence, blanked, answer: hits[0] };
  }
  return null;
}

function numberDistractors(answer: string): string[] {
  const m = answer.match(/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)/);
  if (!m) return [];
  const numPart = m[1];
  const unit = answer.replace(numPart, '').trim();
  const raw = numPart.replace(/,/g, '');
  const isFloat = raw.includes('.');
  const base = isFloat ? parseFloat(raw) : parseInt(raw, 10);
  if (!isFinite(base) || base <= 0) return [];
  const out = new Set<string>();
  const add = (n: number) => {
    if (!isFinite(n) || n <= 0 || n === base) return;
    out.add(isFloat ? String(n) : Math.round(n).toLocaleString('en-US'));
  };
  const scale = base >= 1000 ? Math.max(1, Math.round(base / 100)) : Math.max(1, Math.round(base / 10));
  add(base + scale);
  add(base - scale);
  add(base * 10);
  add(base / 10 >= 1 ? Math.round(base / 10) : base + scale * 2);
  return Array.from(out).slice(0, 3).map(s => (unit ? `${s} ${unit}` : s));
}

function termDistractors(answer: string, terms: string[]): string[] {
  const out: string[] = [];
  // Morphological twins (liquids/Liquid) are not valid distractors.
  const stem = answer.toLowerCase().replace(/s$/, '');
  for (const t of terms) {
    if (!t || t.toLowerCase() === answer.toLowerCase()) continue;
    if (t.toLowerCase().replace(/s$/, '') === stem) continue;
    out.push(t);
    if (out.length >= 3) break;
  }
  const fillers = ['An unrelated term from another strand', 'A term not covered in this lesson', 'A vocabulary word from a different topic'];
  let fi = 0;
  while (out.length < 3 && fi < fillers.length) out.push(fillers[fi++]);
  return out;
}

function buildClozeMCQ(day: number, ex: number, q: number, cloze: ClozeSpan, distractors: string[]): ExerciseMCQ {
  const uniq: string[] = [cloze.answer];
  for (const d of distractors) {
    if (uniq.length >= 4) break;
    if (!uniq.some(u => u.toLowerCase() === d.toLowerCase())) uniq.push(d);
  }
  const pads = ['None of these', 'A value not shown in the curriculum example', 'An unrelated figure from another strand'];
  let pi = 0;
  while (uniq.length < 4 && pi < pads.length) uniq.push(pads[pi++]);
  const all = uniq.slice(0, 4);
  const shift = (day * 3 + ex * 2 + q) % all.length;
  const shuffled = all.slice(shift).concat(all.slice(0, shift));
  const letters = ['A', 'B', 'C', 'D'] as const;
  return {
    id: `mcq_cloze_d${day}_ex${ex}_q${q}`,
    dayNumber: day,
    exerciseNumber: ex,
    questionNumber: q,
    question: `(Day ${day} • Exercise ${ex}) Complete the statement with the correct option: "${cloze.blanked}"`,
    options: { A: shuffled[0], B: shuffled[1], C: shuffled[2], D: shuffled[3] },
    correctOption: letters[shuffled.indexOf(cloze.answer)],
    explanation: `The official curriculum example reads: "${cloze.sentence}"`
  };
}

const SUBJECT_TERM_SCANS: Record<string, string[]> = {
  math: ['Place Value', 'Standard Form', 'Significant Figures', 'Significant Figure', 'Decimal Places', 'Decimal Place', 'Decimal Numerals', 'Decimals', 'Rounding', 'Round Off', 'Whole Numbers', 'Integers', 'Number Words', 'Numerals', 'Billion', 'Million', 'Hundred-Thousand', 'Thousands', 'Hundreds', 'Expanded Form', 'Digits', 'Digit', 'Compare', 'Order', 'Skip Count', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Fraction', 'Percentage', 'Percent', 'Ratio', 'Proportion', 'Area', 'Perimeter', 'Volume', 'Angle', 'Triangle', 'Circle', 'Square', 'Rectangle', 'Polygon', 'Symmetry', 'Frequency', 'Histogram', 'Bar Chart', 'Pie Chart', 'Mode', 'Mean', 'Median', 'Range', 'Probability', 'Sample Space', 'Sequence', 'Pattern', 'Algebraic Expression', 'Equation', 'Formula', 'Estimate', 'Estimation', 'Scale', 'Bearing', 'Currency', 'Mass', 'Length', 'Temperature', 'Capacity', 'Rate', 'Speed'],
  science: ['Photosynthesis', 'Chlorophyll', 'Plant', 'Plants', 'Cell', 'Cells', 'Organism', 'Organisms', 'Habitat', 'Ecosystem', 'Biodiversity', 'Matter', 'Energy', 'Force', 'Motion', 'Density', 'Solubility', 'Soluble', 'Insoluble', 'States of Matter', 'Solid', 'Liquid', 'Gas', 'Acid', 'Base', 'Circuit', 'Conductor', 'Insulator', 'Magnet', 'Magnetic', 'Weather', 'Climate', 'Soil', 'Water', 'Air', 'Nutrition', 'Digestion', 'Respiration', 'Reproduction', 'Vertebrates', 'Invertebrates', 'Flowering Plants', 'Seed', 'Seeds', 'Root', 'Stem', 'Leaf', 'Leaves', 'Flower', 'Fruit', 'Food Chain', 'Food Web', 'Pollution', 'Conservation', 'Recycling', 'Hygiene', 'Sanitation', 'Disease', 'Diseases', 'Virus', 'Bacteria', 'Nutrients', 'Carbohydrates', 'Protein', 'Vitamins', 'Minerals', 'Skeleton', 'Muscles', 'Organs', 'Environment'],
  english: ['Vocabulary', 'Grammar', 'Tense', 'Tenses', 'Subject', 'Predicate', 'Noun', 'Nouns', 'Verb', 'Verbs', 'Adjective', 'Adjectives', 'Adverb', 'Adverbs', 'Sentence', 'Sentences', 'Paragraph', 'Reading', 'Comprehension', 'Spelling', 'Pronunciation', 'Composition', 'Dialogue', 'Idiom', 'Synonyms', 'Antonyms', 'Phonics', 'Sight Words', 'Literacy', 'Fluency', 'Audience', 'Tone', 'Style', 'Literature', 'Poem', 'Poetry', 'Prose', 'Fable', 'Folk Tale', 'Character', 'Plot', 'Moral', 'Theme', 'Inference', 'Summary', 'Retelling', 'Punctuation', 'Capitalisation', 'Vowel', 'Consonant', 'Phrases', 'Clause', 'Clauses', 'Prefix', 'Suffix', 'Root Word', 'Compound Word', 'Homophones'],
  computing: ['Hardware', 'Software', 'Input Device', 'Output Device', 'Processor', 'Memory', 'Storage', 'Internet', 'Network', 'Computer', 'System Unit', 'Keyboard', 'Monitor', 'Mouse', 'Printer', 'Algorithm', 'Flowchart', 'Program', 'Data', 'Information', 'Cyber Security', 'Operating System', 'Application Software', 'Utility Software', 'Icon', 'Window', 'File', 'Folder', 'Search Engine', 'Website', 'Email', 'Attachment', 'Password', 'Account', 'Device', 'Sensors', 'Robots', 'Automation'],
  generic: ['Concept', 'Principle', 'Method', 'Procedure', 'System', 'Process', 'Feature', 'Element', 'Component', 'Structure', 'Function', 'Application', 'Analysis', 'Evaluation', 'Strategy', 'Technique', 'Tool', 'Skill', 'Knowledge', 'Understanding']
};

function extractKeyTerms(subject: string, text: string): string[] {
  if (!text) return [];
  const s = (subject || '').toLowerCase();
  const lists: string[][] = [];
  if (s.includes('math')) lists.push(SUBJECT_TERM_SCANS.math);
  if (s.includes('sci')) lists.push(SUBJECT_TERM_SCANS.science);
  if (s.includes('english') || s.includes('language')) lists.push(SUBJECT_TERM_SCANS.english);
  if (s.includes('comput') || s.includes('ict')) lists.push(SUBJECT_TERM_SCANS.computing);
  lists.push(SUBJECT_TERM_SCANS.generic);
  const seen = new Set<string>();
  const found: string[] = [];
  const sorted = lists.flat().sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    // s? = also match the plural form in the source text.
    if (new RegExp(`\\b${escapeRegExp(term)}s?\\b`, 'i').test(text)) {
      seen.add(key);
      found.push(term);
      if (found.length >= 8) break;
    }
  }
  return found;
}

// Derive a definition from the curriculum text: only accept a whole
// sentence that STARTS with the term (otherwise the capture is just a
// mid-sentence fragment, not a definition).
function deriveDefinitionFromText(term: string, text: string): string | null {
  if (!term || !text) return null;
  for (const s of splitSentences(text)) {
    let t = s.replace(/^(the|a|an)\s+/i, '');
    if (!new RegExp(`^${escapeRegExp(term)}s?\\b`, 'i').test(t)) continue;
    if (t.length < 30) continue;
    if (/\b[a-z]\.$/.test(t)) continue; // truncated by an initial like "i." or "e."
    if (t.length > 160) t = t.slice(0, 157).replace(/\s+\S*$/, '') + '...';
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  return null;
}

const isCircularDefinition = (d: string) => /^Key subject terminology in .+ representing ".*" as studied under/.test(d);

function findChartNumber(text: string): string | null {
  if (!text) return null;
  const grouped = text.match(/\d{1,3}(?:,\d{3})+/g) || [];
  for (const g of grouped) {
    const d = g.replace(/,/g, '');
    if (d.length >= 4 && d.length <= 9) return g;
  }
  const plain = text.match(/\b\d{4,9}\b/g) || [];
  return plain.length > 0 ? plain[0] : null;
}

function buildPlaceValueChart(num: string): { chart: string; question: string; expectedAnswer: string } | null {
  const digits = num.replace(/,/g, '');
  if (!/^\d{3,10}$/.test(digits)) return null;
  const names = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten-Thousands', 'Hundred-Thousands', 'Millions', 'Ten-Millions', 'Hundred-Millions', 'Billions'];
  const letters = 'ABCDEFGH'.split('');
  const reversed = digits.split('').reverse();
  const rows: string[] = [];
  for (let i = 0; i < reversed.length; i++) {
    const d = parseInt(reversed[i], 10);
    const value = d * Math.pow(10, i);
    rows.push(`│  (${letters[i]}) ${d} is in the ${names[i]} place : value ${value.toLocaleString('en-US')}`);
  }
  const chart = `┌──────────────────────────────────────────────────────────────┐\n│  [ PLACE VALUE CHART: ${num} ]\n` + rows.join('\n') + `\n└──────────────────────────────────────────────────────────────┘`;
  const top = digits.length - 1;
  const topValue = parseInt(digits[0], 10) * Math.pow(10, top);
  return {
    chart,
    question: `Write the place value of each digit in ${num}. Which letter points to the digit with the GREATEST value, and what is that value?`,
    expectedAnswer: `The greatest value is in the ${names[top]} place: ${digits[0]} x ${Math.pow(10, top).toLocaleString('en-US')} = ${topValue.toLocaleString('en-US')}.`
  };
}

// Helper to check if class level is lower primary / early childhood
function isLowerClassLevel(classLevel: string): boolean {
  const cl = (classLevel || '').toLowerCase();
  return cl.includes('nursery') || cl.includes('kg') || cl.includes('kindergarten') || cl.includes('basic 1') || cl.includes('basic 2') || cl.includes('basic 3') || cl.includes('b1') || cl.includes('b2') || cl.includes('b3') || cl.includes('class 1') || cl.includes('class 2') || cl.includes('class 3');
}

// Generate 2 FIB Exercises (5 Questions each = 10 questions) for a specific Day
function generateDailyFillInBlanks(day: number, inputs: PlanFormInputs, keywords: string[], topic: string, sentences: string[] = []): ExerciseFillInBlank[] {
  const safeKeywords = (keywords && keywords.length > 0)
    ? keywords
    : ['Concept', 'Principle', 'Method', 'Application', 'Analysis', 'Evaluation', 'Structure', 'Function', 'Process', 'System'];

  const getKw = (offset: number) => safeKeywords[(day * 3 + offset) % safeKeywords.length];

  // Cloze blanks taken from the official NaCCA exemplar sentences for this
  // indicator (each sentence used at most once per day, deterministically).
  const realClozes: ClozeSpan[] = [];
  for (const s of sentences) {
    const c = findClozeSpan(s, safeKeywords);
    if (c) realClozes.push(c);
  }
  const usedSentences = new Set<string>();
  const takeCloze = (ex: number, qn: number): ClozeSpan | null => {
    if (realClozes.length === 0) return null;
    const start = (day + ex + qn) % realClozes.length;
    for (let k = 0; k < realClozes.length; k++) {
      const c = realClozes[(start + k) % realClozes.length];
      if (!usedSentences.has(c.sentence)) { usedSentences.add(c.sentence); return c; }
    }
    return null;
  };
  const fib = (ex: number, qn: number, fbQuestion: string, fbAnswer: string): { question: string; blankAnswer: string } => {
    const c = takeCloze(ex, qn);
    if (c) return {
      question: `(Day ${day} • Exercise ${ex}) Fill in the blank from the curriculum example: "${c.blanked}"`,
      blankAnswer: c.answer
    };
    return { question: fbQuestion, blankAnswer: fbAnswer };
  };

  const ex1: ExerciseFillInBlank[] = [
    {
      id: `fib_d${day}_ex1_q1`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 1,
      ...fib(1, 1, `(Day ${day} • Exercise 1) In our study of ${topic}, the core term "____" is defined as: ${getTermDefinition(getKw(0), inputs.subject, topic, 0)}`, getKw(0))
    },
    {
      id: `fib_d${day}_ex1_q2`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 2,
      ...fib(1, 2, `(Day ${day} • Exercise 1) In ${inputs.subject}, understanding "____" helps learners solve classroom and practical exercises accurately.`, getKw(1))
    },
    {
      id: `fib_d${day}_ex1_q3`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 3,
      ...fib(1, 3, `(Day ${day} • Exercise 1) Under ${inputs.strand}, the concept of "____" is vital for mastering ${topic}.`, getKw(2))
    },
    {
      id: `fib_d${day}_ex1_q4`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 4,
      question: `(Day ${day} • Exercise 1) When applying lessons on ${topic} to daily life in Ghana, learners focus on "____".`,
      blankAnswer: getKw(3)
    },
    {
      id: `fib_d${day}_ex1_q5`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 5,
      question: `(Day ${day} • Exercise 1) Regular practice and review of "____" builds subject confidence in ${inputs.subject}.`,
      blankAnswer: getKw(4)
    }
  ];

  const ex2: ExerciseFillInBlank[] = [
    {
      id: `fib_d${day}_ex2_q1`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 1,
      ...fib(2, 1, `(Day ${day} • Exercise 2) In ${inputs.classLevel}, the primary standard taught under ${inputs.subStrand} is represented by "____".`, getKw(5))
    },
    {
      id: `fib_d${day}_ex2_q2`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 2,
      ...fib(2, 2, `(Day ${day} • Exercise 2) During lesson demonstrations on ${topic}, the key term "____" describes the primary operation or rule.`, getKw(6))
    },
    {
      id: `fib_d${day}_ex2_q3`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 3,
      ...fib(2, 3, `(Day ${day} • Exercise 2) To check if an answer is correct in ${inputs.subject}, learners evaluate "____".`, getKw(7))
    },
    {
      id: `fib_d${day}_ex2_q4`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 4,
      question: `(Day ${day} • Exercise 2) A learner who demonstrates "____" shows high mastery of ${topic}.`,
      blankAnswer: getKw(8)
    },
    {
      id: `fib_d${day}_ex2_q5`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 5,
      question: `(Day ${day} • Exercise 2) In Ghana's NaCCA curriculum, connecting ${topic} with "____" enhances practical community problem-solving.`,
      blankAnswer: getKw(9)
    }
  ];

  return [...ex1, ...ex2];
}

// Generate 2 MCQ Exercises (5 Questions each = 10 questions) for a specific Day
function generateDailyMCQs(day: number, inputs: PlanFormInputs, keywords: string[], topic: string, sentences: string[] = []): ExerciseMCQ[] {
  const safeKeywords = (keywords && keywords.length > 0)
    ? keywords
    : ['Concept', 'Principle', 'Method', 'Application', 'Analysis', 'Evaluation', 'Structure', 'Function', 'Process', 'System'];

  const getKw = (offset: number) => safeKeywords[(day * 3 + offset) % safeKeywords.length];

  // Real MCQs: cloze the official exemplar sentences with plausible
  // distractors (deterministic rotation, each sentence at most once per day).
  const mcqClozes: ClozeSpan[] = [];
  const mcqSeen = new Set<string>();
  for (const s of sentences) {
    const c = findClozeSpan(s, safeKeywords);
    if (c && !mcqSeen.has(c.sentence)) { mcqSeen.add(c.sentence); mcqClozes.push(c); }
  }
  const mcqIdx1 = (day * 5 + 7) % mcqClozes.length;
  const pick1 = mcqClozes.length > 0 ? mcqClozes[mcqIdx1] : null;
  const pick2 = mcqClozes.length > 1 ? mcqClozes[(mcqIdx1 + 1) % mcqClozes.length] : null;
  const dFor = (c: ClozeSpan) =>
    /^\d/.test(c.answer.replace(',', ''))
      ? numberDistractors(c.answer)
      : termDistractors(c.answer, safeKeywords);

  const ex1: ExerciseMCQ[] = [
    pick1
      ? buildClozeMCQ(day, 1, 1, pick1, dFor(pick1))
      : {
          id: `mcq_d${day}_ex1_q1`,
          dayNumber: day,
          exerciseNumber: 1,
          questionNumber: 1,
          question: `(Day ${day} • Exercise 1) What is the primary definition or meaning of ${getKw(0)} in ${inputs.subject}?`,
          options: {
            A: getTermDefinition(getKw(0), inputs.subject, topic, 0),
            B: 'An unrelated concept not included in the Ghana NSBC syllabus.',
            C: 'A tool used exclusively for weather monitoring.',
            D: 'None of the above.'
          },
          correctOption: 'A',
          explanation: `${getKw(0)} is an essential vocabulary term in ${inputs.subject} under ${topic}.`
        },
    {
      id: `mcq_d${day}_ex1_q2`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 2,
      question: `(Day ${day} • Exercise 1) What is the main learning objective when studying ${topic}?`,
      options: {
        A: 'To memorize words without understanding their meaning.',
        B: `To acquire practical knowledge, reasoning, and problem-solving skills in ${inputs.subject}.`,
        C: 'To skip all exercise book activities.',
        D: 'To copy notes blindly without asking questions.'
      },
      correctOption: 'B',
      explanation: 'Ghana\'s Standard-Based Curriculum focuses on practical skills application and conceptual understanding.'
    },
    {
      id: `mcq_d${day}_ex1_q3`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 3,
      question: `(Day ${day} • Exercise 1) Which of the following statements about ${getKw(1)} is accurate?`,
      options: {
        A: getTermDefinition(getKw(1), inputs.subject, topic, 1),
        B: 'It refers to an athletic sport.',
        C: 'It is a decorative symbol with no subject relevance.',
        D: `It has no application in ${inputs.subject}.`
      },
      correctOption: 'A',
      explanation: `${getKw(1)} is a core principle studied under ${inputs.strand}.`
    },
    {
      id: `mcq_d${day}_ex1_q4`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 4,
      question: `(Day ${day} • Exercise 1) What is the recommended step when completing exercises on ${topic}?`,
      options: {
        A: 'Read instructions carefully, follow the step-by-step procedure, and verify work.',
        B: 'Guess answers without reading.',
        C: 'Leave the exercise book blank.',
        D: 'Copy work from another classmate.'
      },
      correctOption: 'A',
      explanation: 'Systematic reasoning and verification prevent mistakes and ensure high accuracy.'
    },
    {
      id: `mcq_d${day}_ex1_q5`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 5,
      question: `(Day ${day} • Exercise 1) How does mastering ${getKw(2)} help a learner in Ghana?`,
      options: {
        A: 'It builds foundational understanding and real-life problem-solving ability.',
        B: 'It has no value or application.',
        C: 'It prevents learners from participating in class.',
        D: 'It replaces all other school subjects.'
      },
      correctOption: 'A',
      explanation: `Knowledge of ${getKw(2)} under ${topic} helps learners apply concepts in everyday Ghanaian life.`
    }
  ];

  const ex2: ExerciseMCQ[] = [
    {
      id: `mcq_d${day}_ex2_q1`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 1,
      question: `(Day ${day} • Exercise 2) When applying ${topic} in a group work activity, learners should:`,
      options: {
        A: 'Collaborate actively, share ideas respectfully, and present findings clearly.',
        B: 'Work alone and refuse to speak with group members.',
        C: 'Allow only one person to do all the work while others sleep.',
        D: 'Ignore the teacher\'s instructions.'
      },
      correctOption: 'A',
      explanation: 'Ghana\'s curriculum emphasizes collaboration, communication, and core leadership competencies.'
    },
    {
      id: `mcq_d${day}_ex2_q2`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 2,
      question: `(Day ${day} • Exercise 2) Which Teaching and Learning Material (TLM) is most effective for demonstrating ${topic}?`,
      options: {
        A: `Real objects, charts, and models representing ${inputs.subStrand}.`,
        B: 'Unrelated foreign music recordings.',
        C: 'Empty unmarked papers with no instructions.',
        D: 'None of the above.'
      },
      correctOption: 'A',
      explanation: 'Concrete TLMs help learners bridge the gap between abstract concepts and real-world understanding.'
    },
    pick2
      ? buildClozeMCQ(day, 2, 3, pick2, dFor(pick2))
      : {
          id: `mcq_d${day}_ex2_q3`,
          dayNumber: day,
          exerciseNumber: 2,
          questionNumber: 3,
          question: `(Day ${day} • Exercise 2) How is ${getKw(3)} connected to ${inputs.strand}?`,
          options: {
            A: getTermDefinition(getKw(3), inputs.subject, topic, 2),
            B: 'It is completely unrelated to this strand.',
            C: 'It is only used outside of Ghana.',
            D: 'It is a mathematical error.'
          },
          correctOption: 'A',
          explanation: `${getKw(3)} directly supports learners in achieving the content standard.`
        },
    {
      id: `mcq_d${day}_ex2_q4`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 4,
      question: `(Day ${day} • Exercise 2) Which critical thinking question best reflects ${topic}?`,
      options: {
        A: `Why is understanding ${inputs.subStrand} important for our community and nation?`,
        B: 'What color is the blackboard in another school?',
        C: 'How many minutes until the bell rings for closing?',
        D: 'Who is the fastest runner in the district?'
      },
      correctOption: 'A',
      explanation: 'Critical thinking questions encourage reflection and practical community connection.'
    },
    {
      id: `mcq_d${day}_ex2_q5`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 5,
      question: `(Day ${day} • Exercise 2) What is the correct way to record answers for ${topic} in an exercise book?`,
      options: {
        A: 'Write the date, exercise title, number each question clearly, and show all required work neatly.',
        B: 'Write randomly on blank margins without numbering.',
        C: 'Tear out pages from the exercise book.',
        D: 'Use pencil scribbles that cannot be read.'
      },
      correctOption: 'A',
      explanation: 'Neatness and proper presentation in learner exercise books are essential academic habits.'
    }
  ];

  return [...ex1, ...ex2];
}

// Generate 2 Matching Column Exercises (5 Pairs each = 10 pairs) for a specific Day
function generateDailyMatchingPairs(day: number, inputs: PlanFormInputs, keywords: string[], topic: string, sentences: string[] = [], exemplarText: string = ''): ExerciseMatchingPair[] {
  const safeKeywords = (keywords && keywords.length > 0)
    ? keywords
    : ['Concept', 'Principle', 'Method', 'Application', 'Analysis', 'Evaluation', 'Structure', 'Function', 'Process', 'System'];

  const getKw = (offset: number) => safeKeywords[(day * 3 + offset) % safeKeywords.length];
  const def = (kw: string, idx: number) => getTermDefinition(kw, inputs.subject, topic, idx, exemplarText);

  // Build 10 distinct term <-> definition pairs. Indicator keywords come
  // first; dictionary-backed filler terms for the subject top the list up.
  // Circular "Key subject terminology ..." fallbacks are skipped so no
  // meaningless pairs are ever shown.
  const pairs: { term: string; definition: string }[] = [];
  const addPair = (term: string) => {
    if (!term || pairs.some(p => p.term.toLowerCase() === term.toLowerCase())) return;
    const d = def(term, pairs.length);
    if (isCircularDefinition(d)) return;
    pairs.push({ term, definition: d });
  };
  for (let off = 0; pairs.length < 10 && off < 40; off++) addPair(getKw(off));
  const subj = (inputs.subject || '').toLowerCase();
  // Filler terms all have real dictionary-backed definitions.
  const fillers: string[] = [
    ...(/math/i.test(subj) ? ['Thousands', 'Digit', 'Expanded Form', 'Compare', 'Sum', 'Difference'] : []),
    ...(/sci/i.test(subj) ? ['Solid', 'Liquid', 'Gas', 'Mixture', 'Solution', 'Photosynthesis', 'Chlorophyll', 'Roots', 'Hygiene', 'Sanitation'] : []),
    ...(/comput|ict/i.test(subj) ? ['Hardware', 'Software', 'Input Device', 'Output Device'] : []),
    ...(/hist|social|owop|rme|culture/i.test(subj) ? ['Oral Tradition', 'Migration', 'Ethnic Group', 'Heritage', 'Colonial Rule'] : []),
    ...['Algorithm', 'Environment', 'Photosynthesis', 'Hardware', 'Oral Tradition', 'Migration', 'Thousands', 'Digit', 'Place Value', 'Hygiene', 'Energy']
  ];
  for (const f of fillers) { if (pairs.length >= 10) break; addPair(f); }

  const mk = (i: number, ex: number, qn: number): ExerciseMatchingPair => ({
    id: `match_d${day}_ex${ex}_q${qn}`,
    dayNumber: day,
    exerciseNumber: ex,
    questionNumber: qn,
    itemA: pairs[i].term,
    itemB: pairs[i].definition,
    matchKey: pairs[i].definition
  });

  const ex1 = [0, 1, 2, 3, 4].map(qn => mk(qn, 1, qn + 1));
  const ex2 = [5, 6, 7, 8, 9].map(qn => mk(qn, 2, qn - 4));

  return [...ex1, ...ex2];
}

// Generate 2 Application Exercises (5 Questions each = 10 questions) for a specific Day
function generateDailyApplicationExercises(day: number, inputs: PlanFormInputs, keywords: string[], topic: string, sentences: string[] = []): ExerciseApplication[] {
  const isLower = isLowerClassLevel(inputs.classLevel);
  const recall = sentences.length > 0 ? sentences[(day - 1) % sentences.length] : '';

  const ex1: ExerciseApplication[] = [
    {
      id: `app_d${day}_ex1_q1`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 1,
      scenarioOrContext: `Kofi and Ama are visiting the local market in their town in Ghana. They observe merchants and community members interacting during their daily trade.`,
      question: isLower
        ? `(Day ${day} • Exercise 1) How can Kofi and Ama use what they learned about ${topic} to help their parents at home or in the market?`
        : `(Day ${day} • Exercise 1) Describe step-by-step how Kofi and Ama can apply the principles of ${topic} to solve a real practical problem in the market.${recall ? ` (Recall the curriculum example: ${recall})` : ''}`,
      sampleAnswer: `Learners should identify the practical application of ${topic} by explaining how concepts like ${keywords[0] || 'the core lesson idea'} assist in daily routines, fair transactions, or accurate counting/decision making.`
    },
    {
      id: `app_d${day}_ex1_q2`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 2,
      scenarioOrContext: `During a school project at ${inputs.schoolName || 'Adom Basic School'}, your teacher asks your group to create a presentation about ${topic}.`,
      question: `(Day ${day} • Exercise 1) What is one real-life Ghanaian example you will include in your presentation to explain ${topic} to your classmates?`,
      sampleAnswer: `A valid local example from Ghana (e.g. sharing farm produce, community sanitation, constructing local structures, historical monuments, or trading) clearly demonstrating ${topic}.`
    },
    {
      id: `app_d${day}_ex1_q3`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 3,
      scenarioOrContext: `Your younger sibling asks you to explain why ${inputs.subject} is important for everyday life in Ghana.`,
      question: `(Day ${day} • Exercise 1) In 2-3 clear sentences, explain to your sibling how knowing ${topic} makes everyday activities easier and safer.`,
      sampleAnswer: `Learners explain that understanding ${topic} develops reasoning, helps avoid mistakes in real-world tasks, and supports community development.`
    },
    {
      id: `app_d${day}_ex1_q4`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 4,
      scenarioOrContext: `A farmer in a rural community in Ghana needs advice on managing resources effectively using knowledge of ${topic}.`,
      question: `(Day ${day} • Exercise 1) What practical advice will you give the farmer based on today's lesson on ${topic}?`,
      sampleAnswer: `Apply logical planning, resource conservation, systematic recording, or scientific care as taught under ${inputs.strand}.`
    },
    {
      id: `app_d${day}_ex1_q5`,
      dayNumber: day,
      exerciseNumber: 1,
      questionNumber: 5,
      scenarioOrContext: `You are participating in a class quiz competition representing ${inputs.classLevel}.`,
      question: `(Day ${day} • Exercise 1) If given a scenario with missing information, what strategy will you use to determine the correct solution for ${topic}?`,
      sampleAnswer: `Break down the problem into smaller parts, analyze the given facts, use formulas/rules, and verify the conclusion.`
    }
  ];

  const ex2: ExerciseApplication[] = [
    {
      id: `app_d${day}_ex2_q1`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 1,
      scenarioOrContext: `A local Ghanaian craftsman/trader wants to improve their efficiency using principles of ${inputs.subStrand}.`,
      question: `(Day ${day} • Exercise 2) How can the craftsman apply ${keywords[1] || topic} to make their work neater, faster, or more accurate?`,
      sampleAnswer: `Explain how structured measurements, systematic processes, or historical/scientific insights ensure quality output.`
    },
    {
      id: `app_d${day}_ex2_q2`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 2,
      scenarioOrContext: `Your community is organizing a clean-up and health campaign or building project.`,
      question: `(Day ${day} • Exercise 2) Identify two ways you can use ${topic} to support your community leaders during this initiative.`,
      sampleAnswer: `1. Help calculate/measure/record data accurately. 2. Educate peers on best practices and core values learned in class.`
    },
    {
      id: `app_d${day}_ex2_q3`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 3,
      scenarioOrContext: `A classmate makes a common error while solving a problem on ${topic}.`,
      question: `(Day ${day} • Exercise 2) How would you politely explain the mistake to your classmate and show them the correct method?`,
      sampleAnswer: `Show the classmate the standard step-by-step approach, identify the exact point of error, and guide them through verification.`
    },
    {
      id: `app_d${day}_ex2_q4`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 4,
      scenarioOrContext: `You are creating a study guide poster on ${topic} to paste on your classroom wall.`,
      question: `(Day ${day} • Exercise 2) Write down the key slogan or rule (in 1 sentence) that everyone in ${inputs.classLevel} must remember about ${topic}.`,
      sampleAnswer: `A concise, punchy sentence capturing the core essence of ${topic} and its importance.`
    },
    {
      id: `app_d${day}_ex2_q5`,
      dayNumber: day,
      exerciseNumber: 2,
      questionNumber: 5,
      scenarioOrContext: `Future Career Link: In Ghana, careers such as engineering, nursing, teaching, trading, and agriculture rely heavily on ${inputs.subject}.`,
      question: `(Day ${day} • Exercise 2) Choose one Ghanaian profession and explain how a professional in that field uses ${topic} daily.`,
      sampleAnswer: `The learner describes a specific career (e.g. Teacher, Nurse, Farmer, Architect) and links their daily duties with the principles of ${topic}.`
    }
  ];

  return [...ex1, ...ex2];
}

// Generate 2 Diagram & Visual Exercises (5 Questions each = 10 questions) for a specific Day
function generateDailyDiagramExercises(day: number, inputs: PlanFormInputs, keywords: string[], topic: string, sentences: string[] = []): ExerciseDiagram[] {
  const isLower = isLowerClassLevel(inputs.classLevel);

  if (isLower) {
    // Lower classes (Nursery, KG, Basic 1-3): Picture identification, letter tracing, shape tracing, diagram coloring
    const ex1: ExerciseDiagram[] = [
      {
        id: `diag_d${day}_ex1_q1`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 1,
        diagramCategory: 'Picture Identification',
        diagramTitle: `Picture Identification: Ghanaian Objects & Tools (${topic})`,
        diagramPrompt: `Look at the illustration box below. Identify the object and write its name in your exercise book.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ ILLUSTRATION BOX: PICTURE A ]             │\n│     ╭─────╮        🌾 Farm Produce / Tool   │\n│    │ 🥭   │   OR   📖 Class Textbook         │\n│     ╰─────╯        🇬🇭 Ghana Star Symbol      │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Name the object shown in Picture A and state one way it is used in school or at home.`,
        expectedAnswer: `Learners identify the pictured object (e.g. Mango / Book / Symbol) and describe its simple everyday use.`
      },
      {
        id: `diag_d${day}_ex1_q2`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 2,
        diagramCategory: 'Trace Letters & Words',
        diagramTitle: `Letter & Word Tracing Guide (${topic})`,
        diagramPrompt: `Trace the dotted letters carefully along the arrows from top to bottom.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ TRACING GUIDELINE BOX ]                   │\n│     : : :   : : :   : : :   : : :            │\n│     · A ·   · B ·   · C ·   · G ·            │\n│     · · ·   · · ·   · · ·   · · ·            │\n│   Word: · · · G - H - A - N - A · · ·        │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Trace the letters 'A', 'B', 'C', 'G' and trace the word 'GHANA' in your exercise book using neat strokes.`,
        expectedAnswer: `Neat letter and word tracing following standard stroke order from left to right.`
      },
      {
        id: `diag_d${day}_ex1_q3`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 3,
        diagramCategory: 'Trace Diagram & Shapes',
        diagramTitle: `Shape & Dotted Line Tracing (${topic})`,
        diagramPrompt: `Trace the dotted lines to complete the geometric shape and color the inside neatly.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ SHAPE TRACING BOX ]                       │\n│      . - - - .        / \\                    │\n│     :         :      / . \\                   │\n│     : Circle  :     / . . \\  Triangle        │\n│      ' - - - '     ' - - - '                 │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Trace along the dotted circle and triangle. Write down how many corners each shape has.`,
        expectedAnswer: `Circle has 0 corners; Triangle has 3 corners. Accurately traced lines.`
      },
      {
        id: `diag_d${day}_ex1_q4`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 4,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `Simple Picture Labeling (${topic})`,
        diagramPrompt: `Observe the drawing with labels (i) and (ii). Fill in the correct names.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ SIMPLE PLANT / OBJECT DIAGRAM ]           │\n│         (i) [ Top / Leaf ] 🍃                │\n│               │                              │\n│         (ii)[ Base / Root ] 🌱               │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Write the names for part (i) and part (ii) in your exercise book.`,
        expectedAnswer: `Part (i): Leaf / Top; Part (ii): Root / Base.`
      },
      {
        id: `diag_d${day}_ex1_q5`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 5,
        diagramCategory: 'Draw & Illustrate',
        diagramTitle: `Creative Drawing Task (${topic})`,
        diagramPrompt: `Draw your own simple picture representing ${topic} in the space provided.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ DRAWING FRAME FOR LEARNER ]               │\n│                                              │\n│      ( Draw your picture here neatly )       │\n│                                              │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Draw a simple picture showing ${keywords[0] || topic} and write one sentence about your drawing.`,
        expectedAnswer: `A neat learner drawing depicting ${topic} with a simple descriptive caption.`
      }
    ];

    const ex2: ExerciseDiagram[] = [
      {
        id: `diag_d${day}_ex2_q1`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 1,
        diagramCategory: 'Picture Identification',
        diagramTitle: `Picture Matching & Counting (${topic})`,
        diagramPrompt: `Count the items in each box and match with the correct numeral.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ COUNTING & MATCHING BOX ]                 │\n│   Box 1: 🍎 🍎 🍎        ---> [ 3 ]          │\n│   Box 2: ⭐ ⭐ ⭐ ⭐ ⭐    ---> [ 5 ]          │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Count the items in Box 1 and Box 2 and write the number in your exercise book.`,
        expectedAnswer: `Box 1 = 3 items; Box 2 = 5 items.`
      },
      {
        id: `diag_d${day}_ex2_q2`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 2,
        diagramCategory: 'Trace Letters & Words',
        diagramTitle: `Number & Word Tracing (${topic})`,
        diagramPrompt: `Trace the dotted numbers and word spellings.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ NUMBER TRACING BOX ]                      │\n│    · 1 · (O-N-E)       · 2 · (T-W-O)         │\n│    · 3 · (T-H-R-E-E)   · 4 · (F-O-U-R)       │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Trace the numbers 1, 2, 3, 4 and write the words ONE, TWO, THREE, FOUR in your exercise book.`,
        expectedAnswer: `Accurate number formation and legible handwriting.`
      },
      {
        id: `diag_d${day}_ex2_q3`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 3,
        diagramCategory: 'Trace Diagram & Shapes',
        diagramTitle: `Pattern & Border Line Tracing (${topic})`,
        diagramPrompt: `Follow the zigzag and curved lines from left to right without lifting your pencil.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ PATTERN TRACING BOX ]                     │\n│   Line 1: /\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\     │\n│   Line 2: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~       │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Trace the zigzag pattern and wavy pattern across three lines in your exercise book.`,
        expectedAnswer: `Smooth motor control and accurate line tracing.`
      },
      {
        id: `diag_d${day}_ex2_q4`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 4,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `Color & Label Activity (${topic})`,
        diagramPrompt: `Identify the three sections of the Ghana National Flag diagram.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ GHANA NATIONAL FLAG DIAGRAM ]             │\n│   Top Stripe    : [ (i)   Color ]            │\n│   Middle Stripe : [ (ii)  Color + ★ Star ]   │\n│   Bottom Stripe : [ (iii) Color ]            │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Write the three colors of the Ghana flag in order from top to bottom and name the symbol in the middle.`,
        expectedAnswer: `Top: Red; Middle: Gold with Black Star; Bottom: Green.`
      },
      {
        id: `diag_d${day}_ex2_q5`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 5,
        diagramCategory: 'Draw & Illustrate',
        diagramTitle: `Object Drawing & Symbol Connection (${topic})`,
        diagramPrompt: `Draw two objects you use in school every day.`,
        diagramAsciiOrDescription: `┌──────────────────────────────────────────────┐\n│  [ CLASSROOM OBJECTS FRAME ]                 │\n│    Item 1: [ Pencil / Eraser ]               │\n│    Item 2: [ Exercise Book / Ruler ]         │\n└──────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Draw a pencil and an exercise book in your book and label them clearly.`,
        expectedAnswer: `Clear drawings of classroom objects with accurate labels.`
      }
    ];

    return [...ex1, ...ex2];
  } else {
    // Upper Primary & JHS (Basic 4-9): Subject diagrams, system schematics, charts, maps, geometric figures
    // For Mathematics, a genuine place value chart built from a real number
    // in the official curriculum examples replaces the generic schematic.
    const chartNum = /math/i.test(inputs.subject) ? findChartNumber(sentences.join(' ')) : null;
    const pvChart = chartNum ? buildPlaceValueChart(chartNum) : null;

    const ex1: ExerciseDiagram[] = [
      {
        id: `diag_d${day}_ex1_q1`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 1,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `System Structure & Diagram Labeling (${inputs.subject}: ${topic})`,
        diagramPrompt: `Study the structural diagram below representing the core components of ${topic}. Identify the parts indicated by letters (A), (B), and (C).`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ SYSTEM SCHEMATIC DIAGRAM: ${topic.toUpperCase()} ]   │\n│                                                        │\n│           ┌───────────────────────────┐                │\n│           │ Part (A): Input / Heading │                │\n│           └─────────────┬─────────────┘                │\n│                         ▼                              │\n│           ┌───────────────────────────┐                │\n│           │ Part (B): Process / Core  │                │\n│           └─────────────┬─────────────┘                │\n│                         ▼                              │\n│           ┌───────────────────────────┐                │\n│           │ Part (C): Output / Result │                │\n│           └───────────────────────────┘                │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Based on the diagram above, state the function of Part (A) and Part (B) in relation to ${topic}.`,
        expectedAnswer: `Part (A) serves as the primary initiation/input component; Part (B) executes core processing/transformation according to principles of ${inputs.strand}.`
      },
      {
        id: `diag_d${day}_ex1_q2`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 2,
        diagramCategory: 'Picture Identification',
        diagramTitle: `Scientific / Mathematical Model Identification (${topic})`,
        diagramPrompt: `Analyze the visual model below and determine which concept under ${inputs.subStrand} it illustrates.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ CONCEPTUAL MODEL BOX ]                              │\n│   Th (Thousands) │ H (Hundreds) │ T (Tens) │ O (Ones)  │\n│   [ ● ● ● ● ]    │ [ ● ● ]      │ [ ● ● ● ]│ [ ● ● ● ●]│\n│   Value = 4,234                                        │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Identify the mathematical or conceptual model shown in the box and write the exact value or rule it represents.`,
        expectedAnswer: `Place Value Chart / Conceptual Block Model representing standard positional notation.`
      },
      {
        id: `diag_d${day}_ex1_q3`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 3,
        diagramCategory: 'Draw & Illustrate',
        diagramTitle: `Schematic Drawing & Flowchart (${topic})`,
        diagramPrompt: `Draw a clear flowchart illustrating the sequence of steps for ${topic}.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ FLOWCHART TEMPLATE ]                                │\n│   [ Step 1: Start ] ──► [ Step 2: Action ] ──► [ End ] │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) In your exercise book, draw a 3-step flowchart showing how to solve or execute a task under ${topic}.`,
        expectedAnswer: `A neat, connected flowchart displaying Step 1 (Identification), Step 2 (Operation/Analysis), and Step 3 (Conclusion/Verification).`
      },
      {
        id: `diag_d${day}_ex1_q4`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 4,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `Comparative Chart Analysis (${topic})`,
        diagramPrompt: `Examine the table comparing two key elements of ${topic}.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ COMPARISON MATRIX ]                                 │\n│   Feature         │ ${keywords[0] || 'Element A'} │ ${keywords[1] || 'Element B'} │\n│   ────────────────┼─────────────────────────┼─────────────────────────│\n│   Primary Role    │ (i) [ Fill in ]         │ (ii) [ Fill in ]        │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Complete the missing entries (i) and (ii) in the comparison matrix in your exercise book.`,
        expectedAnswer: `Accurate descriptions of both elements based on lesson definitions.`
      },
      {
        id: `diag_d${day}_ex1_q5`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 5,
        diagramCategory: 'Draw & Illustrate',
        diagramTitle: `Real-World Application Sketch (${topic})`,
        diagramPrompt: `Create a labeled diagram showing how ${topic} is used in a Ghanaian community or workspace.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ COMMUNITY APPLICATION DIAGRAM FRAME ]               │\n│   Include: Labels, Directional Arrows, Legend/Key     │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 1) Sketch and label a diagram depicting how ${topic} operates in practical Ghanaian life.`,
        expectedAnswer: `A well-labeled diagram featuring title, key components, and brief explanatory annotations.`
      }
    ];

    if (pvChart && chartNum) {
      ex1[0] = {
        id: `diag_d${day}_ex1_q1`,
        dayNumber: day,
        exerciseNumber: 1,
        questionNumber: 1,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `Place Value Chart Labeling (${inputs.subject}: ${topic})`,
        diagramPrompt: `Study the place value chart below for the number ${chartNum}.`,
        diagramAsciiOrDescription: pvChart.chart,
        question: `(Day ${day} • Exercise 1) ${pvChart.question}`,
        expectedAnswer: pvChart.expectedAnswer
      };
    }

    const ex2: ExerciseDiagram[] = [
      {
        id: `diag_d${day}_ex2_q1`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 1,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `Process Cycle Diagram (${topic})`,
        diagramPrompt: `Study the cyclical diagram below and identify the missing stage marked as [ Stage X ].`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ CONTINUOUS PROCESS CYCLE ]                          │\n│             ┌─────────────────────────┐                │\n│             │ Stage 1: Preparation    │                │\n│             └────────────┬────────────┘                │\n│         ▲                │                ▼            │\n│  ┌──────┴──────┐         │         ┌──────┴──────┐     │\n│  │ [ Stage X ] │ ◄───────┴─────────┤ Stage 2:    │     │\n│  │ (Identify)  │                   │ Execution   │     │\n│  └─────────────┘                   └─────────────┘     │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Name [ Stage X ] in the cycle and explain why it is essential for completing the process.`,
        expectedAnswer: `Stage X is Evaluation / Review / Plenary, ensuring accuracy and mastery before the next cycle.`
      },
      {
        id: `diag_d${day}_ex2_q2`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 2,
        diagramCategory: 'Picture Identification',
        diagramTitle: `Geographical / Historical / Scientific Map or Artifact (${topic})`,
        diagramPrompt: `Observe the map or structural layout diagram below.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ REGIONAL / STRUCTURAL OVERVIEW MAP ]                │\n│    North: Savannah Zone │ South: Coastal Zone / Forts  │\n│    Key Centers: Accra, Kumasi, Cape Coast, Tamale     │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Based on the layout, name two key geographic or structural landmarks relevant to ${topic}.`,
        expectedAnswer: `Learners list the two appropriate landmarks and explain their significance under ${inputs.strand}.`
      },
      {
        id: `diag_d${day}_ex2_q3`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 3,
        diagramCategory: 'Diagram Labeling',
        diagramTitle: `Component Cross-Section Diagram (${topic})`,
        diagramPrompt: `Identify parts (1), (2), and (3) on the cross-section diagram below.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ CROSS-SECTION DIAGRAM ]                             │\n│   (1) Outer Layer / Boundary ────► [                 ] │\n│   (2) Core Processing Center ────► [                 ] │\n│   (3) Support / Base Unit    ────► [                 ] │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Write the correct label and function for parts (1), (2), and (3) in your exercise book.`,
        expectedAnswer: `(1) Boundary/Protection; (2) Core Unit/Function; (3) Foundation/Support.`
      },
      {
        id: `diag_d${day}_ex2_q4`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 4,
        diagramCategory: 'Draw & Illustrate',
        diagramTitle: `Bar Graph / Data Chart Construction (${topic})`,
        diagramPrompt: `Using the sample data provided, construct a neat bar chart or frequency diagram.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ DATA TABLE ]                                        │\n│   Category A: 10 | Category B: 25 | Category C: 15     │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Draw a bar chart with labeled axes (X-axis: Categories, Y-axis: Frequency) representing the data above.`,
        expectedAnswer: `A neat bar graph with accurately scaled heights (10, 25, 15) and clear title and labels.`
      },
      {
        id: `diag_d${day}_ex2_q5`,
        dayNumber: day,
        exerciseNumber: 2,
        questionNumber: 5,
        diagramCategory: 'Draw & Illustrate',
        diagramTitle: `Mind Map Summary Diagram (${topic})`,
        diagramPrompt: `Create a central mind map connecting ${topic} to its four sub-branches.`,
        diagramAsciiOrDescription: `┌────────────────────────────────────────────────────────┐\n│  [ MIND MAP TEMPLATE ]                                 │\n│                 ┌─────────────┐                        │\n│                 │  ${topic.slice(0, 15)}  │                        │\n│                 └──────┬──────┘                        │\n│            ┌───────────┼───────────┐                   │\n│            ▼           ▼           ▼                   │\n│         Branch 1    Branch 2    Branch 3               │\n└────────────────────────────────────────────────────────┘`,
        question: `(Day ${day} • Exercise 2) Draw a complete Mind Map in your exercise book showing the core definitions, TLMs, and practical uses of ${topic}.`,
        expectedAnswer: `A comprehensive mind map linking the central topic to vocabulary, tools, activities, and real-life Ghanaian applications.`
      }
    ];

    return [...ex1, ...ex2];
  }
}


