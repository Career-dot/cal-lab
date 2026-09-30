// Mobile hamburger menu for the site header
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  var brand = header.querySelector('.brand');
  brand.insertAdjacentElement('afterend', btn);
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
  });
})();

// Scale the hero illustration so it never gets cut off on small screens
(function () {
  var NATURAL_W = 450, NATURAL_H = 270;
  function fit() {
    var art = document.getElementById('hero-art');
    var ill = art && art.querySelector('.hero-illustration');
    var hero = document.querySelector('.hero');
    if (!ill || !hero) return;
    var cs = getComputedStyle(hero);
    var avail = hero.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var row = cs.flexDirection === 'row';
    if (row) {
      var copy = hero.querySelector('.hero-copy');
      avail = Math.max(avail - copy.offsetWidth - parseFloat(cs.columnGap || 0), 0);
    }
    var s = Math.min(1, avail / NATURAL_W) || 1;
    ill.style.transform = 'scale(' + s + ')';
    art.style.width = NATURAL_W * s + 'px';
    art.style.height = NATURAL_H * s + 'px';
  }
  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  fit();
})();
