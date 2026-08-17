function calcLinkMarkup(calc) {
  return `
    <a class="calc-link" href="calculator.html?slug=${calc.slug}&name=${encodeURIComponent(calc.name)}" target="_blank" rel="noopener">
      ${iconMarkup(calc.icon)}
      <span>${calc.name}</span>
    </a>
  `;
}

function groupMarkup(section) {
  return `
    <div class="calc-group">
      <div class="calc-group-header">
        <div class="category-icon-badge">${iconMarkup(section.icon)}</div>
        <h2>${section.label} <span class="calc-group-count">(${section.calculators.length})</span></h2>
      </div>
      <div class="calc-link-grid">
        ${section.calculators.map(calcLinkMarkup).join('')}
      </div>
    </div>
  `;
}

document.getElementById('brand-mark-icon').innerHTML = iconMarkup('calculator');
document.getElementById('all-calc-arrow').innerHTML = iconMarkup('arrowRight');
document.getElementById('footer-icon-1').innerHTML = iconMarkup('shield');
document.getElementById('footer-icon-2').innerHTML = iconMarkup('lightning');
document.getElementById('footer-icon-3').innerHTML = iconMarkup('heart');
document.getElementById('footer-icon-4').innerHTML = iconMarkup('sparkle');

document.getElementById('all-calcs-main').innerHTML = ALL_CALCULATORS_BY_SECTION.map(groupMarkup).join('');
