(function () {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // One restrained entrance per section — not a fade on every card.
  var heads = Array.prototype.slice.call(document.querySelectorAll('.section-head'));
  if (heads.length) {
    heads.forEach(function (el) { el.classList.add('reveal'); });
    var headIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          headIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    heads.forEach(function (el) { headIo.observe(el); });
  }

  // Meaningful motion: the big stat numbers count up when they come into view.
  var stats = Array.prototype.slice.call(document.querySelectorAll('.big-stat-num'));
  if (!stats.length) return;
  var statIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      statIo.unobserve(entry.target);
      var el = entry.target;
      var raw = el.textContent.trim();
      var match = raw.match(/[\d,]+/);
      if (!match) return;
      var target = parseInt(match[0].replace(/,/g, ''), 10);
      var prefix = raw.slice(0, match.index);
      var suffix = raw.slice(match.index + match[0].length);
      var hasComma = match[0].indexOf(',') !== -1;
      var duration = 1200;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        el.textContent = prefix + (hasComma ? current.toLocaleString() : current) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  stats.forEach(function (el) { statIo.observe(el); });
})();
