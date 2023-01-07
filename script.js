const CARD_CONTAINER = document.querySelector('#card_container'); // select the card container
const CARDS = document.querySelectorAll('.card');                 // select all cards
const REMOVE_BTNS = document.querySelectorAll('.card-param-remove');         // select all remove buttons in every card
const OPEN_FORM_BTN = document.querySelector('#open_form');
const FORM_CONTAINER = document.querySelector('#form_container');

const FORM = document.querySelector('#form');

const FORM_ADD = document.querySelector('#add');
const FORM_NAME = document.querySelector('#book_name');
const FORM_AUTHOR = document.querySelector('#book_author');
const FORM_PAGE = document.querySelector('#book_pages');




// Open form 
OPEN_FORM_BTN.addEventListener('click', () => FORM_CONTAINER.classList.toggle('show'));



// Array of books

let library = [];


// Create book 

function Book(name, author, pages, status) {
  this.bookName = name;
  this.bookAuthor = author;
  this.bookPages = pages;
  this.bookStatus = status;
  this.id;
}

Book.prototype.createId = function () {
  if (library.length > 0) {
    let newId = Math.floor(Math.random() * 10000);
    library.forEach(obj => {
      if (obj.id !== newId) {
        this.id = newId;
      }
    })
  } else {
    this.id = 1;
  }
}


function createCard(obj) {
  let card =
    `<div class="card" id="${obj.id}">
      <section class="card-display">
        <section class="card-display-section">
          <h4>Name:</h4>
          <h4>${obj.bookName}</h4>
        </section>
        <section class="card-display-section">
          <h4>Author:</h4>
          <h4>${obj.bookAuthor}</h4>
        </section>
        <section class="card-display-section">
          <h4>Pages:</h4>
          <h4>${obj.bookPages}</h4>
        </section>
        <section class="card-display-section">
          <h4>Status:</h4>
          <h4>${obj.bookStatus}</h4>
        </section>
      </section>
      <section class="card-param">
        <button class="card-param-remove" id="remove">remove</button>
      </section>
    </div>`;

  CARD_CONTAINER.insertAdjacentHTML('beforeend', card);
}

function addBookToLibrary() {
  let name = FORM_NAME.value;
  let author = FORM_AUTHOR.value;
  let pages = FORM_PAGE.value;
  let status = false;

  let aBook = new Book(name, author, pages, status);
  aBook.createId();
  library.push(aBook);

  library.forEach(obj => createCard(obj));
}

FORM_ADD.addEventListener('click', function () {
  CARD_CONTAINER.innerHTML = '';
  addBookToLibrary();
  FORM_CONTAINER.classList.toggle('show');
  FORM.reset();
})

function removeBookFromLibrary(removedCard) {
  library = library.filter(obj => obj.id === removedCard.id);
}



// Remove a card when its 'remove' button is clicked
CARD_CONTAINER.addEventListener("click", (event) => {
  if (event.target.matches(".card-param-remove")) {
    event.target.parentElement.parentElement.remove();
    let removedCard = event.target.parentElement.parentElement;
    removeBookFromLibrary(removedCard);
  }
});