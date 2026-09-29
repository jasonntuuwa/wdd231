// 1. Timestamp: set the hidden field to the moment the form loaded
document.querySelector('#timestamp').value = new Date().toISOString();

// 2. Modals: open on card link click
document.querySelectorAll('[data-modal]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // stop href="#" from jumping to top
        document.getElementById(link.dataset.modal).showModal(); // showModal traps focus + enables Esc to close
    });
});

// 3. Modals: close button inside each dialog
document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close(); // closes the dialog this button lives in
    });
});