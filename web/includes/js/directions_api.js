// JavaScript Document


function directions_api_ready(){
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);	
}

function directions_api_getDirectionHTML(cal_event_id){	
    var str = "";
	
    // setting previous and next events based on the current selected event
    var target_event = calendar_helper_getCalendarEvent(cal_event_id);
    var previous_event = calendar_helper_getPreviousEvent(cal_event_id);
    var next_event = calendar_helper_getNextEvent(cal_event_id);

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

/*
 * Shows directions between cal_event_id1 and cal_event_id2 on the map
 * Closes current infowindow
 */
function directions_api_getDirections(cal_event_id1, cal_event_id2){	
    var event1 = calendar_helper_getCalendarEvent(cal_event_id1);
    var event2 = calendar_helper_getCalendarEvent(cal_event_id2);
    directions_cache_showDirections(event1.marker.getPosition(), event2.marker.getPosition());

    calendar_and_map_api_closeCurrentInfoWindow();
}

/*
 * changes the title of supplied cal_event_id to the travel time required to get there
 * if no previous event, title is preserved
 */
function directions_api_addTravelTimeToTitle(cal_event){
    var previous_event = calendar_helper_getPreviousEvent(cal_event.id)
    var title = "";

    if (previous_event != null && previous_event.marker != null && cal_event != null && cal_event.marker != null){
        getWalkingTime(previous_event.marker.getPosition(), cal_event.marker.getPosition(), function (duration){
            if (duration.value < MAX_WALKING_MINUTES * 60){
                title = available_destinations[cal_event.available_destination_id].title +
                        " (" + duration.text + " walking)";
                calendar_helper_updateCalEventTitleAndBackground(cal_event, title);
            }
            else{
                getDrivingTime(previous_event.marker.getPosition(), cal_event.marker.getPosition(), function (duration){
                title = available_destinations[cal_event.available_destination_id].title +
                        " (~" + duration.text + " by public transport)";
                calendar_helper_updateCalEventTitleAndBackground(cal_event, title);
                });
            }
        });
    }
    else{
        calendar_helper_updateCalEventTitleAndBackground(cal_event, available_destinations[cal_event.available_destination_id].title);
    }
}