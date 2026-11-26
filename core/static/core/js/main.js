// The Opening: quiet motion. Content is visible without this file; it only adds polish.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Hero title: one span per letter so the words settle in like Oxman's.
  document.querySelectorAll('.split').forEach(function (el) {
    var text = el.textContent, i = 0;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(' ').forEach(function (word, w) {
      var wspan = document.createElement('span');
      wspan.style.whiteSpace = 'nowrap';
      wspan.setAttribute('aria-hidden', 'true');
      word.split('').forEach(function (c) {
        var s = document.createElement('span');
        s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i++);
        wspan.appendChild(s);
      });
      if (w) el.appendChild(document.createTextNode(' '));
      el.appendChild(wspan);
    });
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('loaded'); }); });

  // Contact: "You are…" shows one panel at a time.
  var buttons = document.querySelectorAll('.you-choices button');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      buttons.forEach(function (o) {
        var on = o === b;
        o.setAttribute('aria-expanded', String(on));
        document.getElementById(o.dataset.panel).classList.toggle('open', on);
      });
    });
  });
})();
