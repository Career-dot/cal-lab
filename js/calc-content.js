// Blog-style "About this calculator" content shown on calculator.html, under
// the calculator itself. Hand-written for the calculators that have a real
// math engine in js/calc-definitions.js; everything else falls back to
// genericCalcContent() below, built from the calculator's existing data.js
// description so every calculator page still has something useful to read.

const CALC_CONTENT = {

  'mortgage-calculator': {
    about: 'A mortgage calculator estimates your monthly home loan payment based on the home price, down payment, interest rate and loan term. It gives you a quick way to see how those numbers interact before you talk to a lender.',
    how: 'The calculator subtracts your down payment from the home price to get the loan amount, then applies the standard amortization formula to spread that amount — plus interest — evenly across every monthly payment for the loan term you choose. It also totals the interest you\'ll pay over the life of the loan.',
    faq: [
      { q: 'Does this include property tax or insurance?', a: 'No — this estimate covers principal and interest only. Property tax, homeowners insurance and any HOA fees would be added on top in a real monthly payment.' },
      { q: 'What loan terms can I compare?', a: 'You can switch between 15, 20 and 30-year terms to see how a shorter term raises the monthly payment but lowers total interest paid.' },
    ],
  },

  'loan-calculator': {
    about: 'A loan calculator works out the fixed monthly payment on a personal, auto or other installment loan once you know the amount borrowed, the interest rate and how long you\'ll take to repay it.',
    how: 'It uses the same amortization math banks use: the loan amount and interest rate are combined with the number of monthly payments to produce a payment that stays level for the whole term, gradually shifting from mostly interest to mostly principal.',
    faq: [
      { q: 'Can I use this for any type of loan?', a: 'Yes — the math works for any fixed-rate installment loan, whether it\'s personal, auto, or another type, as long as payments are made monthly.' },
      { q: 'Why does the total repayment exceed the loan amount?', a: 'The difference is interest. The longer the term or the higher the rate, the more interest accumulates on top of what you originally borrowed.' },
    ],
  },

  'auto-loan-calculator': {
    about: 'An auto loan calculator estimates your monthly car payment based on the loan amount, interest rate and repayment term, so you know roughly what to expect before you finance a vehicle.',
    how: 'Enter the amount you\'re financing, the APR your lender offers, and the loan length in months. The calculator applies the standard loan payment formula to compute a fixed monthly payment along with total interest paid over the loan.',
    faq: [
      { q: 'Should I include the down payment in the loan amount?', a: 'No — enter only the amount you\'re actually financing, after subtracting your down payment and any trade-in value from the vehicle price.' },
      { q: 'Does a longer loan term always cost less?', a: 'A longer term lowers the monthly payment, but it typically increases the total interest you pay over the life of the loan.' },
    ],
  },

  'amortization-calculator': {
    about: 'An amortization calculator breaks a loan down payment-by-payment, showing exactly how much of each one goes toward interest versus principal, and how your remaining balance shrinks over time.',
    how: 'Starting from your loan amount, rate and term, the calculator computes the fixed monthly payment, then walks through every period: it charges interest on the current balance, applies the rest of the payment to principal, and carries the new balance forward until the loan is paid off.',
    faq: [
      { q: 'Why is more interest paid early in the loan?', a: 'Interest is calculated on the remaining balance, which is largest at the start. As the balance shrinks, more of each payment goes toward principal instead.' },
      { q: 'Can I use this to see the impact of extra payments?', a: 'This version shows the standard schedule at your entered payment. Making extra payments would reduce the balance faster than shown here and shorten the loan.' },
    ],
  },

  'bmi-calculator': {
    about: 'A BMI (Body Mass Index) calculator uses your height and weight to produce a single number that\'s commonly used as a quick screening tool for weight categories like underweight, normal, overweight and obese.',
    how: 'BMI is calculated as weight (kg) divided by height (m) squared. The calculator converts whichever units you enter into metric, runs that formula, and matches the result against standard BMI category ranges.',
    faq: [
      { q: 'Is BMI accurate for everyone?', a: 'BMI is a useful general screening tool, but it doesn\'t distinguish muscle from fat, so it can be less accurate for athletes, older adults, or people with a lot of muscle mass.' },
      { q: 'What BMI is considered "normal"?', a: 'A BMI between 18.5 and 24.9 is generally classified as a normal weight range, though healthy ranges can vary by individual and population.' },
    ],
  },

  'calorie-calculator': {
    about: 'A calorie calculator estimates how many calories you burn in a day, and how many you\'d need to eat to maintain, lose, or gain weight based on your body stats and activity level.',
    how: 'It first estimates your Basal Metabolic Rate (the calories you\'d burn at complete rest) from your age, sex, height and weight, then multiplies that by an activity factor to estimate your total daily calorie burn (TDEE), which is then adjusted for your weight goal.',
    faq: [
      { q: 'Why does activity level matter so much?', a: 'Activity level scales your baseline metabolic rate up to reflect how much you move — someone very active can burn substantially more calories per day than someone sedentary at the same body stats.' },
      { q: 'Is this the exact number of calories I should eat?', a: 'It\'s a solid starting estimate. Actual needs vary by individual, so many people adjust up or down after tracking real-world results for a few weeks.' },
    ],
  },

  'body-fat-calculator': {
    about: 'A body fat calculator estimates the percentage of your body made up of fat, using a handful of circumference measurements rather than specialized equipment like calipers or a DEXA scan.',
    how: 'This calculator uses the U.S. Navy method, which combines your height with neck and waist measurements (plus hip measurement for women) in a logarithmic formula to estimate body fat percentage.',
    faq: [
      { q: 'How accurate is the Navy method?', a: 'It\'s a well-studied estimation method that\'s generally accurate within a few percentage points for most people, though it can be less precise for those with atypical body compositions.' },
      { q: 'Where exactly should I measure?', a: 'Measure your neck just below the larynx, and your waist at the narrowest point (or at the navel, depending on the convention you\'re using) for the most consistent results.' },
    ],
  },

  'bmr-calculator': {
    about: 'A BMR (Basal Metabolic Rate) calculator estimates how many calories your body burns each day just to keep you alive — breathing, circulating blood, and maintaining body temperature — before any activity is counted.',
    how: 'The calculator uses the Mifflin-St Jeor equation, one of the most widely validated BMR formulas, which combines your weight, height, age and sex to produce a daily calorie estimate.',
    faq: [
      { q: 'How is BMR different from calorie needs?', a: 'BMR is your baseline burn at complete rest. Total daily calorie needs (TDEE) take BMR and multiply it by an activity factor to account for movement and exercise.' },
      { q: 'Why does BMR decrease with age?', a: 'Muscle mass and metabolic activity naturally tend to decline with age, which lowers the resting energy your body needs — this is reflected directly in the formula.' },
    ],
  },

  'fraction-calculator': {
    about: 'A fraction calculator adds, subtracts, multiplies or divides two fractions and returns the answer in simplest form, saving you the manual work of finding common denominators.',
    how: 'Enter each fraction as a numerator and denominator, choose an operation, and the calculator performs the arithmetic (using a common denominator for addition and subtraction) before reducing the result using the greatest common divisor.',
    faq: [
      { q: 'Does it simplify the answer automatically?', a: 'Yes — every result is automatically reduced to its simplest form using the greatest common divisor of the numerator and denominator.' },
      { q: 'Can I enter negative fractions?', a: 'Yes, negative numerators or denominators are supported and handled correctly in the calculation.' },
    ],
  },

  'percentage-calculator': {
    about: 'A percentage calculator handles the everyday percentage questions people run into — what percent one number is of another, what a percentage of a number equals, and percentage increase or decrease.',
    how: 'Depending on the values you enter, the calculator applies the relevant percentage formula: dividing one value by another and multiplying by 100 to find a percentage, or multiplying a value by a percentage to find a portion of it.',
    faq: [
      { q: 'How is percentage change calculated?', a: 'Percentage change is the difference between the new and original value, divided by the original value, then multiplied by 100 — a negative result means a decrease.' },
      { q: 'Can I calculate what percent one number is of another?', a: 'Yes, that\'s one of the built-in modes — enter both numbers and the calculator returns what percentage one represents of the other.' },
    ],
  },

  'random-number-generator': {
    about: 'A random number generator produces a random whole number within any minimum and maximum range you set — handy for picking a winner, assigning numbers, or generating quick test data.',
    how: 'The calculator uses your browser\'s built-in random number source to pick a value uniformly between your chosen minimum and maximum, inclusive, each time you generate.',
    faq: [
      { q: 'Can the same number come up twice in a row?', a: 'Yes — each generation is independent, so repeats are possible, the same way rolling a die twice can land on the same number.' },
      { q: 'Is this suitable for security-sensitive uses?', a: 'This generator is intended for everyday, non-critical randomness like games or sampling. For anything security-sensitive (like generating passwords or keys), use a dedicated cryptographic tool.' },
    ],
  },

  'age-calculator': {
    about: 'An age calculator works out exactly how old someone is — in years, months and days — from their date of birth, and can also total that age in days or weeks.',
    how: 'The calculator takes the difference between your birth date and today\'s date (or another date you choose), carefully borrowing across months and years so the years/months/days breakdown is always exact, not just an approximation.',
    faq: [
      { q: 'Does it account for leap years?', a: 'Yes — because the calculation works directly with real calendar dates, leap years are automatically handled correctly.' },
      { q: 'Can I calculate age as of a future or past date instead of today?', a: 'This calculator compares your birth date to today by default. Use the Date Calculator if you need the difference between two custom dates.' },
    ],
  },

  'date-calculator': {
    about: 'A date calculator finds the number of days, weeks, months and years between two dates, or adds/subtracts a number of days from a starting date.',
    how: 'It converts your input dates into a precise calendar difference, carrying over months and years correctly (accounting for different month lengths and leap years) rather than using a rough 30-day average.',
    faq: [
      { q: 'Is the day count inclusive or exclusive?', a: 'The total days figure reflects the exact span between the two calendar dates entered.' },
      { q: 'Can I calculate a date far in the past or future?', a: 'Yes, any valid calendar dates can be used, and the math stays accurate regardless of how far apart they are.' },
    ],
  },

  'time-calculator': {
    about: 'A time calculator adds or subtracts hours, minutes and seconds, which is useful for anything from scheduling to tallying up durations that don\'t divide neatly.',
    how: 'The calculator converts each time value into total seconds, performs the addition or subtraction, then converts the result back into hours, minutes and seconds for a clean, readable answer.',
    faq: [
      { q: 'Can I subtract a larger time from a smaller one?', a: 'The calculator handles borrowing across units automatically, so subtracting a larger duration produces a correct result rather than a negative or invalid one.' },
      { q: 'What\'s the difference between this and the Hours Calculator?', a: 'This tool adds and subtracts arbitrary time durations, while the Hours Calculator specifically finds the hours worked between a start and end clock time.' },
    ],
  },

  'hours-calculator': {
    about: 'An hours calculator figures out the total time worked between a start time and an end time — useful for timesheets, shift work, or estimating billable hours.',
    how: 'It converts your start and end times into minutes since midnight, finds the difference (rolling over to the next day if the end time is earlier than the start), and converts that back into a readable hours-and-minutes total.',
    faq: [
      { q: 'Does it handle overnight shifts?', a: 'Yes — if your end time is earlier in the clock than your start time, the calculator assumes the shift crosses midnight and adjusts the total accordingly.' },
      { q: 'Can I subtract a lunch break from the total?', a: 'This version calculates raw elapsed time between the two clock times; you can subtract any unpaid break time manually from the result.' },
    ],
  },

  'scientific-calculator': {
    about: 'A scientific calculator handles everyday arithmetic alongside more advanced functions — trigonometry, logarithms, exponents and roots — in one keypad, replacing the need for a physical calculator for most math tasks.',
    how: 'Each key press builds up an expression exactly like a physical calculator would, and pressing equals evaluates it using standard operator precedence, including support for scientific functions like sin, cos, log and square root.',
    faq: [
      { q: 'Does it follow standard order of operations?', a: 'Yes — multiplication and division are evaluated before addition and subtraction, and parentheses can be used to control the order explicitly.' },
      { q: 'Are angles in degrees or radians?', a: 'Trigonometric functions use degrees by default, which matches how most people expect a general-purpose scientific calculator to behave.' },
    ],
  },
};

// Fallback content for calculators that don't yet have a hand-written entry
// above — built entirely from data already in js/data.js (name, description,
// tag), so it stays accurate rather than inventing specifics.
function genericCalcContent(meta) {
  const name = meta.name;
  const tag = meta.tag || meta.categoryLabel || 'everyday';
  const tagLower = tag === tag.toUpperCase() ? tag : tag.toLowerCase();
  return {
    about: `${meta.description || `The ${name} helps with quick, everyday calculations.`} It's one of CalcLab's ${tag} tools, built to give you a fast answer without doing the math by hand.`,
    how: `Enter your values into the fields provided and the calculator applies the standard formula for this type of calculation to produce an instant result — right in your browser, with nothing sent or stored anywhere.`,
    faq: [
      { q: `Is the ${name} free to use?`, a: 'Yes — every calculator on CalcLab is completely free, with no registration required.' },
      { q: 'How accurate is this calculator?', a: `It's built on standard, widely used formulas for ${tagLower}. For decisions with significant financial or health consequences, it's still worth confirming with a professional.` },
    ],
  };
}

function getCalcContent(slug, meta) {
  return CALC_CONTENT[slug] || genericCalcContent(meta);
}
