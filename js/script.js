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
}*/

document.addEventListener("DOMContentLoaded", function () {
    const slideElements = document.querySelectorAll(".slide-in-left, .slide-in-right");

    function checkSlide() {
        const triggerBottom = window.innerHeight * 0.75;

        slideElements.forEach((element) => {
            const boxTop = element.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                element.classList.add("show");
            }
        });
     }
  
    window.addEventListener("scroll", checkSlide);
    checkSlide(); // Run once in case elements are already in view
});
