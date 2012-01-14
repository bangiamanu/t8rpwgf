// JavaScript Document
var NO_EVENTS_FOR_DIRECTIONS_ERROR = "You don't have anything else planned on this day. Please add more activities to get directions. Coming soon! Directions from your hotel!";
var DIRECTIONS_NOT_FOUND_ERROR = "Couldnt plot directions. Please email us at error@tripbrush.com with a screenshot. Apologies for the inconvenience."
var directionsService;
var directionsDisplay;


function directions_api_ready(){
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);	
}

function directions_api_getDirectionHTML(cal_event_id){	
	var str = "";
	
	calendar_events = $('#calendar').weekCalendar("serializeEvents");
	print_api_sortEvents(calendar_events);
	
	for (var i in calendar_events){			
		var calEvent = calendar_events[i];		
		if (calEvent.id == cal_event_id){


			// setting previous and next events based on the current selected event
			var target_event = calEvent;
			var previous_event = null;
			var next_event = null;
			
			// if first event
			if (i != 0)		
				previous_event = calendar_events[parseInt(i)-1];
			
			// if last event
			if (i != calendar_events.length)				
				next_event = calendar_events[parseInt(i)+1];
			
			// if next event is on next day
			if (next_event != null)
				if (!print_api_dateEquals(target_event.start, next_event.start))
					next_event = null;
				
			// if previous event is on previous day
			if (previous_event!= null)
				if (!print_api_dateEquals(target_event.start, previous_event.start))
					previous_event = null;										
					
			// Providing directions based on previous and next events
			if (previous_event == null && next_event == null)
				str = "";

			if (previous_event == null && next_event != null){
				str += "<tr><td><img src='includes/images/compass.png' /></td><td valign=middle><a href='#' onclick='directions_api_getDirections(\"" + target_event.id +"\",\"" + next_event.id + "\")'>Directions from here</a></td></tr>"
			}

			if (previous_event != null && next_event == null){
				str += "<tr><td><img src='includes/images/compass.png' /></td><td valign=middle><a href='#' onclick='directions_api_getDirections(\"" + previous_event.id +"\",\"" + target_event.id + "\")'>Directions to here</a></td></tr>"
			}

			if (previous_event != null && next_event != null){
				str += "<tr><td><img src='includes/images/compass.png' /></td><td valign=middle><a href='#' onclick='directions_api_getDirections(\"" + target_event.id +"\",\"" + next_event.id + "\")'>Directions from here</a></td></tr>"
				str += "<tr><td><img src='includes/images/compass.png' /></td><td valign=middle><a href='#' onclick='directions_api_getDirections(\"" + previous_event.id +"\",\"" + target_event.id + "\")'>Directions to here</a></td></tr>"				
			}
			return str;
		}
	}
}

function directions_api_getDirections(cal_event_id1, cal_event_id2){	
		var event1 = getCalendarEvent(cal_event_id1);
		var event2 = getCalendarEvent(cal_event_id2);
		directions_cache_showDirections(event1.marker.getPosition(), event2.marker.getPosition());

        calendar_and_map_api_closeCurrentInfoWindow();
}


