// Fetch beats from the local JSON file with error handling
export async function getBeats() {
    try {
        const response = await fetch("data/beats.json");
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return await response.json(); // parse JSON body
    } catch (error) {
        console.error("Could not load beats:", error);
        return [];
    }
}

// Build one beat card (template literal), reused on both pages
export function beatCard(beat) {
    return `
    <article class="beat-card">
      <h3>${beat.title}</h3>
      <p class="genre">${beat.genre}</p>
      <ul>
        <li>${beat.bpm} BPM</li>
        <li>Key: ${beat.key}</li>
        <li>Mood: ${beat.mood}</li>
      </ul>
      <p class="price">$${beat.price}</p>
      <button type="button" class="details-button" data-id="${beat.id}">View Details</button>
    </article>`;
}