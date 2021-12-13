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
};

module.exports = Post;