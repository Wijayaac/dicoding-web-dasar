"use-strict";
class BookShelf {
  constructor() {
    this.init();
    this.formElm = document.querySelector("#inputBook");
    this.inputTitle = this.formElm.querySelector("#inputBookTitle");
    this.inputAuthor = this.formElm.querySelector("#inputBookAuthor");
    this.inputYear = this.formElm.querySelector("#inputBookYear");
    this.inputIsComplete = this.formElm.querySelector("#inputBookIsComplete");

    this.formSearch = document.querySelector("#searchBook");
    this.inputSearch = this.formSearch.querySelector("#searchBookTitle");

    this.listIncompleteBook = document.querySelector(
      "#incompleteBookshelfList"
    );
    this.listCompleteBook = document.querySelector("#completeBookshelfList");
  }

  init() {
    this.inputBook();
    this.searchBook();
  }
  inputBook() {
    if (!this.formElm) {
      return;
    }
  }
  searchBook() {
    if (!this.formSearch) {
      return;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BookShelf();
});
