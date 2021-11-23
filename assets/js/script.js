// gets the current day in the format desired for header
var momentDay = moment().format("dddd, MMMM Do");
var momentHour = moment().hour();

// displays the current date in the header portion of HTML
$("#currentDay").text(momentDay);

// function that sets colors for past/present/future time blocks
function setTimeColors() {
    // loop set to 0-23 in case future development wants to expand the usable hours for the calendar
    for (let i=0; i<=23; i++){
        if(i < momentHour){
            // adds a class for the past times
            $("#" + i).find(".description").addClass("past");
        } else if(i === momentHour) {
            // adds a class for the current time
            $("#" + i).find(".description").addClass("present");
        } else {
            // adds a class for the future time
            $("#" + i).find(".description").addClass("future");
        }
    };
}

// initially sets the timeblock's colors
setTimeColors();

// interval that will reset the timeblock's colors every 5 minutes
setInterval(function() {
    setTimeColors();
}, 300000);
