export const searchText = pageId => {
  const searchBtnBlock = $(`#${pageId}`).find('.laws-detail__search'),
      searchBtn = $(searchBtnBlock).find('.laws-detail__search-btn'),
      searchInput = $(searchBtnBlock).find('.laws-detail__search-input'),
      searchPrevResultBtn = $(searchBtnBlock).find('.laws-detail__search-navigation-prev'),
      searchNextResultBtn = $(searchBtnBlock).find('.laws-detail__search-navigation-next'),
      searchCloseBtn = $(searchBtnBlock).find('.laws-detail__search-close')

  const clearInput = () => {
    $(searchInput).val('')
  }

  const activateSearchInput = () => {
    $(searchBtnBlock).addClass('active')
    $(searchInput).prop('disabled', false)
  }

  const disactivateSearchInput = () => {
    $(searchBtnBlock).removeClass('active')
    $(searchInput).prop('disabled', true)
    clearInput()
  }

  disactivateSearchInput()

  $(searchBtn).on('click', activateSearchInput)

  $(searchCloseBtn).on('click', disactivateSearchInput)
}