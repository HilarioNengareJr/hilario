'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * NAVBAR
 * navbar toggle for mobile
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }


/**
 * SCROLL REVEAL
 * Apple-style staggered entrance on scroll
 */

const revealObserver = new IntersectionObserver(function (entries) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function observe(selector, { stagger = false, delay = 0 } = {}) {
  const els = [...document.querySelectorAll(selector)];
  els.forEach(function (el, i) {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (delay + (stagger ? i * 0.12 : 0)).toFixed(2) + 's';
    revealObserver.observe(el);
  });
}

// Resume
observe('#resume .section-subtitle');
observe('#resume .section-title', { delay: 0.12 });
observe('.resume-item', { stagger: true, delay: 0.15 });

// Services
observe('.service .title-wrapper');
observe('.service .slider-item', { stagger: true, delay: 0.12 });

// Skills
observe('#skills .section-subtitle');
observe('#skills .section-title', { delay: 0.12 });
observe('.skills-wrapper > div:first-child', { delay: 0.2 });
observe('.skills-list li', { stagger: true, delay: 0.2 });

// Portfolio
observe('.portfolio .title-wrapper');
observe('.portfolio .slider-item', { stagger: true, delay: 0.1 });

// Contact
observe('#contact .section-subtitle');
observe('#contact .section-title', { delay: 0.12 });
observe('.contact-item', { stagger: true, delay: 0.15 });

// Footer
observe('.footer-list', { stagger: true });
observe('.social-list', { delay: 0.24 });



/**
 * SECTION PROGRESS INDICATOR
 */

const progressDots = [...document.querySelectorAll('.progress-dot')];
const progressSections = progressDots.map(function (dot) {
  return document.querySelector(dot.getAttribute('href'));
});

function updateProgressDots() {
  const scrollMid = window.scrollY + window.innerHeight * 0.5;

  let activeIndex = 0;
  progressSections.forEach(function (section, i) {
    if (section && section.offsetTop <= scrollMid) activeIndex = i;
  });

  progressDots.forEach(function (dot, i) {
    dot.classList.toggle('active', i === activeIndex);
    dot.classList.toggle('passed', i < activeIndex);
  });
}

window.addEventListener('scroll', updateProgressDots);
updateProgressDots();



/**
 * PARALLAX BACKGROUND ORBS
 */

const bgOrb1 = document.querySelector('.bg-orb-1');
const bgOrb2 = document.querySelector('.bg-orb-2');
const bgOrb3 = document.querySelector('.bg-orb-3');

let parallaxTicking = false;

window.addEventListener('scroll', function () {
  if (!parallaxTicking) {
    window.requestAnimationFrame(function () {
      const y = window.scrollY;
      if (bgOrb1) bgOrb1.style.transform = `translateY(${y * 0.18}px)`;
      if (bgOrb2) bgOrb2.style.transform = `translateY(${-y * 0.12}px)`;
      if (bgOrb3) bgOrb3.style.transform = `translateY(${y * 0.09}px)`;
      parallaxTicking = false;
    });
    parallaxTicking = true;
  }
});



/**
 * SCROLL TO TOP
 */

const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



/**
 * SERVICE MODAL
 */

const serviceModal  = document.getElementById('service-modal');
const modalIconEl   = document.getElementById('modal-icon-el');
const modalTitleEl  = document.getElementById('modal-title');
const modalBodyEl   = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');

function openServiceModal(link) {
  modalIconEl.setAttribute('name', link.dataset.modalIcon || '');
  modalTitleEl.textContent = link.dataset.modalTitle || '';
  modalBodyEl.textContent  = link.dataset.modalBody  || '';
  serviceModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  serviceModal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.layer-link[data-modal-title]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    openServiceModal(link);
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeServiceModal);

serviceModal && serviceModal.addEventListener('click', e => {
  if (e.target === serviceModal) closeServiceModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeServiceModal();
});



