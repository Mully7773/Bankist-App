'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scrolling:
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //shows how far down the page we've scrolled x and y

  console.log(
    //shows height and width of the current viewport
    'height/width viewport',
    //clientHeight does not include scrollbars
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling - Old Way: scroll to the left and top of the position
  //of s1coords (section1); however, we must make it relative to the top of the page, not the viewport, so we add the X and Y offset
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  //   );
  //to make smoothscrolling, use an object literal
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  //New Way:
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //prevents anchor tags from working
//     const id = this.getAttribute('href'); //used to grab id names from hrefs (this refers to the element onto which the event handler is placed)
//     console.log(this);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation:
// - (this method is better than attaching the same event handler to multiple elements)
// 1. Add event listener to common parent element
// 2. Determine what element began the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component:

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //closest parent with that class name is the button itself
  console.log(clicked);

  //Guard clause
  //used to prevent null error when tabsContainer is clicked
  if (!clicked) return;
  //clear the class from all of them and add it on one of them to prevent them all from moving up (active tab)
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //remove active classes
  console.log(clicked.dataset.tab);
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));

  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Nav Menu fade animation:

const handleHover = function (e, opacity) {
  console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    //can use 'this' instead of 'opacity'
    logo.style.opacity = this;
  }
};

//Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation:
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  //if isIntersection is false
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //when zero percent of the header is visible we want to display the navbar
  rootMargin: `-${navHeight}px`,
  //nav will appear exactly 90px before the threshold is reached - comes from getBoundingClientRect() - need negative because we want to move backward into the header
});
headerObserver.observe(header);

// Reveal sections on scroll
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //guard clause, if it is not intersecting in the viewport, return
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  //disconnects observe mode
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//Lazy loading images
//way to select CSS/HTML data attributes
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  //loads pictures 200px before we reach them
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
//slides is a nodelist so we can read length on it
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.3)';
// slider.style.overflow = 'visible';

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
//first slide at 0, second 100, third, 200, fourth 300 percents
//goToSlide(0) replaces above code - establishes original slide position upon load

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
//Go to next slide
const nextSlide = function () {
  //slide back to first slide
  //- 1 to make it zero-based
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
//Go to previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
//curSlide = 1: -100%, 0%, 100%, 200%
btnLeft.addEventListener('click', prevSlide);
