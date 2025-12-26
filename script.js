document.addEventListener("DOMContentLoaded", function () {

  const certificateCategories = document.querySelectorAll('#certificates .categories li');
  const folioCategories = document.querySelectorAll('#portfolio .category');
  const portfolioBoxes = document.querySelectorAll('#portfolio .wrapper img');
  const allSlides = document.querySelectorAll('#certificates .slide');
  const wrapper = document.querySelector('.slider-wrapper');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let activeSlides = [];
  let currentIndex = 0;


  function updateSlides() {
    slideActive = document.querySelector(".slide.active")
    allSlides.forEach(slide => slide.classList.remove('active'));

    if (activeSlides.length === 0) return;

    activeSlides[currentIndex].classList.add('active');

    requestAnimationFrame(() => {
      const slide = activeSlides[currentIndex];
      const offset = -((slide.offsetLeft + slide.offsetWidth / 2) - wrapper.offsetWidth / 2);
      wrapper.style.transform = `translateX(${offset}px)`;
    });
  }

  certificateCategories.forEach(item => {
    item.addEventListener('click', () => {
      certificateCategories.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const cat = item.dataset.cat;

      allSlides.forEach(slide => {
        slide.style.display = slide.dataset.cat === cat ? 'flex' : 'none';
      });

      activeSlides = Array.from(allSlides).filter(slide => slide.dataset.cat === cat);
      currentIndex = 0;
      updateSlides();
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSlides();
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < activeSlides.length - 1) currentIndex++;
    updateSlides();
  });

  window.addEventListener('load', () => {
    certificateCategories[0].click();
  });
  function setPortfolioCategory(catElement) {
    const target = catElement.dataset.cat;
    folioCategories.forEach(c => c.classList.remove('active'));
    catElement.classList.add('active');

    portfolioBoxes.forEach(box => {
      if (box.dataset.cat === target) box.classList.add('active');
      else box.classList.remove('active');
    });
  }

  folioCategories.forEach(cat => {
    cat.addEventListener('click', () => {
      setPortfolioCategory(cat);
    });
  });
  setPortfolioCategory(folioCategories[0]);
});
