async function getMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    const container = document.querySelector('#directory-cards');
    container.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.tagline}</p>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="150">
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
      <p class="membership-level">${membershipLabel(member.membership)}</p>
    `;

        container.appendChild(card);
    });
}

function membershipLabel(level) {
    if (level === 3) return 'Gold Member';
    if (level === 2) return 'Silver Member';
    return 'Member';
}

// grid/list toggle
const container = document.querySelector('#directory-cards');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
});

// hamburger menu toggle
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// footer year and last modified
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;

getMembers();