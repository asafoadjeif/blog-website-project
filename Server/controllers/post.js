const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const cors = require('cors');
const e = require("express");

router.use(cors());

router.get("/", (req, res) => {
    const post = Post.all;
    res.send(post);
});

router.get("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const selectedPost = Post.findById(postId);
    if(selectedPost !== undefined) {
        res.send(selectedPost);
    } else {
        res.status(404).send("Post does not exist.");
    };
});

router.post('/', (req, res) => {
    const post = req.body;
    const newPost = Post.add(post);
    res.status(201).send(newPost);
});

router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const selectedPost = Post.findById(postId);
    if(selectedPost !== undefined) {
        selectedPost.delete();
        res.status(204).send();
    } else {
        res.status(404).send("Post does not exist.");
    };
});

router.patch('/comments/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const comment = req.body.comment;
    const newPost = Post.addComment(postId, comment);
    res.status(201).send(newPost);
});

router.patch('/reactions/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const emojiId = req.body.emojiId;
    const newPost = Post.addReaction(postId, emojiId);
    res.status(201).send(newPost);
});

module.exports = router;