const listIncomplete = document.querySelector('#list-incomplete-book')
const listComplete = document.querySelector('#list-complete-book')
const bookId = "bookId"

function createElementBook(bookTitle, bookAuthor, bookYear, isComplete) {
    const elementBookTitle = document.createElement('h3')
    elementBookTitle.innerText = bookTitle

    const elementBookAuthor = document.createElement('p')
    elementBookAuthor.innerText = "Penulis : " + bookAuthor

    const elementBookYear = document.createElement('p')
    elementBookYear.innerText = "Tahun : " + bookYear

    const elementButtonTools = document.createElement('div')
    elementButtonTools.classList.add('button-tools')

    const elementButtonRemove = createRemoveButton()

    if (isComplete) {
        const elementButtonIncomplete = createCompleteButton()

        elementButtonTools.append(elementButtonIncomplete, elementButtonRemove)
    } else {
        const elementButtonComplete = createIncompleteButton()

        elementButtonTools.append(elementButtonComplete, elementButtonRemove)
    }

    const elementBook = document.createElement('div')
    elementBook.classList.add('book')
    elementBook.append(elementBookTitle, elementBookAuthor, elementBookYear, elementButtonTools)

    return elementBook
}

function createbutton(buttonTypeClass, eventListener) {
    const button = document.createElement('div')
    button.classList.add('button', buttonTypeClass)
    
    switch (buttonTypeClass) {
        case 'button-delete':
            button.innerText = 'Hapus Buku'
            break
        case 'button-complete':
            button.innerText = 'Belum Selesai Dibaca'
            break
        case 'button-incomplete':
            button.innerText = 'Selesai Dibaca'
            break
    }

    button.addEventListener('click', (event) => {
        eventListener(event)
        event.stopPropagation()
    })

    return button
}

function createRemoveButton() {
    return createbutton('button-delete', (event) => {
        if (confirm('Yakin?')) {
            const bookElement = event.target.parentElement.parentElement
            const bookPosition = findBookIndex(bookElement[bookId])
            books.splice(bookPosition, 1)
        
            bookElement.remove()
            updateDataToStorage()
        }
    })
}

function createIncompleteButton() {
    return createbutton('button-incomplete', (event) => {
        const bookElement = event.target.parentElement.parentElement
        const book = findBook(bookElement[bookId])
        book.isComplete = true

        updateDataToStorage()
        refreshDataBooks()
    })
}

function createCompleteButton() {
    return createbutton('button-complete', (event) => {
        const bookElement = event.target.parentElement.parentElement
        const book = findBook(bookElement[bookId])
        book.isComplete = false

        updateDataToStorage()
        refreshDataBooks()
    })
}

function addBook() {
    const inputTitle = document.querySelector('#input-title').value
    const inputAuthor = document.querySelector('#input-author').value
    const inputYear = document.querySelector('#input-year').value
    const inputIsComplete = document.querySelector('#input-is-complete').checked

    const newBook = createElementBook(inputTitle, inputAuthor, inputYear, inputIsComplete)
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, inputIsComplete)
    
    newBook[bookId] = bookObject.id
    books.push(bookObject)

    if (inputIsComplete) {
        listComplete.append(newBook)
    } else {
        listIncomplete.append(newBook)
    }

    document.querySelector('#input-title').value = ''
    document.querySelector('#input-author').value = ''
    document.querySelector('#input-year').value = ''
    document.querySelector('#input-is-complete').checked = false
    document.querySelector('#input-section').classList.toggle('show-section')
    
    updateDataToStorage()
}

function refreshDataBooks() {
    listIncomplete.innerHTML = ''
    listComplete.innerHTML = ''

    for (book of books) {
        const newBook = createElementBook(book.title, book.author, book.year, book.isComplete)
        newBook[bookId] = book.id

        if (book.isComplete)
            listComplete.append(newBook)
        else
            listIncomplete.append(newBook)
    }
}

function filterDataBooks(bookQuery) {
    const filterBooks = books.filter(
        (book) => book.title.toLowerCase().includes(bookQuery.toLowerCase())
    )

    listIncomplete.innerHTML = ''
    listComplete.innerHTML = ''

    for (book of filterBooks) {
        const newBook = createElementBook(book.title, book.author, book.year, book.isComplete)
        newBook[bookId] = book.id

        if (book.isComplete)
            listComplete.append(newBook)
        else
            listIncomplete.append(newBook)
    }
}