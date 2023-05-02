import Swiper from 'swiper/bundle'

$(() => {
  const easing = 'cubic-bezier(0.45, 0, 0.55, 1)'

  // Верхний слайдер главной
  if ($('.title-block__body').length) {
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
                      
                      ${console.log(Swiper)}
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
})