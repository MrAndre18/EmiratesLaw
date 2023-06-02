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

  $(elementBlockLists).slideUp(0)

  $(dropDown).on('click', e => {
    e.preventDefault()

    const dropDownCurrent = e.currentTarget,
          elementsBlock = $(dropDownCurrent).siblings('.drop-down__list')

    $(elementsBlock).slideToggle(400)
  })

  $(checkAllBtns).on('click', e => {
    const checkAll = $(e.currentTarget),
          listItemBlock = $(checkAll).parents('.first-level__item'),
          inputes = $(listItemBlock).find('.first-level__item-input, .second-level__item-input')
    
    if (checkAll.is(':checked')) {
      $(inputes).each((index, element) => {
        $(element).prop('checked', true)
      })
    } else {
      $(inputes).each((index, element) => {
        $(element).prop('checked', false)
      })
    }
  })

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

  //   $(document).on('click', e => {
  //     const activeBlocks = $('.drop-down__list.active'),
  //           target = e.target,
  //           targetElementsBlock = $(target).closest('.drop-down__list.active'),
  //           targetDropDown = $(target).closest('.drop-down.active')

  //     if (targetElementsBlock.length !==0 || targetDropDown.length !==0)
  //       return

  //     $(activeBlocks).each((index, element) => {
  //       const activeDropDown = $(element).siblings('.drop-down.active')

  //       $(activeDropDown).removeClass('active')
  //       $(element).removeClass('active')
  //     })
  //   })
  // }
})