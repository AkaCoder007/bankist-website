'use strict';

///////////////////////////////////////

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(function (item, i, arr) {
  item.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// COOKIES MESSAGE
const header = document.querySelector('header');
const message = document.createElement('div'); /// dom object
const clientHeight = document.documentElement.clientHeight;

header.append(message);
message.innerHTML = `We use cookies for better performance and User experience <button class='btn btn--close-cookie'>Got It!</button>`;
message.classList.add('cookie-message');
message.style.backgroundColor = '#021016fa';
message.style.borderRadius = '2px';
message.style.position = 'fixed';
message.style.opacity = '0.9';
message.style.height =
  Number(getComputedStyle(message).height.slice(0, -2)) + 60 + 'px';
message.style.top = `${
  clientHeight - message.getBoundingClientRect().height
}px`;

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    message.parentNode.removeChild(message);
  });

// document.documentElement.style.setProperty('--color-primary', 'rgb(0, 255, 109)');

// Changing Entire Logo
const logo = document.querySelector('.nav__logo');
const footerLogo = document.querySelector('.footer__logo');
logo.setAttribute('src', './img/logo.png');
footerLogo.setAttribute('src', './img/logo.png');
logo.style.transform = 'scale(1.4)';

///implementing Dark Mode
const darkModebtn = document.querySelector('.darkmode__checkbox');

const changingMode = function () {
  document.documentElement.classList.toggle('dark__theme');
  const inverted = document.querySelectorAll('img');
  inverted.forEach(image => image.classList.toggle('dark__theme'));
};
darkModebtn.addEventListener('change', changingMode);

//     fctionSignup.style.backgroundColor = "#0d1311";
// };

//
// // IMPLEMENTING smootch scroll for navigation
// const navLink = document.querySelectorAll('.nav__link').forEach(function(el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//
//         // console.log("link clicked");
//     })
// });

//Implementing Navigation scrolling by EVENT-DELEGATION
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const that = e.target;
  //MATCHING STRATEGY
  if (that.classList.contains('nav__link')) {
    document.querySelector(that.getAttribute('href')) &&
      document
        .querySelector(that.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
  }
});

// fade out in nav links
const nav = document.querySelector('nav');
const hoverFunc = function (e) {
  //MATCHING STRATEGY
  const that = e.target;
  if (!that.classList.contains('nav__link')) return;
  console.log(e.target);
  const siblings = that.closest('.nav').querySelectorAll('.nav__link');
  siblings.forEach(item => {
    if (item == that) console.log(item);
    if (item != that) {
      item.style.opacity = this;
    }
  });
  nav.querySelector('img').style.opacity = this;
  // console.log(this);
};
nav.addEventListener('mouseover', hoverFunc.bind(0.6));
nav.addEventListener('mouseout', hoverFunc.bind(1));

// Implementing smooth scrolling for LEARN MORE
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const sCoords = section1.getBoundingClientRect();
  // console.log(sCoords)
  window.scroll({
    left: sCoords.left,
    top: sCoords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

// Tabbed component of Operations
const section2 = document.querySelector('#section--2');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  //TABS SlIDING
  const that = e.target.closest('.operations__tab');
  if (!that) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  that.classList.add('operations__tab--active');

  //CONTAINERS ANIMATION
  tabContent.forEach(item =>
    item.classList.remove('operations__content--active')
  );
  // console.log(document.querySelector(`.${"operations__content--"+that.dataset.tab}`));
  document
    .querySelector(`.operations__content--${that.dataset.tab}`)
    .classList.add('operations__content--active');
});

// STICKY EVENT

/* METHOD-1 */
// const stickyEvenCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {

//     if (window.scrollY >= stickyEvenCords.top) {
//         nav.classList.add("sticky");
//         console.log("sticky fired");
//     } else {
//         nav.classList.remove("sticky");
//     }
// });

/* METHOD-2 */
const stickyNav = function (entries, observer) {
  // console.log(entries[0]);
  if (!entries[0].isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-' + getComputedStyle(nav).height,
});
headerObserver.observe(header);

// Revealing elements on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  section.classList.add('section--hidden');
});
const sectionCallback = (entries, observer) => {
  if (!entries[0].isIntersecting) return;
  entries[0].target.classList.remove('section--hidden');
  observer.unobserve(entries[0].target);
};

const sectionObserver = new IntersectionObserver(sectionCallback, {
  root: null,
  threshold: 0.05,
});
sections.forEach(section => {
  sectionObserver.observe(section);
});

// LAZY LOADING IMAGES IMPLEMENTATION

const section1Images = document.querySelectorAll('img[data-src]');
const imageRevealer = function ([entry], observer) {
  // console.log('image revealer', entry);
  if (!entry.isIntersecting) return;
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imageRevealObserver = new IntersectionObserver(imageRevealer, {
  root: null,
  threshold: 0.7,
  // rootMargin: "100px"
});
section1Images.forEach(image => {
  imageRevealObserver.observe(image);
});

//SLIDERS SECTION
// DOTS SLIDER
const dots = document.querySelector('.dots');
dots.addEventListener('click', function (e) {
  const currentEle = e.target;
  if (!currentEle.classList.contains('dots__dot')) return;
  const that = [...currentEle.parentNode.querySelectorAll('.dots__dot')];
  that.forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  currentEle.classList.add('dots__dot--active'); //making dot active
  const num = (Number(currentEle.dataset.index) - i) * 100;
  i = currentEle.dataset.index;
  sliderTransform(-num);
});
////CONTENT SECTION SLIDING
const slides = document.querySelectorAll('.slide');
const rightSlideBtn = document.querySelector('.slider__btn--right');
const leftSlideBtn = document.querySelector('.slider__btn--left');
const numSlides = slides.length;
console.log(slides.length);
let i = 0;
let yVal = 0;
let slideTrnsfmVal = [];
slides.forEach((slide, i) => {
  slideTrnsfmVal.push(yVal);
  slide.style.transform = `translateX(${yVal}%)`;
  yVal += 100;
});

const sliderTransform = num => {
  slides.forEach((slide, i) => {
    slideTrnsfmVal[i] += num;
    slide.style.transform = `translateX(${slideTrnsfmVal[i]}%)`;
  });
};
rightSlideBtn.addEventListener('click', function () {
  if (i == slides.length - 1) {
    sliderTransform(i * 100);
    i = 0;
  } else {
    sliderTransform(-100);
    i++;
  }
  dots.querySelectorAll('.dots__dot')[i].click();
});
leftSlideBtn.addEventListener('click', function () {
  if (i == 0) {
    i = slides.length - 1;
    sliderTransform(-i * 100);
  } else {
    sliderTransform(100);
    i--;
  }
  dots.querySelectorAll('.dots__dot')[i].click();
});

document.addEventListener('keydown', function (e) {
  console.log(e);
  e.key === 'ArrowLeft' && leftSlideBtn.click();
  e.key === 'ArrowRight' && rightSlideBtn.click();
});

///Lectures
//GOING downwards:child
// console.log(h1.parentElement)
// console.log(h1.parentNode.parentElement)
// console.log(h1.closest('.header').style.backgroundColor = "cyan")
// console.log(h1.closest('.header__title'))
