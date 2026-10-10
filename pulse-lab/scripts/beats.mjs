import { getBeats, beatCard } from "./beats-data.mjs";

const grid = document.querySelector("#beat-grid");
const genreFilter = document.querySelector("#genre-filter");
const favoritesOnly = document.querySelector("#favorites-only");
const resultCount = document.querySelector("#result-count");
const modal = document.querySelector("#beat-modal");
const modalContent = document.querySelector("#modal-content");
const closeButton = document.querySelector("#modal-close");

const beats = await getBeats();

// Local storage: saved favorites (array of ids) and last selected genre
let favorites = JSON.parse(localStorage.getItem("pulselab-favorites")) || [];
let currentBeat = null;

// Build the genre dropdown from the data (Set removes duplicates)
const genres = [...new Set(beats.map(beat => beat.genre))].sort();
genreFilter.innerHTML += genres
    .map(genre => `<option value="${genre}">${genre}</option>`)
    .join("");

// Restore the saved genre choice
genreFilter.value = localStorage.getItem("pulselab-genre") || "all";

function saveFavorites() {
    localStorage.setItem("pulselab-favorites", JSON.stringify(favorites));
}

function render() {
    const genre = genreFilter.value;

    // Array methods: filter by genre, then by favorites
    const filtered = beats
        .filter(beat => genre === "all" || beat.genre === genre)
        .filter(beat => !favoritesOnly.checked || favorites.includes(beat.id));

    grid.innerHTML = filtered.length
        ? filtered.map(beatCard).join("")
        : "<p>No beats match your filters.</p>";

    // Mark favorited cards
    grid.querySelectorAll(".details-button").forEach(button => {
        if (favorites.includes(Number(button.dataset.id))) {
            button.closest(".beat-card").classList.add("favorite");
        }
    });

    resultCount.textContent = `Showing ${filtered.length} of ${beats.length} beats`;
}

function fillModal() {
    const beat = currentBeat;
    const isFavorite = favorites.includes(beat.id);

    modalContent.innerHTML = `
    <h2 id="modal-title">${beat.title}</h2>
    <p class="genre">${beat.genre}</p>
    <p>${beat.description}</p>
    <ul>
      <li>Tempo: ${beat.bpm} BPM</li>
      <li>Key: ${beat.key}</li>
      <li>Mood: ${beat.mood}</li>
      <li>Price: $${beat.price}</li>
    </ul>
    <button type="button" id="favorite-toggle" class="button" aria-pressed="${isFavorite}">
      ${isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>`;
}

function openModal(id) {
    currentBeat = beats.find(beat => beat.id === id);
    fillModal();
    modal.showModal(); // built-in focus trap and Esc to close
}

// Filter events
genreFilter.addEventListener("change", () => {
    localStorage.setItem("pulselab-genre", genreFilter.value);
    render();
});
favoritesOnly.addEventListener("change", render);

// One listener on the grid handles every "View Details" button
grid.addEventListener("click", event => {
    const button = event.target.closest(".details-button");
    if (button) openModal(Number(button.dataset.id));
});

// Favorite toggle inside the modal
modalContent.addEventListener("click", event => {
    if (!event.target.closest("#favorite-toggle")) return;

    favorites = favorites.includes(currentBeat.id)
        ? favorites.filter(id => id !== currentBeat.id)
        : [...favorites, currentBeat.id];

    saveFavorites();
    fillModal();
    render(); // refresh cards behind the modal
    document.querySelector("#favorite-toggle").focus(); // keep keyboard focus
});

// Close with the button or by clicking the backdrop
closeButton.addEventListener("click", () => modal.close());
modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
});

render();