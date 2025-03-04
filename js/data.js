const sheetID = "1peVYXCIlEEHXpyShqonaq_BC6SCtsbr8T_XVVgpEA8g";  // Sheet ID
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc"; // Google API Key
const range = "Sheet1!A2:C10";//note that need to dynamically change range based on data. 

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

function fetchPortfolioData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const values = data.values; 
            let portfolioHTML = "";
            values.forEach((row, index) => {
                let title = row[0];
                let imgUrl = row[1];
                let description = row[2];

                const slideClass = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';

                portfolioHTML += `
                    <div class="${slideClass}">
                        <h2>${title}</h2>
                        <img src="${imgUrl}" alt="${title}">
                        <p>${description}</p>
                    </div>
                `;
            });

            document.querySelector(".portfolio-container").innerHTML = portfolioHTML;
            checkSlide();
        })
        .catch(error => console.error("Error fetching data:", error));
}

function checkSlide() {
    const slideElements = document.querySelectorAll(".slide-in-left, .slide-in-right");
    const triggerBottom = window.innerHeight * 0.75;

    slideElements.forEach((element) => {
        const boxTop = element.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            element.classList.add("show");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPortfolioData();
    window.addEventListener("scroll", checkSlide);
    checkSlide(); 
});
