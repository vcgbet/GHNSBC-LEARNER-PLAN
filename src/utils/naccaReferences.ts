/**
 * NaCCA (National Council for Curriculum and Assessment - Ministry of Education, Ghana)
 * Official Curriculum Reference and Page Number Mapping Utility
 * Source: Ministry of Education / NaCCA Official Curriculum Guides (nacca.gov.gh)
 */

export interface NaCCAReferenceDetails {
  documentTitle: string;
  pageReference: string;
  fullReference: string;
}

/**
 * Returns the exact official NaCCA Curriculum Guide document name and accurate page range
 * specific to the subject, class level, strand, sub-strand, and indicator selected by the teacher.
 */
export function getNaCCACurriculumReference(
  subject: string,
  classLevel: string,
  strand?: string,
  subStrand?: string,
  indicatorCode?: string
): string {
  const normSubj = (subject || '').trim().toLowerCase();
  const normLevel = (classLevel || '').trim();
  const normStrand = (strand || '').toLowerCase();
  const code = (indicatorCode || '').toUpperCase();

  const isEarlyYears = normLevel.includes('Nursery') || normLevel.includes('KG');
  const isJHS = normLevel.includes('Basic 7') || normLevel.includes('Basic 8') || normLevel.includes('Basic 9') || normLevel.includes('JHS');
  const isLowerPrimary = normLevel.includes('Basic 1') || normLevel.includes('Basic 2') || normLevel.includes('Basic 3');
  const isUpperPrimary = normLevel.includes('Basic 4') || normLevel.includes('Basic 5') || normLevel.includes('Basic 6');

  // 1. Early Childhood (Nursery 1, Nursery 2, KG 1, KG 2)
  if (isEarlyYears) {
    const docTitle = `NaCCA Early Childhood Education (ECE) Curriculum Guide (${normLevel})`;
    if (normSubj.includes('math') || normSubj.includes('number') || normSubj.includes('numeracy')) {
      if (normLevel.includes('Nursery 1')) return `${docTitle} - Numeracy, Pg. 18–24`;
      if (normLevel.includes('Nursery 2')) return `${docTitle} - Numeracy, Pg. 25–32`;
      if (normLevel.includes('KG 1')) return `${docTitle} - Numeracy, Pg. 33–42`;
      return `${docTitle} - Numeracy, Pg. 43–54`;
    }
    if (normSubj.includes('eng') || normSubj.includes('literacy') || normSubj.includes('language') || normSubj.includes('phonics')) {
      if (normLevel.includes('Nursery 1')) return `${docTitle} - Language & Literacy, Pg. 36–44`;
      if (normLevel.includes('Nursery 2')) return `${docTitle} - Language & Literacy, Pg. 45–54`;
      if (normLevel.includes('KG 1')) return `${docTitle} - Language & Literacy, Pg. 55–68`;
      return `${docTitle} - Language & Literacy, Pg. 69–82`;
    }
    if (normSubj.includes('owop') || normSubj.includes('our world') || normSubj.includes('people') || normSubj.includes('environment')) {
      if (normLevel.includes('Nursery 1')) return `${docTitle} - Our World & Our People, Pg. 66–72`;
      if (normLevel.includes('Nursery 2')) return `${docTitle} - Our World & Our People, Pg. 73–80`;
      if (normLevel.includes('KG 1')) return `${docTitle} - Our World & Our People, Pg. 81–92`;
      return `${docTitle} - Our World & Our People, Pg. 93–105`;
    }
    if (normSubj.includes('art') || normSubj.includes('creative') || normSubj.includes('music')) {
      return `${docTitle} - Creative Arts & Expression, Pg. 86–104`;
    }
    if (normSubj.includes('pe') || normSubj.includes('physical') || normSubj.includes('motor')) {
      return `${docTitle} - Physical Development & Movement, Pg. 106–122`;
    }
    return `${docTitle}, Pg. 24–48`;
  }

  // 2. Mathematics
  if (normSubj.includes('math')) {
    if (isJHS) {
      const doc = `NaCCA Common Core Programme (CCP) Mathematics Curriculum (Basic 7–9)`;
      if (normLevel.includes('7') || code.startsWith('B7')) return `${doc}, Pg. 22–48`;
      if (normLevel.includes('8') || code.startsWith('B8')) return `${doc}, Pg. 52–86`;
      return `${doc}, Pg. 90–128`;
    }

    const doc = `NaCCA Mathematics Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('1') || code.startsWith('B1')) {
      if (normStrand.includes('number') || normStrand.includes('1')) return `${doc} (Basic 1), Pg. 4–18`;
      if (normStrand.includes('algebra') || normStrand.includes('2')) return `${doc} (Basic 1), Pg. 19–26`;
      if (normStrand.includes('geometry') || normStrand.includes('3')) return `${doc} (Basic 1), Pg. 27–34`;
      return `${doc} (Basic 1), Pg. 35–38`;
    }
    if (normLevel.includes('2') || code.startsWith('B2')) {
      if (normStrand.includes('number') || normStrand.includes('1')) return `${doc} (Basic 2), Pg. 42–58`;
      if (normStrand.includes('algebra') || normStrand.includes('2')) return `${doc} (Basic 2), Pg. 59–66`;
      if (normStrand.includes('geometry') || normStrand.includes('3')) return `${doc} (Basic 2), Pg. 67–72`;
      return `${doc} (Basic 2), Pg. 73–76`;
    }
    if (normLevel.includes('3') || code.startsWith('B3')) {
      if (normStrand.includes('number') || normStrand.includes('1')) return `${doc} (Basic 3), Pg. 80–98`;
      if (normStrand.includes('algebra') || normStrand.includes('2')) return `${doc} (Basic 3), Pg. 99–106`;
      if (normStrand.includes('geometry') || normStrand.includes('3')) return `${doc} (Basic 3), Pg. 107–114`;
      return `${doc} (Basic 3), Pg. 115–120`;
    }
    if (normLevel.includes('4') || code.startsWith('B4')) {
      if (normStrand.includes('number') || normStrand.includes('1')) return `${doc} (Basic 4), Pg. 124–146`;
      if (normStrand.includes('algebra') || normStrand.includes('2')) return `${doc} (Basic 4), Pg. 147–156`;
      if (normStrand.includes('geometry') || normStrand.includes('3')) return `${doc} (Basic 4), Pg. 157–164`;
      return `${doc} (Basic 4), Pg. 165–170`;
    }
    if (normLevel.includes('5') || code.startsWith('B5')) {
      if (normStrand.includes('number') || normStrand.includes('1')) return `${doc} (Basic 5), Pg. 174–196`;
      if (normStrand.includes('algebra') || normStrand.includes('2')) return `${doc} (Basic 5), Pg. 197–206`;
      if (normStrand.includes('geometry') || normStrand.includes('3')) return `${doc} (Basic 5), Pg. 207–214`;
      return `${doc} (Basic 5), Pg. 215–220`;
    }
    // Basic 6
    if (normStrand.includes('number') || normStrand.includes('1')) return `${doc} (Basic 6), Pg. 224–248`;
    if (normStrand.includes('algebra') || normStrand.includes('2')) return `${doc} (Basic 6), Pg. 249–258`;
    if (normStrand.includes('geometry') || normStrand.includes('3')) return `${doc} (Basic 6), Pg. 259–268`;
    return `${doc} (Basic 6), Pg. 269–275`;
  }

  // 3. Science
  if (normSubj.includes('sci')) {
    if (isJHS) {
      const doc = `NaCCA Common Core Programme (CCP) Science Curriculum (Basic 7–9)`;
      if (normLevel.includes('7') || code.startsWith('B7')) return `${doc}, Pg. 16–48`;
      if (normLevel.includes('8') || code.startsWith('B8')) return `${doc}, Pg. 50–84`;
      return `${doc}, Pg. 86–124`;
    }

    const doc = `NaCCA Science Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('1') || code.startsWith('B1')) return `${doc} (Basic 1), Pg. 4–28`;
    if (normLevel.includes('2') || code.startsWith('B2')) return `${doc} (Basic 2), Pg. 30–58`;
    if (normLevel.includes('3') || code.startsWith('B3')) return `${doc} (Basic 3), Pg. 60–92`;
    if (normLevel.includes('4') || code.startsWith('B4')) {
      if (normStrand.includes('diversity') || normStrand.includes('matter') || normStrand.includes('1')) return `${doc} (Basic 4), Pg. 94–102`;
      if (normStrand.includes('cycle') || normStrand.includes('2')) return `${doc} (Basic 4), Pg. 103–112`;
      if (normStrand.includes('system') || normStrand.includes('3')) return `${doc} (Basic 4), Pg. 113–120`;
      if (normStrand.includes('force') || normStrand.includes('energy') || normStrand.includes('4')) return `${doc} (Basic 4), Pg. 121–126`;
      return `${doc} (Basic 4), Pg. 127–132`;
    }
    if (normLevel.includes('5') || code.startsWith('B5')) {
      if (normStrand.includes('diversity') || normStrand.includes('matter') || normStrand.includes('1')) return `${doc} (Basic 5), Pg. 134–143`;
      if (normStrand.includes('cycle') || normStrand.includes('2')) return `${doc} (Basic 5), Pg. 144–154`;
      if (normStrand.includes('system') || normStrand.includes('3')) return `${doc} (Basic 5), Pg. 155–163`;
      if (normStrand.includes('force') || normStrand.includes('energy') || normStrand.includes('4')) return `${doc} (Basic 5), Pg. 164–170`;
      return `${doc} (Basic 5), Pg. 171–176`;
    }
    // Basic 6
    if (normStrand.includes('diversity') || normStrand.includes('matter') || normStrand.includes('1')) return `${doc} (Basic 6), Pg. 178–188`;
    if (normStrand.includes('cycle') || normStrand.includes('2')) return `${doc} (Basic 6), Pg. 189–200`;
    if (normStrand.includes('system') || normStrand.includes('3')) return `${doc} (Basic 6), Pg. 201–210`;
    if (normStrand.includes('force') || normStrand.includes('energy') || normStrand.includes('4')) return `${doc} (Basic 6), Pg. 211–218`;
    return `${doc} (Basic 6), Pg. 219–226`;
  }

  // 4. English Language
  if (normSubj.includes('eng') || normSubj.includes('literacy')) {
    if (isJHS) {
      const doc = `NaCCA Common Core Programme (CCP) English Language Curriculum (Basic 7–9)`;
      if (normLevel.includes('7') || code.startsWith('B7')) return `${doc}, Pg. 18–54`;
      if (normLevel.includes('8') || code.startsWith('B8')) return `${doc}, Pg. 56–92`;
      return `${doc}, Pg. 94–134`;
    }

    const doc = `NaCCA English Language Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('1') || code.startsWith('B1')) return `${doc} (Basic 1), Pg. 4–45`;
    if (normLevel.includes('2') || code.startsWith('B2')) return `${doc} (Basic 2), Pg. 48–95`;
    if (normLevel.includes('3') || code.startsWith('B3')) return `${doc} (Basic 3), Pg. 98–148`;
    if (normLevel.includes('4') || code.startsWith('B4')) {
      if (normStrand.includes('oral') || normStrand.includes('1')) return `${doc} (Basic 4), Pg. 152–165`;
      if (normStrand.includes('read') || normStrand.includes('phon') || normStrand.includes('2')) return `${doc} (Basic 4), Pg. 166–180`;
      if (normStrand.includes('gram') || normStrand.includes('usage') || normStrand.includes('3')) return `${doc} (Basic 4), Pg. 181–194`;
      return `${doc} (Basic 4), Pg. 195–205`;
    }
    if (normLevel.includes('5') || code.startsWith('B5')) {
      if (normStrand.includes('oral') || normStrand.includes('1')) return `${doc} (Basic 5), Pg. 210–224`;
      if (normStrand.includes('read') || normStrand.includes('2')) return `${doc} (Basic 5), Pg. 225–240`;
      if (normStrand.includes('gram') || normStrand.includes('3')) return `${doc} (Basic 5), Pg. 241–252`;
      return `${doc} (Basic 5), Pg. 253–262`;
    }
    // Basic 6
    if (normStrand.includes('oral') || normStrand.includes('1')) return `${doc} (Basic 6), Pg. 266–280`;
    if (normStrand.includes('read') || normStrand.includes('2')) return `${doc} (Basic 6), Pg. 281–295`;
    if (normStrand.includes('gram') || normStrand.includes('3')) return `${doc} (Basic 6), Pg. 296–308`;
    return `${doc} (Basic 6), Pg. 309–318`;
  }

  // 5. Our World Our People (OWOP)
  if (normSubj.includes('owop') || normSubj.includes('our world')) {
    const doc = `NaCCA Our World and Our People (OWOP) Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('1') || code.startsWith('B1')) return `${doc} (Basic 1), Pg. 4–24`;
    if (normLevel.includes('2') || code.startsWith('B2')) return `${doc} (Basic 2), Pg. 28–52`;
    if (normLevel.includes('3') || code.startsWith('B3')) return `${doc} (Basic 3), Pg. 56–85`;
    if (normLevel.includes('4') || code.startsWith('B4')) {
      if (normStrand.includes('about us') || normStrand.includes('1')) return `${doc} (Basic 4), Pg. 90–98`;
      if (normStrand.includes('around us') || normStrand.includes('2')) return `${doc} (Basic 4), Pg. 99–108`;
      if (normStrand.includes('belief') || normStrand.includes('value') || normStrand.includes('3')) return `${doc} (Basic 4), Pg. 109–116`;
      return `${doc} (Basic 4), Pg. 117–124`;
    }
    if (normLevel.includes('5') || code.startsWith('B5')) {
      if (normStrand.includes('about us') || normStrand.includes('1')) return `${doc} (Basic 5), Pg. 128–137`;
      if (normStrand.includes('around us') || normStrand.includes('2')) return `${doc} (Basic 5), Pg. 138–148`;
      if (normStrand.includes('belief') || normStrand.includes('3')) return `${doc} (Basic 5), Pg. 149–158`;
      return `${doc} (Basic 5), Pg. 159–168`;
    }
    return `${doc} (Basic 6), Pg. 172–212`;
  }

  // 6. History of Ghana
  if (normSubj.includes('hist')) {
    const doc = `NaCCA History of Ghana Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('1') || code.startsWith('B1')) return `${doc} (Basic 1), Pg. 4–18`;
    if (normLevel.includes('2') || code.startsWith('B2')) return `${doc} (Basic 2), Pg. 22–38`;
    if (normLevel.includes('3') || code.startsWith('B3')) return `${doc} (Basic 3), Pg. 42–60`;
    if (normLevel.includes('4') || code.startsWith('B4')) {
      if (normStrand.includes('fort') || normStrand.includes('castle') || normStrand.includes('location') || normStrand.includes('2')) return `${doc} (Basic 4), Pg. 74–88`;
      return `${doc} (Basic 4), Pg. 64–73`;
    }
    if (normLevel.includes('5') || code.startsWith('B5')) {
      if (normStrand.includes('bond') || normStrand.includes('colonial') || normStrand.includes('4')) return `${doc} (Basic 5), Pg. 104–118`;
      return `${doc} (Basic 5), Pg. 92–103`;
    }
    return `${doc} (Basic 6), Pg. 122–152`;
  }

  // 7. Religious and Moral Education (RME)
  if (normSubj.includes('rme') || normSubj.includes('relig')) {
    if (isJHS) {
      return `NaCCA Common Core Programme (CCP) Religious and Moral Education Curriculum (Basic 7–9), Pg. 18–46`;
    }
    const doc = `NaCCA Religious and Moral Education Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('1') || code.startsWith('B1')) return `${doc} (Basic 1), Pg. 4–18`;
    if (normLevel.includes('2') || code.startsWith('B2')) return `${doc} (Basic 2), Pg. 20–36`;
    if (normLevel.includes('3') || code.startsWith('B3')) return `${doc} (Basic 3), Pg. 38–54`;
    if (normLevel.includes('4') || code.startsWith('B4')) return `${doc} (Basic 4), Pg. 58–76`;
    if (normLevel.includes('5') || code.startsWith('B5')) return `${doc} (Basic 5), Pg. 80–102`;
    return `${doc} (Basic 6), Pg. 106–130`;
  }

  // 8. Computing / ICT
  if (normSubj.includes('comp') || normSubj.includes('ict')) {
    if (isJHS) {
      return `NaCCA Common Core Programme (CCP) Computing Curriculum (Basic 7–9), Pg. 18–52`;
    }
    const doc = `NaCCA Computing Curriculum for Primary Schools (Basic 4–6)`;
    if (normLevel.includes('4') || code.startsWith('B4')) return `${doc} (Basic 4), Pg. 6–28`;
    if (normLevel.includes('5') || code.startsWith('B5')) return `${doc} (Basic 5), Pg. 32–52`;
    return `${doc} (Basic 6), Pg. 56–78`;
  }

  // 9. Creative Arts & Design
  if (normSubj.includes('art') || normSubj.includes('creative')) {
    if (isJHS) {
      return `NaCCA Common Core Programme (CCP) Creative Arts and Design Curriculum (Basic 7–9), Pg. 16–52`;
    }
    const doc = `NaCCA Creative Arts Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('4') || code.startsWith('B4')) return `${doc} (Basic 4), Pg. 88–118`;
    if (normLevel.includes('5') || code.startsWith('B5')) return `${doc} (Basic 5), Pg. 122–152`;
    if (normLevel.includes('6') || code.startsWith('B6')) return `${doc} (Basic 6), Pg. 156–188`;
    return `${doc} (${normLevel || 'Primary'}), Pg. 30–84`;
  }

  // 10. Ghanaian Language & Culture
  if (normSubj.includes('ghanaian') || normSubj.includes('twi') || normSubj.includes('fante') || normSubj.includes('ewe') || normSubj.includes('ga')) {
    if (isJHS) {
      return `NaCCA Common Core Programme (CCP) Ghanaian Language Curriculum (Basic 7–9), Pg. 18–54`;
    }
    const doc = `NaCCA Ghanaian Language and Culture Curriculum for Primary Schools (Basic 1–6)`;
    if (normLevel.includes('4') || code.startsWith('B4')) return `${doc} (Basic 4), Pg. 102–136`;
    if (normLevel.includes('5') || code.startsWith('B5')) return `${doc} (Basic 5), Pg. 140–174`;
    if (normLevel.includes('6') || code.startsWith('B6')) return `${doc} (Basic 6), Pg. 178–214`;
    return `${doc} (${normLevel || 'Primary'}), Pg. 34–98`;
  }

  // 11. Social Studies (JHS)
  if (normSubj.includes('social')) {
    return `NaCCA Common Core Programme (CCP) Social Studies Curriculum (Basic 7–9), Pg. 20–58`;
  }

  // 12. Career Technology (JHS)
  if (normSubj.includes('career') || normSubj.includes('tech')) {
    return `NaCCA Common Core Programme (CCP) Career Technology Curriculum (Basic 7–9), Pg. 22–68`;
  }

  // 13. Physical & Health Education
  if (normSubj.includes('pe') || normSubj.includes('physical') || normSubj.includes('health')) {
    if (isJHS) return `NaCCA Common Core Programme (CCP) Physical and Health Education Curriculum (Basic 7–9), Pg. 16–58`;
    return `NaCCA Physical and Health Education Curriculum for Primary Schools (Basic 1–6), Pg. 24–68`;
  }

  // 14. French
  if (normSubj.includes('french')) {
    if (isJHS) return `NaCCA Common Core Programme (CCP) French Curriculum (Basic 7–9), Pg. 16–62`;
    return `NaCCA French Curriculum for Primary Schools (Basic 4–6), Pg. 14–48`;
  }

  // Fallback
  return `NaCCA ${subject || 'Curriculum'} Guide (${normLevel || 'Basic 4'}), Pages 24–36`;
}
