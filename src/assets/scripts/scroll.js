let scrollPrev = 0,
    outPosition = 0,
    isScrolled = false,
    isHoverHeader = false

const header = $(".header"),
      headerHeight = $(header).outerHeight(),
      stickyNavBars = $('[data-type=js-sticky-nav-bar]'),
      stickyNavBarsTopPosition = Number($(stickyNavBars[0]).css('top').slice(0, -2))

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