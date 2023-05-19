$(() => {
  const curPathname = window.location.pathname,
        curHash = window.location.hash,
        navButtons = $('.navigation__item')

  $(navButtons).each(function (index, element) {
    const link = element.querySelector('.navigation__item-link')
    
    if (link.hash) {
      if (link.pathname == curPathname && link.hash == curHash)
        $(element).addClass('active')
    } else {
      if (link.pathname == curPathname)
        $(element).addClass('active')
    }
  });
})