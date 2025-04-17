import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

// Expose Firebase for nav.js
window.firebase = { auth: () => auth };

// Global login state
window.isLoggedIn = false;

function dispatchLoginStateChange() {
    window.isLoggedIn = auth.currentUser !== null;
    console.log('Dispatching login state change, isLoggedIn:', window.isLoggedIn);
    document.dispatchEvent(new Event('loginStateChanged'));
}

onAuthStateChanged(auth, user => {
    dispatchLoginStateChange();
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
                    // Ensure isLoggedIn updates before redirect
                    window.isLoggedIn = true;
                    dispatchLoginStateChange();
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 100); // Brief delay for navbar update
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

document.addEventListener('navbarLoaded', () => {
    console.log('navbarLoaded event received');
    setupLogin();
});