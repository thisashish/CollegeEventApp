// photos.js

// Function to check if the user is authenticated
function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;  // Check if authToken exists in localStorage
}

// If the user is not authenticated, redirect to login page
if (!isAuthenticated()) {
    alert("You need to be logged in to view this page.");
    window.location.href = 'login.html'; // Redirect to login page
} else {
    // If authenticated, load the photos
    loadPhotos();
}

function loadPhotos() {
    // Fetch photos from the backend (assuming you have an endpoint that returns all photos)
    axios.get('http://localhost:5000/api/photos/all', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Include token in request header
        }
    })
    .then(response => {
        const photos = response.data; // Array of photos
        const photosContainer = document.getElementById('photos-container');

        // Iterate over the photos and create image elements
        photos.forEach(photo => {
            const photoElement = document.createElement('div');
            photoElement.classList.add('photo');

            // Creating the image tag
            const img = document.createElement('img');
            img.src = photo.url; // Assuming photo.url is the image URL
            img.alt = 'Uploaded Photo';

            // Adding user details (small profile photo and name)
            const userDetails = document.createElement('div');
            userDetails.classList.add('user-details');
            const profilePhoto = document.createElement('img');
            profilePhoto.src = photo.uploadedBy.profilePhoto; // Assuming uploadedBy has profilePhoto
            profilePhoto.alt = 'User Profile Photo';
            profilePhoto.classList.add('profile-photo');

            const userName = document.createElement('p');
            userName.textContent = photo.uploadedBy.name; // Assuming uploadedBy has name

            // Append the profile photo and name to userDetails div
            userDetails.appendChild(profilePhoto);
            userDetails.appendChild(userName);

            // Append image and user details to photoElement
            photoElement.appendChild(img);
            photoElement.appendChild(userDetails);

            // Append photoElement to the photos container
            photosContainer.appendChild(photoElement);
        });
    })
    .catch(error => {
        console.error('Error fetching photos:', error);
    });
}
