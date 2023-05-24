$(() => {
  const tabs = $('[data-type=js-tabs]'),
        pages = $('.info__page')

  const showPage = (id) => {
    const curPage = $(`#${id}`)
    
    $(pages).removeClass('active')
    $(curPage).addClass('active')
  }

  const setPage = (params) => {
    const linkUrlParams = new URLSearchParams(params),
          urlParams = new URLSearchParams(window.location.search),
          curPage = urlParams.get('page'),
          newPage = linkUrlParams.get('page'),
          pathname = window.location.href.split('?')[0],
          hash = window.location.href.split('#')[1]
          
    if (curPage != newPage) {
      urlParams.set('page', newPage)
      const newUrl = `${pathname}` + `${urlParams.toString() ? '?' + urlParams.toString() : ''}` + `${hash ? '#' + hash : ''}`

      history.pushState({}, '', newUrl)
      showPage(newPage)
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
            $(element).click()
            showPage(newPage)
          }
        })
      }

      //setBgProperties(currentItemPosition, currentItemWidth)
      //setPage()

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

      // $(items).each((index, element) => {
      //   const linkUrlParams = new URLSearchParams($(element).find('a')[0].search),
      //         urlParams = new URLSearchParams(window.location.search),
      //         curPage = urlParams.get('page'),
      //         newPage = linkUrlParams.get('page')

      //   if (curPage == newPage) {
      //     $(element).click()
      //     showPage(newPage)
      //   }
      // })
      initialization()
    })
  }
  
  $(tabs).length ? setTabs() : null
})