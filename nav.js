document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-nav');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', function () {
    var open = panel.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      panel.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.navlink-dropdown').forEach(function (dd) {
    var trigger = dd.querySelector('.dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: hover)').matches) return;
      if (!dd.classList.contains('open')) {
        e.preventDefault();
        document.querySelectorAll('.navlink-dropdown.open').forEach(function (o) { o.classList.remove('open'); });
        dd.classList.add('open');
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.navlink-dropdown')) {
      document.querySelectorAll('.navlink-dropdown.open').forEach(function (o) { o.classList.remove('open'); });
    }
  });
});
