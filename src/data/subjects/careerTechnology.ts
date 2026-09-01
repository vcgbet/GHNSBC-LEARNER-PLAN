import { GhanaSubjectData } from '../../types';

export const CAREER_TECHNOLOGY_DATA: GhanaSubjectData = {
  id: 'career_technology',
  name: 'Career Technology',
  levels: ['Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'ct_s1',
      name: 'Strand 1: Health and Safety in Work Environments',
      subStrands: [
        {
          id: 'ct_s1_ss1',
          name: 'Sub-strand 1: Workshop Safety, Hazards, First Aid and Personal Protective Equipment (PPE)',
          contentStandards: [
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate understanding of workshop safety rules, PPE, hazard identification, and first aid administration.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Identify common hazards in technical workshops, food laboratories, and sewing centers, and propose prevention rules.',
                  exemplars: ['Inspect school workshop and tag potential hazards (bare electric wires, slippery floors, unshielded saw blades).'],
                  suggestedTLMs: ['PPE gear (goggles, ear muffs, safety boots, gloves, apron)', 'Workshop safety signage', 'First Aid box'],
                  keyWords: ['Workshop Safety', 'Hazard', 'PPE', 'Goggles', 'Apron', 'First Aid', 'Accident Prevention']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Demonstrate basic first aid procedures for workshop injuries (cuts/bleeding, burns, electric shocks, fainting).',
                  exemplars: ['Perform step-by-step role-play applying sterile bandage to a clean cut and running cold water over a mild burn.'],
                  suggestedTLMs: ['First Aid kit (bandages, antiseptics, cotton, scissors, burn ointment)'],
                  keyWords: ['First Aid', 'Sterile Dressing', 'Tourniquet', 'Antiseptic', 'CPR Basics']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ct_s2',
      name: 'Strand 2: Materials for Production',
      subStrands: [
        {
          id: 'ct_s2_ss1',
          name: 'Sub-strand 1: Compliant Materials, Woods, Metals, Plastics and Food Commodities',
          contentStandards: [
            {
              code: 'B7.2.1.1',
              description: 'Examine properties, classification, and uses of woods, metals, plastics, textiles, and building materials in Ghana.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Classify timber into hardwoods (Odum, Mahogany, Sapele) and softwoods (Pine, Wawa) and describe their physical properties.',
                  exemplars: ['Test wood samples for grain pattern, hardness, weight, and workability with hand tools.'],
                  suggestedTLMs: ['Wood timber specimens (Odum, Wawa, Mahogany)', 'Magnifying glasses', 'Grain identification charts'],
                  keyWords: ['Hardwood', 'Softwood', 'Odum', 'Mahogany', 'Wawa', 'Grain Structure', 'Timber Seasoning']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Differentiate between ferrous metals (contain iron: mild steel, cast iron) and non-ferrous metals (aluminum, copper, brass).',
                  exemplars: ['Use a bar magnet to test metal offcuts and observe oxidation/rusting tendencies.'],
                  suggestedTLMs: ['Metal specimens (mild steel, aluminum, copper wire, brass)', 'Bar magnet'],
                  keyWords: ['Ferrous Metal', 'Non-Ferrous Metal', 'Mild Steel', 'Aluminum', 'Corrosion / Rust', 'Malleability']
                },
                {
                  code: 'B7.2.1.1.3',
                  description: 'Classify food commodities (plant sources vs animal sources) and their nutritional functions (proteins, carbohydrates, vitamins, minerals).',
                  exemplars: ['Group local Ghanaian food items (plantain, beans, kontomire, smoked fish, eggs) into a balanced diet meal plan.'],
                  suggestedTLMs: ['Food sample basket / pictures of local Ghanaian foodstuffs', 'Nutrition charts'],
                  keyWords: ['Nutrients', 'Carbohydrates', 'Proteins', 'Vitamins', 'Kontomire', 'Balanced Diet', 'Food Groups']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ct_s3',
      name: 'Strand 3: Tools, Equipment and Processes',
      subStrands: [
        {
          id: 'ct_s3_ss1',
          name: 'Sub-strand 1: Measuring, Marking Out, Cutting and Joining Tools',
          contentStandards: [
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate safe selection, use, and maintenance of hand tools for woodworking, metalworking, and sewing.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Identify, use, and maintain measuring and marking-out tools (Steel rule, Try square, Marking gauge, Scriver, Tape measure).',
                  exemplars: ['Mark out exact 150mm length on a piece of timber using try square and marking knife for right-angle precision.'],
                  suggestedTLMs: ['Steel rule', 'Try square', 'Marking gauge', 'Scriber', 'Sliding bevel'],
                  keyWords: ['Steel Rule', 'Try Square', 'Marking Gauge', 'Right Angle (90°)', 'Tolerance', 'Accuracy']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Demonstrate safe operation of cutting and shaping tools (Tenon saw, Coping saw, Hacksaw, Jack plane, Chisels, Shears).',
                  exemplars: ['Cut a clean crosscut on timber using tenon saw held at 45-degree angle in bench hook.'],
                  suggestedTLMs: ['Tenon saw', 'Bench hook', 'Hacksaw', 'Jack plane', 'Wood chisels', 'Workbenches with vices'],
                  keyWords: ['Tenon Saw', 'Hacksaw', 'Jack Plane', 'Chisel', 'Bench Hook', 'Kerf', 'Wood Shavings']
                }
              ]
            }
          ]
        },
        {
          id: 'ct_s3_ss2',
          name: 'Sub-strand 2: Food Preparation, Cooking Methods and Kitchen Hygiene',
          contentStandards: [
            {
              code: 'B7.3.2.1',
              description: 'Demonstrate moist and dry heat cooking methods and kitchen hygiene practices.',
              indicators: [
                {
                  code: 'B7.3.2.1.1',
                  description: 'Prepare simple dishes using moist-heat cooking methods (Boiling, Steaming, Poaching, Stewing) and dry-heat methods (Baking, Roasting, Frying).',
                  exemplars: ['Cook steamed fish and boiled yam with kontomire stew demonstrating hygienic handling of cutting boards.'],
                  suggestedTLMs: ['Cooking pots', 'Gas cooker / Coal pot', 'Cutting boards (color-coded)', 'Chef knives', 'Kitchen timer'],
                  keyWords: ['Boiling', 'Steaming', 'Frying', 'Baking', 'Cross-Contamination', 'Food Hygiene', 'Recipe']
                }
              ]
            }
          ]
        },
        {
          id: 'ct_s3_ss3',
          name: 'Sub-strand 3: Sewing Stitches, Seams and Garment Construction',
          contentStandards: [
            {
              code: 'B7.3.3.1',
              description: 'Demonstrate temporary and permanent sewing stitches, seam finishes, and garment repair.',
              indicators: [
                {
                  code: 'B7.3.3.1.1',
                  description: 'Sew temporary stitches (Even basting, Tailor’s tacks) and permanent stitches (Running stitch, Back stitch, Hemming, Overcasting).',
                  exemplars: ['Create a stitch sampler on calico fabric showing neat backstitch and hemming stitches.'],
                  suggestedTLMs: ['Calico fabric squares', 'Hand sewing needles', 'Sewing thread', 'Thimble', 'Dressmaking shears'],
                  keyWords: ['Basting', 'Back Stitch', 'Running Stitch', 'Hemming', 'Seam Allowance', 'Thimble', 'Tension']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ct_s4',
      name: 'Strand 4: Technology Drawing and Design Thinking',
      subStrands: [
        {
          id: 'ct_s4_ss1',
          name: 'Sub-strand 1: Technical Drawing, Orthographic & Isometric Projections',
          contentStandards: [
            {
              code: 'B7.4.1.1',
              description: 'Demonstrate use of drawing instruments, line types, isometric drawing, and orthographic projections.',
              indicators: [
                {
                  code: 'B7.4.1.1.1',
                  description: 'Construct isometric pictorial drawings of simple shaped blocks using 30°-60° set square and T-square.',
                  exemplars: ['Draw an isometric projection of a stepped wooden block with 30° receding axes.'],
                  suggestedTLMs: ['Drawing board', 'T-square', '30°-60° set square', '45° set square', 'Drawing paper', '2H / HB pencils'],
                  keyWords: ['Isometric Projection', '30° Axis', 'T-Square', 'Set Square', 'Border Lines', 'Title Block', 'Dimensioning']
                },
                {
                  code: 'B7.4.1.1.2',
                  description: 'Draw 1st angle orthographic views (Front Elevation, Plan, Side Elevation) of simple solid objects.',
                  exemplars: ['Project Front, Plan, and End elevations of a hollow block on standard drawing sheet.'],
                  suggestedTLMs: ['Orthographic projection guides', 'Glass projection box model'],
                  keyWords: ['Orthographic Projection', 'Front Elevation', 'Plan View', 'End Elevation', 'Projection Lines']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
