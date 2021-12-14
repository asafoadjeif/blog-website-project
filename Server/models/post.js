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
        const post = postsData.filter((post) => post.id === this.id)[0];
        postsData.splice(postsData.indexOf(post), 1);
    };
};

module.exports = Post;