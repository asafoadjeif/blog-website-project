const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const cors = require('cors');

router.use(cors());

router.get("/", (req, res) => {
    const post = Post.all;
    res.send(post);
});

module.exports = router;