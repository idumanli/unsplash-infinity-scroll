const imageContainer = document.getElementById('image-container');
const loder = document.getElementById('loder');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Unsplas API
const count = 30;
const apiKey = '-C7LSpyU43bW2wYWStpN6DjKaxEljL03gTjDo_JLSoo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];
// Check iff all images were loaded
function imageLoaded() {
   imagesLoaded++;
   if(imagesLoaded === totalImages) {
   	ready = true;
   	loder.hidden = true;
   }
}
// set attribute function to help set attributes on DOM Elements
function setAttributes(element, attributes) {
  for(const key in attributes) {
  	element.setAttribute(key, attributes[key]);
  }
}


// create elements for links and photos to add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// run fuction for each object in photoArray
	photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
        	href: photo.links.html,
        	target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
        	src: photo.urls.regular,
        	alt: photo.alt_description,
        	title: photo.alt_description,
        });
        // Event listener, check when each finished loding
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imagecontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

	});
}


// get photos from unsplas API
async function getPhotos() {
	try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
	} catch (error) {
      
	}
}

// check to see if scrolling near bottom of page ,load more photos
window.addEventListener('scroll', () => {
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
     	ready = false;
     	getPhotos();
     }
});

// On Load
getPhotos();