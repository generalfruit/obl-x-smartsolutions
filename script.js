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


<script>
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    function onScroll() {
      const scrollPos = window.scrollY + 100;
      navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute("href"));
        if (section) {
          if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
          ) {
            link.classList.add("text-cyan-400");
          } else {
            link.classList.remove("text-cyan-400");
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
  });
</script>
<!-- THREE.js + animierter Rubik-Würfel -->
<script src="https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js"></script>
<script>
  const canvas = document.getElementById('rubikCanvas');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const cubeGroup = new THREE.Group();
  const spacing = 0.35;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geom = new THREE.BoxGeometry(0.45, 0.45, 0.45);
const spacing = 0.5;
        const edges = new THREE.EdgesGeometry(geom);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const miniCube = new THREE.LineSegments(edges, material);
        miniCube.position.set(x * spacing, y * spacing, z * spacing);
        cubeGroup.add(miniCube);
      }
    }
  }

  scene.add(cubeGroup);

  // Startrotation und Position
  cubeGroup.rotation.set(Math.PI / 6, Math.PI / 3, Math.PI / 8);
  cubeGroup.position.x = 0.5;
  camera.position.z = 2;

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Responsives Verhalten
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
   const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.arrow.right');
  const prevBtn = document.querySelector('.arrow.left');
  let current = 0;
  let interval = setInterval(nextSlide, 5000);

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 12000);
  }
</script>
