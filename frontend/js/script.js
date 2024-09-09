document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Retrieve form data
    const photo = document.getElementById('photo').files[0];
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    // Create a FormData object
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('category', category);
    formData.append('description', description);

    // Retrieve token from local storage
    const token = localStorage.getItem('token'); // Make sure this matches how you're storing it

    try {
        // Make a POST request to upload the photo
        const response = await axios.post('http://localhost:5000/api/photos/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Include token in headers
            }
        });

        // Handle success
        console.log('Photo uploaded successfully:', response.data);
        alert('Photo uploaded successfully!');
        // Optionally, you could redirect or clear the form
        document.getElementById('uploadForm').reset();
    } catch (error) {
        // Handle error
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo. Please try again.');
    }
});
