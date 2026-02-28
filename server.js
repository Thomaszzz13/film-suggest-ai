const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.post("/suggest", async (req, res) => {
    try {
        const userText = req.body.text.toLowerCase();
        const words = userText.split(" ");

        // Basic genre detection
        const genreMap = {
            action: 28,
            comedy: 35,
            romantic: 10749,
            love: 10749,
            drama: 18,
            sad: 18,
            horror: 27,
            thriller: 53,
            crime: 80,
            sci: 878,
            war: 10752
        };

        let detectedGenres = [];

        for (let word of words) {
            if (genreMap[word]) {
                detectedGenres.push(genreMap[word]);
            }
        }

        const genreQuery = detectedGenres.join(",");

// Fetch larger pool with stricter quality filters
const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
        params: {
            api_key: TMDB_API_KEY,
            with_genres: genreQuery || undefined,
            sort_by: "vote_average.desc",
            "vote_count.gte": 500,
            page: 1
        }
    }
);

let movies = response.data.results.slice(0, 40);

// Scoring system
const scoredMovies = movies.map(movie => {
    let score = 0;

    // Require all detected genres
    const genreMatchCount = movie.genre_ids.filter(id =>
        detectedGenres.includes(id)
    ).length;

    score += genreMatchCount * 5;

    // Strong keyword matching
    const overview = movie.overview.toLowerCase();

    for (let word of words) {
        if (overview.includes(word)) {
            score += 4;
        }
    }

    // Rating weight stronger
    score += movie.vote_average;

    return { ...movie, score };
});

        // Sort by score
        scoredMovies.sort((a, b) => b.score - a.score);

        const topMovies = scoredMovies.slice(0, 5);

        res.json({ films: topMovies });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});