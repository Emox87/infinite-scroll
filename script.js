const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let count = 5;
const apiKey = 'a7Ksy6CD7mSH6eFq8lYUKJ0xB5b-1KqSTvlDbZixzoQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function fot setting attributes on  DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos
// and add that to the dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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
        
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        
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
        if (isInitialLoad) {
            updateAPIURLWithNewCount(10);
            isInitialLoad = false;
        }
    } catch(error) {
        // Catch error here
        alert(error);
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
   } 
});

// On load 
getPhotos();