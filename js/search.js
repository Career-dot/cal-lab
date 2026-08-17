const SEARCH_RESULT_LIMIT = 8;
const SEARCH_DEBOUNCE_MS = 180;

// Flat, searchable index built from the same ALL_CALCULATORS_BY_SECTION used by
// the All Calculators page — one source of truth for every calculator's name/route.
const SEARCH_INDEX = ALL_CALCULATORS_BY_SECTION.flatMap((section) =>
  section.calculators.map((calc) => ({
    name: calc.name,
    category: section.label.replace(/\s*Calculators$/, ''),
    href: `calculator.html?slug=${calc.slug}&name=${encodeURIComponent(calc.name)}`,
  }))
);

function initSearch() {
  const searchBox = document.querySelector('.search-box');
  const input = searchBox && searchBox.querySelector('input');
  if (!input) return;

  const results = document.createElement('div');
  results.className = 'search-results';
  results.hidden = true;
  searchBox.appendChild(results);

  let debounceTimer = null;

  function closeResults() {
    results.hidden = true;
    results.innerHTML = '';
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      closeResults();
      return;
    }

    const matches = SEARCH_INDEX.filter((item) => item.name.toLowerCase().includes(q)).slice(0, SEARCH_RESULT_LIMIT);

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-no-results">No results found for "${query}"</div>`;
    } else {
      results.innerHTML = matches.map((item) => `
        <a class="search-result-item" href="${item.href}" target="_blank" rel="noopener">
          <span class="result-name">${item.name}</span>
          <span class="result-category">${item.category}</span>
        </a>
      `).join('');
    }
    results.hidden = false;
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const value = input.value;
    debounceTimer = setTimeout(() => renderResults(value), SEARCH_DEBOUNCE_MS);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      closeResults();
      input.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target)) closeResults();
  });
}

initSearch();
