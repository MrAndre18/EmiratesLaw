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
              triggerItemContent = $(triggerItem).find('.accordion-item__content'),
              accordionBody = $(triggerItem).parent('.accordion')

        if ($(triggerItem).hasClass('accordion-item__active') && !$(accordionBody).hasClass('accordion_content'))
          return

        if ($(accordionBody).hasClass('accordion_content')) {
          $(items).each((index, item) => {
            if (item !== triggerItem[0]) {
              $(item).removeClass('accordion-item__active')
              $(item).find('.accordion-item__content').slideUp(400)
            }
          })

          $(triggerItem).toggleClass('accordion-item__active')

          if (triggerItemContent.length) {
            $(triggerItemContent).slideToggle(400)
          }

          return
        }
        
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