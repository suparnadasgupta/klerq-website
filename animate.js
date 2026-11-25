(function () {
  var selector = '.section-head, .pillar-card, .role-card, .flow-step, .quote-card, .sec-card, .timeline .tstep, .roi-card, .photo-card, .dir-chip, .stat-chip, .col3 .col';
  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!els.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  els.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + 's';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });
})();
