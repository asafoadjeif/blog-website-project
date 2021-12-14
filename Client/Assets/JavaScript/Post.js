const { add } = require("../../../Server/models/post");

const postList = document.getElementById('postList');
const apiDomain = 'http://localhost:3000/'

postBtn = document.getElementById('postBtn');
gifBtn = document.getElementById('gifBtn');



//SCRIPT FUNCTIONS TO ALTER WEBPAGE


// ******************************
// function add  giphyAPI to add gif button
// ******************************

gifBtn.addEventListener('click', (e) => {
  e.preventDefault(); 

  let search = document.getElementById("gifSearch").value;

  search = search.replace(/\s/g, "+");

  fetch(`${apiDomain}gifs/${search}`)
    .then((response) => response.json())
    .then((obj) => {
      const gifDisplay = document.getElementById("gifs");

      for (let i = 0; i < obj.length; i++) {
        // Create an image and set its source to the current image
        const tempImg = document.createElement("img");
        tempImg.classList.add("gif-img");
        tempImg.src = obj[i].images.original.url;

        // Add an event listener to each photo
        tempImg.addEventListener("click", (e) => {
          // store the source of the clicked image
          const imgSource = e.target.src;

          // close the popup when image is selected
          document.getElementById("gifPopup").style.display = "none";

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
    message = document.querySelector("#textBox").value;
    
data = {
    text: message,
    giphyUrl: 'giphyUrl',
    reactions: 'reactions',
    comments: 'comments',
}


const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

    fetch(`http://localhost:3000/posts`, options)
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

addEventListener('DOMCONTENTLOADED', loadContent);

function loadContent(){


fetch(`${apiDomain}posts`)
    .then((response) => response.json())
    .then((obj) => {
      const postDisplay = document.getElementById("postList");

      for (let i = 0; i < obj.length; i++) {

      
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

            // create buttons and their IDs
            const react1 = document.createElement('button');
            const react2 = document.createElement('button');
            const react3 = document.createElement('button');
            const commentBtn = document.createElement('button');

            react1.setAttribute('id', 'like');
            react2.setAttribute('id', 'dislike');
            react3.setAttribute('id', 'funny');
            commentBtn.setAttribute('id', 'comment');

            emojiBar.append(react1);
            emojiBar.append(react2);
            emojiBar.append(react3);
            emojiBar.append(commentBtn);



            
            
      }
        })
      }





// script functions to fetch data from server
let port = 3000;
function getPost () {
    fetch(`http://localhost:3000/posts`).
    then( r => r.json()).
    then(data => console.log(data))
}

getPost();