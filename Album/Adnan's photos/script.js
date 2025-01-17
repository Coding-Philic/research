  // Open lightbox with the clicked image
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  galleryItems.forEach(item => {
      item.addEventListener('click', () => {
          const imgSrc = item.getAttribute('data-src');
          lightboxImg.src = imgSrc;
          lightbox.classList.add('active');
      });
  });

  // Close lightbox
  function closeLightbox() {
      lightbox.classList.remove('active');
  }