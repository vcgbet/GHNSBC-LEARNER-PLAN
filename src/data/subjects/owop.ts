import { GhanaSubjectData } from '../../types';

export const OWOP_DATA: GhanaSubjectData = {
  id: 'owop',
  name: 'Our World and Our People (OWOP)',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
  strands: [
    {
      id: 'owop_s1',
      name: 'Strand 1: All About Us',
      subStrands: [
        {
          id: 'owop_s1_ss1',
          name: 'Sub-strand 1: Nature of God, Creation and Myself',
          contentStandards: [
            {
              code: 'B1.1.1.1',
              description: 'Demonstrate understanding of self-identity, body parts, and personal hygiene.',
              indicators: [
                {
                  code: 'B1.1.1.1.1',
                  description: 'Identify and name parts of the human body and state their basic functions.',
                  exemplars: ['Touch and name eyes for seeing, ears for hearing, hands for writing.'],
                  suggestedTLMs: ['Human body chart', 'Mirror', 'Flashcards'],
                  keyWords: ['Self-Identity', 'Body Parts', 'Senses', 'Hygiene']
                }
              ]
            },
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate understanding of unique personal characteristics, self-worth, and emotional regulation.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Identify individual strengths, talents, and strategies to build positive self-esteem and resilience.',
                  exemplars: ['Write a 3-point "I am special" personal profile describing personal talents and goals.'],
                  suggestedTLMs: ['Self-esteem affirmation cards', 'Emotion emoji wheel'],
                  keyWords: ['Self-Esteem', 'Strengths', 'Talents', 'Emotions', 'Resilience']
                }
              ]
            }
          ]
        },
        {
          id: 'owop_s1_ss2',
          name: 'Sub-strand 2: Family, Home and Community Relationships',
          contentStandards: [
            {
              code: 'B4.1.2.1',
              description: 'Demonstrate understanding of the nuclear and extended family systems and family values.',
              indicators: [
                {
                  code: 'B4.1.2.1.1',
                  description: 'Distinguish between nuclear family and extended family members, and their reciprocal roles in the Ghanaian home.',
                  exemplars: ['Construct a family tree diagram showing parents, siblings, grandparents, aunts, and cousins.'],
                  suggestedTLMs: ['Family tree templates', 'Picture stories of Ghanaian family life'],
                  keyWords: ['Nuclear Family', 'Extended Family', 'Kinship', 'Family Values', 'Chres', 'Respect']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'owop_s2',
      name: 'Strand 2: All Around Us',
      subStrands: [
        {
          id: 'owop_s2_ss1',
          name: 'Sub-strand 1: The Environment, Plants, Animals and Weather',
          contentStandards: [
            {
              code: 'B4.2.1.1',
              description: 'Demonstrate understanding of environmental cleanliness, waste disposal, and domestic animal care.',
              indicators: [
                {
                  code: 'B4.2.1.1.1',
                  description: 'Demonstrate practical sanitation activities (sweeping, weeding, desilting gutters) to keep school and home clean.',
                  exemplars: ['Participate in classroom sweeping and safe disposal of rubbish into labeled bins.'],
                  suggestedTLMs: ['Brooms', 'Dustbins', 'Hand gloves', 'Sanitation posters'],
                  keyWords: ['Sanitation', 'Cleanliness', 'Waste Disposal', 'Community Hygiene']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'owop_s3',
      name: 'Strand 3: Our Beliefs and Values',
      subStrands: [
        {
          id: 'owop_s3_ss1',
          name: 'Sub-strand 1: Moral Values, Cultural Celebrations and National Symbols',
          contentStandards: [
            {
              code: 'B4.3.1.1',
              description: 'Demonstrate understanding of Ghanaian national symbols, the National Pledge, and national patriotism.',
              indicators: [
                {
                  code: 'B4.3.1.1.1',
                  description: 'Identify and explain meanings of colors in the Ghana Flag (Red, Gold, Green) and the Black Star, and recite National Anthem/Pledge with reverence.',
                  exemplars: ['Color the Ghana Flag correctly and explain what Red (blood of ancestors), Gold (mineral wealth), Green (rich vegetation), and Black Star (African freedom) represent.'],
                  suggestedTLMs: ['Ghana National Flag', 'Coat of Arms poster', 'Audio of National Anthem and Pledge'],
                  keyWords: ['Ghana Flag', 'National Anthem', 'National Pledge', 'Coat of Arms', 'Patriotism', 'Freedom and Justice']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const GHANAIAN_LANGUAGE_DATA: GhanaSubjectData = {
  id: 'ghanaian_language',
  name: 'Ghanaian Language and Culture',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'ghl_s1',
      name: 'Strand 1: Oral Language (Listening and Speaking)',
      subStrands: [
        {
          id: 'ghl_s1_ss1',
          name: 'Sub-strand 1: Greetings, Appellations, Folktales and Proverbs',
          contentStandards: [
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate traditional greetings, responses, and clan appellations according to time of day and social rank.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Use appropriate morning, afternoon, evening, and situational greetings and responses in the local Ghanaian language.',
                  exemplars: ['Role-play greeting an elder or chief with respectful posturing (lowering cloth/kneeling) in Akan/Ewe/Ga.'],
                  suggestedTLMs: ['Greeting scenario prompt cards', 'Audio clips of traditional greetings'],
                  keyWords: ['Greetings', 'Appellations', 'Elder Respect', 'Culture']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Analyze Ananse folktales (Anansesεm), riddles (Agyerekɔ), and traditional proverbs (Ɛbɛ).',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Narrate traditional folktales, identify character motifs (trickster Ananse), and extract philosophical moral lessons.',
                  exemplars: ['Retell an Ananse story on wisdom and dramatize the story in class.'],
                  suggestedTLMs: ['Folktale storybooks', 'Traditional storyteller props (flywhisk, stool)'],
                  keyWords: ['Folktales (Anansesεm)', 'Moral Lessons', 'Proverbs (Ɛbɛ)', 'Riddles (Agyerekɔ)', 'Oral Tradition']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ghl_s2',
      name: 'Strand 2: Reading and Writing in Ghanaian Language',
      subStrands: [
        {
          id: 'ghl_s2_ss1',
          name: 'Sub-strand 1: Orthography, Grammar and Creative Writing',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate accurate spelling rules, noun-verb structures, and composition in the Ghanaian language.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Write a 200-word essay in Ghanaian language describing traditional puberty rites (Bragoro / Dipo) or chieftaincy installation.',
                  exemplars: ['Write a detailed account of Dipo or Bragoro rites and their cultural significance for moral training.'],
                  suggestedTLMs: ['Ghanaian language dictionaries', 'Puberty rites photo charts'],
                  keyWords: ['Orthography', 'Vowel Harmony', 'Puberty Rites (Bragoro/Dipo)', 'Chieftaincy', 'Essay']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const PHYSICAL_EDUCATION_DATA: GhanaSubjectData = {
  id: 'physical_education',
  name: 'Physical and Health Education (PHE)',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'phe_s1',
      name: 'Strand 1: Motor Skills and Movement Concepts',
      subStrands: [
        {
          id: 'phe_s1_ss1',
          name: 'Sub-strand 1: Locomotor, Non-Locomotor and Manipulative Skills',
          contentStandards: [
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate mastery of fundamental movement skills (running, leaping, skipping, catching, throwing).',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Demonstrate proper biomechanics in sprinting, baton exchange in 4x100m relay, and standing broad jump.',
                  exemplars: ['Perform downward sweep and visual baton handover during relay team drills on the school field.'],
                  suggestedTLMs: ['Relay batons', 'Cones', 'Stopwatch', 'Measuring tape for long jump'],
                  keyWords: ['Locomotor', 'Sprinting', 'Relay Handover', 'Broad Jump', 'Coordination']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate tactical and motor proficiency in association football, volleyball, handball, and athletics.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Execute fundamental ball handling skills in football (inside-foot passing, dribbling with laces, shooting on target).',
                  exemplars: ['Navigate ball through a zig-zag cone course and shoot into goal post within 10 seconds.'],
                  suggestedTLMs: ['Football balls (Size 5)', 'Agility training cones', 'Goal posts with net', 'Whistle'],
                  keyWords: ['Passing', 'Dribbling', 'Trapping', 'Shooting', 'Football Rules', 'Fair Play']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Demonstrate volleyball skills (underhand service, overhead set, bump pass, and court positioning).',
                  exemplars: ['Complete 10 continuous bump passes with a partner over the volleyball net.'],
                  suggestedTLMs: ['Volleyball balls', 'Volleyball net and posts'],
                  keyWords: ['Volleyball', 'Bump Pass', 'Overhead Set', 'Service', 'Rotation']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'phe_s2',
      name: 'Strand 2: Physical Fitness, Nutrition and Wellness',
      subStrands: [
        {
          id: 'phe_s2_ss1',
          name: 'Sub-strand 1: Health-Related and Skill-Related Fitness Components',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate testing and improvement of cardiovascular endurance, flexibility, strength, and agility.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Perform standard fitness tests (Beep test / Shuttle run, Sit-and-Reach test, Push-ups, and calculate Target Heart Rate).',
                  exemplars: ['Measure resting pulse rate and calculate target heart rate zone during aerobic circuit training.'],
                  suggestedTLMs: ['Stopwatch', 'Sit-and-reach flexibility box', 'Yoga mats', 'Fitness assessment scorecards'],
                  keyWords: ['Cardiovascular Endurance', 'Flexibility', 'Muscular Strength', 'Target Heart Rate', 'Aerobic Exercise']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const FRENCH_DATA: GhanaSubjectData = {
  id: 'french',
  name: 'French',
  levels: ['Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'fr_s1',
      name: 'Strand 1: Oral Expression and Communication',
      subStrands: [
        {
          id: 'fr_s1_ss1',
          name: 'Sub-strand 1: Salutations, Se Présenter (Self-Introduction) and Daily Life',
          contentStandards: [
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate basic French communication: greeting, introducing oneself and others, and describing objects.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Saluer et se présenter en français (Nom, Âge, Nationalité, Profession, Ville d\'origine).',
                  exemplars: ['Introduce oneself: "Bonjour, je m\'appelle Kwame, j\'ai 13 ans, je suis ghanéen et j\'habite à Kumasi."'],
                  suggestedTLMs: ['Flashcards with French phrases', 'Audio dialogues in French', 'Ghana-France friendship flag cards'],
                  keyWords: ['Bonjour', 'Comment vous appelez-vous?', 'Je m\'appelle', 'Nationalité', 'Âge', 'Verbe S\'appeler', 'Verbe Avoir']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Identifier et nommer les objets de la classe et les membres de la famille en français.',
                  exemplars: ['Name classroom objects: un stylo, un livre, une règle, le tableau, la trousse with correct gender articles (le, la, un, une).'],
                  suggestedTLMs: ['Classroom objects labeled in French', 'Family tree chart in French'],
                  keyWords: ['Articles Définis (le, la, les)', 'Articles Indéfinis (un, une, des)', 'La Famille (père, mère, frère, sœur)']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const KINDERGARTEN_DATA: GhanaSubjectData = {
  id: 'kindergarten',
  name: 'Kindergarten / Early Childhood',
  levels: ['Nursery 1', 'Nursery 2', 'KG 1', 'KG 2'],
  strands: [
    {
      id: 'kg_s1',
      name: 'Strand 1: All About Me',
      subStrands: [
        {
          id: 'kg_s1_ss1',
          name: 'Sub-strand 1: I am a Special Child',
          contentStandards: [
            {
              code: 'KG1.1.1.1',
              description: 'Demonstrate awareness of self, name, gender, and school environment through play-based activities.',
              indicators: [
                {
                  code: 'KG1.1.1.1.1',
                  description: 'State own full name, age, and point to body parts in action rhymes and circle games.',
                  exemplars: ['Sing "Head, Shoulders, Knees and Toes" and point to correct body parts.'],
                  suggestedTLMs: ['Big picture books', 'Hand puppets', 'Mirror', 'Crayons'],
                  keyWords: ['My Name', 'Boy/Girl', 'Eyes', 'Hands', 'Circle Time', 'Rhymes']
                }
              ]
            },
            {
              code: 'KG2.1.1.1',
              description: 'Demonstrate pre-writing, letter sound recognition (Phonics), and early numeracy concepts (1–20).',
              indicators: [
                {
                  code: 'KG2.1.1.1.1',
                  description: 'Trace pre-writing patterns and recognize initial phonetic letter sounds (/s/, /a/, /t/, /p/, /i/, /n/).',
                  exemplars: ['Form letters in sand tray and match picture cards starting with sound /a/ (apple, ant).'],
                  suggestedTLMs: ['Sand trays', 'Plasticine / Playdough', 'Jolly Phonics sound flashcards', 'Counting beads'],
                  keyWords: ['Phonics', 'Letter Sounds', 'Sand Tray', 'Counting 1-20', 'Tracing']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
