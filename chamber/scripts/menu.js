
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    
    const isOpen = navMenu.classList.toggle('open');
    
    menuToggle.setAttribute('aria-expanded', isOpen);
});


document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;