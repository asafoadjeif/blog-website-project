const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const cors = require('cors');

router.use(cors());

router.get("/", (req, res) => {
    const post = Post.all;
    res.send(post);
});

router.get("/:id", (req, res) => {
    try{
        const postId = parseInt(req.params.id);
        const selectedPost = Post.findById(postId);
        res.send(selectedPost);
    } catch {
        res.status(404).send("Post does not exist.");
    }
});

router.post('/', (req, res) => {
    const post = req.body;
    const newPost = Post.add(post);
    res.status(201).send(newPost);
});

router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const selectedPost = Post.findById(postId);
    selectedPost.delete();
    res.status(204).send();
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