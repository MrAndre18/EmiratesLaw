$(() => {
  if ($('.marquee').length) {
    let marqueeGap = $('.marquee').width() * 0.6

    if ($('.marquee.about-marquee').width())
      marqueeGap = 0

    $('.marquee__text').marquee({
      duration: 15000,
      startVisible: true,
      duplicated: true,
      gap: marqueeGap,
      allowCss3Support: true,
    })
  }
})