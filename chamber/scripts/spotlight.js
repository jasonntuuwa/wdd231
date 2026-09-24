async function getSpotlights() {
    
    const response = await fetch('data/members.json');
    const members = await response.json();

    
    const eligible = members.filter((m) => m.membership === 3 || m.membership === 2);

    
    for (let i = eligible.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }

    
    displaySpotlights(eligible.slice(0, 3));
}

function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-cards');
    container.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('spotlight-card');

        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="90">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <p><a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
            <p class="membership-level">${member.membership === 3 ? 'Gold Member' : 'Silver Member'}</p>
        `;

        container.appendChild(card);
    });
}

getSpotlights();