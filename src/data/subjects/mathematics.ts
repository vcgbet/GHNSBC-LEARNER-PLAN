import { GhanaSubjectData } from '../../types';

export const MATHEMATICS_DATA: GhanaSubjectData = {
  id: 'math',
  name: 'Mathematics',
  levels: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'],
  strands: [
    {
      id: 'math_s1',
      name: 'Strand 1: Number',
      subStrands: [
        {
          id: 'math_s1_ss1',
          name: 'Sub-strand 1: Counting, Representation, Cardinality & Place Value',
          contentStandards: [
            {
              code: 'B1.1.1.1',
              description: 'Demonstrate understanding of whole numbers up to 100 including counting, representation, and place value.',
              indicators: [
                {
                  code: 'B1.1.1.1.1',
                  description: 'Count forwards and backwards with number names up to 100.',
                  exemplars: ['Count objects up to 50 in groups of tens and ones.', 'Use number chart 1–100 to count forwards and backwards.'],
                  suggestedTLMs: ['Counters (bottle tops, pebbles)', '100-number square chart', 'Bundle of ten sticks'],
                  keyWords: ['Counting', 'Forwards', 'Backwards', 'Number Name', 'Tens', 'Ones']
                },
                {
                  code: 'B1.1.1.1.2',
                  description: 'Compare and order sets of objects and whole numbers up to 100 using relational terms.',
                  exemplars: ['Use "more than", "less than", or "equal to" to compare quantities.'],
                  suggestedTLMs: ['Comparison cards', 'Counters', 'Number cards'],
                  keyWords: ['More Than', 'Less Than', 'Equal', 'Compare', 'Order']
                }
              ]
            },
            {
              code: 'B2.1.1.1',
              description: 'Demonstrate understanding of quantities and place value for numbers up to 1,000.',
              indicators: [
                {
                  code: 'B2.1.1.1.1',
                  description: 'Model number quantities up to 1,000 using base-ten materials (hundreds, tens, ones).',
                  exemplars: ['Model 348 as 3 flats, 4 longs, and 8 units.'],
                  suggestedTLMs: ['Base-ten blocks (flats, longs, units)', 'Place value chart', 'Abacus'],
                  keyWords: ['Hundreds', 'Tens', 'Ones', 'Base Ten', 'Expanded Form']
                },
                {
                  code: 'B2.1.1.1.2',
                  description: 'Skip count forwards and backwards in 2s, 5s, 10s, and 100s up to 1,000.',
                  exemplars: ['Skip count by 5s starting from 25 up to 100.'],
                  suggestedTLMs: ['Number line', 'Hundreds chart'],
                  keyWords: ['Skip Counting', 'Pattern', 'Sequence', 'Multiples']
                }
              ]
            },
            {
              code: 'B3.1.1.1',
              description: 'Demonstrate understanding of whole numbers up to 10,000.',
              indicators: [
                {
                  code: 'B3.1.1.1.1',
                  description: 'Read, write, and model 4-digit numbers in numerals, words, and expanded notation.',
                  exemplars: ['Express 4,520 as 4,000 + 500 + 20.'],
                  suggestedTLMs: ['Place value flip chart', 'Abacus', 'Digit cards'],
                  keyWords: ['Thousands', 'Expanded Form', 'Place Value', 'Digit']
                },
                {
                  code: 'B3.1.1.1.2',
                  description: 'Compare and order 4-digit numbers using inequality signs (<, >, =).',
                  exemplars: ['Arrange 3,450; 3,540; 3,054 in ascending order.'],
                  suggestedTLMs: ['Number cards', 'Symbol flashcards'],
                  keyWords: ['Ascending', 'Descending', 'Comparison', 'Inequality']
                }
              ]
            },
            {
              code: 'B4.1.1.1',
              description: 'Demonstrate understanding of whole numbers up to 10,000 including counting, place value, and expanded notation.',
              indicators: [
                {
                  code: 'B4.1.1.1.1',
                  description: 'Model number quantities up to 10,000 using base-ten blocks, abacus, and place value charts.',
                  exemplars: ['Represent 4,523 using base-ten blocks (4 thousands, 5 hundreds, 2 tens, 3 ones).'],
                  suggestedTLMs: ['Abacus', 'Base-ten blocks', 'Place value chart', 'Number cards'],
                  keyWords: ['Thousands', 'Place Value', 'Expanded Form', 'Digit', 'Representation']
                },
                {
                  code: 'B4.1.1.1.2',
                  description: 'Compare and order whole numbers up to 10,000 using symbols (<, >, =).',
                  exemplars: ['Compare 7,842 and 7,824 using place value analysis.'],
                  suggestedTLMs: ['Number line', 'Symbol cards (<, >, =)', 'Place value grid'],
                  keyWords: ['Compare', 'Greater Than', 'Less Than', 'Ascending', 'Descending']
                },
                {
                  code: 'B4.1.1.1.3',
                  description: 'Round off whole numbers up to 10,000 to the nearest 10, 100, and 1,000.',
                  exemplars: ['Round 3,467 to nearest hundred (3,500) and nearest thousand (3,000).'],
                  suggestedTLMs: ['Number line marked with intervals', 'Rounding rules poster'],
                  keyWords: ['Rounding Off', 'Nearest Ten', 'Nearest Hundred', 'Estimation']
                }
              ]
            },
            {
              code: 'B5.1.1.1',
              description: 'Demonstrate understanding of whole numbers up to 100,000 and Roman numerals up to L (50).',
              indicators: [
                {
                  code: 'B5.1.1.1.1',
                  description: 'Model, read, and represent whole numbers up to 100,000 in numerals and expanded form.',
                  exemplars: ['Write 65,402 in expanded form as 60,000 + 5,000 + 400 + 2.'],
                  suggestedTLMs: ['Place value chart', 'Digit cards', 'Abacus'],
                  keyWords: ['Ten Thousands', 'Expanded Notation', 'Numeral', 'Place Value']
                },
                {
                  code: 'B5.1.1.1.2',
                  description: 'Read and write Roman numerals up to 50 (L) using additive and subtractive principles.',
                  exemplars: ['Convert XXIV to Hindu-Arabic (24) and 49 to Roman numerals (XLIX).'],
                  suggestedTLMs: ['Roman numeral conversion chart', 'Clock face with Roman numerals'],
                  keyWords: ['Roman Numerals', 'Symbols (I, V, X, L)', 'Conversion']
                }
              ]
            },
            {
              code: 'B6.1.1.1',
              description: 'Demonstrate understanding of whole numbers up to 1,000,000 and Roman numerals up to C (100).',
              indicators: [
                {
                  code: 'B6.1.1.1.1',
                  description: 'Read, write, compare, and order whole numbers up to 1,000,000 using standard place value notation.',
                  exemplars: ['Write 845,210 in words: Eight hundred forty-five thousand, two hundred and ten.'],
                  suggestedTLMs: ['Millions place value chart', 'Ghana census population figures'],
                  keyWords: ['Millions', 'Hundred Thousands', 'Place Value Period', 'Comma Separators']
                },
                {
                  code: 'B6.1.1.1.2',
                  description: 'Read and write Roman numerals up to 100 (C) and apply in historical/clock contexts.',
                  exemplars: ['Convert LXXVIII (78) and XCIV (94) to Hindu-Arabic numerals.'],
                  suggestedTLMs: ['Roman numerals wall chart', 'Flashcards'],
                  keyWords: ['Roman Numerals (C, L, X, V, I)', 'Subtraction Rule']
                }
              ]
            },
            {
              code: 'B7.1.1.1',
              description: 'Demonstrate understanding of real numbers, sets, prime factors, and index notation.',
              indicators: [
                {
                  code: 'B7.1.1.1.1',
                  description: 'Express natural numbers as products of prime factors in index notation and determine HCF and LCM.',
                  exemplars: ['Express 72 as 2³ × 3² and find HCF and LCM of 36, 54, and 72.'],
                  suggestedTLMs: ['Factor tree diagrams', 'Venn diagrams for HCF/LCM', 'Index notation charts'],
                  keyWords: ['Prime Factors', 'Index Notation', 'HCF / GCD', 'LCM', 'Factor Tree', 'Exponent']
                },
                {
                  code: 'B7.1.1.1.2',
                  description: 'Demonstrate understanding of sets, set notation, union, intersection, and complement with Venn diagrams.',
                  exemplars: ['Represent set of Prime numbers and Even numbers between 1 and 20 on a 2-set Venn diagram.'],
                  suggestedTLMs: ['Venn diagram worksheets', 'Set builder notation cards'],
                  keyWords: ['Set', 'Union (∪)', 'Intersection (∩)', 'Complement', 'Universal Set', 'Venn Diagram']
                },
                {
                  code: 'B7.1.1.1.3',
                  description: 'Apply operations on integers (positive and negative numbers) on a number line.',
                  exemplars: ['Solve (-8) + (+15) and (-4) × (-6) using integer directional rules.'],
                  suggestedTLMs: ['Vertical and horizontal integer number lines', 'Two-color counters (+/-)'],
                  keyWords: ['Integers', 'Negative Numbers', 'Opposite Numbers', 'Absolute Value']
                }
              ]
            },
            {
              code: 'B8.1.1.1',
              description: 'Demonstrate understanding of rational and irrational numbers, scientific notation, and surds basics.',
              indicators: [
                {
                  code: 'B8.1.1.1.1',
                  description: 'Convert standard large and small decimal numbers into scientific notation (A × 10ⁿ where 1 ≤ A < 10).',
                  exemplars: ['Express 4,500,000 as 4.5 × 10⁶ and 0.00078 as 7.8 × 10⁻⁴.'],
                  suggestedTLMs: ['Standard form conversion tables', 'Scientific calculators'],
                  keyWords: ['Scientific Notation', 'Standard Form', 'Powers of 10', 'Significant Figures']
                },
                {
                  code: 'B8.1.1.1.2',
                  description: 'Apply laws of indices (multiplication, division, power of a power, zero and negative indices).',
                  exemplars: ['Simplify (a⁴ × a³) / a⁵ = a² and 5⁰ = 1.'],
                  suggestedTLMs: ['Laws of indices poster', 'Algebraic cards'],
                  keyWords: ['Laws of Indices', 'Base', 'Power', 'Negative Index', 'Zero Exponent']
                }
              ]
            },
            {
              code: 'B9.1.1.1',
              description: 'Demonstrate understanding of real number properties, surds simplification, and base conversions.',
              indicators: [
                {
                  code: 'B9.1.1.1.1',
                  description: 'Simplify basic surds (square roots) in the form a√b and perform addition and subtraction of like surds.',
                  exemplars: ['Simplify √72 = 6√2 and solve 3√5 + 4√5 = 7√5.'],
                  suggestedTLMs: ['Surds simplification guide', 'Radical cards'],
                  keyWords: ['Surds', 'Radical', 'Square Root', 'Rationalize', 'Like Surds']
                },
                {
                  code: 'B9.1.1.1.2',
                  description: 'Convert numbers between Base 10 (decimal) and Base 2 (binary) number systems.',
                  exemplars: ['Convert 25₁₀ to binary (11001₂) using repeated division by 2.'],
                  suggestedTLMs: ['Binary conversion tables', 'Computing bit chart'],
                  keyWords: ['Binary (Base 2)', 'Decimal (Base 10)', 'Place Value in Base 2', 'Bit']
                }
              ]
            }
          ]
        },
        {
          id: 'math_s1_ss2',
          name: 'Sub-strand 2: Number Operations (Addition, Subtraction, Multiplication, Division)',
          contentStandards: [
            {
              code: 'B1.1.2.1',
              description: 'Develop understanding of addition as joining and subtraction as taking away up to 20.',
              indicators: [
                {
                  code: 'B1.1.2.1.1',
                  description: 'Use concrete objects and pictorial representations to add two whole numbers with sum up to 20.',
                  exemplars: ['Combine 8 bottle caps and 5 bottle caps to find total 13.'],
                  suggestedTLMs: ['Counters', 'Ten frames', 'Addition flashcards'],
                  keyWords: ['Addition', 'Sum', 'Plus', 'Join', 'Total']
                }
              ]
            },
            {
              code: 'B4.1.2.1',
              description: 'Perform addition and subtraction of whole numbers up to 10,000 using standard algorithms and estimation.',
              indicators: [
                {
                  code: 'B4.1.2.1.1',
                  description: 'Add and subtract up to 4-digit numbers with and without regrouping (carrying and borrowing).',
                  exemplars: ['Solve 5,678 + 3,845 using vertical column addition with regrouping.'],
                  suggestedTLMs: ['Place value column mats', 'Grid paper'],
                  keyWords: ['Addition', 'Subtraction', 'Regrouping', 'Carrying', 'Borrowing', 'Difference']
                },
                {
                  code: 'B4.1.2.1.2',
                  description: 'Multiply multi-digit numbers by up to 2-digit numbers using lattice and standard column methods.',
                  exemplars: ['Multiply 234 × 15 using standard algorithm and verify using lattice method.'],
                  suggestedTLMs: ['Multiplication tables chart', 'Lattice grids'],
                  keyWords: ['Multiplication', 'Product', 'Factor', 'Lattice Method', 'Partial Products']
                },
                {
                  code: 'B4.1.2.1.3',
                  description: 'Divide 2-digit and 3-digit numbers by 1-digit divisors with and without remainder.',
                  exemplars: ['Solve 456 ÷ 4 using long division algorithm.'],
                  suggestedTLMs: ['Division bracket charts', 'Counters'],
                  keyWords: ['Division', 'Quotient', 'Remainder', 'Dividend', 'Divisor']
                }
              ]
            },
            {
              code: 'B7.1.2.1',
              description: 'Apply order of operations (BODMAS / PEMDAS) and solve real-world financial arithmetic problems.',
              indicators: [
                {
                  code: 'B7.1.2.1.1',
                  description: 'Apply BODMAS rule to evaluate multi-step numerical expressions involving brackets and powers.',
                  exemplars: ['Evaluate 18 - 3 × (4 + 2) + 24 ÷ 6.'],
                  suggestedTLMs: ['BODMAS rule chart', 'Expression cards'],
                  keyWords: ['BODMAS', 'Brackets', 'Orders', 'Division', 'Multiplication', 'Precedence']
                },
                {
                  code: 'B7.1.2.1.2',
                  description: 'Solve practical problems on Profit, Loss, Discount, Simple Interest (I = PRT/100), and Sales Tax (VAT).',
                  exemplars: ['Calculate profit percentage when a trader buys goods for GH¢800 and sells for GH¢1,000.'],
                  suggestedTLMs: ['Price tags', 'Receipts', 'Simple interest formula sheet'],
                  keyWords: ['Profit', 'Loss', 'Discount', 'Simple Interest', 'Principal', 'Rate', 'Time']
                }
              ]
            },
            {
              code: 'B8.1.2.1',
              description: 'Apply compound interest, hire purchase, and depreciation in financial mathematics.',
              indicators: [
                {
                  code: 'B8.1.2.1.1',
                  description: 'Calculate compound interest on bank deposits and loans over 2-3 years using step-by-step method.',
                  exemplars: ['Calculate total amount on GH¢5,000 invested at 10% per annum compound interest for 2 years.'],
                  suggestedTLMs: ['Bank statement samples', 'Interest tables'],
                  keyWords: ['Compound Interest', 'Annual Compounding', 'Depreciation', 'Hire Purchase']
                }
              ]
            }
          ]
        },
        {
          id: 'math_s1_ss3',
          name: 'Sub-strand 3: Fractions, Decimals, Percentages & Ratios',
          contentStandards: [
            {
              code: 'B4.1.3.1',
              description: 'Demonstrate understanding of proper fractions, equivalent fractions, and comparing fractions.',
              indicators: [
                {
                  code: 'B4.1.3.1.1',
                  description: 'Identify proper, improper fractions, and mixed numbers using pictorial models and fraction strips.',
                  exemplars: ['Convert improper fraction 7/3 into mixed number 2 1/3.'],
                  suggestedTLMs: ['Fraction strips', 'Circular fraction pies', 'Paper folding'],
                  keyWords: ['Numerator', 'Denominator', 'Proper Fraction', 'Improper Fraction', 'Mixed Number']
                },
                {
                  code: 'B4.1.3.1.2',
                  description: 'Generate equivalent fractions and simplify fractions to their lowest terms.',
                  exemplars: ['Show that 2/4, 3/6, and 4/8 are all equivalent to 1/2.'],
                  suggestedTLMs: ['Equivalent fraction chart', 'Fraction wall'],
                  keyWords: ['Equivalent Fractions', 'Simplest Form', 'Common Factor']
                }
              ]
            },
            {
              code: 'B7.1.3.1',
              description: 'Perform four operations on fractions and decimals, and solve ratio, proportion, and rate problems.',
              indicators: [
                {
                  code: 'B7.1.3.1.1',
                  description: 'Add, subtract, multiply, and divide common fractions and mixed numbers.',
                  exemplars: ['Solve 3 1/2 + 2 3/4 - 1 1/3 with step-by-step LCM calculation.'],
                  suggestedTLMs: ['Fraction models', 'Worksheets'],
                  keyWords: ['Fraction Addition', 'LCM', 'Reciprocal', 'Division of Fractions']
                },
                {
                  code: 'B7.1.3.1.2',
                  description: 'Divide a quantity in a given ratio and solve direct and inverse proportion word problems.',
                  exemplars: ['Share GH¢1,200 between Kofi and Ama in the ratio 3:5.'],
                  suggestedTLMs: ['Ratio bar model diagrams', 'Word problem task cards'],
                  keyWords: ['Ratio', 'Direct Proportion', 'Inverse Proportion', 'Sharing', 'Unitary Method']
                }
              ]
            },
            {
              code: 'B8.1.3.1',
              description: 'Apply percentage change (increase and decrease) and convert between fractions, decimals, and percentages.',
              indicators: [
                {
                  code: 'B8.1.3.1.1',
                  description: 'Calculate percentage increase and decrease in prices, school enrolment, and commodity costs.',
                  exemplars: ['Find percentage increase when price of fuel rises from GH¢12.00 to GH¢15.00 per litre.'],
                  suggestedTLMs: ['Percentage conversion grids', 'Market price lists'],
                  keyWords: ['Percentage Increase', 'Percentage Decrease', 'Multiplier', 'Original Price']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'math_s2',
      name: 'Strand 2: Algebra',
      subStrands: [
        {
          id: 'math_s2_ss1',
          name: 'Sub-strand 1: Patterns and Relations',
          contentStandards: [
            {
              code: 'B4.2.1.1',
              description: 'Identify, describe, extend, and create numeric and geometric repeating patterns.',
              indicators: [
                {
                  code: 'B4.2.1.1.1',
                  description: 'Identify the pattern rule in a given sequence and generate the next 3 terms.',
                  exemplars: ['Identify the rule for 4, 9, 14, 19... (Add 5) and find the next 3 terms.'],
                  suggestedTLMs: ['Pattern blocks', 'Sequence number strips'],
                  keyWords: ['Pattern Rule', 'Sequence', 'Terms', 'Ascending Pattern']
                }
              ]
            },
            {
              code: 'B7.2.1.1',
              description: 'Formulate algebraic linear relations, mapping rules (input-output tables), and determine nth terms.',
              indicators: [
                {
                  code: 'B7.2.1.1.1',
                  description: 'Determine the rule for a linear relation from a mapping table (e.g. x -> 2x + 3) and find missing values.',
                  exemplars: ['Given mapping table x: {1, 2, 3, 4} -> y: {5, 8, 11, 14}, derive the algebraic rule y = 3x + 2.'],
                  suggestedTLMs: ['Mapping arrow diagrams', 'Input-output function machine cards'],
                  keyWords: ['Linear Relation', 'Mapping', 'Domain', 'Co-domain', 'Rule (y = mx + c)', 'nth Term']
                },
                {
                  code: 'B7.2.1.1.2',
                  description: 'Plot coordinates from a linear relation table on the Cartesian coordinate plane.',
                  exemplars: ['Plot points (1, 5), (2, 8), (3, 11) on graph paper and join with a straight line.'],
                  suggestedTLMs: ['Graph board', 'Grid graph paper', 'Ruler'],
                  keyWords: ['Cartesian Plane', 'X-axis', 'Y-axis', 'Origin (0,0)', 'Coordinates', 'Straight Line']
                }
              ]
            },
            {
              code: 'B8.2.1.1',
              description: 'Determine gradient (slope) and equation of a straight line (y = mx + c).',
              indicators: [
                {
                  code: 'B8.2.1.1.1',
                  description: 'Calculate gradient m = (y₂ - y₁) / (x₂ - x₁) of a straight line passing through two points.',
                  exemplars: ['Find slope of line passing through (2, 3) and (6, 11).'],
                  suggestedTLMs: ['Coordinate geometry flashcards', 'Graph paper'],
                  keyWords: ['Gradient', 'Slope', 'Y-intercept (c)', 'Rise over Run']
                }
              ]
            }
          ]
        },
        {
          id: 'math_s2_ss2',
          name: 'Sub-strand 2: Algebraic Expressions, Equations and Inequalities',
          contentStandards: [
            {
              code: 'B4.2.2.1',
              description: 'Write simple open number sentences and solve one-step missing value problems.',
              indicators: [
                {
                  code: 'B4.2.2.1.1',
                  description: 'Solve open number sentences involving addition and subtraction (e.g., 25 + □ = 60).',
                  exemplars: ['Find value of box in 45 - □ = 18 using inverse operation.'],
                  suggestedTLMs: ['Pan balance scale', 'Open sentence cards'],
                  keyWords: ['Open Sentence', 'Missing Value', 'Inverse Operation', 'Balance']
                }
              ]
            },
            {
              code: 'B7.2.2.1',
              description: 'Simplify algebraic expressions and solve linear equations and linear inequalities in one variable.',
              indicators: [
                {
                  code: 'B7.2.2.1.1',
                  description: 'Simplify algebraic expressions by grouping like terms and expanding single brackets (a(b + c)).',
                  exemplars: ['Simplify 4x + 7y - 2x + 3y = 2x + 10y and expand 3(2x - 5).'],
                  suggestedTLMs: ['Algebra tile manipulatives', 'Algebraic cards'],
                  keyWords: ['Algebraic Expression', 'Like Terms', 'Coefficient', 'Variable', 'Expansion']
                },
                {
                  code: 'B7.2.2.1.2',
                  description: 'Solve single-variable linear equations of the form ax + b = c and a(x + b) = c.',
                  exemplars: ['Solve 3x + 7 = 22 and 2(4x - 3) = 18 for x.'],
                  suggestedTLMs: ['Pan balance models', 'Step-by-step equation solver charts'],
                  keyWords: ['Linear Equation', 'Solve for x', 'Substitution', 'Inverse Operation']
                },
                {
                  code: 'B7.2.2.1.3',
                  description: 'Solve simple linear inequalities (e.g. 2x - 3 < 7) and represent solution set on a number line.',
                  exemplars: ['Solve 3x + 2 ≥ 14 and draw solution arrow on integer number line.'],
                  suggestedTLMs: ['Inequality number line template', 'Symbol flashcards (≤, ≥, <, >)'],
                  keyWords: ['Linear Inequality', 'Solution Set', 'Number Line', 'Open/Closed Circle']
                }
              ]
            },
            {
              code: 'B8.2.2.1',
              description: 'Factorize algebraic expressions and solve simultaneous linear equations.',
              indicators: [
                {
                  code: 'B8.2.2.1.1',
                  description: 'Factorize binomial algebraic expressions by factoring out common terms (e.g. 6ax + 9ay = 3a(2x + 3y)).',
                  exemplars: ['Factorize 12x²y - 18xy² completely.'],
                  suggestedTLMs: ['Factorization flashcards'],
                  keyWords: ['Factorization', 'Common Factor', 'HCF', 'Binomial']
                },
                {
                  code: 'B8.2.2.1.2',
                  description: 'Solve simultaneous linear equations in two variables using substitution and elimination methods.',
                  exemplars: ['Solve 2x + y = 7 and 3x - y = 8 simultaneously.'],
                  suggestedTLMs: ['Simultaneous equation step-by-step solver guide'],
                  keyWords: ['Simultaneous Equations', 'Elimination Method', 'Substitution Method']
                }
              ]
            },
            {
              code: 'B9.2.2.1',
              description: 'Factorize quadratic expressions and solve quadratic equations of the form ax² + bx + c = 0.',
              indicators: [
                {
                  code: 'B9.2.2.1.1',
                  description: 'Factorize quadratic expressions of the form x² + bx + c and difference of two squares (a² - b²).',
                  exemplars: ['Factorize x² + 7x + 12 = (x + 3)(x + 4) and x² - 25 = (x - 5)(x + 5).'],
                  suggestedTLMs: ['Quadratic algebra tiles', 'Factorization formula charts'],
                  keyWords: ['Quadratic Expression', 'Factorization', 'Difference of Two Squares', 'Trinomial']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'math_s3',
      name: 'Strand 3: Geometry and Measurement',
      subStrands: [
        {
          id: 'math_s3_ss1',
          name: 'Sub-strand 1: 2D and 3D Shapes, Angles and Geometric Properties',
          contentStandards: [
            {
              code: 'B4.3.1.1',
              description: 'Identify and describe properties of 2D shapes (quadrilaterals, triangles) and 3D solids (prisms, pyramids).',
              indicators: [
                {
                  code: 'B4.3.1.1.1',
                  description: 'Identify, classify, and draw 2D shapes (square, rectangle, triangle, circle, rhombus, parallelogram).',
                  exemplars: ['Sort 2D shape cards according to number of sides and vertices.'],
                  suggestedTLMs: ['2D shape cutout models', 'Geoboards', 'Rubber bands'],
                  keyWords: ['2D Shape', 'Sides', 'Vertices', 'Quadrilateral', 'Right Angle']
                },
                {
                  code: 'B4.3.1.1.2',
                  description: 'Identify faces, edges, and vertices of 3D solids (cube, cuboid, cylinder, cone, sphere).',
                  exemplars: ['Count 6 faces, 12 edges, 8 vertices on a wooden cube.'],
                  suggestedTLMs: ['Wooden 3D solids', 'Solid nets'],
                  keyWords: ['Faces', 'Edges', 'Vertices', 'Cube', 'Cuboid', 'Net']
                }
              ]
            },
            {
              code: 'B7.3.1.1',
              description: 'Demonstrate understanding of angle properties, intersecting lines, parallel lines, and polygons.',
              indicators: [
                {
                  code: 'B7.3.1.1.1',
                  description: 'Identify and calculate angles on a straight line (sum = 180°), vertically opposite angles, and angles at a point (360°).',
                  exemplars: ['Calculate unknown angle x in a diagram of intersecting lines with supplementary angles.'],
                  suggestedTLMs: ['Protractor', 'Angle wheel', 'Geometric line charts'],
                  keyWords: ['Supplementary Angles', 'Complementary Angles', 'Vertically Opposite', 'Degrees (°)']
                },
                {
                  code: 'B7.3.1.1.2',
                  description: 'Identify alternate, corresponding, and co-interior angles formed by parallel lines and a transversal.',
                  exemplars: ['Find missing angles in "Z" (alternate) and "F" (corresponding) parallel line configurations.'],
                  suggestedTLMs: ['Parallel line geometry posters', 'Transversal line models'],
                  keyWords: ['Parallel Lines', 'Transversal', 'Alternate Angles', 'Corresponding Angles', 'Co-interior']
                },
                {
                  code: 'B7.3.1.1.3',
                  description: 'Calculate interior and exterior angle sums of regular and irregular polygons ((n - 2) × 180°).',
                  exemplars: ['Calculate sum of interior angles of a pentagon (5 - 2) × 180° = 540°.'],
                  suggestedTLMs: ['Polygon shape cutouts', 'Angle sum formula guide'],
                  keyWords: ['Polygon', 'Interior Angle', 'Exterior Angle', 'Regular Polygon', 'Sum of Angles']
                }
              ]
            },
            {
              code: 'B8.3.1.1',
              description: 'Apply Pythagorean theorem to right-angled triangles and solve bearing/distance problems.',
              indicators: [
                {
                  code: 'B8.3.1.1.1',
                  description: 'State and apply the Pythagorean theorem (a² + b² = c²) to find the unknown side of a right-angled triangle.',
                  exemplars: ['Calculate hypotenuse c when legs are a = 6cm and b = 8cm (c = √(36+64) = 10cm).'],
                  suggestedTLMs: ['Pythagoras theorem visual proof board', 'Right triangle models'],
                  keyWords: ['Pythagorean Theorem', 'Hypotenuse', 'Right-angled Triangle', 'Pythagorean Triples']
                }
              ]
            }
          ]
        },
        {
          id: 'math_s3_ss2',
          name: 'Sub-strand 2: Measurement of Perimeter, Area, Volume and Capacity',
          contentStandards: [
            {
              code: 'B4.3.2.1',
              description: 'Measure and calculate perimeter and area of squares and rectangles using standard metric units.',
              indicators: [
                {
                  code: 'B4.3.2.1.1',
                  description: 'Calculate perimeter of rectangles and squares using formula P = 2(l + w) and P = 4s in centimeters and meters.',
                  exemplars: ['Measure perimeter of classroom chalkboard using 1-metre ruler.'],
                  suggestedTLMs: ['Meter rules', 'Measuring tape', 'Perimeter formula charts'],
                  keyWords: ['Perimeter', 'Boundary', 'Length', 'Width', 'Centimeters', 'Meters']
                },
                {
                  code: 'B4.3.2.1.2',
                  description: 'Calculate area of squares and rectangles using grid squares and formula Area = l × w.',
                  exemplars: ['Find area of a rectangle 8cm long and 5cm wide (8 × 5 = 40 cm²).'],
                  suggestedTLMs: ['Square centimetre grid paper', 'Area tiles'],
                  keyWords: ['Area', 'Square Units (cm²)', 'Length', 'Breadth']
                }
              ]
            },
            {
              code: 'B7.3.2.1',
              description: 'Calculate perimeter and area of triangles, parallelograms, trapeziums, circles, and volume of cuboids.',
              indicators: [
                {
                  code: 'B7.3.2.1.1',
                  description: 'Derive and apply formulas for area of triangle (1/2 × b × h), parallelogram (b × h), and trapezium (1/2(a + b)h).',
                  exemplars: ['Calculate area of a trapezium with parallel sides 12cm, 8cm and vertical height 6cm.'],
                  suggestedTLMs: ['Area dissection models', 'Geometric formula chart'],
                  keyWords: ['Trapezium', 'Parallelogram', 'Base', 'Perpendicular Height', 'Area Formula']
                },
                {
                  code: 'B7.3.2.1.2',
                  description: 'Calculate circumference (C = 2πr = πd) and area of a circle (A = πr²) using π ≈ 22/7 or 3.142.',
                  exemplars: ['Find area and circumference of a circular bicycle wheel with radius 14cm.'],
                  suggestedTLMs: ['Circular lids/cans', 'String and ruler for π demonstration', 'Circle area poster'],
                  keyWords: ['Circle', 'Radius (r)', 'Diameter (d)', 'Circumference', 'Pi (π)']
                },
                {
                  code: 'B7.3.2.1.3',
                  description: 'Calculate surface area and volume of cubes, rectangular prisms (cuboids), and triangular prisms.',
                  exemplars: ['Calculate volume of a water storage tank measuring 2m by 1.5m by 1m (Volume = 3 m³ = 3,000 litres).'],
                  suggestedTLMs: ['Solid prism models', 'Dissectible cubes', 'Liquid capacity measuring cylinders'],
                  keyWords: ['Volume (cm³, m³)', 'Capacity (Litres)', 'Surface Area', 'Prism', 'Cross Section']
                }
              ]
            },
            {
              code: 'B8.3.2.1',
              description: 'Calculate surface area and volume of cylinders, cones, and spheres.',
              indicators: [
                {
                  code: 'B8.3.2.1.1',
                  description: 'Calculate total surface area (2πr² + 2πrh) and volume of a cylinder (V = πr²h).',
                  exemplars: ['Find volume of a cylindrical Milo tin with radius 7cm and height 15cm.'],
                  suggestedTLMs: ['Cylindrical containers', 'Volume formula reference charts'],
                  keyWords: ['Cylinder', 'Curved Surface Area', 'Base Area', 'Height', 'Volume']
                }
              ]
            }
          ]
        },
        {
          id: 'math_s3_ss3',
          name: 'Sub-strand 3: Geometric Construction, Transformations and Vectors',
          contentStandards: [
            {
              code: 'B7.3.3.1',
              description: 'Perform geometric constructions using pair of compasses and ruler, and explore rigid transformations.',
              indicators: [
                {
                  code: 'B7.3.3.1.1',
                  description: 'Construct line segment bisectors, perpendicular bisectors, and angle bisectors (60°, 90°, 45°, 30°).',
                  exemplars: ['Construct an accurate 90° angle using compasses and bisect it to obtain 45°.'],
                  suggestedTLMs: ['Chalkboard mathematical instruments (compass, ruler, protractor)', 'Drawing compasses'],
                  keyWords: ['Construction', 'Bisector', 'Perpendicular', 'Arc', 'Compass', 'Ruler']
                },
                {
                  code: 'B7.3.3.1.2',
                  description: 'Perform reflection of shapes in line mirrors (x-axis, y-axis) and translation using column vectors (x, y).',
                  exemplars: ['Reflect triangle with vertices A(2,3), B(4,1), C(5,4) in the line y = 0 (x-axis).'],
                  suggestedTLMs: ['Grid graph paper', 'Mirror / Mira tools', 'Transformation rules charts'],
                  keyWords: ['Transformation', 'Reflection', 'Line of Symmetry', 'Translation', 'Column Vector', 'Image']
                }
              ]
            },
            {
              code: 'B8.3.3.1',
              description: 'Construct triangles and quadrilaterals, perform rotation and enlargement transformations.',
              indicators: [
                {
                  code: 'B8.3.3.1.1',
                  description: 'Construct triangle ABC given side lengths (SSS, SAS, ASA) using compasses and straight edge.',
                  exemplars: ['Construct triangle ABC where AB = 8cm, BC = 6cm, and angle ABC = 60°.'],
                  suggestedTLMs: ['Mathematical geometry sets'],
                  keyWords: ['Triangle Construction', 'SSS', 'SAS', 'ASA', 'Locus']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'math_s4',
      name: 'Strand 4: Handling Data and Probability',
      subStrands: [
        {
          id: 'math_s4_ss1',
          name: 'Sub-strand 1: Data Collection, Organization, Presentation and Interpretation',
          contentStandards: [
            {
              code: 'B4.4.1.1',
              description: 'Collect, organize, and represent discrete data using tally charts, pictographs, and bar graphs.',
              indicators: [
                {
                  code: 'B4.4.1.1.1',
                  description: 'Construct tally charts and frequency tables from raw survey data (e.g. favorite fruits of classmates).',
                  exemplars: ['Tally student birthday months into a frequency distribution table.'],
                  suggestedTLMs: ['Tally chart templates', 'Classroom survey sheets'],
                  keyWords: ['Data', 'Tally Marks', 'Frequency', 'Survey', 'Table']
                },
                {
                  code: 'B4.4.1.1.2',
                  description: 'Draw and interpret bar graphs and pictographs with single-unit and multi-unit scales.',
                  exemplars: ['Draw a bar graph showing number of goals scored by 4 school football teams.'],
                  suggestedTLMs: ['Grid paper', 'Bar chart poster', 'Ruler and colored pencils'],
                  keyWords: ['Bar Graph', 'Pictograph', 'Key / Legend', 'Vertical Axis', 'Horizontal Axis']
                }
              ]
            },
            {
              code: 'B7.4.1.1',
              description: 'Demonstrate skills in drawing pie charts, histograms, and calculating measures of central tendency.',
              indicators: [
                {
                  code: 'B7.4.1.1.1',
                  description: 'Calculate angle of sectors (Sector Angle = (Frequency / Total) × 360°) and draw accurate pie charts.',
                  exemplars: ['Construct a pie chart representing transport methods used by 120 learners to attend school.'],
                  suggestedTLMs: ['Protractor', 'Compass', 'Pie chart calculation worksheets'],
                  keyWords: ['Pie Chart', 'Sector Angle', 'Percentage of Total', 'Degrees (360°)', 'Protractor']
                },
                {
                  code: 'B7.4.1.1.2',
                  description: 'Calculate mean (average), median (middle value), mode (most frequent), and range of ungrouped data.',
                  exemplars: ['Find mean, median, mode, and range for exam test scores: 12, 15, 12, 18, 20, 15, 12.'],
                  suggestedTLMs: ['Formula chart for Central Tendency', 'Data calculation task cards'],
                  keyWords: ['Mean', 'Median', 'Mode', 'Range', 'Average', 'Measures of Central Tendency']
                },
                {
                  code: 'B7.4.1.1.3',
                  description: 'Construct stem-and-leaf plots to organize and summarize continuous numerical distributions.',
                  exemplars: ['Organize heights of 20 students into a stem-and-leaf plot with key (e.g. 14 | 5 = 145 cm).'],
                  suggestedTLMs: ['Stem-and-leaf templates'],
                  keyWords: ['Stem-and-Leaf Plot', 'Stem', 'Leaf', 'Key', 'Distribution']
                }
              ]
            },
            {
              code: 'B8.4.1.1',
              description: 'Analyze grouped data frequency tables and estimate mean and median from histograms.',
              indicators: [
                {
                  code: 'B8.4.1.1.1',
                  description: 'Construct grouped frequency tables with class intervals (e.g. 10-19, 20-29) and calculate modal class.',
                  exemplars: ['Group 50 examination marks into class width of 10 and determine modal class interval.'],
                  suggestedTLMs: ['Grouped data worksheets', 'Statistical tables'],
                  keyWords: ['Class Interval', 'Class Midpoint', 'Modal Class', 'Grouped Data']
                }
              ]
            }
          ]
        },
        {
          id: 'math_s4_ss2',
          name: 'Sub-strand 2: Experimental and Theoretical Probability',
          contentStandards: [
            {
              code: 'B7.4.2.1',
              description: 'Demonstrate understanding of chance, experimental probability, and theoretical probability of simple events.',
              indicators: [
                {
                  code: 'B7.4.2.1.1',
                  description: 'Determine theoretical probability of single events using P(E) = Number of Favorable Outcomes / Total Sample Space.',
                  exemplars: ['Calculate probability of rolling an even number or a prime number on a fair 6-sided die.'],
                  suggestedTLMs: ['6-sided dice', 'Coins', 'Colored marbles in opaque bag', 'Probability scale (0 to 1)'],
                  keyWords: ['Probability', 'Sample Space', 'Favorable Outcome', 'Certain Event (1)', 'Impossible Event (0)', 'Chance']
                },
                {
                  code: 'B7.4.2.1.2',
                  description: 'Conduct repeated chance experiments (coin tossing, spinner spinning) and compare experimental vs theoretical probability.',
                  exemplars: ['Toss a coin 50 times, record Heads/Tails frequencies, and compare experimental ratio with 0.5 theoretical.'],
                  suggestedTLMs: ['Spinners', 'Coin tally recording sheet'],
                  keyWords: ['Experimental Probability', 'Relative Frequency', 'Trial', 'Law of Large Numbers']
                }
              ]
            },
            {
              code: 'B8.4.2.1',
              description: 'Calculate probability of combined events using tree diagrams and sample space grids.',
              indicators: [
                {
                  code: 'B8.4.2.1.1',
                  description: 'Construct sample space grids and tree diagrams for tossing two coins or rolling two dice.',
                  exemplars: ['Find probability of getting at least one Head when two coins are flipped simultaneously (3/4).'],
                  suggestedTLMs: ['Tree diagram templates', 'Two-event grid sheets'],
                  keyWords: ['Combined Events', 'Tree Diagram', 'Sample Space Grid', 'Independent Events']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
