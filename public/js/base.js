// ***************
// Includes
// ***************

// ***************
// Events
// ***************


$(document).ready(function() {
	
	// Set the time on the header if it's displayed
	if ($(".top-bar .time").length > 0) {
		$(".time").html(displayTime());
	}
	
});





// ***************
// Functions
// ***************




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
