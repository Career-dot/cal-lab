// Generic renderer for "fill in fields, get a result" calculators. Each
// definition in js/calc-definitions.js supplies its own fields + compute()
// function; this file only handles turning that into a form and back.

function formatValue(value, format) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value;
  if (!isFinite(value)) return '—';
  switch (format) {
    case 'currency':
      return (value < 0 ? '-$' : '$') + Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'percent':
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 }) + '%';
    case 'integer':
      return Math.round(value).toLocaleString();
    case 'decimal1':
      return value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    default:
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
}

function fieldMarkup(field) {
  if (field.type === 'select') {
    return `
      <label class="calc-field">
        <span class="calc-field-label">${field.label}</span>
        <select id="f-${field.id}">
          ${field.options.map((o) => `<option value="${o.value}"${o.value === field.default ? ' selected' : ''}>${o.label}</option>`).join('')}
        </select>
      </label>`;
  }
  if (field.type === 'radio-group') {
    return `
      <div class="calc-field calc-field-radio">
        <span class="calc-field-label">${field.label}</span>
        <div class="radio-row">
          ${field.options.map((o) => `
            <label class="radio-pill"><input type="radio" name="f-${field.id}" value="${o.value}"${o.value === field.default ? ' checked' : ''}> ${o.label}</label>
          `).join('')}
        </div>
      </div>`;
  }
  if (field.type === 'date') {
    return `
      <label class="calc-field">
        <span class="calc-field-label">${field.label}</span>
        <input type="date" id="f-${field.id}" value="${field.default || ''}">
      </label>`;
  }
  if (field.type === 'time') {
    return `
      <label class="calc-field">
        <span class="calc-field-label">${field.label}</span>
        <input type="time" id="f-${field.id}" value="${field.default || ''}">
      </label>`;
  }
  if (field.type === 'checkbox') {
    return `
      <label class="calc-field calc-field-checkbox">
        <input type="checkbox" id="f-${field.id}"${field.default ? ' checked' : ''}>
        <span>${field.label}</span>
      </label>`;
  }
  // number (default)
  return `
    <label class="calc-field">
      <span class="calc-field-label">${field.label}${field.unit ? ` (${field.unit})` : ''}</span>
      <input type="number" id="f-${field.id}" value="${field.default !== undefined ? field.default : ''}"
        ${field.min !== undefined ? `min="${field.min}"` : ''} ${field.max !== undefined ? `max="${field.max}"` : ''} ${field.step !== undefined ? `step="${field.step}"` : ''}>
    </label>`;
}

function readFieldValue(field) {
  if (field.type === 'radio-group') {
    const checked = document.querySelector(`input[name="f-${field.id}"]:checked`);
    return checked ? checked.value : field.default;
  }
  const el = document.getElementById(`f-${field.id}`);
  if (!el) return field.default;
  if (field.type === 'checkbox') return el.checked;
  if (field.type === 'number') return el.value === '' ? NaN : parseFloat(el.value);
  if (field.type === 'select') {
    const asNum = parseFloat(el.value);
    return String(asNum) === el.value ? asNum : el.value;
  }
  return el.value;
}

function resultsMarkup(output) {
  const rows = output.results.map((r) => `
    <div class="result-row${r.primary ? ' result-primary' : ''}">
      <span class="result-label">${r.label}</span>
      <span class="result-value">${formatValue(r.value, r.format)}</span>
    </div>
  `).join('');
  return `<div class="calc-results-inner">${rows}</div>${output.extraHtml || ''}`;
}

function renderCalculatorForm(def) {
  const form = document.getElementById('calc-form');
  const resultsEl = document.getElementById('calc-results');

  form.innerHTML = def.fields.map(fieldMarkup).join('') +
    `<button type="submit" class="btn btn-primary calc-submit">Calculate ${iconMarkup('arrowRight')}</button>`;

  function runCompute() {
    const values = {};
    def.fields.forEach((f) => { values[f.id] = readFieldValue(f); });

    const missing = def.fields.some((f) => f.type === 'number' && isNaN(values[f.id]));
    if (missing) {
      resultsEl.innerHTML = `<div class="calc-error">Fill in every field with a valid number to see a result.</div>`;
      return;
    }

    try {
      const output = def.compute(values);
      resultsEl.innerHTML = resultsMarkup(output);
    } catch (err) {
      resultsEl.innerHTML = `<div class="calc-error">${err.message || 'These inputs don’t produce a valid result.'}</div>`;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runCompute();
  });

  runCompute();
}
