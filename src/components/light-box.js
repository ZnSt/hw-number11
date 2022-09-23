export function doLightBox() {
  const photoLink = document.querySelector('.link-photo');
  photoLink.addEventListener('click', event => {
    event.preventDefault();
  });
}
