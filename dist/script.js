'use strict';
document.getElementById('year').textContent = new Date().getFullYear();

const photoLinks = Array.from(document.querySelectorAll('.photo-link'));
const viewer = document.querySelector('.photo-dialog');
if (viewer && typeof viewer.showModal === 'function') {
  const full = document.getElementById('photo-full');
  const title = document.getElementById('photo-title');
  const count = document.getElementById('photo-count');
  let current = 0;
  let opener;
  function showPhoto(index) {
    current = (index + photoLinks.length) % photoLinks.length;
    const link = photoLinks[current];
    full.src = link.getAttribute('href');
    full.alt = link.querySelector('img').alt;
    title.textContent = link.dataset.title;
    count.textContent = (current + 1) + ' / ' + photoLinks.length;
  }
  photoLinks.forEach((link, index) => {
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      showPhoto(index);
      viewer.showModal();
      document.body.classList.add('viewer-open');
    });
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.viewer-prev').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  viewer.addEventListener('click', event => {
    if (event.target === viewer) {
      const bounds = viewer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    }
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    if (opener) opener.focus();
  });
}
