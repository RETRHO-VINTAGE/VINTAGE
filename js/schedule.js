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
}

function generateShift(data, currentObsNight, date, parent){
    //check if there is an observation this day
    const shiftWrap = document.createElement('div');
    shiftWrap.className = "shiftWrapper";
    let htmlInjection = '';
    let moveObsNight = 0;
    const nightDateParts = data.values[currentObsNight][0].split("/");
    const nextNightDateParts = data.values[currentObsNight-1][0].split("/");
    //if there is- check this and next one for first and second shift
    if(Number(nightDateParts[1]) == date){
        //wrapper
        htmlInjection = '<div class="shiftWrapper">';

        //text for the popup
        const popup = document.createElement('div');
        popup.classList.add("popup");
        /*popup.addEventListener('click', (e) => {
            closePopup(e);
        });*/
        const closeButton = document.createElement('button');
        closeButton.classList.add('popupButton');
        closeButton.innerHTML = "X";
        popup.appendChild(closeButton);
        closeButton.addEventListener('click', (e) => {
            console.log("hit button");
            console.log(e.parentNode);
        });
        popup.innerHTML += '<h1>' + date + '</h1>';
        //shift 1
            //senior observer
            //juniors
        //shift 2
            //senior observer
            //juniors
        //popup.innerHTML += '<p>' + data.values[currentObsNight][2] + ' JR observers scheduled<p>';

        //console.log("observation on this day: " + (monthlastdate-i+1));

        //2 shifts, currentObsNight index is first shift
        if(nextNightDateParts[1] === nightDateParts[1] && data.values[currentObsNight][1] === "First"){
            //popup first shift
            popup.innerHTML += '<h2>Shift 1</h2><p>Senior Observer: '; 

            //first shift
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift1" "><b>Shift 1:</b> NO SNR OBSERVER</div>';
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift1");
                shift.innerHTML = "<b>Shift 1:</b> NO SNR OBSERVER";
                shiftWrap.appendChild(shift);

                //insert senior observer popup
                popup.innerHTML += "NONE</p>";
                
            }
            else{ //there is a senior observer
                htmlInjection += '<div class="shiftGood shift1" ><b>Shift 1:</b> ' + data.values[currentObsNight][3] + '</div>'; 
                const shift = document.createElement('div');
                shift.classList.add("shiftGood");
                shift.classList.add("shift1");
                shift.innerHTML = '<b>Shift 1:</b> ' + data.values[currentObsNight][3];
                shiftWrap.appendChild(shift);

                //insert senior observer popup
                popup.innerHTML += data.values[currentObsNight][3] + '</p>';
            }
            //TODO: add junior observers


            //second shift
            popup.innerHTML += '<h2>Shift 2</h2><p>Senior Observer: ';
            if(data.values[currentObsNight-1][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> NO SNR OBSERVER';
                shiftWrap.appendChild(shift);

                //popup
                popup.innerHTML += "NONE</p>";
            }
            else{
                htmlInjection += '<div class="shiftGood shift2" ><b>Shift 2:</b> ' + data.values[currentObsNight-1][3] + '</div>'; 
                const shift = document.createElement('div');
                shift.classList.add("shiftGood");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> ' + data.values[currentObsNight-1][3];
                shiftWrap.appendChild(shift);

                //popup
                popup.innerHTML += data.values[currentObsNight-1][3] + '</p>';
            }
            currentObsNight--;
            moveObsNight++;
        }

        //same night, currentObsNight is second shift
        else if(nextNightDateParts[1] === nightDateParts[1] && data.values[currentObsNight][1] === "Second"){
            popup.innerHTML += '<h2>Shift 1</h2><p>Senior Observer: '; 
            //first shift
            if(data.values[currentObsNight-1][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift1" ><b>Shift 1:</b> NO SNR OBSERVER</div>';
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift1");
                shift.innerHTML = '<b>Shift 1:</b> NO SNR OBSERVER';
                shiftWrap.appendChild(shift);

                //insert senior observer popup
                popup.innerHTML += "NONE</p>";
            }
            else{
                htmlInjection += '<div class="shiftGood shift1" ><b>Shift 1:</b> ' + data.values[currentObsNight-1][3] + '</div>'; 
                const shift = document.createElement('div');
                shift.classList.add("shiftGood");
                shift.classList.add("shift1");
                shift.innerHTML = '<b>Shift 1:</b> ' + data.values[currentObsNight-1][3];
                shiftWrap.appendChild(shift);

                //insert senior observer popup
                popup.innerHTML += data.values[currentObsNight-1][3] + "</p>";
            }

            //second shift
            popup.innerHTML += '<h2>Shift 2</h2><p>Senior Observer: '; 
            if(data.values[currentObsNight][3] == ""){
                //no senior observer
                htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
                const shift = document.createElement('div');
                shift.classList.add("shiftEmpty");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> NO SNR OBSERVER';
                shiftWrap.appendChild(shift);

                //popup
                popup.innerHTML += "NONE</p>";
            }
            else{
                htmlInjection += '<div class="shiftGood shift2" ><b>Shift 2:</b> ' + data.values[currentObsNight][3] + '</div>'; 
                const shift = document.createElement('div');
                shift.classList.add("shiftGood");
                shift.classList.add("shift2");
                shift.innerHTML = '<b>Shift 2:</b> ' + data.values[currentObsNight][3];
                shiftWrap.appendChild(shift);

                //popup
                popup.innerHTML += data.values[currentObsNight][3] + "</p>";
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
                    htmlInjection += '<div class="shiftEmpty shift1" ><b>Shift 1:</b> NO SNR OBSERVER</div>';
                    const shift = document.createElement('div');
                    shift.classList.add("shiftEmpty");
                    shift.classList.add("shift1");
                    shift.innerHTML = '<b>Shift 1:</b> NO SNR OBSERVER';
                    shiftWrap.appendChild(shift);

                    //popup
                    popup.innerHTML += '<h2>Shift 1</h2><p>Senior Observer: NONE</p>';
                }
                else{
                    htmlInjection += '<div class="shiftEmpty shift2" ><b>Shift 2:</b> NO SNR OBSERVER</div>';
                    const shift = document.createElement('div');
                    shift.classList.add("shiftEmpty");
                    shift.classList.add("shift2");
                    shift.innerHTML = '<b>Shift 2:</b> NO SNR OBSERVER';
                    shiftWrap.appendChild(shift);
                    popup.innerHTML += '<h2>Shift 2</h2><p>Senior Observer: NONE</p>';
                }
                
            }
            else{ //senior observers exist
                if(data.values[currentObsNight][1] === "First"){
                    htmlInjection += '<div class="shiftGood shift1" ><b>Shift 1:</b>' + data.values[currentObsNight][3] + '</div>'; 
                    const shift = document.createElement('div');
                    shift.classList.add("shiftGood");
                    shift.classList.add("shift1");
                    shift.innerHTML = '<b>Shift 1:</b>' + data.values[currentObsNight][3];
                    shiftWrap.appendChild(shift);

                    popup.innerHTML += '<h2>Shift 1</h2><p>Senior Observer: ' + data.values[currentObsNight][3] + '</p>';
                }
                else{
                    htmlInjection += '<div class="shiftGood shift 2" ><b>Shift 2:</b> ' + data.values[currentObsNight][3] + '</div>';
                    const shift = document.createElement('div');
                    shift.classList.add("shiftGood");
                    shift.classList.add("shift2");
                    shift.innerHTML = '<b>Shift 2:</b>' + data.values[currentObsNight][3];
                    shiftWrap.appendChild(shift); 

                    popup.innerHTML += '<h2>Shift 2</h2><p>Senior Observer: ' + data.values[currentObsNight][3] + '</p>';
                }
                
            }
        }
        
        shiftWrap.appendChild(popup);

        htmlInjection += '</div>';
        //console.log("next night: " + nextNightDateParts[1]);
        currentObsNight--;
        moveObsNight++;
    }
    parent.appendChild(shiftWrap);
    return [htmlInjection, moveObsNight];
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

                
                
                let htmlInjection = "";
                //end of prev month
                for(let i=dayone; i>0; i--){
                    const dayDiv = document.createElement('div');
                    dayDiv.className = "dayPanelNotThisMonth";
                    dayDiv.innerHTML = '<h1>' + (monthlastdate - i + 1) + '</h1>';
                    
                    //htmlInjection += '<div class="dayPanelNotThisMonth"><h1>' + (monthlastdate - i + 1) + '</h1>';
                    
                    if(currentObsNight >= 0){
                        let x = generateShift(data, currentObsNight, monthlastdate-i+1, dayDiv);
                        if(x[1] !== 0){
                            dayDiv.id = currentObsNight;
                        }
                        htmlInjection += x[0];
                        currentObsNight -= x[1];
                        dayDiv.addEventListener("click", (e) => {
                            expand(e);
                        });
                    }
                   
                    scheduleContainer.appendChild(dayDiv);
                    //htmlInjection += '</div>';

                }

                //current month
                for(let i=1; i<=lastdate; i++){
                    const dayDiv = document.createElement('div');
                    
                    let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() 
                        ? "dayPanelActive" : "dayPanel";
                        dayDiv.className = isToday;
                        dayDiv.innerHTML = '<h1>' + (i) + '</h1>';
                        htmlInjection += '<div class="' + (isToday) + '"><h1>' + (i) + '</h1>';
                    
                    if(currentObsNight >= 0){
                        let x = generateShift(data, currentObsNight, i, dayDiv);
                        if(x[1] !== 0){
                            dayDiv.id = currentObsNight;
                        }
                        htmlInjection += x[0];
                        currentObsNight -= x[1];
                        dayDiv.addEventListener("click", (e) => {
                            expand(e);
                        });
                    }
                    htmlInjection += '</div>';
                    scheduleContainer.appendChild(dayDiv);
                }
                //next month
                for(let i=dayend; i<6; i++){
                    const dayDiv = document.createElement('div');
                    dayDiv.className = "dayPanelNotThisMonth";
                    dayDiv.innerHTML = '<h1>' + (i - dayend + 1) + '</h1>';
                    htmlInjection += '<div class="dayPanelNotThisMonth"><h1>' + (i - dayend + 1) + '</h1>';
                    if(currentObsNight >= 0){
                        let x = generateShift(data, currentObsNight, i-dayend+1);
                        if(x[1] !== 0){
                            dayDiv.id = currentObsNight;
                        }
                        htmlInjection += x[0];
                        currentObsNight -= x[1];
                        dayDiv.addEventListener("click", (e) => {
                            expand(e);
                        });
                    }
                    htmlInjection += '</div>';
                    
                    scheduleContainer.appendChild(dayDiv);
                }
            
                
            
                //console.log(months[month] + year);
                //scheduleContainer.insertAdjacentHTML("beforeend", htmlInjection);
            }).catch(error => console.error("Error fetching data: ", error));
}

function expand(e, currentObsNight){
    console.log("openpopup");
    console.log(e);
    console.log(e.target);
    console.log(currentObsNight);
    console.log(e.target.className);
    console.log(e.target.children);
   
    if(e.target.className === "dayPanelNotThisMonth" || e.target.className === "dayPanel" || e.target.className ==="dayPanelActive"){
        //daypanel has at least one shift
        if(e.target.id !== ""){
            console.log("id");
            const shiftWrapper = e.target.lastChild;
            //console.log(shiftWrapper.zindex);
            const popup = shiftWrapper.lastChild;
            popup.style.display = "flex";
            console.log(shiftWrapper);
        }
    }

}
function closePopup(e){
    console.log("closepopup");
    console.log(e);
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    const shifts = document.querySelectorAll('.shiftWrapper');
    console.log(shifts.length);
    const byClass = document.getElementsByClassName("shiftWrapper");
    console.log(byClass.length);
        /*[...document.querySelectorAll('.shiftWrapper')].forEach(function(item) {
        item.addEventListener('click', function() {
            console.log(item.innerHTML);
        });
    });
    /*const calendarWrapper = document.querySelector("#scheduleGrid");
    console.log(calendarWrapper.className);
    calendarWrapper.addEventListener("click", (e) => {
        console.log(e.target.tagName);
    });*/
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