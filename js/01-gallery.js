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
        <div class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
            />
        </a>
        </div>`;
    })
    .join("");
  galleryRef.insertAdjacentHTML("beforeend", itemsMarkupString);
}

// обработчик событий

galleryRef.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src='${event.target.dataset.source}' alt='${event.target.alt}'>`);

  instance.show();

  window.addEventListener("keydown", closeModalImage);

  function closeModalImage(event) {
    if (event.code !== "Escape") {
      return;
    }

    instance.close();
    window.removeEventListener("keydown", closeModalImage);
  }
}
