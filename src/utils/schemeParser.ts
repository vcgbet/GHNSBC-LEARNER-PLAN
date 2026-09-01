import { ExtractedSchemeDetails } from '../types';
import { GHANA_CURRICULUM_DATA } from '../data/ghanaCurriculum';

/**
 * Parses raw text from a Scheme of Learning document or text paste
 * and extracts standard NaCCA curriculum fields.
 */
export function parseSchemeText(rawText: string): ExtractedSchemeDetails {
  if (!rawText || !rawText.trim()) {
    return {};
  }

  const result: ExtractedSchemeDetails = {};
  const text = rawText.trim();
  const lowerText = text.toLowerCase();

  // 1. Extract Subject
  for (const subjectData of GHANA_CURRICULUM_DATA) {
    const subjName = subjectData.name.toLowerCase();
    if (lowerText.includes(subjName)) {
      result.subject = subjectData.name;
      break;
    }
  }

  // Fallback subject keywords if exact match not found
  if (!result.subject) {
    if (lowerText.includes('math')) result.subject = 'Mathematics';
    else if (lowerText.includes('sci')) result.subject = 'Science';
    else if (lowerText.includes('eng') || lowerText.includes('literacy')) result.subject = 'English Language';
    else if (lowerText.includes('owop') || lowerText.includes('our world')) result.subject = 'Our World Our People (OWOP)';
    else if (lowerText.includes('comp') || lowerText.includes('ict')) result.subject = 'Computing';
    else if (lowerText.includes('art') || lowerText.includes('creative')) result.subject = 'Creative Arts';
    else if (lowerText.includes('rme') || lowerText.includes('religious')) result.subject = 'Religious and Moral Education (RME)';
    else if (lowerText.includes('hist')) result.subject = 'History';
    else if (lowerText.includes('french')) result.subject = 'French';
    else if (lowerText.includes('ghanaian') || lowerText.includes('twi') || lowerText.includes('fante') || lowerText.includes('ga') || lowerText.includes('ewe')) result.subject = 'Ghanaian Language';
  }

  // 2. Extract Indicator Code (e.g., B4.1.1.1.1 or B7.2.3.1.2)
  const indicatorRegex = /\b([B|b|KG|kg][1-9]?\.\d+\.\d+\.\d+\.\d+)\b/;
  const indicatorMatch = text.match(indicatorRegex);
  if (indicatorMatch) {
    result.indicator = indicatorMatch[1].toUpperCase();
  }

  // 3. Extract Content Standard Code (e.g., B4.1.1.1 or B7.2.3.1)
  const csRegex = /\b([B|b|KG|kg][1-9]?\.\d+\.\d+\.\d+)\b/;
  const csMatch = text.match(csRegex);
  if (csMatch) {
    result.contentStandard = csMatch[1].toUpperCase();
  }

  // If Indicator code was found, attempt to match against known Ghana Curriculum database
  if (result.indicator || result.contentStandard) {
    const searchCode = result.indicator || result.contentStandard || '';
    const prefixMatch = searchCode.match(/^([B|b][1-9])/i);
    
    // Check if class level can be inferred from code (e.g. B4 -> Basic 4)
    if (prefixMatch) {
      const levelNum = prefixMatch[1].charAt(1);
      result.classLevel = `Basic ${levelNum}`;
    }

    // Lookup in database
    for (const subjectObj of GHANA_CURRICULUM_DATA) {
      for (const strandObj of subjectObj.strands) {
        for (const subStrandObj of strandObj.subStrands) {
          for (const csObj of subStrandObj.contentStandards) {
            if (csObj.code.toLowerCase() === (result.contentStandard || '').toLowerCase()) {
              if (!result.subject) result.subject = subjectObj.name;
              result.strand = strandObj.name;
              result.subStrand = subStrandObj.name;
              result.contentStandard = `${csObj.code}: ${csObj.description}`;
              
              if (result.indicator) {
                const indObj = csObj.indicators.find(i => i.code.toLowerCase() === result.indicator?.toLowerCase());
                if (indObj) {
                  result.indicator = `${indObj.code}: ${indObj.description}`;
                  if (indObj.suggestedTLMs && indObj.suggestedTLMs.length > 0) {
                    result.teachingResources = indObj.suggestedTLMs;
                  }
                }
              }
              break;
            }
          }
        }
      }
    }
  }

  // 4. Extract Class Level if not matched
  if (!result.classLevel) {
    const classRegex = /\b(Basic\s*[1-9]|Primary\s*[1-6]|JHS\s*[1-3]|KG\s*[1-2]|Grade\s*[1-9]|B[1-9])\b/i;
    const classMatch = text.match(classRegex);
    if (classMatch) {
      const rawCls = classMatch[1].toUpperCase();
      if (rawCls.startsWith('B') && rawCls.length === 2) {
        result.classLevel = `Basic ${rawCls.charAt(1)}`;
      } else {
        result.classLevel = classMatch[1];
      }
    }
  }

  // 5. Extract Strand if not matched
  if (!result.strand) {
    const strandRegex = /(?:Strand|STRAND)\s*\d*[:\s-]*([^\n\r,;:]+)/i;
    const strandMatch = text.match(strandRegex);
    if (strandMatch && strandMatch[1]) {
      result.strand = strandMatch[1].trim();
    }
  }

  // 6. Extract Sub-strand if not matched
  if (!result.subStrand) {
    const subStrandRegex = /(?:Sub-strand|SUB-STRAND|Substrand)\s*\d*[:\s-]*([^\n\r,;:]+)/i;
    const subStrandMatch = text.match(subStrandRegex);
    if (subStrandMatch && subStrandMatch[1]) {
      result.subStrand = subStrandMatch[1].trim();
    }
  }

  // 7. Extract Week Ending
  const weekEndingRegex = /(?:Week\s*Ending|Ending|Date)[:\s]*([^\n\r,;]+)/i;
  const weekMatch = text.match(weekEndingRegex);
  if (weekMatch && weekMatch[1]) {
    result.weekEnding = weekMatch[1].trim();
  }

  // 8. Extract TLMs / Resources
  if (!result.teachingResources || result.teachingResources.length === 0) {
    const tlmsRegex = /(?:TLMs|TLM|Resources|Teaching\s*Materials|Learning\s*Materials)[:\s]*([^\n\r]+)/i;
    const tlmMatch = text.match(tlmsRegex);
    if (tlmMatch && tlmMatch[1]) {
      result.teachingResources = tlmMatch[1].split(/[,;]/).map(s => s.trim()).filter(Boolean);
    }
  }

  // 9. School Name & Teacher Name if present
  const schoolRegex = /(?:School\s*Name|School)[:\s]*([^\n\r]+)/i;
  const schoolMatch = text.match(schoolRegex);
  if (schoolMatch && schoolMatch[1]) {
    result.schoolName = schoolMatch[1].trim();
  }

  const teacherRegex = /(?:Teacher's\s*Name|Teacher|Instructor)[:\s]*([^\n\r]+)/i;
  const teacherMatch = text.match(teacherRegex);
  if (teacherMatch && teacherMatch[1]) {
    result.teacherName = teacherMatch[1].trim();
  }

  return result;
}
