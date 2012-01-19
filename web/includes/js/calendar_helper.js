// JavaScript Document
	
// Constants
var TIMESLOTS_PER_HOUR = 2;
	
var dayofweek = new Date().getDay();

// calendar_events array holds events that are saved on the calendar. 
// this is linked to the internal calendar array and is automagically updated by the JQuery component
var calendar_events = new Array();
var selected_calendar_event_id = "";

function calendar_helper_populateCalendar(){

	// Event listeners for calendar and intiialize calendar
	$('#calendar').weekCalendar({
		timeslotsPerHour: TIMESLOTS_PER_HOUR,
		daysToShow: days_to_show,
		date: calendar_start_date,
		firstDayOfWeek: dayofweek,
		buttons: false,
		allowEventCreation: false,
		businessHours: {start: 8, end: 24, limitDisplay: true},
		height: function() {return window.innerHeight - 0.45*window.innerHeight - 80},
		eventRender : function(calEvent, $event) {
			if (calEvent.id !=null){
                           updateEvent(calEvent.eid,calEvent.start,calEvent.end);
				//calendar_events[calEvent.id] = calEvent; //TODO
				calEvent.event_dom_handler = $event;
				checkEvent(calEvent, $event);
				calendar_helper_setEventBackgrounds();
			}
		},
		eventNew : function(calEvent, $event) {
		},
		eventDrag : function(calEvent, $event) {
		},
		eventDrop : function(calEvent, $event) {
			calEvent.event_dom_handler = $event;
		},
		eventResize : function(calEvent, $event) {
                        updateEvent(calEvent.eid,calEvent.start,calEvent.end);
			//calendar_events[calEvent.id] = calEvent; //TODO
			checkEvent(calEvent, $event);
			calendar_helper_setEventBackgrounds();
		},
		eventClick : function(calEvent, $event) {
			destination_selected_from_calendar(calEvent.id);
		},
		eventMouseover : function(calEvent, $event) {
		},
		eventMouseout : function(calEvent, $event) {
		},
		noEvents : function() {
		},
		data:{events:calendar_events}
	});
	
	
	// Activating tabs
	$(".tabLink").each(function(){
	  $(this).click(function(){
		tabeId = $(this).attr('id');
		$(".tabLink").removeClass("activeLink");
		$(this).addClass("activeLink");
		$(".tabcontent").addClass("hide");
		$("#"+tabeId+"-1").removeClass("hide")   
		return false;	  
	  });
	});

}

function updateEvent(id,start,end) {
    if ($("#editable").val()=="true") {
        var params = "command=UpdateEvent&fromTime=" + start.formatDate("d:m:Y:H:i") + "&toTime=" + end.formatDate("d:m:Y:H:i")+"&id="+id;
        $.ajax({
            type: "POST",
            url: "PlanAction.do",
            cache: false,
            data: params
        });    
    }
}

function calendar_helper_setEventBackgrounds(){
	calendar_events = $('#calendar').weekCalendar("serializeEvents");
	for (var i in calendar_events){			
		var calEvent = calendar_events[i];
		var event_dom_handler = calEvent.event_dom_handler;
		if (event_dom_handler != null){
			
			// mark selected as blue
			if (calEvent.id == selected_calendar_event_id){
				// if selected event
				event_dom_handler.css("backgroundColor","#86b3e0");
				event_dom_handler.css("border","solid 1px #36c");						
				event_dom_handler.css("color","black");						
			}
			else{
				// if not selected event
				event_dom_handler.css("backgroundColor","#eee");
				event_dom_handler.css("border","solid 1px #36c");						
				event_dom_handler.css("color","black");						
			}
			
			// mark errors as red				
			if (calEvent.is_valid){				
				// if not error
				calEvent.title = available_destinations[calEvent.available_destination_id].title;					
			}
			else{
				// if error
				event_dom_handler.css("backgroundColor", "red");
				event_dom_handler.css("border","solid 1px #36c");						
				event_dom_handler.css("color", "white");
				calEvent.title = openingHoursToString(calEvent.available_destination_id, calEvent.start);
			}
		}
	}
}

// accepts id from the available_destinations array and returns true if it exists on the calendar
function calendar_helper_isPlanned(destination_id){
	for (var i in calendar_events){
		cal_event = calendar_events[i]
		if (cal_event.available_destination_id == destination_id)
			return true;
	}
	return false;
}


/*********************** Private - not (shouldn't be) used outside this js *******************************/

function checkEvent(calEvent, $event){
	calEvent.is_valid = isValid(calEvent)
}


// returns true if the calendar_event lies in the opening hours of available_event
function isValid(calendar_event){
	available_event = available_destinations[calendar_event.available_destination_id];
	available_opening_hours = available_event.opening_hours;
	calendar_start = calendar_event.start;
	calendar_end = calendar_event.end;
	
	var return_value = false;
	
	for (var i in available_opening_hours) {
		available_start = available_opening_hours[i].start;
		available_end = available_opening_hours[i].end;
		if (calendar_start >= available_start)
			if (calendar_end <= available_end)
				return_value = true;
	}
	return return_value;
}


// returns opening hours of a given event on a particular date in string form
function openingHoursToString(available_destination_id, date){		
	var available_event = available_destinations[available_destination_id];
	var available_opening_hours = available_event.opening_hours;
	var returnString = "";
	
	for (var i in available_opening_hours){
		available_start = available_opening_hours[i].start;
		available_end = available_opening_hours[i].end;
		
		if (print_api_dateEquals(available_start, date)){	
			if (returnString != "") returnString += " & "; 		
			returnString += available_start.formatDate('g:i a') + " to ";
			returnString += available_end.formatDate('g:i a');
		}
	}

	if (returnString == "")
		returnString = available_event.title + " is not available on this day"
	else
		returnString = available_event.title + " is available from " + returnString;
	return returnString;
}

