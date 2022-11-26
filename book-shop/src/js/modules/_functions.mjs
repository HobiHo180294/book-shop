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

function addSomeClasses(targetElem, classes) {
  classes
    .split(" ")
    .forEach((classElem) => targetElem.classList.add(classElem));
}

function removeSomeClasses(targetElem, classes) {
  classes
    .split(" ")
    .forEach((classElem) => targetElem.classList.remove(classElem));
}

function appendSomeElements(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

function setAttributes(element, attrs) {
  for (var key in attrs) element.setAttribute(key, attrs[key]);
}

export { addSomeClasses, appendSomeElements, removeSomeClasses, setAttributes };
