import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Build-time curriculum fix.
 * The curriculum data contains Primary and JHS strands in the same subject
 * object. FormInput historically selected strands/content standards without
 * considering the selected class level. This transform makes the existing UI
 * strictly level-aware without changing the existing features.
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

      const replacement = String.raw`  // Strict level-aware curriculum helpers.
  const normalize = (value: string) => (value || '').toLowerCase().trim();

  const getLevelPrefix = (classLevel: string) => {
    const lvl = normalize(classLevel);
    const match = lvl.match(/(?:basic|primary|b)\s*([1-9])$/i);
    if (match) return 'B' + match[1];
    const jhs = lvl.match(/jhs\s*([1-3])$/i);
    if (jhs) return 'B' + (Number(jhs[1]) + 6);
    const kg = lvl.match(/(?:kg|kindergarten)\s*([12])$/i);
    if (kg) return 'KG' + kg[1];
    const nursery = lvl.match(/(?:nursery|n)\s*([12])$/i);
    if (nursery) return 'N' + nursery[1];
    return '';
  };

  const isBasicPrefix = (prefix: string) => /^B[1-9]$/.test(prefix);

  // A Basic-level record is valid ONLY when its curriculum codes belong to
  // the selected level. Never fall back to another Basic level.
  const hasExactBasicCode = (value: any, prefix: string) =>
    !!value?.code && new RegExp('^' + prefix.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '\\.').test(String(value.code).trim().toUpperCase());

  const filterSubStrandForLevel = (ss: any, classLevel: string) => {
    if (!ss) return null;
    const prefix = getLevelPrefix(classLevel);
    if (!isBasicPrefix(prefix)) {
      const levels = Array.isArray(ss.levels) ? ss.levels.map((v: any) => normalize(String(v))) : [];
      if (levels.length && !levels.includes(normalize(classLevel))) return null;
      return { ...ss };
    }
    const contentStandards = (ss.contentStandards || []).filter((cs: any) => hasExactBasicCode(cs, prefix));
    return contentStandards.length ? { ...ss, contentStandards } : null;
  };

  const getStrandsForLevel = (subjectData: any, classLevel: string) => {
    if (!subjectData) return [];
    const prefix = getLevelPrefix(classLevel);
    const strands = subjectData.strands || [];

    if (!isBasicPrefix(prefix)) {
      return strands.map((s: any) => {
        const levels = Array.isArray(s.levels) ? s.levels.map((v: any) => normalize(String(v))) : [];
        if (levels.length && !levels.includes(normalize(classLevel))) return null;
        const subStrands = (s.subStrands || []).map((ss: any) => filterSubStrandForLevel(ss, classLevel)).filter(Boolean);
        return subStrands.length ? { ...s, subStrands } : null;
      }).filter(Boolean);
    }

    // Filter every level of the hierarchy: strand -> sub-strand -> CS.
    // Do NOT use strand IDs or a fallback list because names/IDs can repeat.
    return strands.map((s: any) => {
      const strandLevel = Array.isArray(s.levels) ? s.levels.map((v: any) => normalize(String(v))) : [];
      if (strandLevel.length && !strandLevel.includes(normalize(classLevel))) return null;
      const subStrands = (s.subStrands || []).map((ss: any) => filterSubStrandForLevel(ss, classLevel)).filter(Boolean);
      return subStrands.length ? { ...s, subStrands } : null;
    }).filter(Boolean);
  };

  const getLevelContentStandards = (subStrand: any, classLevel: string) => {
    if (!subStrand) return [];
    const prefix = getLevelPrefix(classLevel);
    const all = subStrand.contentStandards || [];
    if (!isBasicPrefix(prefix)) return all;
    return all.filter((cs: any) => hasExactBasicCode(cs, prefix));
  };

  const getBestCSForLevel = (subStrand: any, classLevel: string) => {
    const standards = getLevelContentStandards(subStrand, classLevel);
    return standards[0];
  };

  const selectedSubjectData = GHANA_CURRICULUM_DATA.find(s =>
    normalize(s.name) === normalize(inputs.subject)
  ) || GHANA_CURRICULUM_DATA[0];

  const availableStrands = getStrandsForLevel(selectedSubjectData, inputs.classLevel);

  const selectedStrandData = availableStrands.find((s: any) =>
    normalize(s.name) === normalize(inputs.strand)
  ) || availableStrands[0];

  const availableSubStrands = selectedStrandData ? selectedStrandData.subStrands : [];

  const selectedSubStrandData = availableSubStrands.find((ss: any) =>
    normalize(ss.name) === normalize(inputs.subStrand)
  ) || availableSubStrands[0];

  const availableContentStandards = getLevelContentStandards(selectedSubStrandData, inputs.classLevel);

  const selectedCSData = availableContentStandards.find((cs: any) =>
    normalize(inputs.contentStandard).startsWith(normalize(cs.code))
  ) || availableContentStandards[0];

  const availableIndicators = selectedCSData ? selectedCSData.indicators : [];

  const selectedIndData = availableIndicators.find((ind: any) =>
    normalize(inputs.indicator).startsWith(normalize(ind.code))
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
    const csData = availableContentStandards.find((cs: any) => normalize(cs.code) === normalize(csCode));
    const firstInd = csData?.indicators?.[0];
    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, inputs.strand, inputs.subStrand, firstInd?.code || '');

    setInputs(prev => ({
      ...prev,
      contentStandard: csData ? csData.code + ': ' + csData.description : '',
      indicator: firstInd ? firstInd.code + ': ' + firstInd.description : '',
      references: autoRef
    }));
  };

  const handleIndicatorChange = (indCode: string) => {
    let foundInd: any = null;
    let foundCS: any = null;
    for (const cs of availableContentStandards) {
      for (const ind of cs.indicators || []) {
        if (normalize(ind.code) === normalize(indCode)) {
          foundInd = ind;
          foundCS = cs;
          break;
        }
      }
      if (foundInd) break;
    }

    const indData = foundInd || availableIndicators.find((ind: any) => normalize(ind.code) === normalize(indCode));
    const csData = foundCS || selectedCSData;
    const autoRef = getNaCCACurriculumReference(inputs.subject, inputs.classLevel, inputs.strand, inputs.subStrand, indData?.code || indCode);

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
    const newSubStrand = newStrand?.subStrands?.[0];
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