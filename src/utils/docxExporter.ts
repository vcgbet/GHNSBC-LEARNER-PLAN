import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, HeadingLevel, AlignmentType, PageBreak } from 'docx';
import { LearnerPlanOutput } from '../types';
import { sanitizePerformanceIndicator } from './formatUtils';
import { getNaCCACurriculumReference } from './naccaReferences';

export async function exportToDocx(plan: LearnerPlanOutput): Promise<Blob> {
  const { header, starter, mainPhase, plenaryReflection, rcaQuestions, learnerWritingNotes, exercises } = plan;

  const cellBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  };

  const tableHeaderBg = "1E3A8A"; // Dark Blue
  const tableSubHeaderBg = "2563EB"; // Blue 600

  // Safe string array helper
  const safeJoin = (arr: any, separator: string = ", ") => {
    if (!arr) return "";
    if (Array.isArray(arr)) return arr.join(separator);
    return String(arr);
  };

  // Helper for table header cells
  const makeHeaderCell = (text: string, colSpan: number = 4) => new TableCell({
    columnSpan: colSpan,
    shading: { fill: tableHeaderBg },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 22 })],
        alignment: AlignmentType.LEFT,
      })
    ]
  });

  // Helper for label cell
  const makeLabelCell = (label: string, colSpan: number = 1) => new TableCell({
    columnSpan: colSpan,
    shading: { fill: "F3F4F6" },
    borders: cellBorder,
    children: [
      new Paragraph({
        children: [new TextRun({ text: label, bold: true, size: 20, color: "111827" })]
      })
    ]
  });

  // Helper for value cell
  const makeValueCell = (value: string, colSpan: number = 1) => new TableCell({
    columnSpan: colSpan,
    borders: cellBorder,
    children: [
      new Paragraph({
        children: [new TextRun({ text: value || '', size: 20, color: "1F2937" })]
      })
    ]
  });

  // Document Title Paragraphs
  const titleParagraphs = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: (header?.schoolName || 'BASIC SCHOOL').toUpperCase(), bold: true, size: 28, color: "1E3A8A" })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "GHANA STANDARD-BASED CURRICULUM - LEARNER PLAN & LESSON NOTE", bold: true, size: 22, color: "1D4ED8" })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Powered by VCGMEDIA • Developer: Victor C. Gbetodeme", italics: true, size: 18, color: "D97706" })
      ],
      spacing: { after: 120 }
    }),
    new Paragraph({ text: "", spacing: { after: 150 } })
  ];

  // Header Table Rows
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          makeHeaderCell("1. LESSON OVERVIEW & NACCA CURRICULUM HEADER", 4)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Week Ending:"),
          makeValueCell(header?.weekEnding || ''),
          makeLabelCell("Class Level:"),
          makeValueCell(header?.classLevel || '')
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Subject:"),
          makeValueCell(header?.subject || ''),
          makeLabelCell("Class Size:"),
          makeValueCell(`${header?.classSize || 40} Learners`)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Duration:"),
          makeValueCell(header?.duration || ''),
          makeLabelCell("No. of Days/Lessons:"),
          makeValueCell(`${header?.numberOfDays || 1} ${header?.numberOfDays === 1 ? 'Day' : 'Days'}`)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Lesson Days:"),
          makeValueCell(header?.selectedDays && header.selectedDays.length > 0 ? header.selectedDays.join(', ') : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, header?.numberOfDays || 1).join(', ')),
          makeLabelCell("References:"),
          makeValueCell((header?.references && header.references.trim() !== '' && !header.references.toLowerCase().includes('nacca standard curriculum guide')) ? header.references : getNaCCACurriculumReference(header?.subject || 'Mathematics', header?.classLevel || 'Basic 4', header?.strand, header?.subStrand, header?.indicator))
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Strand:"),
          makeValueCell(header?.strand || '', 3)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Sub-strand:"),
          makeValueCell(header?.subStrand || '', 3)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Content Standard:"),
          makeValueCell(header?.contentStandard || ''),
          makeLabelCell("Indicator Code:"),
          makeValueCell(header?.indicator || '')
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Performance Indicator(s):"),
          makeValueCell(sanitizePerformanceIndicator(header?.performanceIndicator), 3)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Teaching Resources (TLMs):"),
          makeValueCell(safeJoin(header?.teachingResources, ", "), 3)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Core Competencies:"),
          makeValueCell(safeJoin(header?.coreCompetencies, "; "), 3)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Key Vocabulary / Words:"),
          makeValueCell(safeJoin(header?.keyWords, ", "), 3)
        ]
      }),
      new TableRow({
        children: [
          makeLabelCell("Teacher's Name:"),
          makeValueCell(header?.teacherName || ''),
          makeLabelCell("Headteacher / HOD:"),
          makeValueCell(header?.nameOfHead || '')
        ]
      })
    ]
  });

  // Phases Tables (Multi-Day Support)
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
  const phaseTables: (Table | Paragraph)[] = [];

  effectiveDailyPlans.forEach((dp, idx) => {
    if (idx > 0) {
      phaseTables.push(new Paragraph({ text: "", spacing: { after: 150 } }));
    }
    const tableTitle = `2. PEDAGOGICAL PHASES & INSTRUCTIONAL ACTIVITIES ${effectiveDailyPlans.length > 1 ? `- DAY ${dp.dayNumber} OF ${effectiveDailyPlans.length}` : ''}`;
    phaseTables.push(new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [makeHeaderCell(tableTitle, 2)]
        }),
        // Phase 1
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              shading: { fill: tableSubHeaderBg },
              children: [new Paragraph({ children: [new TextRun({ text: `PHASE 1: STARTER / INTRODUCTION (${dp.starter?.duration || '10 Mins'})`, bold: true, color: "FFFFFF", size: 20 })] })]
            })
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Teacher Activities:"),
            makeValueCell(dp.starter?.teacherActivities || '')
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Learner Activities:"),
            makeValueCell(dp.starter?.learnerActivities || '')
          ]
        }),
        // Phase 2
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              shading: { fill: tableSubHeaderBg },
              children: [new Paragraph({ children: [new TextRun({ text: `PHASE 2: MAIN PHASE ACTIVITIES (${dp.mainPhase?.duration || '40 Mins'})`, bold: true, color: "FFFFFF", size: 20 })] })]
            })
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Step 1 (Demonstration):"),
            makeValueCell([ dp.mainPhase?.step1Teacher ? `Teacher: ${dp.mainPhase.step1Teacher.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '', dp.mainPhase?.step1Learner ? `Learners: ${dp.mainPhase.step1Learner.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '' ].filter(Boolean).join('\n\n'))
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Step 2 (Group Work):"),
            makeValueCell([ dp.mainPhase?.step2Teacher ? `Teacher: ${dp.mainPhase.step2Teacher.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '', dp.mainPhase?.step2Learner ? `Learners: ${dp.mainPhase.step2Learner.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '' ].filter(Boolean).join('\n\n'))
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Step 3 (Independent Practice):"),
            makeValueCell([ dp.mainPhase?.step3Teacher ? `Teacher: ${dp.mainPhase.step3Teacher.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '', dp.mainPhase?.step3Learner ? `Learners: ${dp.mainPhase.step3Learner.replace(/^\[?Teacher:?\]?\s*/gi, '').replace(/^\[?Learners?:?\]?\s*/gi, '').replace(/\[Teacher\]/gi, '').replace(/\[Learner\]/gi, '').trim()}` : '' ].filter(Boolean).join('\n\n'))
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Assessment Method(s):"),
            makeValueCell(dp.mainPhase?.assessmentMethod || '')
          ]
        }),
        // RCA Questions immediately after Assessment Method
        new TableRow({
          children: [
            makeLabelCell("RCA - Reflect (R):"),
            makeValueCell(rcaQuestions?.reflect || '')
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("RCA - Connect (C):"),
            makeValueCell(rcaQuestions?.connect || '')
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("RCA - Apply (A):"),
            makeValueCell(rcaQuestions?.apply || '')
          ]
        }),
        // Phase 3
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              shading: { fill: tableSubHeaderBg },
              children: [new Paragraph({ children: [new TextRun({ text: `PHASE 3: PLENARY / REFLECTION (${dp.plenaryReflection?.duration || '10 Mins'})`, bold: true, color: "FFFFFF", size: 20 })] })]
            })
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Teacher Summary:"),
            makeValueCell(dp.plenaryReflection?.teacherSummary || '')
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Learner Reflection:"),
            makeValueCell(dp.plenaryReflection?.learnerReflection || '')
          ]
        }),
        // Endorsement / Vetting for Day's Lesson
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              shading: { fill: tableSubHeaderBg },
              children: [new Paragraph({ children: [new TextRun({ text: `ENDORSEMENT / VETTING - DAY ${dp.dayNumber} LESSON`, bold: true, color: "FFFFFF", size: 20 })] })]
            })
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Vetted By (Name of Head):"),
            makeValueCell(header?.nameOfHead || '.......................................')
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Signature & Date:"),
            makeValueCell("Signature: ...........................................  Date: .....................")
          ]
        }),
        new TableRow({
          children: [
            makeLabelCell("Remarks / Feedback:"),
            makeValueCell("")
          ]
        })
      ]
    }));
  });

  // Learner Writing Notes Paragraphs
  const notesParagraphs: Paragraph[] = [
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: learnerWritingNotes?.title || 'Learner Notes', bold: true, size: 26, color: "1E3A8A" })]
    }),
    new Paragraph({ text: "", spacing: { after: 100 } }),
    new Paragraph({
      children: [new TextRun({ text: learnerWritingNotes?.introduction || '', size: 22, italics: true })],
      spacing: { after: 200 }
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "A. Key Vocabulary & Definitions", bold: true, size: 22, color: "1D4ED8" })]
    })
  ];

  if (learnerWritingNotes?.keyDefinitions) {
    learnerWritingNotes.keyDefinitions.forEach((def) => {
      notesParagraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: `${def.term}: `, bold: true, size: 20, color: "1F2937" }),
            new TextRun({ text: def.definition, size: 20, color: "374151" })
          ]
        })
      );
    });
  }

  notesParagraphs.push(new Paragraph({ text: "", spacing: { after: 150 } }));
  notesParagraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "B. Lesson Explanation & Notes", bold: true, size: 22, color: "1D4ED8" })]
    })
  );

  if (learnerWritingNotes?.mainContentPoints) {
    learnerWritingNotes.mainContentPoints.forEach(pt => {
      notesParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: pt.heading, bold: true, size: 21, color: "111827" })],
          spacing: { before: 100, after: 50 }
        }),
        new Paragraph({
          children: [new TextRun({ text: pt.body, size: 20, color: "374151" })]
        })
      );

      pt.bulletPoints?.forEach(bp => {
        notesParagraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: bp, size: 20, color: "4B5563" })]
          })
        );
      });
    });
  }

  notesParagraphs.push(new Paragraph({ text: "", spacing: { after: 150 } }));
  notesParagraphs.push(
    new Paragraph({
      shading: { fill: "FEF3C7" },
      children: [
        new TextRun({ text: "Summary: ", bold: true, size: 20, color: "92400E" }),
        new TextRun({ text: learnerWritingNotes?.summary || '', size: 20, color: "78350F" })
      ],
      spacing: { before: 100, after: 200 }
    })
  );

  // Section 5: Learner Exercises
  const exerciseParagraphs: Paragraph[] = [
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: "LEARNER ASSESSMENT WORKSHEETS", bold: true, size: 26, color: "1E3A8A" })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Class: ${header?.classLevel} | Topic: ${header?.subStrand}`, size: 20, italics: true })],
      spacing: { after: 200 }
    })
  ];

  const totalDays = header?.numberOfDays || 1;

  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    const dayFIBs = (exercises?.fillInBlanks || []).filter(f => (f.dayNumber || 1) === dayNum);
    const dayMCQs = (exercises?.mcqs || []).filter(m => (m.dayNumber || 1) === dayNum);
    const dayMatching = (exercises?.matching || []).filter(m => (m.dayNumber || 1) === dayNum);
    const dayApp = (exercises?.application || []).filter(a => (a.dayNumber || 1) === dayNum);
    const dayDiag = (exercises?.diagram || []).filter(d => (d.dayNumber || 1) === dayNum);

    const hasAny = dayFIBs.length > 0 || dayMCQs.length > 0 || dayMatching.length > 0 || dayApp.length > 0 || dayDiag.length > 0;
    if (!hasAny) continue;

    // Day Header
    exerciseParagraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `DAY ${dayNum} EXERCISES (${header?.selectedDays?.[dayNum - 1] || `Day ${dayNum}`})`, bold: true, size: 24, color: "1E3A8A" })],
        spacing: { before: 240, after: 120 }
      })
    );

    const getByEx = <T extends { exerciseNumber?: number }>(arr: T[], exNum: number): T[] => {
      const f = arr.filter(i => i.exerciseNumber === exNum);
      if (f.length > 0) return f;
      return exNum === 1 ? arr.slice(0, 5) : arr.slice(5, 10);
    };

    // SECTION A: Fill in Blanks
    if (dayFIBs.length > 0) {
      exerciseParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "SECTION A: Fill in the Blanks", bold: true, size: 22, color: "1D4ED8" })],
          spacing: { before: 140, after: 80 }
        })
      );
      [1, 2].forEach(exNum => {
        const items = getByEx(dayFIBs, exNum);
        if (items.length === 0) return;
        exerciseParagraphs.push(
          new Paragraph({
            children: [new TextRun({ text: `Exercise ${exNum} (Fill in the blanks):`, bold: true, size: 20, color: "334155" })],
            spacing: { before: 80, after: 60 }
          })
        );
        items.forEach((fib, idx) => {
          exerciseParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${fib.questionNumber || idx + 1}. `, bold: true, size: 20 }),
                new TextRun({ text: fib.question, size: 20 })
              ],
              spacing: { after: 60 }
            })
          );
        });
      });
    }

    // SECTION B: MCQs
    if (dayMCQs.length > 0) {
      exerciseParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "SECTION B: Multiple Choice Questions (MCQs)", bold: true, size: 22, color: "1D4ED8" })],
          spacing: { before: 160, after: 80 }
        })
      );
      [1, 2].forEach(exNum => {
        const items = getByEx(dayMCQs, exNum);
        if (items.length === 0) return;
        exerciseParagraphs.push(
          new Paragraph({
            children: [new TextRun({ text: `Exercise ${exNum} (Multiple Choice):`, bold: true, size: 20, color: "334155" })],
            spacing: { before: 80, after: 60 }
          })
        );
        items.forEach((mcq, idx) => {
          exerciseParagraphs.push(
            new Paragraph({
              children: [new TextRun({ text: `${mcq.questionNumber || idx + 1}. ${mcq.question}`, bold: true, size: 20 })]
            }),
            new Paragraph({ children: [new TextRun({ text: `   A) ${mcq.options?.A || ''}     B) ${mcq.options?.B || ''}`, size: 20 })] }),
            new Paragraph({ children: [new TextRun({ text: `   C) ${mcq.options?.C || ''}     D) ${mcq.options?.D || ''}`, size: 20 })], spacing: { after: 80 } })
          );
        });
      });
    }

    // SECTION C: Matching
    if (dayMatching.length > 0) {
      exerciseParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "SECTION C: Matching Exercise Columns", bold: true, size: 22, color: "1D4ED8" })],
          spacing: { before: 160, after: 80 }
        })
      );
      [1, 2].forEach(exNum => {
        const items = getByEx(dayMatching, exNum);
        if (items.length === 0) return;
        exerciseParagraphs.push(
          new Paragraph({
            children: [new TextRun({ text: `Exercise ${exNum} (Match Column A with Column B):`, bold: true, size: 20, color: "334155" })],
            spacing: { before: 80, after: 60 }
          })
        );
        items.forEach((m, idx) => {
          exerciseParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${m.questionNumber || idx + 1}. ${m.itemA}`, bold: true, size: 20 }),
                new TextRun({ text: `   ---   [   ] ${m.itemB}`, size: 20 })
              ],
              spacing: { after: 50 }
            })
          );
        });
      });
    }

    // SECTION D: Application Exercises
    if (dayApp.length > 0) {
      exerciseParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "SECTION D: Application Exercises (Ghanaian Context)", bold: true, size: 22, color: "1D4ED8" })],
          spacing: { before: 160, after: 80 }
        })
      );
      [1, 2].forEach(exNum => {
        const items = getByEx(dayApp, exNum);
        if (items.length === 0) return;
        exerciseParagraphs.push(
          new Paragraph({
            children: [new TextRun({ text: `Exercise ${exNum} (Practical Problem-Solving):`, bold: true, size: 20, color: "334155" })],
            spacing: { before: 80, after: 60 }
          })
        );
        items.forEach((app, idx) => {
          exerciseParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Scenario: `, bold: true, size: 19, italics: true }),
                new TextRun({ text: app.scenarioOrContext, size: 19, italics: true })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${app.questionNumber || idx + 1}. ${app.question}`, bold: true, size: 20 })
              ],
              spacing: { after: 90 }
            })
          );
        });
      });
    }

    // SECTION E: Diagram & Visual Exercises
    if (dayDiag.length > 0) {
      exerciseParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "SECTION E: Diagram & Visual Exercises", bold: true, size: 22, color: "1D4ED8" })],
          spacing: { before: 160, after: 80 }
        })
      );
      [1, 2].forEach(exNum => {
        const items = getByEx(dayDiag, exNum);
        if (items.length === 0) return;
        exerciseParagraphs.push(
          new Paragraph({
            children: [new TextRun({ text: `Exercise ${exNum} (Visual Tasks: Pictures, Tracing & Diagrams):`, bold: true, size: 20, color: "334155" })],
            spacing: { before: 80, after: 60 }
          })
        );
        items.forEach((diag, idx) => {
          exerciseParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Task ${diag.questionNumber || idx + 1}: ${diag.diagramTitle} [${diag.diagramCategory}]`, bold: true, size: 20, color: "6B21A8" })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Instruction: ${diag.diagramPrompt}`, italics: true, size: 19 })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: diag.diagramAsciiOrDescription, font: "Courier New", size: 18 })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Question: ${diag.question}`, bold: true, size: 20 })
              ],
              spacing: { after: 100 }
            })
          );
        });
      });
    }
  }

  // Teacher Answer Key Page
  const answerKeyParagraphs: Paragraph[] = [
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: "TEACHER ANSWER KEY & MARKING GUIDE", bold: true, size: 26, color: "DC2626" })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "For Teacher Reference & Marking Only", size: 20, italics: true, color: "991B1B" })],
      spacing: { after: 200 }
    })
  ];

  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    const dayFIBs = (exercises?.fillInBlanks || []).filter(f => (f.dayNumber || 1) === dayNum);
    const dayMCQs = (exercises?.mcqs || []).filter(m => (m.dayNumber || 1) === dayNum);
    const dayMatching = (exercises?.matching || []).filter(m => (m.dayNumber || 1) === dayNum);
    const dayApp = (exercises?.application || []).filter(a => (a.dayNumber || 1) === dayNum);
    const dayDiag = (exercises?.diagram || []).filter(d => (d.dayNumber || 1) === dayNum);

    const hasAny = dayFIBs.length > 0 || dayMCQs.length > 0 || dayMatching.length > 0 || dayApp.length > 0 || dayDiag.length > 0;
    if (!hasAny) continue;

    answerKeyParagraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `DAY ${dayNum} ANSWER KEY`, bold: true, size: 22, color: "DC2626" })],
        spacing: { before: 180, after: 100 }
      })
    );

    if (dayFIBs.length > 0) {
      answerKeyParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "Section A (Fill in Blanks Answers):", bold: true, size: 20, color: "1D4ED8" })]
        })
      );
      dayFIBs.forEach((fib, idx) => {
        answerKeyParagraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: `Ex ${fib.exerciseNumber || 1} • Q${fib.questionNumber || (idx % 5) + 1}: `, bold: true, size: 19 }),
              new TextRun({ text: fib.blankAnswer || '', size: 19, color: "15803D" })
            ]
          })
        );
      });
    }

    if (dayMCQs.length > 0) {
      answerKeyParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "Section B (MCQ Answers):", bold: true, size: 20, color: "1D4ED8" })],
          spacing: { before: 100 }
        })
      );
      dayMCQs.forEach((mcq, idx) => {
        answerKeyParagraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: `Ex ${mcq.exerciseNumber || 1} • Q${mcq.questionNumber || (idx % 5) + 1}: `, bold: true, size: 19 }),
              new TextRun({ text: `Option ${mcq.correctOption}`, bold: true, size: 19, color: "15803D" }),
              new TextRun({ text: mcq.explanation ? ` (${mcq.explanation})` : "", size: 18, color: "4B5563" })
            ]
          })
        );
      });
    }

    if (dayMatching.length > 0) {
      answerKeyParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "Section C (Matching Column Answers):", bold: true, size: 20, color: "1D4ED8" })],
          spacing: { before: 100 }
        })
      );
      dayMatching.forEach((m, idx) => {
        answerKeyParagraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: `Ex ${m.exerciseNumber || 1} • ${m.itemA} `, bold: true, size: 19 }),
              new TextRun({ text: `---> `, size: 19, color: "1D4ED8" }),
              new TextRun({ text: `${m.matchKey}`, size: 19, color: "15803D" })
            ]
          })
        );
      });
    }

    if (dayApp.length > 0) {
      answerKeyParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "Section D (Application Solutions):", bold: true, size: 20, color: "1D4ED8" })],
          spacing: { before: 100 }
        })
      );
      dayApp.forEach((app, idx) => {
        answerKeyParagraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: `Ex ${app.exerciseNumber || 1} • Q${app.questionNumber || (idx % 5) + 1}: `, bold: true, size: 19 }),
              new TextRun({ text: app.sampleAnswer, size: 19, color: "15803D" })
            ]
          })
        );
      });
    }

    if (dayDiag.length > 0) {
      answerKeyParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "Section E (Diagram & Visual Outcomes):", bold: true, size: 20, color: "1D4ED8" })],
          spacing: { before: 100 }
        })
      );
      dayDiag.forEach((diag, idx) => {
        answerKeyParagraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: `Ex ${diag.exerciseNumber || 1} • Task ${diag.questionNumber || (idx % 5) + 1} (${diag.diagramTitle}): `, bold: true, size: 19 }),
              new TextRun({ text: diag.expectedAnswer, size: 19, color: "15803D" })
            ]
          })
        );
      });
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...titleParagraphs,
          headerTable,
          new Paragraph({ text: "", spacing: { after: 150 } }),
          ...phaseTables,
          ...notesParagraphs,
          ...exerciseParagraphs,
          ...answerKeyParagraphs
        ]
      }
    ]
  });

  return await Packer.toBlob(doc);
}

// Download helper function for DOCX
export async function downloadDocx(plan: LearnerPlanOutput) {
  try {
    const blob = await exportToDocx(plan);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `${(plan.header?.subject || 'Subject')}_${(plan.header?.classLevel || 'Class')}_Plan_${(plan.header?.weekEnding || 'Week').replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download DOCX:", err);
    throw err;
  }
}
