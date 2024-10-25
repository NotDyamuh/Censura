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
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple authentication check
    const adminData = {
        "admin1": { password: "password1", page: "admin1" },
        "admin2": { password: "password2", page: "admin2" },
        "admin3": { password: "password3", page: "admin3" },
    };

    // Validate username and password
    if (adminData[username] && adminData[username].password === password) {
        sessionStorage.setItem("loggedIn", "true"); // Set logged in status
        sessionStorage.setItem("adminPage", adminData[username].page); // Store admin page
        window.location.href = `${adminData[username].page}.html`; // Redirect to specific admin page
    } else {
        alert("Invalid username or password!");
    }
}

// Additional PIXI code can go here...
