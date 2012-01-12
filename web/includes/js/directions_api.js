// JavaScript Document
var NO_EVENTS_FOR_DIRECTIONS_ERROR = "You don't have anything else planned on this day. Please add moer activities to get directions. Coming soon! Directions from your hotel!";
var directionsService;
var directionsDisplay;


function directions_api_ready(){
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);	
}


function directions_api_getDirections(cal_event_id){	
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
				aler(NO_EVENTS_FOR_DIRECTIONS_ERROR);

			if (previous_event == null && next_event != null){
				showDirections(target_event.marker.getPosition(), next_event.marker.getPosition());
			}

			if (previous_event != null && next_event == null){
				showDirections(previous_event.marker.getPosition(), target_event.marker.getPosition());
			}

			if (previous_event != null && next_event != null){
				
			}
		}
	}
}

function showDirections(from,to) {
	var request = {
		origin:from,
	    destination:to,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
} 
