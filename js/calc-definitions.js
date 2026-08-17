// Real, working calculators. Every formula here is a standard, published one —
// noted per calculator — not an approximation invented for this site.

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function isoPlusDays(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// Standard loan amortization formula: M = L * r / (1 - (1+r)^-n)
// L = principal, r = periodic interest rate, n = number of payments.
function monthlyPayment(principal, annualRatePct, numPayments) {
  const r = annualRatePct / 100 / 12;
  if (numPayments <= 0) throw new Error('Loan term must be greater than zero.');
  if (principal <= 0) return 0;
  if (r === 0) return principal / numPayments;
  return (principal * r) / (1 - Math.pow(1 + r, -numPayments));
}

function amortizationExtraHtml(principal, annualRatePct, numPayments) {
  const r = annualRatePct / 100 / 12;
  const M = monthlyPayment(principal, annualRatePct, numPayments);
  let balance = principal;
  let rows = '';
  for (let period = 1; period <= numPayments; period++) {
    const interest = r === 0 ? 0 : balance * r;
    let principalPortion = M - interest;
    balance -= principalPortion;
    if (period === numPayments || balance < 0.005) balance = 0;
    rows += `<tr><td>${period}</td><td>${formatValue(M, 'currency')}</td><td>${formatValue(principalPortion, 'currency')}</td><td>${formatValue(interest, 'currency')}</td><td>${formatValue(balance, 'currency')}</td></tr>`;
  }
  return `
    <div class="amort-table-wrap">
      <table class="amort-table">
        <thead><tr><th>#</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// Calendar-aware difference between two dates: correct year/month/day borrowing
// (not a naive divide-by-30), plus totals for context.
function calendarDiff(earlier, later) {
  let y = later.getFullYear() - earlier.getFullYear();
  let m = later.getMonth() - earlier.getMonth();
  let d = later.getDate() - earlier.getDate();
  if (d < 0) {
    m -= 1;
    const daysInPrevMonth = new Date(later.getFullYear(), later.getMonth(), 0).getDate();
    d += daysInPrevMonth;
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  const totalDays = Math.round((later - earlier) / 86400000);
  return { years: y, months: m, days: d, totalDays, totalWeeks: Math.floor(totalDays / 7), totalMonths: y * 12 + m };
}

function parseHM(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

const CALC_DEFINITIONS = {

  // Handled separately by js/scientific-calculator.js (keypad UI, not a plain
  // field form) — this marker just tells calculator.html a real engine exists.
  'scientific-calculator': { special: 'scientific' },

  // ---------------- Financial ----------------

  'mortgage-calculator': {
    fields: [
      { id: 'price', label: 'Home Price', type: 'number', unit: '$', min: 0, step: 1000, default: 350000 },
      { id: 'downPayment', label: 'Down Payment', type: 'number', unit: '$', min: 0, step: 1000, default: 70000 },
      { id: 'rate', label: 'Interest Rate', type: 'number', unit: '% APR', min: 0, step: 0.01, default: 6.5 },
      { id: 'years', label: 'Loan Term', type: 'select', default: 30, options: [{ value: 15, label: '15 years' }, { value: 20, label: '20 years' }, { value: 30, label: '30 years' }] },
    ],
    compute(v) {
      if (v.downPayment > v.price) throw new Error('Down payment can’t be more than the home price.');
      const loanAmount = v.price - v.downPayment;
      const n = v.years * 12;
      const M = monthlyPayment(loanAmount, v.rate, n);
      const totalPaid = M * n;
      return {
        results: [
          { label: 'Monthly Payment', value: M, format: 'currency', primary: true },
          { label: 'Loan Amount', value: loanAmount, format: 'currency' },
          { label: 'Total Interest', value: totalPaid - loanAmount, format: 'currency' },
          { label: 'Total Cost', value: totalPaid, format: 'currency' },
        ],
      };
    },
  },

  'loan-calculator': {
    fields: [
      { id: 'amount', label: 'Loan Amount', type: 'number', unit: '$', min: 0, step: 100, default: 20000 },
      { id: 'rate', label: 'Interest Rate', type: 'number', unit: '% APR', min: 0, step: 0.01, default: 7 },
      { id: 'years', label: 'Loan Term', type: 'number', unit: 'years', min: 1, step: 1, default: 5 },
    ],
    compute(v) {
      const n = v.years * 12;
      const M = monthlyPayment(v.amount, v.rate, n);
      const totalPaid = M * n;
      return {
        results: [
          { label: 'Monthly Payment', value: M, format: 'currency', primary: true },
          { label: 'Total Interest', value: totalPaid - v.amount, format: 'currency' },
          { label: 'Total Repayment', value: totalPaid, format: 'currency' },
        ],
      };
    },
  },

  'auto-loan-calculator': {
    fields: [
      { id: 'price', label: 'Vehicle Price', type: 'number', unit: '$', min: 0, step: 500, default: 35000 },
      { id: 'downPayment', label: 'Down Payment', type: 'number', unit: '$', min: 0, step: 500, default: 5000 },
      { id: 'tradeIn', label: 'Trade-In Value', type: 'number', unit: '$', min: 0, step: 500, default: 2000 },
      { id: 'rate', label: 'Interest Rate', type: 'number', unit: '% APR', min: 0, step: 0.01, default: 6 },
      { id: 'termMonths', label: 'Loan Term', type: 'select', default: 60, options: [{ value: 36, label: '36 months' }, { value: 48, label: '48 months' }, { value: 60, label: '60 months' }, { value: 72, label: '72 months' }] },
    ],
    compute(v) {
      const loanAmount = Math.max(v.price - v.downPayment - v.tradeIn, 0);
      const M = monthlyPayment(loanAmount, v.rate, v.termMonths);
      const totalPaid = M * v.termMonths;
      return {
        results: [
          { label: 'Monthly Payment', value: M, format: 'currency', primary: true },
          { label: 'Amount Financed', value: loanAmount, format: 'currency' },
          { label: 'Total Interest', value: totalPaid - loanAmount, format: 'currency' },
          { label: 'Total Cost', value: totalPaid, format: 'currency' },
        ],
      };
    },
  },

  'amortization-calculator': {
    fields: [
      { id: 'amount', label: 'Loan Amount', type: 'number', unit: '$', min: 0, step: 1000, default: 250000 },
      { id: 'rate', label: 'Interest Rate', type: 'number', unit: '% APR', min: 0, step: 0.01, default: 5.5 },
      { id: 'years', label: 'Loan Term', type: 'select', default: 15, options: [{ value: 10, label: '10 years' }, { value: 15, label: '15 years' }, { value: 30, label: '30 years' }] },
    ],
    compute(v) {
      const n = v.years * 12;
      const M = monthlyPayment(v.amount, v.rate, n);
      const totalPaid = M * n;
      return {
        results: [
          { label: 'Monthly Payment', value: M, format: 'currency', primary: true },
          { label: 'Total Interest', value: totalPaid - v.amount, format: 'currency' },
          { label: 'Total Cost', value: totalPaid, format: 'currency' },
          { label: 'Number of Payments', value: n, format: 'integer' },
        ],
        extraHtml: `<h4 class="amort-heading">Full Payment Schedule</h4>` + amortizationExtraHtml(v.amount, v.rate, n),
      };
    },
  },

  // ---------------- Fitness & Health ----------------
  // Metric units only (cm/kg) for this batch, to keep every formula unambiguous.

  'bmi-calculator': {
    fields: [
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', min: 50, step: 0.5, default: 175 },
      { id: 'weight', label: 'Weight', type: 'number', unit: 'kg', min: 10, step: 0.1, default: 70 },
    ],
    compute(v) {
      const heightM = v.height / 100;
      const bmi = v.weight / (heightM * heightM);
      let category;
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      return {
        results: [
          { label: 'BMI', value: bmi, format: 'decimal1', primary: true },
          { label: 'Category', value: category, format: 'text' },
        ],
      };
    },
  },

  'calorie-calculator': {
    fields: [
      { id: 'gender', label: 'Gender', type: 'radio-group', default: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 15, max: 100, step: 1, default: 30 },
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', min: 100, step: 0.5, default: 175 },
      { id: 'weight', label: 'Weight', type: 'number', unit: 'kg', min: 20, step: 0.1, default: 70 },
      {
        id: 'activity', label: 'Activity Level', type: 'select', default: 1.55,
        options: [
          { value: 1.2, label: 'Sedentary (little/no exercise)' },
          { value: 1.375, label: 'Light (1-3 days/week)' },
          { value: 1.55, label: 'Moderate (3-5 days/week)' },
          { value: 1.725, label: 'Active (6-7 days/week)' },
          { value: 1.9, label: 'Very Active (hard exercise daily)' },
        ],
      },
    ],
    // Mifflin-St Jeor equation.
    compute(v) {
      const base = 10 * v.weight + 6.25 * v.height - 5 * v.age;
      const bmr = v.gender === 'male' ? base + 5 : base - 161;
      const tdee = bmr * v.activity;
      return {
        results: [
          { label: 'Maintenance Calories', value: tdee, format: 'integer', primary: true },
          { label: 'BMR (at rest)', value: bmr, format: 'integer' },
          { label: 'Mild Weight Loss (~0.5 kg/week)', value: tdee - 500, format: 'integer' },
          { label: 'Mild Weight Gain (~0.5 kg/week)', value: tdee + 500, format: 'integer' },
        ],
      };
    },
  },

  'body-fat-calculator': {
    fields: [
      { id: 'gender', label: 'Gender', type: 'radio-group', default: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', min: 100, step: 0.5, default: 175 },
      { id: 'neck', label: 'Neck', type: 'number', unit: 'cm', min: 10, step: 0.1, default: 38 },
      { id: 'waist', label: 'Waist', type: 'number', unit: 'cm', min: 30, step: 0.1, default: 85 },
      { id: 'hip', label: 'Hip', type: 'number', unit: 'cm — female calculation only', min: 0, step: 0.1, default: 95 },
    ],
    // US Navy circumference method (all measurements converted to inches internally).
    compute(v) {
      const height = v.height / 2.54;
      const neck = v.neck / 2.54;
      const waist = v.waist / 2.54;
      const hip = v.hip / 2.54;
      let bf;
      if (v.gender === 'male') {
        if (waist <= neck) throw new Error('Waist measurement must be larger than neck measurement.');
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        if (waist + hip <= neck) throw new Error('Waist + hip must be larger than neck measurement.');
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
      }
      if (!isFinite(bf) || bf < 2 || bf > 60) throw new Error('These measurements are outside the range this formula can estimate accurately.');
      return {
        results: [
          { label: 'Estimated Body Fat', value: bf, format: 'decimal1', primary: true },
        ],
      };
    },
  },

  'bmr-calculator': {
    fields: [
      { id: 'gender', label: 'Gender', type: 'radio-group', default: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 15, max: 100, step: 1, default: 30 },
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', min: 100, step: 0.5, default: 175 },
      { id: 'weight', label: 'Weight', type: 'number', unit: 'kg', min: 20, step: 0.1, default: 70 },
    ],
    // Mifflin-St Jeor equation.
    compute(v) {
      const base = 10 * v.weight + 6.25 * v.height - 5 * v.age;
      const bmr = v.gender === 'male' ? base + 5 : base - 161;
      const levels = [
        ['Sedentary', 1.2], ['Light Exercise', 1.375], ['Moderate Exercise', 1.55], ['Active', 1.725], ['Very Active', 1.9],
      ];
      const rows = levels.map(([label, mult]) => `<tr><td>${label}</td><td>${formatValue(bmr * mult, 'integer')} cal/day</td></tr>`).join('');
      return {
        results: [{ label: 'BMR (calories at rest)', value: bmr, format: 'integer', primary: true }],
        extraHtml: `<h4 class="amort-heading">Estimated Daily Calories by Activity Level</h4><div class="amort-table-wrap"><table class="amort-table"><tbody>${rows}</tbody></table></div>`,
      };
    },
  },

  // ---------------- Math ----------------

  'fraction-calculator': {
    fields: [
      { id: 'n1', label: 'Numerator 1', type: 'number', step: 1, default: 1 },
      { id: 'd1', label: 'Denominator 1', type: 'number', step: 1, default: 2 },
      { id: 'op', label: 'Operation', type: 'select', default: '+', options: [{ value: '+', label: '+' }, { value: '-', label: '−' }, { value: '*', label: '×' }, { value: '/', label: '÷' }] },
      { id: 'n2', label: 'Numerator 2', type: 'number', step: 1, default: 1 },
      { id: 'd2', label: 'Denominator 2', type: 'number', step: 1, default: 3 },
    ],
    compute(v) {
      if (v.d1 === 0 || v.d2 === 0) throw new Error('A denominator can’t be zero.');
      let n, d;
      switch (v.op) {
        case '+': n = v.n1 * v.d2 + v.n2 * v.d1; d = v.d1 * v.d2; break;
        case '-': n = v.n1 * v.d2 - v.n2 * v.d1; d = v.d1 * v.d2; break;
        case '*': n = v.n1 * v.n2; d = v.d1 * v.d2; break;
        case '/':
          if (v.n2 === 0) throw new Error('Can’t divide by a fraction equal to zero.');
          n = v.n1 * v.d2; d = v.d1 * v.n2; break;
      }
      if (d < 0) { n = -n; d = -d; }
      const g = gcd(Math.abs(n), Math.abs(d)) || 1;
      const simpleN = n / g, simpleD = d / g;
      return {
        results: [
          { label: 'Result', value: `${simpleN}/${simpleD}`, format: 'text', primary: true },
          { label: 'Decimal', value: simpleN / simpleD, format: 'default' },
        ],
      };
    },
  },

  'percentage-calculator': {
    fields: [
      { id: 'mode', label: 'What do you want to find?', type: 'select', default: 'percent-of', options: [
        { value: 'percent-of', label: 'A% of B' },
        { value: 'is-what-percent', label: 'A is what % of B' },
        { value: 'percent-change', label: '% change from B to A' },
      ] },
      { id: 'a', label: 'A', type: 'number', step: 0.01, default: 20 },
      { id: 'b', label: 'B', type: 'number', step: 0.01, default: 150 },
    ],
    compute(v) {
      if (v.mode === 'percent-of') {
        return { results: [{ label: `${v.a}% of ${v.b}`, value: (v.a / 100) * v.b, format: 'default', primary: true }] };
      }
      if (v.mode === 'is-what-percent') {
        if (v.b === 0) throw new Error('B can’t be zero.');
        return { results: [{ label: `${v.a} is what % of ${v.b}`, value: (v.a / v.b) * 100, format: 'percent', primary: true }] };
      }
      if (v.b === 0) throw new Error('B can’t be zero.');
      return { results: [{ label: `% change from ${v.b} to ${v.a}`, value: ((v.a - v.b) / v.b) * 100, format: 'percent', primary: true }] };
    },
  },

  'random-number-generator': {
    fields: [
      { id: 'min', label: 'Minimum', type: 'number', step: 1, default: 1 },
      { id: 'max', label: 'Maximum', type: 'number', step: 1, default: 100 },
      { id: 'count', label: 'How Many', type: 'number', min: 1, max: 100, step: 1, default: 5 },
      { id: 'unique', label: 'No duplicate numbers', type: 'checkbox', default: false },
    ],
    compute(v) {
      const min = Math.round(v.min), max = Math.round(v.max), count = Math.round(v.count);
      if (min > max) throw new Error('Minimum must be less than or equal to maximum.');
      const rangeSize = max - min + 1;
      if (v.unique && count > rangeSize) throw new Error(`Can’t pick ${count} unique numbers from a range of only ${rangeSize}.`);
      let numbers;
      if (v.unique) {
        const pool = Array.from({ length: rangeSize }, (_, i) => min + i);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        numbers = pool.slice(0, count);
      } else {
        numbers = Array.from({ length: count }, () => min + Math.floor(Math.random() * rangeSize));
      }
      return {
        results: [{ label: 'Generated Numbers', value: numbers.join(', '), format: 'text', primary: true }],
      };
    },
  },

  // ---------------- Other ----------------

  'age-calculator': {
    fields: [
      { id: 'dob', label: 'Date of Birth', type: 'date', default: '2000-06-15' },
      { id: 'asOf', label: 'As Of Date', type: 'date', default: todayISO() },
    ],
    compute(v) {
      const dob = new Date(v.dob), asOf = new Date(v.asOf);
      if (isNaN(dob) || isNaN(asOf)) throw new Error('Enter valid dates.');
      if (asOf < dob) throw new Error('The "as of" date must be on or after the date of birth.');
      const diff = calendarDiff(dob, asOf);
      return {
        results: [
          { label: 'Age', value: `${diff.years} years, ${diff.months} months, ${diff.days} days`, format: 'text', primary: true },
          { label: 'Total Days Lived', value: diff.totalDays, format: 'integer' },
          { label: 'Total Weeks Lived', value: diff.totalWeeks, format: 'integer' },
          { label: 'Total Months Lived', value: diff.totalMonths, format: 'integer' },
        ],
      };
    },
  },

  'date-calculator': {
    fields: [
      { id: 'date1', label: 'Start Date', type: 'date', default: todayISO() },
      { id: 'date2', label: 'Compare To Date', type: 'date', default: isoPlusDays(todayISO(), 30) },
      { id: 'amount', label: 'Add/Subtract Amount', type: 'number', step: 1, default: 30 },
      { id: 'unit', label: 'Unit', type: 'select', default: 'days', options: [{ value: 'days', label: 'Days' }, { value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }] },
      { id: 'direction', label: 'Direction', type: 'select', default: 'add', options: [{ value: 'add', label: 'Add' }, { value: 'subtract', label: 'Subtract' }] },
    ],
    compute(v) {
      const d1 = new Date(v.date1), d2 = new Date(v.date2);
      if (isNaN(d1) || isNaN(d2)) throw new Error('Enter valid dates.');
      const earlier = d1 <= d2 ? d1 : d2;
      const later = d1 <= d2 ? d2 : d1;
      const diff = calendarDiff(earlier, later);

      const base = new Date(v.date1);
      const sign = v.direction === 'subtract' ? -1 : 1;
      const amt = sign * v.amount;
      if (v.unit === 'days') base.setDate(base.getDate() + amt);
      else if (v.unit === 'weeks') base.setDate(base.getDate() + amt * 7);
      else if (v.unit === 'months') base.setMonth(base.getMonth() + amt);
      else base.setFullYear(base.getFullYear() + amt);

      return {
        results: [
          { label: `Difference (Start ↔ Compare)`, value: `${diff.totalDays} days`, format: 'text', primary: true },
          { label: 'As Years/Months/Days', value: `${diff.years}y ${diff.months}m ${diff.days}d`, format: 'text' },
          { label: `Start Date ${v.direction === 'subtract' ? 'minus' : 'plus'} ${v.amount} ${v.unit}`, value: base.toISOString().slice(0, 10), format: 'text' },
        ],
      };
    },
  },

  'time-calculator': {
    fields: [
      { id: 'time1', label: 'Time 1', type: 'time', default: '02:30' },
      { id: 'operation', label: 'Operation', type: 'select', default: 'add', options: [{ value: 'add', label: 'Add (+)' }, { value: 'subtract', label: 'Subtract (−)' }] },
      { id: 'time2', label: 'Time 2', type: 'time', default: '01:45' },
    ],
    compute(v) {
      const m1 = parseHM(v.time1), m2 = parseHM(v.time2);
      const totalMinutes = v.operation === 'add' ? m1 + m2 : m1 - m2;
      const sign = totalMinutes < 0 ? -1 : 1;
      const abs = Math.abs(totalMinutes);
      const h = Math.floor(abs / 60), m = abs % 60;
      return {
        results: [
          { label: 'Result', value: `${sign < 0 ? '-' : ''}${h}h ${m}m`, format: 'text', primary: true },
          { label: 'Decimal Hours', value: (sign * abs) / 60, format: 'default' },
        ],
      };
    },
  },

  'hours-calculator': {
    fields: [
      { id: 'startTime', label: 'Start Time', type: 'time', default: '09:00' },
      { id: 'endTime', label: 'End Time', type: 'time', default: '17:30' },
      { id: 'breakMinutes', label: 'Unpaid Break', type: 'number', unit: 'minutes', min: 0, step: 1, default: 30 },
    ],
    compute(v) {
      let totalMinutes = parseHM(v.endTime) - parseHM(v.startTime);
      if (totalMinutes < 0) totalMinutes += 1440; // shift crosses midnight
      totalMinutes -= v.breakMinutes;
      if (totalMinutes < 0) throw new Error('The break is longer than the shift.');
      const h = Math.floor(totalMinutes / 60), m = totalMinutes % 60;
      return {
        results: [
          { label: 'Hours Worked', value: `${h}h ${m}m`, format: 'text', primary: true },
          { label: 'Decimal Hours', value: totalMinutes / 60, format: 'default' },
        ],
      };
    },
  },
};

function gcd(a, b) {
  while (b) { [a, b] = [b, a % b]; }
  return a;
}
