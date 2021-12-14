const postsData = require("../data.json");

class Post{
    constructor(data){
        this.id = data.id;
        this.text = data.text;
        this.giphyUrl = data.giphyUrl;
        this.reactions = {thumbsUp: 0, thumbsDown: 0, heart: 0};
        this.comments = [];
    }

    static get all(){
        return postsData;
    }

    static findById(id){
        const post = postsData.filter((post) => post.id === id)[0];
        return post;
    };

    static add(post) {
        const newPostId = postsData[postsData.length - 1].id + 1;
        const newPost = new Post({ id: newPostId, ...post });
        postsData.push(newPost);
        return newPost;
    };

    delete() {
        postsData.splice(postsData.indexOf(this), 1);
    };

    static addComment(id, comment) {
        const post = postsData.filter((post) => post.id === id)[0];
        post.comments.push(comment);
        postsData[postsData.indexOf(post)] = post;
        return post
    };

    static addReaction(id, emojiId) {
        const post = postsData.filter((post) => post.id === id)[0];
        switch(emojiId) {
            case 0:
                post.reactions.thumbsUp += 1;
                break;
            case 1:
                post.reactions.thumbsDown += 1;
                break;
            case 2:
                post.reactions.heart += 1;
                break;
            default:
                break;
        };
        postsData[postsData.indexOf(post)] = post;
        return post
    };
};

module.exports = Post;