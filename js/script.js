// Check if user is already logged in
if (sessionStorage.getItem("loggedIn")) {
    window.location.href = "admin.html"; // Redirect to admin page if already logged in
}

const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', "Enter"];
let current = 0;
const loginModal = document.getElementById("login-modal");
const closeButton = document.querySelector(".close-button");

document.addEventListener('keydown', (e) => {
    if (e.key === pattern[current]) {
        current++;
        if (current === pattern.length) {
            loginModal.classList.remove("hidden");
            current = 0;
        }
    } else {
        current = 0;
    }
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
    loginModal.classList.add("hidden");
});

// Close the modal when clicking outside of the modal
window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.classList.add("hidden");
    }
});

// Handle login
document.getElementById("login-form").addEventListener("submit", handleLogin);

function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    if (username === "dyamuh" && password === "ilovecuks") {
        sessionStorage.setItem("loggedIn", "true"); // Set logged in status
        window.location.href = "admin.html"; // Redirect to admin page
    } else {
        alert("INCORRECT"); // Show error message
    }
}

// Redirect to home page if trying to access admin.html without logging in
if (window.location.pathname === "/admin.html" && !sessionStorage.getItem("loggedIn")) {
    window.location.href = "/index.html"; // Change to your home page URL
}
