"use-strict";
class BookShelf {
  constructor() {
    this.books = [];
    this.searchedBook = [];
    this.init();

    this.formElm;
    this.inputTitle;
    this.inputAuthor;
    this.inputYear;
    this.inputIsComplete;

    this.formSearch;
    this.inputSearch;

    this.bookLists = document.querySelector("#book-list");
    this.readBookLists = document.querySelector("#read-book-list");
  }

  init() {
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

    this.showToast("Buku berhasil ditambahkan");
  }

  searchBook() {
    this.formSearch = document.querySelector("#search-book");
    if (!this.formSearch) {
      return;
    }

    let buttonSearch = this.formSearch.querySelector(".reset_button");

    this.formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchedBook = this.getSearchBook();

      document.dispatchEvent(new Event(ConstantData.SearchEvent));
      buttonSearch.classList.add("active");
    });

    buttonSearch.addEventListener("click", () => {
      this.formSearch.reset();

      document.dispatchEvent(new Event(ConstantData.RenderEvent));
      buttonSearch.classList.remove("active");
    });
  }

  getSearchBook() {
    this.inputSearch = this.formSearch.querySelector("#searchBookTitle").value;

    if (typeof this.inputSearch == "string") {
      return this.books.filter((item) => {
        let bookTitle = item.title.toLowerCase().split("");
        let keyword = this.inputSearch.toLowerCase().split("");

        return bookTitle.some((name) => keyword.includes(name));
      });
    }
    return this.books;
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
    const container = document.createElement("article");

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

      undoButton.classList.add("button", "undo_button");
      undoButton.innerText = "Belum";
      trashButton.classList.add("button", "trash_button");
      trashButton.innerText = "hapus";

      undoButton.addEventListener("click", () => {
        this.undoReadBook(book.id);
      });
      trashButton.addEventListener("click", () => {
        this.removeReadBook(book.id);
      });

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement("button");
      checkButton.classList.add("button", "check_button");
      checkButton.innerText = "sudah";

      checkButton.addEventListener("click", () => {
        this.addReadBook(book.id);
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

  addReadBook(bookId) {
    const target = this.findBook(bookId);
    if (!target) {
      return;
    }

    target.isCompleted = true;
    document.dispatchEvent(new Event(ConstantData.RenderEvent));
    this.saveData();

    this.showToast("Buku telah di baca");
  }

  undoReadBook(bookId) {
    const target = this.findBook(bookId);

    if (!target) {
      return;
    }
    target.isCompleted = false;
    document.dispatchEvent(new Event(ConstantData.RenderEvent));

    this.saveData();
    this.showToast("Buku telah terupdate");
  }

  findBook(bookId) {
    let book = this.books.filter((item) => item.id === bookId);
    return book[0];
  }

  removeReadBook(bookId) {
    const target = this.findBookIndex(bookId);
    if (target == null) {
      return;
    }
    this.books.splice(target, 1);

    document.dispatchEvent(new Event(ConstantData.RenderEvent));

    this.saveData();
  }

  findBookIndex(bookId) {
    return this.books.findIndex((item) => item.id === bookId);
  }

  showToast(message) {
    let toastElm = document.querySelector(".toast");
    let toastMessage = toastElm.querySelector(".toast_message");
    let toastButton = toastElm.querySelector(".toast_confirm");

    if (toastElm.getAttribute("data-visible") === "false") {
      toastMessage.innerText = message;
      toastElm.setAttribute("data-visible", true);
    }

    setTimeout(() => {
      this.hideToast(toastElm);
    }, 1200);

    toastButton.addEventListener("click", () => {
      return this.hideToast(toastElm);
    });
  }

  hideToast(toast) {
    if (toast.getAttribute("data-visible") === "true") {
      toast.setAttribute("data-visible", false);
    }
  }
}

class ConstantData {
  static get RenderEvent() {
    return "render-book";
  }
  static get SearchEvent() {
    return "search-book";
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

document.addEventListener(ConstantData.SearchEvent, () => {
  const bookLists = bookShelf.bookLists;
  const readBookLists = bookShelf.readBookLists;

  bookLists.innerHTML = "";
  readBookLists.innerHTML = "";

  for (const item of bookShelf.searchedBook) {
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
