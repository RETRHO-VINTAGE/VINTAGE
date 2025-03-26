/*import { ObservingResources } from "../json/ResourcesList.js";
import { AdminResources } from "../json/ResourcesList.js";
import { TrainingResources } from "../json/ResourcesList.js";
import { MiscResources } from "../json/ResourcesList.js";*/

//grabbing observer data
const sheetID = "1o2VcE-zJTLWFUQm-btTrJz91EUNwR7BneSCSTkLXplo";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";



document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector("#resourcesList")){
        const div = document.querySelector("#resourcesList");
        //observing resources
        //createRsrcList(ObservingResources, div);
        parseAndCreateRrscSheet("ObservingResources", div);

        //admin resources
        //createRsrcList(AdminResources, div);
        parseAndCreateRrscSheet("AdminResources", div);

        //training resources
        //createRsrcList(TrainingResources, div);
        parseAndCreateRrscSheet("TrainingResources", div);

        //misc
        //createRsrcList(MiscResources, div);
        parseAndCreateRrscSheet("MiscellaneousResources", div);

    }
    else if(document.querySelector("#obsResourcesList")){
        const div = document.querySelector("#obsResourcesList");
        //createRsrcList(ObservingResources, div);
        parseAndCreateRrscSheet("ObservingResources", div);
    }
    else{
        console.log("no resourcelist");
    }
});

function parseAndCreateRrscSheet(sheetName, parentDiv){
    //grab the sheet data
    const range = sheetName + "!A2:E100"; //most number of days that will show up
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
            .then(data => {
                const childdiv = document.createElement('div');
                console.log(data.values.length);
                //populate the inner html list
                childdiv.classList.add("resourceType");
                let innerHTML = "<h1>";
                for(let i=0; i<data.values.length; i++){
                    if(data.values[i][4] == "0"){
                        innerHTML += data.values[i][0] + "</h1><ul>";
                    }
                    if(data.values[i][3] == "TRUE"){
                        //make li element
                        // const li = document.createElement('li');
                        innerHTML += "<li><a target=\"_blank\" href=\"" + data.values[i][2] + "\">" + data.values[i][1] + "</a></li>";
                    }
                }
                innerHTML += "</ul>";
                childdiv.insertAdjacentHTML("beforeend", innerHTML);
                parentDiv.appendChild(childdiv);
            }).catch(error => console.error("Error fetching data: ", error));
}

/*
function createRsrcList(rsrcJson, parentDiv){
    const childdiv = document.createElement('div');
        childdiv.classList.add("resourceType");
        let innerHTML = "<h1>";
        rsrcJson.forEach(rsrc => {
            if(rsrc.Index == "0"){
                innerHTML += rsrc["Resource Type"] + "</h1><ul>";
            }
            if(rsrc.Display == "TRUE"){
                //make li element
                // const li = document.createElement('li');
                innerHTML += "<li><a target=\"_blank\" href=\"" + rsrc["Resource Link"] + "\">" + rsrc["Resource Name"] + "</a></li>";
            }
        });
        innerHTML += "</ul>";
        childdiv.insertAdjacentHTML("beforeend", innerHTML);
        parentDiv.appendChild(childdiv);
}*/