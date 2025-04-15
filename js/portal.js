const sheetID = "1HnZntvXuiLD4OXX9jE5N9XCzrKOm4LEXnbRbuL83p6c";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const sheetName = "Sheet1";
const range = `${sheetName}!A1:L`;
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

function fetchSheetData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (!rows || rows.length < 2) return;

            const headers = rows[0];
            const jsonData = rows.slice(1).map(row => {
                let rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = row[index] || '';
                });
                return rowData;
            });
            console.log("Fetched JSON data:", jsonData);

            // Populate the table
            const tableBody = document.getElementById("dataTable");
            const existingRows = tableBody.querySelectorAll(".tableData");
            existingRows.forEach(row => row.remove());
            jsonData.forEach(item => {
                const tr = document.createElement("tr");
                tr.classList.add("tableData");

                const fields = [
                    "Object Name",
                    "Object Type",
                    "Date Observed",
                    "Filters",
                    "Exposure Time [s]",
                    "RA",
                    "DEC",
                    "Reduced"
                ];

                fields.forEach(field => {
                    const td = document.createElement("td");
                    td.textContent = item[field] || "";
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error fetching data from Google Sheets:", error));
}

  
document.addEventListener('DOMContentLoaded', () => {
    fetchSheetData();
    //listen for form changes to filter the data -> do so on enter not live (otherwise will probably get slow)
});

//listening for form changes
const inputForm = document.getElementById("inputForm");
const radioObj = document.getElementById("objName");
const radioType = document.getElementById("objType");
const radioCoords = document.getElementById("coords");
const reduceButton = document.getElementById("reduced");
let searchText = inputForm.value;
inputForm.addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        e.preventDefault();
        console.log("pressed enter");
        filterOnEnter();
    }
});

//filter
function filterOnEnter(){
    //grab what is in the search field- in inputForm.value
    searchText = inputForm.value;
    
    //filter the list based on the radio buttons
    if(radioObj.checked){
        console.log("object name checked");
        filterbyName(searchText, reduceButton.checked);
    }
    else if(radioType.checked){
        console.log("object type checked");
        filterbyType(searchText, reduceButton.checked);
    }
    else{
        console.log("coords checked");
        filterbyCoords(searchText, reduceButton.checked);
    }
    if(document.getElementById("reduced").checked){
        console.log("reduced checked");
    }
}

//alternate event listener on the radio buttons and filter button
radioObj.addEventListener("change", (e) => {
    //when clicked to be active, refilter
    if(radioObj.checked){
        filterbyName(inputForm.value, reduceButton.checked);
    }
});
radioType.addEventListener("change", (e) => {
    if(radioType.checked){
        filterbyType(inputForm.value, reduceButton.checked);
    }
});
radioCoords.addEventListener("change", (e) => {
    if(radioCoords.checked){
        filterbyCoords(inputForm.value, reduceButton.checked);
    }
});
reduceButton.addEventListener("change", (e) => {
    filterOnEnter();
});

//filter functions- consider if reduced
function filterbyName(target, reduced){
    console.log("filter by name " + target + ", reduced is " + reduced);
}
function filterbyType(target, reduced){
    console.log("filter by type " + target + ", reduced is " + reduced);
}
function filterbyCoords(target, reduced){
    console.log("filter by coords " + target + ", reduced is " + reduced);
    //regex??? to make sure the format is correct
    

}
 