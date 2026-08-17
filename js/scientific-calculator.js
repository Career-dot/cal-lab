// A real, safe expression evaluator — no eval()/new Function(). Hand-rolled
// tokenizer + recursive-descent parser supporting +,-,*,/,%,^, parentheses,
// unary minus, sin/cos/tan/asin/acos/atan/log/ln/sqrt/abs, and constants pi/e.

function tokenizeExpression(expr) {
  const tokens = [];
  const s = expr.replace(/\s+/g, '');
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let num = c; i++;
      while (i < s.length && /[0-9.]/.test(s[i])) { num += s[i]; i++; }
      if ((num.match(/\./g) || []).length > 1) throw new Error('Invalid number');
      tokens.push({ type: 'num', value: parseFloat(num) });
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let name = c; i++;
      while (i < s.length && /[a-zA-Z]/.test(s[i])) { name += s[i]; i++; }
      tokens.push({ type: 'ident', value: name.toLowerCase() });
      continue;
    }
    if ('+-*/^(),%'.includes(c)) {
      tokens.push({ type: 'op', value: c });
      i++;
      continue;
    }
    throw new Error(`Unexpected character "${c}"`);
  }
  return tokens;
}

const SCI_FUNCS = (angleMode) => ({
  sin: (x) => Math.sin(angleMode === 'deg' ? (x * Math.PI) / 180 : x),
  cos: (x) => Math.cos(angleMode === 'deg' ? (x * Math.PI) / 180 : x),
  tan: (x) => Math.tan(angleMode === 'deg' ? (x * Math.PI) / 180 : x),
  asin: (x) => { const r = Math.asin(x); return angleMode === 'deg' ? (r * 180) / Math.PI : r; },
  acos: (x) => { const r = Math.acos(x); return angleMode === 'deg' ? (r * 180) / Math.PI : r; },
  atan: (x) => { const r = Math.atan(x); return angleMode === 'deg' ? (r * 180) / Math.PI : r; },
  log: (x) => { if (x <= 0) throw new Error('log of a non-positive number'); return Math.log10(x); },
  ln: (x) => { if (x <= 0) throw new Error('ln of a non-positive number'); return Math.log(x); },
  sqrt: (x) => { if (x < 0) throw new Error('Square root of a negative number'); return Math.sqrt(x); },
  abs: Math.abs,
});
const SCI_CONSTS = { pi: Math.PI, e: Math.E };

function evaluateExpression(expr, angleMode) {
  const tokens = tokenizeExpression(expr);
  if (tokens.length === 0) throw new Error('Enter an expression');
  const funcs = SCI_FUNCS(angleMode);
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  function parseExpr() {
    let left = parseTerm();
    while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
      const op = next().value;
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }
  function parseTerm() {
    let left = parsePower();
    while (peek() && peek().type === 'op' && (peek().value === '*' || peek().value === '/' || peek().value === '%')) {
      const op = next().value;
      const right = parsePower();
      if (op === '*') left *= right;
      else if (op === '/') { if (right === 0) throw new Error('Division by zero'); left /= right; }
      else left %= right;
    }
    return left;
  }
  function parsePower() {
    const base = parseUnary();
    if (peek() && peek().type === 'op' && peek().value === '^') {
      next();
      return Math.pow(base, parsePower());
    }
    return base;
  }
  function parseUnary() {
    if (peek() && peek().type === 'op' && (peek().value === '-' || peek().value === '+')) {
      const op = next().value;
      return op === '-' ? -parseUnary() : parseUnary();
    }
    return parsePrimary();
  }
  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error('Unexpected end of expression');
    if (t.type === 'num') { next(); return t.value; }
    if (t.type === 'op' && t.value === '(') {
      next();
      const val = parseExpr();
      if (!peek() || peek().value !== ')') throw new Error('Missing closing parenthesis');
      next();
      return val;
    }
    if (t.type === 'ident') {
      next();
      if (SCI_CONSTS[t.value] !== undefined) return SCI_CONSTS[t.value];
      if (funcs[t.value]) {
        if (!peek() || peek().value !== '(') throw new Error(`Expected "(" after ${t.value}`);
        next();
        const arg = parseExpr();
        if (!peek() || peek().value !== ')') throw new Error('Missing closing parenthesis');
        next();
        return funcs[t.value](arg);
      }
      throw new Error(`Unknown identifier "${t.value}"`);
    }
    throw new Error('Unexpected token in expression');
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new Error('Unexpected trailing input');
  if (!isFinite(result)) throw new Error('Result is not a finite number');
  return result;
}

function renderScientificCalculator() {
  const root = document.getElementById('calc-form');
  const resultsEl = document.getElementById('calc-results');
  resultsEl.style.display = 'none';

  let display = '0';
  let angleMode = 'deg';

  const KEYS = [
    ['DEG', 'C', '⌫', '('], [')'],
    ['sin(', 'cos(', 'tan(', '√('],
    ['log(', 'ln(', 'x^2', '^'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '−'],
    ['0', '.', 'π', '+'],
    ['e', '%', '=', ''],
  ];

  root.innerHTML = `
    <div class="sci-calc">
      <div class="sci-display" id="sci-display">0</div>
      <div class="sci-keys">
        ${KEYS.flat().filter(Boolean).map((k) => `<button type="button" class="sci-key${k === '=' ? ' sci-key-equals' : ''}${k === 'DEG' ? ' sci-key-mode' : ''}" data-key="${k}">${k === 'DEG' ? 'DEG' : k}</button>`).join('')}
      </div>
    </div>
  `;

  const displayEl = document.getElementById('sci-display');
  const modeBtn = root.querySelector('.sci-key-mode');

  function updateDisplay() { displayEl.textContent = display; }

  function insert(token) {
    if (display === '0' && !'+−×÷^%.'.includes(token)) display = token;
    else display += token;
    updateDisplay();
  }

  root.querySelectorAll('.sci-key').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (key === 'C') { display = '0'; updateDisplay(); return; }
      if (key === '⌫') { display = display.length > 1 ? display.slice(0, -1) : '0'; updateDisplay(); return; }
      if (key === 'DEG') {
        angleMode = angleMode === 'deg' ? 'rad' : 'deg';
        modeBtn.textContent = angleMode === 'deg' ? 'DEG' : 'RAD';
        return;
      }
      if (key === 'x^2') { insert('^2'); return; }
      if (key === '×') { insert('*'); return; }
      if (key === '÷') { insert('/'); return; }
      if (key === '−') { insert('-'); return; }
      if (key === '√(') { insert('sqrt('); return; }
      if (key === 'π') { insert('pi'); return; }
      if (key === '=') {
        try {
          const result = evaluateExpression(display, angleMode);
          display = String(Math.round(result * 1e10) / 1e10);
        } catch (err) {
          display = 'Error';
        }
        updateDisplay();
        return;
      }
      insert(key);
    });
  });

  document.addEventListener('keydown', function sciKeyHandler(e) {
    if (!document.body.contains(displayEl)) {
      document.removeEventListener('keydown', sciKeyHandler);
      return;
    }
    if (/[0-9.+\-*/^()]/.test(e.key)) { insert(e.key); }
    else if (e.key === 'Enter' || e.key === '=') { root.querySelector('.sci-key-equals').click(); }
    else if (e.key === 'Backspace') { root.querySelector('[data-key="⌫"]').click(); }
    else if (e.key === 'Escape') { root.querySelector('[data-key="C"]').click(); }
  });
}
