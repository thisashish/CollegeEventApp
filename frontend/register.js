document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const course = document.getElementById('registerCourse').value;
    const collegeYear = document.getElementById('registerCollegeYear').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const profilePhoto = document.getElementById('registerProfilePhoto').files[0];
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('course', course);
    formData.append('collegeYear', collegeYear);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePhoto', profilePhoto);
  
    try {
        await axios.post('http://localhost:5000/api/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Redirect to login page
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Registration failed. Please try again.');
    }
});
