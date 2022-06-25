document.addEventListener('DOMContentLoaded', () => {
  if (isStorageExist()) {
    localDataFromStorage()
    refreshDataBooks()

    document
      .querySelector('#input-book')
      .addEventListener('submit', (event) => {
        event.preventDefault()
        addBook()
      })

    document.querySelector('svg').addEventListener('click', () => {
      document.querySelector('#input-section').classList.toggle('show-section')
    })

    document
      .querySelector('#search-book')
      .addEventListener('submit', (event) => {
        event.preventDefault()
      })

    const inputSearch = document.querySelector('#input-search')
    inputSearch.addEventListener('keyup', () => {
      filterDataBooks(inputSearch.value)
    })
  } else {
    const errorStyle =
      '<style>#error-404{position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%)}#error-404 h1 {font-size: 64px;margin: 0;padding: 0}#error-404 p {text-align: center}</style>'
    const errorElement =
      "<div id='error-404'><h1>404</h1><p>Browser yang Anda gunakan tidak mendukung webStorage</p></div>"

    document.head.append(errorStyle)
    document.body.innerHTML = errorElement
  }
})
