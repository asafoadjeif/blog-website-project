const express = require("express");
const postRoutes = require("./controllers/post");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to insert name here");
});

app.get("/giphy/:search", (req, res) => {
    try {
        const search = req.params.search;
        if (search.length === 0) {
            throw new Error("No search term");
        } else {
            const url = `https://api.giphy.com/v1/gifs/search?&api_key=${process.env.GIPHY_KEY}&q=${search}&limit=10`;
            axios.get(url)
            .then(response => res.send(response.data.data))
            .catch(error => res.send(error.message));
        };
    } catch (error) {
        res.send(error.message)
    };
});

app.use("/posts", postRoutes);

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

module.exports = app;