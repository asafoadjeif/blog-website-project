const express = require("express");
const postRoutes = require("./controllers/post");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to insert name here");
});

app.use("/posts", postRoutes);

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

module.exports = app;