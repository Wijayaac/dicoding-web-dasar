"use-strict";
class BookShelf {
  constructor() {
    this.books = [];
    this.init();

    this.formElm;
    this.inputTitle;
    this.inputAuthor;
    this.inputYear;
    this.inputIsComplete;

    this.formSearch = document.querySelector("#search-book");
    this.inputSearch = this.formSearch.querySelector("#searchBookTitle");

    this.bookLists = document.querySelector("#book-list");
    this.readBookLists = document.querySelector("#read-book-list");
  }

  init() {
    this.loadData();
    this.inputBook();
    this.searchBook();
  }

  inputBook() {
    this.formElm = document.querySelector("#input-book");

    if (!this.formElm) {
      return;
    }

    this.formElm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addBook();
    });
  }

  addBook() {
    const id = this.getRandomId();
    this.inputTitle = this.formElm.querySelector("#inputBookTitle").value;
    this.inputAuthor = this.formElm.querySelector("#inputBookAuthor").value;
    this.inputYear = this.formElm.querySelector("#inputBookYear").value;
    this.inputIsComplete = this.formElm.querySelector(
      "#inputBookIsComplete"
    ).checked;

    const book = this.getBookObject(
      id,
      this.inputTitle,
      this.inputAuthor,
      this.inputYear,
      this.inputIsComplete
    );

    this.books.push(book);

    document.dispatchEvent(new Event(ConstantData.RenderEvent));

    this.saveData();
  }

  searchBook() {
    // if (!this.formSearch) {
    // return;
    // }
  }

  loadData() {
    if (!this.isStorageExists()) {
      return;
    }

    const serializedData = localStorage.getItem(ConstantData.StorageKey);
    let data = JSON.parse(serializedData);

    if (data != null) {
      data.map((item) => {
        this.books.push(item);
      });
    }

    document.dispatchEvent(new Event(ConstantData.RenderEvent));
  }

  saveData() {
    if (this.isStorageExists()) {
      const parsed = JSON.stringify(this.books);

      localStorage.setItem(ConstantData.StorageKey, parsed);

      document.dispatchEvent(new Event(ConstantData.SavedEvent));
    }
  }

  makeBookElm(book) {
    const bookName = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const bookYear = document.createElement("p");
    const textContainer = document.createElement("div");
    const container = document.createElement("div");

    bookName.innerText = book.title;
    bookAuthor.innerText = book.author;
    bookYear.innerText = book.year;

    textContainer.classList.add("text_inner");
    textContainer.append(bookName, bookAuthor, bookYear);

    container.classList.add("book_item");
    container.append(textContainer);
    container.setAttribute("id", `book-${book.id}`);

    if (book.isCompleted) {
      const undoButton = document.createElement("button");
      const trashButton = document.createElement("button");

      undoButton.classList.add("undo_button");
      trashButton.classList.add("trash_button");

      undoButton.addEventListener("click", () => {
        this.undoReadBook(book.id);
      });
      trashButton.addEventListener("click", () => {
        this.removeReadBook(book.id);
      });

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check_button");

      checkButton.addEventListener("click", () => {
        addReadBook(book.id);
      });
      container.append(checkButton);
    }
    return container;
  }

  isStorageExists() {
    if (typeof Storage == undefined) {
      alert("Browser anda tidak mendukung penyimpanan");
      return false;
    }
    return true;
  }

  getRandomId() {
    return +new Date();
  }

  getBookObject(id, title, author, year, isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted,
    };
  }

  findBook(bookId) {
    this.books.filter((item) => item.id === bookId);
  }

  findBookIndex(bookId) {
    for (const index in this.books) {
      if (Object.hasOwnProperty.call(this.books, bookId)) {
        return index;
      }
    }
    return -1;
  }

  addReadBook(bookId) {
    const target = this.findBook(bookId);

    if (target == null) {
      return;
    }
    target.isCompleted = true;
    document.dispatchEvent(new Event(ConstantData.RenderEvent));
    this.saveData();
  }

  undoReadBook(bookId) {
    const target = this.findBook(bookId);

    if (target == null) {
      return;
    }
    target.isCompleted = false;
    document.dispatchEvent(new Event(ConstantData.RenderEvent));

    this.saveData();
  }

  removeReadBook(bookId) {
    const target = findBookIndex(bookId);
    if (target == null) {
      return;
    }

    this.books.splice(target, 1);
    document.dispatchEvent(new Event(ConstantData.RenderEvent));
    this.saveData();
  }
}

class ConstantData {
  static get RenderEvent() {
    return "render-book";
  }
  static get SavedEvent() {
    return "saved-book";
  }
  static get StorageKey() {
    return "BOOKSHELF";
  }
}

// Document Event handler
const bookShelf = new BookShelf();

document.addEventListener(ConstantData.RenderEvent, () => {
  const bookLists = bookShelf.bookLists;
  const readBookLists = bookShelf.readBookLists;

  bookLists.innerHTML = "";
  readBookLists.innerHTML = "";

  for (const item of bookShelf.books) {
    const itemElm = bookShelf.makeBookElm(item);

    if (!item.isCompleted) {
      bookLists.append(itemElm);
    } else {
      readBookLists.append(itemElm);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  bookShelf.loadData();
});
