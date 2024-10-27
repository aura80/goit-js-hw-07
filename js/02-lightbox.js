import { galleryItems } from "./gallery-items.js";
// Change code below this line

const ulGallery = document.querySelector(".gallery");
console.log(ulGallery);

const markup = galleryItems
  .map(
    (image) =>
      `<li>
    <a href="${image.original}" data-caption="${image.description}" >
    <img src="${image.preview}" alt="${image.description}" />
    </a>
    </li>`
  )
  .join("");

ulGallery.insertAdjacentHTML("beforeend", markup);

console.log(galleryItems);

const liElements = ulGallery.querySelectorAll("li");
const aElements = ulGallery.querySelectorAll("a");
const imgElements = ulGallery.querySelectorAll("img");

liElements.forEach((liE) => {
  liE.classList.add("gallery__item");
});

aElements.forEach((aE) => {
  aE.classList.add("gallery__link");
  console.log(`Added data-caption: ${aE.getAttribute("data-caption")}`);
});

imgElements.forEach((imgE) => {
  imgE.classList.add("gallery__image");
});

document.addEventListener("DOMContentLoaded", function () {
  // initializing the SimpleLightbox
  let gallery = new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "data-caption",
    captionPosition: "bottom",
    captionDelay: "250",
    widthRatio: 0.6,
    heightRatio: 0.7,
  });

  gallery.on("show.simplelightbox", function () {
    console.log("Show SimpleLightbox");
  });

  gallery.on("nextImageLoaded.simplelightbox", function () {
    const currentImageLinks = document.querySelectorAll(".gallery a"); // Array of links
    const currentImage = document.querySelector(".sl-image img");
    let currentCaption = "No caption available";

    if (currentImage) {
      currentImageLinks.forEach((link) => {
        if (link.href === currentImage.src) {
          console.log("Current Link href:", link.href);
          currentCaption = link.getAttribute("data-caption");
        }
      });
    }

    console.log("Current Image Links:", currentImageLinks);
    console.log("Current Image:", currentImage);
    console.log("Current Caption:", currentCaption);

    let captionElement = document.querySelector(".sl-caption");

    if (!captionElement) {
      console.log("Caption element not found. Creating manually...");
      captionElement = document.createElement("p");
      captionElement.className = "sl-caption";
      captionElement.textContent = currentCaption;
      document.querySelector(".sl-wrapper").appendChild(captionElement);
    } else {
      captionElement.textContent = currentCaption; // Update current caption
      console.log("Updated Caption text:", captionElement.textContent);
    }
  });
});
