// Basic script.js

// Log to the console when the page loads
console.log('RETRHO website loaded.');

// Simple function to change text when the page is ready
function changeText() {
    const welcomeText = document.querySelector('main p');
    welcomeText.textContent = 'Welcome to the RETRHO website. Enjoy your stay!';
}

// Call the function when the page is loaded
document.addEventListener('DOMContentLoaded', changeText);

