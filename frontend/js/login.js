document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
  
      // Save token to local storage or session storage
      localStorage.setItem('token', response.data.token);
  
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  });
  
  // Redirect to register page
  document.getElementById('registerLink').addEventListener('click', () => {
    window.location.href = 'register.html';
  });
  