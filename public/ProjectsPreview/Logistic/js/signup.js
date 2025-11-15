document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from refreshing the page

    // Get values from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object to send in the POST request
    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Send data to the backend (your Spring Boot backend)
    fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User registered successfully") {
            // Redirect to login page on success
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            alert('Error registering user: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
});
