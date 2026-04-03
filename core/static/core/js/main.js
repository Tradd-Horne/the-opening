/* ==========================================================================
   The Opening — Main JavaScript
   GSAP ScrollTrigger, SplitText, parallax, custom cursor, mobile menu
   ========================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       1. GSAP Registration
       ---------------------------------------------------------------------- */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* ----------------------------------------------------------------------
       2. Reduced Motion Check
       ---------------------------------------------------------------------- */
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    /* ----------------------------------------------------------------------
       3. SplitText Scroll Reveal
       ---------------------------------------------------------------------- */
    function initSplitTextReveal() {
        if (prefersReducedMotion) return;
        if (typeof SplitText === 'undefined') return;

        const elements = document.querySelectorAll('.split-text');

        elements.forEach(function (el) {
            // Mark as split so CSS makes it visible
            el.classList.add('is-split');

            const split = new SplitText(el, {
                type: 'chars,words',
                charsClass: 'split-char',
            });

            gsap.set(split.chars, { autoAlpha: 0 });

            gsap.to(split.chars, {
                autoAlpha: 1,
                duration: 0.3,
                stagger: 0.02,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom 30%',
                    scrub: 0.5,
                },
            });
        });
    }

    /* ----------------------------------------------------------------------
       4. Parallax Images
       ---------------------------------------------------------------------- */
    function initParallax() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        const images = document.querySelectorAll('.parallax-img');

        images.forEach(function (img) {
            const parent = img.parentElement;

            gsap.fromTo(
                img,
                { yPercent: -10 },
                {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        });
    }

    /* ----------------------------------------------------------------------
       5. Header Hide/Show on Scroll
       ---------------------------------------------------------------------- */
    function initHeaderScroll() {
        if (typeof gsap === 'undefined') return;

        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = 0;
        const threshold = 60;

        ScrollTrigger.create({
            start: 'top top',
            end: 'max',
            onUpdate: function (self) {
                const currentScrollY = self.scroll();
                const direction = self.direction;

                if (currentScrollY > threshold) {
                    if (direction === 1) {
                        // Scrolling down
                        header.classList.add('is-hidden');
                    } else {
                        // Scrolling up
                        header.classList.remove('is-hidden');
                    }
                } else {
                    header.classList.remove('is-hidden');
                }

                lastScrollY = currentScrollY;
            },
        });
    }

    /* ----------------------------------------------------------------------
       6. Hamburger Menu
       ---------------------------------------------------------------------- */
    function initMobileMenu() {
        const hamburger = document.querySelector('.nav__hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;

        if (!hamburger || !mobileMenu) return;

        function openMenu() {
            hamburger.classList.add('is-active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('is-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            body.classList.add('no-scroll');
        }

        function closeMenu() {
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('is-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            body.classList.remove('no-scroll');
        }

        function toggleMenu() {
            const isOpen = mobileMenu.classList.contains('is-open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        hamburger.addEventListener('click', toggleMenu);

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMenu();
                hamburger.focus();
            }
        });

        // Close when clicking a link inside mobile menu
        var menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ----------------------------------------------------------------------
       7. Smooth Scroll for Anchor Links
       ---------------------------------------------------------------------- */
    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');

        anchors.forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                });
            });
        });
    }

    /* ----------------------------------------------------------------------
       9. Footer Year
       ---------------------------------------------------------------------- */
    function initFooterYear() {
        var yearSpan = document.getElementById('footer-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    /* ----------------------------------------------------------------------
       10. Image Lazy Loading via IntersectionObserver
       ---------------------------------------------------------------------- */
    function initLazyLoading() {
        var lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            var img = entry.target;
                            // If using data-src pattern, swap it in
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            img.classList.add('is-loaded');
                            observer.unobserve(img);
                        }
                    });
                },
                {
                    rootMargin: '200px 0px',
                    threshold: 0.01,
                }
            );

            lazyImages.forEach(function (img) {
                observer.observe(img);
            });
        }
    }

    /* ----------------------------------------------------------------------
       11. Fade-Up Elements (IntersectionObserver)
       ---------------------------------------------------------------------- */
    function initFadeUp() {
        if (prefersReducedMotion) return;

        var fadeElements = document.querySelectorAll('.fade-up');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: '0px 0px -10% 0px',
                    threshold: 0.1,
                }
            );

            fadeElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: just show them
            fadeElements.forEach(function (el) {
                el.classList.add('is-visible');
            });
        }
    }

    /* ----------------------------------------------------------------------
       12. Pillar Section Animations
       ---------------------------------------------------------------------- */
    function initPillarAnimations() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        var pillars = document.querySelectorAll('.section--pillar');

        pillars.forEach(function (pillar) {
            var heading = pillar.querySelector('.pillar__heading');
            var question = pillar.querySelector('.pillar__question');
            var answer = pillar.querySelector('.pillar__answer');
            var border = pillar.querySelector('.pillar__border');

            if (border) {
                gsap.from(border, {
                    scaleX: 0,
                    transformOrigin: 'left center',
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: pillar,
                        start: 'top 80%',
                    },
                });
            }

            if (heading) {
                gsap.from(heading, {
                    autoAlpha: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: pillar,
                        start: 'top 75%',
                    },
                });
            }

            if (question) {
                gsap.from(question, {
                    autoAlpha: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: pillar,
                        start: 'top 70%',
                    },
                });
            }

            if (answer) {
                gsap.from(answer, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: pillar,
                        start: 'top 65%',
                    },
                });
            }
        });
    }

    /* ----------------------------------------------------------------------
       13. Work Card Stagger Animation
       ---------------------------------------------------------------------- */
    function initWorkCards() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        var cards = document.querySelectorAll('.work-card');
        if (cards.length === 0) return;

        gsap.from(cards, {
            autoAlpha: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.work-grid',
                start: 'top 80%',
            },
        });
    }

    /* ----------------------------------------------------------------------
       14. Team Member Animations
       ---------------------------------------------------------------------- */
    function initTeamAnimations() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        var members = document.querySelectorAll('.team-member');

        members.forEach(function (member) {
            gsap.from(member, {
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: member,
                    start: 'top 80%',
                },
            });
        });
    }

    /* ----------------------------------------------------------------------
       Initialise Everything on DOMContentLoaded
       ---------------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initFooterYear();
        initMobileMenu();
        initSmoothScroll();
        initLazyLoading();
        initFadeUp();

        // GSAP-dependent initialisations
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initHeaderScroll();
            initParallax();
            initSplitTextReveal();
            initPillarAnimations();
            initWorkCards();
            initTeamAnimations();
        }
    });

    /* ----------------------------------------------------------------------
       Refresh ScrollTrigger on window load (after images etc.)
       ---------------------------------------------------------------------- */
    window.addEventListener('load', function () {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
})();
