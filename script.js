const button = document.getElementById("suggestBtn");
const genreSelect = document.getElementById("genreSelect");
const ratingSelect = document.getElementById("ratingSelect");
const resultsDiv = document.getElementById("results");

button.addEventListener("click", async function () {

    const genre = genreSelect.value;
    const rating = ratingSelect.value;

    const response = await fetch("/suggest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            genre,
            rating
        })
    });

    const data = await response.json();

    if (!data.films || data.films.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    resultsDiv.innerHTML = `
        <h3>Suggested Films:</h3>
        <ul>
            ${data.films.map(film => 
                `<li>${film.title} (${film.release_date?.split("-")[0] || "N/A"}) - ⭐ ${film.vote_average}</li>`
            ).join("")}
        </ul>
    `;
});