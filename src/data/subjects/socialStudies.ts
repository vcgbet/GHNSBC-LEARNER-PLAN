import { GhanaSubjectData } from '../../types';

export const SOCIAL_STUDIES_DATA: GhanaSubjectData = {
  id: 'social_studies',
  name: 'Social Studies',
  levels: ['Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'soc_s1',
      name: 'Strand 1: Environmental and Social Issues',
      subStrands: [
        {
          id: 'soc_s1_ss1',
          name: 'Sub-strand 1: The Physical Environment and Environmental Degradation',
          contentStandards: [
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate understanding of the physical environment, weather, landforms, and human impact on ecosystems.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Examine components of the physical environment (atmosphere, lithosphere, hydrosphere, biosphere) and explain human-environment interactions.',
                  exemplars: ['Create a concept map showing how human settlement, farming, and mining alter the lithosphere and hydrosphere in Ghana.'],
                  suggestedTLMs: ['Physical map of Ghana', 'Environmental case study photos', 'Ecosystem diagrams'],
                  keyWords: ['Physical Environment', 'Biosphere', 'Atmosphere', 'Hydrosphere', 'Ecosystem', 'Human Impact']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Analyze causes, effects, and management of environmental degradation (galamsey, deforestation, coastal erosion, air/plastic pollution).',
                  exemplars: ['Examine coastal erosion in Keta/Ada and propose community barrier solutions and mangrove planting.'],
                  suggestedTLMs: ['Photographs of coastal erosion and galamsey sites', 'Documentary clips'],
                  keyWords: ['Environmental Degradation', 'Deforestation', 'Coastal Erosion', 'Mangroves', 'Pollution Control']
                }
              ]
            },
            {
              code: 'B8.1.1.1',
              description: 'Examine climate change, global warming, and disaster risk management in Ghana.',
              indicators: [
                {
                  code: 'B8.1.1.1.1',
                  description: 'Explain causes of greenhouse effect, global warming, and practical climate adaptation strategies in agriculture and energy.',
                  exemplars: ['Design a community sensitization action plan on reducing bushfires and adopting drought-resistant crops.'],
                  suggestedTLMs: ['Greenhouse effect infographic', 'NADMO disaster management pamphlets'],
                  keyWords: ['Climate Change', 'Greenhouse Gases', 'Global Warming', 'Adaptation', 'NADMO']
                }
              ]
            }
          ]
        },
        {
          id: 'soc_s1_ss2',
          name: 'Sub-strand 2: Population, Migration and Urbanization in Ghana',
          contentStandards: [
            {
              code: 'B7.1.2.1',
              description: 'Demonstrate understanding of population structure, census, and rural-urban migration.',
              indicators: [
                {
                  code: 'B7.1.2.1.1',
                  description: 'Analyze the population structure of Ghana (age, sex distribution, dependency ratio) based on recent population and housing census data.',
                  exemplars: ['Construct and interpret a population pyramid for Ghana showing a broad base of young population.'],
                  suggestedTLMs: ['Ghana Statistical Service census charts', 'Population pyramid diagrams'],
                  keyWords: ['Population Census', 'Dependency Ratio', 'Birth Rate', 'Death Rate', 'Population Pyramid']
                },
                {
                  code: 'B7.1.2.1.2',
                  description: 'Investigate push and pull factors of rural-urban migration and its socioeconomic consequences on Ghanaian cities.',
                  exemplars: ['Debate measures to reduce youth migration from rural northern communities to urban centers (Kayayei phenomenon).'],
                  suggestedTLMs: ['Migration route maps of Ghana', 'Case study cards on urban challenges (traffic, slums, sanitation)'],
                  keyWords: ['Rural-Urban Migration', 'Push Factors', 'Pull Factors', 'Slums', 'Urbanization', 'Decongesting']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'soc_s2',
      name: 'Strand 2: Governance, Politics and Stability',
      subStrands: [
        {
          id: 'soc_s2_ss1',
          name: 'Sub-strand 1: The 1992 Constitution, Democratic Governance and Rule of Law',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate understanding of the 1992 Fourth Republican Constitution and democratic institutions in Ghana.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Explain the importance of the Constitution as the supreme law of Ghana and the roles of the three arms of government (Executive, Legislature, Judiciary).',
                  exemplars: ['Conduct a mock parliamentary session debating a community development bill.'],
                  suggestedTLMs: ['Copy of the 1992 Constitution of Ghana', 'Org chart of Ghana Government', 'Photos of Parliament and Supreme Court'],
                  keyWords: ['Constitution', 'Rule of Law', 'Executive', 'Parliament / Legislature', 'Judiciary', 'Checks and Balances', 'Separation of Powers']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Explain functions of independent governance bodies (CHRAJ, Electoral Commission, NCCE, Media Commission).',
                  exemplars: ['Discuss how NCCE educates citizens on their civic duties and how CHRAJ investigates human rights abuses.'],
                  suggestedTLMs: ['NCCE citizen handbook', 'CHRAJ educational posters'],
                  keyWords: ['CHRAJ', 'Electoral Commission', 'NCCE', 'Human Rights', 'Civic Responsibility']
                }
              ]
            },
            {
              code: 'B8.2.1.1',
              description: 'Examine citizenship, rights, responsibilities, and maintaining national unity.',
              indicators: [
                {
                  code: 'B8.2.1.1.1',
                  description: 'Distinguish between fundamental human rights and civic duties of Ghanaian citizens (paying taxes, voting, protecting public property).',
                  exemplars: ['Create a pledge card listing 5 personal civic duties to protect state property and promote peace.'],
                  suggestedTLMs: ['Fundamental Human Rights summary booklet'],
                  keyWords: ['Citizenship', 'Human Rights', 'Civic Duties', 'Patriotism', 'National Unity']
                }
              ]
            }
          ]
        },
        {
          id: 'soc_s2_ss2',
          name: 'Sub-strand 2: Local Government and Decentralization',
          contentStandards: [
            {
              code: 'B7.2.2.1',
              description: 'Demonstrate understanding of Ghana’s local government system (Metropolitan, Municipal, District Assemblies - MMDAs).',
              indicators: [
                {
                  code: 'B7.2.2.1.1',
                  description: 'Describe the structure and functions of MMDAs, District Chief Executives (DCEs), and Unit Committees in grassroots development.',
                  exemplars: ['Trace how assembly members represent community grievances to the District Assembly for borehole or school construction.'],
                  suggestedTLMs: ['Organogram of MMDA', 'District map with electoral areas'],
                  keyWords: ['Decentralization', 'MMDAs', 'DCE / MCE', 'Assembly Member', 'Unit Committee', 'Property Rate']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'soc_s3',
      name: 'Strand 3: Socio-Economic Development',
      subStrands: [
        {
          id: 'soc_s3_ss1',
          name: 'Sub-strand 1: Financial Literacy, Entrepreneurship and Resource Management',
          contentStandards: [
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate understanding of money management, savings, investment, and entrepreneurial skills.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Prepare a personal budget, differentiate needs from wants, and explain the benefits of banking and digital financial services (Mobile Money).',
                  exemplars: ['Draft a weekly pocket money budget allocating funds for food, savings, and stationery.'],
                  suggestedTLMs: ['Budget planner worksheet', 'Specimen bank deposit slips', 'MoMo security advisory cards'],
                  keyWords: ['Budget', 'Needs vs Wants', 'Savings', 'Investment', 'Mobile Money (MoMo)', 'Financial Literacy']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Identify characteristics of successful entrepreneurs in Ghana and explore small-scale agribusiness/service ventures.',
                  exemplars: ['Study profiles of prominent Ghanaian entrepreneurs and identify qualities such as risk-taking, resilience, and innovation.'],
                  suggestedTLMs: ['Case studies of Ghanaian business leaders', 'Business plan outline sheets'],
                  keyWords: ['Entrepreneur', 'Innovation', 'Business Plan', 'Value Addition', 'Agribusiness']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
