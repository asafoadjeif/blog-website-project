const postList = document.getElementById('postList');
const apiDomain = 'https://fp-snappy.herokuapp.com/'

// this will be called through an eventListener function (at DOMCONTENTLOADED)

fetch(`${apiDomain}posts`)
    .then((response) => response.json())
    .then((obj) => {
      const postDisplay = document.getElementById("postList");

      for (let i = 0; i < obj.length; i++) {

        if( i%2 == 0) {
            // create a new row in the post display
            const postCard = document.createElement('div');
            postCard.classList.add('card');
            
            
            // newRow.setAttribute('id', i)
            // const newCol1 = document.createElement('div');
            // newCol1.classList.add('col');

            
            // create a card to show posts 
         
            const postImg = document.createElement('img');
            postImg.src = obj[i].giphyUrl;

            
            const postBody = document.createElement('div');
            postBody.classList.add('card-body text-center');


            postCard.append(postImg);
            postCard.append(postBody);
            postList.append(postCard);
            

        //     postList.append(newRow);
        //     document.getElementById(i).append(newCol1);

        // }

        // else {
        //     // create a card at the end
        //     const newCol2 = document.createElement('div');
        //     newCol2.classList.add('col');
        //     document.getElementById(i-1).append(newCol2);


        }


        // Create an image and set its source to the current image
        const tempImg = document.createElement("img");
        tempImg.classList.add("gif-img");
        tempImg.src = obj[i].images.original.url;

        // Add an event listener to each photo
        tempImg.addEventListener("click", (e) => {
          // store the source of the clicked image
          const imgSource = e.target.src;

          // close the popup
          document.getElementById("gifPopup").style.display = "none";

          // Add it to the dom
          if (document.getElementById('gifToAdd')) {
            document.getElementById('gifToAdd').remove()
          }
          const gif = document.createElement("img");
          gif.src = imgSource;
          gif.id = "gifToAdd";

          document.querySelector("form").append(gif);
        });
        gifDisplay.append(tempImg);
      }
    })