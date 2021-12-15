// const { add } = require("../../../Server/models/post");

// const res = require("express/lib/response");

const postList = document.getElementById('postList');
const apiDomain = 'https://fp-snappy.herokuapp.com/';
const gifDisplay = document.getElementById('gifResults');
postBtn = document.getElementById('postBtn');
gifBtn = document.getElementById('gifBtn');
let imgSource;

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
      console.log(obj);

      for (let i = 0; i < obj.length; i++) {
        // Create an image and set its source to the current image
        console.log(obj[i]);
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
          const gif = document.createElement("img");
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
// function Add Post
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
    .then((obj) => {
      console.log(obj)
      })

      loadContent();
})






// *******************************
// function Add Comments
// *******************************









// ******************************
// function Add Reactions 
// ******************************







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
fetch(`${apiDomain}posts`)
    .then((response) => response.json())
    .then((obj) => {
      const postDisplay = document.getElementById("postList");

      for (let i = obj.length - 1; i > -1; i--) {

      
            // create a card to show posts 
            const postCard = document.createElement('div');
            postCard.classList.add('card');
            console.log(obj.length)
            
            // newRow.setAttribute('id', i)
            // const newCol1 = document.createElement('div');
            // newCol1.classList.add('col');

            
            
            // create image for card
            const postImg = document.createElement('img');
            postImg.src = obj[i].giphyUrl;

            // create card text, body, footer
            const postBody = document.createElement('div');
            postBody.classList.add('card-body');
            postBody.textContent= obj[i].text;
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

            react1.setAttribute('id', `like:${obj.id}`);
            react2.setAttribute('id', `dislike:${obj.id}`);
            react3.setAttribute('id', `heart:${obj.id}`);
            commentBtn.setAttribute('id', `comment:${obj.id}`);

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
              fetch(`${apiDomain}posts/reactions/${obj[i].id}`, options)
            })

            react2.addEventListener('click', e => {
              e = {emojiId: 1};
              options = {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/JSON'},
                body: JSON.stringify(e)
              }
              fetch(`${apiDomain}posts/reactions/${obj[i].id}`, options)
            })

            react3.addEventListener('click', e => {
              e = {emojiId: 2};
              options = {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/JSON'},
                body: JSON.stringify(e)
              }
              fetch(`${apiDomain}posts/reactions/${obj[i].id}`, options)
            })



            
            
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