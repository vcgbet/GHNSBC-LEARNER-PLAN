import { GhanaSubjectData } from '../../types';

export const ENGLISH_DATA: GhanaSubjectData = {
  id: 'english',
  name: 'English Language',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'eng_s1',
      name: 'Strand 1: Oral Language (Listening and Speaking)',
      subStrands: [
        {
          id: 'eng_s1_ss1',
          name: 'Sub-strand 1: Conversation, Dialogue and Public Speaking',
          contentStandards: [
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate active listening and speaking skills in interactive classroom discussions.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Engage in collaborative dialogues on familiar topics expressing opinions clearly and respectfully.',
                  exemplars: ['Participate in a group discussion on "Ways to keep our school clean".'],
                  suggestedTLMs: ['Conversation prompt cards', 'Audio recordings'],
                  keyWords: ['Dialogue', 'Opinion', 'Active Listening', 'Turn-Taking']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate public speaking skills, debates, and listening comprehension of formal audio presentations.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Prepare and deliver a 3-minute persuasive speech on national issues using effective voice modulation and body language.',
                  exemplars: ['Deliver a speech on "The Importance of Girls\' Education in Ghana" using clear vocal pitch and eye contact.'],
                  suggestedTLMs: ['Microphone / lectern mock setup', 'Speech rubric evaluation sheets', 'Audio clips of famous speeches'],
                  keyWords: ['Persuasive Speech', 'Vocal Modulation', 'Tone', 'Body Language', 'Audience Awareness']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Participate in structured parliamentary-style debate using formal rebuttals and evidence-based points.',
                  exemplars: ['Debate the motion: "Boarding school education is better than day school education".'],
                  suggestedTLMs: ['Debate rules sheet', 'Gavel and timekeeper cards'],
                  keyWords: ['Debate', 'Motion', 'Proposer', 'Opposer', 'Rebuttal', 'Points of Information']
                }
              ]
            }
          ]
        },
        {
          id: 'eng_s1_ss2',
          name: 'Sub-strand 2: Pronunciation, Stress and Intonation',
          contentStandards: [
            {
              code: 'B7.1.2.1',
              description: 'Demonstrate mastery of English phonetics, syllable stress patterns, and sentence intonation.',
              indicators: [
                {
                  code: 'B7.1.2.1.1',
                  description: 'Identify and apply primary syllable stress in two-syllable and multi-syllable words (nouns vs verbs, e.g., RE-cord vs re-CORD).',
                  exemplars: ['Differentiate word stress in pairs: PRE-sent (noun) vs pre-SENT (verb), EX-port vs ex-PORT.'],
                  suggestedTLMs: ['Phonetics flashcards', 'Stress mark cards (ˈ)', 'Audio pronunciation dictionary'],
                  keyWords: ['Syllable', 'Primary Stress', 'Intonation (Rising/Falling)', 'Phoneme', 'Minimal Pairs']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eng_s2',
      name: 'Strand 2: Reading Comprehension and Vocabulary',
      subStrands: [
        {
          id: 'eng_s2_ss1',
          name: 'Sub-strand 1: Reading Comprehension, Summarising and Inferencing',
          contentStandards: [
            {
              code: 'B4.2.1.1',
              description: 'Read informational texts fluently and answer literal, inferential, and evaluative questions.',
              indicators: [
                {
                  code: 'B4.2.1.1.1',
                  description: 'Read grade-level passage and identify main ideas, supporting details, and deduce meanings of unfamiliar words.',
                  exemplars: ['Read a story on Kwame Nkrumah and answer 5 comprehension questions.'],
                  suggestedTLMs: ['Graded reading passages', 'Comprehension question cards'],
                  keyWords: ['Comprehension', 'Main Idea', 'Inference', 'Context Clues']
                }
              ]
            },
            {
              code: 'B7.2.1.1',
              description: 'Analyze complex narrative and expository texts, extract main ideas, and write concise summaries.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Read an argumentative passage, identify topic sentences, and write a 50-word summary capturing core thesis.',
                  exemplars: ['Summarize a 3-paragraph article on climate change into 3 concise sentences.'],
                  suggestedTLMs: ['Reading passage handouts', 'Summary writing step-by-step guide'],
                  keyWords: ['Summary', 'Thesis Statement', 'Topic Sentence', 'Paraphrase', 'Conciseness']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Make critical inferences and identify author\'s tone, purpose, and figures of speech (metaphor, simile, personification).',
                  exemplars: ['Identify examples of similes ("as brave as a lion") and personification in a descriptive passage.'],
                  suggestedTLMs: ['Figures of speech anchor charts', 'Literary excerpt cards'],
                  keyWords: ['Inference', 'Author\'s Tone', 'Simile', 'Metaphor', 'Personification', 'Imagery']
                }
              ]
            }
          ]
        },
        {
          id: 'eng_s2_ss2',
          name: 'Sub-strand 2: Vocabulary Development and Idiomatic Expressions',
          contentStandards: [
            {
              code: 'B7.2.2.1',
              description: 'Expand vocabulary using affixes (prefixes/suffixes), synonyms, antonyms, and idioms.',
              indicators: [
                {
                  code: 'B7.2.2.1.1',
                  description: 'Determine meanings of complex words using Greek and Latin roots and affixes (un-, dis-, re-, -tion, -able).',
                  exemplars: ['Break down words: un-predict-able, dis-connect-ion into root and affixes.'],
                  suggestedTLMs: ['Affix tree poster', 'Root word cards'],
                  keyWords: ['Prefix', 'Suffix', 'Root Word', 'Affix', 'Synonym', 'Antonym']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eng_s3',
      name: 'Strand 3: Grammar Mechanics',
      subStrands: [
        {
          id: 'eng_s3_ss1',
          name: 'Sub-strand 1: Parts of Speech (Nouns, Pronouns, Adjectives, Adverbs, Prepositions, Conjunctions)',
          contentStandards: [
            {
              code: 'B4.3.1.1',
              description: 'Demonstrate understanding of proper, common, collective nouns, and personal pronouns.',
              indicators: [
                {
                  code: 'B4.3.1.1.1',
                  description: 'Identify and use collective nouns (a flock of sheep, a bouquet of flowers) in sentences.',
                  exemplars: ['Fill in sentences with appropriate collective nouns from a word bank.'],
                  suggestedTLMs: ['Collective noun matching cards', 'Sentence strips'],
                  keyWords: ['Proper Noun', 'Common Noun', 'Collective Noun', 'Pronoun']
                }
              ]
            },
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate mastery of parts of speech, noun phrases, relative pronouns, and modal auxiliaries.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Identify and use relative pronouns (who, whom, whose, which, that) in defining and non-defining clauses.',
                  exemplars: ['Join sentence pairs: "The teacher arrived. She teaches English." -> "The teacher who teaches English arrived."'],
                  suggestedTLMs: ['Relative pronoun task cards', 'Sentence joining grammar charts'],
                  keyWords: ['Relative Pronoun', 'Relative Clause', 'Antecedent', 'Subordinate Clause']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Use modal auxiliary verbs (can, could, may, might, must, should, will, would) to express ability, permission, obligation, and probability.',
                  exemplars: ['Complete dialogue scenarios using appropriate modals of politeness and necessity.'],
                  suggestedTLMs: ['Modal verb hierarchy chart', 'Dialogue worksheets'],
                  keyWords: ['Modal Auxiliaries', 'Obligation', 'Possibility', 'Permission', 'Certainty']
                }
              ]
            }
          ]
        },
        {
          id: 'eng_s3_ss2',
          name: 'Sub-strand 2: Tenses, Subject-Verb Agreement (Concord) and Active/Passive Voice',
          contentStandards: [
            {
              code: 'B7.3.2.1',
              description: 'Apply rules of grammatical concord (Subject-Verb Agreement), verb tenses, and voice transformations.',
              indicators: [
                {
                  code: 'B7.3.2.1.1',
                  description: 'Apply rules of subject-verb agreement (singular subjects take singular verbs; compound subjects; indefinite pronouns).',
                  exemplars: ['Correct concord errors: "Each of the boys have a pen" -> "Each of the boys has a pen."'],
                  suggestedTLMs: ['Concord rule flashcards', 'Error correction task strips'],
                  keyWords: ['Concord', 'Subject-Verb Agreement', 'Indefinite Pronouns (Everyone, Each)', 'Plural Subject']
                },
                {
                  code: 'B7.3.2.1.2',
                  description: 'Transform sentences between Active Voice and Passive Voice across simple present, past, and future tenses.',
                  exemplars: ['Transform: "The government built a new clinic" -> "A new clinic was built by the government."'],
                  suggestedTLMs: ['Active-Passive transformation formula guide'],
                  keyWords: ['Active Voice', 'Passive Voice', 'Agent (by)', 'Past Participle']
                }
              ]
            }
          ]
        },
        {
          id: 'eng_s3_ss3',
          name: 'Sub-strand 3: Direct and Indirect (Reported) Speech',
          contentStandards: [
            {
              code: 'B7.3.3.1',
              description: 'Convert direct speech statements and questions into reported speech with correct pronoun and tense shifts.',
              indicators: [
                {
                  code: 'B7.3.3.1.1',
                  description: 'Convert direct speech into reported speech applying backshift of tenses (present -> past) and time/place adverbs.',
                  exemplars: ['Convert: Kofi said, "I am studying today" -> Kofi said that he was studying that day.'],
                  suggestedTLMs: ['Reported speech tense shift table', 'Speech bubble sentence cards'],
                  keyWords: ['Direct Speech', 'Reported Speech', 'Tense Backshift', 'Reporting Verb', 'Quotation Marks']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eng_s4',
      name: 'Strand 4: Writing and Composition',
      subStrands: [
        {
          id: 'eng_s4_ss1',
          name: 'Sub-strand 1: Narrative, Descriptive and Expository Essay Writing',
          contentStandards: [
            {
              code: 'B4.4.1.1',
              description: 'Write coherent paragraphs with clear topic sentences and supporting sensory details.',
              indicators: [
                {
                  code: 'B4.4.1.1.1',
                  description: 'Write a 2-paragraph descriptive composition on "A Memorable Rainy Day".',
                  exemplars: ['Use sensory words (sight, sound, smell) to describe rainfall and muddy puddles.'],
                  suggestedTLMs: ['Sensory words chart', 'Picture writing prompt'],
                  keyWords: ['Paragraph', 'Topic Sentence', 'Descriptive Words', 'Sensory Details']
                }
              ]
            },
            {
              code: 'B7.4.1.1',
              description: 'Demonstrate mastery of the writing process (pre-writing/outline, drafting, revising, editing) for narrative and expository essays.',
              indicators: [
                {
                  code: 'B7.4.1.1.1',
                  description: 'Write a well-structured narrative essay of at least 250 words featuring plot development, climax, and resolution.',
                  exemplars: ['Write an essay on "An Unexpected Adventure During the Holidays" with engaging opening and suspenseful climax.'],
                  suggestedTLMs: ['Story mountain plot diagram', 'Narrative transition word bank'],
                  keyWords: ['Narrative Essay', 'Plot Structure', 'Exposition', 'Climax', 'Resolution', 'Transitions']
                },
                {
                  code: 'B7.4.1.1.2',
                  description: 'Write an expository essay explaining a process or cause-and-effect relationship using factual evidence and transitional linkers.',
                  exemplars: ['Write an essay explaining "How to Prevent Cholera Outbreak in Our Community".'],
                  suggestedTLMs: ['Expository outline template', 'Cause-and-effect graphic organizer'],
                  keyWords: ['Expository Writing', 'Cause and Effect', 'Sequential Connectors (Firstly, Furthermore, In conclusion)']
                }
              ]
            }
          ]
        },
        {
          id: 'eng_s4_ss2',
          name: 'Sub-strand 2: Letter Writing (Formal and Informal Letters)',
          contentStandards: [
            {
              code: 'B7.4.2.1',
              description: 'Demonstrate proficiency in formats, tone, and conventions of formal letters, informal letters, and semi-formal emails.',
              indicators: [
                {
                  code: 'B7.4.2.1.1',
                  description: 'Write a formal letter to a school authority or public official observing 2 addresses, formal salutation, title, formal body, and standard sign-off (Yours faithfully).',
                  exemplars: ['Write a letter of application to the Headmaster requesting permission to establish an ICT Club in the school.'],
                  suggestedTLMs: ['Formal letter layout sample template', 'Comparison table of formal vs informal letter structures'],
                  keyWords: ['Formal Letter', 'Sender Address', 'Recipient Address', 'Salutation', 'Title / Heading', 'Yours faithfully']
                },
                {
                  code: 'B7.4.2.1.2',
                  description: 'Write an informal letter to a friend or relative using single address, warm conversational tone, contractions, and friendly sign-off.',
                  exemplars: ['Write a letter to your cousin telling them about your new school and favorite subjects.'],
                  suggestedTLMs: ['Informal letter model sheet'],
                  keyWords: ['Informal Letter', 'Conversational Tone', 'Yours affectionately', 'Personal News']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eng_s5',
      name: 'Strand 5: Literature (Poetry, Prose, Drama)',
      subStrands: [
        {
          id: 'eng_s5_ss1',
          name: 'Sub-strand 1: Ghanaian and African Literature Analysis',
          contentStandards: [
            {
              code: 'B7.5.1.1',
              description: 'Analyze themes, characterization, literary devices, and cultural motifs in prescribed Ghanaian poems, plays, and stories.',
              indicators: [
                {
                  code: 'B7.5.1.1.1',
                  description: 'Analyze a prescribed African poem, identifying stanza structure, rhyme scheme, rhythm, theme, and tone.',
                  exemplars: ['Analyze Kofi Awoonor\'s or Efua Sutherland\'s poetry highlighting themes of heritage and identity.'],
                  suggestedTLMs: ['Anthology of African poetry', 'Poetic devices reference sheet'],
                  keyWords: ['Poetry', 'Stanza', 'Rhyme Scheme', 'Theme', 'Tone', 'Symbolism', 'Alliteration']
                },
                {
                  code: 'B7.5.1.1.2',
                  description: 'Dramatize scenes from a Ghanaian play and evaluate character motivations and conflicts.',
                  exemplars: ['Stage a 5-minute scene illustrating conflict between tradition and modernity.'],
                  suggestedTLMs: ['Drama script copies', 'Simple stage props'],
                  keyWords: ['Drama', 'Stage Directions', 'Protagonist', 'Antagonist', 'Conflict', 'Dialogue']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
