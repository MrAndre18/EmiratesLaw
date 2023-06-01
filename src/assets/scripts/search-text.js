//import Mark from '../../../node_modules/mark.js/dist/mark.min.js'
import Mark from "mark.js"

export const searchText = pageId => {
  const searchBtnBlock = $(`#${pageId}`).find('.laws-detail__search'),
        searchBtn = $(searchBtnBlock).find('.laws-detail__search-btn'),
        searchInput = $(searchBtnBlock).find('.laws-detail__search-input'),
        searchCloseBtn = $(searchBtnBlock).find('.laws-detail__search-close'),
        searchResultBtns = {
          block: $(searchBtnBlock).find('.laws-detail__search-navigation'),
          prev: $(searchBtnBlock).find('.laws-detail__search-navigation-prev'),
          next: $(searchBtnBlock).find('.laws-detail__search-navigation-next')
        },
        searchCountBlock = {
          block: $(searchBtnBlock).find('.laws-detail__search-result'),
          current: $(searchBtnBlock).find('.laws-detail__search-result-current'),
          total: $(searchBtnBlock).find('.laws-detail__search-result-total')
        }
  
  const pageContent = $(`#${pageId}`).find('.laws-detail__content')[0]

  let searchResultArr = [],
      resultCount = 0,
      currentResultNumber = 1

  const setTotalCount = count => {
    resultCount = count

    if (count == 0) {
      $(searchResultBtns.block).removeClass('active')
    } else {
      $(searchResultBtns.block).addClass('active')
    }

    searchCountBlock.total.text(count)
  }

  const selectHighlight = () => {
    const curResult = $(pageContent).find(`[data-search-number=${currentResultNumber}]`)

    $(curResult).addClass('selected')

    searchCountBlock.current.text(currentResultNumber)
  }

  const scrollToCurrentResult = () => {
    const selectedResult = $(pageContent).find('.highlight.selected')

    $('html, body').animate({
      scrollTop: $(selectedResult).offset().top - 130
    }, 400)
  }

  const clearInput = () => {
    const instance = new Mark(pageContent)
    
    instance.unmark()
    $(searchInput).val('')
  }

  const activateSearchInput = () => {
    $(searchBtnBlock).addClass('active')
    $(searchInput).prop('disabled', false)
    $(searchInput).trigger('focus')
  }

  const disactivateSearchInput = () => {
    $(searchCountBlock.block).removeClass('active')
    $(searchResultBtns.block).removeClass('active')
    $(searchBtnBlock).removeClass('active')
    $(searchInput).prop('disabled', true)
    clearInput()
  }

  const highlightSearch = text => {
    const instance = new Mark(pageContent)

    instance.unmark()
    instance.mark(text, {
      "element": "mark",
      "className": "highlight",
      "each": (node) => {
        searchResultArr.push(node)
      },
      "done": (counter) => {
        setTotalCount(counter)
      },
    })

    $(searchResultArr).each((index, element) => {
      $(element).attr('data-search-number', index + 1)
      $(element).removeClass('selected')
    })

    if (resultCount) {
      selectHighlight()
      scrollToCurrentResult()
    }
  }

  disactivateSearchInput()

  $(searchBtn).on('click', e => {
    activateSearchInput()

    searchResultArr = []
    resultCount = 0
    currentResultNumber = 1

    if ($(searchInput).val())
      $(searchCountBlock.block).addClass('active')
    else
      $(searchCountBlock.block).removeClass('active')

    highlightSearch($(searchInput).val())
  })

  $(searchCloseBtn).on('click', disactivateSearchInput)

  $(searchResultBtns.prev).on('click', () => {
    if (currentResultNumber == 1)
      currentResultNumber = resultCount
    else
      currentResultNumber--
    
    $('.highlight').removeClass('selected')

    selectHighlight()
    scrollToCurrentResult()
  })

  $(searchResultBtns.next).on('click', () => {
    if (currentResultNumber == resultCount)
      currentResultNumber = 1
    else
      currentResultNumber++
    
    $('.highlight').removeClass('selected')

    selectHighlight()
    scrollToCurrentResult()
  })

  $(searchInput).on('keydown', e => {
    if (e.code === 'Enter')
      $(searchBtn).trigger('click')
  })
}