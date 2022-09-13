// Add imports above this line
import SimpleLightbox from 'simplelightbox'
import { galleryItems } from './gallery-items'
import 'simplelightbox/dist/simple-lightbox.min.css'
// Change code below this line

const gallery = document.querySelector('.gallery')

const markup = galleryItems
    .map(
        (image) =>
            `<a class="gallery__item" href="${image.original}">
        <img class="gallery__image" src="${image.preview}" alt="${image.description}" />
        </a>
    `
    )
    .join('')

gallery.insertAdjacentHTML('afterbegin', markup)

new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
})
