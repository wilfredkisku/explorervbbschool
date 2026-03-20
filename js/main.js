document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.custom-navbar');
  const backToTop = document.querySelector('.back-to-top');
  const activePath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if ((activePath === '' || activePath === 'index.html') && href === 'index.html') link.classList.add('active');
    else if (href && href.endsWith(activePath)) link.classList.add('active');
  });
  const onScroll = () => {
    if (window.scrollY > 24) nav?.classList.add('scrolled'); else nav?.classList.remove('scrolled');
    if (window.scrollY > 320) backToTop?.classList.add('show'); else backToTop?.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll); onScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  document.querySelectorAll('.counter').forEach(counter => {
    const target = Number(counter.dataset.target || 0);
    let started = false;
    const run = () => {
      if (started) return; started = true;
      let val = 0; const inc = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        val += inc; if (val >= target) { counter.textContent = target; return; }
        counter.textContent = val; requestAnimationFrame(tick);
      }; tick();
    };
    const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { run(); obs.disconnect(); } }, {threshold:.35});
    obs.observe(counter);
  });

  const highlight = document.querySelector('[data-highlight-rotator]');
  if (highlight) {
    const items = JSON.parse(highlight.getAttribute('data-items') || '[]');
    let idx = 0;
    if (items.length) {
      highlight.textContent = items[0];
      setInterval(() => {
        idx = (idx + 1) % items.length;
        highlight.style.opacity = 0;
        setTimeout(() => {
          highlight.textContent = items[idx];
          highlight.style.opacity = 1;
        }, 180);
      }, 3000);
    }
  }

  const hero = document.querySelector('#schoolHeroCarousel');
  if (hero && window.bootstrap && bootstrap.Carousel) {
    const carousel = bootstrap.Carousel.getOrCreateInstance(hero, { interval: 4200, ride: 'carousel', pause: false, touch: true, wrap: true });
    let touchStartX = 0;
    hero.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive:true});
    hero.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 40) diff < 0 ? carousel.next() : carousel.prev();
    }, {passive:true});
  }
});
