document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from refreshing the page

    // Get values from form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object to send in the POST request
    const loginData = {
        email: email,
        password: password
    };

    // Send data to the backend (your Spring Boot backend)
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Save the JWT token and redirect to the dashboard or home page
            localStorage.setItem('token', data.token);  // Store token in localStorage
            alert('Login successful!');
            window.location.href = 'dashboard.html';  // Redirect to your dashboard or home page
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
});
