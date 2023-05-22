$(() => {
  const images = $('[data-type=img-bg]')
  
  if ($(images).length) {
    $(images).each(function (index, element) {
      const img = $(element).find('img'),
            mask = $(element).data('mask')

      $(element).css({
        'background-image': `${mask}, url(${$(img).attr('src')})`
      })
    })
  }
})