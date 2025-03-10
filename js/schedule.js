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

const generateCalendar = () => {    
    fetch(url)
        .then(response => response.json())
            .then(data => {console.log(data)
                let dayone = new Date(year, month, 1).getDay();
                let lastdate = new Date(year, month + 1, 0).getDate();
                let dayend = new Date(year, month, lastdate).getDay();
                let monthlastdate = new Date(year, month, 0).getDate();

                //go through the list of observing dates from sheet until find prev month stuff
                
                let htmlInjection = "";
                //end of prev month
                for(let i=dayone; i>0; i--){
                    htmlInjection += '<div class="dayPanelNotThisMonth">' + (monthlastdate - i + 1) + '</div>';
                }
                //current month
                for(let i=1; i<=lastdate; i++){
                    let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() 
                        ? "dayPanelActive" : "dayPanel";
                        htmlInjection += '<div class="' + (isToday) + '">' + (i) + '</div>';
                }
                //next month
                for(let i=dayend; i<6; i++){
                    htmlInjection += '<div class="dayPanelNotThisMonth">' + (i - dayend + 1) + '</div>';
                }
            
                let headerInject = '<p class="monthYear" id="monthYear">' + months[month] + ' ' + year + '</p>';
                monthYearContainer.insertAdjacentHTML("beforeend", headerInject);
            
                console.log(months[month] + year);
                scheduleContainer.insertAdjacentHTML("beforeend", htmlInjection);
            }).catch(error => console.error("Error fetching data: ", error));
}

generateCalendar();