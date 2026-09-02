import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Build-time curriculum fix.
 * The curriculum data contains Primary and JHS strands in the same subject
 * object. FormInput historically selected strands/content standards without
 * considering the selected class level. This transform makes the existing
 * curriculum cascade level-aware without changing the existing UI/features.
 */
function curriculumLevelFix(): Plugin {
  return {
    name: 'curriculum-level-fix',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/components/FormInput.tsx')) return null;

      const start = code.indexOf('  // Available subjects and cascading curriculum data from database');
      const end = code.indexOf('  const handleResetToSubjectPresets = () => {');
      if (start === -1 || end === -1 || end <= start) return null;

      const replacement = String.raw`  // Level-aware curriculum helpers.
  const normalize = (value: string) => (value || '').toLowerCase().trim();

  const getLevelPrefix = (classLevel: string) => {
    const lvl = normalize(classLevel);
    if (lvl.includes('7') || lvl.includes('jhs 1') || lvl.includes('jhs1')) return 'B7';
    if (lvl.includes('8') || lvl.includes('jhs 2') || lvl.includes('jhs2')) return 'B8';
    if (lvl.includes('9') || lvl.includes('jhs 3') || lvl.includes('jhs3')) return 'B9';
    if (lvl.includes('1') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b1'))) return 'B1';
    if (lvl.includes('2') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b2'))) return 'B2';
    if (lvl.includes('3') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b3'))) return 'B3';
    if (lvl.includes('4') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b4'))) return 'B4';
    if (lvl.includes('5') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b5'))) return 'B5';
    if (lvl.includes('6') && (lvl.includes('basic') || lvl.includes('primary') || lvl.includes('b6'))) return 'B6';
    if (lvl.includes('kg 1') || lvl.includes('kg1') || lvl.includes('kindergarten 1')) return 'KG1';
    if (lvl.includes('kg 2') || lvl.includes('kg2') || lvl.includes('kindergarten 2')) return 'KG2';
    if (lvl.includes('nursery 1') || lvl.includes('n1')) return 'N1';
    if (lvl.includes('nursery 2') || lvl.includes('n2')) return 'N2';
    return 'B4';
  };

  const isBasicPrefix = (prefix: string) => /^B[1-9]$/.test(prefix);

  // The important fix: filter the WHOLE hierarchy, not just the final
  // Content Standard. A strand may contain multiple levels, and a sub-strand
  // may also contain standards for different levels. We retain only branches
  // containing an exact B1...B9 code for the selected class.
  const getStrandsForLevel = (subjectData: any, classLevel: string) => {
    if (!subjectData) return [];
    const prefix = getLevelPrefix(classLevel);
    const strands = subjectData.strands || [];

    if (!isBasicPrefix(prefix)) {
      return strands.filter((s: any) => {
        const levels = Array.isArray(s.levels) ? s.levels.map((v: any) => normalize(String(v))) : [];
        return levels.length === 0 || levels.includes(normalize(classLevel));
      });
    }

    const target = prefix + '.';
    const filtered = strands.map((s: any) => {
      const subStrands = (s.subStrands || []).map((ss: any) => {
        const contentStandards = (ss.contentStandards || []).filter((cs: any) =>
          normalize(String(cs?.code || '')).startsWith(normalize(target))
        );
        return contentStandards.length ? { ...ss, contentStandards } : null;
      }).filter(Boolean);

      if (!subStrands.length) return null;
      return { ...s, subStrands };
    }).filter(Boolean);

    // For the official Primary/JHS datasets, Bx codes are present. This
    // fallback protects manually entered/custom curriculum records.
    if (filtered.length) return filtered;

    return strands.filter((s: any) => {
      const levels = Array.isArray(s.levels) ? s.levels.map((v: any) => normalize(String(v))) : [];
      return levels.includes(normalize(classLevel));
    });
  };

  const getLevelContentStandards = (subStrand: any, classLevel: string) => {
    if (!subStrand) return [];
    const all = subStrand.contentStandards || [];
    const prefix = getLevelPrefix(classLevel);

    if (isBasicPrefix(prefix)) {
      const matching = all.filter((cs: any) =>
        normalize(String(cs?.code || '')).startsWith(normalize(prefix + '.'))
      );
      return matching.length ? matching : all;
    }

    return all;
  };

  const getBestCSForLevel = (subStrand: any, classLevel: string) => {
    const standards = getLevelContentStandards(subStrand, classLevel);
    return standards[0];
  };

  const selectedSubjectData = GHANA_CURRICULUM_DATA.find(s =>
    normalize(s.name) === normalize(inputs.subject) ||
    normalize(inputs.subject).includes(normalize(s.name)) ||
    normalize(s.name).includes(normalize(inputs.subject))
  ) || GHANA_CURRICULUM_DATA[0];

  const availableStrands = getStrandsForLevel(selectedSubjectData, inputs.classLevel);

  const selectedStrandData = availableStrands.find((s: any) =>
    normalize(s.name) === normalize(inputs.strand) ||
    normalize(inputs.strand).includes(normalize(s.name)) ||
    normalize(s.name).includes(normalize(inputs.strand))
  ) || availableStrands[0];

  const availableSubStrands = selectedStrandData ? selectedStrandData.subStrands : [];

  const selectedSubStrandData = availableSubStrands.find((ss: any) =>
    normalize(ss.name) === normalize(inputs.subStrand) ||
    normalize(inputs.subStrand).includes(normalize(ss.name)) ||
    normalize(ss.name).includes(normalize(inputs.subStrand))
  ) || availableSubStrands[0];

  const availableContentStandards = getLevelContentStandards(selectedSubStrandData, inputs.classLevel);

  const selectedCSData = availableContentStandards.find((cs: any) =>
    normalize(inputs.contentStandard).startsWith(normalize(cs.code)) ||
    normalize(cs.code) === normalize(inputs.contentStandard) ||
    normalize(inputs.contentStandard).includes(normalize(cs.code))
  ) || getBestCSForLevel(selectedSubStrandData, inputs.classLevel) || availableContentStandards[0];

  const availableIndicators = selectedCSData ? selectedCSData.indicators : [];

  const selectedIndData = availableIndicators.find((ind: any) =>
    normalize(inputs.indicator).startsWith(normalize(ind.code)) ||
    normalize(ind.code) === normalize(inputs.indicator) ||
    normalize(inputs.indicator).includes(normalize(ind.code))
  ) || availableIndicators[0];

  const handleSubjectChange = (subjectName: string) => {
    const subjData = GHANA_CURRICULUM_DATA.find(s => normalize(s.name) === normalize(subjectName)) || GHANA_CURRICULUM_DATA[0];
    const levelStrands = getStrandsForLevel(subjData, inputs.classLevel);
    const firstStrand = levelStrands[0];
    const firstSubStrand = firstStrand?.subStrands?.[0];
    const bestCS = getBestCSForLevel(firstSubStrand, inputs.classLevel);
    const firstInd = bestCS?.indicators?.[0];
    const autoRef = getNaCCACurriculumReference(subjectName, inputs.classLevel, firstStrand?.name || '', firstSubStrand?.name || '', firstInd?.code || '');

    setInputs(prev => ({
      ...prev,
      subject: subjectName,
      strand: firstStrand?.name || '',
      subStrand: firstSubStrand?.name || '',
      contentStandard: bestCS ? bestCS.code + ': ' + bestCS.description : '',
      indicator: firstInd ? firstInd.code + ': ' + firstInd.description : '',
      references: autoRef
    }));
  };

  const handleStrandChange = (strandName: string) => {
    const strData = availableStrands.find((s: any) => s.name === strandName);
    const firstSubStrand = strData?.subStrands?.[0];
    const bestCS = getBestCSForLevel(firstSubStrand, inputs.classLevel);
    const firstInd = bestCS?.indicators?.[0];
    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, strandName, firstSubStrand?.name || '', firstInd?.code || '');

    setInputs(prev => ({
      ...prev,
      strand: strandName,
      subStrand: firstSubStrand?.name || '',
      contentStandard: bestCS ? bestCS.code + ': ' + bestCS.description : '',
      indicator: firstInd ? firstInd.code + ': ' + firstInd.description : '',
      references: autoRef
    }));
  };

  const handleSubStrandChange = (subStrandName: string) => {
    const subStrData = availableSubStrands.find((ss: any) => ss.name === subStrandName);
    const bestCS = getBestCSForLevel(subStrData, inputs.classLevel);
    const firstInd = bestCS?.indicators?.[0];
    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, inputs.strand, subStrandName, firstInd?.code || '');

    setInputs(prev => ({
      ...prev,
      subStrand: subStrandName,
      contentStandard: bestCS ? bestCS.code + ': ' + bestCS.description : '',
      indicator: firstInd ? firstInd.code + ': ' + firstInd.description : '',
      references: autoRef
    }));
  };

  const handleCSChange = (csCode: string) => {
    const csData = availableContentStandards.find((cs: any) =>
      normalize(cs.code) === normalize(csCode) || normalize(csCode).startsWith(normalize(cs.code))
    );
    const firstInd = csData?.indicators?.[0];
    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, inputs.strand, inputs.subStrand, firstInd?.code || '');

    setInputs(prev => ({
      ...prev,
      contentStandard: csData ? csData.code + ': ' + csData.description : csCode,
      indicator: firstInd ? firstInd.code + ': ' + firstInd.description : '',
      references: autoRef
    }));
  };

  const handleIndicatorChange = (indCode: string) => {
    let foundInd: any = null;
    let foundCS: any = null;

    for (const cs of availableContentStandards) {
      for (const ind of cs.indicators || []) {
        if (normalize(ind.code) === normalize(indCode) || normalize(indCode).startsWith(normalize(ind.code))) {
          foundInd = ind;
          foundCS = cs;
          break;
        }
      }
      if (foundInd) break;
    }

    const indData = foundInd || availableIndicators.find((ind: any) => ind.code === indCode);
    const csData = foundCS || selectedCSData;
    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, inputs.strand, inputs.subStrand, indData ? indData.code : indCode);

    setInputs(prev => ({
      ...prev,
      ...(csData ? { contentStandard: csData.code + ': ' + csData.description } : {}),
      indicator: indData ? indData.code + ': ' + indData.description : indCode,
      references: autoRef
    }));
  };

  const handleClassLevelChange = (newLevel: string) => {
    const subjData = GHANA_CURRICULUM_DATA.find(s => normalize(s.name) === normalize(inputs.subject)) || GHANA_CURRICULUM_DATA[0];
    const levelStrands = getStrandsForLevel(subjData, newLevel);
    const newStrand = levelStrands[0];
    const subStrands = newStrand?.subStrands || [];
    const newSubStrand = subStrands[0];
    const bestCS = getBestCSForLevel(newSubStrand, newLevel);
    const firstInd = bestCS?.indicators?.[0];
    const autoRef = getNaCCACurriculumReference(inputs.subject, newLevel, newStrand?.name || '', newSubStrand?.name || '', firstInd?.code || '');

    setInputs(prev => ({
      ...prev,
      classLevel: newLevel,
      strand: newStrand?.name || '',
      subStrand: newSubStrand?.name || '',
      contentStandard: bestCS ? bestCS.code + ': ' + bestCS.description : '',
      indicator: firstInd ? firstInd.code + ': ' + firstInd.description : '',
      references: autoRef
    }));
  };

`;

      const transformed = code.slice(0, start) + replacement + code.slice(end);
      return { code: transformed, map: null };
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [curriculumLevelFix(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});