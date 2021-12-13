const postsData = require("../data.json");

class Post{
    constructor(data){
        this.id = data.id;
        this.text = data.text;
        this.giphyUrl = data.giphyUrl;
        this.reactions = data.reactions;
        this.comments = data.comments;
    }

    static get all(){
        return postsData;
    }

    static findById(id){
        const postData = postsData.filter((post) => post.id === id)[0];
        const post = new Post(postData);
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