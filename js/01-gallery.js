import { galleryItems } from "./gallery-items.js";
import { galleryItemsExtra } from "./gallery-items.js";

// Change code below this line

console.log(galleryItems);
console.log(galleryItemsExtra);

// рендер разметки items
const galleryRef = document.querySelector(".gallery");

makeGalleryItemsMurkup(galleryItems);
makeGalleryItemsMurkup(galleryItemsExtra);

function makeGalleryItemsMurkup(arrayItems) {
  const itemsMarkupString = arrayItems
    .map((item) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img
            class="gallery__image lazyload"
            data-src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
            loading="lazy"
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
    galleryRef.removeEventListener("click", onImageClick);
  }
}

// проверка lazyloading, подключение lazysizes

if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll("img[loading]");
  images.forEach((image) => (image.src = image.dataset.src));
} else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossorigin = "anonymous";
  script.referrerpolicy = "no-referrer";
  document.body.append(script);
}
