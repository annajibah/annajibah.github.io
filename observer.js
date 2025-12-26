document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const homeHeader = document.querySelector("#home h1");
  const homeParagraph = document.querySelector("#home p");
  const homeLink = document.querySelector("#home .btn");
  const homeItems = [homeHeader, homeParagraph, homeLink];
  const itemsAnimatable = document.querySelectorAll(".animatable")


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

  sections.forEach(section => observer.observe(section));
  homeItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(item);
  });
  itemsAnimatable.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(item);
  });


})