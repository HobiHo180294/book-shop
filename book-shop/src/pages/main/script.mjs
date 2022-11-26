import "@main/style.scss";
import { ibg } from "@js-modules/_functions.mjs";

const head = document.querySelector("head");
const main = document.querySelector(".page");

head.insertAdjacentHTML(
  "afterbegin",
  "<meta charset='UTF-8'/> <meta http-equiv='X-UA-Compatible' content='IE=edge'/> <meta name='viewport' content='width=device-width, initial-scale=1.0'/> <meta name='description' content=''/> <meta name='author' content=''/> <title>Books shop</title>"
);

// main.insertAdjacentHTML(
//   "afterbegin",
//   "<section class='page__catalog catalog'> <div class='catalog__container _standard-container'> <div class='catalog__books'> <div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div><div class='catalog__book book'> <figure class='book__wrapper'> <img src='' width='249.75' height='320' alt='Book image' class='book__pic'/> <div class='book__characteristics'> <figcaption class='book__author'></figcaption> <div class='book__price'></div></div></figure> <h2 class='book__title'></h2> <div class='book__buttons'> <button href='#!' class='book__more'>Show more</button> <button href='#!' class='book__buy'>Add to bag</button> </div></div></div></div></section>"
// );

document.addEventListener("DOMContentLoaded", () => {
  ibg();

  const bookTitles = document.querySelectorAll(".book__title");
  const bookImages = document.querySelectorAll(".book__pic");
  const bookAuthors = document.querySelectorAll(".book__author");
  const bookCosts = document.querySelectorAll(".book__price");

  // Popup variables
  // const popup = document.querySelector(".popup");
  const showPopupButtons = document.querySelectorAll(".book__more");
  const closeButtons = document.querySelectorAll(".popup__close");
  const popupTitles = document.querySelectorAll(".popup__title");
  const popupDescriptions = document.querySelectorAll(".popup__description");
  // Popup variables

  const jsonBooksData = fetch("./assets/json/books.json") //path to the file with json data
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  const books = Promise.resolve(jsonBooksData);

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

  // Popup implementation
});
