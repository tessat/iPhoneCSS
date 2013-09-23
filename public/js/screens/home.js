// ***************
// Includes
// ***************

// ***************
// Events
// ***************


$(document).ready(function() {
	// Setup the background
	setupBG();
	
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
	for(i=0;i<25;i++){  
		$(".iphone .screen .home .bg").prepend("<span></span>");
		var top 	= Math.floor((Math.random()*maxTop)+1);
		var left 	= Math.floor((Math.random()*maxLeft)+1);
		$(".iphone .screen .home .bg span:first").css('top', top+'px');
		$(".iphone .screen .home .bg span:first").css('left', left+'px');
	}
	$(".iphone .screen .home .bg span").fadeIn(2000);
	moveBG();
}

function moveBG() {
	setInterval(function() {
		$(".iphone .screen .home .bg span:odd").each(function() {
			moveBGSpan($(this));
		});
	},2000);
	setInterval(function() {
		$(".iphone .screen .home .bg span:even").each(function() {
			moveBGSpan($(this));
		});
	},1000);
}

function moveBGSpan(span, mul) {
	var height 	= $(".iphone .screen .home .bg").height();
	var width 	= $(".iphone .screen .home .bg").width();
	
	var top 	= $(span).position().top + (10-Math.floor(Math.random()*30));
	var left 	= $(span).position().left + (10-Math.floor(Math.random()*30));
	if (top > height) {
		top = (height-5);
	} else if (top < 0) {
		top = 5;
	}
	if (left > width) {
		left = (width-5);
	} else if (left < 0) {
		left = 5;
	}

	$(span).animate({
		top: top,
    left: left
  }, 3000);
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