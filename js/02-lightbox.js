import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// рендер разметки items

const galleryRef = document.querySelector(".gallery");

makeGalleryItemsMurkup(galleryItems);

function makeGalleryItemsMurkup(arrayItems) {
  const itemsMarkupString = arrayItems
    .map((item) => {
      return `
        <a class="gallery__item" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
        </a>`;
    })
    .join("");
  galleryRef.insertAdjacentHTML("beforeend", itemsMarkupString);
}

// инициализация библиотеки

const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
