const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'a7Ksy6CD7mSH6eFq8lYUKJ0xB5b-1KqSTvlDbZixzoQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function fot setting attributes on  DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos
// and add that to the dom
function displayPhotos() {
    
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
           href: photo.links.html,
           target: '_blank',
        });
        
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        
        const title = document.createElement('h3');
        title.textContent = photo.alt_description;
        
        // Put <img> inside the <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(title);
        imageContainer.appendChild(item);
        
    });
}

// Get Photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error here
    }
}

// On load 
getPhotos();