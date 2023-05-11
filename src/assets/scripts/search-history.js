if (typeof localStorage === 'undefined') {
	alert("localStorage не работает!");
}

if ($("form[role=search]").width()) {
  const forms = $("form[role=search]")

  $(forms).on('submit', e => {
    e.preventDefault()
    
    const input = $(e.currentTarget).find('input[type=search]'),
          query = input.val()
    
    let path = '/search?=' + query

    //window.location.assign(window.location.protocol + "//" + window.location.host + path)
  })
}