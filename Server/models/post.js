const postsData = require("../data");

class Post{
    constructor(data){
        this.id = data.id;
        this.text = data.text;
        this.giphyUrl = data.giphyUrl;
        this.emojiCount1 = data.emojiCount1;
        this.emojiCount2 = data.emojiCount2;
        this.emojiCount3 = data.emojiCount3;
        this.comments = data.comments;
    }
    static get all(){
        const posts = postsData.map((post) => new Post(post));
        return posts;
    }
};

module.exports = Post;