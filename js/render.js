// Shared rendering helpers used by the Home page, the four dedicated category
// pages, and the All Calculators page — one implementation, no per-page duplicates.

function cardMarkup(calc) {
  const badge = calc.badge
    ? `<span class="badge badge-${calc.badge.toLowerCase()}">${iconMarkup(calc.badge === 'Popular' ? 'star' : 'sparkle')}${calc.badge}</span>`
    : '';
  return `
    <div class="calc-card">
      <div class="calc-card-top">
        <div class="calc-icon-tile">${iconMarkup(calc.icon)}</div>
        ${badge}
      </div>
      <h3>${calc.name}</h3>
      <p class="calc-desc">${calc.description}</p>
      <div class="calc-card-footer">
        <div class="calc-meta">
          ${iconMarkup('tag')}<span>${calc.tag}</span>
          <span class="dot">|</span>
          ${iconMarkup('clock')}<span>${calc.time}</span>
        </div>
        <a class="btn btn-primary" href="calculator.html?slug=${calc.slug}&name=${encodeURIComponent(calc.name)}" target="_blank" rel="noopener noreferrer">Calculate ${iconMarkup('arrowRight')}</a>
      </div>
    </div>
  `;
}

// entity: { icon, label, description, calculators }
// options.cap: how many cards to show (omit/Infinity for the full list)
// options.viewAllHref: URL for the "View All" link — must be the SAME URL used by
// that category's nav link, so shown only when there's more to see than `cap`.
function categoryPanelMarkup(entity, { cap = Infinity, viewAllHref = null } = {}) {
  const visible = entity.calculators.slice(0, cap);
  const showViewAll = viewAllHref && entity.calculators.length > cap;

  return `
    <div class="category-panel-header">
      <div class="category-panel-title">
        <div class="category-icon-badge">${iconMarkup(entity.icon)}</div>
        <div>
          <h2>${entity.label}</h2>
          <p>${entity.description}</p>
        </div>
      </div>
      ${showViewAll ? `
        <a class="view-all-link" href="${viewAllHref}" target="_blank" rel="noopener noreferrer">
          View All (${entity.calculators.length}) ${iconMarkup('arrowRight')}
        </a>` : ''}
    </div>
    <div class="card-grid">${visible.map(cardMarkup).join('')}</div>
  `;
}
