export interface CoreCompetencyOption {
  code: 'CP' | 'CC' | 'CI' | 'CG' | 'PL' | 'DL';
  name: string;
  fullName: string;
  description: string;
}

export const NACCA_CORE_COMPETENCIES: CoreCompetencyOption[] = [
  {
    code: 'CP',
    name: 'Critical Thinking & Problem Solving',
    fullName: 'Critical Thinking and Problem Solving (CP)',
    description: 'Ability to analyze situations, evaluate evidence, and solve complex problems logically.'
  },
  {
    code: 'CC',
    name: 'Communication & Collaboration',
    fullName: 'Communication and Collaboration (CC)',
    description: 'Ability to express ideas clearly, listen actively, and work effectively in group teams.'
  },
  {
    code: 'CI',
    name: 'Creativity & Innovation',
    fullName: 'Creativity and Innovation (CI)',
    description: 'Ability to generate novel ideas, construct models, and apply innovative methods.'
  },
  {
    code: 'DL',
    name: 'Digital Literacy',
    fullName: 'Digital Literacy (DL)',
    description: 'Ability to discover, evaluate, create, and communicate information using digital technology.'
  },
  {
    code: 'PL',
    name: 'Personal Development & Leadership',
    fullName: 'Personal Development and Leadership (PL)',
    description: 'Building self-awareness, emotional resilience, ethical decision-making, and teamwork leadership.'
  },
  {
    code: 'CG',
    name: 'Cultural Identity & Global Citizenship',
    fullName: 'Cultural Identity and Global Citizenship (CG)',
    description: 'Appreciation of Ghanaian cultural heritage, civic responsibilities, and global perspective.'
  }
];

export function getAutoCoreCompetencies(subject: string, strand?: string, subStrand?: string): string[] {
  const subjLower = (subject || '').toLowerCase();
  const strLower = `${strand || ''} ${subStrand || ''}`.toLowerCase();

  const competencies: string[] = [];

  // Core defaults
  competencies.push('Critical Thinking and Problem Solving (CP)');
  competencies.push('Communication and Collaboration (CC)');

  // Subject and Strand Mappings
  if (subjLower.includes('math')) {
    competencies.push('Creativity and Innovation (CI)');
    if (strLower.includes('data') || strLower.includes('geometry') || strLower.includes('measurement')) {
      competencies.push('Digital Literacy (DL)');
    }
  } else if (subjLower.includes('sci')) {
    competencies.push('Creativity and Innovation (CI)');
    competencies.push('Digital Literacy (DL)');
    if (strLower.includes('environment') || strLower.includes('life')) {
      competencies.push('Cultural Identity and Global Citizenship (CG)');
    }
  } else if (subjLower.includes('eng') || subjLower.includes('lang') || subjLower.includes('literacy')) {
    competencies.push('Personal Development and Leadership (PL)');
    competencies.push('Cultural Identity and Global Citizenship (CG)');
  } else if (subjLower.includes('our world') || subjLower.includes('owop') || subjLower.includes('social') || subjLower.includes('rme') || subjLower.includes('history')) {
    competencies.push('Cultural Identity and Global Citizenship (CG)');
    competencies.push('Personal Development and Leadership (PL)');
  } else if (subjLower.includes('comp') || subjLower.includes('ict') || subjLower.includes('tech')) {
    competencies.push('Digital Literacy (DL)');
    competencies.push('Creativity and Innovation (CI)');
  } else if (subjLower.includes('art') || subjLower.includes('creative')) {
    competencies.push('Creativity and Innovation (CI)');
    competencies.push('Cultural Identity and Global Citizenship (CG)');
  } else {
    competencies.push('Creativity and Innovation (CI)');
    competencies.push('Personal Development and Leadership (PL)');
  }

  return Array.from(new Set(competencies));
}
