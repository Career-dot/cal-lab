// Content data (Source B): calculator.net taxonomy — names/categories/counts only.
// Visual presentation (icons, badges, copy) is CalcLab's own, written in-house.

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[().]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Curated card content for the calculators shown in each category's default 2x2 grid.
// tag/time/description are original CalcLab copy, not scraped from calculator.net.
const CURATED = {
  'Mortgage Calculator': { icon: 'house', tag: 'Home Loans', time: '5 min', badge: 'Popular', description: 'Estimate your monthly mortgage payment, interest and total cost.' },
  'Loan Calculator': { icon: 'banknote', tag: 'Personal Loans', time: '3 min', description: 'Calculate monthly payments, interest and total repayment amount.' },
  'Auto Loan Calculator': { icon: 'car', tag: 'Auto Loans', time: '4 min', badge: 'New', description: 'Find your monthly car loan payment with interest and total cost.' },
  'Amortization Calculator': { icon: 'fileText', tag: 'Loan Details', time: '3 min', description: 'View your loan repayment schedule with detailed breakdown.' },

  'Interest Calculator': { icon: 'percent', tag: 'Interest', time: '3 min', description: 'Calculate how interest accumulates on savings or loans over time.' },
  'Investment Calculator': { icon: 'trendingUp', tag: 'Investing', time: '4 min', badge: 'Popular', description: 'Project how your investments could grow with regular contributions.' },
  'Compound Interest Calculator': { icon: 'piggyBank', tag: 'Savings', time: '3 min', description: 'See how compounding turns steady savings into long-term growth.' },
  'Savings Calculator': { icon: 'piggyBank', tag: 'Savings Goals', time: '3 min', description: 'Plan how much to save monthly to hit a future savings goal.' },

  'Retirement Calculator': { icon: 'landmark', tag: 'Retirement Planning', time: '5 min', badge: 'Popular', description: 'Estimate how much you need to save for a comfortable retirement.' },
  '401K Calculator': { icon: 'landmark', tag: 'Employer Plans', time: '4 min', description: 'Project your 401(k) balance based on contributions and employer match.' },
  'Social Security Calculator': { icon: 'shield', tag: 'Benefits', time: '4 min', description: 'Estimate your future Social Security benefit based on your earnings.' },
  'Roth IRA Calculator': { icon: 'piggyBank', tag: 'IRA', time: '3 min', badge: 'New', description: 'See how a Roth IRA could grow tax-free until retirement.' },

  'Income Tax Calculator': { icon: 'fileText', tag: 'Income Tax', time: '4 min', badge: 'Popular', description: 'Estimate your federal income tax based on income and filing status.' },
  'Salary Calculator': { icon: 'banknote', tag: 'Salary', time: '2 min', description: 'Convert between hourly, monthly and annual salary figures.' },
  'Take-Home-Paycheck Calculator': { icon: 'banknote', tag: 'Paycheck', time: '3 min', description: 'Calculate your net pay after taxes and deductions.' },
  'Sales Tax Calculator': { icon: 'percent', tag: 'Sales Tax', time: '1 min', description: 'Work out sales tax on a purchase in seconds.' },

  'Budget Calculator': { icon: 'briefcase', tag: 'Budgeting', time: '4 min', badge: 'Popular', description: 'Build a monthly budget and see where your money goes.' },
  'Debt Payoff Calculator': { icon: 'creditCard', tag: 'Debt', time: '4 min', description: 'Find the fastest way to pay off multiple debts.' },
  'Student Loan Calculator': { icon: 'fileText', tag: 'Student Loans', time: '3 min', description: 'Estimate your student loan payments and total interest.' },
  'Credit Card Calculator': { icon: 'creditCard', tag: 'Credit Cards', time: '3 min', badge: 'New', description: "See how long it'll take to pay off a credit card balance." },

  'Currency Calculator': { icon: 'refresh', tag: 'Currency', time: '1 min', description: 'Convert between world currencies using up-to-date exchange rates.' },
  'Inflation Calculator': { icon: 'trendingUp', tag: 'Inflation', time: '2 min', badge: 'Popular', description: 'See how inflation affects the value of money over time.' },
  'Payment Calculator': { icon: 'banknote', tag: 'Payments', time: '3 min', description: 'Calculate fixed loan payments over a custom term and rate.' },
  'Depreciation Calculator': { icon: 'scales', tag: 'Assets', time: '3 min', description: "Estimate how an asset's value declines over its useful life." },

  'BMI Calculator': { icon: 'heartPulse', tag: 'Body Metrics', time: '2 min', badge: 'Popular', description: 'Check your Body Mass Index and see what it means for your health.' },
  'Calorie Calculator': { icon: 'flame', tag: 'Nutrition', time: '3 min', description: 'Estimate your daily calorie needs based on activity level and goals.' },
  'Body Fat Calculator': { icon: 'ruler', tag: 'Body Metrics', time: '3 min', description: 'Estimate your body fat percentage from a few simple measurements.' },
  'BMR Calculator': { icon: 'flame', tag: 'Metabolism', time: '2 min', badge: 'New', description: 'Find your Basal Metabolic Rate — the calories you burn at rest.' },

  'Scientific Calculator': { icon: 'calculator', tag: 'General Math', time: '1 min', badge: 'Popular', description: 'A full scientific calculator for everyday and advanced math.' },
  'Fraction Calculator': { icon: 'percent', tag: 'Fractions', time: '2 min', description: 'Add, subtract, multiply and divide fractions step by step.' },
  'Percentage Calculator': { icon: 'percent', tag: 'Percentages', time: '1 min', description: 'Work out percentages, increases and decreases in seconds.' },
  'Random Number Generator': { icon: 'dice', tag: 'Utilities', time: '1 min', badge: 'New', description: 'Generate random numbers within any range you choose.' },

  'Age Calculator': { icon: 'calendar', tag: 'Dates', time: '1 min', badge: 'Popular', description: 'Find your exact age in years, months and days.' },
  'Date Calculator': { icon: 'calendar', tag: 'Dates', time: '1 min', description: 'Add or subtract days from any date, or find the days between two dates.' },
  'Time Calculator': { icon: 'clock', tag: 'Time', time: '1 min', description: 'Add and subtract hours, minutes and seconds.' },
  'Hours Calculator': { icon: 'clock', tag: 'Time', time: '2 min', badge: 'New', description: 'Calculate the total hours worked between a start and end time.' },

  'Ideal Weight Calculator': { icon: 'ruler', tag: 'Body Metrics', time: '2 min', badge: 'New', description: 'Find a healthy target weight range based on your height.' },
  'Pace Calculator': { icon: 'flame', tag: 'Activity', time: '2 min', description: 'Calculate running pace, speed or finish time for any distance.' },
  'Pregnancy Calculator': { icon: 'heart', tag: 'Pregnancy', time: '2 min', description: 'Estimate your due date and track your pregnancy week by week.' },
  'Pregnancy Conception Calculator': { icon: 'heart', tag: 'Pregnancy', time: '2 min', description: 'Estimate the likely conception date from your due date or period.' },
  'Due Date Calculator': { icon: 'heart', tag: 'Pregnancy', time: '1 min', badge: 'Popular', description: "Estimate your baby's due date from your last period or conception date." },

  'Triangle Calculator': { icon: 'triangle', tag: 'Geometry', time: '2 min', badge: 'Popular', description: "Solve a triangle's sides, angles and area from the values you know." },
  'Standard Deviation Calculator': { icon: 'layers', tag: 'Statistics', time: '2 min', description: 'Calculate the mean, variance and standard deviation of a data set.' },

  'GPA Calculator': { icon: 'graduationCap', tag: 'Education', time: '2 min', badge: 'Popular', description: 'Calculate your grade point average from your course grades and credits.' },
  'Grade Calculator': { icon: 'graduationCap', tag: 'Education', time: '2 min', description: 'Find the grade you need on remaining work to hit a target average.' },
  'Concrete Calculator': { icon: 'wrench', tag: 'Construction', time: '2 min', description: 'Estimate how much concrete you need for a slab, footing or column.' },
  'Subnet Calculator': { icon: 'network', tag: 'Networking', time: '2 min', description: 'Calculate subnet mask, network range and usable IP addresses.' },
  'Password Generator': { icon: 'key', tag: 'Security', time: '1 min', badge: 'Popular', description: 'Generate a strong, random password to the length you choose.' },
  'Conversion Calculator': { icon: 'refresh', tag: 'Conversions', time: '1 min', badge: 'New', description: 'Convert between units of length, weight, volume and more.' },

  // Added to round out Fitness/Math/Other subcategories to 5+ items each (real
  // calculator.net calculators, not invented ones) so every subcategory panel
  // has enough to show a genuine "View All".
  'Lean Body Mass Calculator': { icon: 'ruler', tag: 'Body Metrics', time: '2 min', description: "Estimate the weight of everything in your body that isn't fat." },
  'Army Body Fat Calculator': { icon: 'ruler', tag: 'Body Metrics', time: '3 min', description: "Estimate body fat using the U.S. Army's circumference method." },
  'Macro Calculator': { icon: 'flame', tag: 'Nutrition', time: '3 min', description: 'Work out your daily protein, carb and fat targets for your goals.' },
  'Water Intake Calculator': { icon: 'droplet', tag: 'Hydration', time: '2 min', description: 'Estimate how much water you should drink each day based on your weight.' },
  'Ovulation Calculator': { icon: 'heart', tag: 'Pregnancy', time: '2 min', description: 'Estimate your most fertile days based on your cycle.' },
  'Period Calculator': { icon: 'heart', tag: 'Pregnancy', time: '2 min', description: 'Predict your next period based on your average cycle length.' },

  'Exponent Calculator': { icon: 'calculator', tag: 'General Math', time: '1 min', description: 'Raise any number to a power, including negative and fractional exponents.' },
  'Root Calculator': { icon: 'calculator', tag: 'General Math', time: '1 min', description: 'Find the square root, cube root or nth root of any number.' },
  'Right Triangle Calculator': { icon: 'triangle', tag: 'Geometry', time: '2 min', badge: 'New', description: "Solve a right triangle's sides and angles from any two known values." },
  'Pythagorean Theorem Calculator': { icon: 'triangle', tag: 'Geometry', time: '1 min', description: 'Find a right triangle’s missing side using a² + b² = c².' },
  'Circle Calculator': { icon: 'circle', tag: 'Geometry', time: '1 min', description: "Calculate a circle's area, circumference, radius or diameter." },
  'Area Calculator': { icon: 'square', tag: 'Geometry', time: '2 min', description: 'Find the area of common 2D shapes like squares, circles and triangles.' },
  'Probability Calculator': { icon: 'dice', tag: 'Statistics', time: '2 min', badge: 'Popular', description: 'Calculate the probability of single and combined events.' },
  'LCM Calculator': { icon: 'calculator', tag: 'Number Theory', time: '1 min', description: 'Find the least common multiple of two or more numbers.' },
  'GCF Calculator': { icon: 'calculator', tag: 'Number Theory', time: '1 min', description: 'Find the greatest common factor of two or more numbers.' },

  'Time Zone Calculator': { icon: 'clock', tag: 'Time', time: '1 min', description: 'Convert a time from one time zone to another.' },
  'Height Calculator': { icon: 'ruler', tag: 'Measurements', time: '1 min', badge: 'New', description: "Convert height between feet/inches and centimeters, or predict a child's adult height." },
  'Stair Calculator': { icon: 'wrench', tag: 'Construction', time: '3 min', description: 'Work out rise, run and step count for a staircase.' },
  'Tip Calculator': { icon: 'banknote', tag: 'Everyday Math', time: '1 min', description: 'Work out the tip and total for a restaurant bill, split any way you like.' },
  'Roman Numeral Converter': { icon: 'refresh', tag: 'Conversions', time: '1 min', description: 'Convert between Roman numerals and regular numbers.' },
  'Binary Calculator': { icon: 'network', tag: 'Tech', time: '1 min', description: 'Convert between binary, decimal and other number systems, or do binary math.' },
  'Hex Calculator': { icon: 'network', tag: 'Tech', time: '1 min', description: 'Convert between hexadecimal, decimal and binary, or do hex math.' },
};

const CATEGORY_DEFS = [
  {
    id: 'loans-mortgage',
    label: 'Loans & Mortgage',
    icon: 'house',
    description: 'Calculate payments, interest and repayment schedules.',
    calculators: ['Mortgage Calculator', 'Loan Calculator', 'Auto Loan Calculator', 'Amortization Calculator', 'Mortgage Payoff Calculator', 'Refinance Calculator', 'House Affordability Calculator', 'Debt-to-Income Ratio Calculator', 'Rent vs. Buy Calculator', 'Home Equity Loan Calculator', 'HELOC Calculator', 'Down Payment Calculator', 'APR Calculator', 'FHA Loan Calculator', 'VA Mortgage Calculator', 'Rental Property Calculator', 'Real Estate Calculator', 'Rent Calculator', 'Cash Back or Low Interest Calculator', 'Auto Lease Calculator'],
  },
  {
    id: 'investing-savings',
    label: 'Investing & Savings',
    icon: 'trendingUp',
    description: 'Grow your money with investing and savings tools.',
    calculators: ['Interest Calculator', 'Investment Calculator', 'Finance Calculator', 'Compound Interest Calculator', 'Interest Rate Calculator', 'Savings Calculator', 'Simple Interest Calculator', 'CD Calculator', 'Bond Calculator', 'Mutual Fund Calculator', 'Average Return Calculator', 'IRR Calculator', 'ROI Calculator', 'Payback Period Calculator', 'Present Value Calculator', 'Future Value Calculator'],
  },
  {
    id: 'taxes-accounting',
    label: 'Taxes & Accounting',
    icon: 'fileText',
    description: 'Estimate taxes, paychecks and take-home pay.',
    calculators: ['Income Tax Calculator', 'Salary Calculator', 'Marriage Tax Calculator', 'Estate Tax Calculator', 'Take-Home-Paycheck Calculator', 'Sales Tax Calculator', 'VAT Calculator'],
  },
  {
    id: 'retirement-pension',
    label: 'Retirement & Pension',
    icon: 'user',
    description: 'Plan ahead for retirement, pensions and benefits.',
    calculators: ['Retirement Calculator', '401K Calculator', 'Pension Calculator', 'Social Security Calculator', 'Annuity Calculator', 'Annuity Payout Calculator', 'Roth IRA Calculator', 'IRA Calculator', 'RMD Calculator'],
  },
  {
    id: 'budgeting-planning',
    label: 'Budgeting & Planning',
    icon: 'briefcase',
    description: 'Budget, plan and manage debt with confidence.',
    calculators: ['Budget Calculator', 'Debt Payoff Calculator', 'Debt Consolidation Calculator', 'Credit Card Calculator', 'Credit Cards Payoff Calculator', 'Repayment Calculator', 'Student Loan Calculator', 'College Cost Calculator', 'Business Loan Calculator', 'Personal Loan Calculator', 'Boat Loan Calculator', 'Lease Calculator', 'Commission Calculator'],
  },
  {
    id: 'financial-tools',
    label: 'Financial Tools',
    icon: 'wrench',
    description: 'Handy everyday financial calculation tools.',
    calculators: ['Currency Calculator', 'Inflation Calculator', 'Payment Calculator', 'Depreciation Calculator', 'Margin Calculator', 'Discount Calculator'],
  },
];

const GENERIC_TIMES = ['2 min', '3 min', '4 min'];

function buildCalculator(name, categoryLabel, index) {
  const curated = CURATED[name];
  const slug = slugify(name);
  if (curated) {
    return { name, slug, ...curated };
  }
  const shortName = name.replace(/\s*Calculator$/i, '');
  return {
    name,
    slug,
    icon: 'calculator',
    tag: categoryLabel,
    time: GENERIC_TIMES[index % GENERIC_TIMES.length],
    description: `Use our free tool to calculate ${shortName.toLowerCase()} quickly and accurately.`,
  };
}

const CATEGORIES = CATEGORY_DEFS.map((cat) => ({
  ...cat,
  calculators: cat.calculators.map((name, i) => buildCalculator(name, cat.label, i)),
}));

// Subcategory breakdowns for Fitness/Math/Other — same idea as Financial's 6
// subcategories, sized so every subcategory has 5+ calculators (enough that a
// 4-card preview always has a genuine "View All" beyond it). Every name below
// is a real calculator.net calculator, not an invented one.
const FITNESS_SUBCATEGORY_DEFS = [
  { id: 'body-metrics', label: 'Body Metrics', icon: 'ruler', description: 'Check key body measurements and indexes.', calculators: ['BMI Calculator', 'Body Fat Calculator', 'Ideal Weight Calculator', 'Lean Body Mass Calculator', 'Army Body Fat Calculator'] },
  { id: 'nutrition-activity', label: 'Nutrition & Activity', icon: 'flame', description: 'Calorie needs, metabolism and activity pace.', calculators: ['Calorie Calculator', 'BMR Calculator', 'Pace Calculator', 'Macro Calculator', 'Water Intake Calculator'] },
  { id: 'pregnancy-family', label: 'Pregnancy & Family', icon: 'heart', description: 'Plan around pregnancy and important family dates.', calculators: ['Pregnancy Calculator', 'Pregnancy Conception Calculator', 'Due Date Calculator', 'Ovulation Calculator', 'Period Calculator'] },
];
const FITNESS_SUBCATEGORIES = FITNESS_SUBCATEGORY_DEFS.map((cat) => ({
  ...cat,
  calculators: cat.calculators.map((name, i) => buildCalculator(name, cat.label, i)),
}));

const MATH_SUBCATEGORY_DEFS = [
  { id: 'general-math', label: 'General Math', icon: 'calculator', description: 'Everyday and scientific calculations.', calculators: ['Scientific Calculator', 'Fraction Calculator', 'Percentage Calculator', 'Exponent Calculator', 'Root Calculator'] },
  { id: 'geometry', label: 'Geometry', icon: 'triangle', description: 'Triangles, circles and other shapes.', calculators: ['Triangle Calculator', 'Right Triangle Calculator', 'Pythagorean Theorem Calculator', 'Circle Calculator', 'Area Calculator'] },
  { id: 'statistics-numbers', label: 'Statistics & Numbers', icon: 'dice', description: 'Randomness, probability and number theory.', calculators: ['Standard Deviation Calculator', 'Random Number Generator', 'Probability Calculator', 'LCM Calculator', 'GCF Calculator'] },
];
const MATH_SUBCATEGORIES = MATH_SUBCATEGORY_DEFS.map((cat) => ({
  ...cat,
  calculators: cat.calculators.map((name, i) => buildCalculator(name, cat.label, i)),
}));

const OTHER_SUBCATEGORY_DEFS = [
  { id: 'dates-time', label: 'Dates & Time', icon: 'calendar', description: 'Work out ages, dates, durations and hours.', calculators: ['Age Calculator', 'Date Calculator', 'Time Calculator', 'Hours Calculator', 'Time Zone Calculator'] },
  { id: 'everyday-tools', label: 'Everyday Tools', icon: 'graduationCap', description: 'Grades, tipping and other everyday math.', calculators: ['GPA Calculator', 'Grade Calculator', 'Concrete Calculator', 'Height Calculator', 'Stair Calculator', 'Tip Calculator'] },
  { id: 'utilities-tech', label: 'Utilities & Tech', icon: 'network', description: 'Conversions, networking and security tools.', calculators: ['Subnet Calculator', 'Password Generator', 'Conversion Calculator', 'Roman Numeral Converter', 'Binary Calculator', 'Hex Calculator'] },
];
const OTHER_SUBCATEGORIES = OTHER_SUBCATEGORY_DEFS.map((cat) => ({
  ...cat,
  calculators: cat.calculators.map((name, i) => buildCalculator(name, cat.label, i)),
}));

// The flat, single-list view of each category (used by the All Calculators page,
// search index, and total counts) — derived from the subcategories above so the
// two views can never drift out of sync.
const FLAT_CATEGORY_DEFS = [
  { id: 'fitness', label: 'Fitness & Health Calculators', icon: 'heartPulse', description: 'Track your health, fitness and wellness goals.', calculators: FITNESS_SUBCATEGORY_DEFS.flatMap((g) => g.calculators) },
  { id: 'math', label: 'Math Calculators', icon: 'calculator', description: 'Quick tools for everyday and advanced math.', calculators: MATH_SUBCATEGORY_DEFS.flatMap((g) => g.calculators) },
  { id: 'other', label: 'Other Calculators', icon: 'layers', description: 'Handy everyday calculators for dates, grades and more.', calculators: OTHER_SUBCATEGORY_DEFS.flatMap((g) => g.calculators) },
];

const FLAT_CATEGORIES = FLAT_CATEGORY_DEFS.map((cat) => ({
  ...cat,
  calculators: cat.calculators.map((name, i) => buildCalculator(name, cat.label, i)),
}));

const [FITNESS_CATEGORY, MATH_CATEGORY, OTHER_CATEGORY] = FLAT_CATEGORIES;

// Every top-level nav destination. Financial is "grouped" (has a subcategory sidebar);
// the rest are "flat" (one category, one card grid).
const TOP_LEVEL_SECTIONS = [
  { id: 'financial', navLabel: 'Financial', label: 'Financial Calculators', type: 'grouped', icon: 'house', description: 'Plan loans, investments, taxes and retirement with confidence.', groups: CATEGORIES },
  { id: 'fitness', navLabel: 'Fitness & Health', type: 'flat', ...FITNESS_CATEGORY },
  { id: 'math', navLabel: 'Math', type: 'flat', ...MATH_CATEGORY },
  { id: 'other', navLabel: 'Other', type: 'flat', ...OTHER_CATEGORY },
];

const ALL_CALCULATORS_BY_SECTION = [
  { label: 'Financial Calculators', icon: 'house', calculators: CATEGORIES.flatMap((c) => c.calculators) },
  { label: 'Fitness & Health Calculators', icon: 'heartPulse', calculators: FITNESS_CATEGORY.calculators },
  { label: 'Math Calculators', icon: 'calculator', calculators: MATH_CATEGORY.calculators },
  { label: 'Other Calculators', icon: 'layers', calculators: OTHER_CATEGORY.calculators },
];

function findCalculatorMeta(slug) {
  for (const section of ALL_CALCULATORS_BY_SECTION) {
    const found = section.calculators.find((c) => c.slug === slug);
    if (found) return { ...found, categoryLabel: section.label.replace(/\s*Calculators$/, '') };
  }
  return null;
}

// Reverse lookup: given a calculator slug, find the specific category or
// subcategory group it belongs to (e.g. "Loans & Mortgage"), plus which
// top-level page that group's "View All" should point to. Used by
// calculator.html to build a same-category "Related Calculators" panel.
const CALCULATOR_GROUPS_WITH_HREF = [
  ...CATEGORIES.map((g) => ({ ...g, href: 'financial.html' })),
  ...FITNESS_SUBCATEGORIES.map((g) => ({ ...g, href: 'fitness.html' })),
  ...MATH_SUBCATEGORIES.map((g) => ({ ...g, href: 'math.html' })),
  ...OTHER_SUBCATEGORIES.map((g) => ({ ...g, href: 'other.html' })),
];

function findCalculatorGroup(slug) {
  return CALCULATOR_GROUPS_WITH_HREF.find((g) => g.calculators.some((c) => c.slug === slug)) || null;
}
