import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25755107-c5ecbaee54c3d5c87c2809c98';
import Notiflix from 'notiflix';

// export const perPage = 40;
const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safeSearch: true,
});

export async function getPhoto(search, page) {
  try {
    if (!search.trim()) {
      return;
    }
    const response = await axios.get(
      `${BASE_URL}?${searchParams}&q=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}
