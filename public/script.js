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
        <div class="movie-grid">
            ${data.films.map(film => `
                <div class="movie-card">
                    <div class="poster-container">
                        <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
                        <div class="overlay">
                            <p>${film.overview || "No description available."}</p>
                        </div>
                    </div>
                    <div class="movie-info">
                        <h4>${film.title}</h4>
                        <p>${film.release_date?.split("-")[0] || "N/A"} • ⭐ ${film.vote_average}</p>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
    
});