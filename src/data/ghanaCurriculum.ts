import { GhanaSubjectData } from '../types';
import { MATHEMATICS_DATA } from './subjects/mathematics';
import { SCIENCE_DATA } from './subjects/science';
import { ENGLISH_DATA } from './subjects/english';
import { COMPUTING_DATA } from './subjects/computing';
import { SOCIAL_STUDIES_DATA } from './subjects/socialStudies';
import { CAREER_TECHNOLOGY_DATA } from './subjects/careerTechnology';
import { CREATIVE_ARTS_DATA, HISTORY_DATA, RME_DATA } from './subjects/creativeArts';
import { OWOP_DATA, GHANAIAN_LANGUAGE_DATA, PHYSICAL_EDUCATION_DATA, FRENCH_DATA, KINDERGARTEN_DATA } from './subjects/owop';

export const GHANA_CURRICULUM_DATA: GhanaSubjectData[] = [
  COMPUTING_DATA,
  MATHEMATICS_DATA,
  SCIENCE_DATA,
  ENGLISH_DATA,
  SOCIAL_STUDIES_DATA,
  CAREER_TECHNOLOGY_DATA,
  CREATIVE_ARTS_DATA,
  HISTORY_DATA,
  RME_DATA,
  OWOP_DATA,
  GHANAIAN_LANGUAGE_DATA,
  PHYSICAL_EDUCATION_DATA,
  FRENCH_DATA,
  KINDERGARTEN_DATA
];

// Helper functions for easy curriculum lookups
export function getSubjectByName(subjectName: string): GhanaSubjectData | undefined {
  if (!subjectName) return undefined;
  const lower = subjectName.toLowerCase().trim();
  return GHANA_CURRICULUM_DATA.find(s => 
    s.name.toLowerCase() === lower || 
    s.id.toLowerCase() === lower ||
    s.name.toLowerCase().includes(lower) ||
    lower.includes(s.name.toLowerCase())
  );
}

export function getAllSubjects(): string[] {
  return GHANA_CURRICULUM_DATA.map(s => s.name);
}
