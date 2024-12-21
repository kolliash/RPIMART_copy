function validatePassword(event) {

  const fullName = document.getElementById("name").value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (fullName === "") {
    return true;
  }

  let alertString = "";

  const emailPattern = /^[a-zA-Z]{1,6}[0-9]*@rpi\.edu$/;

  if (!emailPattern.test(email)) {
    alertString += "Email must be a valid RPI email address\n";
  }

  if (password.length < 8) {
    alertString += "Password must be at least 8 characters long\n";
  }

  if (password !== confirmPassword) {
    alertString += "Passwords do not match";
  }

  if (alertString) {
    alert(alertString);
    event.preventDefault();
    return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', function () {
  const authForm = document.getElementById('authForm');
  const formTitle = document.getElementById('formTitle');
  const toggleAuthLink = document.getElementById('toggleAuth');
  const registerOnlyFields = document.querySelectorAll('.register-only');
  const submitButton = authForm.querySelector('button[type="submit"]');
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');

  if (error) {
    const messageContainer = document.getElementById('messageBox');
    messageContainer.textContent = decodeURIComponent(error);
    messageContainer.style.display = 'block';
  }

  let isRegisterMode = true;

  // Check URL parameters for initial form state
  function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'login' && isRegisterMode) {
      toggleAuthMode();
    } else if (mode === 'register' && !isRegisterMode) {
      toggleAuthMode();
    }
  }

  function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    formTitle.textContent = isRegisterMode ? 'Create Account' : 'Log In';
    toggleAuthLink.textContent = isRegisterMode ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up';
    submitButton.textContent = isRegisterMode ? 'Sign Up' : 'Log In';
    authForm.action = isRegisterMode ? "createUser.php" : "login.php";

    registerOnlyFields.forEach(field => {
      if (isRegisterMode) {
        field.style.display = 'block';
        setTimeout(() => {
          field.style.maxHeight = field.scrollHeight + 'px';
          field.style.opacity = '1';
          field.style.marginBottom = '1rem';
        }, 10);
      } else {
        field.style.maxHeight = '0';
        field.style.opacity = '0';
        field.style.marginBottom = '0';
        setTimeout(() => {
          field.style.display = 'none';
        }, 300);
      }

      const input = field.querySelector('input');
      if (input) {
        input.required = isRegisterMode;
      }
    });
  }

  toggleAuthLink.addEventListener('click', function (e) {
    e.preventDefault();
    toggleAuthMode();
  });

  authForm.addEventListener('submit', function (e) {
    const formData = new FormData(authForm);
    console.log('Form submitted:', Object.fromEntries(formData));
  });

  checkUrlParams();


  // Load the navbar
  fetch('../BS-NavBar/index.html')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const navbar = doc.querySelector('nav');
      document.getElementById('navbar-placeholder').innerHTML = '';
      document.getElementById('navbar-placeholder').appendChild(navbar);

      // Ensure the image is displayed correctly
      const navbarBrand = navbar.querySelector('.navbar-brand');
      const img = navbarBrand.querySelector('img');
      img.src = '../BS-NavBar/imgs/logo1.png';

      // Remove any conflicting styles
      const existingStyleLink = document.querySelector('link[href="../BS-NavBar/styles.css"]');
      if (existingStyleLink) {
        existingStyleLink.remove();
      }

      // Load the navbar's CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '../BS-NavBar/styles.css';
      document.head.appendChild(link);

      // Remove any existing script to avoid duplicates
      const existingScript = document.querySelector('script[src="../BS-NavBar/script.js"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Load the navbar's JavaScript
      const script = document.createElement('script');
      script.src = '../BS-NavBar/script.js';
      document.body.appendChild(script);
    })
    .catch(navError => console.error('Error loading navbar:', navError));
});
