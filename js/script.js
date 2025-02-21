/*import { resources } from "../json/Resources List";*/

console.log('RETRHO website loaded.');

let index = 0;
const images = document.querySelectorAll('.gallery img');

function changeImage() {
    if (images.length > 0) {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }
}

setInterval(changeImage, 3000);

/*
function changeText() {
    const welcomeText = document.querySelector('main p');
    if (welcomeText) {
        welcomeText.textContent = 'Welcome to the RETRHO website. Enjoy your stay!';
    }
}
*/
document.addEventListener('DOMContentLoaded', () => {
    const slideInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 
    });
    const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    slideElements.forEach(element => {
        slideInObserver.observe(element); 
    });
});
