//refer to lines 29-64 in nav.js for more login functionality
//use this file for any other local login functionality details
// const sheetID = "1D_G_IbZKeNXvvbb_ZL6IgIrwoCy8iUpUZEvPYdZ5EeU";
// const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
// const range = "Sheet1!A2:B";
// const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;



// function fetchLoginData() {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.values) {
//                 users = Object.fromEntries(data.values);
//             }
//         })
//         .catch(error => console.error("Error fetching login data:", error));
// }
// fetchLoginData();
// === Initialize Firebase ===
// === Initialize Firebase ===
// Google Sheets API key
const API_KEY = 'AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc';
// Google Sheet ID for RETRHOster
const SPREADSHEET_ID = '19U8vB0qAAEgGNpoYpWu0gj09vsElmQ19vhq30ZJHH0A';
// Range for Active Members emails
const RANGE = 'Active Members!D2:D';

function loadGapiClient() {
    return new Promise((resolve, reject) => {
        gapi.load('client', () => {
            gapi.client
                .init({
                    apiKey: API_KEY,
                    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                })
                .then(resolve)
                .catch(reject);
        });
    });
}

async function verifyEmail(email) {
    try {
        // Initialize gapi client if not already
        if (!gapi.client || !gapi.client.sheets) {
            await loadGapiClient();
        }

        // Fetch data from Google Sheets
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        // Extract emails
        const emails = response.result.values
            ? response.result.values.flat().map((e) => e.toLowerCase().trim())
            : [];

        // Check if email exists
        return emails.includes(email.toLowerCase().trim());
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
        throw error;
    }
}