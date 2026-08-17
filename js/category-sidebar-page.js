// Shared sidebar+panel controller. Used by the 4 dedicated category pages
// (financial.html, fitness.html, math.html, other.html — one section each,
// uncapped, no "View All") and by Home (4 sections on one page, capped
// previews, each "View All" pointing at its dedicated page).
function initSidebarPanel({ groups, listId = 'category-list', panelId = 'category-panel', cap = Infinity, viewAllHref = null }) {
  let activeCategoryId = groups[0].id;

  function renderSidebar() {
    const list = document.getElementById(listId);
    list.innerHTML = groups.map((cat) => `
      <button class="category-item${cat.id === activeCategoryId ? ' active' : ''}" data-cat="${cat.id}">
        ${iconMarkup(cat.icon)}
        <span class="cat-label">${cat.label}</span>
        ${iconMarkup('chevronRight', 'chevron')}
      </button>
    `).join('');

    list.querySelectorAll('.category-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategoryId = btn.dataset.cat;
        renderSidebar();
        renderPanel();
      });
    });
  }

  function renderPanel() {
    const cat = groups.find((c) => c.id === activeCategoryId);
    document.getElementById(panelId).innerHTML = categoryPanelMarkup(cat, { cap, viewAllHref });
  }

  renderSidebar();
  renderPanel();
}

// Icon injection for the header/footer/CTA chrome shared by every page that
// uses initSidebarPanel. Home (app.js) sets its own hero/stat-pill icons on
// top of this.
function initPageChrome() {
  document.getElementById('brand-mark-icon').innerHTML = iconMarkup('calculator');
  const allCalcArrow = document.getElementById('all-calc-arrow');
  if (allCalcArrow) allCalcArrow.innerHTML = iconMarkup('arrowRight');
  document.querySelectorAll('.cta-arrow-icon').forEach((el) => { el.innerHTML = iconMarkup('arrowRight'); });
  const f1 = document.getElementById('footer-icon-1'); if (f1) f1.innerHTML = iconMarkup('shield');
  const f2 = document.getElementById('footer-icon-2'); if (f2) f2.innerHTML = iconMarkup('lightning');
  const f3 = document.getElementById('footer-icon-3'); if (f3) f3.innerHTML = iconMarkup('heart');
  const f4 = document.getElementById('footer-icon-4'); if (f4) f4.innerHTML = iconMarkup('sparkle');
}
