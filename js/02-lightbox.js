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
        <li>
          <a class="gallery__item" href="${item.original}">
            <img class="gallery__image lazyload" loading="lazy" data-src="${item.preview}" alt="${item.description}" />
          </a>
        </li>`;
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
