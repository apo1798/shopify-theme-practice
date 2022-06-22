const buttons = document.querySelectorAll('.carousel-button');

buttons.forEach((button) => {
  console.log(button);

  button.addEventListener('click', () => {
    const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
    const slides = button.closest('.carousel').querySelector('.carousel-slide');

    const activeSlide = slides.querySelector('[data-active]');
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    delete activeSlide.dataset.active;
    slides.children[newIndex].dataset.active = true;
  });
});
