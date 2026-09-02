import { GhanaSubjectData, GhanaCurriculumStrand } from '../types';
import { MATHEMATICS_DATA } from './subjects/mathematics';
import { SCIENCE_DATA } from './subjects/science';
import { ENGLISH_DATA } from './subjects/english';
import { COMPUTING_DATA } from './subjects/computing';
import { SOCIAL_STUDIES_DATA } from './subjects/socialStudies';
import { CAREER_TECHNOLOGY_DATA } from './subjects/careerTechnology';
import { CREATIVE_ARTS_DATA, HISTORY_DATA, RME_DATA } from './subjects/creativeArts';
import { OWOP_DATA, GHANAIAN_LANGUAGE_DATA, PHYSICAL_EDUCATION_DATA, FRENCH_DATA, KINDERGARTEN_DATA } from './subjects/owop';

// JHS (Basic 7-9) curriculum extracted from the official NaCCA guides,
// split into per-level strand entries (see src/data/subjects/jhs/).
import { JHS_MATH_STRANDS } from './subjects/jhs/mathJhs';
import { JHS_SCIENCE_STRANDS } from './subjects/jhs/scienceJhs';
import { JHS_ENGLISH_STRANDS } from './subjects/jhs/englishJhs';
import { JHS_SOCIAL_STUDIES_STRANDS } from './subjects/jhs/socialJhs';
import { JHS_COMPUTING_STRANDS } from './subjects/jhs/computingJhs';
import { JHS_CREATIVE_ARTS_STRANDS } from './subjects/jhs/creativeJhs';
import { JHS_CAREER_TECHNOLOGY_STRANDS } from './subjects/jhs/careerTechJhs';
import { JHS_RME_STRANDS } from './subjects/jhs/rmeJhs';
import { JHS_GHANAIAN_LANGUAGE_STRANDS } from './subjects/jhs/ghlangJhs';
import { JHS_FRENCH_STRANDS } from './subjects/jhs/frenchJhs';
import { JHS_PHYSICAL_EDUCATION_STRANDS } from './subjects/jhs/pheJhs';

// Merge the full JHS (Basic 7-9) strands into a subject, keeping any
// pre-existing (primary) strand entries untouched.
function withJhs(data: GhanaSubjectData, jhs: GhanaCurriculumStrand[]): GhanaSubjectData {
  if (!jhs || jhs.length === 0) return data;
  const usedIds = new Set(data.strands.map(s => s.id));
  const merged = jhs.map(s => (usedIds.has(s.id) ? { ...s, id: s.id + '_jhs' } : s));
  return { ...data, strands: [...data.strands, ...merged] };
}

export const GHANA_CURRICULUM_DATA: GhanaSubjectData[] = [
  withJhs(COMPUTING_DATA, JHS_COMPUTING_STRANDS),
  withJhs(MATHEMATICS_DATA, JHS_MATH_STRANDS),
  withJhs(SCIENCE_DATA, JHS_SCIENCE_STRANDS),
  withJhs(ENGLISH_DATA, JHS_ENGLISH_STRANDS),
  withJhs(SOCIAL_STUDIES_DATA, JHS_SOCIAL_STUDIES_STRANDS),
  withJhs(CAREER_TECHNOLOGY_DATA, JHS_CAREER_TECHNOLOGY_STRANDS),
  withJhs(CREATIVE_ARTS_DATA, JHS_CREATIVE_ARTS_STRANDS),
  HISTORY_DATA,
  withJhs(RME_DATA, JHS_RME_STRANDS),
  OWOP_DATA,
  withJhs(GHANAIAN_LANGUAGE_DATA, JHS_GHANAIAN_LANGUAGE_STRANDS),
  withJhs(PHYSICAL_EDUCATION_DATA, JHS_PHYSICAL_EDUCATION_STRANDS),
  withJhs(FRENCH_DATA, JHS_FRENCH_STRANDS),
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
