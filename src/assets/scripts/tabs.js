$(() => {
  const tabs = $('[data-type=js-tabs]')
  
  if ($(tabs).length) {
    $(tabs).each(function (index, tab) {
      const items = $(tab).find('.tab'),
            background = $(tab).find('.tabs-bg')

      let currentItemPosition = $(tab).find('.current').offset().left,
          currentItemWidth = $(tab).find('.current').width()
          
      const setBgProperties = (position, width) => {
        $(background).offset({ left: position })
        $(background).width(width)
      }

      const clearCurrent = () => {
        $(items).removeClass('current')
      }

      const setCurrent = () => {
        currentItemPosition = $(tab).find('.current').offset().left
        currentItemWidth = $(tab).find('.current').width()

        setBgProperties(currentItemPosition, currentItemWidth)
      }

      setBgProperties(currentItemPosition, currentItemWidth)

      $(items).on("mouseover", e => {
        const newPosition = $(e.currentTarget).offset().left,
              newWidth = $(e.currentTarget).width()

        setBgProperties(newPosition, newWidth)
      })

      $(items).on("mouseout", e => {
        setBgProperties(currentItemPosition, currentItemWidth)
      })

      $(items).on("click", e => {
        clearCurrent()
        $(e.currentTarget).addClass('current')
        setCurrent()
      })
    });
    
  }
})