$(() => {
  const accordions = $('.accordion')
  
  if(accordions.length) {
    $(accordions).each((index, accordion) => {
      const triggers = $(accordion).find('.accordion-item__trigger'),
            items = $(accordion).find('.accordion-item'),
            activeItem = $(accordion).find('.accordion-item__active')

      const clearActive = () => {
        $(items).removeClass('accordion-item__active')
        $(items).find('.accordion-item__content').slideUp(400)
      }

      const showContent = trigger => {
        const triggerItem = $(trigger).parent('.accordion-item'),
              triggerItemContent = $(triggerItem).find('.accordion-item__content')

        if ($(triggerItem).hasClass('accordion-item__active'))
          return
        
        clearActive()
        $(triggerItem).addClass('accordion-item__active')

        if (triggerItemContent.length) {
          $(triggerItemContent).slideDown(400)
        }
      }

      $(activeItem).find('.accordion-item__content').slideDown(400)

      $(triggers).on('click', e => {
        e.preventDefault()

        showContent(e.currentTarget)
      })
    })
  }
})