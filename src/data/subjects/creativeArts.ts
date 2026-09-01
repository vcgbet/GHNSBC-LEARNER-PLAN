import { GhanaSubjectData } from '../../types';

export const CREATIVE_ARTS_DATA: GhanaSubjectData = {
  id: 'creative_arts',
  name: 'Creative Arts and Design',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'ca_s1',
      name: 'Strand 1: Visual Arts',
      subStrands: [
        {
          id: 'ca_s1_ss1',
          name: 'Sub-strand 1: Drawing, Shading, Painting and Color Theory',
          contentStandards: [
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate basic drawing, color mixing, and pattern design using primary and secondary colors.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Mix primary colors (Red, Yellow, Blue) to create secondary colors (Orange, Green, Purple) on a color wheel.',
                  exemplars: ['Paint a 6-segment color wheel using poster paints and flat brushes.'],
                  suggestedTLMs: ['Poster paints (Red, Yellow, Blue)', 'Palette', 'Paint brushes', 'Color wheel template'],
                  keyWords: ['Primary Colors', 'Secondary Colors', 'Color Wheel', 'Color Mixing']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate proficiency in still life drawing, tonal shading techniques, and color harmonies.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Create a still life drawing of local pottery and fruit basket applying cross-hatching, stippling, and smooth tonal gradation.',
                  exemplars: ['Render light source, highlights, mid-tones, core shadows, and cast shadows on a clay pot drawing.'],
                  suggestedTLMs: ['Earthenware pot', 'Fruit basket', 'Drawing pencils (2B, 4B, 6B)', 'Sketch pad', 'Blending stump'],
                  keyWords: ['Still Life', 'Cross-Hatching', 'Tonal Value', 'Highlights', 'Cast Shadow', 'Gradation']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Design patterns inspired by traditional Ghanaian Adinkra symbols and explain their symbolic meanings (e.g., Gye Nyame, Sankofa).',
                  exemplars: ['Carve Adinkra stamps from foam/calabash and stamp repeating border patterns on cotton fabric with fabric paint.'],
                  suggestedTLMs: ['Adinkra symbol charts', 'Calabash / high-density foam stamps', 'Black textile dye / acrylics', 'Plain fabric'],
                  keyWords: ['Adinkra Symbols', 'Gye Nyame', 'Sankofa', 'Motif', 'Pattern', 'Block Printing', 'Cultural Heritage']
                }
              ]
            }
          ]
        },
        {
          id: 'ca_s1_ss2',
          name: 'Sub-strand 2: Weaving, Modeling and Sculpture',
          contentStandards: [
            {
              code: 'B7.1.2.1',
              description: 'Demonstrate techniques in clay modeling, papier-mâché, and traditional basketry weaving.',
              indicators: [
                {
                  code: 'B7.1.2.1.1',
                  description: 'Model a functional or decorative 3D pottery bowl using pinch, coil, or slab clay building methods.',
                  exemplars: ['Construct a coil clay pot with smooth burnished surface and decorative incised patterns.'],
                  suggestedTLMs: ['Natural pottery clay', 'Modeling tools', 'Water sponge', 'Clay wire cutter'],
                  keyWords: ['Coil Method', 'Pinch Pot', 'Slab Construction', 'Clay Modeling', 'Leather-hard', 'Kiln Firing']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ca_s2',
      name: 'Strand 2: Performing Arts (Music, Dance, Drama)',
      subStrands: [
        {
          id: 'ca_s2_ss1',
          name: 'Sub-strand 1: Ghanaian Traditional Music, Instruments and Rhythms',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate performance of Ghanaian indigenous dances, drum language, and musical notation.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Perform rhythmic bell patterns (Gankogui/Dawuro) and drum ensembles for traditional dances (Adowa, Kpanlogo, Agbadza, Kundum, Damba).',
                  exemplars: ['Play the foundational timeline on the double bell (Gankogui) while other learners play master drum and supporting drums.'],
                  suggestedTLMs: ['Traditional instruments (Gankogui, Axatse rattle, Atumpan talking drums, Fontomfrom, Kpanlogo drums)'],
                  keyWords: ['Adowa', 'Kpanlogo', 'Agbadza', 'Gankogui', 'Atumpan', 'Polyrhythm', 'Timeline Pattern', 'Master Drum']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Read and write basic staff notation notes (treble clef, crotchet, minim, quaver, time signatures 2/4, 3/4, 4/4).',
                  exemplars: ['Sight-sing a 4-bar melody written on the music staff using sol-fa syllables (d, r, m, f, s, l, t, d\').'],
                  suggestedTLMs: ['Music staff manuscript paper', 'Recorder / Melodica', 'Sol-fa chart'],
                  keyWords: ['Staff Notation', 'Treble Clef', 'Time Signature', 'Sol-fa (d-r-m)', 'Pitch', 'Duration']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const HISTORY_DATA: GhanaSubjectData = {
  id: 'history',
  name: 'History of Ghana',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'hist_s1',
      name: 'Strand 1: History and Origins of the Major Ethnic Groups in Ghana',
      subStrands: [
        {
          id: 'hist_s1_ss1',
          name: 'Sub-strand 1: Migration and Settlement of Ethnic Groups',
          contentStandards: [
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate understanding of the migration routes and early settlements of major ethnic groups in Ghana.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Trace the migration routes of the Akan, Ewe, Ga-Adangbe, Mole-Dagbani, and Guan into present-day Ghana.',
                  exemplars: ['Draw migration arrows on a map of West Africa showing Akan from ancient Ghana empire/Bono Manso and Ewe from Notsie.'],
                  suggestedTLMs: ['Historical migration map of Ghana and West Africa', 'Picture stories of ethnic founders'],
                  keyWords: ['Migration', 'Akan', 'Mole-Dagbani', 'Ewe (Notsie)', 'Ga-Adangbe', 'Guan', 'Settlement']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Examine the socioeconomic and political organization of pre-colonial Ghanaian kingdoms and chiefdoms.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Analyze the state formation, military prowess, and administration of the Asante Kingdom, Dagbon, and Denkyira.',
                  exemplars: ['Examine the role of Okomfo Anokye and Osei Tutu I in founding the Asante Union and the Golden Stool (Sika Dwa).'],
                  suggestedTLMs: ['Photos of Golden Stool replica', 'Asante Kingdom historical map', 'Documentary on pre-colonial Ghana'],
                  keyWords: ['Asante Kingdom', 'Golden Stool', 'Osei Tutu I', 'Okomfo Anokye', 'Dagbon', 'Chieftaincy', 'State Formation']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'hist_s2',
      name: 'Strand 2: European Contact, Forts, Castles and Colonial Rule',
      subStrands: [
        {
          id: 'hist_s2_ss1',
          name: 'Sub-strand 1: European Arrival, Trans-Atlantic Slave Trade and Forts',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate understanding of European arrival, trade in Gold Coast, and the Trans-Atlantic Slave Trade.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Chronicle the arrival of Europeans (Portuguese in 1471, Dutch, British, Danes) and the construction of Elmina Castle (1482) and Cape Coast Castle.',
                  exemplars: ['Create a timeline of European arrival at Shama/Elmina and construction of major coastal forts and castles.'],
                  suggestedTLMs: ['Map of coastal forts and castles in Ghana', 'Photographs of Elmina and Cape Coast Castles'],
                  keyWords: ['Portuguese (Don Diego d\'Azambuja)', 'Elmina Castle', 'Cape Coast Castle', 'Christiansborg Castle', 'Trade Monopoly']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Analyze the triangular Trans-Atlantic Slave Trade, the Middle Passage, and its devastating demographic impact on Africa.',
                  exemplars: ['Examine the "Door of No Return" at Cape Coast Castle and trace the triangular trade routes between Europe, Africa, and the Americas.'],
                  suggestedTLMs: ['Triangular trade route map', 'Slave ship cargo diagram (Brookes ship)'],
                  keyWords: ['Trans-Atlantic Slave Trade', 'Triangular Trade', 'Middle Passage', 'Slave Dungeons', 'Door of No Return', 'Abolition']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'hist_s3',
      name: 'Strand 3: The Struggle for Independence and Modern Ghana',
      subStrands: [
        {
          id: 'hist_s3_ss1',
          name: 'Sub-strand 1: The 1948 Riots, The Big Six, and March 6 1957 Independence',
          contentStandards: [
            {
              code: 'B7.3.1.1',
              description: 'Analyze the nationalist struggle, political parties (UGCC, CPP), the 1948 Christiansborg crossroads shooting, and independence on 6th March 1957.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Examine the 28th February 1948 Christiansborg Crossroads shooting (killing of Sgt. Adjetey, Cpl. Attipoe, Pte. Odartey Lamptey) and resulting nationwide riots.',
                  exemplars: ['Role-play the ex-servicemen march to Christiansborg Castle and Watson Commission inquiry.'],
                  suggestedTLMs: ['Photographs of Sgt. Adjetey monument', 'Watson Commission report summary', 'Timeline poster of 1948-1957'],
                  keyWords: ['1948 Riots', 'Christiansborg Crossroads', 'Sgt. Adjetey', 'The Big Six', 'Watson Commission', 'Coussey Committee']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Evaluate the leadership of Osagyefo Dr. Kwame Nkrumah, the declaration of Independence on 6th March 1957, and founding of the First Republic (1960).',
                  exemplars: ['Analyze Kwame Nkrumah\'s famous speech: "At long last, the battle has ended! And thus, Ghana, your beloved country is free forever!"'],
                  suggestedTLMs: ['Audio/video of 1957 Independence speech', 'Portraits of The Big Six', 'Declaration photo at Old Polo Grounds'],
                  keyWords: ['Kwame Nkrumah', 'Independence (6 March 1957)', 'CPP', 'Positive Action', 'Old Polo Grounds', 'Pan-Africanism']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const RME_DATA: GhanaSubjectData = {
  id: 'rme',
  name: 'Religious and Moral Education (RME)',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'rme_s1',
      name: 'Strand 1: God, His Creation and Attributes',
      subStrands: [
        {
          id: 'rme_s1_ss1',
          name: 'Sub-strand 1: The Creation and Nature of God in the Three Major Religions',
          contentStandards: [
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate understanding of creation stories according to Christianity, Islam, and Indigenous African Religion.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Narrate and compare the creation stories in Genesis, the Holy Quran, and indigenous Akan/Ewe/Mole traditions.',
                  exemplars: ['Retell the 6-day Genesis creation account and the Islamic account of Allah creating the heavens and earth in 6 periods.'],
                  suggestedTLMs: ['Creation story picture books', 'Quranic and Biblical text extracts', 'Traditional creation folklore cards'],
                  keyWords: ['Creation', 'God (Onyame / Mawu / Allah)', 'Genesis', 'Quran', 'Environment Stewardship']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate understanding of the attributes of God (Omnipotence, Omniscience, Omnipresence, Mercy) in the three main religions.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Identify and explain local names and attributes of God in Ghanaian indigenous languages, Christianity, and Islam.',
                  exemplars: ['Explain indigenous names: Tweduampon (Dependable), Mawu Sogbolisa (Great and Wise), Naawuni (Lord of All), and Allah\'s 99 Names (Ar-Rahman, Al-Malik).'],
                  suggestedTLMs: ['Attributes of God chart', 'Language flashcards (Akan, Ewe, Ga, Dagbani)'],
                  keyWords: ['Attributes of God', 'Omnipotent', 'Omnipresent', 'Omniscient', 'Tweduampon', 'Ar-Rahman']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rme_s2',
      name: 'Strand 2: Religious Practices, Festivals and Worship',
      subStrands: [
        {
          id: 'rme_s2_ss1',
          name: 'Sub-strand 1: Prayer, Worship and Religious Festivals',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate understanding of types of prayer, rites of worship, and major religious festivals in Ghana.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Compare prayer forms and postures in Christianity (Lord\'s Prayer, intercession), Islam (5 Daily Salat, ablution/Wudu), and African Traditional Religion (Libation).',
                  exemplars: ['Demonstrate the steps of Islamic Wudu (ablution) and explain the cultural significance of libation prayers at durbars.'],
                  suggestedTLMs: ['Kettle / Buta for Wudu', 'Prayer mats', 'Christian prayer postures chart', 'Calabash for traditional libation'],
                  keyWords: ['Prayer', 'Salat (Fajr, Dhuhr, Asr, Maghrib, Isha)', 'Ablution (Wudu)', 'Libation', 'Intercession']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Explain moral and social significance of major religious festivals: Homowo, Hogbetsotso, Aboakyer, Eid-ul-Fitr, Eid-ul-Adha, Easter, and Christmas.',
                  exemplars: ['Describe the Hooting at Hunger ritual during Ga Homowo festival and sacrifice during Islamic Eid-ul-Adha.'],
                  suggestedTLMs: ['Festival photo albums', 'Traditional regalia pictures (kente, crowns)', 'Calendar of religious festivals'],
                  keyWords: ['Homowo', 'Hogbetsotso', 'Aboakyer', 'Eid-ul-Fitr', 'Eid-ul-Adha', 'Easter', 'Christmas', 'Reconciliation', 'Sacrifice']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rme_s3',
      name: 'Strand 3: Moral Teachings, Ethics and Character Building',
      subStrands: [
        {
          id: 'rme_s3_ss1',
          name: 'Sub-strand 1: Moral Values, Manners, Decency and Conflict Resolution',
          contentStandards: [
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate understanding of core moral values (Honesty, Integrity, Respect, Modesty, Patriotism) and peaceful conflict resolution.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Examine moral teachings of the Ten Commandments, Islamic Hadith on truthfulness, and African proverbs on respect for elders.',
                  exemplars: ['Analyze the moral lesson in African proverb: "When an elder is speaking, a child listens with humility".'],
                  suggestedTLMs: ['Proverb wisdom cards', 'Ten Commandments poster', 'Hadith moral quotations'],
                  keyWords: ['Moral Values', 'Honesty', 'Integrity', 'Respect for Elders', 'Ten Commandments', 'Hadith', 'Humility']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Demonstrate non-violent conflict resolution techniques (Negotiation, Mediation, Forgiveness) in home, school, and community situations.',
                  exemplars: ['Role-play resolving a dispute between two classmates without fighting using peer mediation.'],
                  suggestedTLMs: ['Conflict resolution flowchart', 'Role-play scenario task cards'],
                  keyWords: ['Conflict Resolution', 'Mediation', 'Reconciliation', 'Forgiveness', 'Dialogue', 'Peace Building']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
