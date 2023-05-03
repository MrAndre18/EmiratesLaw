$(() => {
  const dropDown = $('.drop-down')

  if ($(dropDown).width()) {
    $(dropDown).click(e => {
      const dropDownCurrent = e.currentTarget,
            elementsBlock = $(dropDownCurrent).siblings('.drop-down__list'),
            currentItem = $(dropDownCurrent).find('.drop-down__text')

      e.preventDefault();

      // Разворачивание списка
      $(dropDownCurrent).toggleClass("active")

      if (elementsBlock) {
        if (!$(elementsBlock).hasClass('active')) {
          const elementsItems = $(elementsBlock).find('.drop-down__list-item button')

          $(elementsItems).each((index, element) => {
            if ($(element).text() === $(currentItem).text())
              $(element).closest('.drop-down__list-item').addClass('active')
          })

          $(elementsBlock).addClass("active")

          $(elementsItems).click(event => {
            if ($(event.currentTarget).text() !== $(currentItem).text()) {
              $(elementsItems).each((index, element) => {
                $(element).closest('.drop-down__list-item').removeClass('active')
              })

              $(event.currentTarget).closest('.drop-down__list-item').addClass('active')
            }

            // Выбор элемента
            $(currentItem).text($(event.currentTarget).text())
          })
        } else {
          $(elementsBlock).removeClass('active')
        }
      }
    })

    $(document).click(e => {
      const activeBlocks = $('.drop-down__list.active'),
            target = e.target,
            targetElementsBlock = $(target).closest('.drop-down__list.active'),
            targetDropDown = $(target).closest('.drop-down.active')

      if (targetElementsBlock.length !==0 || targetDropDown.length !==0)
        return

      $(activeBlocks).each((index, element) => {
        const activeDropDown = $(element).siblings('.drop-down.active')

        $(activeDropDown).removeClass('active')
        $(element).removeClass('active')
      })
    })
  }
})