let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

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
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();

    let htmlInjection = "";
    //end of prev month
    for(let i=dayone; i>0; i--){
        htmlInjection += '<div class="dayPanel">' + (monthlastdate - i + 1) + '</div>';
    }
    //current month
    for(let i=1; i<=lastdate; i++){
        let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() 
            ? "dayPanelActive" : "dayPanel";
            htmlInjection += '<div class="' + (isToday) + '">' + (i) + '</div>';
    }
    //next month
    for(let i=dayend; i<6; i++){
        htmlInjection += '<div class="dayPanel">' + (i - dayend + 1) + '</div>';
    }

    let headerInject = '<p class="monthYear" id="monthYear">' + months[month] + ' ' + year + '</p>';
    monthYearContainer.insertAdjacentHTML("beforeend", headerInject);

    console.log(months[month] + year);
    scheduleContainer.insertAdjacentHTML("beforeend", htmlInjection);
}

generateCalendar();