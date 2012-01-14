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

var categories = new Array();
var available_destinations = new Array();

function backend_ready(){
	backend_loadCategories();
	//backend_loadAvailableDestinations();
	//backend_populateSavedTrips();
	
	user_first_name = "Manu" // replace this function with backend code
	days_to_show = $("#howlong").val(); // replace this function with backend code

        var startDateField = $("#fromdate").val().split("/");
        calendar_start_date = new Date(startDateField[2],startDateField[1]-1,startDateField[0]);

	$("#user_first_name").append(user_first_name);
	
		
}

// populates the categories array - called on document.ready
function backend_loadCategories(){
    //data_loader_loadCategories(); // replace this function with backend code
    var params = "command=loadCategory";
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: loadCategoryData
    });
}

function loadCategoryData(xml) {

    counter = 0;
    $(xml).find("category").each(function() {
        var id = $(this).attr("id");
        var name= $(this).find("name").text();
        var title = $(this).find("title").text();
        var imagef = $(this).find("imagefile").text();
        categories[counter] = {
            id: id,
            name: name,
            title: title,
            image_file_name: "includes/images/"+ imagef
        };
        counter++;
    });
    populateCategories();
    backend_loadAvailableDestinations();
}


function loadAvailableDestinations(){
    var params = "command=getAttractions&fromdate="+escape($("#fromdate").val())+"&howlong="+$("#howlong").val()+"&destination="+$("#destination").val();
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: loadAvailableDestinationsData
    });
}

function loadAvailableDestinationsData(xml) {
    counter = 0;
    $(xml).find("attraction").each(function() {


        var id = $(this).attr("id");
        var aid = $(this).attr("aid");
        var category= $(this).find("category").text();
        var title= $(this).find("title").text();
        var description_short= $(this).find("description_short").text();
        var description_long= $(this).find("description_long").text();
        var image_file_name_small= $(this).find("image_file_name_small").text();
        var image_file_name_large= $(this).find("image_file_name_large").text();
        var wikipedia_url= $(this).find("wikipedia_url").text();
        var postcode= $(this).find("postcode").text();

        var links = new Array();
        linkcounter = 0;

        $(this).find("link").each(function() {
            var name= $(this).attr("name");
            var url= $(this).attr("url");
            links[linkcounter] = { name: name, url: url };
            linkcounter++;
        });

        var openingtimes = new Array();
        opencounter = 0;

        $(this).find("open").each(function() {
            var fromy = $(this).attr("fromy");
            var fromm = $(this).attr("fromm");
            var fromd = $(this).attr("fromd");
            var fromh = $(this).attr("fromh");
            var fromn = $(this).attr("fromn");

            var toy = $(this).attr("toy");
            var tom = $(this).attr("tom");
            var tod = $(this).attr("tod");
            var toh = $(this).attr("toh");
            var ton = $(this).attr("ton");

            openingtimes[opencounter] = {start:new Date(fromy, fromm, fromd, fromh, fromn), end:new Date(toy, tom, tod, toh, ton)};
            opencounter++;
        });

        available_destinations[id] = {
            aid: aid,
            id:id,
            category: category,
            title: title,
            description_short: description_short,
            description_long: description_long,
            image_file_name_small: "includes/images/data/" + image_file_name_small,
            image_file_name_large: "includes/images/data/" +image_file_name_large,
            wikipedia_url: wikipedia_url,
            other_links: links,
            opening_hours: openingtimes,
            postcode: postcode
        };
        counter++;
    });
    list_api_setCategoryHighlight(getElement("all"));
    calendar_helper_populateCalendar();
}


// populates the available_destinations array - called on document.ready
function backend_loadAvailableDestinations(){
	loadAvailableDestinations(); // replace this function with backend code
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