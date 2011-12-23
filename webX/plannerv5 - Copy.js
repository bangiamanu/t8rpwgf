var map;
var geocoder;
var marker;
var directionsService;
var london_lat;
var directionsDisplay;

// selected_destination_id is the selected destination
var selected_destination_id = "";


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
				str += "<img src='" + evnt.image_file_name_small +"' width='" + SMALL_IMAGE_SIZE + "' height='" + SMALL_IMAGE_SIZE + "' />";
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
		addMarker(destination.postcode, destination.title);
		
		// Update description tab
		var str = "";
		str += "<h3 style='float:left'>" + destination.title + " (<a href='#' onclick='addEvent(" + destination.id +")'>Add</a>)</h3><br/><br/><br/>";
		str += "<img id='large_image' src='" + destination.image_file_name_large + "' style='float:right;margin:0px 10px;' />";
		str += "<p style='float:left'>" + destination.description_long + "</p>";
		getElement("destination_description").innerHTML = str;
		
		// Update pictures tab
		// TODO
		
		// Update opening hours
		// TODO
		
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


/********************** Destination highlight code **********************/

//onmouseover
function highlightDestination(destination){
	//showDebug("OnMouseOver for: " + destination.id + " ");
	destination.style.backgroundImage="url(destinationhighlight.jpg)";
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
	
		if (selected_destination_id != clickeddestination.id){
			highlightDestination(clickeddestination);
			updateDetailTabs(clickeddestination.id);
			selected_destination_id = clickeddestination.id;
			// if nothing is previously selected, dont remove the highlight
			if (last_selected_destination != null)
					removeDestinationHighlight(last_selected_destination);
		}
	
}

/************************* category highlight code *************************/

function getElement(name) {
    return document.getElementById(name);
}

//onmouseover
function highlightCategory(el){
	el.style.backgroundImage="url(categoryhighlight.jpg)";
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
}

/********************** Window onload and resize code **********************/

// dynamically resizing map and calendar windows
window.onload = function(){
	// Load available events
	loadAvailableDestinations();
	loadCategories();
	populateCategories();
	populateCalendar();
	
	// Google maps code
	initGoogleMaps();
	//addMarker("W1U5BP","Luxborough Towers");
	//showDirections("W1U5BP","SE288HD");

	// Set the default category and destination
	firstcategory = getElement("all");
	setCategoryHighlight(firstcategory);
	setDestinationHighlight(getElement(0));

	// Initialize widths and heights that are controlled by JS
	divsResize();
};

window.onresize = function(){
	divsResize();
};


function divsResize(){	
    calendarcontainer = document.getElementById('calendarcontainer');
    mapcontainer = document.getElementById('mapcontainer');
	categorydescriptioncolumn = document.getElementById('categorydescriptioncolumn');
	large_image = document.getElementById('large_image');

	calendarcontainer.style.width= (window.innerWidth - 394).toString() + "px";
	mapcontainer.style.width = (window.innerWidth - 394).toString() + "px";
	
	categorydescriptioncolumn.style.height =(window.innerHeight - 100).toString() + "px";
	
	large_image.width = (window.innerWidth-400) * 0.25;
	large_image.height = large_image.width;
	
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
