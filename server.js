const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

const films = [
    { title: "Manchester by the Sea", mood: "sad" },
    { title: "In the Mood for Love", mood: "romantic" },
    { title: "The Grand Budapest Hotel", mood: "fun" },
    { title: "Blade Runner 2049", mood: "dark" },
    { title: "Eternal Sunshine of the Spotless Mind", mood: "emotional" }
];

// API endpoint
app.post("/suggest", (req, res) => {
    const userText = req.body.text.toLowerCase();

    const matchedFilms = films.filter(film =>
        userText.includes(film.mood)
    );

    if (matchedFilms.length === 0) {
        return res.json({ films: [] });
    }

    res.json({ films: matchedFilms });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});