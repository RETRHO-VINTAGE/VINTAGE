console.log('Resources page loaded.');

// Grabbing observer data
const sheetID = "1o2VcE-zJTLWFUQm-btTrJz91EUNwR7BneSCSTkLXplo";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (document.querySelector("#resourcesList")) {
            const div = document.querySelector("#resourcesList");
            // Load resources in order
            await parseAndCreateRrscSheet("ObservingResources", div);
            await parseAndCreateRrscSheet("DataReduction", div);
            await parseAndCreateRrscSheet("AdminResources", div);
            await parseAndCreateRrscSheet("TrainingResources", div);
            await parseAndCreateRrscSheet("MiscellaneousResources", div);
        } 
        else if (document.querySelector("#obsResourcesList")) {
            const div = document.querySelector("#obsResourcesList");

            // Load only observing resources
            await parseAndCreateRrscSheet("ObservingResources", div);
        } 
        else {
            console.log("No resource list found.");
        }
    } catch (error) {
        console.error("Error loading resources:", error);
    }
});

function parseAndCreateRrscSheet(sheetName, parentDiv) {
    return new Promise((resolve, reject) => {
        const range = sheetName + "!A2:E100"; 
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.values) {
                    console.error(`No data returned for sheet: ${sheetName}`);
                    reject(`No data for ${sheetName}`);
                    return;
                }
                const childdiv = document.createElement('div');
                console.log(`Loaded ${data.values.length} entries for ${sheetName}`);
                // Populate the inner HTML list
                childdiv.classList.add("resourceType");
                let innerHTML = "<h1>";
                for (let i = 0; i < data.values.length; i++) {
                    if (data.values[i][4] === "0") {
                        innerHTML += data.values[i][0] + "</h1><ul>";
                    }
                    if (data.values[i][3] === "TRUE") {
                        innerHTML += `<li><a target="_blank" href="${data.values[i][2]}">${data.values[i][1]}</a></li>`;
                    }
                }
                innerHTML += "</ul>";
                childdiv.insertAdjacentHTML("beforeend", innerHTML);
                parentDiv.appendChild(childdiv);
                resolve(); 
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                reject(error);
            });
    });
}
