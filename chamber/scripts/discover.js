
import { places } from "../data/discover.mjs";


const cardsContainer = document.querySelector("#discover-cards");

places.forEach((place, index) => {
    const card = document.createElement("article");
    
    card.classList.add("discover-card", `card${index + 1}`);

    card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn more</button>
  `;

    cardsContainer.appendChild(card);
});


const visitMessage = document.querySelector("#visit-message");
const MS_PER_DAY = 1000 * 60 * 60 * 24; 

const lastVisit = Number(localStorage.getItem("discover-last-visit")); 
const now = Date.now();

if (!lastVisit) {
    
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diff = now - lastVisit;

    if (diff < MS_PER_DAY) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const days = Math.floor(diff / MS_PER_DAY); 
        visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}


localStorage.setItem("discover-last-visit", now);