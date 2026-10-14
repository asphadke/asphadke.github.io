(() => {
  const imageLink = document.querySelector('.project-image-link');
  const imageViewer = document.querySelector('.image-viewer');

  if (imageLink && imageViewer && typeof imageViewer.showModal === 'function') {
    imageLink.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      imageViewer.showModal();
    });

    imageViewer.addEventListener('click', (event) => {
      const bounds = imageViewer.getBoundingClientRect();
      if (event.target === imageViewer &&
          (event.clientX < bounds.left || event.clientX > bounds.right ||
           event.clientY < bounds.top || event.clientY > bounds.bottom)) {
        imageViewer.close();
      }
    });
  }

  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#site-nav');
  const navLinks = [...document.querySelectorAll('#site-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const year = document.querySelector('#year');

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${visible.target.id}`;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-18% 0px -64% 0px', threshold: [0.05, 0.25, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
