let searchHistory = []
const queryesMaxCount = 6,
      searchHistoryBlocks = $('.serch-history')

if (!JSON.parse(localStorage.getItem("search-history")))
  localStorage.setItem("search-history", JSON.stringify(searchHistory))
else
  searchHistory = JSON.parse(localStorage.getItem("search-history"))

const ShowHistory = () => {
  $(searchHistoryBlocks).each(function (index, element) {
    let historyList = $(element).find('.serch-history__items')
    
    historyList.empty()

    $(searchHistory).each(function (queryIndex, queryElement) {
      let newItem

      if ($(element).hasClass('swiper'))
        newItem = `<a class='serch-history__item swiper-slide' href='/search?=${queryElement}'>${queryElement}</a>`
      else
        newItem = `<a class='serch-history__item' href='/search?=${queryElement}'>${queryElement}</a>`

      $(historyList).append(newItem)
    })
  })
}

if (searchHistory.length) {
  ShowHistory()
} else {
  $(searchHistoryBlocks).remove()
}

if ($("form[role=search]").width()) {
  const forms = $("form[role=search]")

  $(forms).on('submit', e => {
    e.preventDefault()
    
    const input = $(e.currentTarget).find('input[type=search]'),
          query = input.val()
    let path = window.location.pathname == '/laws' ? '/laws?=' + query : '/search?=' + query
    console.log("🚀 ~ file: search-history.js:44 ~ window.location:", window.location.search)

    if (query == "")
      return

    // Запись в LocalStorage
    try {
      if (searchHistory.length && searchHistory.length < queryesMaxCount) {
        // проверка на уникальность, записать, если кол-во < queryesMaxCount
        if ($.inArray( query, searchHistory) == -1)
          searchHistory.unshift(query)
      } else if (searchHistory.length == queryesMaxCount) {
        // проверка на уникальность, записать в начало, удалить последний, если кол-во == queryesMaxCount
        if ($.inArray( query, searchHistory) == -1) {
          searchHistory.pop()
          searchHistory.unshift(query)
        }
      } else {
        // Если нет элементов, то просто записать новый запрос
        searchHistory.unshift(query)
      }

      localStorage.setItem("search-history", JSON.stringify(searchHistory))
    } catch (e) {
      if (
        e.name == "QUOTA_EXCEEDED_ERR" || 
        e.name == "NS_ERROR_DOM_QUOTA_REACHED" || 
        e.name == "QuotaExceededError"
      ) {
        console.log('Не хватает места в LocalStorage!')
      }
    }

    window.location.assign(window.location.protocol + "//" + window.location.host + path)
  })
}