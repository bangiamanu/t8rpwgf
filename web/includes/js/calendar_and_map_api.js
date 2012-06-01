// JavaScript Document

// Constants
var TIMESLOT_LENGTH = 90;


/********************** Maps and Calendar API **********************/

function calendar_and_map_api_ready(){
	initGoogleMaps();
	
}


function calendar_and_map_api_addEventToCalendarAndMap(db_id,destination_id,open_slot){
		event_to_add = available_destinations[destination_id];
		
            	// creating the calendar event
		cal_destination_id = "C" + destination_id;		
		var cal_event =  {eid: db_id,
                    id:cal_destination_id, 
     					start: open_slot.start, 
							end: open_slot.end,
							title:event_to_add.title,
							available_destination_id: destination_id,
							marker:null,
							event_dom_handler:null,
							is_valid: true};


		//Adding to calendar 
		$('#calendar').weekCalendar("updateEvent", cal_event);
		calendar_events = $('#calendar').weekCalendar("serializeEvents");	

		// Creating a new permanent marker (cloning current_marker and adding new icon)
		var perm_marker = new google.maps.Marker({
							map: event_to_add.marker.getMap(),
							position: event_to_add.marker.getPosition(),
							icon: 'includes/images/marker_small_dark_blue_white.png',
							zIndex: 1000 + calendar_events.length
						});
						
		// Creating a click function for the marker
		google.maps.event.addListener(perm_marker, 'click', event_selected_from_map);		
		
		//Changing pointer in calendar_events to permanent marker
		cal_event.marker = perm_marker;
}

// accepts cal_event_id id from calendar_events array and removes it fron both calendar and map
function calendar_and_map_api_removeEventFromCalendarAndMap(cal_event_id){
	if (cal_event_id != null)
	{
		calendar_events = $('#calendar').weekCalendar("serializeEvents");			
		cal_event = calendar_helper_getCalendarEvent(cal_event_id);

		// delete permanent marker from the map
		cal_event.marker.setMap(null);

		// then delete event from calendar
		$('#calendar').weekCalendar("removeEvent", cal_event_id);
		calendar_events = $('#calendar').weekCalendar("serializeEvents");
	}
	else{
		alert(REMOVE_EVENT_ERROR);
	}
}

// adds temporary destination to map with marker and infowindow
// takes destination_id from the available_destinations array
// updates current_marker
function calendar_and_map_api_addTemporaryEventToMap(destination_id){
	var temporary_destination = available_destinations[destination_id];
	
	// Geocoding
	geocoder.geocode( {
		'address': temporary_destination.postcode +",UK"
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			myLatlng = results[0].geometry.location;
			if (current_marker!=null) {
				current_marker.setMap(null);
			}
			
			// Create current_marker
			current_marker = new google.maps.Marker({
				map: map,
				position: myLatlng
			});				
			
			// center and zoom map
			//map.setCenter(current_marker.position);
			map.setZoom(zoom_level);
			google.maps.event.addListener(current_marker, 'click', temporary_event_selected_from_map);
						
			// store market (in case its added permanently)
			temporary_destination.marker = current_marker;

			// Create infowindow and open it on current marker
			calendar_and_map_api_updateCurrentInfoWindow(temporary_destination.id, current_marker);
		}
		else{
			alert(ADDRESS_NOT_FOUND);
		}
	});
}

// refresh current_infowindow for given destination id and marker
function calendar_and_map_api_updateCurrentInfoWindow(destination_id, marker){
	if (current_infoWindow != null){
		current_infoWindow.close();
	}
	current_infoWindow = getInfoWindow(destination_id);
	current_infoWindow.open(map, marker);
	current_infoWindow.setPosition(marker.position);	
}

// refresh current_infowindow for given destination id and marker
function calendar_and_map_api_closeCurrentInfoWindow(){
	if (current_infoWindow != null){
		current_infoWindow.close();
	}
}

// simply refreshes the current info window
function calendar_and_map_api_refreshCurrentInfoWindow(){
	if (current_infoWindow != null){
		for (var i in available_destinations){
			var destination = available_destinations[i];
			if (destination.marker != null){
				if (current_infoWindow.getPosition().equals(destination.marker.position)){
					current_infoWindow.close();
					current_infoWindow = getInfoWindow(destination.id);
					current_infoWindow.open(map, destination.marker);
					current_infoWindow.setPosition(destination.marker.position);	
					return;
				}
			}
		}
	}
}

// accepts an id from the array calendar_events and selects that event on the calendar
function calendar_and_map_api_selectEventOnCalendar(cal_event_id){
	selected_calendar_event_id = cal_event_id;
    calendar_helper_refreshEvents();
}

// accepts an id from the array calendar_events and selects it on the map
function calendar_and_map_api_selectEventOnMap(cal_event_id){
	var cal_event = calendar_helper_getCalendarEvent(cal_event_id);
	calendar_and_map_api_updateCurrentInfoWindow(cal_event.available_destination_id, cal_event.marker);	
}

// clears calendar selection
function calendar_and_map_api_clearCalendarSelection(){
	selected_calendar_event_id = "";
    calendar_helper_refreshEvents();
}


/*************************** private functions (shouldnt be called outside this file) **********************************/

// clears calendar selection
function clearMapSelection(){
	if (current_infoWindow != null){
		current_infoWindow.close();
	}
	if (current_marker!=null) {
		current_marker.setMap(null);
	}
}

function clearInfoWindow(){
	if (current_infoWindow != null){
		current_infoWindow.close();
	}		
}

/* 
	returns an InfoWindow object built from destination_id which is an id in the available_destinations array
*/
function getInfoWindow(destination_id){		
	var dest = available_destinations[destination_id];
	var cal_event_id;
	
	//setup infowindow
	var content_string = "<table><tr> <td><img src='" + dest.image_file_name_small.substring(0,dest .image_file_name_small.length - 4) + "co.jpg' /></td><td>&nbsp;</td><td valign=top align=left><span style='font-weight:bold; text-align:left;'>" + dest.title + "</span><br/><br/>"
	content_string += "<table cellspacing=0 cellpadding=2 valign=top>"
	
	// add or remove to calendar
	if (calendar_helper_isPlanned(dest.id)){
		cal_event_id = calendar_helper_getCalendarEventId(dest.id);
		content_string += "<tr><td><img src='includes/images/removefromitinerary.png' /></td><td valign=middle><a href='#' onclick='deleteEvent(\"" + cal_event_id +"\",true)'>Remove</a></td></tr>"				
	}
	else{
		content_string += "<tr><td><img src='includes/images/addtoitinerary.png' /></td><td valign=middle><a href='#' onclick='addEvent(" + dest.id +")'>Add to itinerary</a></td></tr>"				
	}
	
	// More information
	if (!is_contracted)
		content_string += "<tr><td><img src='includes/images/moreinformation.png' /></td><td valign=middle><a href='#' onclick='sizing_contract()'>More information</a></td></tr>"
	else
		content_string += "<tr><td><img src='includes/images/lessinformation.png' /></td><td valign=middle><a href='#' onclick='sizing_expand()'>Less information</a></td></tr>"
	

	// Directions
	if (calendar_helper_isPlanned(dest.id))
		content_string += directions_api_getDirectionHTML(cal_event_id);

	content_string += "</table>"
	content_string += "</td></tr></table>";
	
	infowindow = new google.maps.InfoWindow({
	  content: content_string
	});
	
	return infowindow;		
}


/*********************** Private - not (shouldn't be) used outside this js *******************************/

// returns the start date time object of first available two hours
function findFirstOpenSlot(destination_id){
	var available_event = available_destinations[destination_id];
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
	
	alert(NO_TIMESLOTS_AVAILABLE_ERROR);
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

function deleteAllEvent(db) {
     length = calendar_events.length;
	for (i=0;i<length;i++){
		var cal_event = calendar_events[0];
                deleteEvent(cal_event.id,db);
	}    
}

