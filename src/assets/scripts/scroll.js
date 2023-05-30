let scrollPrev = 0,
    outPosition = 0,
    isScrolled = false,
    isHoverHeader = false

const header = $(".header"),
      headerHeight = $(header).outerHeight(),
      stickyNavBars = $('[data-type=js-sticky-nav-bar]'),
      stickyNavBarsTopPosition = stickyNavBars.length ? Number($(stickyNavBars[0]).css('top').slice(0, -2)) : 0,
      toTopBtn = $('.btn_to_top')
      
$(stickyNavBars).each((index, element) => {
  $(element).css('transition', $(header).css('transition'))
})

const setStickyNavBarTopPosition = position => {
  if (!stickyNavBars.length) return

  $(stickyNavBars).each((index, element) => {
    $(element).css('top', position)
  })
}

if ($(window).scrollTop() > $(window).height() / 15) {
  setStickyNavBarTopPosition(stickyNavBarsTopPosition + headerHeight)
  header.addClass("scrolled")
}

const changeHeaderBg = () => {
  if ($(window).scrollTop() > $(window).height() / 15) {
    header.addClass("scrolled")
  } else header.removeClass("scrolled")

  if (
    $(window).scrollTop() > scrollPrev &&
    !isScrolled &&
    !isHoverHeader
  ) {
    outPosition = $(window).scrollTop()
    isScrolled = true
  }

  if (
    $(window).scrollTop() > $(window).height() / 3 &&
    $(window).scrollTop() >= outPosition + 300 &&
    isScrolled &&
    !isHoverHeader
  ) {
    header.addClass("out")
    setStickyNavBarTopPosition(stickyNavBarsTopPosition)
    isScrolled = false
  } else if ($(window).scrollTop() < scrollPrev) {
    header.removeClass("out")
    setStickyNavBarTopPosition(stickyNavBarsTopPosition + headerHeight)
    isScrolled = false
  }

  scrollPrev = $(window).scrollTop()
}

const showHeader = e => {
  if (e.clientY < 10 ||
    e.currentTarget == $(header)[0]
  ) {
    setStickyNavBarTopPosition(stickyNavBarsTopPosition + headerHeight)
    header.removeClass("out")
    isScrolled = false
  }
}

$(window).on("scroll", changeHeaderBg)
$(window).on("mousemove", showHeader)
$(header).on("mousemove", () => { isHoverHeader = true})
$(header).on("mouseout", () => { isHoverHeader = false})

$(window).on("scroll", e => {
  if ($(e.currentTarget).scrollTop() > $(window).height())
    $(toTopBtn).addClass('visible')
  else $(toTopBtn).removeClass('visible')
})

$(toTopBtn).on('click', e => {
  e.preventDefault()

  $('html').animate({scrollTop: 0}, 1000)
})

export const scrollToAnchor = pageId => {
  const page = $(`#${pageId}`),
        buttons = $(page).find('[data-type=js-scroll-btn]'),
        targets = $(page).find('[data-type=js-anchor-block]'),
        buttonsItems = $(buttons).parent()

  $(window).on("scroll", () => {
    const scrollDistance = $(window).scrollTop()
    
    $(targets).each((index, target) => {
      if ($(target).offset().top <= scrollDistance + 1) {
        const targetBtn = $(page).find(`[data-type=js-scroll-btn][data-target=${$(target).data('ancor')}]`)

        $(buttonsItems).removeClass('accordion-item__active')
        $(targetBtn).parent().addClass('accordion-item__active')
      }
    })
  })
  
  $(buttons).on('click', e => {
    e.preventDefault()

    const targetID = $(e.currentTarget).data('target'),
          targetBlock = $(page).find(`[data-type=js-anchor-block][data-ancor=${targetID}]`)

    if (!targetBlock.length) return
    
    $('html, body').animate({
      scrollTop: $(targetBlock).offset().top
    }, 1000)
  })
}