const postList = document.getElementById('postList');
const apiDomain = 'http://localhost:3000/';


// this will be called through an eventListener function (at DOMCONTENTLOADED)

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

        //     postList.append(newRow);
        //     document.getElementById(i).append(newCol1);

        // }

        // else {
        //     // create a card at the end
        //     const newCol2 = document.createElement('div');
        //     newCol2.classList.add('col');
        //     document.getElementById(i-1).append(newCol2);


        // }


    //     // Create an image and set its source to the current image
    //     const tempImg = document.createElement("img");
    //     tempImg.classList.add("gif-img");
    //     tempImg.src = obj[i].images.original.url;

    //     // Add an event listener to each photo
    //     tempImg.addEventListener("click", (e) => {
    //       // store the source of the clicked image
    //       const imgSource = e.target.src;

    //       // close the popup
    //       document.getElementById("gifPopup").style.display = "none";

    //       // Add it to the dom
    //       if (document.getElementById('gifToAdd')) {
    //         document.getElementById('gifToAdd').remove()
    //       }
    //       const gif = document.createElement("img");
    //       gif.src = imgSource;
    //       gif.id = "gifToAdd";

    //       document.querySelector("form").append(gif);
    //     });
    //     gifDisplay.append(tempImg);
    //   }
    // })