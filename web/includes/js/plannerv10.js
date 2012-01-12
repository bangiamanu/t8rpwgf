// map variables
var map;
var geocoder;
var directionsService;
var london_lat;
var directionsDisplay;
var zoom_level = 13;

// temp marker that is changed everytime the selection is made
var current_marker;

// stores the active infowindow as there can be only one at a time
var current_infoWindow;

// current_destination_id is used for highlights. its the HTML id="" tag that also corrosponds to the id in the avialable_destinations array. usually a getElement() is called on the current_destination_id
var current_destination_id = null;

// showing_steps sets if overall guides are being shown
// individual showsteps are switches for individual steps
var showing_steps = false;
var current_step = "step1";

// CONSTANTS
var SMALL_IMAGE_SIZE = 62;
var REMOVE_EVENT_ERROR = "Couldnt find event on the map. Please contact support@tripbrush.com with a screenshot. Apologies for the inconvenience."
var ADDRESS_NOT_FOUND = "Could not find the indicated address. Please make sure you are connected to the internet. If you are connected, please contact support@tripbrush.com with a screenshot. Apologies for the inconvenience."
var CALENDAR_EVENT_NOT_FOUND = "Couldnt find destination in calendar. Please contact support@tripbrush.com with a screenshot. Apologies for the inconvenience."
var NO_TIMESLOTS_AVILABLE_ERROR = "No timeslots available. Please free up your calendar. If you believe this is in error, please contact support@tripbrush.com with a screenshot.";


function getElement(name) {
    return document.getElementById(name);
}


function clearAllDialogs(){
	$(".white_dialog").fadeOut();
	$("#white_out").fadeOut();
}


// adds event as denoted by destination_id 
function addEvent(destination_id){
	// add it to calendar and map
	calendar_and_map_api_addEventToCalendarAndMap(destination_id);

	// select it on calendar. remove temp from map and add permanent
	var cal_event_id = getCalendarEventId(destination_id);
	calendar_and_map_api_selectEventOnCalendar(cal_event.id);
	clearMapSelection();	
	calendar_and_map_api_selectEventOnMap(cal_event.id);
	
	// grey out destination and clear list
	list_api_greyOutDestination(destination_id);
	list_api_clearListSelection();
	
	// Move onto next guide
	if (showing_steps && current_step == "step3"){
		current_step = "step4";
		refreshSteps();
	}
}

// deletes event as denoted by cal_event_id 
function deleteEvent(cal_event_id){
	// ungrey destination on list
	cal_event = getCalendarEvent(cal_event_id);
	list_api_unGreyDestination(cal_event.available_destination_id);

	// and remove it from calendar and map
	calendar_and_map_api_removeEventFromCalendarAndMap(cal_event_id);
	
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
		list_api_selectDestinationOnList(destination_id);		

		if (calendar_helper_isPlanned(destination_id)){
			var cal_event_id;

			try{
				cal_event_id = getCalendarEventId(destination_id);
			}
			catch(err){
				alert(REMOVE_EVENT_ERROR);
			}
						
			calendar_and_map_api_selectEventOnCalendar(cal_event_id);
			calendar_and_map_api_selectEventOnMap(cal_event_id);
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
				calendar_and_map_api_selectEventOnCalendar(cal_event.id);
				calendar_and_map_api_selectEventOnMap(cal_event.id);
				list_api_selectDestinationOnList(cal_event.available_destination_id);
				return;
			}
		}
		alert (CALENDAR_EVENT_NOT_FOUND);
	}

	/* 
		a selection was made on the calendar (i.e., an event was selected)
	*/
	function destination_selected_from_calendar(cal_event_id){
		calendar_and_map_api_selectEventOnCalendar(cal_event_id);
		calendar_and_map_api_selectEventOnMap(cal_event_id);
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



/********************** Population code **********************/
// Accepts catgory as string (e.g., "theatre") and populates the destinations list based on that category
function populateDestinations(category){
	var destinations_list = getElement("destinations_list");
	var str = "";
	for (var i=0; i<available_destinations.length;i++){
		evnt = available_destinations[i];
		if (evnt.category.toString() == category.toString() || category.toString() == "all"){
				str += "<li id='" + evnt.id + "' onmouseover='list_api_highlightDestination(" + evnt.id +")' onmouseout='list_api_removeDestinationHighlight(" + evnt.id + ")' onclick='destination_selected_from_list(" + evnt.id +")'>";
				str += "<p class='destinationtitle'>"+ evnt.title +"</p>";
				str += "<img src='" + evnt.image_file_name_small +"' width='" + SMALL_IMAGE_SIZE + "' height='" + SMALL_IMAGE_SIZE + "' />";
				str += "<p class='destinationdescription'>" + evnt.description_short + " "
				str += "</li>";
		}
	}
	destinations_list.innerHTML  = str;	
}

function populateCategories(){
	var category_list = getElement("categories_list");
	var str = "";
	for (var i=0; i<categories.length;i++){
		cat = categories[i];
		str += "<li onmouseover='list_api_highlightCategory(this)' onmouseout='list_api_removeCategoryHighlight(this)' onclick='list_api_setCategoryHighlight(this)' id='" + cat.name + "' class='category'>";		
		str += "<img src='" + cat.image_file_name + "' class='category_icon'/>"
		str += "<p>" + cat.title + "</p>";
		str += "</li><!-- category -->"
	}	
	category_list.innerHTML = str;	
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


/********************** Tutorial code **********************/
function showElement(name) {
    getElement(name).style.display = 'block';
}

function hideElement(name) {
    getElement(name).style.display = 'none';
}

function refreshSteps(){
	if (showing_steps){
		
		hideAllSteps();
		
		if (current_step == "step1"){
			showElement('guidebox1');
			showElement('guidebox1text');
		}

		if (current_step == "step2"){
			showElement('guidebox2');
			showElement('guidebox2text');
		}

		if (current_step == "step3"){
			showElement('guidebox3');
			showElement('guidebox3text');
		}

		if (current_step == "step4"){
			showElement('guidebox4text');
		}
	}
}

function hideAllSteps(){
	hideElement('guidebox1');
	hideElement('guidebox1text');
	hideElement('guidebox2');
	hideElement('guidebox2text');
	hideElement('guidebox3');
	hideElement('guidebox3text');
	hideElement('guidebox4text');	
}

function endTutorial(){
	current_step = "none";	
	refreshSteps();	
	showing_steps = false;
}

function startTutorial(){
	showing_steps = true;
	current_step = "step1";
	refreshSteps();
}

