'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Event Delegation: Implementing Page Navigation

// Not good for performance at scale
// const navLinks = document.querySelectorAll('.nav__link');
// navLinks.forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Better way of doing page navigation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Implementing Smooth Scrolling
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // only relative to the viewport, not document

  // OG way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

// Allows multiple event listener functions
const alertH1 = () => {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1); // doesn't need to be in this function
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// LECTURES

// Selecting Elements
console.log(document.documentElement); // the actual whole document
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // returns NodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating Elements
// .insertAdjacentHTML() -> refer back to Bankist App

const message = document.createElement('div'); // not yet in the DOM
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML = `<button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message); // inserts into DOM as FIRST child of header element
header.append(message); // now last child of header, but moved existing element instead of inserting
// header.append(message.cloneNode(true)); // true means all child elements will be copied

// header.before(message); // now truly before the header element
// header.after(message); // now truly after

// Deleting Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '105%';
console.log(message.style.color); // doesn't appear
console.log(message.style.backgroundColor); // appears

// console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Set global property of document (:root in style.css)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // jonas
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // full path
console.log(logo.getAttribute('src')); // relative path (relative to index.html)

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes
// must start with 'data'
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes() like for arrays

// DON'T USE THIS! -- overrides existing classes and allow only one class
// logo.className = 'jonas';

// OG way -- can only have one event listener function
// h1.onmouseenter = () => {
//   alert('addEventListener: Great! You are reading the heading :D');
// }

// Event Propagation in Practice

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // console.log(e.target);
  // console.log(e.currentTarget); // same as `this` keyword
  // console.log(e.currentTarget === this); // true
  // Stop propagation
  // e.stopPropagation(); // never arrives at the next elements (the parents)
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // console.log(e.target); // same target as nav__link and nav__links due to BUBBLING
  // console.log(e.currentTarget); // gives actual target
});

document.querySelector('.nav').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // console.log(e.target); // same target as nav__link and nav__links due to BUBBLING
  // console.log(e.currentTarget); // gives actual target of this element
});

// DOM Traversing
// const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // includes comments
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement); // direct parent

// closest parent that has `.header` in class
// .closest() will find parent no matter how far up the DOM tree
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)'; // will select itself

// Going sideways: siblings
console.log(h1.previousElementSibling); // null -> does not have a previous sibling
console.log(h1.nextElementSibling); // h4

// For nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // includes itself, an iterable into array
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    // el.style.transform = 'scale(0.5)';
  }
});

// Tabbed component

// Bad practice
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// Best practice: events delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return; // for null

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));

  // Handle active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Passing Arguments to Event Handlers

// Menu fade animation
const handleHover = function (e) {
  // console.log(this); // 0.5 or 1

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Use .bind() method instead -- passing "argument" into handler
// nav.addEventListener('mouseover', e => handleHover(e, 0.5));
// nav.addEventListener('mouseout', e => handleHover(e, 1));
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation

// This approach is not optimized for performance
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // should AVOID `scroll` event
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const obcCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obcCallback, obsOptions);
// observer.observe(section1);

const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  // stickyNav callback function gets called at threshold
  root: null, // must be an ancestor of element being observed
  threshold: 0, // how much of the element you see before it is triggered
  rootMargin: `-${nav.getBoundingClientRect().height}px`, // amount applied outside of target element
});
headerObserver.observe(header);

// Reveal Sections
// const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images

// Get all images with data-src and unblur
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Best to remove class only once the image is actually loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const maxSlides = slides.length;
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  // Functions
  const createDots = () => {
    // Create a dot element for each of the slides
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // Select by using the data-slide attribute
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
    currSlide = slide;
  };

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (currSlide >= maxSlides - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = () => {
    if (currSlide <= 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Building a Slider Component: Part 2
  document.addEventListener('keydown', function (e) {
    // if (e.code === 'ArrowLeft') {
    //   prevSlide();
    // }
    // if (e.code === 'ArrowRight') {
    //   nextSlide();
    // }
    // Short-circuiting approach
    e.code === 'ArrowLeft' && prevSlide();
    e.code === 'ArrowRight' && nextSlide();
  });

  // The dots (event delegation)
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Lifecycle DOM Events

// Does not wait for images and other external resources to load
// Execute code AFTER the DOM is available
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
