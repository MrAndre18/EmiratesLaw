$(() => {
  const marqueeGap = $('.marquee').width() * 0.6

  if ($('.marquee').width()) {
    $('.marquee__text').marquee({
      duration: 15000,
      startVisible: true,
      duplicated: true,
      gap: marqueeGap,
      allowCss3Support: true,
    })
  }
})