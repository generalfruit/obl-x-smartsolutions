<script>
  // Smooth Parallax-Effekt
  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const roadmapBg = document.getElementById('roadmap-bg');
    if (roadmapBg) {
      roadmapBg.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
    }
  });
</script>
