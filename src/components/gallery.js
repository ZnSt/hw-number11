export function createCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
         <div class="photo-card">
         <a href="" class="link-photo"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
        <div class="info">
        <p class="info-item">
          <b>Likes: <span>${likes}</span></b>
        </p>
        <p class="info-item">
          <b>Views: <span>${views}</span></b>
        </p>
        <p class="info-item">
          <b>Comments: <span>${comments}</span></b>
        </p>
        <p class="info-item">
          <b>Downloads: <span>${downloads}</span></b>
        </p>
      </div>
    </div>
        `;
}
