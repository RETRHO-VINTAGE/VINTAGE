const sheetID = "1HnZntvXuiLD4OXX9jE5N9XCzrKOm4LEXnbRbuL83p6c";
const sheetName = "Sheet1";

const inputForm = document.getElementById("inputForm");
const radioObj = document.getElementById("objName");
const radioType = document.getElementById("objType");
const radioCoords = document.getElementById("coords");
const reduceButton = document.getElementById("reduced");
const instructions = document.getElementById("formatDirections");

let currentPage = 1;
const rowsPerPage = 20;
let currentData = [];

// Load first 20 rows when page loads
window.addEventListener("DOMContentLoaded", () => {
    fetchFilteredData("SELECT *");
});

inputForm.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        currentPage = 1;
        filterOnEnter();
    }
});

radioObj.addEventListener("change", () => { currentPage = 1; filterOnEnter(); });
radioType.addEventListener("change", () => { currentPage = 1; filterOnEnter(); });
radioCoords.addEventListener("change", () => { currentPage = 1; filterOnEnter(); });
reduceButton.addEventListener("change", () => { currentPage = 1; filterOnEnter(); });

function filterOnEnter() {
    const searchText = inputForm.value.trim();
    const reducedOnly = reduceButton.checked;

    let queryParts = [];

    if (radioObj.checked && searchText) {
        queryParts.push(`LOWER(B) CONTAINS LOWER('${searchText}')`);
    } else if (radioType.checked && searchText) {
        //date range
        const dates = searchText.split(/\s*,\s/); //splits by comma and space
        let startDate = dates[0];
        //format the date
        let endDate = dates[1];
        console.log(startDate);
        console.log(endDate);
        let validStart = false;
        let validEnd = false;
        //TODO: format the dates- MUST be in YYYY-MM-DD

        if(!(/\d{4}-((0\d)|(1[12]))-(([012]\d)|[3][01])/.test(startDate))){
            console.log("invalid format");
            //invalid format
            if(/((0\d)|(1[12]))[/](([012]\d)|[3][01])[/]\d{4}/.test(startDate)){ //if in mm/dd/yyyy
                //reformatable
                let parts = startDate.split('/');
                startDate = parts[2] + "-" + parts[0] + "-" + parts[1];
                console.log(startDate);
                validStart = true;
            }
        }
        else{
            validStart = true;
        }

        if(endDate != undefined && !(/\d{4}-((0\d)|(1[12]))-(([012]\d)|[3][01])/.test(endDate))){
            console.log("invalid format");
            //invalid format
            if(/((0\d)|(1[12]))[/](([012]\d)|[3][01])[/]\d{4}/.test(endDate)){ //if in mm/dd/yyyy
                //reformatable
                let parts = endDate.split('/');
                endDate = parts[2] + "-" + parts[0] + "-" + parts[1];
                console.log(endDate);
                validEnd = true;
            }
        }
        else{
            validEnd = true
        }
        if(!validStart || !validEnd){
            alert("Invalid date format");
        }
        //otherwise valid format

        if(endDate === undefined && validStart){
            console.log("no end date");
            queryParts.push(`C > date "${startDate}"`);
        }
        else if(validStart && validEnd){
            queryParts.push(`C > date "${startDate}" AND C < date "${endDate}"`);
        }
        
        //queryParts.push(`C BETWEEN '&TEXT(DATEVALUE(${startDate}), "yyyy-mm-dd")&' AND '&TEXT(DATEVALUE('${endDate}'), "yyyy-mm-dd")&'`);
        //queryParts.push(`LOWER(B) CONTAINS LOWER('${searchText}')`);
    } else if (radioCoords.checked && searchText) {
        const coords = searchText.split(/\s*,\s*/);
        const ra = coords[0];
        const dec = coords[1];

        if (!ra || !dec) {
            alert("Please enter coordinates in the format 'RA DEC' or 'RA,DEC'");
            return;
        }

        queryParts.push(`LOWER(F) CONTAINS LOWER('${ra}')`);
        queryParts.push(`LOWER(G) CONTAINS LOWER('${dec}')`);
    }
    if(radioObj.checked){
        instructions.style.display = "none";
    }
    else if(radioType.checked){
        instructions.style.display = "block";
        instructions.innerHTML = "Format Date as \"MM/DD/YYYY\" or \"YYYY-MM-DD\".";
    }
    else if(radioCoords.checked){
        instructions.style.display = "block";
        instructions.innerHTML = "Format Coordinates as RA, DEC; as \"HH MM SS, DD MM SS\". There must be a space between RA and DEC. Decimals are permitted for seconds. An example is: \"12 25 48.28, 33 32 47\".";
    }

    if (reducedOnly) {
        queryParts.push(`LOWER(H) = 'yes'`);
    }

    const query = queryParts.length ? `SELECT * WHERE ${queryParts.join(" AND ")}` : "SELECT *";
    fetchFilteredData(query);
}

function fetchFilteredData(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tq=${encodedQuery}&sheet=${sheetName}`;

    fetch(url)
        .then(res => res.text())
        .then(text => {
            const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
            const rows = json.table.rows;
            const headers = json.table.cols.map(col => col.label);

            const jsonData = rows.map(row => {
                let rowData = {};
                headers.forEach((header, i) => {
                    const cell = row.c[i];
                    if (header === "Date Observed" && cell && cell.f) {
                        rowData[header] = cell.f; // Use formatted date string
                    } else {
                        rowData[header] = cell ? cell.v : "";
                    }
                });
                return rowData;
            });

            currentData = jsonData;
            showPage(currentPage);
            setupPaginationControls();
        })
        .catch(err => console.error("Fetch error:", err));
}

function showPage(page) {
    const tableBody = document.getElementById("dataTable");
    const existingRows = tableBody.querySelectorAll(".tableData");
    existingRows.forEach(row => row.remove());

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = currentData.slice(start, end);

    pageData.forEach(item => {
        const tr = document.createElement("tr");
        tr.classList.add("tableData");

        const fields = [
            "Selected",
            "Object Name",
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
}

function setupPaginationControls() {
    let paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    const pageCount = Math.ceil(currentData.length / rowsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            setupPaginationControls();
        }
    });
    paginationDiv.appendChild(prevBtn);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.disabled = i === currentPage;
        button.addEventListener("click", () => {
            currentPage = i;
            showPage(currentPage);
            setupPaginationControls();
        });
        paginationDiv.appendChild(button);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === pageCount;
    nextBtn.addEventListener("click", () => {
        if (currentPage < pageCount) {
            currentPage++;
            showPage(currentPage);
            setupPaginationControls();
        }
    });
    paginationDiv.appendChild(nextBtn);
}
 