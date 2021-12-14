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

router.get("/:id/comments", (req, res) => {
    try{
        const postId = parseInt(req.params.id);
        const selectedPost = Post.findById(postId);
        res.send(selectedPost.comments);
    } catch {
        res.status(404).send("Post does not exist.");
    }
});

router.get("/:id/reactions", (req, res) => {
    try{
        const postId = parseInt(req.params.id);
        const selectedPost = Post.findById(postId);
        res.send(selectedPost.reactions);
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

router.patch('/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const comment = req.body;
    const selectedPost = Post.findById(postId);
    selectedPost.addComment(comment);
    res.status(201).send(selectedPost);
});

router.patch('/:id/reactions', (req, res) => {
    const postId = parseInt(req.params.id);
    const emojiId = parseInt(req.body);
    const selectedPost = Post.findById(postId);
    selectedPost.addReaction(emojiId);
    res.status(201).send(selectedPost);
});

module.exports = router;