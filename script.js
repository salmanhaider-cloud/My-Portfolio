console.log("Cloud Engineer Portfolio Loaded Successfully");

// Scroll Animation
const sections = document.querySelectorAll('.fade-section');

window.addEventListener('scroll', () => {

  sections.forEach(section => {

    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100){
      section.classList.add('show');
    }

  });

});

// Active Navbar Highlight
const navLinks = document.querySelectorAll('.nav-right a');
const allSections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {

  let current = '';

  allSections.forEach(section => {

    const sectionTop = section.offsetTop;

    if(pageYOffset >= sectionTop - 200){
      current = section.getAttribute('id');
    }

  });

  navLinks.forEach(link => {

    link.classList.remove('active');

    if(link.getAttribute('href') === '#' + current){
      link.classList.add('active');
    }

  });

});
