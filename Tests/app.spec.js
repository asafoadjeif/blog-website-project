const request = require('supertest');
const app = require('../Server/index');

describe('API server', () => {
    const port = 5000;
    let api;
    let testPost = {
        // id: 0,
        'text': 'Test post',
        'giphyUrl': '',
    }

    beforeAll(() => {
        api = app.listen(port, () => {
            console.log(`Express is running on port ${port}`)
        })
    });

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status of 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /posts with status of 200', (done) => {
        request(api).get('/posts').expect(200, done);
    });

    it("Giphy search route responds", (done) => {
        request(api).get("/giphy/search").expect(200, done);
    });

    it('retrieves a post by id', (done) => {
        request(api)
            .get('/posts/1')
            .expect(200)
            .expect({'id': 1, 
                "text": "Hello World!", 
                "giphyUrl": "", 
                "reactions": {
                    "thumbsUp": 0,
                    "thumbsDown": 0,
                    "heart": 0
                },
                'comments': ["Test comment!"]}, done)
    })
    
    it('handle post id outside of range', (done) => {
        request(api)
            .get('/posts/0')
            .expect(404)
            .expect('Post does not exist.', done)
    })

    //create new post
    it('responds to post /posts with status 201', async() => {
        const numPosts = await request(api)
            .get('/posts');
        await request(api)
            .post('/posts')
            .send(testPost)
            .expect(201)
            .expect({id:numPosts.body.length + 1, ...testPost, reactions: {thumbsUp: 0, thumbsDown: 0, heart: 0}, comments: []})
    });

    //delete post
    it('responds to delete /posts/:id with status of 204', async() => {
        const previousStudents = await request(api)
            .get('/posts');
        await request(api)
            .delete(`/posts/${previousStudents.body.length}`)
            .expect(204)
        const updatedStudents = await request(api)
            .get('/posts');
        
        expect(updatedStudents.body.length).toBe(previousStudents.body.length - 1);
    })

    //create new comment
    it('responds to post /comments/:id with status 201', async() => {
        const postObj = await request(api)
            .get('/posts/1');
        let testComment = {comment: 'Test comment'};
        postObj.body.comments.push(testComment.comment);
        await request(api)
            .patch('/posts/comments/1')
            .send(testComment)
            .expect(201)
            .expect(postObj.body)
    });

    //add reaction thumbs up
    it('responds to post /reactions/:id with status 201', async() => {
        const postObj = await request(api)
            .get('/posts/1');
        postObj.body.reactions.thumbsUp += 1;
        await request(api)
            .patch('/posts/reactions/1')
            .send({emojiId: 0})
            .expect(201)
            .expect(postObj.body)
    });

    //add reaction thumbs down
    it('responds to post /reactions/:id with status 201', async() => {
        const postObj = await request(api)
            .get('/posts/1');
        postObj.body.reactions.thumbsDown += 1;
        await request(api)
            .patch('/posts/reactions/1')
            .send({emojiId: 1})
            .expect(201)
            .expect(postObj.body)
    });

    //add reaction heart
    it('responds to post /reactions/:id with status 201', async() => {
        const postObj = await request(api)
            .get('/posts/1');
        postObj.body.reactions.heart += 1;
        await request(api)
            .patch('/posts/reactions/1')
            .send({emojiId: 2})
            .expect(201)
            .expect(postObj.body)
    });
    
    //handle non-existant reaction 
    it('responds to post /reactions/:id with status 201', async() => {
        const postObj = await request(api)
            .get('/posts/1');
        await request(api)
            .patch('/posts/reactions/1')
            .send({emojiId: -1})
            .expect(201)
            .expect(postObj.body)
    });
});