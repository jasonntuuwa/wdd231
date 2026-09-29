
document.querySelector('#timestamp').value = new Date().toISOString();


document.querySelectorAll('[data-modal]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        document.getElementById(link.dataset.modal).showModal(); 
    });
});


document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close(); 
    });
});