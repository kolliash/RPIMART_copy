function initializeNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

 
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  
  let userFullName = document.getElementById("userFullName");
  fetch("../BS-NavBar/getName.php")
    .then(response => response.text())
    .then(fullName => {
      userFullName.innerHTML = fullName;
    });

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  
  window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
      if (scrollPosition >= section.offsetTop - 100 && scrollPosition < (section.offsetTop + section.offsetHeight - 100)) {
        let currentId = section.attributes.id.value;
        removeAllActiveClasses();
        addActiveClass(`#${currentId}`);
      }
    });
  });

  function removeAllActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
  }

  function addActiveClass(selector) {
    document.querySelector(`.navbar-nav .nav-link[href="${selector}"]`)?.classList.add('active');
  }

  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });
    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref && currentPath.includes(linkHref)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

initializeNavbar();
