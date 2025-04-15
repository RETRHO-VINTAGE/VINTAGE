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

fetchSheetData();
