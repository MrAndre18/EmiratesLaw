import { searchText } from './search-text.js'
import { scrollToAnchor } from './scroll.js'

$(() => {
  const tabs = $('[data-type=js-tabs]'),
        pages = $('.info__page'),
        tabsLinks = $('.info__page-link')

  const showPage = (id) => {
    const curPage = $(`#${id}`),
          backPageBtns = $(curPage).find('[data-type=js-btn-back]')
    
    $(backPageBtns).each((index, backBtn) => {
      const urlParams = new URLSearchParams(window.location.search),
            pathname = window.location.href.split('?')[0],
            hash = window.location.href.split('#')[1]

      urlParams.delete('detail')

      backBtn.href = `${pathname}` + `${urlParams.toString() ? '?' + urlParams.toString() : ''}` + `${hash ? '#' + hash : ''}`
    })

    $(pages).removeClass('active')
    $(pages).fadeOut(0)
    $(curPage).addClass('active')
    $(curPage).fadeIn(600)
  }

  const setPage = (params) => {
    const linkUrlParams = new URLSearchParams(params),
          urlParams = new URLSearchParams(window.location.search),
          curPage = urlParams.get('page'),
          newPage = linkUrlParams.get('page'),
          curDetail = urlParams.get('detail'),
          newDetail = linkUrlParams.get('detail'),
          pathname = window.location.href.split('?')[0],
          hash = window.location.href.split('#')[1]
    
    let is_new = false,
        id

    if (curPage != newPage) {
      urlParams.set('page', newPage)
      urlParams.delete('detail')

      is_new = true
      id = newPage
    } else if(!newDetail) {
      urlParams.delete('detail')

      is_new = true
      id = newPage
    } else if (curDetail != newDetail) {
      urlParams.set('detail', newDetail)

      is_new = true
      id = newDetail
    }

    if (is_new) {
      const newUrl = `${pathname}` + `${urlParams.toString() ? '?' + urlParams.toString() : ''}` + `${hash ? '#' + hash : ''}`

      history.pushState({}, '', newUrl)
      showPage(id)
      scrollToAnchor(id)
      searchText(id)
    }
  }

  const setTabs = () => {
    $(tabs).each((index, tab) => {
      const items = $(tab).find('.tab'),
            background = $(tab).find('.tabs-bg'),
            currentItem = $(tab).find('.current')[0]

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

      const initialization = () => {
        $(items).each((index, element) => {
          const linkUrlParams = new URLSearchParams($(element).find('a')[0].search),
                urlParams = new URLSearchParams(window.location.search),
                curPage = urlParams.get('page'),
                newPage = linkUrlParams.get('page')
  
          if (!curPage) {
            setBgProperties(currentItemPosition, currentItemWidth)
            setPage($(currentItem).find('a')[0].search)

            return
          }

          if (curPage == newPage) {
            $(element).trigger('click')
            setPage(urlParams.toString())
          }
        })
      }

      $(items).on("mouseover", e => {
        const newPosition = $(e.currentTarget).offset().left,
              newWidth = $(e.currentTarget).width(),
              curItem = $(tab).find('.current')[0]

        setBgProperties(newPosition, newWidth)
        $(e.currentTarget).addClass('focus')

        if ($(e.currentTarget)[0] !== curItem) {
          $(curItem).addClass('focus-out')
        } else {
          $(curItem).removeClass('focus-out')
        }
      })

      $(items).on("mouseout", e => {
        setBgProperties(currentItemPosition, currentItemWidth)
        $(e.currentTarget).removeClass('focus')
      })

      $(items).on("click", e => {
        e.preventDefault()

        clearCurrent()
        $(e.currentTarget).addClass('current')
        $(e.currentTarget).addClass('focus')
        $(e.currentTarget).removeClass('focus-out')
        setCurrent()

        setPage($(e.currentTarget).find('a')[0].search)
      })

      $(tab).on('mouseleave', e => {
        const curItem = $(tab).find('.current')[0]

        $(curItem).removeClass('focus-out')
      })

      initialization()
    })
  }
  
  $(tabs).length ? setTabs() : null

  $(tabsLinks).on('click', e => {
    e.preventDefault()
    
    setPage($(e.currentTarget)[0].search)
  })
})