console.log('RETRHO website loaded.');

let index = 0;
const images = document.querySelectorAll('.gallery img');

function changeImage() {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}

setInterval(changeImage, 3000);

function changeText() {
    const welcomeText = document.querySelector('main p');
    welcomeText.textContent = 'Welcome to the RETRHO website. Enjoy your stay!';
}

document.addEventListener('DOMContentLoaded', changeText);