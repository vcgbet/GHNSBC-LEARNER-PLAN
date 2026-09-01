import { GhanaSubjectData } from '../../types';

export const COMPUTING_DATA: GhanaSubjectData = {
  id: 'computing',
  name: 'Computing / ICT',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'comp_s1',
      name: 'Strand 1: Introduction to Computing & Hardware',
      subStrands: [
        {
          id: 'comp_s1_ss1',
          name: 'Sub-strand 1: Generation of Computers, Hardware and Peripherals',
          contentStandards: [
            {
              code: 'B1.1.1.1',
              description: 'Identify common ICT devices and computer hardware in everyday environment.',
              indicators: [
                {
                  code: 'B1.1.1.1.1',
                  description: 'Identify and name common computer parts (monitor, system unit, mouse, keyboard).',
                  exemplars: ['Point to and name parts on a physical desktop computer or flashcard.'],
                  suggestedTLMs: ['Desktop computer', 'Picture flashcards', 'Wall charts'],
                  keyWords: ['Monitor', 'Mouse', 'Keyboard', 'System Unit', 'Screen']
                },
                {
                  code: 'B1.1.1.1.2',
                  description: 'Demonstrate proper posture and basic mouse holding techniques.',
                  exemplars: ['Hold the mouse correctly with index finger on left button and click.'],
                  suggestedTLMs: ['Computer mouse', 'Mouse pad'],
                  keyWords: ['Mouse', 'Click', 'Pointer', 'Cursor']
                }
              ]
            },
            {
              code: 'B2.1.1.1',
              description: 'Demonstrate basic operations of starting, shutting down, and using computer peripherals.',
              indicators: [
                {
                  code: 'B2.1.1.1.1',
                  description: 'Follow correct sequence to power on and shut down a computer safely.',
                  exemplars: ['Demonstrate pressing power button and using Start Menu > Shut down.'],
                  suggestedTLMs: ['Computer workstation', 'Step-by-step sequence chart'],
                  keyWords: ['Power On', 'Shut Down', 'Start Menu', 'Booting']
                },
                {
                  code: 'B2.1.1.1.2',
                  description: 'Identify functions of the keyboard keys (Alphabet keys, Number keys, Spacebar, Enter).',
                  exemplars: ['Type learner’s first name and press Enter to start a new line.'],
                  suggestedTLMs: ['Keyboard', 'Keyboard diagram chart'],
                  keyWords: ['Alphabet Keys', 'Enter Key', 'Spacebar', 'Backspace']
                }
              ]
            },
            {
              code: 'B3.1.1.1',
              description: 'Classify computer hardware into input and output devices.',
              indicators: [
                {
                  code: 'B3.1.1.1.1',
                  description: 'Distinguish between input devices (mouse, keyboard, microphone) and output devices (monitor, speaker, printer).',
                  exemplars: ['Sort pictures of hardware devices into input and output boxes.'],
                  suggestedTLMs: ['Hardware sorting cards', 'Real computer peripherals'],
                  keyWords: ['Input Device', 'Output Device', 'Microphone', 'Speaker', 'Printer']
                },
                {
                  code: 'B3.1.1.1.2',
                  description: 'Demonstrate use of printer and speakers to output documents and sounds.',
                  exemplars: ['Listen to audio playback through speakers and observe paper printing.'],
                  suggestedTLMs: ['Printer', 'Speakers', 'Printed samples'],
                  keyWords: ['Printout', 'Hardcopy', 'Audio', 'Volume']
                }
              ]
            },
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate understanding of primary hardware units, internal components, and data storage.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Differentiate between input devices, central processing unit (CPU), and output devices.',
                  exemplars: ['Identify the CPU as the brain of the computer that processes data.'],
                  suggestedTLMs: ['System unit interior model', 'Component flashcards'],
                  keyWords: ['CPU', 'Processor', 'Storage', 'Processing', 'Hardware']
                },
                {
                  code: 'B4.1.1.1.2',
                  description: 'Identify primary storage devices (Hard Disk, Flash Drive, Memory Card, CD/DVD).',
                  exemplars: ['Plug a USB flash drive into a USB port and locate it in File Explorer.'],
                  suggestedTLMs: ['USB Flash drive', 'Hard disk drive', 'Memory card'],
                  keyWords: ['Flash Drive', 'USB Port', 'Hard Drive', 'Storage Capacity']
                }
              ]
            },
            {
              code: 'B5.1.1.1',
              description: 'Understand storage capacity units and computer memory concepts (RAM vs ROM).',
              indicators: [
                {
                  code: 'B5.1.1.1.1',
                  description: 'Explain the difference between primary memory (RAM, ROM) and secondary storage.',
                  exemplars: ['Differentiate volatile RAM from non-volatile storage using comparison table.'],
                  suggestedTLMs: ['RAM stick', 'ROM chip diagram', 'Storage charts'],
                  keyWords: ['RAM', 'ROM', 'Volatile', 'Non-volatile', 'Byte', 'Kilobyte']
                },
                {
                  code: 'B5.1.1.1.2',
                  description: 'Compare data measurement units (Bits, Bytes, KB, MB, GB, TB).',
                  exemplars: ['Arrange storage units in ascending order: Bit -> Byte -> KB -> MB -> GB -> TB.'],
                  suggestedTLMs: ['Measurement unit chart', 'File size inspector on PC'],
                  keyWords: ['Bit', 'Byte', 'Megabyte', 'Gigabyte', 'Terabyte']
                }
              ]
            },
            {
              code: 'B6.1.1.1',
              description: 'Demonstrate understanding of computer generations and advancements in hardware technology.',
              indicators: [
                {
                  code: 'B6.1.1.1.1',
                  description: 'Trace the 5 generations of computers from vacuum tubes to artificial intelligence.',
                  exemplars: ['Construct a timeline showing vacuum tubes, transistors, ICs, microprocessors, and AI.'],
                  suggestedTLMs: ['Generations of computers chart', 'Historical computing photos'],
                  keyWords: ['Vacuum Tubes', 'Transistors', 'Integrated Circuits', 'Microprocessors', 'AI']
                },
                {
                  code: 'B6.1.1.1.2',
                  description: 'Identify specialized computing devices (smartphones, ATMs, wearable tech, embedded systems).',
                  exemplars: ['Explain how microcontrollers operate in washing machines, cars, and traffic lights.'],
                  suggestedTLMs: ['Smart devices', 'Infographics on embedded systems'],
                  keyWords: ['Embedded System', 'Microcontroller', 'Wearable Tech', 'Smart Devices']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate understanding of computer hardware architecture, system specifications, and peripheral interfaces.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Identify and describe the internal components of a computer system unit (Motherboard, CPU, Power Supply, Expansion Slots).',
                  exemplars: ['Inspect an opened desktop system unit and label the motherboard, CPU heatsink, and RAM slots.'],
                  suggestedTLMs: ['Disassembled system unit', 'Component diagram posters', 'Screwdriver toolkit'],
                  keyWords: ['Motherboard', 'Heat Sink', 'Power Supply Unit', 'Expansion Slots', 'Ports']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Differentiate between port types and cable connectors (USB, HDMI, VGA, Audio jack, Ethernet RJ45).',
                  exemplars: ['Connect monitor to system unit using HDMI/VGA cable and network cable to RJ45 port.'],
                  suggestedTLMs: ['Assorted cables (HDMI, VGA, USB, RJ45)', 'Interface ports on PC'],
                  keyWords: ['HDMI', 'VGA', 'USB-C', 'Ethernet RJ45', 'Audio Jack', 'Bandwidth']
                },
                {
                  code: 'B7.1.1.1.3',
                  description: 'Check system specifications (CPU speed in GHz, RAM size, storage space, OS version).',
                  exemplars: ['Navigate to Windows Settings > System > About to record device specifications.'],
                  suggestedTLMs: ['Computer running Windows/Linux/macOS'],
                  keyWords: ['System Specs', 'Clock Speed', 'Gigahertz', 'Architecture (64-bit)']
                }
              ]
            },
            {
              code: 'B8.1.1.1',
              description: 'Examine motherboard architecture, buses, cooling mechanisms, and hardware maintenance.',
              indicators: [
                {
                  code: 'B8.1.1.1.1',
                  description: 'Explain functions of system buses (Data bus, Address bus, Control bus) and chipset.',
                  exemplars: ['Illustrate communication between CPU, RAM, and storage via system bus diagram.'],
                  suggestedTLMs: ['Bus architecture diagram', 'Motherboard schematic'],
                  keyWords: ['Data Bus', 'Address Bus', 'Control Bus', 'Chipset', 'BIOS/UEFI']
                },
                {
                  code: 'B8.1.1.1.2',
                  description: 'Demonstrate preventive maintenance of computer systems (dust cleaning, proper cable management).',
                  exemplars: ['Use a soft brush and compressed air blower to clean dust from CPU fan.'],
                  suggestedTLMs: ['Blower / Soft brush', 'Anti-static wrist strap', 'Cleaning cloth'],
                  keyWords: ['Preventive Maintenance', 'Dust Cleaning', 'Overheating', 'Cable Management']
                }
              ]
            },
            {
              code: 'B9.1.1.1',
              description: 'Evaluate computer performance, hardware troubleshooting, and modern computing trends.',
              indicators: [
                {
                  code: 'B9.1.1.1.1',
                  description: 'Troubleshoot common hardware faults (computer not booting, no display, mouse/keyboard unresponsive).',
                  exemplars: ['Diagnose loose RAM, disconnected video cable, or blown power cable.'],
                  suggestedTLMs: ['Test desktop setup', 'Troubleshooting flowchart'],
                  keyWords: ['Troubleshooting', 'POST Beep Codes', 'Display Fault', 'Cable Check']
                },
                {
                  code: 'B9.1.1.1.2',
                  description: 'Assess modern trends in computing hardware (SSDs vs HDDs, multi-core processors, cloud storage).',
                  exemplars: ['Compare read/write speeds of Solid State Drives (SSD) and Hard Disk Drives (HDD).'],
                  suggestedTLMs: ['SSD and HDD sample units', 'Benchmarking software report'],
                  keyWords: ['SSD', 'HDD', 'Multi-core', 'NVMe', 'Cloud Storage']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s1_ss2',
          name: 'Sub-strand 2: Operating Systems and File Management',
          contentStandards: [
            {
              code: 'B4.1.2.1',
              description: 'Demonstrate understanding of the operating system desktop, icons, and windows.',
              indicators: [
                {
                  code: 'B4.1.2.1.1',
                  description: 'Identify elements of the graphical user interface (Desktop wallpaper, Taskbar, Icons, Start Menu).',
                  exemplars: ['Customize desktop background and arrange desktop icons neatly.'],
                  suggestedTLMs: ['Computer with Windows GUI', 'Projector'],
                  keyWords: ['GUI', 'Desktop', 'Taskbar', 'Icon', 'Wallpaper']
                }
              ]
            },
            {
              code: 'B7.1.2.1',
              description: 'Demonstrate proficiency in operating systems, directory structures, and file management.',
              indicators: [
                {
                  code: 'B7.1.2.1.1',
                  description: 'Create, rename, copy, move, delete, and restore folders and files in a hierarchical structure.',
                  exemplars: ['Create a main folder "My Subjects" with subfolders for "Computing", "Math", "Science".'],
                  suggestedTLMs: ['Computer Lab', 'File Explorer'],
                  keyWords: ['Folder', 'Directory Tree', 'Path', 'File Extension', 'Recycle Bin']
                },
                {
                  code: 'B7.1.2.1.2',
                  description: 'Identify common file extensions and their corresponding applications (.docx, .xlsx, .pptx, .pdf, .jpg, .mp3, .mp4).',
                  exemplars: ['Match file extensions to software applications on a worksheet.'],
                  suggestedTLMs: ['File extension flashcards', 'File Explorer view settings'],
                  keyWords: ['File Extension', '.docx', '.xlsx', '.pdf', '.jpg', 'Default App']
                }
              ]
            },
            {
              code: 'B8.1.2.1',
              description: 'Manage file security, compression, and operating system utilities.',
              indicators: [
                {
                  code: 'B8.1.2.1.1',
                  description: 'Demonstrate file compression (ZIP/RAR) and password protection techniques.',
                  exemplars: ['Compress a folder of images into a single .zip file to save storage space.'],
                  suggestedTLMs: ['Zip utility software', 'Sample files'],
                  keyWords: ['Compression', 'ZIP', 'Extract', 'Archive', 'Password Protect']
                }
              ]
            },
            {
              code: 'B9.1.2.1',
              description: 'Understand disk management, backup strategies, and operating system configuration.',
              indicators: [
                {
                  code: 'B9.1.2.1.1',
                  description: 'Perform disk cleanup, defragmentation, and create system backup points.',
                  exemplars: ['Run Windows Disk Cleanup utility to remove temporary internet and system files.'],
                  suggestedTLMs: ['Windows Administrative Tools interface'],
                  keyWords: ['Disk Cleanup', 'Defragmentation', 'Backup', 'System Restore', 'Partition']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s1_ss3',
          name: 'Sub-strand 3: Health, Safety and Ethics in Using Computing Devices',
          contentStandards: [
            {
              code: 'B4.1.3.1',
              description: 'Demonstrate good posture, eye safety, and laboratory safety rules.',
              indicators: [
                {
                  code: 'B4.1.3.1.1',
                  description: 'Demonstrate correct seating ergonomics (back upright, feet flat, monitor at eye level).',
                  exemplars: ['Demonstrate 20-20-20 rule for eye rest when working on computer screens.'],
                  suggestedTLMs: ['Ergonomics posture chart', 'Adjustable chair'],
                  keyWords: ['Ergonomics', 'Posture', 'Eye Strain', '20-20-20 Rule']
                }
              ]
            },
            {
              code: 'B7.1.3.1',
              description: 'Demonstrate knowledge of computer ergonomics, electrical safety, and lab regulations.',
              indicators: [
                {
                  code: 'B7.1.3.1.1',
                  description: 'Identify health risks associated with prolonged ICT device usage (RSI, eye strain, neck pain) and preventive measures.',
                  exemplars: ['Design a poster illustrating ergonomic computer workspace setup for school computer lab.'],
                  suggestedTLMs: ['Ergonomics safety poster', 'Computer lab rules board'],
                  keyWords: ['Repetitive Strain Injury (RSI)', 'Ergonomics', 'Electrical Hazard', 'Surge Protector']
                },
                {
                  code: 'B7.1.3.1.2',
                  description: 'Explain fire safety and electrical precautions in computer laboratories.',
                  exemplars: ['Identify CO2 fire extinguishers and rules against liquids/food in the lab.'],
                  suggestedTLMs: ['CO2 extinguisher model', 'Lab safety signage'],
                  keyWords: ['CO2 Extinguisher', 'Overloading Sockets', 'Short Circuit', 'Lab Rules']
                }
              ]
            },
            {
              code: 'B8.1.3.1',
              description: 'Analyze electronic waste (e-waste) hazards and green computing practices.',
              indicators: [
                {
                  code: 'B8.1.3.1.1',
                  description: 'Explain environmental and health effects of improper e-waste disposal (Agbogbloshie case study).',
                  exemplars: ['Propose safe e-waste recycling and donation methods for old electronic devices in Ghana.'],
                  suggestedTLMs: ['E-waste documentaries', 'Agbogbloshie photo case study'],
                  keyWords: ['E-Waste', 'Heavy Metals', 'Lead', 'Mercury', 'Green Computing', 'Recycling']
                }
              ]
            },
            {
              code: 'B9.1.3.1',
              description: 'Understand intellectual property, software licensing, and computer ethics.',
              indicators: [
                {
                  code: 'B9.1.3.1.1',
                  description: 'Differentiate between proprietary software, open-source software, freeware, and shareware.',
                  exemplars: ['Compare Microsoft Windows (proprietary) with Linux Ubuntu (open source).'],
                  suggestedTLMs: ['Software licensing comparison table', 'Open source software logos'],
                  keyWords: ['Proprietary', 'Open Source', 'Freeware', 'Copyright', 'Software Piracy']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'comp_s2',
      name: 'Strand 2: Productivity Software',
      subStrands: [
        {
          id: 'comp_s2_ss1',
          name: 'Sub-strand 1: Word Processing and Document Formatting',
          contentStandards: [
            {
              code: 'B4.2.1.1',
              description: 'Demonstrate basic typing and editing skills in a word processing program.',
              indicators: [
                {
                  code: 'B4.2.1.1.1',
                  description: 'Launch word processor, type short sentences, and save document with appropriate filename.',
                  exemplars: ['Type 3 sentences about school and save as "MySchool.docx".'],
                  suggestedTLMs: ['Word processor (MS Word / LibreOffice Writer)'],
                  keyWords: ['Word Processor', 'Type', 'Save', 'Cursor', 'Filename']
                }
              ]
            },
            {
              code: 'B5.2.1.1',
              description: 'Apply text formatting tools to enhance document presentation.',
              indicators: [
                {
                  code: 'B5.2.1.1.1',
                  description: 'Format text using font style, font size, bold, italics, underline, and color highlights.',
                  exemplars: ['Format heading in 16pt Bold with Blue color and center alignment.'],
                  suggestedTLMs: ['Formatting toolbar reference chart'],
                  keyWords: ['Font Style', 'Font Size', 'Bold', 'Italics', 'Alignment', 'Highlight']
                },
                {
                  code: 'B5.2.1.1.2',
                  description: 'Insert and resize pictures and clip art in a document.',
                  exemplars: ['Insert picture of Ghana flag and align it center with text wrap.'],
                  suggestedTLMs: ['Image repository on lab computers'],
                  keyWords: ['Insert Picture', 'Resize Handles', 'Text Wrap', 'Clip Art']
                }
              ]
            },
            {
              code: 'B6.2.1.1',
              description: 'Demonstrate paragraph formatting, lists, tables, and page layout in word processors.',
              indicators: [
                {
                  code: 'B6.2.1.1.1',
                  description: 'Create bulleted and numbered lists, and set line spacing (single, 1.5, double).',
                  exemplars: ['Create a bulleted list of 5 school rules with 1.5 line spacing.'],
                  suggestedTLMs: ['Paragraph formatting toolbar'],
                  keyWords: ['Bullets', 'Numbering', 'Line Spacing', 'Indentation']
                },
                {
                  code: 'B6.2.1.1.2',
                  description: 'Create and format tables with rows, columns, and cell borders.',
                  exemplars: ['Construct a weekly class timetable table in Word with 5 columns and 8 rows.'],
                  suggestedTLMs: ['Table creation wizard'],
                  keyWords: ['Table', 'Row', 'Column', 'Merge Cells', 'Borders']
                }
              ]
            },
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate advanced word processing skills (page setup, headers/footers, find & replace, mail merge).',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Configure page orientation (Portrait/Landscape), page margins, headers, footers, and page numbers.',
                  exemplars: ['Set document margin to 1 inch Normal, add header with school name and page number footer.'],
                  suggestedTLMs: ['MS Word / Google Docs / LibreOffice Writer'],
                  keyWords: ['Orientation', 'Margins', 'Header', 'Footer', 'Page Number', 'Watermark']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Use Find and Replace, Spelling and Grammar check tools to edit a comprehensive document.',
                  exemplars: ['Find all instances of "computer" and replace with "ICT device".'],
                  suggestedTLMs: ['Spellcheck tool interface'],
                  keyWords: ['Find and Replace', 'Thesaurus', 'Spell Check', 'Proofreading']
                },
                {
                  code: 'B7.2.1.1.3',
                  description: 'Explain the purpose and basic steps of Mail Merge in sending customized letters.',
                  exemplars: ['Create a template invitation letter and link it to a recipient list.'],
                  suggestedTLMs: ['Mail merge wizard demonstration'],
                  keyWords: ['Mail Merge', 'Main Document', 'Data Source', 'Merged Fields']
                }
              ]
            },
            {
              code: 'B8.2.1.1',
              description: 'Apply multi-column layouts, table of contents, and referencing in document design.',
              indicators: [
                {
                  code: 'B8.2.1.1.1',
                  description: 'Format a document into 2 or 3 newspaper columns with drop caps and section breaks.',
                  exemplars: ['Design a class newsletter with 2 columns and a 3-line drop cap.'],
                  suggestedTLMs: ['Newsletter layout examples'],
                  keyWords: ['Columns', 'Drop Cap', 'Section Break', 'Newsletter']
                },
                {
                  code: 'B8.2.1.1.2',
                  description: 'Generate an automated Table of Contents using Heading styles (Heading 1, Heading 2).',
                  exemplars: ['Apply Heading 1 to chapters and generate Table of Contents page.'],
                  suggestedTLMs: ['Styles pane in word processor'],
                  keyWords: ['Table of Contents', 'Heading Styles', 'Hyperlink', 'Document Map']
                }
              ]
            },
            {
              code: 'B9.2.1.1',
              description: 'Collaborative document editing, track changes, and publishing in standard formats.',
              indicators: [
                {
                  code: 'B9.2.1.1.1',
                  description: 'Use Track Changes, comments, and document protection features for collaborative peer review.',
                  exemplars: ['Review a classmate’s essay with track changes turned on and insert constructive comments.'],
                  suggestedTLMs: ['Review tab in MS Word / Google Docs'],
                  keyWords: ['Track Changes', 'Comments', 'Accept/Reject', 'Protect Document']
                },
                {
                  code: 'B9.2.1.1.2',
                  description: 'Export and publish documents to Portable Document Format (PDF) and HTML.',
                  exemplars: ['Save a completed project as PDF and explain why PDF preserves visual formatting.'],
                  suggestedTLMs: ['PDF export dialog'],
                  keyWords: ['PDF', 'Export', 'Publish', 'Compatibility']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s2_ss2',
          name: 'Sub-strand 2: Spreadsheet Applications (MS Excel / Sheets)',
          contentStandards: [
            {
              code: 'B6.2.2.1',
              description: 'Demonstrate basic navigation, data entry, and simple cell formatting in spreadsheets.',
              indicators: [
                {
                  code: 'B6.2.2.1.1',
                  description: 'Identify rows, columns, cells, cell addresses (e.g. A1, C5), and name box in spreadsheet.',
                  exemplars: ['Navigate to cell D10 and enter the number 450.'],
                  suggestedTLMs: ['Spreadsheet grid wall chart', 'Excel software'],
                  keyWords: ['Cell', 'Row', 'Column', 'Cell Address', 'Name Box', 'Gridlines']
                }
              ]
            },
            {
              code: 'B7.2.2.1',
              description: 'Demonstrate proficiency in entering data, applying basic formulas, and managing worksheets.',
              indicators: [
                {
                  code: 'B7.2.2.1.1',
                  description: 'Use basic arithmetic formulas (=, +, -, *, /) and standard functions (SUM, AVERAGE, MIN, MAX).',
                  exemplars: ['Enter test scores for 5 students and calculate total using =SUM(B2:B6) and average using =AVERAGE(B2:B6).'],
                  suggestedTLMs: ['Excel formula flashcards', 'Learner mark sheet template'],
                  keyWords: ['Formula', 'SUM', 'AVERAGE', 'MIN', 'MAX', 'Formula Bar']
                },
                {
                  code: 'B7.2.2.1.2',
                  description: 'Format spreadsheet numbers (Currency, Percentage, Decimal places) and align cell text.',
                  exemplars: ['Format prices as Ghana Cedis (GH¢) with 2 decimal places and center column headers.'],
                  suggestedTLMs: ['Number formatting dropdown menu'],
                  keyWords: ['Currency (GH¢)', 'Decimal Places', 'Percentage', 'Merge & Center']
                },
                {
                  code: 'B7.2.2.1.3',
                  description: 'Use AutoFill handle to generate sequential series (numbers, days of week, months).',
                  exemplars: ['Drag fill handle from Monday to auto-populate the rest of the weekdays.'],
                  suggestedTLMs: ['AutoFill demonstration'],
                  keyWords: ['AutoFill', 'Fill Handle', 'Series', 'Drag and Drop']
                }
              ]
            },
            {
              code: 'B8.2.2.1',
              description: 'Construct charts, sort and filter data, and use logical functions in spreadsheets.',
              indicators: [
                {
                  code: 'B8.2.2.1.1',
                  description: 'Create column charts, bar charts, and pie charts to represent tabular data visually.',
                  exemplars: ['Create a 3D Clustered Column chart comparing term exam scores across 4 subjects.'],
                  suggestedTLMs: ['Chart wizard toolbar', 'Sample data sheets'],
                  keyWords: ['Column Chart', 'Pie Chart', 'Chart Title', 'Legend', 'Data Labels', 'X/Y Axis']
                },
                {
                  code: 'B8.2.2.1.2',
                  description: 'Perform single and multi-level data sorting (A-Z, Z-A) and apply auto-filters to dataset.',
                  exemplars: ['Filter student list to show only learners who scored above 70% in Computing.'],
                  suggestedTLMs: ['Filter tools interface'],
                  keyWords: ['Sort', 'Filter', 'Ascending', 'Descending', 'Criteria']
                },
                {
                  code: 'B8.2.2.1.3',
                  description: 'Apply logical IF function (=IF(condition, value_if_true, value_if_false)) to determine pass/fail status.',
                  exemplars: ['Write formula =IF(C2>=50, "Pass", "Fail") for student examination results.'],
                  suggestedTLMs: ['IF function syntax guide'],
                  keyWords: ['IF Function', 'Condition', 'Logical Test', 'Pass/Fail']
                }
              ]
            },
            {
              code: 'B9.2.2.1',
              description: 'Demonstrate advanced spreadsheet data analysis, lookup functions (VLOOKUP), and data validation.',
              indicators: [
                {
                  code: 'B9.2.2.1.1',
                  description: 'Use lookup functions (VLOOKUP, HLOOKUP) to retrieve records from reference tables.',
                  exemplars: ['Use =VLOOKUP to automatically fetch learner grade based on score table.'],
                  suggestedTLMs: ['VLOOKUP guide', 'Grade scale table'],
                  keyWords: ['VLOOKUP', 'Lookup Value', 'Table Array', 'Col_Index_Num']
                },
                {
                  code: 'B9.2.2.1.2',
                  description: 'Apply Data Validation rules (drop-down lists, numeric ranges) and freeze panes for large sheets.',
                  exemplars: ['Restrict score entry cell between 0 and 100 with error alert message.'],
                  suggestedTLMs: ['Data Validation dialog box'],
                  keyWords: ['Data Validation', 'Error Alert', 'Drop-down List', 'Freeze Panes']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s2_ss3',
          name: 'Sub-strand 3: Presentation Applications (MS PowerPoint / Slides)',
          contentStandards: [
            {
              code: 'B6.2.3.1',
              description: 'Demonstrate understanding of presentation software interface and creating simple slides.',
              indicators: [
                {
                  code: 'B6.2.3.1.1',
                  description: 'Create a 3-slide presentation with title slide and content slides using built-in themes.',
                  exemplars: ['Create slides on "My Favorite Hobby" with headings, bullet points, and images.'],
                  suggestedTLMs: ['PowerPoint / Google Slides interface'],
                  keyWords: ['Slide', 'Presentation', 'Slide Show', 'Theme', 'Placeholder']
                }
              ]
            },
            {
              code: 'B7.2.3.1',
              description: 'Design and format multimedia presentations with slide transitions and animations.',
              indicators: [
                {
                  code: 'B7.2.3.1.1',
                  description: 'Apply slide transitions (Fade, Push, Wipe) and set transition timing/sound.',
                  exemplars: ['Apply "Fade" transition to all slides with 2-second automatic advance.'],
                  suggestedTLMs: ['Transitions tab in PowerPoint'],
                  keyWords: ['Slide Transition', 'Duration', 'Advance Slide', 'Sound Effect']
                },
                {
                  code: 'B7.2.3.1.2',
                  description: 'Apply custom animations (Entrance, Emphasis, Exit) to text and graphic objects.',
                  exemplars: ['Animate bullet points to fly in one by one on mouse click.'],
                  suggestedTLMs: ['Animation pane'],
                  keyWords: ['Custom Animation', 'Entrance Effect', 'Fly In', 'Animation Pane']
                },
                {
                  code: 'B7.2.3.1.3',
                  description: 'Run full-screen Slide Show using keyboard shortcuts (F5, Shift+F5, Esc).',
                  exemplars: ['Deliver a 2-minute presentation to classmates using slide show mode.'],
                  suggestedTLMs: ['Presentation projector', 'Presenter clicker'],
                  keyWords: ['Slide Show', 'F5 Shortcut', 'Presenter View', 'Speaker Notes']
                }
              ]
            },
            {
              code: 'B8.2.3.1',
              description: 'Incorporate multimedia (audio clips, video embedding, hyperlinks) and customize slide master.',
              indicators: [
                {
                  code: 'B8.2.3.1.1',
                  description: 'Embed video and audio files into presentation slides with playback controls.',
                  exemplars: ['Insert educational video clip on water cycle and configure to play on click.'],
                  suggestedTLMs: ['Short video clips', 'Audio files'],
                  keyWords: ['Embed Video', 'Audio Playback', 'Loop', 'Trim Media']
                },
                {
                  code: 'B8.2.3.1.2',
                  description: 'Insert Action Buttons and hyperlinks for non-linear interactive presentations.',
                  exemplars: ['Create home, next, and back action buttons to navigate quiz slides.'],
                  suggestedTLMs: ['Action button shapes menu'],
                  keyWords: ['Action Button', 'Hyperlink', 'Navigation', 'Interactive Quiz']
                }
              ]
            },
            {
              code: 'B9.2.3.1',
              description: 'Advanced presentation techniques, screen recording, and exporting presentations as video.',
              indicators: [
                {
                  code: 'B9.2.3.1.1',
                  description: 'Record narration, laser pointer movements, and export slide show as MP4 video.',
                  exemplars: ['Export a 5-slide science tutorial as 1080p MP4 video for online learning.'],
                  suggestedTLMs: ['Record Slide Show toolbar', 'Microphone'],
                  keyWords: ['Record Narration', 'Export Video', 'MP4', 'Rehearse Timings']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'comp_s3',
      name: 'Strand 3: Communication Networks and the Internet',
      subStrands: [
        {
          id: 'comp_s3_ss1',
          name: 'Sub-strand 1: Computer Networks, Hardware and Internet Concepts',
          contentStandards: [
            {
              code: 'B5.3.1.1',
              description: 'Demonstrate understanding of basic networking and connecting to the internet.',
              indicators: [
                {
                  code: 'B5.3.1.1.1',
                  description: 'Explain what a computer network is and identify basic benefits (sharing printers, files, internet).',
                  exemplars: ['Illustrate 3 computers connected to a single printer in a lab.'],
                  suggestedTLMs: ['Network diagram chart', 'Connected lab printer'],
                  keyWords: ['Network', 'File Sharing', 'Printer Sharing', 'Internet']
                }
              ]
            },
            {
              code: 'B6.3.1.1',
              description: 'Differentiate between network types and wireless connections (Wi-Fi, Bluetooth).',
              indicators: [
                {
                  code: 'B6.3.1.1.1',
                  description: 'Differentiate wired connections (Ethernet) from wireless connections (Wi-Fi, Bluetooth, Hotspot).',
                  exemplars: ['Connect a tablet to school Wi-Fi network using network SSID and password.'],
                  suggestedTLMs: ['Wi-Fi router', 'Ethernet cable', 'Mobile hotspot'],
                  keyWords: ['Wi-Fi', 'Bluetooth', 'Ethernet Cable', 'SSID', 'Password']
                }
              ]
            },
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate understanding of network architectures, networking devices, and internet transmission.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Identify and explain functions of networking hardware (Router, Switch, Modem, NIC, Access Point).',
                  exemplars: ['Trace internet connection from ISP modem to wireless router and school desktop computers.'],
                  suggestedTLMs: ['Physical router / switch', 'Modem', 'Network interface card (NIC)', 'Network topology posters'],
                  keyWords: ['Router', 'Switch', 'Modem', 'NIC', 'Access Point', 'Bandwidth', 'ISP']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Differentiate between Local Area Network (LAN), Metropolitan Area Network (MAN), and Wide Area Network (WAN).',
                  exemplars: ['Classify school lab network (LAN), Accra city network (MAN), and the global Internet (WAN).'],
                  suggestedTLMs: ['Network classification comparison chart'],
                  keyWords: ['LAN', 'MAN', 'WAN', 'WLAN', 'Topology (Star, Bus, Ring)']
                },
                {
                  code: 'B7.3.1.1.3',
                  description: 'Explain the concept of IP addresses, domain names (DNS), and packet data transfer.',
                  exemplars: ['Explain how domain name (e.g. www.moe.gov.gh) resolves to numeric IP address.'],
                  suggestedTLMs: ['Command prompt (ping / ipconfig demo)', 'DNS flowchart'],
                  keyWords: ['IP Address', 'DNS', 'Domain Name', 'Packets', 'Protocol (TCP/IP)']
                }
              ]
            },
            {
              code: 'B8.3.1.1',
              description: 'Analyze network topologies, transmission media (fiber optic, coaxial, twisted pair), and cloud computing.',
              indicators: [
                {
                  code: 'B8.3.1.1.1',
                  description: 'Compare star, bus, ring, and mesh network topologies highlighting advantages and failure points.',
                  exemplars: ['Draw star topology showing central switch and explain what happens if one cable disconnects.'],
                  suggestedTLMs: ['Topology simulation diagrams'],
                  keyWords: ['Star Topology', 'Bus Topology', 'Mesh', 'Central Switch', 'Fault Tolerance']
                },
                {
                  code: 'B8.3.1.1.2',
                  description: 'Compare network transmission media (Twisted pair Cat6, Coaxial cable, Fiber optic cables, Satellite).',
                  exemplars: ['Examine fiber optic cable glass core and explain speed advantages for national broadband in Ghana.'],
                  suggestedTLMs: ['Samples of Cat6 cable, coaxial cable, fiber optic patch cord'],
                  keyWords: ['Fiber Optic', 'Twisted Pair', 'Cat6', 'Attenuation', 'Broadband']
                },
                {
                  code: 'B8.3.1.1.3',
                  description: 'Explain cloud computing concepts and storage services (Google Drive, OneDrive, Dropbox).',
                  exemplars: ['Upload a project file to Google Drive and share a view-only link.'],
                  suggestedTLMs: ['Cloud storage web interface'],
                  keyWords: ['Cloud Computing', 'Google Drive', 'OneDrive', 'Cloud Backup', 'Synchronization']
                }
              ]
            },
            {
              code: 'B9.3.1.1',
              description: 'Demonstrate knowledge of internet protocols, web hosting, and client-server architecture.',
              indicators: [
                {
                  code: 'B9.3.1.1.1',
                  description: 'Explain client-server vs peer-to-peer (P2P) network models and common internet protocols (HTTP, HTTPS, FTP, SMTP).',
                  exemplars: ['Explain why HTTPS encrypts passwords on banking and school portal websites.'],
                  suggestedTLMs: ['Protocol comparison chart', 'Browser address bar security padlock'],
                  keyWords: ['Client-Server', 'HTTP', 'HTTPS', 'FTP', 'SSL/TLS', 'Encryption']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s3_ss2',
          name: 'Sub-strand 2: Web Browsing, Search Engines and Information Literacy',
          contentStandards: [
            {
              code: 'B5.3.2.1',
              description: 'Demonstrate skills in using web browsers and basic search queries.',
              indicators: [
                {
                  code: 'B5.3.2.1.1',
                  description: 'Identify web browser components (Address bar, Back/Forward buttons, Refresh, Bookmarks).',
                  exemplars: ['Type URL www.ghana.gov.gh in browser address bar and bookmark the homepage.'],
                  suggestedTLMs: ['Web browser (Chrome / Edge / Firefox)'],
                  keyWords: ['Web Browser', 'URL', 'Address Bar', 'Bookmark', 'Homepage']
                }
              ]
            },
            {
              code: 'B7.3.2.1',
              description: 'Demonstrate advanced web search techniques and evaluating online information sources.',
              indicators: [
                {
                  code: 'B7.3.2.1.1',
                  description: 'Formulate targeted search queries using Boolean operators (AND, OR, NOT) and quotation marks for exact phrase search.',
                  exemplars: ['Search `"Minerals Commission of Ghana" AND gold mining` to find specific official reports.'],
                  suggestedTLMs: ['Google Search engine interface', 'Search operator cheat sheet'],
                  keyWords: ['Search Operators', 'Boolean (AND, OR, NOT)', 'Quotation Marks', 'Keywords', 'Search Engine']
                },
                {
                  code: 'B7.3.2.1.2',
                  description: 'Evaluate credibility and authenticity of online web resources using CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose).',
                  exemplars: ['Check domain extensions (.gov.gh, .edu.gh vs commercial blog) to verify official government statistics.'],
                  suggestedTLMs: ['CRAAP test evaluation rubric', 'Sample educational vs fake news websites'],
                  keyWords: ['CRAAP Test', 'Authority', 'Domain Extension (.gov, .edu)', 'Fake News', 'Fact Checking']
                }
              ]
            },
            {
              code: 'B8.3.2.1',
              description: 'Use online educational repositories, digital libraries, and citing online web references.',
              indicators: [
                {
                  code: 'B8.3.2.1.1',
                  description: 'Access digital learning platforms (e.g. Ghana Learning Passport, Khan Academy, Wikipedia) and cite online sources properly.',
                  exemplars: ['Write reference citation including author, article title, website URL, and access date.'],
                  suggestedTLMs: ['Ghana Learning Passport platform', 'Citation guide cards'],
                  keyWords: ['Digital Library', 'Citation', 'URL Reference', 'Educational Repository']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s3_ss3',
          name: 'Sub-strand 3: Electronic Mail (Email) and Digital Communication',
          contentStandards: [
            {
              code: 'B7.3.3.1',
              description: 'Demonstrate proficiency in creating, sending, and managing electronic mail (Email).',
              indicators: [
                {
                  code: 'B7.3.3.1.1',
                  description: 'Compose formal email messages with appropriate subject line, salutation, body text, attachment, and sign-off.',
                  exemplars: ['Draft an email to class teacher attaching homework document "Math_HW1.docx".'],
                  suggestedTLMs: ['Email service interface (Gmail / Outlook)'],
                  keyWords: ['Email', 'Subject Line', 'Attachment', 'To / CC / BCC', 'Salutation', 'Netiquette']
                },
                {
                  code: 'B7.3.3.1.2',
                  description: 'Differentiate between Carbon Copy (CC) and Blind Carbon Copy (BCC) recipients.',
                  exemplars: ['Explain when to use BCC to protect privacy of recipient email addresses.'],
                  suggestedTLMs: ['Email recipient fields demonstration'],
                  keyWords: ['CC (Carbon Copy)', 'BCC (Blind Carbon Copy)', 'Email Privacy']
                }
              ]
            },
            {
              code: 'B8.3.3.1',
              description: 'Organize email inbox, manage spam filters, and use digital collaboration tools.',
              indicators: [
                {
                  code: 'B8.3.3.1.1',
                  description: 'Organize emails using folders/labels, mark emails as unread/starred, and report suspicious phishing emails.',
                  exemplars: ['Create a folder label "School Projects" and filter incoming teacher emails into it.'],
                  suggestedTLMs: ['Email management settings'],
                  keyWords: ['Inbox', 'Spam/Junk', 'Labels', 'Phishing', 'Filter Rules']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s3_ss4',
          name: 'Sub-strand 4: Cybersecurity, Digital Footprints and Cyber Safety',
          contentStandards: [
            {
              code: 'B7.3.4.1',
              description: 'Demonstrate understanding of cyber threats, password security, and safe online behavior.',
              indicators: [
                {
                  code: 'B7.3.4.1.1',
                  description: 'Identify common malware threats (Viruses, Worms, Trojans, Ransomware, Spyware) and install antivirus updates.',
                  exemplars: ['Explain how antivirus software scans flash drives and removes infected Trojan files.'],
                  suggestedTLMs: ['Antivirus software scan dashboard', 'Cyber threat infographic'],
                  keyWords: ['Malware', 'Virus', 'Trojan', 'Ransomware', 'Antivirus', 'Quarantine']
                },
                {
                  code: 'B7.3.4.1.2',
                  description: 'Create strong passwords using combination of uppercase, lowercase, numbers, and special symbols ($#@!).',
                  exemplars: ['Evaluate password strength meter using strong passphrase vs weak password "123456".'],
                  suggestedTLMs: ['Password strength visualizer'],
                  keyWords: ['Strong Password', 'Two-Factor Authentication (2FA)', 'Passphrase', 'Biometrics']
                },
                {
                  code: 'B7.3.4.1.3',
                  description: 'Demonstrate cyber safety rules to prevent cyberbullying, online grooming, and identity theft.',
                  exemplars: ['Explain why personal details (home address, phone number, school name) must never be shared publicly with strangers online.'],
                  suggestedTLMs: ['Cyber safety case study scenarios', 'Digital citizenship poster'],
                  keyWords: ['Cyberbullying', 'Identity Theft', 'Digital Footprint', 'Privacy Settings', 'Netiquette']
                }
              ]
            },
            {
              code: 'B8.3.4.1',
              description: 'Examine social engineering attacks (Phishing, Smishing, Vishing) and cyber laws in Ghana.',
              indicators: [
                {
                  code: 'B8.3.4.1.1',
                  description: 'Recognize fake phishing emails/SMS messages requesting MoMo PINs or bank credentials.',
                  exemplars: ['Analyze sample fraudulent SMS claiming lottery win or SIM card blockage.'],
                  suggestedTLMs: ['Sample phishing SMS messages', 'Cyber Security Authority (CSA Ghana) advisory'],
                  keyWords: ['Phishing', 'Smishing', 'MoMo Fraud', 'Social Engineering', 'Cyber Security Authority (CSA)']
                },
                {
                  code: 'B8.3.4.1.2',
                  description: 'Explain Ghana Cybersecurity Act 2020 (Act 1038) and Data Protection Act 2012 (Act 843).',
                  exemplars: ['Discuss legal penalties for unauthorized computer access, hacking, and revenge pornography.'],
                  suggestedTLMs: ['Ghana Cybersecurity Act summary handbook'],
                  keyWords: ['Cybersecurity Act', 'Data Protection', 'Hacking Penalties', 'Cyber Crime']
                }
              ]
            },
            {
              code: 'B9.3.4.1',
              description: 'Evaluate digital footprint management, data encryption, and ethical hacking fundamentals.',
              indicators: [
                {
                  code: 'B9.3.4.1.1',
                  description: 'Audit personal digital footprints across social media platforms and configure advanced privacy permissions.',
                  exemplars: ['Conduct Google search of own name and check privacy settings on social media apps.'],
                  suggestedTLMs: ['Digital footprint checklist'],
                  keyWords: ['Digital Footprint', 'Data Privacy', 'End-to-End Encryption', 'Account Audit']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'comp_s4',
      name: 'Strand 4: Computational Thinking and Programming',
      subStrands: [
        {
          id: 'comp_s4_ss1',
          name: 'Sub-strand 1: Computational Thinking, Algorithms and Flowcharts',
          contentStandards: [
            {
              code: 'B5.4.1.1',
              description: 'Demonstrate basic computational thinking concepts (decomposition and sequential steps).',
              indicators: [
                {
                  code: 'B5.4.1.1.1',
                  description: 'Break down a complex everyday task into sequential step-by-step instructions (e.g. preparing tea, brushing teeth).',
                  exemplars: ['Write 5 sequential steps to wash hands or sharpen a pencil.'],
                  suggestedTLMs: ['Sequence picture cards', 'Activity worksheets'],
                  keyWords: ['Decomposition', 'Sequence', 'Step-by-Step', 'Algorithm']
                }
              ]
            },
            {
              code: 'B6.4.1.1',
              description: 'Understand pattern recognition, abstraction, and simple pseudocode.',
              indicators: [
                {
                  code: 'B6.4.1.1.1',
                  description: 'Identify patterns in numbers and write simple pseudocode to find the largest of two numbers.',
                  exemplars: ['Write pseudocode: IF A > B THEN print A ELSE print B.'],
                  suggestedTLMs: ['Pseudocode worksheet'],
                  keyWords: ['Pattern Recognition', 'Abstraction', 'Pseudocode', 'Conditional']
                }
              ]
            },
            {
              code: 'B7.4.1.1',
              description: 'Demonstrate algorithmic problem solving using standard flowchart symbols and pseudocode.',
              indicators: [
                {
                  code: 'B7.4.1.1.1',
                  description: 'Write clear pseudocode for calculating area of geometric shapes and determining learner grades.',
                  exemplars: ['Write pseudocode algorithm to calculate area of rectangle (Input Length, Width; Area = Length * Width; Output Area).'],
                  suggestedTLMs: ['Pseudocode templates', 'Whiteboard'],
                  keyWords: ['Algorithm', 'Pseudocode', 'Input', 'Process', 'Output', 'Decision']
                },
                {
                  code: 'B7.4.1.1.2',
                  description: 'Construct standard flowcharts using appropriate ANSI geometric symbols (Oval/Terminal, Parallelogram/I-O, Rectangle/Process, Diamond/Decision, Flowlines).',
                  exemplars: ['Draw a complete flowchart to determine if a given integer is Positive, Negative, or Zero.'],
                  suggestedTLMs: ['Flowchart symbol cutouts', 'Flowchart stencil rulers', 'Drawing software'],
                  keyWords: ['Flowchart', 'Terminal Symbol', 'Process Box', 'Decision Diamond', 'Flowlines']
                },
                {
                  code: 'B7.4.1.1.3',
                  description: 'Trace flowchart execution with sample test data (Dry run / Trace table) to detect logic errors.',
                  exemplars: ['Trace flowchart variables using a 4-column trace table (Step, Variable A, Variable B, Output).'],
                  suggestedTLMs: ['Trace table template'],
                  keyWords: ['Trace Table', 'Dry Run', 'Logic Error', 'Bug', 'Test Data']
                }
              ]
            },
            {
              code: 'B8.4.1.1',
              description: 'Design algorithms involving repetition (loops/iteration), counters, and multi-branch decisions.',
              indicators: [
                {
                  code: 'B8.4.1.1.1',
                  description: 'Design pseudocode and flowchart implementing definite loops (FOR loop) and indefinite loops (WHILE / REPEAT-UNTIL).',
                  exemplars: ['Draw flowchart to print first 10 even numbers using counter variable Count = Count + 2.'],
                  suggestedTLMs: ['Loop structure reference cards'],
                  keyWords: ['Loop', 'Iteration', 'FOR Loop', 'WHILE Loop', 'Counter', 'Condition']
                }
              ]
            },
            {
              code: 'B9.4.1.1',
              description: 'Apply algorithm optimization, sorting algorithms, and searching techniques.',
              indicators: [
                {
                  code: 'B9.4.1.1.1',
                  description: 'Explain linear search and binary search algorithms and compare their efficiency.',
                  exemplars: ['Role-play finding a name in an unsorted list (linear) vs sorted dictionary (binary search).'],
                  suggestedTLMs: ['Card sorting activity deck'],
                  keyWords: ['Linear Search', 'Binary Search', 'Bubble Sort', 'Algorithm Efficiency']
                }
              ]
            }
          ]
        },
        {
          id: 'comp_s4_ss2',
          name: 'Sub-strand 2: Visual Programming and Block Coding (Scratch / Blockly)',
          contentStandards: [
            {
              code: 'B5.4.2.1',
              description: 'Demonstrate understanding of visual programming environment (Scratch interface, sprites, and stage).',
              indicators: [
                {
                  code: 'B5.4.2.1.1',
                  description: 'Navigate Scratch stage, select sprites from library, change backdrops, and snap Motion and Looks blocks together.',
                  exemplars: ['Snap "When Green Flag Clicked" -> "Move 10 steps" -> "Say Hello!" blocks to make cat sprite speak.'],
                  suggestedTLMs: ['Scratch software / Scratch online (scratch.mit.edu)', 'Block color reference cards'],
                  keyWords: ['Scratch', 'Sprite', 'Stage', 'Backdrop', 'Green Flag', 'Blocks']
                }
              ]
            },
            {
              code: 'B7.4.2.1',
              description: 'Create interactive animations, dialogues, and sound effects using block-based programming.',
              indicators: [
                {
                  code: 'B7.4.2.1.1',
                  description: 'Program interactive character dialogues between two sprites using Broadcast and Receive messaging blocks.',
                  exemplars: ['Create a dialogue where Sprite 1 asks a question and Sprite 2 replies upon receiving broadcast message.'],
                  suggestedTLMs: ['Scratch project templates', 'Interactive storytelling rubrics'],
                  keyWords: ['Broadcast', 'Receive Message', 'Costume Switch', 'Sound Blocks', 'Dialogue']
                },
                {
                  code: 'B7.4.2.1.2',
                  description: 'Implement user interaction using Sensing blocks (Ask [question] and wait, Answer, Key pressed).',
                  exemplars: ['Program a sprite to ask user for their name and greet them by name using "Join" operator block.'],
                  suggestedTLMs: ['Sensing block reference examples'],
                  keyWords: ['Sensing Blocks', 'Ask and Wait', 'Answer Variable', 'Join Text', 'Key Pressed']
                },
                {
                  code: 'B7.4.2.1.3',
                  description: 'Use Control blocks (Repeat [10], Forever, If [condition] Then, Wait 1 sec) to control animation flow.',
                  exemplars: ['Program an aquarium animation where fish sprites swim continuously across the screen and bounce on edge.'],
                  suggestedTLMs: ['Scratch animation files'],
                  keyWords: ['Forever Loop', 'If on Edge Bounce', 'Repeat Loop', 'Control Flow']
                }
              ]
            },
            {
              code: 'B8.4.2.1',
              description: 'Create interactive 2D games with variables, score counters, collision detection, and timer.',
              indicators: [
                {
                  code: 'B8.4.2.1.1',
                  description: 'Create variables (Score, Lives, Time) and use Operators (<, >, =, Random 1 to 10) in game design.',
                  exemplars: ['Design a "Catch the Falling Apples" game where score increases by 1 each time bowl touches apple.'],
                  suggestedTLMs: ['Game development templates in Scratch'],
                  keyWords: ['Variable', 'Score Counter', 'Touching Sprite', 'Pick Random', 'Game Over']
                }
              ]
            },
            {
              code: 'B9.4.2.1',
              description: 'Transition from visual block coding to text-based programming (Python / HTML / JavaScript basics).',
              indicators: [
                {
                  code: 'B9.4.2.1.1',
                  description: 'Write simple Python programs demonstrating variables, data types (string, integer, float), print(), and input() functions.',
                  exemplars: ['Write Python script to ask user for 2 numbers and display their sum.'],
                  suggestedTLMs: ['Python IDLE / Thonny / Online Python runner (replit)'],
                  keyWords: ['Python', 'print()', 'input()', 'Variable', 'Data Types', 'Syntax']
                },
                {
                  code: 'B9.4.2.1.2',
                  description: 'Create basic web page structures using HTML5 tags (<html>, <head>, <title>, <body>, <h1> to <h6>, <p>, <img>).',
                  exemplars: ['Create a web page titled "My School Profile" containing heading, paragraph, and school crest image.'],
                  suggestedTLMs: ['Text editor (Notepad / VS Code)', 'Web browser'],
                  keyWords: ['HTML5', 'Tags', 'Heading', 'Paragraph', 'Attributes', 'Web Development']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
