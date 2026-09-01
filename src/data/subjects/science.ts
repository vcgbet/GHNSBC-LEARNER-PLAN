import { GhanaSubjectData } from '../../types';

export const SCIENCE_DATA: GhanaSubjectData = {
  id: 'science',
  name: 'Science',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'sci_s1',
      name: 'Strand 1: Diversity of Matter',
      subStrands: [
        {
          id: 'sci_s1_ss1',
          name: 'Sub-strand 1: Living and Non-Living Things, Classification of Organisms',
          contentStandards: [
            {
              code: 'B1.1.1.1',
              description: 'Observe, identify, and group living and non-living things in the school environment.',
              indicators: [
                {
                  code: 'B1.1.1.1.1',
                  description: 'Distinguish between living organisms (plants, animals) and non-living objects (stones, tables, pencils).',
                  exemplars: ['Walk around the school compound to collect and classify objects into living and non-living.'],
                  suggestedTLMs: ['Real plants', 'Insects in transparent jars', 'Stones', 'Charts'],
                  keyWords: ['Living Things', 'Non-living', 'Plants', 'Animals', 'Growth']
                }
              ]
            },
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate understanding of classification of living things into plants and animals and their characteristics.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Classify animals into vertebrates (with backbone) and invertebrates (without backbone).',
                  exemplars: ['Group picture cards of animals into vertebrates (fish, frog, lizard, bird, goat) and invertebrates (spider, snail, worm).'],
                  suggestedTLMs: ['Animal picture flashcards', 'Skeletons chart', 'Magnifying lenses'],
                  keyWords: ['Vertebrate', 'Invertebrate', 'Backbone', 'Mammal', 'Reptile', 'Amphibian', 'Bird', 'Fish']
                },
                {
                  code: 'B4.1.1.1.2',
                  description: 'Classify plants into flowering and non-flowering plants with local Ghanaian examples.',
                  exemplars: ['Identify maize, mango, and hibiscus as flowering; ferns and mosses as non-flowering.'],
                  suggestedTLMs: ['Fresh plant specimens', 'Magnifying glasses', 'Plant classification posters'],
                  keyWords: ['Flowering Plants', 'Non-Flowering Plants', 'Ferns', 'Mosses', 'Reproduction']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate understanding of particulate nature of matter, atoms, elements, and the periodic table.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Explain the particulate nature of matter (solids, liquids, gases) based on particle arrangement and motion.',
                  exemplars: ['Model solid, liquid, and gas particles using styrofoam balls or learner role-play movements.'],
                  suggestedTLMs: ['Particle arrangement model', 'Beakers', 'Food coloring in water', 'Perfume spray'],
                  keyWords: ['Matter', 'Particles', 'States of Matter', 'Diffusion', 'Brownian Motion', 'Kinetic Theory']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Identify the first 20 elements of the Periodic Table, their standard chemical symbols, and atomic numbers.',
                  exemplars: ['Recite and write symbols for H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca.'],
                  suggestedTLMs: ['Periodic Table wall chart', 'Element flashcards with atomic numbers'],
                  keyWords: ['Element', 'Chemical Symbol', 'Atomic Number', 'Periodic Table', 'Proton', 'Electron']
                },
                {
                  code: 'B7.1.1.1.3',
                  description: 'Differentiate between elements, compounds, and mixtures with everyday chemical examples.',
                  exemplars: ['Distinguish pure iron (element), water H2O (compound), and saltwater (mixture).'],
                  suggestedTLMs: ['Samples of iron fillings, sulfur powder, water, salt solution', 'Magnets'],
                  keyWords: ['Element', 'Compound', 'Mixture', 'Chemical Bond', 'Formula']
                }
              ]
            },
            {
              code: 'B8.1.1.1',
              description: 'Understand atomic structure, electronic configuration (2,8,8), and ionic/covalent bonding.',
              indicators: [
                {
                  code: 'B8.1.1.1.1',
                  description: 'Draw Bohr models and write electronic configurations for the first 20 elements.',
                  exemplars: ['Draw electron shell diagram for Sodium (Na: 2,8,1) and Chlorine (Cl: 2,8,7).'],
                  suggestedTLMs: ['Atomic shell diagram templates', 'Colored markers'],
                  keyWords: ['Bohr Model', 'Electronic Configuration', 'Valence Electrons', 'Shells (K, L, M)']
                }
              ]
            }
          ]
        },
        {
          id: 'sci_s1_ss2',
          name: 'Sub-strand 2: Mixtures, Solutions and Separation Techniques',
          contentStandards: [
            {
              code: 'B5.1.2.1',
              description: 'Demonstrate understanding of solids, liquids, and gases and physical changes of state.',
              indicators: [
                {
                  code: 'B5.1.2.1.1',
                  description: 'Investigate physical processes of evaporation, condensation, melting, freezing, and sublimation.',
                  exemplars: ['Heat ice cubes in a beaker and observe melting to water, followed by boiling to steam.'],
                  suggestedTLMs: ['Beakers', 'Ice cubes', 'Spirit burner', 'Glass plate for condensation'],
                  keyWords: ['Melting', 'Freezing', 'Evaporation', 'Condensation', 'Sublimation']
                }
              ]
            },
            {
              code: 'B7.1.2.1',
              description: 'Demonstrate skills in preparing mixtures, solutions, and applying separation methods in daily life.',
              indicators: [
                {
                  code: 'B7.1.2.1.1',
                  description: 'Differentiate between solute, solvent, solution, suspension, and emulsion with local examples.',
                  exemplars: ['Prepare sugar solution (true solution) vs gari/water or chalk/water suspension and observe settling.'],
                  suggestedTLMs: ['Sugar', 'Salt', 'Gari', 'Palm oil and water', 'Test tubes and stirring rods'],
                  keyWords: ['Solute', 'Solvent', 'Solution', 'Suspension', 'Emulsion', 'Miscible', 'Immiscible']
                },
                {
                  code: 'B7.1.2.1.2',
                  description: 'Demonstrate laboratory separation techniques: Filtration, Evaporation, Decantation, Simple Distillation, and Magnetism.',
                  exemplars: ['Separate a mixture of sand, salt, and iron filings using magnet, dissolving, filtration, and evaporation.'],
                  suggestedTLMs: ['Filter paper', 'Funnel', 'Evaporating dish', 'Magnet', 'Bunsen/Spirit burner'],
                  keyWords: ['Filtration', 'Filtrate', 'Residue', 'Evaporation', 'Decantation', 'Distillation', 'Magnetic Separation']
                }
              ]
            },
            {
              code: 'B8.1.2.1',
              description: 'Demonstrate understanding of acids, bases, pH scale, and neutralization reactions.',
              indicators: [
                {
                  code: 'B8.1.2.1.1',
                  description: 'Test acidity and basicity of domestic substances (lemon juice, vinegar, wood ash, soap) using litmus and universal indicator.',
                  exemplars: ['Prepare local hibiscus/red cabbage pH indicator extract and test lime juice and wood ash water.'],
                  suggestedTLMs: ['Litmus paper (red & blue)', 'Universal indicator / pH paper', 'Lemon juice', 'Soap solution', 'Wood ash solution'],
                  keyWords: ['Acid', 'Base / Alkali', 'pH Scale (0–14)', 'Litmus Paper', 'Neutralization']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sci_s2',
      name: 'Strand 2: Cycles',
      subStrands: [
        {
          id: 'sci_s2_ss1',
          name: 'Sub-strand 1: Earth Science, Weather and Water Cycle',
          contentStandards: [
            {
              code: 'B4.2.1.1',
              description: 'Demonstrate understanding of weather elements, recording tools, and the hydrological (water) cycle.',
              indicators: [
                {
                  code: 'B4.2.1.1.1',
                  description: 'Observe, measure, and record daily weather elements (Temperature, Rainfall, Wind Direction, Cloud Cover).',
                  exemplars: ['Construct simple wind vane and rain gauge using plastic bottles to take daily classroom recordings.'],
                  suggestedTLMs: ['Thermometer', 'Rain gauge model', 'Wind vane', 'Weather record chart'],
                  keyWords: ['Weather', 'Temperature', 'Rain Gauge', 'Wind Vane', 'Anemometer', 'Precipitation']
                },
                {
                  code: 'B4.2.1.1.2',
                  description: 'Illustrate the stages of the water cycle (Evaporation, Transpiration, Condensation, Precipitation, Collection).',
                  exemplars: ['Draw a labeled diagram of the water cycle and explain how clouds form.'],
                  suggestedTLMs: ['Water cycle chart', 'Glass jar water cycle demonstration model'],
                  keyWords: ['Water Cycle', 'Evaporation', 'Transpiration', 'Condensation', 'Groundwater']
                }
              ]
            },
            {
              code: 'B7.2.1.1',
              description: 'Demonstrate understanding of biogeochemical cycles (Carbon and Nitrogen cycles) and ecological balance.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Explain the processes of the Carbon Cycle (Photosynthesis, Respiration, Combustion, Decomposition).',
                  exemplars: ['Construct a flow diagram tracing movement of carbon atoms from atmospheric CO2 into plants and fossil fuels.'],
                  suggestedTLMs: ['Carbon cycle wall chart', 'Video animation on biogeochemical cycles'],
                  keyWords: ['Carbon Cycle', 'Photosynthesis', 'Respiration', 'Combustion', 'Decomposition', 'Carbon Sink']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Explain the stages of the Nitrogen Cycle (Nitrogen fixation, Nitrification, Assimilation, Denitrification).',
                  exemplars: ['Examine root nodules of leguminous plants (groundnut/cowpea) containing Rhizobium nitrogen-fixing bacteria.'],
                  suggestedTLMs: ['Legume plants with root nodules', 'Nitrogen cycle diagram'],
                  keyWords: ['Nitrogen Cycle', 'Nitrogen Fixation', 'Rhizobium', 'Nitrates', 'Denitrification']
                }
              ]
            }
          ]
        },
        {
          id: 'sci_s2_ss2',
          name: 'Sub-strand 2: Life Cycles of Organisms and Plant Reproduction',
          contentStandards: [
            {
              code: 'B5.2.2.1',
              description: 'Demonstrate understanding of life cycles of insects (complete vs incomplete metamorphosis).',
              indicators: [
                {
                  code: 'B5.2.2.1.1',
                  description: 'Compare complete metamorphosis (Mosquito/Butterfly: Egg -> Larva -> Pupa -> Adult) with incomplete metamorphosis (Cockroach/Grasshopper: Egg -> Nymph -> Adult).',
                  exemplars: ['Draw and label the 4 stages of mosquito life cycle and identify mosquito larvae in stagnant water.'],
                  suggestedTLMs: ['Specimens of mosquito larvae in water', 'Metamorphosis posters', 'Hand lenses'],
                  keyWords: ['Metamorphosis', 'Larva', 'Pupa', 'Nymph', 'Instar', 'Vector', 'Malaria Prevention']
                }
              ]
            },
            {
              code: 'B7.2.2.1',
              description: 'Demonstrate understanding of plant reproduction (structure of a flower, pollination, and fertilization).',
              indicators: [
                {
                  code: 'B7.2.2.1.1',
                  description: 'Dissect and identify parts of a complete flower (Sepals/Calyx, Petals/Corolla, Stamen/Anther/Filament, Pistil/Stigma/Style/Ovary).',
                  exemplars: ['Dissect fresh Hibiscus flower, label male and female reproductive parts on a drawing.'],
                  suggestedTLMs: ['Fresh Hibiscus or Pride of Barbados flowers', 'Razor blades / Scalpels', 'Dissecting boards', 'Magnifying lenses'],
                  keyWords: ['Petals', 'Sepals', 'Stamen', 'Anther', 'Pollen Grains', 'Pistil / Carpel', 'Ovary', 'Ovule']
                },
                {
                  code: 'B7.2.2.1.2',
                  description: 'Differentiate between self-pollination and cross-pollination and describe agents of pollination (Insects, Wind, Water).',
                  exemplars: ['Compare features of insect-pollinated flowers (bright petals, scent, nectar) with wind-pollinated flowers (light pollen, feathery stigmas).'],
                  suggestedTLMs: ['Maize flowers (wind) vs Hibiscus flowers (insect)', 'Pollination diagrams'],
                  keyWords: ['Pollination', 'Cross-Pollination', 'Self-Pollination', 'Pollinators', 'Fertilization']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sci_s3',
      name: 'Strand 3: Systems',
      subStrands: [
        {
          id: 'sci_s3_ss1',
          name: 'Sub-strand 1: The Human Body Systems (Digestive, Respiratory, Circulatory, Excretory)',
          contentStandards: [
            {
              code: 'B4.3.1.1',
              description: 'Demonstrate understanding of the human digestive system, teeth types, and dental hygiene.',
              indicators: [
                {
                  code: 'B4.3.1.1.1',
                  description: 'Identify the organs of the digestive tract (Mouth, Oesophagus, Stomach, Small Intestine, Large Intestine, Anus).',
                  exemplars: ['Trace the journey of a bite of banku/rice through the digestive tract using a human torso model.'],
                  suggestedTLMs: ['Human torso model', 'Digestive system chart'],
                  keyWords: ['Digestion', 'Oesophagus', 'Stomach', 'Small Intestine', 'Large Intestine', 'Enzymes']
                },
                {
                  code: 'B4.3.1.1.2',
                  description: 'Identify types of human teeth (Incisors, Canines, Premolars, Molars) and demonstrate proper brushing techniques.',
                  exemplars: ['Use model dentures and toothbrush to demonstrate circular brushing strokes.'],
                  suggestedTLMs: ['Dental model / Dentures', 'Toothbrush and toothpaste', 'Teeth diagram'],
                  keyWords: ['Incisors', 'Canines', 'Molars', 'Enamel', 'Cavities', 'Plaque']
                }
              ]
            },
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate understanding of the human respiratory and circulatory systems and their maintenance.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Describe the structure and function of the human respiratory system (Nasal cavity, Trachea, Bronchi, Lungs, Alveoli, Diaphragm).',
                  exemplars: ['Construct a working model of the lungs using a plastic bottle, Y-tube, and balloons for diaphragm mechanics.'],
                  suggestedTLMs: ['Working lung model (plastic bottle, balloons)', 'Respiratory system wall chart'],
                  keyWords: ['Respiration', 'Trachea', 'Lungs', 'Alveoli', 'Diaphragm', 'Gas Exchange', 'Inhalation', 'Exhalation']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Explain the structure of the human heart, blood vessels (Arteries, Veins, Capillaries), and blood components (RBC, WBC, Platelets, Plasma).',
                  exemplars: ['Trace deoxygenated and oxygenated blood flow through the 4 chambers of the heart (Atria and Ventricles).'],
                  suggestedTLMs: ['Model of mammalian heart', 'Circulatory system diagram poster'],
                  keyWords: ['Heart', 'Atrium', 'Ventricle', 'Artery', 'Vein', 'Capillary', 'Red Blood Cells', 'Hemoglobin', 'Platelets']
                }
              ]
            },
            {
              code: 'B8.3.1.1',
              description: 'Demonstrate understanding of the human excretory and nervous systems.',
              indicators: [
                {
                  code: 'B8.3.1.1.1',
                  description: 'Identify excretory organs (Kidneys, Skin, Lungs, Liver) and describe how kidneys filter urea from blood to produce urine.',
                  exemplars: ['Dissect and examine an animal kidney (goat/sheep) to observe cortex, medulla, and pelvis.'],
                  suggestedTLMs: ['Fresh goat/sheep kidney specimen', 'Excretory system chart'],
                  keyWords: ['Excretion', 'Kidney', 'Nephron', 'Urea', 'Urine', 'Dialysis']
                }
              ]
            }
          ]
        },
        {
          id: 'sci_s3_ss2',
          name: 'Sub-strand 2: The Solar System, Earth and Space Science',
          contentStandards: [
            {
              code: 'B5.3.2.1',
              description: 'Demonstrate understanding of the solar system, planets, and movement of Earth (rotation vs revolution).',
              indicators: [
                {
                  code: 'B5.3.2.1.1',
                  description: 'Name and arrange the 8 planets in order of distance from the Sun (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).',
                  exemplars: ['Create a scaled mobile model of the solar system showing planetary orbits.'],
                  suggestedTLMs: ['Solar system 3D model / Orrery', 'Planetary picture cards'],
                  keyWords: ['Solar System', 'Sun', 'Planets', 'Orbit', 'Asteroid Belt', 'Gravity']
                },
                {
                  code: 'B5.3.2.1.2',
                  description: 'Demonstrate how Earth rotation on its axis causes Day and Night, and revolution causes Seasons/Years.',
                  exemplars: ['Use a globe and flashlight in a darkened room to demonstrate Day and Night rotation.'],
                  suggestedTLMs: ['Globe', 'Flashlight / Torch light'],
                  keyWords: ['Rotation', 'Revolution', 'Axis', 'Day and Night', 'Orbit (365.25 days)']
                }
              ]
            },
            {
              code: 'B7.3.2.1',
              description: 'Demonstrate understanding of eclipses (Solar and Lunar), Moon phases, and satellite technologies.',
              indicators: [
                {
                  code: 'B7.3.2.1.1',
                  description: 'Explain the formation of Solar Eclipse (Moon between Sun and Earth) and Lunar Eclipse (Earth between Sun and Moon) using umbra and penumbra rays.',
                  exemplars: ['Draw ray diagrams illustrating Total and Partial Solar and Lunar eclipses.'],
                  suggestedTLMs: ['Light source (lamp)', 'Large ball (Earth)', 'Small ball (Moon)', 'Ray diagram charts'],
                  keyWords: ['Solar Eclipse', 'Lunar Eclipse', 'Umbra', 'Penumbra', 'Shadow', 'Moon Phases']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sci_s4',
      name: 'Strand 4: Forces and Energy',
      subStrands: [
        {
          id: 'sci_s4_ss1',
          name: 'Sub-strand 1: Energy Forms, Energy Transformation and Conservation',
          contentStandards: [
            {
              code: 'B4.4.1.1',
              description: 'Demonstrate understanding of sources of energy (renewable and non-renewable) and forms of energy.',
              indicators: [
                {
                  code: 'B4.4.1.1.1',
                  description: 'Classify energy sources into renewable (Solar, Wind, Hydro, Biomass) and non-renewable (Crude oil, Coal, Natural gas).',
                  exemplars: ['Debate advantages of solar energy vs charcoal/firewood for cooking in Ghana.'],
                  suggestedTLMs: ['Small solar cell model', 'Windmill toy', 'Energy classification charts'],
                  keyWords: ['Renewable Energy', 'Non-renewable', 'Solar Power', 'Hydroelectric (Akosombo)', 'Fossil Fuels']
                }
              ]
            },
            {
              code: 'B7.4.1.1',
              description: 'Demonstrate understanding of law of conservation of energy and energy conversions in everyday appliances.',
              indicators: [
                {
                  code: 'B7.4.1.1.1',
                  description: 'State the Law of Conservation of Energy and trace energy transformations in household devices.',
                  exemplars: ['Trace energy conversions in electric iron (Electrical -> Heat), flashlight (Chemical -> Electrical -> Light), and radio (Electrical -> Sound).'],
                  suggestedTLMs: ['Flashlight', 'Battery cell', 'Electric bell/buzzer', 'Energy transformation flowchart'],
                  keyWords: ['Conservation of Energy', 'Potential Energy', 'Kinetic Energy', 'Transformation', 'Efficiency']
                }
              ]
            }
          ]
        },
        {
          id: 'sci_s4_ss2',
          name: 'Sub-strand 2: Electricity, Magnetism and Electric Circuits',
          contentStandards: [
            {
              code: 'B5.4.2.1',
              description: 'Demonstrate understanding of simple electric circuits and conductors vs insulators.',
              indicators: [
                {
                  code: 'B5.4.2.1.1',
                  description: 'Construct a simple closed electric circuit with a dry cell, connecting wires, switch, and light bulb.',
                  exemplars: ['Assemble circuit components to make bulb light up when switch is closed.'],
                  suggestedTLMs: ['Dry cells (1.5V)', 'Bulb holders and mini bulbs', 'Connecting wires with alligator clips', 'Knife switches'],
                  keyWords: ['Electric Circuit', 'Dry Cell', 'Conductor', 'Insulator', 'Switch', 'Current']
                }
              ]
            },
            {
              code: 'B7.4.2.1',
              description: 'Demonstrate understanding of series and parallel circuits, Ohm’s Law (V = IR), and domestic wiring safety.',
              indicators: [
                {
                  code: 'B7.4.2.1.1',
                  description: 'Construct and compare Series and Parallel circuits with respect to brightness of bulbs and consequence of a disconnected bulb.',
                  exemplars: ['Demonstrate that in a parallel circuit, unscrewing one bulb leaves the other bulb shining brightly.'],
                  suggestedTLMs: ['Circuit boards', 'Ammeters', 'Voltmeters', 'Dry cells', 'Mini bulbs'],
                  keyWords: ['Series Circuit', 'Parallel Circuit', 'Voltage (Volts)', 'Current (Amperes)', 'Resistance (Ohms)']
                },
                {
                  code: 'B7.4.2.1.2',
                  description: 'State functions of circuit safety devices (Fuses, Circuit Breakers, Earthing, Three-pin plugs).',
                  exemplars: ['Examine a 3-pin plug and identify Live (Brown), Neutral (Blue), and Earth (Green/Yellow) wires.'],
                  suggestedTLMs: ['3-pin plug dismantled', 'Cartridge fuse', 'Circuit breaker model'],
                  keyWords: ['Fuse', 'Circuit Breaker', 'Earth Wire', 'Live Wire', 'Neutral Wire', 'Short Circuit']
                }
              ]
            }
          ]
        },
        {
          id: 'sci_s4_ss3',
          name: 'Sub-strand 3: Force, Motion and Simple Machines',
          contentStandards: [
            {
              code: 'B7.4.3.1',
              description: 'Demonstrate understanding of forces, types of forces (frictional, gravitational, magnetic), and Newton’s laws of motion.',
              indicators: [
                {
                  code: 'B7.4.3.1.1',
                  description: 'Measure force using spring balance in Newtons (N) and investigate effects of friction on moving surfaces.',
                  exemplars: ['Pull wooden block across smooth glass, paper, and rough sandpaper using spring balance to compare frictional resistance.'],
                  suggestedTLMs: ['Spring balances (Newtons)', 'Wooden blocks', 'Sandpaper', 'Lubricant oil / grease'],
                  keyWords: ['Force (Newtons)', 'Gravity', 'Friction', 'Lubrication', 'Spring Balance']
                },
                {
                  code: 'B7.4.3.1.2',
                  description: 'Explain classes of Levers (1st, 2nd, and 3rd Class Levers) and calculate Mechanical Advantage (MA = Load / Effort).',
                  exemplars: ['Classify scissors/crowbar (1st class), wheelbarrow/bottle opener (2nd class), and human arm/tongs (3rd class).'],
                  suggestedTLMs: ['Crowbar', 'Wheelbarrow', 'Bottle opener', 'Scissors', 'Lever balance apparatus'],
                  keyWords: ['Simple Machine', 'Lever', 'Fulcrum / Pivot', 'Load', 'Effort', 'Mechanical Advantage']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sci_s5',
      name: 'Strand 5: Humans and the Environment',
      subStrands: [
        {
          id: 'sci_s5_ss1',
          name: 'Sub-strand 1: Waste Management, Sanitation and Environmental Health',
          contentStandards: [
            {
              code: 'B4.5.1.1',
              description: 'Demonstrate understanding of solid and liquid waste types and the 4Rs (Reduce, Reuse, Recycle, Recover).',
              indicators: [
                {
                  code: 'B4.5.1.1.1',
                  description: 'Classify solid waste into biodegradable (food peels, paper) and non-biodegradable (plastics, glass, metals).',
                  exemplars: ['Sort classroom rubbish into separate bins for composting and plastic recycling.'],
                  suggestedTLMs: ['Color-coded waste bins', 'Compost pit in school garden'],
                  keyWords: ['Waste Management', 'Biodegradable', 'Non-biodegradable', 'Compost', 'Recycling', '4Rs']
                }
              ]
            },
            {
              code: 'B7.5.1.1',
              description: 'Analyze environmental degradation (Galamsey, Deforestation, Bush Burning, Plastic Pollution) and sustainable remediation in Ghana.',
              indicators: [
                {
                  code: 'B7.5.1.1.1',
                  description: 'Explain the destructive effects of illegal gold mining (galamsey) on river bodies (Pra, Ankobra, Birim), arable farmland, and heavy metal poisoning.',
                  exemplars: ['Organize a student debate on strategies to eradicate galamsey and restore polluted water treatment facilities.'],
                  suggestedTLMs: ['Photographs of galamsey sites vs pristine rivers', 'Water turbidity sample vials'],
                  keyWords: ['Galamsey', 'Turbidity', 'Mercury Poisoning', 'Deforestation', 'Afforestation', 'Remediation']
                },
                {
                  code: 'B7.5.1.1.2',
                  description: 'Demonstrate community tree planting (Afforestation) and water catchment protection practices.',
                  exemplars: ['Plant tree seedlings around school boundary to prevent erosion and create shade.'],
                  suggestedTLMs: ['Tree seedlings', 'Watering cans', 'Gardening tools'],
                  keyWords: ['Afforestation', 'Soil Erosion', 'Tree Planting', 'Green Canopy']
                }
              ]
            }
          ]
        },
        {
          id: 'sci_s5_ss2',
          name: 'Sub-strand 2: Diseases, Human Health and Adolescent Reproductive Health',
          contentStandards: [
            {
              code: 'B7.5.2.1',
              description: 'Demonstrate understanding of communicable and non-communicable diseases, transmission vectors, and prevention.',
              indicators: [
                {
                  code: 'B7.5.2.1.1',
                  description: 'Differentiate between infectious/communicable diseases (Malaria, Cholera, Tuberculosis, COVID-19) and lifestyle diseases (Hypertension, Diabetes).',
                  exemplars: ['Create an awareness flyer showing cause, vector, symptoms, and prevention of Cholera and Malaria.'],
                  suggestedTLMs: ['Disease awareness posters', 'Mosquito net demo model', 'ORAL rehydration salts (ORS) kit'],
                  keyWords: ['Pathogen', 'Vector', 'Malaria', 'Cholera', 'Vaccination', 'Hygiene', 'Lifestyle Disease']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
