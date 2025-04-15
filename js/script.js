/*import { resources } from "../json/Resources List";*/

console.log('RETRHO website loaded.');

let index = 0;
const images = document.querySelectorAll('.gallery img');

if (images.length > 0) {
    images[0].classList.add('active');  
}

function changeImage() {
    if (images.length > 0) {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }
}

setInterval(changeImage, 3000);
const sheetID = "1Qszjl0dteIPQ31EV-S3nz5M-sfk3YDuVyn3sVnE7-Mo";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";   
const range = "Sheet1!A2:C";      

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const container = document.getElementById("dynamic-content");

        // Clear existing content before adding new data
        container.innerHTML = ""; 

        if (data.values) {
            data.values.forEach((row) => {
                // Create a wrapper div for each row
                let textBlock = document.createElement("div");
                textBlock.classList.add("text-block"); // Add a CSS class for styling
                
                row.forEach((text, colIndex) => {
                    let paragraph = document.createElement(colIndex === 0 ? "h2" : "p");
                    paragraph.textContent = text;
                    textBlock.appendChild(paragraph);
                });

                container.appendChild(textBlock);
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchData);