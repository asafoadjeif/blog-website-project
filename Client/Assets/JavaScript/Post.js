
postBtn = document.getElementById('postBtn')


//SCRIPT FUNCTIONS TO ALTER WEBPAGE
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
})






// *******************************
// function Add Comments
// *******************************









// ******************************
// function Add Reactions 
// ******************************















// script functions to fetch data from server
let port = 3000;
function getPost () {
    fetch(`http://localhost:3000/posts`).
    then( r => r.json()).
    then(data => console.log(data))
}

getPost();