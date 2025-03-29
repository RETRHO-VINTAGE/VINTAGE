let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

//grabbing observer data
const sheetID = "1wffLFBy-N0Jhkc0ZV9LKlW21rwDtEBx45sQdwN7UJIs";
const apiKey = "AIzaSyASQPliHBF4eIKF1DjCiGYfGzw6lp10kQc";
const range = "Schedule!A2:I43"; //most number of days that will show up
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

//help from: https://www.geeksforgeeks.org/how-to-design-a-simple-calendar-using-javascript/

const scheduleContainer = document.querySelector(".scheduleGrid");
const monthYearContainer = document.querySelector(".scheduleHeader");


const months = [
    "January", 
    "February",
    "March", 
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function getJrNames(data, currentObsNight){
    let jrNames = "";
    for(let i=Number(data.values[currentObsNight][2]); i>0; i--){
        jrNames += data.values[currentObsNight][4+i-1];
        if(i > 1){
            jrNames += ", ";
        }
    }
    if(Number(data.values[currentObsNight][2]) === 0){
        jrNames = "NONE";
    }
    return jrNames;
}
function getSrNames(data, currentObsNight){
    let SrName = data.values[currentObsNight][3];
    if(SrName === ""){
        SrName = "NONE";
    }
    return SrName;
}

function generateShift(data, currentObsNight, date, parent){
    //check if there is an observation this day
    const shiftWrap = document.createElement('div');
    shiftWrap.className = "shiftWrapper";
    let moveObsNight = 0;
    let nightDateParts = -1;
    let nextNightDateParts = -1;

    if(currentObsNight >= 0){
        nightDateParts = data.values[currentObsNight][0].split("/");
        if(currentObsNight > 0){
            nextNightDateParts = data.values[currentObsNight-1][0].split("/");
        }
    }
    //if there is- check this and next one for first and second shift
    if(nightDateParts != -1 && Number(nightDateParts[1]) == date){
        //console.log("observation on this day: " + (monthlastdate-i+1));

        //2 shifts, currentObsNight index is first shift
        if(nextNightDateParts != -1 && nextNightDateParts[1] === nightDateParts[1] && data.values[currentObsNight][1] === "First"){
            //first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift1");
                shift.innerHTML = "<b>Shift 1:</b> NO SNR OBSERVER";
                shiftWrap.appendChild(shift);
            }
            else{ //there is a senior observer
                const shift = document.createElement('div');
                //shift.classList.add("shiftGood");
                shift.classList.add("shift1");
                shift.innerHTML = '<b>Shift 1:</b> ' + data.values[currentObsNight][3];
                shiftWrap.appendChild(shift);

                if(Number(data.values[currentObsNight][2]) < 2){
                    shift.classList.add("shiftEmpty");
                }
                else{
                    shift.classList.add("shiftGood");
                }
            }
            //second shift
            if(data.values[currentObsNight-1][3] == ""){
                //no senior observer
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> NO SNR OBSERVER';
                shiftWrap.appendChild(shift);
            }
            else{
                const shift = document.createElement('div');
                //shift.classList.add("shiftGood");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> ' + data.values[currentObsNight-1][3];
                shiftWrap.appendChild(shift);

                if(Number(data.values[currentObsNight-1][2]) < 2){
                    shift.classList.add("shiftEmpty");
                }
                else{
                    shift.classList.add("shiftGood");
                }
            }
            currentObsNight--;
            moveObsNight++;
        }
        //same night, currentObsNight is second shift
        else if(nextNightDateParts != -1 && nextNightDateParts[1] === nightDateParts[1] && data.values[currentObsNight][1] === "Second"){
            //first shift
            if(data.values[currentObsNight-1][3] == ""){
                //no senior observer
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift1");
                shift.innerHTML = '<b>Shift 1:</b> NO SNR OBSERVER';
                shiftWrap.appendChild(shift);
            }
            else{
                const shift = document.createElement('div');
                //shift.classList.add("shiftGood");
                shift.classList.add("shift1");
                shift.innerHTML = '<b>Shift 1:</b> ' + data.values[currentObsNight-1][3];
                shiftWrap.appendChild(shift);

                if(Number(data.values[currentObsNight-1][2]) < 2){
                    shift.classList.add("shiftEmpty");
                }
                else{
                    shift.classList.add("shiftGood");
                }
            }

            //second shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> NO SNR OBSERVER';
                shiftWrap.appendChild(shift);

            }
            else{
                const shift = document.createElement('div');
                //shift.classList.add("shiftGood");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> ' + data.values[currentObsNight][3];
                shiftWrap.appendChild(shift);

                if(Number(data.values[currentObsNight][2]) < 2){
                    shift.classList.add("shiftEmpty");
                }
                else{
                    shift.classList.add("shiftGood");
                }
            }
            currentObsNight--;
            moveObsNight++;
        }
        //only one shift that day
        else{ //next is not same day 
            //first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                if(data.values[currentObsNight][1] === "First"){
                    const shift = document.createElement('div');
                    shift.classList.add("shiftEmpty");
                    shift.classList.add("shift1");
                    shift.innerHTML = '<b>Shift 1:</b> NO SNR OBSERVER';
                    shiftWrap.appendChild(shift);
                }
                else{
                    htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
                    const shift = document.createElement('div');
                    shift.classList.add("shiftEmpty");
                    shift.classList.add("shift2");
                    shift.innerHTML = '<b>Shift 2:</b> NO SNR OBSERVER';
                    shiftWrap.appendChild(shift);
                }
                
            }
            else{ //senior observers exist
                if(data.values[currentObsNight][1] === "First"){
                    const shift = document.createElement('div');
                    //shift.classList.add("shiftGood");
                    shift.classList.add("shift1");
                    shift.innerHTML = '<b>Shift 1:</b>' + data.values[currentObsNight][3];
                    shiftWrap.appendChild(shift);

                    if(Number(data.values[currentObsNight][2]) < 2){
                        shift.classList.add("shiftEmpty");
                    }
                    else{
                        shift.classList.add("shiftGood");
                    }
                }
                else{
                    const shift = document.createElement('div');
                    shift.classList.add("shiftGood");
                    shift.classList.add("shift2");
                    shift.innerHTML = '<b>Shift 2:</b>' + data.values[currentObsNight][3];
                    shiftWrap.appendChild(shift); 

                    if(Number(data.values[currentObsNight][2]) < 2){
                        shift.classList.add("shiftEmpty");
                    }
                    else{
                        shift.classList.add("shiftGood");
                    }
                }
                
            }
        }
        
        //shiftWrap.appendChild(popup);

        //console.log("next night: " + nextNightDateParts[1]);
        currentObsNight--;
        moveObsNight++;
    }
    parent.appendChild(shiftWrap);
    return moveObsNight;
}

const generateCalendar = () => {    
    fetch(url)
        .then(response => response.json())
            .then(data => {
                let dayone = new Date(year, month, 1).getDay();
                let lastdate = new Date(year, month + 1, 0).getDate();
                let dayend = new Date(year, month, lastdate).getDay();
                let monthlastdate = new Date(year, month, 0).getDate();
                //set the day
                monthYearContainer.innerHTML = '<p class="monthYear" id="monthYear">' + months[month] + ' ' + year + '</p>';


                //go through the list of observing dates from sheet until find prev month stuff
                /*console.log(data);
                console.log(data.values[0]);
                console.log(data.values.length); //returns number of nights*/
                let currentObsNight = data.values.length - 1;

                let foundFirstNight = false;
                while(!foundFirstNight){
                    //console.log(data.values[currentObsNight][0]); //string
                    const nightDateParts = data.values[currentObsNight][0].split("/");
                    //console.log(nightDateParts); //[0] is month, [1] is day, [2] is year
                    if(Number(nightDateParts[2]) < year){
                        currentObsNight--; //move up a date to get towrads correct year
                    }
                    else if(Number(nightDateParts[0]) < month){ //in correct year, not month
                        currentObsNight--; //move towards correct month
                    }
                    else if(Number(nightDateParts[1]) < monthlastdate-dayone+1){
                        //in correct month (the prev month), but too early in days
                        currentObsNight--;
                    }
                    else if(Number(nightDateParts[1] >= monthlastdate-dayone+1)){
                        //in correct month, and within the boundaries of the calendar
                        foundFirstNight = true;
                    }
                }
                //console.log(data.values[currentObsNight]); //first date in the calendar

                //end of prev month
                for(let i=dayone; i>0; i--){
                    const dayDiv = document.createElement('div');
                    dayDiv.className = "dayPanelNotThisMonth";
                    dayDiv.innerHTML = '<h1>' + (monthlastdate - i + 1) + '</h1>';
                                    
                    if(currentObsNight >= 0){
                        let x = generateShift(data, currentObsNight, monthlastdate-i+1, dayDiv);
                        if(x !== 0){
                            dayDiv.id = currentObsNight;
                        }
                        currentObsNight -= x;
                        dayDiv.addEventListener("click", (e) => {
                            console.log(typeof(currentObsNight));
                            expand(e, data);
                        });
                    }
                    scheduleContainer.appendChild(dayDiv);
                }

                //current month
                for(let i=1; i<=lastdate; i++){
                    const dayDiv = document.createElement('div');
                    
                    let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() 
                        ? "dayPanelActive" : "dayPanel";
                        dayDiv.className = isToday;
                        dayDiv.innerHTML = '<h1>' + (i) + '</h1>';
                    
                    if(currentObsNight >= 0){
                        let x = generateShift(data, currentObsNight, i, dayDiv);
                        if(x !== 0){
                            dayDiv.id = currentObsNight;
                        }
                        currentObsNight -= x;
                        dayDiv.addEventListener("click", (e) => {
                            expand(e, data);
                        });
                    }
                    scheduleContainer.appendChild(dayDiv);
                }
                //next month
                for(let i=dayend; i<6; i++){
                    const dayDiv = document.createElement('div');
                    dayDiv.className = "dayPanelNotThisMonth";
                    dayDiv.innerHTML = '<h1>' + (i - dayend + 1) + '</h1>';
                
                    if(currentObsNight >= 0){
                        let x = generateShift(data, currentObsNight, i-dayend+1, dayDiv);
                        if(x !== 0){
                            dayDiv.id = currentObsNight;
                        }
                        currentObsNight -= x;
                        dayDiv.addEventListener("click", (e) => {
                            expand(e, data);
                        });
                    }
                    scheduleContainer.appendChild(dayDiv);
                }
                //console.log(months[month] + year);
                //scheduleContainer.insertAdjacentHTML("beforeend", htmlInjection);
            }).catch(error => console.error("Error fetching data: ", error));
}

function expand(e, data){
    /* element hierarchy: 
       div dayPanelActive, dayPanelNotThisMonth, or dayPanel, which has the ID number
            h1 number
            div shiftWrapper
                div shift1 shiftGood/Empty(some)
                    b shift1
                div shift2 shiftGood/Empty(some)
                    b shift2
     */
    
    console.log("expand clicked");
    console.log(e.target);
    //grab popup 
    const popup = document.getElementById("popup");
    const popuptext = document.getElementById("popuptext");

    //need to get to the parent div element
    let parentDivDay = e.target;
    if(parentDivDay.className !== "popupButton"){
        while(parentDivDay.className !== "dayPanelNotThisMonth" && parentDivDay.className !== "dayPanel" && parentDivDay.className !=="dayPanelActive"){
            parentDivDay = parentDivDay.parentElement;
        }
    }
    console.log(parentDivDay.hasAttribute('id'));
    //if already flex, do nothing
    if(popup.style.display !== "flex" && parentDivDay.hasAttribute('id') && parentDivDay.className !== "popupButton"){ //also check for target id on the parent element
        console.log('popup triggered');
        console.log(parentDivDay.id);
        popuptext.innerHTML = "";
        popup.style.display = "flex";
        let currentObsNight = Number(parentDivDay.id);

        let innerHTML = '<h1>' + data.values[currentObsNight][0] + '</h1>';
        let shift1 = '<h2>Shift 1: </h2> <p>Senior Observer: ';
        let shift1Filled = false;
        let shift2 = '<h2>Shift 2: </h2> <p>Senior Observer: ';
        let shift2Filled = false;
        //current obs night
        let snrName1 = getSrNames(data, currentObsNight);
        //jr observers
        let jrNames1 = getJrNames(data, currentObsNight);

        //populate correct shift
        if(data.values[currentObsNight][1] === "First"){
            shift1 += snrName1 + '</p> <p>Junior Observers: ' + jrNames1 + '</p>';
            shift1Filled = true;
        }
        //check if shift 2
        else if(data.values[currentObsNight][1] === "Second"){
            shift2 += snrName1 + '</p> <p>Junior Observers: ' + jrNames1 + '</p>';
            shift2Filled = true;
        }
        
        //check if next day is the same night / exists
        if(currentObsNight > 0 && data.values[currentObsNight-1][0] === data.values[currentObsNight][0]){
            let jrNames2 = getJrNames(data, currentObsNight-1);
            let snrName2 = getSrNames(data, currentObsNight-1);
            if(data.values[currentObsNight-1][1] === "First"){
                shift1 += snrName2 + '</p> <p>Junior Observers: ' + jrNames2 + '</p>';
                shift1Filled = true;
            }
            //check if shift 2
            else if(data.values[currentObsNight-1][1] === "Second"){
                shift2 += snrName2 + '</p> <p>Junior Observers: ' + jrNames2 + '</p>';
                shift2Filled = true;
            }
        }
        //fill in any blanks
        if(!shift1Filled){
            shift1 += 'NONE</p> <p>Junior Observers: NONE</p>';
        }
        if(!shift2Filled){
            shift2 += 'NONE</p> <p>Junior Observers: NONE</p>';
        }

        innerHTML += shift1 + shift2;
        console.log(innerHTML);
        popuptext.innerHTML = innerHTML;
    }
    else{
        console.log("no popup for you");
        /*popup.style.dispay = 'none';*/
    }

   
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
});


/*
const dayPanels = document.querySelectorAll("div.shiftWrapper");
for(let i=0; i<dayPanels.length; i++){
    console.log(i);
    dayPanels[i].addEventListener("click", function(event) {
        console.log(event.currentTarget);
    });
}
*/

/*
function generateShiftOLD(data, currentObsNight, date){
    //check if there is an observation this day
    let htmlInjection = '';
    let moveObsNight = 0;
    const nightDateParts = data.values[currentObsNight][0].split("/");
    const nextNightDateParts = data.values[currentObsNight-1][0].split("/");
    //if there is- check this and next one for first and second shift
    if(Number(nightDateParts[1]) == date){
        //wrapper
        htmlInjection = '<div class="shiftWrapper">';
        //console.log("observation on this day: " + (monthlastdate-i+1));
        if(nextNightDateParts[1] === nightDateParts[1] && data.values[currentObsNight][1] === "First"){
            //first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift1" "><b>Shift 1:</b> NO SNR OBSERVER</div>';
            }
            else{
                htmlInjection += '<div class="shiftGood shift1" ><b>Shift 1:</b> ' + data.values[currentObsNight][3] + '</div>'; 
            }
            //same night, curent is first shift and next is second shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
            }
            else{
                htmlInjection += '<div class="shiftGood shift2" ><b>Shift 2:</b> ' + data.values[currentObsNight][3] + '</div>'; 
            }
            currentObsNight--;
            moveObsNight++;
        }
        else if(nextNightDateParts[1] === nightDateParts[1] && data.values[currentObsNight][1] === "Second"){
            //first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift1" ><b>Shift 1:</b> NO SNR OBSERVER</div>';
            }
            else{
                htmlInjection += '<div class="shiftGood shift1" ><b>Shift 1:</b> ' + data.values[currentObsNight][3] + '</div>'; 
            }
            //same night, current is second shift and next is first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
            }
            else{
                htmlInjection += '<div class="shiftGood shift2" ><b>Shift 2:</b> ' + data.values[currentObsNight][3] + '</div>'; 
            }
            currentObsNight--;
            moveObsNight++;
        }
        else{ //next is not same day 
            //first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                if(data.values[currentObsNight][1] === "First"){
                    htmlInjection += '<div class="shiftEmpty shift1" ><b>Shift 1:</b> NO SNR OBSERVER</div>';
                }
                else{
                    htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
                }
                
            }
            else{
                if(data.values[currentObsNight][1] === "First"){
                    htmlInjection += '<div class="shiftGood shift1" ><b>Shift 1:</b>' + data.values[currentObsNight][3] + '</div>'; 
                }
                else{
                    htmlInjection += '<div class="shiftGood shift 2" ><b>Shift 2:</b> ' + data.values[currentObsNight][3] + '</div>'; 
                }
                
            }
        }
        htmlInjection += '</div>';
        //console.log("next night: " + nextNightDateParts[1]);
        currentObsNight--;
        moveObsNight++;
    }
    return [htmlInjection, moveObsNight];
}*/