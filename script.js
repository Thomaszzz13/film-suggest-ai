const button = document.getElementById("suggestBtn");
const input = document.getElementById("userInput");
const resultsDiv = document.getElementById("results");

const films = [
    { title: "Manchester by the Sea", mood: "sad" },
    { title: "In the Mood for Love", mood: "romantic" },
    { title: "The Grand Budapest Hotel", mood: "fun" },
    { title: "Blade Runner 2049", mood: "dark" },
    { title: "Eternal Sunshine of the Spotless Mind", mood: "emotional" }
];

button.addEventListener("click", function () {

    const userText = input.value.toLowerCase();

    if (userText.trim() === "") {
        resultsDiv.innerHTML = "<p>Please describe what you want.</p>";
        return;
    }

    const matchedFilms = films.filter(film => 
        userText.includes(film.mood)
    );

    if (matchedFilms.length === 0) {
        resultsDiv.innerHTML = "<p>No exact match found. Try different words.</p>";
        return;
    }

    resultsDiv.innerHTML = `
        <h3>Suggested Films:</h3>
        <ul>
            ${matchedFilms.map(film => `<li>${film.title}</li>`).join("")}
        </ul>
    `;
});