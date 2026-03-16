document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const increment = Math.max(1, Math.floor(target / 60));
    let count = 0;
    const update = () => {
      count += increment;
      if (count >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = count;
        requestAnimationFrame(update);
      }
    };
    update();
  };

  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));
  }

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const yearTargets = document.querySelectorAll('[data-year]');
  yearTargets.forEach(el => el.textContent = new Date().getFullYear());
});
