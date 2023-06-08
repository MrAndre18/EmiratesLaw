import 'paginationjs'

$(() => {
  if(!$('[data-type=js-pagination]').length) return

  const paginationControls = $('[data-type=js-pagination]')
  
  $(paginationControls).each((index, pagination) => {
    const paginationContent = $(`[data-pagination-content=${$(pagination).data('paginationTarget')}]`),
          paginationContentItems = $(paginationContent).find('[data-type=pagination-item]').toArray(),
          pageSize = $(paginationContent).data('pageSize'),
          background = $(pagination).find('.pages-pagination__bg')

    const eventsFiltersBlock = $(paginationContent).find('.events__content-filters'),
          eventsTitleBlock = $(paginationContent).find('.events__content-title')

    const setCurrentPosition = () => {
      const items = $(pagination).find('.pages-pagination__item')

      let currentItemPosition = $(pagination).find('.pages-pagination__item-current').offset().left

      $(background).offset({ left: currentItemPosition })

      $(items).on("mouseover", e => {
        currentItemPosition = $(pagination).find('.pages-pagination__item-current').offset().left
        const newPosition = $(e.currentTarget).offset().left
  
        $(background).offset({ left: newPosition})
      })
  
      $(items).on("mouseout", e => {
        $(background).offset({ left: currentItemPosition })
      })
    }

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
        if (eventsFiltersBlock.length && eventsTitleBlock.length) {
          $(paginationContent).prepend($(eventsTitleBlock)[0])
          $(paginationContent).prepend($(eventsFiltersBlock)[0])
        }

        $(paginationContent).fadeOut(0)
        $(paginationContent).fadeIn(400)
      },

      afterPaging: () => {
        setCurrentPosition()

        if ($(window).scrollTop() > $(paginationContent).offset().top - 140) {
          $('html, body').animate({
            scrollTop: $(paginationContent).offset().top - 130
          }, 600)
        }
      },
    })
  })
})