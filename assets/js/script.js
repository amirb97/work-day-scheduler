var tasks = [];

// gets the current day in the format desired for header
var momentDay = moment().format("dddd, MMMM Do");
var momentHour = moment().hour();

// displays the current date in the header portion of HTML
$("#currentDay").text(momentDay);

// loads tasks from localStorage
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, sets tasks equal to an empty array
    if(!tasks) {
        tasks = [{
            text: null,
            index: null
        }];
    };

    tasks.forEach(function(task) {
        $('#' + task.index).find('span').text(task.text);
    });
};

// updates object and then saves it to localStorage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// task area was clicked
$(".row").on("click", "span", function() {
    // get current text and classes of span element
    var text = $(this).text().trim();
    var classes = $(this).attr('class');

    // replace span element with a new textarea
    var textInput = $("<textarea>").addClass(classes).val(text);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
});

// editable text field was un-focused
$(".row").on("blur", "textarea", function() {
    // gets current value of textarea
    var text = $(this).val();
    var classes = $(this).attr('class');

    var taskSpan = $("<span>").addClass(classes).text(text);

    $(this).replaceWith(taskSpan);
});

// save button is clicked
$("button").on("click", function() {
    var taskIndex = $(this).parent().attr('id');
    var taskText = $('#' + taskIndex).find("span").text();

    tasks.push({
        text: taskText,
        index: taskIndex
    }); 

    saveTasks();
});

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
};

// initially sets the timeblock's colors
setTimeColors();

// initially loads tasks from localStorage
loadTasks();

// interval that will reset the timeblock's colors every minute
setInterval(function() {
    setTimeColors();
}, 60000);
