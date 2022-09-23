import './css/style.css';
import { getPhoto, perPage } from './api/api-key';
import Notiflix from 'notiflix';
import { divContainer, form, loadMoreBtn } from './components/refs';
import { createCardMarkup } from './components/gallery';
import { updateMarkup } from './components/update-markup';
import { doLightBox } from './components/light-box';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
const totalPages = Math.ceil(500 / perPage);
console.log(totalPages);
async function mountData(searchValue) {
  try {
    const data = await getPhoto(searchValue);
    console.log(data);
    if (data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    console.log(data.hits);
    const markup = data.hits.map(image => {
      return createCardMarkup(image);
    });

    updateMarkup(divContainer, markup);
    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const searchValue = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchValue) {
    Notiflix.Notify.info('Please enter a valid name!');
  }

  mountData(searchValue);
}

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  page += 1;
  renderMarkup();
}

function renderMarkup(markup) {
  divContainer.insertAdjacentHTML('beforeend', markup);
}

new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
