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
    if (
        (username === "dyamuh" && password === "ilovecuks") ||
        (username === "oliver" && password === "Oliver123")
    ) {
        sessionStorage.setItem("loggedIn", "true"); // Set logged in status
        window.location.href = "admin.html"; // Redirect to admin page
    } else {
        alert("INCORRECT"); // Show error message
    }
}


const customCursor = document.getElementById('customCursor');
const rainCanvas = document.getElementById('rainCanvas');
const ctx = rainCanvas.getContext('2d');
rainCanvas.width = window.innerWidth;
rainCanvas.height = window.innerHeight;
let raindrops = [];

// Create raindrops
for (let i = 0; i < 100; i++) {
    raindrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1 // Slower speed
    });
}

function drawRain() {
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // White rain color
    ctx.lineWidth = 2;
    for (let drop of raindrops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        drop.y += drop.speed; // Move raindrop down
        // Reset raindrop to the top once it falls off the screen
        if (drop.y > rainCanvas.height) {
            drop.y = -drop.length; // Reset to just above the top
            drop.x = Math.random() * rainCanvas.width; // Random horizontal position
        }
    }
}

// Draw rain at a slower interval
setInterval(drawRain, 33); // About 30 frames per second

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
    customCursor.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`; // Center the cursor
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
});

// Redirect to home page if trying to access admin.html without logging in
if (window.location.pathname === "/admin.html" && !sessionStorage.getItem("loggedIn")) {
    window.location.href = "/index.html"; // Change to your home page URL
}
