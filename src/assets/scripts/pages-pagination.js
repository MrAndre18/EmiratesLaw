$(() => {
  if($('.pages-pagination').width()) {
    const paginationBlocks = $('.pages-pagination')
    
    $(paginationBlocks).each(function (index, pagination) {
      const items = $(pagination).find('.pages-pagination__item'),
            background = $(pagination).find('.pages-pagination__items-bg'),
            btnPrev = $(pagination).find('.pages-pagination__button-prev'),
            btnNext = $(pagination).find('.pages-pagination__button-next')

      let currentItemPosition = $(pagination).find('.pages-pagination__item-current').offset().left

      $(background).offset({ left: currentItemPosition })

      const clearCurrent = () => {
        $(items).removeClass('pages-pagination__item-current')
      }

      const setCurrentPosition = () => {
        currentItemPosition = $(pagination).find('.pages-pagination__item-current').offset().left
        $(background).offset({ left: currentItemPosition })
      }

      const setPrevElement = () => {
        const currentElement = $(pagination).find('.pages-pagination__item-current'),
              prevElement = $(currentElement).prev('.pages-pagination__item')

        if ($(prevElement).width()) {
          clearCurrent()
          $(prevElement).addClass('pages-pagination__item-current')
          setCurrentPosition()
        }
      }

      const setNextElement = () => {
        const currentElement = $(pagination).find('.pages-pagination__item-current'),
              nextElement = $(currentElement).next('.pages-pagination__item')

        if ($(nextElement).width()) {
          clearCurrent()
          $(nextElement).addClass('pages-pagination__item-current')
          setCurrentPosition()
        }
      }
      
      $(items).on("mouseover", e => {
        const newPosition = $(e.currentTarget).offset().left

        $(background).offset({ left: newPosition})
      })

      $(items).on("mouseout", e => {
        $(background).offset({ left: currentItemPosition })
      })

      $(items).on("click", e => {
        clearCurrent()
        $(e.currentTarget).addClass('pages-pagination__item-current')
        setCurrentPosition()
      })

      $(btnPrev).on("click", setPrevElement)
      $(btnNext).on("click", setNextElement)
    });
  }
})