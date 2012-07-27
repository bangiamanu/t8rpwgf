
function getElement(name) {
    return document.getElementById(name);
}

// db: database id (-1 means its a new event that hasnt been added yet to the database)
// timeslot is javascript timeslot
function addEvent(destination_id){
    //tracking code
    _gaq.push(['_trackEvent', 'Map', 'Add', available_destinations[destination_id].title]);
   
    emptycalendar = false;

    var timeslot = findFirstOpenSlot(destination_id);
    
    if (timeslot != false){
        // add it to calendar and map
        calendar_and_map_api_addEventToCalendarAndMap(-1,destination_id,timeslot);

	// Move onto next guide
	if (showing_steps && current_step == "step3"){
		current_step = "step4";
		refreshSteps();
	}        

        // select it on calendar. remove temp from map and add permanent
        var cal_event = calendar_helper_getCalendarEventFromDestinationId(destination_id);
        calendar_and_map_api_selectEventOnCalendar(cal_event);
        clearMapSelection();
        calendar_and_map_api_selectEventOnMap(cal_event);

        // Add event to database
        backend_add_event_to_database(cal_event);


        // grey out destination and clear list
        list_api_greyOutDestination(destination_id);
        list_api_clearListSelection();
        
    }
}

// deletes event as denoted by cal_event_id
// if db is true, its also deleted from the database
function deleteEvent(cal_event_id, db){
    // ungrey destination on list
    var cal_event = calendar_helper_getCalendarEvent(cal_event_id);
    
    //tracking code
    _gaq.push(['_trackEvent', 'Map', 'Delete', cal_event.title]);
    
    list_api_unGreyDestination(cal_event.available_destination_id);

    // and remove it from calendar and map
    calendar_and_map_api_removeEventFromCalendarAndMap(cal_event);

    // if its a hard delete, remove it from the database
    if (db)
        backend_delete_event_from_database(cal_event);

    // clear map and list
    list_api_clearListSelection();
    clearInfoWindow();
}


/************************* Selection changed code *************************/
// these functions are called when changes happen on either list or calendar or map

/* accepts an id from the destinations array and does the following
  - sets current_destination and current_marker
  - add destination to map
  - updates details panel
*/
function destination_selected_from_list(destination_id){
    //tracking code
    _gaq.push(['_trackEvent', 'Destinations_list', 'Click', available_destinations[destination_id].title]);
    show_loading();
    
    list_api_selectDestinationOnList(destination_id);

    if (calendar_helper_isPlanned(destination_id)){
        var cal_event = calendar_helper_getCalendarEventFromDestinationId(destination_id);
        calendar_and_map_api_selectEventOnCalendar(cal_event);
        calendar_and_map_api_selectEventOnMap(cal_event);
        hide_loading();        
    }
    else{
        calendar_and_map_api_addTemporaryEventToMap(destination_id);
        calendar_and_map_api_clearCalendarSelection();
    }
}

/*
        a selection was made on the map (i.e., a marker was selected)
*/
function event_selected_from_map(evnt){
    // As we only get the latLng object from the event, we have to find the calendar event.
    for (var i in calendar_events){
        var cal_event = calendar_events[i];
        if (cal_event.marker.position.equals(evnt.latLng)){
            //tracking code
            _gaq.push(['_trackEvent', 'Map', 'Click', cal_event.title]);

            calendar_and_map_api_selectEventOnCalendar(cal_event);
            calendar_and_map_api_selectEventOnMap(cal_event);
            list_api_selectDestinationOnList(cal_event.available_destination_id);
            return;
        }
    }
    alert (CALENDAR_EVENT_NOT_FOUND);
}

/*
        a selection was made on the calendar (i.e., an event was selected)
*/
function destination_selected_from_calendar(cal_event){
    //tracking code
    _gaq.push(['_trackEvent', 'Calendar', 'Click', cal_event.title]);

    calendar_and_map_api_selectEventOnCalendar(cal_event);
    calendar_and_map_api_selectEventOnMap(cal_event);

    list_api_selectDestinationOnList(cal_event.available_destination_id);
}


/*
        the temporary marker was selected on the map
*/
function temporary_event_selected_from_map(evnt){
    // As we only get the latLng object from the event, we have to find the calendar event.
    for (var i in available_destinations){
        var available_destination = available_destinations[i];
        if (available_destination.marker != null){
            if (available_destination.marker.position.equals(evnt.latLng)){
                calendar_and_map_api_updateCurrentInfoWindow(available_destinations[i].id, current_marker);
                calendar_and_map_api_clearCalendarSelection();
                list_api_selectDestinationOnList(available_destinations[i].id);
                return;
            }
        }
    }
    alert (CALENDAR_EVENT_NOT_FOUND);
}




/********************** Google maps helpers **********************/

function initGoogleMaps() {
    london_lat  = new google.maps.LatLng(51.504041, -0.112953);
	var myOptions = {
        zoom: 8,
        center: london_lat,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
}


/********************** Debug code **********************/
function showDebug(str){
	getElement("debug").innerHTML += str;
}



function URLDecode(psEncodeString)
{
  // Create a regular expression to search all +s in the string
  var lsRegExp = /\+/g;
  // Return the decoded string
  return unescape(String(psEncodeString).replace(lsRegExp, " "));
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
