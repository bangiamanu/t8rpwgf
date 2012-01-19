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
	// this is linked to the internal calendar array and is automagically updated by the JQuery component
	var calendar_events = new Array();
	var selected_calendar_event_id;


	function populateCalendar(){
	
		// Event listeners for calendar and intiialize calendar
		$(document).ready(function() {
	
			$('#calendar').weekCalendar({
				timeslotsPerHour: TIMESLOTS_PER_HOUR,
				daysToShow: 4,
				firstDayOfWeek: dayofweek,
				buttons: false,
				allowEventCreation: false,
				businessHours: {start: 8, end: 24, limitDisplay: true},
				height: function($calendar){
					return window.innerHeight - 0.45*window.innerHeight - 80;
				},
				eventRender : function(calEvent, $event) {
					if (calEvent.id !=null){
                                            calendar_events[calEvent.id] = calEvent;
                                            calEvent.event_dom_handler = $event;
                                            checkEvent(calEvent, $event);
                                            set_event_backgrounds();
					}
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
					set_event_backgrounds();
				},
				eventClick : function(calEvent, $event) {
                                    
					select_event_on_calendar(calEvent.id);
					select_event_on_map(calEvent.id);
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
		});
	}
	
	function set_event_backgrounds(){
		for (var i in calendar_events){
			var calEvent = calendar_events[i];
			var event_dom_handler = calEvent.event_dom_handler;
			if (event_dom_handler != null){
				
				// mark selected as blue
				if (calEvent.id != selected_calendar_event_id){
					// if not selected event
					event_dom_handler.css("backgroundColor","#eee");
					event_dom_handler.css("border","solid 1px #36c");						
					event_dom_handler.css("color","black");						
				}
				else{
					// if not selected event
					event_dom_handler.css("backgroundColor","#86b3e0");
					event_dom_handler.css("border","solid 1px #36c");						
					event_dom_handler.css("color","black");						
				}
				
				// mark errors as red				
				if (calEvent.is_valid){				
					// if not error
					calEvent.title = available_destinations[calEvent.available_event_id].title;					
				}
				else{
					// if error
					event_dom_handler.css("backgroundColor", "red");
					event_dom_handler.css("border","solid 1px #36c");						
					event_dom_handler.css("color", "white");
					calEvent.title = openingHoursToString(calEvent.available_event_id, calEvent.start);
				}
			}
		}
	}
	
	// accepts id from the available_destinations array and returns true if it exists on the calendar
	function isPlanned(destination_id){
		for (var i in calendar_events){
			cal_event = calendar_events[i]
			if (cal_event.available_event_id == destination_id)
				return true;
		}
		return false;
	}

	
	function checkEvent(calEvent, $event){
		calEvent.is_valid = isValid(calEvent)
	}
	

	function addEvent(event_id){
		add_event_to_calendar_and_map(event_id);
		
		
		//refreshing so add becomes delete
		//select_destination_from_list(event_id);
		
		// Move onto next guide
		if (showing_steps && current_step == "step3"){
			current_step = "step4";
			refreshSteps();
		}
	}
	
	// deletes event as denoted by cal_event_id in calendar_events array
	function deleteEvent(cal_event_id){
		// remove it from calendar and map
		remove_event_from_calendar_and_map(cal_event_id);
		


		//refreshing so add buttons become remove buttons
		//select_destination_from_list(destination_id);
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
	
	
	// check if the dates are equal
	function dateEquals(date1, date2){
		if (date1.getFullYear() == date2.getFullYear())
			if (date1.getMonth() == date2.getMonth())
				if (date1.getDate() == date2.getDate())
					return true;
		return false;
	}
	
	