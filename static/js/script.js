// function displayMessage() {
//     // Get the user's input for name, message, and image
//     var name = document.getElementById('name').value;
//     var message = document.getElementById('message').value;
//     var imageFile = document.getElementById('image-upload').files[0]; // Check if an image is selected

//     // Check if both name and message are provided
//     if (!name || !message) {
//         alert("Please enter both a name and a message.");
//         return; // Stop the function if either is missing
//     }

//     // Create a new card element
//     var card = document.createElement('div');
//     card.classList.add('card');
//     card.style.width = '18rem';
    
//     // Add an image to the card if provided
//     if (imageFile) {
//         var img = document.createElement('img');
//         img.classList.add('card-img-top');
//         img.src = URL.createObjectURL(imageFile); // Dynamically set the image URL
//         img.alt = 'User-uploaded image';
//         card.appendChild(img);
//     } else {
//         // If no image is provided, add a default placeholder image
//         var defaultImg = document.createElement('img');
//         defaultImg.classList.add('card-img-top');
//         defaultImg.src = "https://source.unsplash.com/collection/190727/1600x900"; // Placeholder image
//         defaultImg.alt = '...';
//         card.appendChild(defaultImg);
//     }

//     // Add a card body
//     var cardBody = document.createElement('div');
//     cardBody.classList.add('card-body');
//     card.appendChild(cardBody);

//     // Add title (name)
//     var cardTitle = document.createElement('h5');
//     cardTitle.classList.add('card-title');
//     cardTitle.textContent = name;
//     cardBody.appendChild(cardTitle);

//     // Add message
//     var cardText = document.createElement('p');
//     cardText.classList.add('card-text');
//     cardText.textContent = message;
//     cardBody.appendChild(cardText);

//     // Check if there are any carousel-items
//     var carouselInner = document.querySelector('.carousel-inner');
//     var lastCarouselItem = carouselInner.querySelector('.carousel-item:last-of-type');

//     // If no carousel-item exists, create a new one
//     if (!lastCarouselItem) {
//         console.log("no carousel-item found");

//         var newCarouselItem = document.createElement('div');
//         newCarouselItem.classList.add('carousel-item', 'active');
//         console.log("carousel-item created");
        
//         var newCardWrapper = document.createElement('div');
//         newCardWrapper.classList.add('card-wrapper', 'container-sm', 'd-flex', 'justify-content-around');
//         newCarouselItem.appendChild(newCardWrapper);
//         console.log("card-wrapper created and appended to carousel-item");
        
//         // Add the new card to the new card-wrapper
//         newCardWrapper.appendChild(card);
//         console.log("card appended to card-wrapper");

//         // Append the new carousel-item to the carousel-inner
//         carouselInner.appendChild(newCarouselItem);
//         console.log("carouselitem appended to Inner");
//     } else {
//         // If a carousel-item exists, check if it has 3 cards
//         var lastCardWrapper = lastCarouselItem.querySelector('.card-wrapper');
//         var cards = lastCardWrapper.querySelectorAll('.card');

//         // If there are already 3 cards, create a new carousel-item and card-wrapper
//         if (cards.length >= 3) {
//             var newCarouselItem = document.createElement('div');
//             newCarouselItem.classList.add('carousel-item');

//             var newCardWrapper = document.createElement('div');
//             newCardWrapper.classList.add('card-wrapper', 'container-sm', 'd-flex', 'justify-content-around');
//             newCarouselItem.appendChild(newCardWrapper);

//             // Add the new card to the new card-wrapper
//             newCardWrapper.appendChild(card);

//             // Append the new carousel-item to the carousel-inner
//             carouselInner.appendChild(newCarouselItem);
//         } else {
//             // If there are less than 3 cards, add the new card to the existing card-wrapper
//             lastCardWrapper.appendChild(card);
//         }
//     }

//     // Clear the input fields after submission
//     document.getElementById('name').value = '';
//     document.getElementById('message').value = '';
//     document.getElementById('image-upload').value = ''; // Clear the file input after submission
// }


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getDatabase, ref, get, set, child } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBRr7eES1QDIVqkVAx4Q5br-zBjGJReSVU",
authDomain: "funeral-tributes-34a75.firebaseapp.com",
databaseURL: "https://funeral-tributes-34a75-default-rtdb.firebaseio.com",
projectId: "funeral-tributes-34a75",
storageBucket: "funeral-tributes-34a75.firebasestorage.app",
messagingSenderId: "146925072685",
appId: "1:146925072685:web:3394af135b129303a463a4",
measurementId: "G-ZFQP1KFPTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const analytics = getAnalytics(app);

document.getElementById("submit").addEventListener('click', function(e){
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the user's input for name, message, and image
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    // Check if both name and message are provided
    if (!name || !message) {
        alert("Please enter both a name and a message.");
        return; // Stop the function if either is missing
    }

    set(ref(db, 'tribute/' + document.getElementById("name").value), {

        username: document.getElementById("name").value,
        message: document.getElementById("message").value
    }).then(() => {
        displayCard({username: document.getElementById("name").value, message: document.getElementById("message").value});
    }).catch((error) => {
        console.error("Error saving data", error)
    })
});

function retrieveTributes() {


    //tributeRef stores tributes from the tribute table
    const tributeRef = ref(db, 'tribute/');

    get(tributeRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("snapshot exists");
            
            // store the data from table in a const called data
            const data = snapshot.val(); // The data retrieved from Firebase
            console.log("retrieved data", data);

            //function to create and place card on the page
            for (let key in data) {
                displayCard(data[key]);
            }
            
        }
    }).catch((error) => {
        console.error("Error retrieving data: ", error);
    });
}

//a card looks like this {message: 'Hello World', username: 'Ryan Badaloo'}


function displayCard(pseudo) {

    //create a new card element
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.style.width = '18rem';

    //creates a card body to add to the card
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    //creates a card title to add to the card
    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = pseudo.username;
    cardBody.appendChild(cardTitle);

    //creates the message to add to the card
    var cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = pseudo.message;
    cardBody.appendChild(cardText);

    newCard.appendChild(cardBody);

    //collects the main container 'carousel-inner
    var carouselInner = document.querySelector('.carousel-inner');
    //selects the last carousel-item in carousel-inner
    var lastCarouselItem = carouselInner.querySelector('.carousel-item:last-of-type');

    //if there are no carousel-items in carousel inner then
    if (!lastCarouselItem) {
        console.log("No Carousel Item found");

        //creates carousel-item and carousel-wrapper
        var newCarouselItem = document.createElement('div');
        newCarouselItem.classList.add('carousel-item', 'active');
        console.log("Carousel Item Created");

        var newCardWrapper = document.createElement('div');
        newCardWrapper.classList.add('card-wrapper', 'container-sm', 'd-flex', 'justify-content-around');
        
        console.log("Card Wrapper Created and appended to carousel-item");

        //appends card to wrapper
        newCardWrapper.appendChild(newCard);
        //appends wrapper to item
        newCarouselItem.appendChild(newCardWrapper);
        //appends item to inner
        carouselInner.appendChild(newCarouselItem);

    } else {
        //gets the wrapper from the last carousel-item
        var lastCardWrapper = lastCarouselItem.querySelector('.card-wrapper');
        //stores all the cards in a wrapper
        var cards = lastCardWrapper.querySelectorAll('.card');

        //if a carousel item is found but the last one already has 3 cards
        if (cards.length >= 3) {
            var newCarouselItem = document.createElement('div');
            newCarouselItem.classList.add('carousel-item');
            console.log("Carousel Item found but last one was full");

            var newCardWrapper = document.createElement('div');
            newCardWrapper.classList.add('card-wrapper', 'container-sm', 'd-flex', 'justify-content-around');
            newCarouselItem.appendChild(newCardWrapper);
            console.log("card wrapper added to new carousel item");

            //Add the new card to the new card-wrapper
            newCardWrapper.appendChild(newCard);
            console.log("card added to new card wrapper")

            // Append the new carousel-item to the carousel-inner
            carouselInner.appendChild(newCarouselItem);
            console.log("carousel item added to inner")
        } else {
            // If there are less than 3 cards, add the new card to the existing card-wrapper
            lastCardWrapper.appendChild(newCard);
            console.log("Space was available and card was added")
        }


    }

         // Clear the input fields after submission
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    document.getElementById('image-upload').value = ''; // Clear the file input after submission

}

retrieveTributes();

//     } else {
//         // If a carousel-item exists, check if it has 3 cards
//         var lastCardWrapper = lastCarouselItem.querySelector('.card-wrapper');
//         var cards = lastCardWrapper.querySelectorAll('.card');

//         // If there are already 3 cards, create a new carousel-item and card-wrapper
//         if (cards.length >= 3) {
//             var newCarouselItem = document.createElement('div');
//             newCarouselItem.classList.add('carousel-item');

//             var newCardWrapper = document.createElement('div');
//             newCardWrapper.classList.add('card-wrapper', 'container-sm', 'd-flex', 'justify-content-around');
//             newCarouselItem.appendChild(newCardWrapper);

//             // Add the new card to the new card-wrapper
//             newCardWrapper.appendChild(card);

//             // Append the new carousel-item to the carousel-inner
//             carouselInner.appendChild(newCarouselItem);
//         }

//test line