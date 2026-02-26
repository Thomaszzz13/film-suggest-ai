const button = document.getElementById("suggestBtn");
const input = document.getElementById("userInput");
const resultDiv = document.getElementById("results");

button.addEventListener("click", function() {
    const userText = input.value;
    
    if (userText.trim()=== "") {
        resultDiv.innerHTML = "<p>Please describe what you want.</p>";
        return;
    }

    resultDiv.innerHTML = `
        <h3>Suggested Films</h3>
        <ul>
            <li>In the mood for love</li>
            <li>Eternal Sunshine of the Spotless Mind</li>
            <li>Paris, Texas</li>
        </ul>
    `
});