import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LearnerPlanOutput } from '../types';
import { sanitizePerformanceIndicator } from './formatUtils';
import { getNaCCACurriculumReference } from './naccaReferences';

function applyAutoTable(doc: jsPDF, options: any) {
  try {
    if (typeof autoTable === 'function') {
      autoTable(doc, options);
    } else if (typeof (autoTable as any)?.default === 'function') {
      (autoTable as any).default(doc, options);
    } else if (typeof (doc as any).autoTable === 'function') {
      (doc as any).autoTable(options);
    } else {
      console.error('autoTable plugin not available on jsPDF');
    }
  } catch (err) {
    console.error('Error executing autoTable:', err);
  }
}

function getLastAutoTableY(doc: jsPDF, fallbackY: number): number {
  return (doc as any).lastAutoTable?.finalY ?? fallbackY;
}

export function exportToPdf(plan: LearnerPlanOutput) {
  const { header, starter, mainPhase, plenaryReflection, rcaQuestions, learnerWritingNotes, exercises } = plan;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor: [number, number, number] = [30, 58, 138]; // Blue 900
  const secondaryColor: [number, number, number] = [29, 78, 216]; // Blue 700
  const grayHeader: [number, number, number] = [229, 231, 235]; // Gray 200

  const safeJoin = (arr: any, separator: string = ", ") => {
    if (!arr) return "";
    if (Array.isArray(arr)) return arr.join(separator);
    return String(arr);
  };

  // Document Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryColor);
  doc.text((header?.schoolName || 'BASIC SCHOOL').toUpperCase(), 105, 12, { align: 'center' });

  doc.setFontSize(9.5);
  doc.setTextColor(...secondaryColor);
  doc.text("GHANA STANDARD-BASED CURRICULUM - LEARNER PLAN & LESSON NOTE", 105, 17, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6); // Amber 600
  doc.text("Powered by VCGMEDIA • Developer: Victor C. Gbetodeme", 105, 21, { align: 'center' });

  doc.setDrawColor(200, 200, 200);
  doc.line(14, 23, 196, 23);

  // Table 1: Header Info
  const selectedDaysList = (header?.selectedDays && header.selectedDays.length > 0)
    ? header.selectedDays
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, header?.numberOfDays || 1);

  const referencesVal = (header?.references && header.references.trim() !== '' && !header.references.toLowerCase().includes('nacca standard curriculum guide'))
    ? header.references
    : getNaCCACurriculumReference(header?.subject || 'Mathematics', header?.classLevel || 'Basic 4', header?.strand, header?.subStrand, header?.indicator);

  applyAutoTable(doc, {
    startY: 25,
    head: [[{ content: '1. LESSON OVERVIEW & NACCA CURRICULUM HEADER', colSpan: 4, styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } }]],
    body: [
      [{ content: 'Week Ending:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.weekEnding || '', { content: 'Class Level:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.classLevel || ''],
      [{ content: 'Subject:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.subject || '', { content: 'Class Size:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, `${header?.classSize || 40} Learners`],
      [{ content: 'Duration:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.duration || '', { content: 'No. of Days:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, `${header?.numberOfDays || 1} ${header?.numberOfDays === 1 ? 'day' : 'days'}`],
      [{ content: 'Lesson Days:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, selectedDaysList.join(', '), { content: 'References:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, referencesVal],
      [{ content: 'Strand:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, { content: header?.strand || '', colSpan: 3 }],
      [{ content: 'Sub-strand:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, { content: header?.subStrand || '', colSpan: 3 }],
      [{ content: 'Content Standard:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.contentStandard || '', { content: 'Indicator:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.indicator || ''],
      [{ content: 'Performance Indicator:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, { content: sanitizePerformanceIndicator(header?.performanceIndicator), colSpan: 3 }],
      [{ content: 'Teaching Resources (TLMs):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, { content: safeJoin(header?.teachingResources, ', '), colSpan: 3 }],
      [{ content: 'Core Competencies:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, { content: safeJoin(header?.coreCompetencies, '; '), colSpan: 3 }],
      [{ content: 'Key Vocabulary:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, { content: safeJoin(header?.keyWords, ', '), colSpan: 3 }],
      [{ content: 'Class Teacher:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.teacherName || '', { content: 'Headteacher / HOD:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.nameOfHead || '']
    ],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2, textColor: [31, 41, 55] },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 55 },
      2: { cellWidth: 35 },
      3: { cellWidth: 57 }
    }
  });

  // Table 2: Pedagogical Phases
  const currentY = getLastAutoTableY(doc, 100) + 4;

  // Table 2: Instructional Phases (Multi-Day Support)
  const getEffectiveDailyPlans = () => {
    if (plan.dailyPlans && plan.dailyPlans.length > 0) {
      return plan.dailyPlans;
    }
    const numDays = header?.numberOfDays || 1;
    const days = [];
    for (let d = 1; d <= numDays; d++) {
      days.push({
        dayNumber: d,
        starter: starter || { duration: '10 Mins', teacherActivities: '', learnerActivities: '' },
        mainPhase: mainPhase || { duration: '40 Mins', step1Teacher: '', step1Learner: '', step2Teacher: '', step2Learner: '', step3Teacher: '', step3Learner: '', assessmentMethod: '' },
        plenaryReflection: plenaryReflection || { duration: '10 Mins', teacherSummary: '', learnerReflection: '' }
      });
    }
    return days;
  };

  const effectiveDailyPlans = getEffectiveDailyPlans();

  effectiveDailyPlans.forEach((dp, idx) => {
    const tableStartY = idx === 0 ? currentY : getLastAutoTableY(doc, 140) + 4;
    applyAutoTable(doc, {
      startY: tableStartY,
      head: [[{
        content: `2. PEDAGOGICAL PHASES & INSTRUCTIONAL ACTIVITIES ${effectiveDailyPlans.length > 1 ? `- DAY ${dp.dayNumber} OF ${effectiveDailyPlans.length}` : ''}`,
        colSpan: 2,
        styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' }
      }]],
      body: [
        [{ content: `PHASE 1: STARTER / INTRODUCTION (${dp.starter?.duration || '10 Mins'})`, colSpan: 2, styles: { fillColor: secondaryColor, textColor: 255, fontStyle: 'bold' } }],
        [{ content: 'Teacher Activities:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, dp.starter?.teacherActivities || ''],
        [{ content: 'Learner Activities:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, dp.starter?.learnerActivities || ''],

        [{ content: `PHASE 2: MAIN PHASE ACTIVITIES (${dp.mainPhase?.duration || '40 Mins'})`, colSpan: 2, styles: { fillColor: secondaryColor, textColor: 255, fontStyle: 'bold' } }],
        [{ content: 'Step 1 (Demonstration):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, [ dp.mainPhase?.step1Teacher ? `Teacher: ${dp.mainPhase.step1Teacher.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '', dp.mainPhase?.step1Learner ? `Learners: ${dp.mainPhase.step1Learner.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '' ].filter(Boolean).join('\n\n')],
        [{ content: 'Step 2 (Group Work):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, [ dp.mainPhase?.step2Teacher ? `Teacher: ${dp.mainPhase.step2Teacher.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '', dp.mainPhase?.step2Learner ? `Learners: ${dp.mainPhase.step2Learner.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '' ].filter(Boolean).join('\n\n')],
        [{ content: 'Step 3 (Practice):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, [ dp.mainPhase?.step3Teacher ? `Teacher: ${dp.mainPhase.step3Teacher.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '', dp.mainPhase?.step3Learner ? `Learners: ${dp.mainPhase.step3Learner.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '' ].filter(Boolean).join('\n\n')],
        [{ content: 'Assessment Method:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, dp.mainPhase?.assessmentMethod || ''],
        [{ content: 'RCA - Reflect (R):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, rcaQuestions?.reflect || ''],
        [{ content: 'RCA - Connect (C):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, rcaQuestions?.connect || ''],
        [{ content: 'RCA - Apply (A):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, rcaQuestions?.apply || ''],

        [{ content: `PHASE 3: PLENARY / REFLECTION (${dp.plenaryReflection?.duration || '10 Mins'})`, colSpan: 2, styles: { fillColor: secondaryColor, textColor: 255, fontStyle: 'bold' } }],
        [{ content: 'Teacher Summary:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, dp.plenaryReflection?.teacherSummary || ''],
        [{ content: 'Learner Reflection:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, dp.plenaryReflection?.learnerReflection || ''],

        [{ content: `ENDORSEMENT / VETTING - DAY ${dp.dayNumber} LESSON`, colSpan: 2, styles: { fillColor: secondaryColor, textColor: 255, fontStyle: 'bold' } }],
        [{ content: 'Vetted By (Head):', styles: { fontStyle: 'bold', fillColor: grayHeader } }, header?.nameOfHead || '.......................................'],
        [{ content: 'Signature & Date:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, 'Signature: ....................................   Date: .....................'],
        [{ content: 'Remarks / Feedback:', styles: { fontStyle: 'bold', fillColor: grayHeader } }, '']
      ],
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2, textColor: [31, 41, 55] },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 142 }
      }
    });
  });

  // Page 2: Learner Writing Notes
  if (learnerWritingNotes) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...primaryColor);
    doc.text(learnerWritingNotes.title || 'Learner Notes', 105, 15, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(55, 65, 81);
    const introLines = doc.splitTextToSize(learnerWritingNotes.introduction || '', 180);
    doc.text(introLines, 14, 22);

    let yPos = 22 + (introLines.length * 4) + 4;

    // Key Vocab
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    doc.text("A. Key Vocabulary & Definitions", 14, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(31, 41, 55);

    if (learnerWritingNotes.keyDefinitions) {
      learnerWritingNotes.keyDefinitions.forEach(def => {
        const line = `• ${def.term}: ${def.definition}`;
        const split = doc.splitTextToSize(line, 180);
        if (yPos + (split.length * 4) > 280) {
          doc.addPage();
          yPos = 15;
        }
        doc.text(split, 14, yPos);
        yPos += (split.length * 4) + 1;
      });
    }

    yPos += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    if (yPos > 270) { doc.addPage(); yPos = 15; }
    doc.text("B. Main Lesson Explanation", 14, yPos);
    yPos += 6;

    if (learnerWritingNotes.mainContentPoints) {
      learnerWritingNotes.mainContentPoints.forEach(pt => {
        if (yPos > 270) { doc.addPage(); yPos = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(17, 24, 39);
        doc.text(pt.heading, 14, yPos);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(55, 65, 81);
        const bodySplit = doc.splitTextToSize(pt.body, 180);
        if (yPos + (bodySplit.length * 4) > 280) { doc.addPage(); yPos = 15; }
        doc.text(bodySplit, 14, yPos);
        yPos += (bodySplit.length * 4) + 2;

        pt.bulletPoints?.forEach(bp => {
          const bpSplit = doc.splitTextToSize(`  - ${bp}`, 175);
          if (yPos + (bpSplit.length * 4) > 280) { doc.addPage(); yPos = 15; }
          doc.text(bpSplit, 16, yPos);
          yPos += (bpSplit.length * 4) + 1;
        });
        yPos += 3;
      });
    }

    // Summary
    if (yPos > 260) { doc.addPage(); yPos = 15; }
    doc.setFillColor(254, 243, 199); // Yellow fill
    doc.rect(14, yPos, 182, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(146, 64, 14);
    doc.text("SUMMARY:", 18, yPos + 5);
    doc.setFont('helvetica', 'normal');
    const sumSplit = doc.splitTextToSize(learnerWritingNotes.summary || '', 155);
    doc.text(sumSplit, 38, yPos + 5);
  }

  // Page 3+: Exercises
  if (exercises) {
    const totalDays = header?.numberOfDays || 1;

    for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
      const dayFIBs = (exercises?.fillInBlanks || []).filter(f => (f.dayNumber || 1) === dayNum);
      const dayMCQs = (exercises?.mcqs || []).filter(m => (m.dayNumber || 1) === dayNum);
      const dayMatching = (exercises?.matching || []).filter(m => (m.dayNumber || 1) === dayNum);
      const dayApp = (exercises?.application || []).filter(a => (a.dayNumber || 1) === dayNum);
      const dayDiag = (exercises?.diagram || []).filter(d => (d.dayNumber || 1) === dayNum);

      const hasAny = dayFIBs.length > 0 || dayMCQs.length > 0 || dayMatching.length > 0 || dayApp.length > 0 || dayDiag.length > 0;
      if (!hasAny) continue;

      doc.addPage();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...primaryColor);
      doc.text(`LEARNER EXERCISES: DAY ${dayNum} - ${(header?.subject || '').toUpperCase()}`, 105, 15, { align: 'center' });

      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(107, 114, 128);
      doc.text(`Class: ${header?.classLevel} | Day: ${header?.selectedDays?.[dayNum - 1] || `Day ${dayNum}`} | Topic: ${header?.subStrand}`, 105, 21, { align: 'center' });

      let exY = 28;

      const getByEx = <T extends { exerciseNumber?: number }>(arr: T[], exNum: number): T[] => {
        const f = arr.filter(i => i.exerciseNumber === exNum);
        if (f.length > 0) return f;
        return exNum === 1 ? arr.slice(0, 5) : arr.slice(5, 10);
      };

      // SECTION A: Fill in Blanks
      if (dayFIBs.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.text(`SECTION A: Fill in the Blanks`, 14, exY);
        exY += 5;

        [1, 2].forEach(exNum => {
          const items = getByEx(dayFIBs, exNum);
          if (items.length === 0) return;
          if (exY > 265) { doc.addPage(); exY = 15; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          doc.text(`Exercise ${exNum} (Fill in the blanks):`, 14, exY);
          exY += 4.5;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(31, 41, 55);

          items.forEach((fib, qIdx) => {
            const split = doc.splitTextToSize(`${fib.questionNumber || qIdx + 1}. ${fib.question}`, 180);
            if (exY + (split.length * 4) > 280) { doc.addPage(); exY = 15; }
            doc.text(split, 16, exY);
            exY += (split.length * 4) + 1.5;
          });
          exY += 2;
        });
      }

      // SECTION B: MCQs
      if (dayMCQs.length > 0) {
        if (exY > 250) { doc.addPage(); exY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.text(`SECTION B: Multiple Choice Questions (MCQs)`, 14, exY);
        exY += 5;

        [1, 2].forEach(exNum => {
          const items = getByEx(dayMCQs, exNum);
          if (items.length === 0) return;
          if (exY > 260) { doc.addPage(); exY = 15; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          doc.text(`Exercise ${exNum} (Multiple Choice):`, 14, exY);
          exY += 4.5;

          items.forEach((mcq, qIdx) => {
            if (exY > 260) { doc.addPage(); exY = 15; }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(17, 24, 39);
            const qSplit = doc.splitTextToSize(`${mcq.questionNumber || qIdx + 1}. ${mcq.question}`, 180);
            doc.text(qSplit, 16, exY);
            exY += (qSplit.length * 4) + 1;

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(55, 65, 81);
            doc.text(`A) ${mcq.options?.A || ''}     B) ${mcq.options?.B || ''}`, 20, exY);
            exY += 4;
            doc.text(`C) ${mcq.options?.C || ''}     D) ${mcq.options?.D || ''}`, 20, exY);
            exY += 5;
          });
          exY += 2;
        });
      }

      // SECTION C: Matching
      if (dayMatching.length > 0) {
        if (exY > 220) { doc.addPage(); exY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.text(`SECTION C: Matching Exercise Columns`, 14, exY);
        exY += 5;

        [1, 2].forEach(exNum => {
          const items = getByEx(dayMatching, exNum);
          if (items.length === 0) return;
          if (exY > 230) { doc.addPage(); exY = 15; }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          doc.text(`Exercise ${exNum} (Match Column A with Column B):`, 14, exY);
          exY += 4;

          const colB = [...items.map(m => m.itemB)].sort(() => 0.5 - Math.random());

          applyAutoTable(doc, {
            startY: exY,
            head: [['Column A (Items)', 'Column B (Match)']],
            body: items.map((m, qIdx) => [
              `${m.questionNumber || qIdx + 1}. ${m.itemA}`,
              `[   ] ${colB[qIdx] || m.itemB}`
            ]),
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 }
          });

          exY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 5 : exY + 25;
        });
      }

      // SECTION D: Application Exercises
      if (dayApp.length > 0) {
        if (exY > 230) { doc.addPage(); exY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.text(`SECTION D: Application Exercises (Ghanaian Context)`, 14, exY);
        exY += 5;

        [1, 2].forEach(exNum => {
          const items = getByEx(dayApp, exNum);
          if (items.length === 0) return;
          if (exY > 250) { doc.addPage(); exY = 15; }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          doc.text(`Exercise ${exNum} (Practical Problem-Solving):`, 14, exY);
          exY += 4.5;

          items.forEach((app, qIdx) => {
            if (exY > 260) { doc.addPage(); exY = 15; }
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            const scSplit = doc.splitTextToSize(`Scenario: ${app.scenarioOrContext}`, 176);
            doc.text(scSplit, 16, exY);
            exY += (scSplit.length * 3.5) + 1;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(17, 24, 39);
            const qSplit = doc.splitTextToSize(`${app.questionNumber || qIdx + 1}. ${app.question}`, 176);
            doc.text(qSplit, 16, exY);
            exY += (qSplit.length * 4) + 3;
          });
        });
      }

      // SECTION E: Diagram & Visual Exercises
      if (dayDiag.length > 0) {
        if (exY > 220) { doc.addPage(); exY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.text(`SECTION E: Diagram & Visual Exercises`, 14, exY);
        exY += 5;

        [1, 2].forEach(exNum => {
          const items = getByEx(dayDiag, exNum);
          if (items.length === 0) return;
          if (exY > 230) { doc.addPage(); exY = 15; }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          doc.text(`Exercise ${exNum} (Visual Tasks: Pictures, Tracing & Diagrams):`, 14, exY);
          exY += 4.5;

          items.forEach((diag, qIdx) => {
            if (exY > 240) { doc.addPage(); exY = 15; }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(109, 40, 217);
            doc.text(`Task ${diag.questionNumber || qIdx + 1}: ${diag.diagramTitle} [${diag.diagramCategory}]`, 16, exY);
            exY += 4;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(75, 85, 99);
            const pSplit = doc.splitTextToSize(`Instruction: ${diag.diagramPrompt}`, 176);
            doc.text(pSplit, 16, exY);
            exY += (pSplit.length * 3.5) + 1;

            doc.setFont('courier', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(30, 41, 59);
            const dSplit = doc.splitTextToSize(diag.diagramAsciiOrDescription, 176);
            if (exY + (dSplit.length * 3) > 280) { doc.addPage(); exY = 15; }
            doc.text(dSplit, 16, exY);
            exY += (dSplit.length * 3) + 2;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(17, 24, 39);
            const qSplit = doc.splitTextToSize(`Question: ${diag.question}`, 176);
            doc.text(qSplit, 16, exY);
            exY += (qSplit.length * 4) + 4;
          });
        });
      }
    }

    // Answer Key Pages
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(220, 38, 38);
    doc.text("TEACHER ANSWER KEY & MARKING GUIDE", 105, 15, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(153, 27, 27);
    doc.text("For Teacher Reference & Marking Only", 105, 21, { align: 'center' });

    let akY = 28;

    for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
      const dayFIBs = (exercises?.fillInBlanks || []).filter(f => (f.dayNumber || 1) === dayNum);
      const dayMCQs = (exercises?.mcqs || []).filter(m => (m.dayNumber || 1) === dayNum);
      const dayMatching = (exercises?.matching || []).filter(m => (m.dayNumber || 1) === dayNum);
      const dayApp = (exercises?.application || []).filter(a => (a.dayNumber || 1) === dayNum);
      const dayDiag = (exercises?.diagram || []).filter(d => (d.dayNumber || 1) === dayNum);

      const hasAny = dayFIBs.length > 0 || dayMCQs.length > 0 || dayMatching.length > 0 || dayApp.length > 0 || dayDiag.length > 0;
      if (!hasAny) continue;

      if (akY > 240) { doc.addPage(); akY = 15; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text(`DAY ${dayNum} ANSWER KEY`, 14, akY);
      akY += 5;

      if (dayFIBs.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(29, 78, 216);
        doc.text("Section A Answers (Fill in Blanks):", 16, akY);
        akY += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        dayFIBs.forEach((fib, idx) => {
          if (akY > 275) { doc.addPage(); akY = 15; }
          doc.setTextColor(31, 41, 55);
          doc.text(`Ex ${fib.exerciseNumber || 1} • Q${fib.questionNumber || (idx % 5) + 1}: `, 20, akY);
          doc.setTextColor(21, 128, 61);
          doc.text(fib.blankAnswer || '', 45, akY);
          akY += 4;
        });
        akY += 2;
      }

      if (dayMCQs.length > 0) {
        if (akY > 260) { doc.addPage(); akY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(29, 78, 216);
        doc.text("Section B Answers (MCQs):", 16, akY);
        akY += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        dayMCQs.forEach((mcq, idx) => {
          if (akY > 275) { doc.addPage(); akY = 15; }
          doc.setTextColor(31, 41, 55);
          doc.text(`Ex ${mcq.exerciseNumber || 1} • Q${mcq.questionNumber || (idx % 5) + 1}: `, 20, akY);
          doc.setTextColor(21, 128, 61);
          doc.setFont('helvetica', 'bold');
          doc.text(`Option ${mcq.correctOption}`, 45, akY);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(75, 85, 99);
          if (mcq.explanation) {
            doc.text(`(${mcq.explanation})`, 65, akY);
          }
          akY += 4;
        });
        akY += 2;
      }

      if (dayMatching.length > 0) {
        if (akY > 260) { doc.addPage(); akY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(29, 78, 216);
        doc.text("Section C Answers (Matching Pairs):", 16, akY);
        akY += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        dayMatching.forEach((m) => {
          if (akY > 275) { doc.addPage(); akY = 15; }
          doc.setTextColor(31, 41, 55);
          doc.text(`Ex ${m.exerciseNumber || 1} • ${m.itemA}`, 20, akY);
          doc.setTextColor(29, 78, 216);
          doc.text(`--->`, 75, akY);
          doc.setTextColor(21, 128, 61);
          doc.text(`${m.matchKey}`, 85, akY);
          akY += 4;
        });
        akY += 2;
      }

      if (dayApp.length > 0) {
        if (akY > 250) { doc.addPage(); akY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(29, 78, 216);
        doc.text("Section D Solutions (Application):", 16, akY);
        akY += 4.5;

        dayApp.forEach((app, idx) => {
          if (akY > 265) { doc.addPage(); akY = 15; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(31, 41, 55);
          doc.text(`Ex ${app.exerciseNumber || 1} • Q${app.questionNumber || (idx % 5) + 1}: `, 20, akY);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(21, 128, 61);
          const aSplit = doc.splitTextToSize(app.sampleAnswer, 140);
          doc.text(aSplit, 45, akY);
          akY += (aSplit.length * 3.5) + 2;
        });
      }

      if (dayDiag.length > 0) {
        if (akY > 250) { doc.addPage(); akY = 15; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(29, 78, 216);
        doc.text("Section E Outcomes (Diagrams & Tracing):", 16, akY);
        akY += 4.5;

        dayDiag.forEach((diag, idx) => {
          if (akY > 265) { doc.addPage(); akY = 15; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(31, 41, 55);
          doc.text(`Ex ${diag.exerciseNumber || 1} • Task ${diag.questionNumber || (idx % 5) + 1} (${diag.diagramTitle}): `, 20, akY);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(21, 128, 61);
          const dSplit = doc.splitTextToSize(diag.expectedAnswer, 130);
          doc.text(dSplit, 50, akY);
          akY += (dSplit.length * 3.5) + 2;
        });
      }
    }
  }

  const safeFilename = `${header?.subject || 'Lesson'}_${header?.classLevel || 'Class'}_Plan_${(header?.weekEnding || 'Week').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(safeFilename);
}
