document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Layers with ScrollTrigger (without Lenis)
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 }
    ];
    layers.forEach((layerObj) => {
      const elements = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
      elements.forEach(el => el.style.willChange = 'transform');
      tl.to(
        elements,
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        0
      );
    });
  });

  // FPS Debug Overlay
  setTimeout(() => {
    const stats = document.createElement('div');
    stats.style.position = 'fixed';
    stats.style.top = '10px';
    stats.style.right = '10px';
    stats.style.padding = '5px 10px';
    stats.style.background = 'rgba(0,0,0,0.6)';
    stats.style.color = '#0ff';
    stats.style.fontSize = '12px';
    stats.style.fontFamily = 'monospace';
    stats.style.zIndex = '9999';
    document.body.appendChild(stats);

    let lastFrame = performance.now();
    let frames = 0;
    let fps = 0;
    function updateFPS() {
      const now = performance.now();
      frames++;
      if (now - lastFrame >= 1000) {
        fps = frames;
        frames = 0;
        lastFrame = now;
        stats.textContent = `FPS: ${fps}`;
      }
      requestAnimationFrame(updateFPS);
    }
    updateFPS();
  }, 500);

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');

  // Mobile Menu Toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuButton.classList.toggle('active');

      if (mobileMenu.classList.contains('open')) {
        mobileMenu.style.height = '0';
        mobileMenu.classList.remove('open');
      } else {
        mobileMenu.classList.add('open');
        mobileMenu.style.height = `${mobileMenu.scrollHeight}px`;
      }
    });
  }

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.classList.remove('active');
        mobileMenu.style.height = '0';
        mobileMenu.classList.remove('open');
      }
    });
  });

  // Smooth Scroll for nav links (native)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        targetSection.classList.add('section-highlight');
        setTimeout(() => {
          targetSection.classList.remove('section-highlight');
        }, 1000);
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightCurrentSection(window.scrollY);
  });

  // Highlight active section in navbar
  function highlightCurrentSection(scrollY) {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Make header text visible with animation
  setTimeout(() => {
    const headerText = document.querySelector('.text-6xl');
    if (headerText) {
      headerText.style.opacity = 1;
      headerText.style.transform = 'translateY(0)';
    }
  }, 300);
});

