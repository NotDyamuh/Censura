// REMEMBER TO UPDATE min.js BEFORE COMMITTING! THIS FILE IS NOT LOADED IN PRODUCTION!
import * as PIXI from "https://esm.sh/pixi.js@7.2.4?bundle-deps";

// Check if user is already logged in
if (sessionStorage.getItem("loggedIn")) {
    const adminPage = sessionStorage.getItem("adminPage");
    window.location.href = `${adminPage}.html`; // Redirect to the specific admin page
}

window.addEventListener("hashchange", (e) => {
    const url = new URL(e.newURL);
    if (url.hash == "#_") {
        history.pushState(null, null, url.pathname + url.search);
    }
});

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

    if (adminData[username] && adminData[username].password === password) {
        sessionStorage.setItem("loggedIn", "true"); // Set logged in status
        sessionStorage.setItem("adminPage", adminData[username].page); // Store admin page
        window.location.href = `${adminData[username].page}.html`; // Redirect to specific admin page
    } else {
        alert("Invalid username or password!");
    }
}

const canvas = document.getElementById("bg");
const app = new PIXI.Application({
    view: canvas,
    resizeTo: canvas,
    backgroundAlpha: 0,
    antialias: true,
});
app.stage.filters = [new PIXI.BlurFilter(2, undefined, window.devicePixelRatio)];

const starSize = 6;
const starNum = Math.sqrt(Math.pow(app.screen.height, 2) + Math.pow(app.screen.height, 2)) / 32;

const starTexture = app.renderer.generateTexture(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, starSize).endFill());
const stars = Array.from({ length: starNum }, () => {
    const star = {
        sprite: new PIXI.Sprite(starTexture),
        x: Math.random(),
        y: Math.random(),
    };
    star.sprite.anchor.set(0.5, 1);
    star.sprite.scale.set(Math.random());
    app.stage.addChild(star.sprite);
    star.sprite.x = Math.random() * app.screen.width;
    star.sprite.y = Math.random() * app.screen.height;
    return star;
});
document.getElementById("bg").classList.add("show");

function mod(n, m) {
    return ((n % m) + m) % m;
}

let smoothY = document.documentElement.scrollTop;
app.ticker.add(() => {
    smoothY += 0.15 * (document.documentElement.scrollTop - smoothY);
    const scrollFrac = document.documentElement.scrollTop / document.body.scrollHeight;
    app.stage.alpha = 0.7 - scrollFrac * 1.2;
    stars.forEach((star) => {
        star.sprite.x = star.x * app.screen.width;
        star.sprite.y = mod(star.y * app.screen.height - smoothY * 2.77 * star.sprite.scale.y, app.screen.height + starSize * window.devicePixelRatio);
    });
});
