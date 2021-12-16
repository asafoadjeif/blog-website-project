const postList = document.getElementById('postList');
const apiDomain = 'https://fp-snappy.herokuapp.com/';
const gifDisplay = document.getElementById('gifResults');
postBtn = document.getElementById('postBtn');
gifBtn = document.getElementById('gifBtn');
let imgSource = '';
let postImg = '';
let gif;

//SCRIPT FUNCTIONS TO ALTER WEBPAGE



// ******************************
// function add  giphyAPI to add gif button
// ******************************

gifBtn.addEventListener('click', (e) => {
  e.preventDefault(); 

  let search = document.getElementById("gifSearch").value;

  search = search.replace(/\s/g, "+");

  fetch(`${apiDomain}giphy/${search}`)
    .then((response) => response.json())
    .then((obj) => {
    
      const gifDisplay = document.getElementById("gifResults");
      gifDisplay.textContent = '';

      for (let i = 0; i < obj.length; i++) {
        // Create an image and set its source to the current image
        const tempImg = document.createElement("img");
        tempImg.classList.add("gif-img");
        tempImg.src = obj[i].images.original.url;

        // Add an event listener to each photo
        tempImg.addEventListener("click", (e) => {
          // store the source of the clicked image
          imgSource = e.target.src;

          // close the popup when image is selected
          $('#gifs').collapse({toggle: false})
          // Add it to the dom
          if (document.getElementById('gifToAdd')) {
            document.getElementById('gifToAdd').remove()
          }
          gif = document.createElement("img");
          gif.src = imgSource;
          gif.id = "gifToAdd";

  // MAKE WAY TO LIMIT HEIGHT OF PREVIEW IN FUNCTION 

          document.querySelector("form").append(gif);
        });
        gifDisplay.append(tempImg);
        
      }
    })


})

// ******************************
// funtion CancelButton removes gif
// ******************************

function removeGif () {
  imgSource = '';
  document.querySelector("form").removeChild(gif);

}



// ******************************
// function Make Post
// ******************************

postBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let message = document.querySelector("#textBox").value;
    
data = {
    text: message,
    giphyUrl:`${imgSource}`,
}


const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

    fetch(`${apiDomain}posts`, options)
    .then((response) => response.json())

      loadContent();
})




// ******************************
// function to load content to site
// ******************************



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
      const postDisplay = document.getElementById("postList");

      for (let i = obj.length - 1; i > -1; i--) {

            
      
            // create a card to show posts 
            const postCard = document.createElement('div');
            postCard.classList.add('card');
            postCard.classList.add('w-80');
            
            // newRow.setAttribute('id', i)
            // const newCol1 = document.createElement('div');
            // newCol1.classList.add('col');

            
            
            // create image for card



            if (obj[i].giphyUrl != 'undefined') {
              postImg = document.createElement('img');
              postImg.classList.add('cardImg')
              postImg.src = obj[i].giphyUrl;
            }
            // create card text, body, footer
            const postBody = document.createElement('div');
            postBody.classList.add('card-body');
            postBody.textContent= obj[i].text;
            const emojiBar = document.createElement('div');
            emojiBar.classList.add('card-footer');

            postBody.classList.add('text-center');

            postBody.append(postImg);
            
            if (obj[i].giphyUrl != 'undefined') {
              postCard.append(postImg);
            }
            postCard.append(postBody);
            postCard.append(emojiBar);
            // postList.append(postCard);

            // create buttons and their IDs / classes
            const react1 = document.createElement('button');
            const react2 = document.createElement('button');
            const react3 = document.createElement('button');
            const commentBtn = document.createElement('button');
            react1.textContent = `${String.fromCodePoint(0x1F44D)} ${obj[i].reactions.thumbsUp}`;
            react2.textContent = `${String.fromCodePoint(0x1F44E)} ${obj[i].reactions.thumbsDown}`;
            react3.textContent = `${String.fromCodePoint(0x1F497)} ${obj[i].reactions.heart}`;
            commentBtn.textContent = String.fromCodePoint(0x1F4AC);

            react1.setAttribute('id', `like${obj[i].id}`);
            react2.setAttribute('id', `dislike${obj[i].id}`);
            react3.setAttribute('id', `heart${obj[i].id}`);
            commentBtn.setAttribute('id', `comment${obj[i].id}`);
            commentBtn.setAttribute('type', 'button');
            commentBtn.setAttribute('data-bs-toggle', 'collapse');
            commentBtn.setAttribute('data-bs-target', `#comments${obj[i].id}`);

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

            // add event listener to each button, track amount of responses given
            

            react1.addEventListener('click', e => {
              e = {emojiId: 0};
              options = {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/JSON'},
                body: JSON.stringify(e),
              
              }
              fetch(`${apiDomain}posts/reactions/${obj[i].id}`, options)
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
              fetch(`${apiDomain}posts/reactions/${obj[i].id}`, options)
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
              fetch(`${apiDomain}posts/reactions/${obj[i].id}`, options)
              .then((response) => response.json())
              .then((newObj) => react3.textContent = `${String.fromCodePoint(0x1F497)} ${newObj.reactions.heart}`);
            })

            const commentSection = document.createElement('div');
            commentSection.setAttribute('id', `comments${obj[i].id}`);
            commentSection.classList.add('collapse');
            emojiBar.append(commentSection);
            const commentSectionText = document.createElement('div');
            commentSection.append(commentSectionText);
            for (let j = 0; j < obj[i].comments.length; j++) {
              const comment = document.createElement('p');
              comment.textContent = obj[i].comments[j];
              commentSectionText.append(comment);
            };
            const commentSectionForm = document.createElement('div');
            commentSection.append(commentSectionForm);
            const commentForm = document.createElement('form');
            commentForm.setAttribute('id', `commentForm${obj[i].id}`);
            commentSectionForm.append(commentForm);
            const commentFormInput = document.createElement('textarea');
            commentFormInput.setAttribute('type', 'text');
            commentFormInput.setAttribute('id', `commentText${obj[i].id}`);
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
              fetch(`${apiDomain}posts/comments/${obj[i].id}`, options)
              .then((response) => response.json())
              const comment = document.createElement('p');
              comment.textContent = e.target.commentText.value;
              commentSectionText.append(comment);
            });

          if( (obj.length - i)%2 !=0  ) {
            console.log('this will be a post on a new row ')
            let cardRow = document.createElement('div');
            let cardCol = document.createElement('div');
            cardRow.append(cardCol);
            cardRow.setAttribute('id', `row${i}`);
            cardCol.setAttribute('id', `col${i}`);
            
            cardRow.classList.add('row');
            // cardRow.classList.add('g-5');
            cardRow.classList.add('postRow');
            cardCol.classList.add('col-sm');
            cardCol.classList.add('postCol');
            cardCol.classList.add('d-flex');
            cardCol.classList.add('justify-content-center');
            cardCol.classList.add('align-items-stretch');
            postList.append(cardRow); 
            cardCol.append(postCard);
          }
          else {console.log('this will be a post on the same row')
            let cardCol = document.createElement('div');
            cardCol.setAttribute('id', `col${i}`);
            cardCol.classList.add('justify-content-center');
            cardCol.classList.add('col-sm');
            cardCol.classList.add('postCol');
            cardCol.classList.add('d-flex');
            cardCol.classList.add('align-items-stretch');
            
            document.querySelector(`#row${i+1}`).append(cardCol);
            cardCol.append(postCard);
            }

          // let cardCol = document.createElement('div');
          // cardCol.classList.add('col');
          // cardCol.append(postCard);
          // postList.append(cardCol);

          
          






            
            
      }
        })
      }
    





// script functions to fetch data from server
// let port = 3000;
// function getPost () {
//     fetch(``).
//     then( r => r.json()).
//     then(data => console.log(data))
// }

// getPost();
loadContent();