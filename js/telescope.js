const sheetID = "1xKA4B2VP1ziVGiMdKAo35aQGANtIdwA8QM8ZB5If4SQ";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const sheetName = "Sheet1";
const range = `${sheetName}!A2:D`;

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

function fetchTelescopeData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); // For debugging

            if (!data.values) {
                console.error("No data found in the sheet.");
                return;
            }

            const infoContainer = document.querySelector(".tele-info-section .info");
            infoContainer.innerHTML = ""; // Clear existing content

            data.values.forEach(row => {
                let specs = row[0] || "No Information Available"; // Column A
                let link = row[1] || "";                         // Column B (Optional)
                let linkText = row[2] || "More info";            // Column C (Optional)
                let visible = row[3];                            // Column D

                if (visible.toUpperCase() === "TRUE") {
                    const infoParagraph = document.createElement("p");
                    infoParagraph.innerHTML = link 
                        ? `${specs} <a href="${link}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
                        : specs;

                    infoContainer.appendChild(infoParagraph);
                }
            });
        })
        .catch(error => console.error("Error fetching telescope data:", error));
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", fetchTelescopeData);
