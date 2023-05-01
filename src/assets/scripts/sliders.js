import Swiper from 'swiper/bundle'

const mainTopSlider = new Swiper('.title-block__slider', {
  // Optional parameters
  direction: 'horizontal',
  slideClass: 'title-block__content',
  wrapperClass: 'title-block__slider-wrapper',
  loop: true,
  speed: 400,
  effect: 'fade',
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: '.title-block__pages-number',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.title-block__navigation-next',
    prevEl: '.title-block__navigation-prev',
  },
})