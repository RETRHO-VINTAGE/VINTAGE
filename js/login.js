import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

console.log('login.js loaded');

const firebaseConfig = {
    apiKey: "AIzaSyC3PBpEbNb1qTfpSG5IEH7Ua4pxhsPO1LU",
    authDomain: "vintagewebsite.firebaseapp.com",
    projectId: "vintagewebsite",
    storageBucket: "vintagewebsite.firebasestorage.app",
    messagingSenderId: "486200621061",
    appId: "1:486200621061:web:2be152fbef848aa7fe046c",
    measurementId: "G-546SQFX7JJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function updateNavbar(isLoggedIn) {
    console.log('Updating navbar, isLoggedIn:', isLoggedIn);
    fetch('nav.html')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            return res.text();
        })
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const navbar = doc.querySelector('.navbar');
            if (!navbar) {
                console.error('Navbar not found in nav.html');
                return;
            }

            // Remove auth-required links if not logged in
            if (!isLoggedIn) {
                navbar.querySelectorAll('.auth-required').forEach(link => link.remove());
            }

            // Update login/logout button
            const loginButton = navbar.querySelector('#loginButton');
            if (loginButton) {
                loginButton.textContent = isLoggedIn ? 'Log Out' : 'Login';
                loginButton.onclick = isLoggedIn ? () => {
                    console.log('Log Out clicked');
                    signOut(auth)
                        .then(() => {
                            console.log('User logged out');
                            updateNavbar(false);
                            window.location.href = 'index.html';
                        })
                        .catch(error => console.error('Logout error:', error.message));
                } : openLoginModal;
            }

            // Insert navbar
            const container = document.querySelector("#navbar_container");
            if (!container) {
                console.error('Navbar container #navbar_container not found');
                return;
            }
            container.innerHTML = '';
            container.appendChild(navbar);
            console.log('nav.html inserted');

            // Update spacing
            navbar.classList.toggle('logged-out', !isLoggedIn);

            // Ensure modal is hidden
            const modal = document.querySelector('#loginModal');
            if (modal) {
                modal.style.display = 'none';
            }

            // Trigger login form setup
            setupLogin();
        })
        .catch(err => console.error('Error loading nav.html:', err));
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Login modal opened');
    } else {
        console.error('Login modal not found');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    if (modal) {
        modal.style.display = 'none';
        if (loginForm) {
            loginForm.reset();
            console.log('Login modal closed and form reset');
        } else {
            console.log('Login modal closed, but login form not found');
        }
    } else {
        console.error('Login modal not found');
    }
}

// Expose closeLoginModal globally for onclick
window.closeLoginModal = closeLoginModal;

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (modal && event.target === modal) {
        closeLoginModal();
    }
};

onAuthStateChanged(auth, user => {
    const isLoggedIn = !!user;
    console.log('Auth state changed, isLoggedIn:', isLoggedIn);
    updateNavbar(isLoggedIn);

    // Protect pages
    const protectedPages = ['observingSchedule.html', 'observingResources.html', 'resources.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (!isLoggedIn && protectedPages.includes(currentPage)) {
        console.log('Unauthorized access to protected page, redirecting to index.html');
        window.location.href = 'index.html';
    }
});

function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');
    const submitButton = document.getElementById('submit');
    if (loginForm && errorDiv && submitButton) {
        console.log('Login form, error div, and submit button found');
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            errorDiv.textContent = '';
            submitButton.disabled = true;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Login successful for:', userCredential.user.email);
                    loginForm.reset();
                    document.getElementById('loginModal').style.display = 'none';
                    updateNavbar(true);
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 100);
                })
                .catch((error) => {
                    console.error('Login error:', error.code, error.message);
                    loginForm.reset();
                    if (error.code === 'auth/invalid-credential' || 
                        error.code === 'auth/user-not-found' || 
                        error.code === 'auth/wrong-password') {
                        errorDiv.textContent = 'Incorrect username or password';
                    } else {
                        errorDiv.textContent = 'Login failed: ' + error.message;
                    }
                })
                .finally(() => submitButton.disabled = false);
        });
    } else {
        console.log('Login form, error div, or submit button not found, retrying...');
        setTimeout(setupLogin, 100);
    }
}
