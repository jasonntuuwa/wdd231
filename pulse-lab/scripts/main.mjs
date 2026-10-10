import { getBeats, beatCard } from "./beats-data.mjs";

// Hamburger menu toggle
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen); // keeps screen readers in sync
    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;



// Home page only: show the first 3 beats
const featured = document.querySelector("#featured-beats");

if (featured) {
    const beats = await getBeats();
    featured.innerHTML = beats.slice(0, 3).map(beatCard).join("");
}

// Home page: send "View Details" clicks to the full catalog
if (featured) {
    featured.addEventListener("click", event => {
        if (event.target.closest(".details-button")) {
            window.location.href = "beats.html";
        }
    });
}