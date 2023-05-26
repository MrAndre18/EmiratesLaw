const loader = $('.loader'),
      loaderProgress = loader.find('.progress-ring'),
      circle = loaderProgress.find('.progress-ring__circle'),
      radius = circle.attr('r'),
      circumference = 2 * Math.PI * radius,
      loaderDuration = 1500;

$(() => {
  circle.css("strokeDasharray", `${circumference} ${circumference}`)
  circle.css("strokeDashoffset", circumference)
  circle.css(
    "transition",
    `stroke-dashoffset ${loaderDuration}ms cubic-bezier(0.65, 0, 0.35, 1)`
  )
  circle.css("display", "block")

  function preloaderClose() {
    circle.css("strokeDashoffset", 0)

    setTimeout(() => {
      loader.addClass("hidden")
      $("body").css("overflow", "auto")
    }, loaderDuration)
  }

  setTimeout(() => {
    preloaderClose();
  }, 1)
})