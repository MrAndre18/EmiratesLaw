import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin, 
  ClickScrollPlugin 
} from 'overlayscrollbars'

let scrollBaroptions = {
  scrollbars: {
    autoHide: 'scroll',
    clickScroll: true,
    autoHideDelay: 1500,
  }
}

OverlayScrollbars.plugin([SizeObserverPlugin, ClickScrollPlugin, ScrollbarsHidingPlugin])

$(() => {
  const dropDown = $('.drop-down'),
        elementBlockLists = $(dropDown).siblings('.drop-down__list'),
        checkAllBtns = $(elementBlockLists).find('.drop-down__list-select-all-input')

  if (!$(dropDown).length) return

  $(elementBlockLists).each((index, element) => {
    const customScrollbar = OverlayScrollbars(element, scrollBaroptions)
  })

  const countChoosedElems = list => {
    const dropDownCurrent = $(list).siblings('.drop-down'),
          dropDownText = $(dropDownCurrent).find('.drop-down__text'),
          CheckedCount = $(list).find('.first-level__item-input:checked, .second-level__item-input:checked').length

    if (!CheckedCount) {
      dropDownText.text($(dropDownCurrent).prop('name'))
      dropDownCurrent.removeClass('changed')
    } else {
      dropDownText.text(`Выбрано: ${CheckedCount}`)
      dropDownCurrent.addClass('changed')
    }
  }

  const setChoosedText = list => {
    const dropDownCurrent = $(list).siblings('.drop-down'),
          dropDownText = $(dropDownCurrent).find('.drop-down__text'),
          checkedItemLabel = $(list).find('.first-level__item-input:checked, .second-level__item-input:checked').parent('label')

    dropDownText.text($(checkedItemLabel).text())
  }

  const setChoosedElems = () => {
    $(elementBlockLists).each((index, element) => {
      const dropDownCurrent = $(element).siblings('.drop-down')
      
      if ($(dropDownCurrent).hasClass('multiple')) {
        const curListInputs = $(element).find('.first-level__item-input, .second-level__item-input')

        $(curListInputs).on('click', () => {
          countChoosedElems($(element))
        })
      }

      if ($(dropDownCurrent).hasClass('single')) {
        const curListInputs = $(element).find('.first-level__item-input, .second-level__item-input')

        $(curListInputs).on('click', () => {
          setChoosedText($(element))
        })
      }
    })
  }

  $(elementBlockLists).slideUp(0)

  $(document).on('click', e => {
    const activeBlocks = $('.drop-down__wrapper').has('.drop-down.active'),
          target = e.target

    $(activeBlocks).each((index, element) => {
      if (!$(element).is(target) && $(element).has(target).length === 0) {
        const activeDropDown = $(element).find('.drop-down.active')
        
        $(activeDropDown).trigger('click')
      }
    })
  })

  $(dropDown).on('click', e => {
    e.preventDefault()

    const dropDownCurrent = e.currentTarget,
          elementsBlock = $(dropDownCurrent).siblings('.drop-down__list')

    setTimeout(() => {
      $(elementsBlock).slideToggle(400)
      $(dropDownCurrent).toggleClass('active')
    }, 1)
  })

  $(checkAllBtns).on('click', e => {
    const checkAll = $(e.currentTarget),
          listItemBlock = $(checkAll).parents('.first-level__item'),
          inputes = $(listItemBlock).find('.first-level__item-input, .second-level__item-input'),
          curElemsList = $(listItemBlock).parents('.drop-down__list')
    
    if (checkAll.is(':checked')) {
      $(inputes).each((index, element) => {
        $(element).prop('checked', true)
      })
    } else {
      $(inputes).each((index, element) => {
        $(element).prop('checked', false)
      })
    }

    countChoosedElems(curElemsList)
  })

  setChoosedElems()



  // if ($(dropDown).length) {
  //   $(dropDown).on('click', e => {
  //     const dropDownCurrent = e.currentTarget,
  //           elementsBlock = $(dropDownCurrent).siblings('.drop-down__list'),
  //           currentItem = $(dropDownCurrent).find('.drop-down__text')

  //     e.preventDefault()

  //     // Разворачивание списка
  //     $(dropDownCurrent).toggleClass("active")

  //     if (elementsBlock) {
  //       if (!$(elementsBlock).hasClass('active')) {
  //         const elementsItems = $(elementsBlock).find('.drop-down__list-item')

  //         $(elementsItems).each((index, element) => {
  //           if ($(element).text() === $(currentItem).text())
  //             $(element).addClass('active')
  //         })

  //         $(elementsBlock).addClass("active")

  //         $(elementsItems).on('click', event => {
  //           if ($(event.currentTarget).text() !== $(currentItem).text()) {
  //             $(elementsItems).each((index, element) => {
  //               $(element).removeClass('active')
  //             })

  //             $(event.currentTarget).addClass('active')
  //           }

  //           // Выбор элемента
  //           $(currentItem).text($(event.currentTarget).text())

  //           $(dropDownCurrent).addClass("changed")
  //         })
  //       } else {
  //         $(elementsBlock).removeClass('active')
  //       }
  //     }
  //   })
  // }
})