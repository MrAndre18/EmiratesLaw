let scrollPrev = 0,
    outPosition = 0,
    isScrolled = false,
    isHoverHeader = false
const header = $(".header")

if ($(window).scrollTop() > $(window).height() / 15) 
  header.addClass("scrolled")

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
    $(window).scrollTop() >= outPosition + 400 &&
    isScrolled &&
    !isHoverHeader
  ) {
    header.addClass("out")
    isScrolled = false
  } else if ($(window).scrollTop() < scrollPrev) {
    header.removeClass("out")
    isScrolled = false
  }

  scrollPrev = $(window).scrollTop()
}

const showHeader = e => {
  if (e.clientY < 50 ||
    e.currentTarget == $(header)[0]
  ) {
    header.removeClass("out")
    isScrolled = false
  }
}

$(window).on("scroll", changeHeaderBg)
$(window).on("mousemove", showHeader)
$(header).on("mousemove", () => { isHoverHeader = true})
$(header).on("mouseout", () => { isHoverHeader = false})