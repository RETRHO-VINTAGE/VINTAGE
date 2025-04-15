import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');
    const submitButton = document.getElementById('submit');
    if (loginForm && errorDiv && submitButton) {
        console.log('Login form, error div, and submit button found');
        loginForm.addEventListener('submit', (event) => {
            console.log('Form submit event triggered');
            event.preventDefault(); // Prevent page refresh

            const email = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            console.log('Attempting login with:', email);

            // Clear previous error and disable button
            errorDiv.textContent = '';
            submitButton.disabled = true;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Login successful
                    console.log('Login successful for:', userCredential.user.email);
                    loginForm.reset(); // Clear form
                    document.getElementById('loginModal').style.display = 'none';
                    window.location.href = 'index.html'; // Redirect
                })
                .catch((error) => {
                    console.error('Login error:', error.code, error.message);
                    loginForm.reset(); // Clear form
                    // Handle specific errors
                    if (error.code === 'auth/invalid-credential' || 
                        error.code === 'auth/user-not-found' || 
                        error.code === 'auth/wrong-password') {
                        errorDiv.textContent = 'Incorrect username or password';
                    } else {
                        errorDiv.textContent = 'Login failed: ' + error.message;
                    }
                })
                .finally(() => {
                    submitButton.disabled = false; // Re-enable button
                });
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