document.addEventListener("DOMContentLoaded", function () {
    // Assuming the user's name is stored in localStorage or fetched from a session
    const userName = localStorage.getItem("userName"); // Replace with real login data

    if (userName) {
        // Display user's name if logged in
        document.getElementById("userName").textContent = userName;
    } else {
        // Redirect to login if no username found
        window.location.href = "login.html";
    }
});
