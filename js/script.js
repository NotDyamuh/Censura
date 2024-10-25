// Check if user is already logged in
if (sessionStorage.getItem("loggedIn")) {
    const adminPage = sessionStorage.getItem("adminPage");
    window.location.href = `${adminPage}.html`; // Redirect to the specific admin page
}

const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', "Enter"];
let current = 0;
const clocks = document.getElementById("clocks");
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
async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Send login request to PHP script
    const response = await fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
        sessionStorage.setItem("loggedIn", "true"); // Set logged in status
        sessionStorage.setItem("adminPage", result.adminPage); // Store admin page
        window.location.href = `${result.adminPage}.html`; // Redirect to specific admin page
    } else {
        alert("Invalid username or password!");
    }
}

// Additional PIXI code can go here...
