/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 
 * This file contains all the global variables in one place
 */


// ********************** plannerv10**********************

// map variables
var map;
var geocoder;
var directionsService;
var london_lat;
var directionsDisplay;
var zoom_level = 13;

// temp marker that is changed everytime the selection is made
var current_marker;

// Denotes home
var home_marker;
var home_infoWindow;

// stores the active infowindow as there can be only one at a time
var current_infoWindow;

// current_destination_id is used for highlights. its the HTML id="" tag that also corrosponds to the id in the avialable_destinations array. usually a getElement() is called on the current_destination_id
var current_destination_id = null;

// showing_steps sets if overall guides are being shown
// individual showsteps are switches for individual steps
var showing_steps = false;
var current_step = "step1";

// CONSTANTS
var SMALL_IMAGE_SIZE;
var REMOVE_EVENT_ERROR;
var ADDRESS_NOT_FOUND;
var CALENDAR_EVENT_NOT_FOUND;
var NO_TIMESLOTS_AVAILABLE_ERROR;

//TODO Samir, what is this?
var emptycalendar = true;

// The main line connecting all the destinations
var polyline = null;


// ********************** calendar_helper **********************
// Constants
var TIMESLOTS_PER_HOUR = 2;
	
var dayofweek = new Date().getDay();

// calendar_events array holds events that are saved on the calendar. 
// this is linked to the internal calendar array and is automagically updated by the JQuery component
var calendar_events;
var selected_calendar_event_id;

// global variable that says if tracking is turned on
var tracking = true;


// ********************** calendar_and_map_api **********************
var TIMESLOT_LENGTH;


// ********************** directions api**********************
var NO_EVENTS_FOR_DIRECTIONS_ERROR = "You don't have anything else planned on this day. Please add more activities to get directions. Coming soon! Directions from your hotel!";
var DIRECTIONS_NOT_FOUND_ERROR = "Couldnt plot directions. Please email us at error@tripbrush.com with a screenshot. Apologies for the inconvenience."


var LOAD_ADDRESS_ERROR = "An error occurred while loading an event. It seems that the address cannot be found. Please email us at error@tripbrush.com with a screenshot. Apologies for the inconvenience."

// when drag and drop is performed on the calendar, this array holds the events that need to be refreshed
// its an array of calendar_events
var events_to_be_refreshed;

function global_variables_ready(){
    
    current_destination_id = null;
    
    showing_steps = false;
    current_step = "step1";
    
    SMALL_IMAGE_SIZE = 62;
    REMOVE_EVENT_ERROR = "Couldnt find event on the map. Please contact support@tripbrush.com with a screenshot. Apologies for the inconvenience."
    ADDRESS_NOT_FOUND = "Could not find the indicated address. Please make sure you are connected to the internet. If you are connected, please contact support@tripbrush.com with a screenshot. Apologies for the inconvenience."
    CALENDAR_EVENT_NOT_FOUND = "Couldnt find destination in calendar. Please contact support@tripbrush.com with a screenshot. Apologies for the inconvenience."
    NO_TIMESLOTS_AVAILABLE_ERROR = "This place is not open during your visit. If you believe this is in error, please email a screenshot to error@tripbrush.com";


    TIMESLOTS_PER_HOUR = 2;

    dayofweek = new Date(calendar_start_date).getDay();

    calendar_events = new Array();
    selected_calendar_event_id = "";
    
    TIMESLOT_LENGTH = 90;

    events_to_be_refreshed = new Array();

    console.log("Global variables initialised")
}

function clearAllDialogs(){
    $(".white_dialog").fadeOut();
    $("#white_out").fadeOut();
}

