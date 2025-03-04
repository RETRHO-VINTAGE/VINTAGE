// const sheetID = "1Pclf-UY6DQxH4xT64vAifZOGBdu_qr78PpkdI6sdeLs";  // Sheet ID
// const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc"; // Google API Key
// const range = "Sheet1!A2:D";//note that need to dynamically change range based on data. 

// const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// /* function fetchPortfolioData() {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const values = data.values; 
//             let portfolioHTML = "";
//             values.forEach((row, index) => {
//                 let question = row[0];
//                 let answer = row[1];
//                 let link = row[2];
//                 let visible = row[3];

//                 portfolioHTML += `
//                     <div class="faq-item">
//                         <button type="button" class = "faq-question">
//                             ${question}<span class="icon">+</span>
//                         </button>
//                         <div class="faq-answer">
//                             ${answer}
//                         </div>
//                     </div>
//                 `;
//             });

//             document.querySelector(".portfolio-container").innerHTML = portfolioHTML;
//             checkSlide();
//         })
//         .catch(error => console.error("Error fetching data:", error));
// } */


/* document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', ()=> {
            question.classList.toggle('active');
            const answer = question.nextElementSibling;

            answer.classList.toggle('open'); // Animate open/close

            const icon = question.querySelector('.icon');
            if (icon) {
                icon.textContent = icon.textContent === '+' ? '-' : '+';
            }
        });
    });
}); */


const sheetID = "1Pclf-UY6DQxH4xT64vAifZOGBdu_qr78PpkdI6sdeLs";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const sheetName = "Sheet1";
const range = `${sheetName}!A2:Z`; // Ensure a large enough range to get all rows

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

function fetchContactFaqData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); // Debugging to see what we get

            if (!data.values) {
                console.error("No data found in the sheet.");
                return;
            }

            let portfolioHTML = "";

            data.values.forEach((row) => {
                if (row.length < 2) return; // Skip incomplete or empty rows

                let question = row[0] || "No Question"; // Column A
                let answer = row[1] || "No Answer"; // Column B
                let link = row[2] || ""; // Column C (Optional)
                let linkText = row[3] || "More info"; // Column D (New!)
                let visible = row[4] && row[4].toUpperCase() === "TRUE"; // Column E

                if (visible) {
                    portfolioHTML += `
                        <div class="faq-item">
                            <button type="button" class="faq-question">
                                ${question} <span class="icon">+</span>
                            </button>
                            <div class="faq-answer">
                                ${answer} 
                                ${link ? `<br><a href="${link}" target="_blank">${linkText}</a>` : ""}
                            </div>
                        </div>
                    `;
                }
            });

            document.querySelector(".faq-section").innerHTML = portfolioHTML;
            attachFAQListeners();
        })
        .catch(error => console.error("Error fetching data:", error));
}

function attachFAQListeners() {
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            const answer = button.nextElementSibling;
            answer.classList.toggle("open"); // Animate open/close

            const icon = button.querySelector(".icon");
            if (icon) {
                icon.textContent = icon.textContent === "+" ? "-" : "+";
            }
        });
    });
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", fetchContactFaqData);
