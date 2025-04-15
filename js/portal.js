//TODO: replace with correct sheet
const sheetID = "1HnZntvXuiLD4OXX9jE5N9XCzrKOm4LEXnbRbuL83p6c";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const sheetName = "Sheet1";
const range = `${sheetName}!A1:L`;
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

//
const populateTable = () => {
    fetch(url)
        .then(response => response.json())
            .then(data => {
                //get to the table element
                const table = document.getElementById('dataTable');
                
                console.log(table);
                //parse the file to populate the table
                console.log(data);

            }).catch(error => console.error("Error fetching data: ", error));
}

document.addEventListener('DOMContentLoaded', () => {
    populateTable();
    
    //listen for form changes to filter the data -> do so on enter not live (otherwise will probably get slow)
});