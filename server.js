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
        const { genre, rating } = req.body;

        const minRating = rating && rating !== "0" ? rating : 7;

        // Choose 3 random pages
        const randomPages = Array.from({ length: 3 }, () =>
            Math.floor(Math.random() * 20) + 1
        );

        let allMovies = [];

        for (let page of randomPages) {
            const response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    params: {
                        api_key: TMDB_API_KEY,
                        with_genres: genre || undefined,
                        sort_by: "popularity.desc",
                        "vote_average.gte": minRating,
                        "vote_count.gte": 300,
                        page: page
                    }
                }
            );

            allMovies = allMovies.concat(response.data.results);
        }

        // Remove duplicates
        const uniqueMovies = Array.from(
            new Map(allMovies.map(movie => [movie.id, movie])).values()
        );

        // Shuffle
        const shuffled = uniqueMovies.sort(() => 0.5 - Math.random());

        // Take top 5
        const selected = shuffled.slice(0, 5);

        res.json({ films: selected });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});