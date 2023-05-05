import Swiper from 'swiper/bundle'

$(() => {
  // Верхний слайдер главной
  if ($('.title-block__body').width()) {
    const delay = 10000,
          slider = $('.title-block__body'),
          loading = $(slider).find('.title-block__pages-loading')

    const stopAnimation = () => {
      $(loading).stop()
      $(loading).css('width', 0)
    }

    const startLoading = () => {
      $(loading).animate({
        width: "100%"
      },
      {
        duration: delay,
        easing: "linear"
      })
    }

    const mainTopSlider = new Swiper('.title-block__body', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      speed: 400,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      simulateTouch: false,
      slidesPerView: 1,
      autoplay: {
        delay: delay,
      },
      updateOnWindowResize: false,
    
      // If we need pagination
      pagination: {
        el: '.title-block__pages-pagination',
        clickable: false,
        bulletClass: 'title-block__pages-item',
        bulletActiveClass: 'active',
        renderBullet: (index, className) => {
          return `<div class="${className}">
                    <p class="title-block__pages-number">0${(index + 1)}</p>
                    <p class="title-block__pages-text">
                      ${$($('.title-block__content')[index]).find('.title-block__content-subtitle').text()}
                    </p>
                  </div>`
        }
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.title-block__navigation-next',
        prevEl: '.title-block__navigation-prev',
      },

      on: {
        init: () => {
          startLoading()
        },
        slideChange: () => {
          stopAnimation()
          startLoading()
        },
      },
    })
  }

  // Слайдер справочной информации на главной
  if ($('.index-info__content').width()) {
    const mainInfoSlider = new Swiper('.index-info__content', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      speed: 400,
      effect: "slide",
      coverflowEffect: {
        rotate: 0,
        slideShadows: false,
      },
      centeredSlides: true,
      simulateTouch: false,
      slidesPerView: 3,
      updateOnWindowResize: false,
    
      // If we need pagination
      pagination: {
        el: '.index-info__content-pagination',
        clickable: true,
        bulletClass: 'content-pagination__item pagination-item',
        bulletActiveClass: 'pagination-item__active',
        dynamicBullets: true,
        dynamicMainBullets: 1,
        renderBullet: (index, className) => {
          return `<button class="${className}">
                    <div class="content-pagination__item-line pagination-item__line"></div>
                  </button>`
        }
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.content-navigation__btn-next',
        prevEl: '.content-navigation__btn-prev',
      },
    })
  }
})