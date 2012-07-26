// JavaScript Document

/********************** Destination highlight code **********************/

//onmouseover
function list_api_highlightDestination(destination_id){
    var destination = getElement(destination_id);
    if (destination != null){
        destination.style.backgroundImage="url(includes/images/destinationhighlight.jpg)";
        var filename = $("#" + destination_id + " > img").attr("src");
        var filename_length = filename.length;

        var imagename = filename.substring(0,filename_length - 4);
        var imageextension = filename.substring(filename_length - 6, filename_length);

        if (imageextension != "co.jpg"){	
            $("#" + destination_id + " > img").attr("src", imagename + "co.jpg");
        }
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
        if (is_contracted)
            list_api_showImages(destination_id);
			
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
		list_api_populateDestinations(clickedcategory.id);
		
		
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
        var hour = destination.opening_hours[i];
        var month = hour.start.getMonth() + 1;
        var day = hour.start.getDate();
        var year = hour.start.getFullYear();

        var shour = hour.start.getHours();
        var smin = hour.start.getMinutes();

        var ehour = hour.end.getHours();
        var emin = hour.end.getMinutes();

        hours += "<p>"+day+"/"+month+"/"+year+" " +pad(shour)+":"+pad(smin)+"-"+pad(ehour)+":"+pad(emin)+"</p>";
        var desc = destination.opening_hours[i].description;
        if (desc!=null && desc!=""){
            hours += "<p>" + desc + "</p>"
            hours += "<br/>"
        }
    }
    $("#destination_hours").children().remove();	
    $("#destination_hours").append("<div>" + hours + "</div>");
}

function list_api_showImages(destination_id){
    $("#destination_images").html("");
    
    var destination = available_destinations[destination_id];

    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
        tags: destination.title,
        tagmode: "any",
        format: "json"
    },
    function(data) {
        $.each(data.items, function(i,item){
        $("<img/>").attr("src", item.media.m).appendTo("#destination_images");
        if ( i == 50 ) return false;
        });
    });
}

function pad(input) {
    if (input<10) return "0"+input;
    return input;
}

/********************** Population code **********************/
// Accepts catgory as string (e.g., "theatre") and populates the destinations list based on that category
function list_api_populateDestinations(category){
    var destinations_list = getElement("destinations_list");
    var str = "";
    var destinations_to_populate = new Array();
    
    for (var i in available_destinations){
        var evnt = available_destinations[i];
        if (evnt.category.toString() == category.toString() || category.toString() == "all"){
            destinations_to_populate.push(evnt);
        }
    }
    
    sortDestinationsAlphabetically(destinations_to_populate);
    
    for (i in destinations_to_populate){
        evnt = destinations_to_populate[i];
        str += "<li id='" + evnt.id + "' onmouseover='list_api_highlightDestination(" + evnt.id +")' onmouseout='list_api_removeDestinationHighlight(" + evnt.id + ")' onclick='destination_selected_from_list(" + evnt.id +")'";
        if (evnt.is_grey){
            str += "style='background-color: #ddd; color: #555;'";
        }
        str += ">";
        str += "<p class='destinationtitle'>"+ evnt.title +"</p>";
        str += "<img src='" + evnt.image_file_name_small +"' width='" + SMALL_IMAGE_SIZE + "' height='" + SMALL_IMAGE_SIZE + "' />";
        str += "<p class='destinationdescription'>" + evnt.description_short + " "
        str += "</li>";        
    }
    destinations_list.innerHTML  = str;
}


function list_api_populateCategories(){
    var category_list = getElement("categories_list");
    var str = "";
    for (var i=0; i<categories.length;i++){
        var cat = categories[i];
        str += "<li onmouseover='list_api_highlightCategory(this)' onmouseout='list_api_removeCategoryHighlight(this)' onclick='list_api_setCategoryHighlight(this)' id='" + cat.name + "' class='category'>";
        str += "<img src='" + cat.image_file_name + "' class='category_icon'/>"
        str += "<p>" + cat.title + "</p>";
        str += "</li><!-- category -->"
    }
    category_list.innerHTML = str;
}

// sorts events based on .title
function sortDestinationsAlphabetically(array) {
  var x, y, holder;
  // The Bubble Sort method.
  for(x = 0; x < array.length; x++) {
    for(y = 0; y < (array.length-1); y++) {
        if(array[y].title > array[y+1].title) {
            holder = array[y+1];
            array[y+1] = array[y];
            array[y] = holder;
        }
    }
  }
}

