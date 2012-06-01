// JavaScript Document
	
// Constants
var TIMESLOTS_PER_HOUR = 2;
	
var dayofweek = new Date().getDay();

// calendar_events array holds events that are saved on the calendar. 
// this is linked to the internal calendar array and is automagically updated by the JQuery component
var calendar_events = new Array();
var selected_calendar_event_id = "";

/*
 * Initializes the calendar with default settings
 */
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
				setIsValid(calEvent);
                //calendar_helper_setTitleAndBackground(calEvent);
			}
		},
		eventNew : function(calEvent, $event) {
            //calendar_helper_refreshEvents();
		},
		eventDrag : function(calEvent, $event) {
		},
		eventDrop : function(calEvent, $event) {
			calEvent.event_dom_handler = $event;
			setIsValid(calEvent);
            //calendar_helper_refreshEvents();
		},
		eventResize : function(calEvent, $event) {
			setIsValid(calEvent);
            calendar_helper_refreshEvents();
            updateEvent(calEvent.eid,calEvent.start,calEvent.end);
			//calendar_events[calEvent.id] = calEvent; //TODO
		},
		eventClick : function(calEvent, $event) {
			destination_selected_from_calendar(calEvent.id);
            calendar_helper_refreshEvents();
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

function calendar_helper_refreshEvents(){
	calendar_events = $('#calendar').weekCalendar("serializeEvents");
    calendar_helper_sortEvents(calendar_events);
	for (var i in calendar_events){			
		var cal_event = calendar_events[i];

        calendar_helper_setTitleAndBackground(cal_event);
	}
}

/*
 * sets the title and background for the provided cal_event based on selection, error and travel time
 */
function calendar_helper_setTitleAndBackground(cal_event){
    if (cal_event.is_valid)
        directions_api_addTravelTimeToTitle(cal_event);
    else
        calendar_helper_updateCalEventTitleAndBackground(cal_event, openingHoursToString(cal_event.available_destination_id, cal_event.start));
}

/*
 * updates the title of the calendar event and sets the appropriate background
 */
function calendar_helper_updateCalEventTitleAndBackground(cal_event, new_title){
    if (cal_event.title != new_title){
        cal_event.title = new_title;
        $("#calendar").weekCalendar("updateEvent", cal_event);
    }
    setEventBackground(cal_event);
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

/* returns previous event on the same day
 * if nothing is available, returns null
 * accepts calendar event id as cal_event_id
 */
function calendar_helper_getPreviousEvent(cal_event_id){
	calendar_events = $('#calendar').weekCalendar("serializeEvents");
	calendar_helper_sortEvents(calendar_events);
    var calEvent = null;
    var previous_event = null;

	for (var i in calendar_events){
		calEvent = calendar_events[i];
		if (calEvent.id == cal_event_id){

			// if not first event
			if (i != 0)
				previous_event = calendar_events[parseInt(i)-1];

			// if previous event is on previous day
			if (previous_event!= null)
				if (!calendar_helper_dateEquals(calEvent.start, previous_event.start))
					previous_event = null;

            return previous_event;
        }        
    }
    return null;
}

/* returns next event on the same day
 * if nothing is available, returns null
 * accepts calendar event id as cal_event_id
 */
function calendar_helper_getNextEvent(cal_event_id){
	calendar_events = $('#calendar').weekCalendar("serializeEvents");
	calendar_helper_sortEvents(calendar_events);
    var calEvent = null;
    var next_event = null;

	for (var i in calendar_events){
		calEvent = calendar_events[i];
		if (calEvent.id == cal_event_id){

			// if not last event
			if (i != calendar_events.length-1)
				next_event = calendar_events[parseInt(i)+1];

			// if next event is on next day
			if (next_event != null)
				if (!calendar_helper_dateEquals(calEvent.start, next_event.start))
					next_event = null;

            return next_event;
        }
    }
    return null;
}

// check if the dates are equal
function calendar_helper_dateEquals(date1, date2){
	if (date1.getFullYear() == date2.getFullYear())
		if (date1.getMonth() == date2.getMonth())
			if (date1.getDate() == date2.getDate())
				return true;
	return false;
}

// Sorts any array of events has based on .start parameter
function calendar_helper_sortEvents(array) {
  var x, y, holder;
  // The Bubble Sort method.
  for(x = 0; x < array.length; x++) {
	for(y = 0; y < (array.length-1); y++) {
	  if(array[y].start > array[y+1].start) {
		holder = array[y+1];
		array[y+1] = array[y];
		array[y] = holder;
	  }
	}
  }
}

// converts an id in the available_destinations array to the calendar_event id
function calendar_helper_getCalendarEventId(destination_id){
	for (var i in calendar_events){
		var cal_event = calendar_events[i]
		if (cal_event.available_destination_id == destination_id){
			return cal_event.id;
		}
	}
	alert(CALENDAR_EVENT_NOT_FOUND );
    return null;
}

// returns the calendar_event object from the calendar_event_id (necessary because ids are strings and may not correspond to the sequential numerical id in the array
function calendar_helper_getCalendarEvent(cal_event_id)
{
	for (var i in calendar_events){
		if (calendar_events[i].id == cal_event_id)
			return calendar_events[i];
	}
	alert(CALENDAR_EVENT_NOT_FOUND );
    return null;
}

/*********************** Private - not (shouldn't be) used outside this js *******************************/

function setIsValid(calEvent){
	calEvent.is_valid = isValid(calEvent)
}

// returns true if the calendar_event lies in the opening hours of available_event
function isValid(calendar_event){
	var available_event = available_destinations[calendar_event.available_destination_id];
	var available_opening_hours = available_event.opening_hours;
	var calendar_start = calendar_event.start;
	var calendar_end = calendar_event.end;
	
	var return_value = false;
	
	for (var i in available_opening_hours) {
		var available_start = available_opening_hours[i].start;
		var available_end = available_opening_hours[i].end;
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
		
		if (calendar_helper_dateEquals(available_start, date)){
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

function setEventBackground(cal_event){
        // mark selected as blue and unselected as grey
        if (cal_event.id == selected_calendar_event_id)
            setEventBackgroundSelected(cal_event);
        else
            setEventBackgroundUnselected(cal_event);

        // if error
        if (!cal_event.is_valid)
            setEventBackgroundError(cal_event);
}

function setEventBackgroundSelected(cal_event){
    cal_event.event_dom_handler.css("backgroundColor","#86b3e0");
    cal_event.event_dom_handler.css("border","solid 1px #36c");
    cal_event.event_dom_handler.css("color","black");

    //$("#calendar").weekCalendar("updateEvent", cal_event);
}

function setEventBackgroundUnselected(cal_event){
    cal_event.event_dom_handler.css("backgroundColor","#eee");
    cal_event.event_dom_handler.css("border","solid 1px #36c");
    cal_event.event_dom_handler.css("color","black");

    //$("#calendar").weekCalendar("updateEvent", cal_event);
}

function setEventBackgroundError(cal_event){
    cal_event.event_dom_handler.css("backgroundColor", "red");
    cal_event.event_dom_handler.css("border","solid 1px #36c");
    cal_event.event_dom_handler.css("color", "white");
}



