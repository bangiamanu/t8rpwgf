var map;
var geocoder;
var marker;
var directionsService;
var london_lat;
var directionsDisplay;

var local = true;

// selected_destination_id is the selected destination
var selected_destination_id = "";

// showing_steps sets if overall guides are being shown
// individual showsteps are switches for individual steps
var showing_steps = true;
var current_step = "step1";

// CONSTANTS
var SMALL_IMAGE_SIZE = 62;


/********************** Population code **********************/
// Accepts catgory as string (e.g., "theatre") and populates the destinations list based on that category
function populateDestinations(category){
	var destinations_list = getElement("destinations_list");
	var str = "";
	for (var i=0; i<available_destinations.length;i++){
		evnt = available_destinations[i];
                
		if (evnt.category.toString() == category.toString() || category.toString() == "all"){
				str += "<li id='" + evnt.id + "' onmouseover='highlightDestination(this)' onmouseout='removeDestinationHighlight(this)' onclick='setDestinationHighlight(this)'>";
				str += "<p class='destinationtitle'>"+ evnt.title +"</p>";
				str += "<img src='includes/images/data/" + evnt.image_file_name_small +"' width='" + SMALL_IMAGE_SIZE + "' height='" + SMALL_IMAGE_SIZE + "' />";
				str += "<p class='destinationdescription'>" + evnt.description_short + " (<a href='#' onclick='addEvent(" + evnt.id +")'>Add>></a>)</p>"
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
		str += "<div onmouseover='highlightCategory(this)' onmouseout='removeCategoryHighlight(this)' onclick='setCategoryHighlight(this)' id='" + cat.name + "' class='category'>";		
		str += "<div class='text'>";
		str += "<p>" + cat.title + "</p>";
		str += "</div><!-- text -->";
		str += "<div class='image'>";
		str += "<img src='" + cat.image_file_name + "' width='65' height='52'/>"
		str += "</div><!-- image -->"
		str += "</div><!-- category -->"
		str += "<div id='divider'></div>"
	}	
	category_list.innerHTML = str;	
}

/************************* Detail tabs code *************************/
// accepts an id from the destinations array.
	function updateDetailTabs(destination_id){
		destination = available_destinations[destination_id];
		
		// Update map
                if (!local) {
                    addMarker(destination.postcode, destination.title);
                }
		
		// Update description tab
		var str = "";
		str += "<h3 style='float:left'>" + destination.title + " (<a href='#' onclick='addEvent(" + destination.id +")'>Add</a>)</h3><br/><br/><br/>";
		str += "<img id='large_image' src='includes/images/data/" + destination.image_file_name_large + "' style='float:right;margin:0px 10px;' />";
		str += "<p>" + destination.description_long + "</p>";
		getElement("destination_description").innerHTML = str;
		
		// Update pictures tab
		// TODO
		
		// Update opening hours
                var hours = "";
                hours = "<p>This attraction is open during the following times:</p>";
                hours+="<br/>";
		for (i in destination.opening_hours){
                    hour = destination.opening_hours[i];
                    var month = hour.start.getMonth() + 1;
                    var day = hour.start.getDate();
                    var year = hour.start.getFullYear();

                    var shour = hour.start.getHours();
                    var smin = hour.start.getMinutes();

                    var ehour = hour.end.getHours();
                    var emin = hour.end.getMinutes();

                    hours+="<p>"+day+"/"+month+"/"+year+" " +pad(shour)+":"+pad(smin)+"-"+pad(ehour)+":"+pad(emin)+"</p>";
		}

                getElement("destination_hours").innerHTML = hours;
		
		// Update links tab
		str = "";
		str += "<p> You can find more information at: (Links open in new windows)</p>";
		str += "<ul>";
		for (var i=0; i<destination.other_links.length;i++){
			lnk = destination.other_links[i];
			str += "<li><a href='" + lnk.url + "' target='_blank'>" + lnk.name + "</li>";
		}
		str += "</ul>"
		getElement("destination_external_links").innerHTML = str;
		
		divsResize();
	}

function pad(input) {
    if (input<10) return "0"+input;
    return input;
}


/********************** Destination highlight code **********************/

//onmouseover
function highlightDestination(destination){
	//showDebug("OnMouseOver for: " + destination.id + " ");
	destination.style.backgroundImage="url(includes/images/destinationhighlight.jpg)";
	var filename_length = destination.childNodes[1].src.length;
	
	imagename = destination.childNodes[1].src.substring(0,filename_length - 4);
	imageextension = destination.childNodes[1].src.substring(filename_length - 6, filename_length);
	
	if (imageextension != "co.jpg"){	
		destination.childNodes[1].src = imagename + "co.jpg";
	}
}

//onmouseout
function removeDestinationHighlight(destination){
	//showDebug("OnMouseOut for: " + destination.id + " ");
	if (selected_destination_id != destination.id){
		destination.style.backgroundImage = null;
		var filename_length = destination.childNodes[1].src.length;
	
		imagename = destination.childNodes[1].src.substring(0,filename_length - 4);
		imageextension = destination.childNodes[1].src.substring(filename_length - 6, filename_length);
			
		if (imageextension == "co.jpg"){	
			destination.childNodes[1].src = imagename.substring(0, imagename.length-2) + ".jpg";
		}	
	}
}

//onclick
// Takes an HTMl div as an inpout with the same id as one in available_destinations array
function setDestinationHighlight(clickeddestination){
		last_selected_destination = getElement(selected_destination_id);
		
		if (clickeddestination != null)
			if (selected_destination_id != clickeddestination.id){
				highlightDestination(clickeddestination);
				updateDetailTabs(clickeddestination.id);
				selected_destination_id = clickeddestination.id;
				// if nothing is previously selected, dont remove the highlight
				if (last_selected_destination != null)
						removeDestinationHighlight(last_selected_destination);
			}
			
	// Move onto next guide
	if (showing_steps && current_step == "step2"){
		current_step = "step3";
		refreshSteps();
	}
}

/************************* category highlight code *************************/

function getElement(name) {
    return document.getElementById(name);
}

//onmouseover
function highlightCategory(el){
	el.style.backgroundImage="url(includes/images/categoryhighlight.jpg)";
}

//onmouseout
function removeCategoryHighlight(el){
	if (el.id != getElement("selectedcategory").value)
		el.style.backgroundImage = null;
}

//onclick
function setCategoryHighlight(clickedcategory){
	// Get the last category that was selected (if any)
	lastselectedcategory = null;
	if (getElement("selectedcategory").value!="")
		lastselectedcategory = getElement(getElement("selectedcategory").value);

	// Set the clicked category to selected
	getElement("selectedcategory").value = clickedcategory.id;
	highlightCategory(clickedcategory);
	
	// clear selected events
	selected_destination_id = "";
	
	// Remove background from last selected category (if any)
	if (lastselectedcategory != null)
		if (lastselectedcategory.id != clickedcategory.id)
			removeCategoryHighlight(lastselectedcategory);

	// Populate the destinations in the category
	if (clickedcategory.id != "custom")
		populateDestinations(clickedcategory.id);
		
	// Move onto next guide
	if (showing_steps && current_step == "step1"){
		current_step = "step2";
		refreshSteps();
	}
}

/********************** Window onload and resize code **********************/

// dynamically resizing map and calendar windows
window.onload = function(){
    loadPage();
        //verifypassword(password);
};

window.onresize = function(){
	divsResize();
};


function divsResize(){	
    var calendarcontainer = document.getElementById('calendarcontainer');
    var mapcontainer = document.getElementById('mapcontainer');
	var categorydescriptioncolumn = document.getElementById('categorydescriptioncolumn');
	var large_image = document.getElementById('large_image');
	var guidebox3 = document.getElementById('guidebox3');
	var guidebox3text = document.getElementById('guidebox3text');

	calendarcontainer.style.width= (window.innerWidth - 394).toString() + "px";
	mapcontainer.style.width = (window.innerWidth - 394).toString() + "px";
	
	categorydescriptioncolumn.style.height =(window.innerHeight - 100).toString() + "px";
	
	if (large_image != null){
		large_image.width = parseInt((window.innerWidth-400) * 0.25);
		large_image.height = large_image.width;
	}
	
	guidebox3.style.height = parseInt(window.innerHeight * 0.55 - 20 -40).toString() + "px";
	
	guidebox3text.style.bottom = parseInt(window.innerHeight * 0.45 + 30).toString() + "px";
	//guidebox3text.style.left = parseInt(window.innerWidth * 0.53).toString() + "px";
}

/********************** Google maps code **********************/

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
 

function showDirections(from,to) {
	var request = {
		origin:from,
	    destination:to,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
} 

function addMarker(postcode,tabdesc) {
	geocoder.geocode( {
		'address': postcode+",UK"
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			myLatlng = results[0].geometry.location;
			if (marker!=null) {
				marker.setMap(null);
			}
			marker = new google.maps.Marker({
				map: map,
				position: myLatlng
			});
			map.setCenter(myLatlng);
			map.setZoom(13);
            infowindow = new google.maps.InfoWindow({
              content: tabdesc
            });
			infowindow.open(map, marker);
		}
	});	
}

function updateMap(eventIds){
	length = eventIds.length;
	for (i=0; i<length; i++){
		alert(i);		
	}
}

/********************** Debug code **********************/
function showDebug(str){
	getElement("debug").innerHTML += str;
}


/********************** Guidebox code **********************/
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

function printEvents(){
	var print_events = new Array();

	// Generate a array of events to print
	for (var i in calendar_events){
		var cal_event = calendar_events[i];
		var available_destination = available_destinations[cal_event.available_event_id];

		var print_event={start: cal_event.start,
							start_date_formatted: cal_event.start.formatDate('l, F jS'),
							start_time_formatted: cal_event.start.formatDate('g:i a'),
							end: cal_event.end,
							end_date_formatted: cal_event.end.formatDate('l, F jS'),
							end_time_formatted: cal_event.end.formatDate('g:i a'),
							title: cal_event.title,
							image: available_destination.image_file_name_large,
							postcode: available_destination.postcode,
							description: available_destination.description_short};

		print_events.push(print_event);
	}


	//Sort that array of events by start date
	sortEvents(print_events);

	//print that array of events
	var printWindow=window.open('','Print','width=800');

	printWindow.document.write('<html><head><title>Popup</title>');
	printWindow.document.write('<link rel="stylesheet" href="./printout.css" />');
	printWindow.document.write('</head><body>');

	//starting content
	printWindow.document.write('<table cellspacing=0 cellpadding=5>');
	var last_date = "";

	for (var j in print_events)
	{
		var print_event = print_events[j];

		if (last_date != print_event.start_date_formatted){
			printWindow.document.write('<tr><td colspan=3>');
			printWindow.document.write('<p class="date">' + print_event.start_date_formatted + '</p><hr>');
			printWindow.document.write('</td></tr>');
		}

		printWindow.document.write('<tr><td width="250px" valign=top>');
		printWindow.document.write('<p class="title">' + print_event.title + '</p>');
		printWindow.document.write('<p class="times">' + print_event.start_time_formatted + ' to ' + print_event.end_time_formatted + '</p>');
		printWindow.document.write('<p class="description">' + print_event.description + '</p>');
		printWindow.document.write('<p class="description">Postcode: ' + print_event.postcode + '</p>');
		printWindow.document.write('</td><td width="201px">');
		printWindow.document.write('<img id="image" src="' + print_event.image + '" width="200px" height="200px"/>');
		printWindow.document.write('</td><td width="201px">');
		printWindow.document.write('<div class="map"><p>Placeholder for map with postcode = ' + print_event.postcode + '</p></div>');
		printWindow.document.write('</td></tr>');

		last_date = print_event.start_date_formatted;
	}

	printWindow.document.write('</table>');
	printWindow.document.write('</body></html>');
	printWindow.document.close();

}

// Sorts any array of events has based on .start parameter
function sortEvents(array) {
  var x, y, holder;
  // The Bubble Sort method.
  for(x = 0; x < array.length; x++) {
	for(y = 0; y < (array.length-1); y++) {
	  if(array[y].start > array[y+1].start) {
		holder = array[y+1];
		array[y+1] = array[y];
		array[y] = holder;
	  }
	}
  }
}

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


function loadPage() {
        /*var destination = unescape(gup("destination"));
        var fromdate = unescape(gup("fromdate"));
        var howlong = gup("howlong");


        if (fromdate=='') {
            var newDate = new Date();
            fromdate = newDate.getDate()+"/"+(newDate.getMonth()+1)+"/"+newDate.getFullYear();
        }
        $("#fromdate").val(fromdate);

        if (howlong=='') {
            howlong = 3;
        }
        $("#howlong").val(howlong);


        if (destination=='') {
            destination = 'London';
        }
        $("#destination").val(destination);
*/
	// Load available events
	loadAvailableDestinations();
	loadCategories();

	// Google maps code
        if (!local) {
            initGoogleMaps();
        }
	//addMarker("W1U5BP","Luxborough Towers");
	//showDirections("W1U5BP","SE288HD");


	// Initialize widths and heights that are controlled by JS
	divsResize();

	// refresh guide tabs
	startTutorial();
    
}

function unloadPage() {
    $("#loginactions").hide();
    $("#categorynamecolumn").hide();
    $("#categorydescriptionheading").hide();
    $("#categorydescriptioncolumn").hide();
    $("#calendarcontainer").hide();
    $("#mapcontainer").hide();
    $("#mapcontainer").hide();
}