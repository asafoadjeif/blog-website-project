const request = require('supertest');
const app = require('../index');

describe('API server', () => {
    const port = 5000;
    let api;
    let testPost = {
        // id: 0,
        'text': 'Test post',
        'giphyUrl': '',
        'reactions': {
            'thumbsUp': 0, 
            'thumbsDown': 1, 
            'heart': 2, 
        },
        'comments': ['Test comment']
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
                'comments': "Test comment!"}, done)
    })

    //create new post
    it('responds to post /posts with status 201', async() => {
        const numStudents = await request(api)
            .get('/posts');
        await request(api)
            .post('/posts')
            .send(testPost)
            .expect(201)
            .expect({id:numStudents.body.length + 1, ...testPost})
    });

    //delete post
    it('responds to delete /posts/:id with status of 204', async() => {
        const previousStudents = await request(api)
            .get('/posts');
        await request(api)
            .delete('/posts/previousStudents.body.length')
            .expect(204)
        const updatedStudents = await request(api)
            .get('/posts');
        
        expect(updatedStudents.body.length).toBe(previousStudents.body.length - 1);
    })

});