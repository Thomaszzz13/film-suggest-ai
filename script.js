const button = document.getElementById("suggestBtn");
const input = document.getElementById("userInput");
const resultsDiv = document.getElementById("results");

button.addEventListener("click", async function () {

    const userText = input.value;

    if (userText.trim() === "") {
        resultsDiv.innerHTML = "<p>Please describe what you want.</p>";
        return;
    }

    const response = await fetch("/suggest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: userText })
    });

    const data = await response.json();

    if (data.films.length === 0) {
        resultsDiv.innerHTML = "<p>No exact match found.</p>";
        return;
    }

    resultsDiv.innerHTML = `
        <h3>Suggested Films:</h3>
        <ul>
            ${data.films.map(film => `<li>${film.title}</li>`).join("")}
        </ul>
    `;
});