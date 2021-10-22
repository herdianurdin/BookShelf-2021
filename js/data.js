const keyBooks = "BOOKS"

let books = []

function isStorageExist() {
    if (typeof(Storage) === 'undefined') {
        return false
    }
    
    return true
}

function saveData() {
    const dataStringfy = JSON.stringify(books)

    localStorage.setItem(keyBooks, dataStringfy)
}

function localDataFromStorage() {
    const serializeData = localStorage.getItem(keyBooks)

    let dataParse = JSON.parse(serializeData)

    if (dataParse !== null) {
        books = dataParse
    }
}

function updateDataToStorage() {
    if (isStorageExist) {
        saveData()
    }
}

function composeBookObject(bookTitle, bookAuthor, bookYear, isComplete) {
    return {
        id: +new Date(),
        title: bookTitle,
        author: bookAuthor,
        year: parseInt(bookYear),
        isComplete
    }
}

function findBook(bookId) {
    for(book of books) {
        if (book.id === bookId)
            return book
    }

    return null
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index
        
        index++
    }

    return -1
}