// JavaScript Document
	
	// Constants
	var TIMESLOT_LENGTH = 90;
	var TIMESLOTS_PER_HOUR = 2;
		
	// todays year month and day to easily create date objects going forward
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	var dayofweek = new Date().getDay();
	
	// calendar_events array holds events that are saved on the calendar. 
	var calendar_events = new Array();

	function populateCalendar(){			
		calendar_events[0] = {	id:0, 
								start: new Date(year, month, day, 8), 
								end: new Date(year, month, day, 9),
								title:"Dummy Event",
								available_event_id: 0,
								is_valid: true};
	
	
		// Event listeners for calendar and intiialize calendar
		$(document).ready(function() {
	
			$('#calendar').weekCalendar({
				timeslotsPerHour: TIMESLOTS_PER_HOUR,
				daysToShow: 4,
				firstDayOfWeek: dayofweek,
				buttons: false,
				businessHours: {start: 8, end: 24, limitDisplay: true},
				height: function($calendar){
					return window.innerHeight - 0.45*window.innerHeight - 80 ;
				},
				eventRender : function(calEvent, $event) {
					calendar_events[calEvent.id] = calEvent;
					checkEvent(calEvent, $event);
				},
				eventNew : function(calEvent, $event) {
				},
				eventDrag : function(calEvent, $event) {
				},
				eventDrop : function(calEvent, $event) {
				},
				eventResize : function(calEvent, $event) {
					calendar_events[calEvent.id] = calEvent;
					checkEvent(calEvent, $event);
				},
				eventClick : function(calEvent, $event) {
				},
				eventMouseover : function(calEvent, $event) {
				},
				eventMouseout : function(calEvent, $event) {
				},
				noEvents : function() {
				},
				data:{events:calendar_events}
			});
			
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
			
	
			function displayMessage(message) {
				$("#message").html(message).fadeIn();
			}
	
			$("<div id=\"message\" class=\"ui-corner-all\"></div>").prependTo($("body"));
			
		});
	}

	function checkEvent(calEvent, $event){
		if (isValid(calEvent)){
			calEvent.is_valid = true;
			calEvent.title = available_destinations[calEvent.available_event_id].title;					
		}
		else{
			$event.css("backgroundColor", "red");
			calEvent.is_valid = false;
			calEvent.title = openingHoursToString(calEvent.available_event_id, calEvent.start);
		}		
	}
	
	// Checks for first available time and adds event (event must already in the available_destinations array
	function addEvent(event_id){
		event_to_add = available_destinations[event_id];
		var open_slot = findFirstOpenSlot(event_id);
		
		var cal_event =  {	id:calendar_events.length, 
							start: open_slot.start, 
							end: open_slot.end,
							title:event_to_add.title,
							available_event_id: event_id,
							is_valid: true};



		calendar_events.push(cal_event);
		$('#calendar').weekCalendar("updateEvent", cal_event);	
	}
	

	// returns true if the calendar_event lies in the opening hours of available_event
	function isValid(calendar_event){
		available_event = available_destinations[calendar_event.available_event_id];
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
	
	
	// returns the start date time object of first available two hours
	function findFirstOpenSlot(available_event_id){
		var available_event = available_destinations[available_event_id];
		var available_opening_hours = available_event.opening_hours;
		
		// create an array of all TIMESLOT_LENGTH min timeslots in opening hours marking all as free
		var timeslots = new Array()
		for (var i in available_opening_hours){
			available_start = available_opening_hours[i].start;
			available_end = available_opening_hours[i].end;
			
			var timeslot_start = available_start;
			var timeslot_end = addMinutes(timeslot_start, TIMESLOT_LENGTH); 
			while (timeslot_end <= available_end){
				timeslots.push({start:timeslot_start, end:timeslot_end, is_free:true});
				timeslot_start = addMinutes(timeslot_start, 30)
				timeslot_end = addMinutes(timeslot_end, 30)
			}			
		}
		
		// double loop through the array of timeslots and the calendar events and mark all clashing timeslots as not free
		for(var i in calendar_events){
			for (var j in timeslots){
				if (isClash(timeslots[j], calendar_events[i]))
					timeslots[j].is_free = false
			}
		}
		
		for (var i in timeslots){
			if (timeslots[i].is_free){
				//alert(i + " " + timeslots[i].start + " " + timeslots[i].end)
				return timeslots[i];
			}		
		}
		
		alert("No timeslots available. Please check your calendar");
		return false;
		
	}
	
	// returns true if timeslot clashes with calendar event
	function isClash(timeslot, calendar_event){
		ts = timeslot.start;
		te = timeslot.end;
		cs = calendar_event.start;
		ce = calendar_event.end;

		if ((ts < ce && te >= ce) || (ts <= cs && te > cs))
			return true;

		return false;		
	}
	
	// adds minutes to date
	function addMinutes(date, minutes){
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + minutes);
	}
	
	// returns opening hours of a given event on a particular date in string form
	function openingHoursToString(available_event_id, date){		
		var available_event = available_destinations[available_event_id];
		var available_opening_hours = available_event.opening_hours;
		var returnString = "";
		
		for (var i in available_opening_hours){
			available_start = available_opening_hours[i].start;
			available_end = available_opening_hours[i].end;
			
			if (dateEquals(available_start, date)){	
				if (returnString != "") returnString += " and "; 		
				returnString += available_start.toLocaleTimeString() + " to ";
				returnString += available_end.toLocaleTimeString();
			}
		}

		if (returnString == "")
			returnString = available_event.title + " is not available on this day"
		else
			returnString = available_event.title + " is available from " + returnString;
		return returnString;
	}
	
	
	// check if the dates are equal
	function dateEquals(date1, date2){
		if (date1.getFullYear() == date2.getFullYear())
			if (date1.getMonth() == date2.getMonth())
				if (date1.getDate() == date2.getDate())
					return true;
		return false;
	}
	
	