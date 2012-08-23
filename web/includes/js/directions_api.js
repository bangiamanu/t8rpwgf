// JavaScript Document


function directions_api_ready(){
    if (internet_available){
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);	
    }
}

function directions_api_getDirectionHTML(cal_event){	
    var str = "";
	
    // setting previous and next events based on the current selected event
    var target_event = cal_event;
    var previous_event = calendar_helper_getPreviousEvent(cal_event);
    var next_event = calendar_helper_getNextEvent(cal_event);

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
    var previous_event = calendar_helper_getPreviousEvent(cal_event)
    var title = "";

    if (previous_event != null && previous_event.marker != null && cal_event != null && cal_event.marker != null){
        getWalkingTime(previous_event.marker.getPosition(), cal_event.marker.getPosition(), function (duration){
            if (duration.value < MAX_WALKING_MINUTES * 60){
                title = available_destinations[cal_event.available_destination_id].title +
                        " (" + duration.text + " walking)";
                calendar_helper_updateCalEventTitleAndBackground(cal_event, title);
            }
            else{
                getTransitTime(previous_event.marker.getPosition(), cal_event.marker.getPosition(), cal_event.start, function (duration){
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

function directions_api_addDailyDirections(cal_event){
    var markers = getMarkersByDay(cal_event);
    
    if (polyline!=null)
        polyline.setMap(null);
    polyline = new google.maps.Polyline({path:markers,strokeColor: "#36C",strokeOpacity: 0.6,strokeWeight: 3});
    polyline.setMap(map);
    
}

/**
 * returns an array of locations for all the markers on the day of the cal_event
 */
function getMarkersByDay(cal_event){
    var results = new Array();
    calendar_events = $('#calendar').weekCalendar("serializeEvents");
    calendar_helper_sortEvents(calendar_events);    

    for (var i in calendar_events){
        var evnt = calendar_events[i];
        if (calendar_helper_dateEquals(evnt.start, cal_event.start))
           results.push(evnt.marker.position)            
    }
    
    return results;
}


/***************** UNUSED CODE ***************/

/**
 * This function returns an array of all the markers in a given day for a calendar event 
 */
function getWaypointsForTheDay(cal_event){
    var eventsByDay = organiseEventsByDay();    
    var origin, waypoints = new Array(), destination;
    var results = {};

    for (var i in eventsByDay){
        if (calendar_helper_dateEquals(cal_event.start, eventsByDay[i].date)){
            for (var j in eventsByDay[i].cal_events){
                if (j==0){
                    origin = eventsByDay[i].cal_events[j].marker.position;
                }
                else if (j == (eventsByDay[i].cal_events.length - 1)){
                    destination = eventsByDay[i].cal_events[j].marker.position;
                }
                else{
                    waypoints.push({location:eventsByDay[i].cal_events[j].marker.position})
                }
            }
            results = {origin: origin, waypoints: waypoints, destination: destination};
            return results;
        }        
    }
    return null;
}


/**
 * returns a result array which is an array of
 * { origin, waypoints, destination }
 */
function organiseEventsByDay(){
    var days = new Array();
    for (var i=0;i<days_to_show;i++){
        days.push({date: new Date(calendar_start_date.getTime() + i * 24 * 60 * 60 * 1000), cal_events: new Array()})
    }
    
    calendar_events = $('#calendar').weekCalendar("serializeEvents");
    calendar_helper_sortEvents(calendar_events);    

    for (var i in calendar_events){
        for (var j in days){
            var evnt = calendar_events[i];
            if (calendar_helper_dateEquals(evnt.start, days[j].date))
                days[j].cal_events.push(evnt)            
        }
    }
    
    return days;
}


