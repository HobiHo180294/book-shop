const pageTitle = document.querySelector("title");

function ibg() {
  let ibg = document.querySelectorAll("._ibg");

  [].forEach.call(ibg, (img) => {
    if (img.querySelector("img"))
      img.style.backgroundImage =
        "url(" + img.querySelector("img").getAttribute("src") + ")";
  });
}

function isIterable(obj) {
  if (obj == null) return false;
  return typeof obj[Symbol.iterator] === "function";
}

function addActiveLink(linksArr) {
  if (isIterable(linksArr)) {
    [].forEach.call(linksArr, (link) => {
      if (link.textContent === pageTitle.textContent)
        link.classList.add("_active-link");
    });
  }
}

function removeActiveLink(linksArr) {
  if (isIterable(linksArr)) {
    [].forEach.call(linksArr, (link) => {
      if (link.classList.contains("_active-link"))
        link.classList.remove("_active-link");
    });
  }
}

function inputNumbersLimit(inputNums) {
  if (isIterable(inputNums)) {
    inputNums.forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value.length > input.maxLength)
          input.value = input.value.slice(0, input.maxLength);
      });
    });
  }
}

export {
  pageTitle,
  ibg,
  isIterable,
  addActiveLink,
  removeActiveLink,
  inputNumbersLimit,
};
