import { ObservingResources } from "../json/ResourcesList.js";
import { AdminResources } from "../json/ResourcesList.js";
import { TrainingResources } from "../json/ResourcesList.js";
import { MiscResources } from "../json/ResourcesList.js";

document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector("#resourcesList")){
        const div = document.querySelector("#resourcesList");
        //observing resources
        /*const ORdiv = document.createElement('div');
        ORdiv.classList.add("resourceType");
        let innerHTML = "<h1>Observing Resources</h1><ul>";
        ObservingResources.forEach(rsrc => {
            if(rsrc.Display == "TRUE"){
                //make li element
                const li = document.createElement('li');
                innerHTML += "<li><a href=\"" + rsrc["Resource Link"] + "\">" + rsrc["Resource Name"] + "</a></li>";
            }
        });
        innerHTML += "</ul>";
        ORdiv.insertAdjacentHTML("beforeend", innerHTML);
        div.appendChild(ORdiv);*/
        createRsrcList(ObservingResources, div);

        //admin resources
        createRsrcList(AdminResources, div);

        //training resources
        createRsrcList(TrainingResources, div);

        //misc
        createRsrcList(MiscResources, div);

    }
    else if(document.querySelector("#obsResourcesList")){
        const div = document.querySelector("#obsResourcesList");
        createRsrcList(ObservingResources, div);
    }
    else{
        console.log("no resourcelist");
    }
});

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
                const li = document.createElement('li');
                innerHTML += "<li><a target=\"_blank\" href=\"" + rsrc["Resource Link"] + "\">" + rsrc["Resource Name"] + "</a></li>";
            }
        });
        innerHTML += "</ul>";
        childdiv.insertAdjacentHTML("beforeend", innerHTML);
        parentDiv.appendChild(childdiv);
}