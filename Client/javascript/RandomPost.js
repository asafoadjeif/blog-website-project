// const { response } = require("../../../Server");

const postList = document.getElementById('postList');
const apiDomain = 'https://fp-snappy.herokuapp.com/';
const settingsButton = document.getElementById('settingsButton');
const randomBtn = document.getElementById('random')

postBtn = document.getElementById('postBtn');
gifBtn = document.getElementById('gifBtn');
let imgSource;



function loadContent(){
    function removeAllChildNodes() {
        while (postList.firstChild) {
            postList.removeChild(postList.firstChild);
        }
    }

    removeAllChildNodes();
    fetch(`${apiDomain}posts/`)
        .then((response) => response.json())
        .then((obj) => {
      

        let id = Math.floor(Math.random()*obj.length)

        obj = obj[id];

        const postDisplay = document.getElementById("postList");        
                // create a card to show posts 
                const postCard = document.createElement('div');
                postCard.classList.add('card');
                // console.log(obj.length)
                
                // newRow.setAttribute('id', i)
                // const newCol1 = document.createElement('div');
                // newCol1.classList.add('col');

                
                
                // create image for card
                const postImg = document.createElement('img');
                postImg.src = obj.giphyUrl;

                // create card text, body, footer
                const postBody = document.createElement('div');
                postBody.classList.add('card-body');
                postBody.textContent= obj.text;
                const emojiBar = document.createElement('div');
                emojiBar.classList.add('card-footer');

                postBody.classList.add('text-center');

                postCard.append(postImg);
                postCard.append(postBody);
                postCard.append(emojiBar);
                postList.append(postCard);

                // create buttons and their IDs / classes
                const react1 = document.createElement('button');
                const react2 = document.createElement('button');
                const react3 = document.createElement('button');
                const commentBtn = document.createElement('button');

                react1.textContent = `${String.fromCodePoint(0x1F44D)} ${obj.reactions.thumbsUp}`;
                react2.textContent = `${String.fromCodePoint(0x1F44E)} ${obj.reactions.thumbsDown}`;
                react3.textContent = `${String.fromCodePoint(0x1F497)} ${obj.reactions.heart}`;
                commentBtn.textContent = String.fromCodePoint(0x1F4AC);

                react1.setAttribute('id', `like:${obj.id}`);
                react2.setAttribute('id', `dislike:${obj.id}`);
                react3.setAttribute('id', `heart:${obj.id}`);
                commentBtn.setAttribute('id', `comment:${obj.id}`);
                commentBtn.setAttribute('type', 'button');
                commentBtn.setAttribute('data-bs-toggle', 'collapse');
                commentBtn.setAttribute('data-bs-target', `#comments${obj.id}`);

                react1.classList.add('like');
                react2.classList.add('dislike');
                react3.classList.add('heart');
                commentBtn.classList.add('comment');

                react1.classList.add('reactBtn');
                react2.classList.add('reactBtn');
                react3.classList.add('reactBtn');
                commentBtn.classList.add('reactBtn');

                emojiBar.append(react1);
                emojiBar.append(react2);
                emojiBar.append(react3);
                emojiBar.append(commentBtn);

                // add event listener to each button 
                

                react1.addEventListener('click', e => {
                    e = {emojiId: 0};
                    options = {
                        method: 'PATCH',
                        headers: {'Content-Type' : 'application/JSON'},
                        body: JSON.stringify(e),
                
                    }
                    fetch(`${apiDomain}posts/reactions/${obj.id}`, options)
                    .then((response) => response.json())
                    .then((newObj) => react1.textContent = `${String.fromCodePoint(0x1F44D)} ${newObj.reactions.thumbsUp}`);
                })

                react2.addEventListener('click', e => {
                    e = {emojiId: 1};
                    options = {
                        method: 'PATCH',
                        headers: {'Content-Type' : 'application/JSON'},
                        body: JSON.stringify(e)
                    }
                    fetch(`${apiDomain}posts/reactions/${obj.id}`, options)
                    .then((response) => response.json())
                    .then((newObj) => react2.textContent = `${String.fromCodePoint(0x1F44E)} ${newObj.reactions.thumbsDown}`);
                })

                react3.addEventListener('click', e => {
                    e = {emojiId: 2};
                    options = {
                        method: 'PATCH',
                        headers: {'Content-Type' : 'application/JSON'},
                        body: JSON.stringify(e)
                    }
                    fetch(`${apiDomain}posts/reactions/${obj.id}`, options)
                    .then((response) => response.json())
                    .then((newObj) => react3.textContent = `${String.fromCodePoint(0x1F497)} ${newObj.reactions.heart}`);
                })

                const commentSection = document.createElement('div');
                commentSection.setAttribute('id', `comments${obj.id}`);
                commentSection.classList.add('collapse');
                emojiBar.append(commentSection);
                const commentSectionText = document.createElement('div');
                commentSection.append(commentSectionText);
                for (let j = 0; j < obj.comments.length; j++) {
                const comment = document.createElement('p');
                comment.textContent = obj.comments[j];
                commentSectionText.append(comment);
                };
                const commentSectionForm = document.createElement('div');
                commentSection.append(commentSectionForm);
                const commentForm = document.createElement('form');
                commentForm.setAttribute('id', `commentForm${obj.id}`);
                commentSectionForm.append(commentForm);
                const commentFormInput = document.createElement('input');
                commentFormInput.setAttribute('type', 'text');
                commentFormInput.setAttribute('id', `commentText${obj.id}`);
                commentFormInput.setAttribute('name', 'commentText');
                commentFormInput.setAttribute('placeholder', 'Enter comment here!');
                commentFormInput.setAttribute('maxlength', '240');
                commentFormInput.setAttribute('required', undefined);
                const commentFormSubmit = document.createElement('button');
                commentFormSubmit.setAttribute('type', 'submit');
                commentFormSubmit.textContent = 'Submit';
                commentForm.append(commentFormInput);
                commentForm.append(commentFormSubmit);
                commentForm.addEventListener("submit", e => {
                e.preventDefault();
                const commentText = {comment: e.target.commentText.value};
                options = {
                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/JSON'},
                    body: JSON.stringify(commentText),
                }
                fetch(`${apiDomain}posts/comments/${obj.id}`, options)
                .then((response) => response.json())
                const comment = document.createElement('p');
                comment.textContent = e.target.commentText.value;
                commentSectionText.append(comment);
                });
            }
                
            )
        }
        
randomBtn.addEventListener('click', (e) => {
    e.preventDefault;
    loadContent();
})

loadContent();

