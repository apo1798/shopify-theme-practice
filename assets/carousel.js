// reference: https://www.youtube.com/watch?v=9HcxHDS2w1s

const slider = () => {
  const slide = document.querySelector('.carousel-slide');
  const slideNum = slide.children.length;
  const dotContainer = document.querySelector('.dot-container');
  const btnPrev = document.querySelector('.carousel-button.prev');
  const btnNext = document.querySelector('.carousel-button.next');

  let curSlide = 0; // 現在的 active slide 數字
  let timer; // timer 存放 setInterval傳回來的值

  const createDots = () => {
    // slide.chidren 是 HTMLCollection，先換成 array 才能用forEach
    Array.from(slide.children).forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  const assignActiveDot = (slide) => {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('active-dot'));
    document
      .querySelector(`.dots__dot[data-slide='${slide}'`)
      .classList.add('active-dot');
  };

  const assignActiveSlide = (slide) => {
    document.querySelectorAll('.carousel-image').forEach((image, i) => {
      image.classList.remove('active-slide');

      if (i === slide) image.classList.add('active-slide');
    });
  };

  const goPrevSlide = () => {
    resetTimer();
    if (curSlide === 0) curSlide = slideNum - 1;
    else curSlide--;
    assignActiveDot(curSlide);
    assignActiveSlide(curSlide);
  };

  const goNextSlide = () => {
    resetTimer();
    if (curSlide === slideNum - 1) curSlide = 0;
    else curSlide++;
    assignActiveDot(curSlide);
    assignActiveSlide(curSlide);
  };

  const goToSlide = (slide) => {
    curSlide = slide;
    resetTimer();
    assignActiveDot(slide);
    assignActiveSlide(slide);
  };

  const sliderTimer = () => {
    if (timer) return;
    timer = setInterval(() => {
      goNextSlide();
    }, 5000);
  };

  const resetTimer = () => {
    clearInterval(timer);
    timer = null;
    sliderTimer();
  };

  // Event handlers
  btnPrev.addEventListener('click', goPrevSlide);
  btnNext.addEventListener('click', goNextSlide);

  dotContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('dots__dot')) return;
    goToSlide(parseInt(e.target.dataset.slide));
  });

  // 這個開啟的話只要在頁面上按下左右鍵都會造成滑動（要考慮會不會影響）
  // document.addEventListener('keydown', (e) => {
  //   e.key === 'ArrowLeft' && goPrevSlide();
  //   e.key === 'ArrowRight' && goNextSlide();
  // });

  // Initialize the carousel
  const init = () => {
    createDots();
    assignActiveDot(0);
    assignActiveSlide(0);
    sliderTimer();
  };

  init();
};

slider();

// buttons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
//     const slides = button.closest('.carousel').querySelector('.carousel-slide');

//     const activeSlide = slides.querySelector('[data-active]');
//     let newIndex = [...slides.children].indexOf(activeSlide) + offset;

//     if (newIndex < 0) newIndex = slides.children.length - 1;
//     if (newIndex >= slides.children.length) newIndex = 0;

//     delete activeSlide.dataset.active;
//     slides.children[newIndex].dataset.active = true;
//   });
// });
