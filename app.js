
  // Book Constructor 
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

  // Add Book To List
const addBookToList = function (book) {
  const list = document.getElementById('book-list')
    // Create tr element
  const row = document.createElement('tr')
    // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a/></td>
  `
    // Append row to book-list
  list.appendChild(row)

    // Toggle green/white to show "book added"
  row.style.backgroundColor = 'green'
  setTimeout(function() {
    row.style.backgroundColor = 'white'
  }, 1000)
}

  // Show Alert
const showAlert = function(message, className) {
    // Create div
  const div = document.createElement('div')
    // Add classes
  div.className = `alert ${className}`
    // Add text
  div.textContent = message
    // Get parent
  const container = document.querySelector('.container')
    // Get form
  const form = document.querySelector('#book-form')
    // Insert alert
  container.insertBefore(div, form)

    // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 1500)
}

const deleteBook = function(target) {

}

  // Clear Fields
const clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}


  // Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {

  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate book
  const book = new Book(title, author, isbn)

    // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    showAlert('Please fill in all fields', 'error')
  } else {
    // Add book to list
  addBookToList(book)
    // Add to LS
  addBookToLs(book)
    // Clear fields
  clearFields()
  }

  e.preventDefault()
})


document.querySelector('#book-list').addEventListener('click', function(e){
  if (e.target.className === 'delete') {
    
      // Remove from LS
    removeBook(e.target.parentElement.previousElementSibling.textContent)
    
      // Remove from DOM
    e.target.parentElement.parentElement.remove()
  
      // Alert book deleted
    showAlert('Book deleted', 'error')
  } 
  e.preventDefault()
})

  // Get books from LS
const getBooks = function() {
  let books 
  if (localStorage.getItem('books') === null) {
    books = []
  } else {
    books = JSON.parse(localStorage.getItem('books'))
  }
  return books
}

  // Display books from LS onLoad
const displayBooks = function() {
  const books = getBooks()
  books.forEach(addBookToList)
}

document.addEventListener('DOMContentLoaded', displayBooks)

  // Add book to LS
const addBookToLs = function(book) {
  const books = getBooks()

  books.push(book)

  localStorage.setItem('books', JSON.stringify(books))
}

  // Remove book from LS
const removeBook = function(isbn) {
  const books = getBooks()
  const nbooks = books.filter(book => book.isbn !== isbn)
  localStorage.setItem('books', JSON.stringify(nbooks))
}


