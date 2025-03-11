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
const range = `${sheetName}!A2:E`;

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

            let faqContainer = document.querySelector(".faq-section");
            faqContainer.querySelectorAll(".faq-item").forEach(item=>item.remove());

            data.values.forEach((row) => {
                if (row.length < 2) return;

                let question = row[0] || "No Question"; // Column A
                let answer = row[1] || "No Answer"; // Column B
                let link = row[2] || ""; // Column C (Optional)
                let linkText = row[3] || "More info"; // Column D (Optional)
                let visible = row[4]; // Column E

                if (visible.toUpperCase() === "TRUE") {
                    const faqItem = document.createElement("div");
                    faqItem.classList.add("faq-item");
                    faqItem.innerHTML = `
                        <button type="button" class="faq-question">
                            ${question} <span class="icon">+</span>
                        </button>
                        <div class="faq-answer">
                            ${answer} 
                            ${link ? `<br><a href="${link}" target="_blank">${linkText}</a>` : ""}
                        </div>
                    `;
                    faqContainer.appendChild(faqItem);
                }
            });

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
