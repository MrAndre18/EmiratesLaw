import 'paginationjs'

$(() => {
  if(!$('[data-type=js-pagination]').length) return

  const paginationControls = $('[data-type=js-pagination]')
  
  $(paginationControls).each((index, pagination) => {
    const paginationContent = $(`[data-pagination-content=${$(pagination).data('paginationTarget')}]`),
          paginationContentItems = $(paginationContent).find('[data-type=pagination-item]').toArray(),
          pageSize = $(paginationContent).data('pageSize')

    $(pagination).pagination({
      dataSource: paginationContentItems,
      pageSize: pageSize,
      hideOnlyOnePage: true,
      ulClassName: 'pages-pagination__items',
      pageClassName: 'pages-pagination__item',
      prevClassName: 'pages-pagination__button-prev',
      nextClassName: 'pages-pagination__button-next',
      activeClassName: 'pages-pagination__item-current',
      disableClassName: 'pages-pagination__button-disabled',
      prevText: '<img class="pages-pagination__button-img svg", src="assets/images/svg/pagination-arrow.svg", alt="Prev"></img>',
      nextText: '<img class="pages-pagination__button-img svg", src="assets/images/svg/pagination-arrow.svg", alt="Prev"></img>',
      
      callback: (data, pagination) => {
        $(paginationContent).html(data)
      },
    })
  })




  // if($('.pages-pagination').length) {
  //   const paginationBlocks = $('.pages-pagination')
    
  //   $(paginationBlocks).each(function (index, pagination) {
  //     const items = $(pagination).find('.pages-pagination__item'),
  //           background = $(pagination).find('.pages-pagination__items-bg'),
  //           btnPrev = $(pagination).find('.pages-pagination__button-prev'),
  //           btnNext = $(pagination).find('.pages-pagination__button-next')

  //     let currentItemPosition = $(pagination).find('.pages-pagination__item-current').offset().left

  //     $(background).offset({ left: currentItemPosition })

  //     const clearCurrent = () => {
  //       $(items).removeClass('pages-pagination__item-current')
  //     }

  //     const setCurrentPosition = () => {
  //       currentItemPosition = $(pagination).find('.pages-pagination__item-current').offset().left
  //       $(background).offset({ left: currentItemPosition })
  //     }

  //     const setPrevElement = () => {
  //       const currentElement = $(pagination).find('.pages-pagination__item-current'),
  //             prevElement = $(currentElement).prev('.pages-pagination__item')

  //       if ($(prevElement).length) {
  //         clearCurrent()
  //         $(prevElement).addClass('pages-pagination__item-current')
  //         setCurrentPosition()
  //       }
  //     }

  //     const setNextElement = () => {
  //       const currentElement = $(pagination).find('.pages-pagination__item-current'),
  //             nextElement = $(currentElement).next('.pages-pagination__item')

  //       if ($(nextElement).length) {
  //         clearCurrent()
  //         $(nextElement).addClass('pages-pagination__item-current')
  //         setCurrentPosition()
  //       }
  //     }
      
  //     $(items).on("mouseover", e => {
  //       const newPosition = $(e.currentTarget).offset().left

  //       $(background).offset({ left: newPosition})
  //     })

  //     $(items).on("mouseout", e => {
  //       $(background).offset({ left: currentItemPosition })
  //     })

  //     $(items).on("click", e => {
  //       clearCurrent()
  //       $(e.currentTarget).addClass('pages-pagination__item-current')
  //       setCurrentPosition()
  //     })

  //     $(btnPrev).on("click", setPrevElement)
  //     $(btnNext).on("click", setNextElement)
  //   });
  // }
})