/* =======================================================
  * Website Name: Urikon Digital Hub
  * Hosted: May 10 2026 with Bootstrap v5.3.8
  * Author: 
  * License: https://bootstrapmade.com/license/
  ======================================================== */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


/* =========================
   CUSTOM COURSE CAROUSEL
========================= */

const slider =
document.querySelector('.slider');

const prevBtn =
document.querySelector('.prev-btn');

const nextBtn =
document.querySelector('.next-btn');

const dotsContainer =
document.querySelector('.dots-container');

/* =========================
   ORIGINAL CARDS
========================= */

const originalCards =
Array.from(
  document.querySelectorAll('.slider .card')
);

/* =========================
   CLONE FIRST & LAST
========================= */

const firstClone =
originalCards[0].cloneNode(true);

const lastClone =
originalCards[
  originalCards.length - 1
].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slider.appendChild(firstClone);

slider.insertBefore(
  lastClone,
  originalCards[0]
);

/* =========================
   ALL CARDS
========================= */

const cards =
document.querySelectorAll('.slider .card');

/* =========================
   START POSITION
========================= */

let currentIndex = 1;

let autoSlide;

/* =========================
   CREATE DOTS
========================= */

originalCards.forEach((_, index) => {

  const dot =
  document.createElement('span');

  dot.classList.add('dot');

  if(index === 0){

    dot.classList.add('active');

  }

  dot.dataset.index = index;

  dotsContainer.appendChild(dot);

});

const dots =
document.querySelectorAll('.dot');

/* =========================
   CARD WIDTH
========================= */

function getCardWidth(){

  const card = cards[0];

  const style =
  window.getComputedStyle(card);

  const margin =
  parseInt(style.marginRight);

  return card.offsetWidth + margin;

}

/* =========================
   MOVE SLIDER
========================= */

function moveSlider(smooth = true){

  slider.style.transition =
  smooth
  ? 'transform 0.6s ease'
  : 'none';

  slider.style.transform =
  `translateX(-${
    currentIndex * getCardWidth()
  }px)`;

}

/* =========================
   UPDATE DOTS
========================= */

function updateDots(){

  dots.forEach(dot =>
    dot.classList.remove('active')
  );

  let realIndex =
  currentIndex - 1;

  if(realIndex >= originalCards.length){

    realIndex = 0;

  }

  if(realIndex < 0){

    realIndex =
    originalCards.length - 1;

  }

  dots[realIndex]
  .classList.add('active');

}

/* =========================
   NEXT
========================= */

function nextSlide(){

  if(currentIndex >= cards.length - 1)
  return;

  currentIndex++;

  moveSlider();

  updateDots();

}

/* =========================
   PREV
========================= */

function prevSlide(){

  if(currentIndex <= 0)
  return;

  currentIndex--;

  moveSlider();

  updateDots();

}

/* =========================
   TRANSITION END
========================= */

slider.addEventListener(
  'transitionend',
  () => {

    const currentCard =
    cards[currentIndex];

    if(currentCard.id === 'first-clone'){

      slider.style.transition =
      'none';

      currentIndex = 1;

      moveSlider(false);

    }

    if(currentCard.id === 'last-clone'){

      slider.style.transition =
      'none';

      currentIndex =
      originalCards.length;

      moveSlider(false);

    }

  }
);

/* =========================
   BUTTONS
========================= */

nextBtn.addEventListener(
  'click',
  () => {

    nextSlide();

    restartAutoSlide();

  }
);

prevBtn.addEventListener(
  'click',
  () => {

    prevSlide();

    restartAutoSlide();

  }
);

/* =========================
   DOT CLICK
========================= */

dots.forEach(dot => {

  dot.addEventListener(
    'click',
    () => {

      currentIndex =
      Number(dot.dataset.index) + 1;

      moveSlider();

      updateDots();

      restartAutoSlide();

    }
  );

});

/* =========================
   AUTO SLIDE
========================= */

function startAutoSlide(){

  autoSlide =
  setInterval(() => {

    nextSlide();

  }, 2500);

}

function restartAutoSlide(){

  clearInterval(autoSlide);

  startAutoSlide();

}

startAutoSlide();

/* =========================
   HOVER PAUSE
========================= */

slider.addEventListener(
  'mouseenter',
  () => {

    clearInterval(autoSlide);

  }
);

slider.addEventListener(
  'mouseleave',
  () => {

    startAutoSlide();

  }
);

/* =========================
   TOUCH SWIPE
========================= */

let startX = 0;

slider.addEventListener(
  'touchstart',
  (e) => {

    startX =
    e.touches[0].clientX;

  }
);

slider.addEventListener(
  'touchend',
  (e) => {

    let endX =
    e.changedTouches[0].clientX;

    if(startX - endX > 50){

      nextSlide();

    }

    if(endX - startX > 50){

      prevSlide();

    }

  }
);

/* =========================
   RESIZE FIX
========================= */

window.addEventListener(
  'resize',
  () => {

    moveSlider(false);

  }
);

/* =========================
   INITIAL LOAD
========================= */

moveSlider(false);

updateDots();


