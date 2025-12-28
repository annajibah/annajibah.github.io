document.addEventListener("DOMContentLoaded", function () {
  const itemsAnimatable = document.querySelectorAll(".animatable")

  const certificateCategories = document.querySelectorAll('.certificates .categories li');
const folioCategories = document.querySelectorAll(".categories div");
  const folioItems = document.querySelectorAll(".folio-wrapper > div");
  const allSlides = document.querySelectorAll('.certificates .slide');
  const wrapper = document.querySelector('.slider-wrapper');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let activeSlides = [];
  let currentIndex = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0
  });

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

  itemsAnimatable.forEach((item, index) => {
    observer.observe(item);
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) currentIndex--;
      updateSlides();
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < activeSlides.length - 1) currentIndex++;
      updateSlides();
    });
  }

  window.addEventListener('load', () => {
    certificateCategories[0].click();
  });
    

  function showCategory(cat) {
    folioCategories.forEach(div => {
      if (div.dataset.cat === cat) {
        div.classList.add("active");
      } else {
        div.classList.remove("active");
      }
    });
    folioItems.forEach(item => {
      if (item.dataset.cat === cat) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }
  folioCategories.forEach(div => {
    div.addEventListener("click", () => {
      const cat = div.dataset.cat;
      showCategory(cat);
    });
  });
  if (folioCategories.length > 0) {
    showCategory(folioCategories[0].dataset.cat);
  }
});
