const btn = document.getElementById('button');

document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navList.classList.toggle("active");
  });
});

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_0hccqba';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });