
document.querySelector('#timestamp').value = new Date().toISOString();


document.querySelectorAll('[data-modal]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // stop href="#" from jumping to top
        document.getElementById(link.dataset.modal).showModal(); // showModal traps focus + enables Esc to close
    });
});


document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close(); 
    });
});