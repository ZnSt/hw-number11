import './css/style.css';
import { getPhoto } from './api/api-key';
import Notiflix from 'notiflix';
import { divContainer, form, loadMoreBtn } from './components/refs';
import { createCardGallery } from './components/gallery';
import { updateMarkup } from './components/update-markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let searchValue = '';

const lightBox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function mountData(searchValue) {
  try {
    const data = await getPhoto(searchValue, page);
    console.log(data);
    if (data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    console.log(data.hits);
    const markup = createCardGallery(data.hits);

    updateMarkup(divContainer, markup);

    loadMoreBtn.classList.remove('is-hidden');
    loadMoreBtn.removeEventListener('click', listenerCallback);
    loadMoreBtn.addEventListener('click', listenerCallback);
  } catch (error) {
    console.log(error);
  }
}
function listenerCallback() {
  onLoadMore(searchValue);
}
async function onLoadMore(searchValue) {
  page += 1;

  const data = await getPhoto(searchValue, page);
  const markup = createCardGallery(data.hits);

  if (page * 40 >= data.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  renderMarkup(markup);
}

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  searchValue = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchValue) {
    Notiflix.Notify.info('Please enter a valid name!');
  }

  mountData(searchValue);
}

function renderMarkup(markup) {
  divContainer.insertAdjacentHTML('beforeend', markup);
  lightBox.refresh();
}
