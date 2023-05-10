$(() => {
  // Параллакс внутри блока
  if ($('.parallax__inner').width()) {
    const wrapper = $('.parallax__inner')

    const initParallax = e => {
      const layers = $(e.currentTarget).find('.parallax__layer')

      const clientX = e.clientX,
            clientY = e.clientY

      const parallaxLeftOffset = e.currentTarget.getBoundingClientRect().left,
            parallaxTopOffset = e.currentTarget.getBoundingClientRect().top,
            coordX = clientX - parallaxLeftOffset - (0.5 * e.currentTarget.offsetWidth),
            coordY = clientY - parallaxTopOffset - (0.5 * e.currentTarget.offsetHeight)

      $(layers).each((index, layer) => {
        const layerSpeed = layer.dataset.speed,
              x = - (coordX * layerSpeed).toFixed(2),
              y = - (coordY * layerSpeed).toFixed(2)

        layer.setAttribute('style', `transform: translate(${x}px, ${y}px);`)
      })
    }

    const stopParallax = e => {
      const layers = $(e.currentTarget).find('.parallax__layer')

      $(layers).each((index, layer) => {
        layer.setAttribute('style', `transform: translate(0px, 0px);`)
      })
    }

    $(wrapper).on('mousemove', initParallax)
    $(wrapper).on('mouseout', stopParallax)
  }
})