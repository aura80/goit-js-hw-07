import { galleryItems } from "./gallery-items.js";
// Change code below this line

// const basicLightbox = require("basiclightbox");
// import * as basicLightbox from "basiclightbox";

const ulGallery = document.querySelector(".gallery");
console.log(ulGallery);

const markup = galleryItems
  .map(
    (image) =>
      `<li>
    <a href="${image.original}">
    <img src="${image.preview}" data-source="${image.original}" alt="${image.description}"/>
    </a>
    </li>`
  )
  .join("");

ulGallery.insertAdjacentHTML("beforeend", markup);

const liElement = ulGallery.querySelectorAll("li");
const aElement = ulGallery.querySelectorAll("a");
const imgElement = ulGallery.querySelectorAll("img");

liElement.forEach((liE) => {
  liE.classList.add("gallery__item");
});

aElement.forEach((aE) => {
  aE.classList.add("gallery__link");
});

imgElement.forEach((imgE) => {
  imgE.classList.add("gallery__image");
});

console.log(ulGallery);

galleryItems.forEach((elem) => {
  imgElement.forEach((element) => {
    if (elem.preview === element.getAttribute("src")) {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const onClick = e.target;

        function closeOnEscape(e) {
          if (e.key === "Escape") {
            instance.close();
          }
        }

        const instance = basicLightbox.create(
          `<img src="${onClick.dataset.source}" alt="${elem.description}" />`,
          {
            onShow: () => {
              document.addEventListener("keydown", closeOnEscape);
            },
            onClose: () => {
              document.removeEventListener("keydown", closeOnEscape);
            },
          }
        );
        instance.show();
      });
    }
  });
});
