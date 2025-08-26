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
  element.classList.remove('to-top');
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
  element.classList.remove('from-bottom');
  element.classList.add('to-top');
};

window.addEventListener('load', () => {
  const nav = document.querySelector('[data-js="nav"]');
  const navItems = nav?.querySelectorAll('a');
  // const navWord1 = document.querySelector('[data-js="nav-word-1"]');
  // const navWord2 = document.querySelector('[data-js="nav-word-2"]');

  // if (!navItems || !navWord1 || !navWord2) return;
  if (!navItems) return;

  const sections = Array.from(navItems)
    .map((item) => document.querySelector(item.hash))
    .filter((section) => section instanceof HTMLElement);

  if (!sections) return;

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
              // if (link.hash === '#communication') {
              //   fromBottom(navWord1, 19);
              // }
              // if (link.hash === '#technology') {
              //   fromBottom(navWord2, 20);
              // }
              // if (
              //   link.hash === '#transformation' &&
              //   !navWord1.classList.contains('from-bottom') &&
              //   !navWord2.classList.contains('from-bottom')
              // ) {
              //   fromBottom(navWord1, 19);
              //   fromBottom(navWord2, 20);
              // }
            }
          });
        } else {
          navItems.forEach((link) => {
            if (link.hash === `#${sectionId}`) {
              link.classList.remove('is-active');

              // handle nav masks
              // if (
              //   link.hash === '#communication' &&
              //   navWord1.classList.contains('from-bottom')
              // ) {
              //   toTop(navWord1, 19);
              // }
              // if (
              //   link.hash === '#technology' &&
              //   navWord2.classList.contains('from-bottom')
              // ) {
              //   toTop(navWord2, 20);
              // }
              // if (
              //   link.hash === '#transformation' &&
              //   entry.boundingClientRect.top > 0
              // ) {
              //   toTop(navWord1, 19);
              //   toTop(navWord2, 20);
              // }
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
