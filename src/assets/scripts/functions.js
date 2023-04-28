/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export const isWebp = () => {
  // Проверка поддержки webp
  const testWebP = ( callback ) => {
    let webP = new Image()
    webP.onload = webP.onerror = () => {
      callback(webP.height == 2)
    }
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
  }

  // Добавление класса webp или no-webp для HTML
  testWebP(( support ) => {
    let className = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className)
  })
}
