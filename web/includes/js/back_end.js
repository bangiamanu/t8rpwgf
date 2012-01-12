// JavaScript Document
/*

Places to update code
- here
- 


*/
var saved_trips = new Array(); // contains previously saved trips
var user_first_name = "" //user's first name
var days_to_show = 0; // length of calendar
var calendar_start_date = new Date();

function backend_ready(){
	backend_loadCategories();
	backend_loadAvailableDestinations();
	backend_populateSavedTrips();
	
	user_first_name = "Manu" // replace this function with backend code
	days_to_show = 4; // replace this function with backend code
	calendar_start_date = new Date(); // replace this function with backend code

	$("#user_first_name").append(user_first_name);
	
	calendar_helper_populateCalendar();	
}

// populates the categories array - called on document.ready
function backend_loadCategories(){
	data_loader_loadCategories(); // replace this function with backend code
	populateCategories();
}

// populates the available_destinations array - called on document.ready
function backend_loadAvailableDestinations(){
	data_loader_loadAvailableDestinations(); // replace this function with backend code
	list_api_setCategoryHighlight(getElement("all"));
}

// called when user clicks signin
function backend_signIn(){
	$(".signed_in_or_out").toggle(); // this changes the toolbar from signed out to signed in and vice versa.
	backend_populateSavedTrips();
}

// called when user clicks signup
function backend_signUp(){

}

function backed_forgotPassword(){
	
}

// called when user clicks signin and is supposed to populate the saved_trips array
function backend_populateSavedTrips(){
	// populate the saved_trips array
	
	saved_trips[0] = {name:"Untitled1", city:"London", start_date: new Date(), end_date: new Date()};
	saved_trips[1] = {name:"Untitled2", city:"Barcelona", start_date: new Date(), end_date: new Date()};
	saved_trips[2] = {name:"Untitled3", city:"Prague", start_date: new Date(), end_date: new Date()};
	
	acct_management_createSavedTripsBox();
}

function backend_logOut(){
	$(".signed_in_or_out").toggle();	
}