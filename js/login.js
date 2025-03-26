//refer to lines 29-64 in nav.js for more login functionality
//use this file for any other local login functionality details
const sheetID = "1D_G_IbZKeNXvvbb_ZL6IgIrwoCy8iUpUZEvPYdZ5EeU";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const range = "Sheet1!A2:B";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;



function fetchLoginData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                users = Object.fromEntries(data.values);
            }
        })
        .catch(error => console.error("Error fetching login data:", error));
}
fetchLoginData();
