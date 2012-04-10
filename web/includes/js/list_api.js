// JavaScript Document

/********************** Destination highlight code **********************/

//onmouseover
function list_api_highlightDestination(destination_id){
	var destination = getElement(destination_id);
	destination.style.backgroundImage="url(includes/images/destinationhighlight.jpg)";
	var filename = $("#" + destination_id + " > img").attr("src");
	var filename_length = filename.length;
		
	var imagename = filename.substring(0,filename_length - 4);
	var imageextension = filename.substring(filename_length - 6, filename_length);
	
	if (imageextension != "co.jpg"){	
		$("#" + destination_id + " > img").attr("src", imagename + "co.jpg");
	}
}

//onmouseout
function list_api_removeDestinationHighlight(destination_id){
	var destination = getElement(destination_id);
	if (current_destination_id != destination.id){
		destination.style.backgroundImage = null;
		var filename = $("#" + destination_id + " > img").attr("src");
		var filename_length = filename.length;
	
		var imagename = filename.substring(0,filename_length - 4);
		var imageextension = filename.substring(filename_length - 6, filename_length);
			
		if (imageextension == "co.jpg"){	
			$("#" + destination_id + " > img").attr("src", imagename.substring(0, imagename.length-2) + ".jpg");
		}	
	}
}

//onclick
// Takes an HTMl div as an inpout with the same id as one in available_destinations array
function list_api_selectDestinationOnList(destination_id){
	var clickeddestination = available_destinations[destination_id];
	var last_selected_destination = getElement(current_destination_id);
	
	if (clickeddestination != null)
		if (current_destination_id != clickeddestination.id){
			list_api_highlightDestination(clickeddestination.id);
			current_destination_id = clickeddestination.id;
			// if nothing is previously selected, dont remove the highlight
			if (last_selected_destination != null)
					list_api_removeDestinationHighlight(last_selected_destination.id);
		}

	sizing_setUpMoreLink();
	showDestinationDetails(destination_id);
	showOpeningHours(destination_id);
			
	// Move onto next guide
	if (showing_steps && current_step == "step2"){
		current_step = "step3";
		refreshSteps();
	}
}

// clears list selection
function list_api_clearListSelection(){
	if (current_destination_id != null){
            var selected_destination_id = current_destination_id;
            current_destination_id = null;	
            list_api_removeDestinationHighlight(selected_destination_id );


            // remove previous more links
            $(".more_link").remove()
	}
}


// Accepts the destination_id of the destination to grey out.
function list_api_greyOutDestination(destination_id){
    // set destination as grey in available_destinations
    available_destinations[destination_id].is_grey = true;

    // change destination element.
    var destination = getElement(destination_id);
    $("#" + destination_id).css("background-color","#ddd");
    $("#" + destination_id).css("color","#555");
}


// Accepts the destination_id of the destination to remove grey out
function list_api_unGreyDestination(destination_id){
    // set destination as grey in available_destinations
    available_destinations[destination_id].is_grey = false;

    var destination = getElement(destination_id);
    $("#" + destination_id).css("background-color","#fff");
    $("#" + destination_id).css("color","#000");
}


/************************* category highlight code *************************/


//onmouseover
function list_api_highlightCategory(el){
	el.style.backgroundImage="url(includes/images/categoryhighlight.jpg)";
}

//onmouseout
function list_api_removeCategoryHighlight(el){
	if (el.id != getElement("selectedcategory").value)
		el.style.backgroundImage = null;
}

//onclick
function list_api_setCategoryHighlight(clickedcategory){
	// Get the last category that was selected (if any)
	lastselectedcategory = null;
	if (getElement("selectedcategory").value!="")
		lastselectedcategory = getElement(getElement("selectedcategory").value);

	// Set the clicked category to selected
	getElement("selectedcategory").value = clickedcategory.id;
	list_api_highlightCategory(clickedcategory);
	
	// clear selected events
	current_destination_id = null;
	
	// Remove background from last selected category (if any)
	if (lastselectedcategory != null)
		if (lastselectedcategory.id != clickedcategory.id)
			list_api_removeCategoryHighlight(lastselectedcategory);

	// Populate the destinations in the category
	if (clickedcategory.id != "custom")
		populateDestinations(clickedcategory.id);
		
		
	// Move onto next guide
	if (showing_steps && current_step == "step1"){
		current_step = "step2";
		refreshSteps();
	}
}

/*************************** private functions (shouldnt be called outside this file) **********************************/

/************************* Destination details pane *************************/

function showDestinationDetails(destination_id){
	destination = available_destinations[destination_id];
	$("#destination_details").children().remove();
	$("#destination_details").append("<p id='destination_title'>" + destination.title + "</p>");
	$("#destination_details").append("<img src='" + destination.image_file_name_large + "' width=230 height=230 />");
	$("#destination_details").append("<p>" + destination.description_long + "</p>");
}


function showOpeningHours(destination_id){
	var destination = available_destinations[destination_id];
	
	var hours = "";
	hours = "";
	hours += "<br/>";
		for (i in destination.opening_hours){
			hour = destination.opening_hours[i];
			var month = hour.start.getMonth() + 1;
			var day = hour.start.getDate();
			var year = hour.start.getFullYear();

			var shour = hour.start.getHours();
			var smin = hour.start.getMinutes();

			var ehour = hour.end.getHours();
			var emin = hour.end.getMinutes();

			hours += "<p>"+day+"/"+month+"/"+year+" " +pad(shour)+":"+pad(smin)+"-"+pad(ehour)+":"+pad(emin)+"</p>";
		}
	$("#destination_hours").children().remove();	
	$("#destination_hours").append("<div>" + hours + "</div>");
}

function pad(input) {
    if (input<10) return "0"+input;
    return input;
}
