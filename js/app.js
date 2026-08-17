const VISIBLE_COUNT = 4; // matches the 2x2 grid shown in the reference screenshot

// Each Home section's "View All" must point at the exact same URL as that
// category's nav link — this is the single source of truth for both.
const CATEGORY_PAGE_HREF = {
  financial: 'financial.html',
  fitness: 'fitness.html',
  math: 'math.html',
  other: 'other.html',
};

function setIcon(elId, name, extraClass) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = iconMarkup(name, extraClass);
}

function renderStaticIcons() {
  setIcon('brand-mark-icon', 'calculator');
  setIcon('search-icon', 'search');
  setIcon('all-calc-arrow', 'arrowRight');
  document.querySelectorAll('.cta-arrow-icon').forEach((el) => { el.innerHTML = iconMarkup('arrowRight'); });
  setIcon('stat-icon-1', 'calculator');
  setIcon('stat-icon-2', 'lightning');
  setIcon('stat-icon-3', 'shield');
  setIcon('footer-icon-1', 'shield');
  setIcon('footer-icon-2', 'lightning');
  setIcon('footer-icon-3', 'heart');
  setIcon('footer-icon-4', 'sparkle');

  const totalCount = ALL_CALCULATORS_BY_SECTION.reduce((sum, s) => sum + s.calculators.length, 0);
  document.getElementById('stat-title-1').textContent = `${totalCount} Calculators`;
  document.getElementById('hero-calc-count').textContent = totalCount;
}

function renderHeroArt() {
  // calculator/coins/leaves are real cutout assets (verified transparent — alpha=0 at
  // their corners); chart-document-source.png and handwritten-arrow-source.png in
  // Icons/ still have their mint background baked in (alpha=255) and cut-off content,
  // so the paper/chart card and caption arrow stay hand-drawn until clean cutouts exist.
  document.getElementById('hero-art').innerHTML = `
    <div class="hero-illustration">
      <svg class="hero-bg-svg" width="420" height="260" viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg">
        <path d="M75 60 C40 95 30 160 65 205 C100 250 180 255 240 240 C300 225 340 250 375 210 C405 175 400 110 365 75 C330 40 260 55 210 45 C155 34 110 25 75 60 Z" fill="#DFF4EA" opacity="0.85"/>
        <circle cx="55" cy="45" r="15" fill="#FFFFFF" opacity="0.55"/>
        <circle cx="400" cy="215" r="10" fill="#FFFFFF" opacity="0.45"/>
        <ellipse cx="220" cy="234" rx="150" ry="14" fill="#2F8F78" opacity="0.16"/>

        <!-- paper / chart card: fold top-left, 3-bar chart, navy trend arrow (matches reference design) -->
        <g transform="rotate(6 331 136)">
          <path d="M296 50 L372 50 A8 8 0 0 1 380 58 L380 206 A8 8 0 0 1 372 214 L292 214 A8 8 0 0 1 284 206 L284 62 Z"
                fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
          <path d="M284 62 L296 50 L296 58 A4 4 0 0 1 292 62 Z" fill="#DCE6EC"/>

          <rect x="296" y="166" width="13" height="22" rx="3" fill="#8FE0B8"/>
          <rect x="314" y="146" width="13" height="42" rx="3" fill="#5CCB95"/>
          <rect x="332" y="124" width="13" height="64" rx="3" fill="#239A6B"/>

          <path d="M295 180 L316 150 L332 161 L360 96" stroke="#26314B" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M360 96 L360 110 M360 96 L350 105" stroke="#26314B" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

          <rect x="296" y="194" width="50" height="5" rx="2.5" fill="#DCE3E9"/>
          <rect x="296" y="203" width="34" height="5" rx="2.5" fill="#DCE3E9"/>
        </g>
      </svg>

      <img class="illus-coins" src="Icons/coins-transparent.png" alt="">

      <!-- calculator: hand-built to match the reference design (4x4 button grid, solid screen highlight, no orange accent) -->
      <svg class="illus-calculator" viewBox="0 0 130 195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#6FDCC0"/>
            <stop offset="1" stop-color="#33A883"/>
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="127" height="192" rx="26" fill="#FCFDFD" stroke="#E4EAEF" stroke-width="1.5"/>
        <rect x="14" y="13" width="102" height="52" rx="18" fill="url(#screenGrad)"/>
        <rect x="76" y="24" width="30" height="16" rx="8" fill="#237A6E"/>

        <g fill="#26314B">
          <rect x="14" y="78" width="21" height="21" rx="6"/>
          <rect x="39.5" y="78" width="21" height="21" rx="6"/>
          <rect x="65" y="78" width="21" height="21" rx="6"/>
          <rect x="90.5" y="78" width="21" height="21" rx="6"/>

          <rect x="14" y="103.5" width="21" height="21" rx="6"/>
          <rect x="39.5" y="103.5" width="21" height="21" rx="6"/>
          <rect x="65" y="103.5" width="21" height="21" rx="6"/>
          <rect x="90.5" y="103.5" width="21" height="21" rx="6"/>

          <rect x="14" y="129" width="21" height="21" rx="6"/>
          <rect x="39.5" y="129" width="21" height="21" rx="6"/>
          <rect x="65" y="129" width="21" height="21" rx="6"/>

          <rect x="14" y="154.5" width="21" height="21" rx="6"/>
          <rect x="39.5" y="154.5" width="21" height="21" rx="6"/>
          <rect x="65" y="154.5" width="21" height="21" rx="6"/>

          <rect x="90.5" y="129" width="21" height="46.5" rx="6"/>
        </g>

        <g fill="#FFFFFF" font-family="'Segoe Print','Bradley Hand','Comic Sans MS',cursive" font-size="12" text-anchor="middle">
          <text x="24.5" y="93">÷</text>
          <text x="50" y="93">×</text>
          <text x="75.5" y="93">+</text>
          <text x="101" y="93">+</text>

          <text x="24.5" y="118.5">7</text>
          <text x="50" y="118.5">8</text>
          <text x="75.5" y="118.5">×</text>
          <text x="101" y="118.5">−</text>

          <text x="24.5" y="144" font-size="9" font-family="Arial, sans-serif">f(x)</text>
          <text x="50" y="144">9</text>
          <text x="75.5" y="144">×</text>

          <text x="24.5" y="169.5">0</text>
          <text x="50" y="169.5">.</text>
          <text x="75.5" y="169.5">−</text>
          <text x="101" y="156" font-size="15">+</text>
        </g>
      </svg>

      <img class="illus-leaves" src="Icons/leaves-transparent.png" alt="">

      <div class="hero-caption">
        Better<br>Money Decisions<br>A Brighter You
        <svg class="hero-caption-arrow" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 6 C34 20 26 28 10 30" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M18 25 L10 30 L19 34" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  `;
}

// All 4 Home sections now use the same sidebar+panel component as the
// dedicated pages — capped to a 4-card preview, with "View All" pointing at
// that category's own page (js/category-sidebar-page.js).
renderStaticIcons();
renderHeroArt();

initSidebarPanel({ groups: CATEGORIES, listId: 'financial-category-list', panelId: 'financial-panel', cap: VISIBLE_COUNT, viewAllHref: CATEGORY_PAGE_HREF.financial });
initSidebarPanel({ groups: FITNESS_SUBCATEGORIES, listId: 'fitness-category-list', panelId: 'fitness-panel', cap: VISIBLE_COUNT, viewAllHref: CATEGORY_PAGE_HREF.fitness });
initSidebarPanel({ groups: MATH_SUBCATEGORIES, listId: 'math-category-list', panelId: 'math-panel', cap: VISIBLE_COUNT, viewAllHref: CATEGORY_PAGE_HREF.math });
initSidebarPanel({ groups: OTHER_SUBCATEGORIES, listId: 'other-category-list', panelId: 'other-panel', cap: VISIBLE_COUNT, viewAllHref: CATEGORY_PAGE_HREF.other });
