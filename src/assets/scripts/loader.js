import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin, 
  ClickScrollPlugin 
} from 'overlayscrollbars'

let scrollBaroptions = {
  overflow: {
    x: 'scroll',
    y: 'hidden',
  },
  scrollbars: {
    autoHide: 'scroll',
    clickScroll: true,
    autoHideDelay: 3000,
  }
}

const customScrollbar = OverlayScrollbars($('body')[0], scrollBaroptions)

OverlayScrollbars.plugin([SizeObserverPlugin, ClickScrollPlugin, ScrollbarsHidingPlugin])

const loader = $('.loader'),
      loaderProgress = loader.find('.progress-ring'),
      circle = loaderProgress.find('.progress-ring__circle'),
      radius = circle.attr('r'),
      circumference = 2 * Math.PI * radius,
      loaderDuration = 1500

$(() => {
  $('html').attr('data-overlayscrollbars-overflow-y', 'hidden')
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
      $('body').css("overflow", "")
      customScrollbar.options({overflow: {
        x: 'scroll',
        y: 'scroll',
      }})
    }, loaderDuration)
  }

  setTimeout(() => {
    preloaderClose();
  }, 1)
})