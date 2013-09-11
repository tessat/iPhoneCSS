// ***************
// Includes
// ***************

// ***************
// Events
// ***************


$(document).ready(function() {
	// Setup the background
	setupBG();
	
	// Set the time on the header
	$(".time").html(displayTime());
	
	// Set the calendar icon
	$(".icon.calendar .weekday").html(displayWeekday());
	$(".icon.calendar .date").html(displayDate());
	
	// Set the clock icon
	// TODO
	
});





// ***************
// Functions
// ***************

function setupBG() {
	var maxTop 	= $(".iphone .screen .home .bg").height();
	var maxLeft = $(".iphone .screen .home .bg").width();
	for(i=0;i<140;i++){  
		$(".iphone .screen .home .bg").prepend("<span></span>");
		var top 	= Math.floor((Math.random()*maxTop)+1);
		var left 	= Math.floor((Math.random()*maxLeft)+1);
		$(".iphone .screen .home .bg span:first").css('top', top+'px');
		$(".iphone .screen .home .bg span:first").css('left', left+'px');
	}
}


function displayTime() {
	var str = "";

	var currentTime = new Date();
	var hours 			= currentTime.getHours();
	var minutes 		= currentTime.getMinutes();
	var extra				= "";

	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if(hours > 11){
		extra = "PM"
	} else {
		extra = "AM"
	}
	hours = hours%12;
	if (hours < 1) {
		hours = 12;
	}
	str = hours + ":" + minutes + " " + extra;
	return str;
}

function displayWeekday() {
	var d				= new Date();
	var weekday	= new Array(7);
	weekday[0] 	= "Sunday";
	weekday[1]	= "Monday";
	weekday[2]	= "Tuesday";
	weekday[3]	= "Wednesday";
	weekday[4]	= "Thursday";
	weekday[5]	= "Friday";
	weekday[6]	= "Saturday";

	var n = weekday[d.getDay()];
	return n;
}

function displayDate() {
	var d			= new Date();
	var date 	= d.getDate();
	
	if (date < 10) {
		date = "0" + date;
	}
	return date;
}