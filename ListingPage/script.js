fetch('../BS-NavBar/index.html')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const navbar = doc.querySelector('nav');
        document.getElementById('navbar-placeholder').innerHTML = '';
        document.getElementById('navbar-placeholder').appendChild(navbar);

        const navbarBrand = navbar.querySelector('.navbar-brand');
        const img = navbarBrand.querySelector('img');
        img.src = '../BS-NavBar/imgs/logo1.png';
        img.width = 70;
        img.height = 70;

        const existingStyleLink = document.querySelector('link[href="../BS-NavBar/styles.css"]');
        if (existingStyleLink) {
            existingStyleLink.remove();
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../BS-NavBar/styles.css';
        document.head.appendChild(link);

        const existingScript = document.querySelector('script[src="../BS-NavBar/script.js"]');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = '../BS-NavBar/script.js';
        document.body.appendChild(script);
    })
    .catch(error => console.error('Error loading navbar:', error));

    
const paginationLinks = document.querySelectorAll('.pagination a');


paginationLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        
        event.preventDefault();

        // Remove the active class from all links
        paginationLinks.forEach(link => link.classList.remove('active'));

        // Add the active class to the clicked link
        link.classList.add('active');
    });
});
