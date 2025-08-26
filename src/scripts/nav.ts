window.addEventListener('load', () => {
  const nav = document.querySelector('[data-js="nav"]');
  const navItems = nav?.querySelectorAll('a');
  const navMask1 = document.querySelector('[data-js="nav-mask-1"]');
  const navMask2 = document.querySelector('[data-js="nav-mask-2"]');

  if (!navItems || !navMask1 || !navMask2) return;

  const sections = Array.from(navItems)
    .map((item) => document.querySelector(item.hash))
    .filter((section) => section instanceof HTMLElement);

  if (!sections) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navMask1.classList.add('is-scrolled');
      navMask2.classList.add('is-scrolled');
    } else {
      navMask1.classList.remove('is-scrolled');
      navMask2.classList.remove('is-scrolled');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          navItems.forEach((link, i) => {
            if (link.hash === `#${sectionId}`) {
              link.classList.add('is-active');

              // special handling for first sticky section
              if (i > 0) {
                navItems[0].classList.remove('is-active');
              }

              // handle nav masks
              if (i === 1) {
                navMask1.classList.add('is-visible');
              }
              if (i === 2) {
                navMask2.classList.add('is-visible');
              }
              if (i === 3) {
                navMask1.classList.add('is-visible');
                navMask2.classList.add('is-visible');
              }
            }
          });
        } else {
          navItems.forEach((link, i) => {
            if (link.hash === `#${sectionId}`) {
              link.classList.remove('is-active');

              // handle nav masks
              if (i === 1) {
                navMask1.classList.remove('is-visible');
              }
              if (i === 2) {
                navMask2.classList.remove('is-visible');
              }
              if (i === 3 && entry.boundingClientRect.top > 0) {
                navMask1.classList.remove('is-visible');
                navMask2.classList.remove('is-visible');
              }
            }
          });

          // special handling for first sticky section
          if (
            !Array.from(navItems).some((link) =>
              link.classList.contains('is-active'),
            ) &&
            window.scrollY < window.innerHeight
          ) {
            navItems[0].classList.add('is-active');
          }
        }
      });
    },
    {
      rootMargin: '-25% 0% -75% 0%',
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
});
