import "@main/style.scss";
import {
  addSomeClasses,
  appendSomeElements,
  setAttributes,
} from "@js-modules/_functions.mjs";

const main = document.querySelector(".page");

function buildMain() {
  // Page elements
  const catalogSection = document.createElement("section");
  const catalogContainer = document.createElement("div");
  const catalogBooks = document.createElement("div");
  let bookElem;
  let bookWrapper;
  let bookPic;
  let bookCharacteristics;
  let bookAuthor;
  let bookPrice;
  let bookTitle;
  let bookButtons;
  let bookMoreBtn;
  let bookBuyBtn;
  let popup;
  let popupContent;
  let popupTitle;
  let popupDescription;
  let popupCloseBtn;

  const fragment = new DocumentFragment();

  // Appending all elements to fragment
  addSomeClasses(catalogSection, "page__catalog catalog");
  addSomeClasses(catalogContainer, "catalog__container _standard-container");
  catalogBooks.classList.add("catalog__books");

  catalogSection.append(catalogContainer);
  catalogContainer.append(catalogBooks);

  for (let i = 0; i < 10; i++) {
    bookElem = document.createElement("div");
    addSomeClasses(bookElem, "catalog__book book");

    bookWrapper = document.createElement("figure");
    bookWrapper.classList.add("book__wrapper");

    bookPic = document.createElement("img");
    bookPic.classList.add("book__pic");
    const bookPicAttrs = { width: "249.75", height: "320", alt: "Book image" };

    setAttributes(bookPic, bookPicAttrs);

    bookCharacteristics = document.createElement("div");
    bookCharacteristics.classList.add("book__characteristics");

    bookAuthor = document.createElement("figcaption");
    bookAuthor.classList.add("book__author");

    bookPrice = document.createElement("div");
    bookPrice.classList.add("book__price");

    bookTitle = document.createElement("h2");
    bookTitle.classList.add("book__title");

    bookButtons = document.createElement("div");
    bookButtons.classList.add("book__buttons");

    bookMoreBtn = document.createElement("button");
    bookMoreBtn.classList.add("book__more");
    bookMoreBtn.textContent = "Show more";

    bookBuyBtn = document.createElement("button");
    bookBuyBtn.classList.add("book__buy");
    bookBuyBtn.textContent = "Add to bag";

    popup = document.createElement("div");
    addSomeClasses(popup, "book__popup popup");

    popupContent = document.createElement("div");
    popupContent.classList.add("popup__content");

    popupTitle = document.createElement("h2");
    popupTitle.classList.add("popup__title");

    popupDescription = document.createElement("p");
    popupDescription.classList.add("popup__description");

    popupCloseBtn = document.createElement("button");
    popupCloseBtn.classList.add("popup__close");
    popupCloseBtn.textContent = "Close";

    appendSomeElements(popupContent, [
      popupTitle,
      popupDescription,
      popupCloseBtn,
    ]);
    popup.append(popupContent);
    appendSomeElements(bookButtons, [bookMoreBtn, bookBuyBtn]);
    appendSomeElements(bookCharacteristics, [bookAuthor, bookPrice]);
    appendSomeElements(bookWrapper, [bookPic, bookCharacteristics]);
    appendSomeElements(bookElem, [bookWrapper, bookTitle, bookButtons, popup]);
    catalogBooks.append(bookElem);
  }

  fragment.append(catalogSection);

  // Page elements injecting into HTML
  main.append(fragment);
}

document.addEventListener("DOMContentLoaded", () => {
  // Build content in the main page part
  buildMain();

  // Book characteristics
  const bookTitles = document.querySelectorAll(".book__title");
  const bookImages = document.querySelectorAll(".book__pic");
  const bookAuthors = document.querySelectorAll(".book__author");
  const bookCosts = document.querySelectorAll(".book__price");

  // Popup variables
  const showPopupButtons = document.querySelectorAll(".book__more");
  const closeButtons = document.querySelectorAll(".popup__close");
  const popupTitles = document.querySelectorAll(".popup__title");
  const popupDescriptions = document.querySelectorAll(".popup__description");

  // Write JSON data into the variable
  const jsonBooksData = fetch("./assets/json/books.json") //path to the file with json data
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  // Resolve JSON data
  const books = Promise.resolve(jsonBooksData);

  // Implement JSON data into HTML page
  books.then((bookArr) => {
    let counter = 0;

    for (let i = 0; i < bookArr.length; i++) {
      bookTitles[counter].textContent = bookArr[i].title;
      bookImages[counter].src = bookArr[i].imageLink;
      bookAuthors[counter].textContent = bookArr[i].author;
      bookCosts[counter].textContent = bookArr[i].price + "$";
      popupTitles[counter].textContent = bookArr[i].title;
      popupDescriptions[counter].textContent = bookArr[i].description;
      counter++;
    }
  });

  // Popup implementation
  showPopupButtons.forEach((showPopupBtn) =>
    showPopupBtn.addEventListener("click", () => {
      showPopupBtn.parentElement.nextElementSibling.classList.toggle(
        "popup__show"
      );
    })
  );

  closeButtons.forEach((closeButton) =>
    closeButton.addEventListener("click", () => {
      console.log(closeButton.parentElement);
      closeButton.parentElement.parentElement.classList.toggle("popup__show");
    })
  );
});
