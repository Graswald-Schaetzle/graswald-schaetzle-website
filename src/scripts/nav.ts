import { gsap } from 'gsap';

// TODO: direction aware?
const fromBottom = (element: Element, percentage: number) => {
  gsap.fromTo(
    element,
    {
      clipPath: `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 100%, 100% 100%, 100% 100%, ${percentage}% 100%, ${percentage}% 100%, 0% 100%)`,
    },
    {
      clipPath: `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%, ${percentage}% 100%, 0% 100%)`,
      duration: 1,
    },
  );
  element.classList.add('from-bottom');
};

// TODO: direction aware?
const toTop = (element: Element, percentage: number) => {
  gsap.fromTo(
    element,
    {
      clipPath: `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%, ${percentage}% 100%, 0% 100%)`,
    },
    {
      clipPath: `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 0%, 100% 0%, 100% 0%, ${percentage}% 0%, ${percentage}% 100%, 0% 100%)`,
      duration: 1,
    },
  );
  element.classList.add('to-top');
};

window.addEventListener('load', () => {
  const nav = document.querySelector('[data-js="io-nav"]');
  const navItems = nav?.querySelectorAll('a');
  const navWord1 = document.querySelector('[data-js="nav-word-1"]');
  const navWord2 = document.querySelector('[data-js="nav-word-2"]');

  if (!navItems || !navWord1 || !navWord2) return;

  const sections = Array.from(navItems)
    .map((item) => document.querySelector(item.hash))
    .filter((section) => section instanceof HTMLElement);

  if (!sections) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            if (link.hash === `#${sectionId}`) {
              link.classList.add('is-active');

              // special handling for sticky introduction
              if (link.hash !== '#introduction') {
                navItems[0].classList.remove('is-active');
              }

              // handle nav masks
              if (link.hash === '#communication') {
                fromBottom(navWord1, 19);
              }
              if (link.hash === '#technology') {
                fromBottom(navWord2, 20);
              }
            }
          });
        } else {
          navItems.forEach((link) => {
            if (link.hash === `#${sectionId}`) {
              link.classList.remove('is-active');

              // handle nav masks
              if (
                link.hash === '#communication' &&
                navWord1.classList.contains('from-bottom')
              ) {
                toTop(navWord1, 19);
              }
              if (
                link.hash === '#technology' &&
                navWord2.classList.contains('from-bottom')
              ) {
                toTop(navWord2, 20);
              }
            }
          });

          // special handling for sticky introduction
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
      rootMargin: '-15% 0% -75% 0%',
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
});
