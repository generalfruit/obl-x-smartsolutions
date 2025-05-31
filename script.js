document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Layers with ScrollTrigger
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

 

  // Nav Link Highlight on Scroll
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

  // THREE.js + Rubik Cube
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
  const spacing = 0.5;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geom = new THREE.BoxGeometry(0.45, 0.45, 0.45);
        const edges = new THREE.EdgesGeometry(geom);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const miniCube = new THREE.LineSegments(edges, material);
        miniCube.position.set(x * spacing, y * spacing, z * spacing);
        cubeGroup.add(miniCube);
      }
    }
  }

  scene.add(cubeGroup);

  cubeGroup.rotation.set(Math.PI / 6, Math.PI / 3, Math.PI / 8);
  cubeGroup.position.x = 0.5;
  camera.position.z = 2;

  function animate() {
    requestAnimationFrame(animate);
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // Slider
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

});
