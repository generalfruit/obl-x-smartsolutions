// Fade-in Animation beim Scrollen
window.addEventListener('scroll', function () {
  document.querySelectorAll('.fade-in').forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });

  // Parallax Roadmap
  const parallax = document.getElementById('parallax-bg');
  if (parallax) {
    const offset = window.scrollY;
    parallax.style.transform = 'translateY(' + offset * 0.3 + 'px)';
  }
});
