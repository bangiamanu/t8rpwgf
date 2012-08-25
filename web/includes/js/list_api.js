// JavaScript Document

/********************** Destination highlight code **********************/

function list_api_ready(){
    //list_api_setCategoryHighlight(getElement("art"));
    //list_api_removeCategoryHighlight(getElement("art"));
    
    // test comment
    
}

//onmouseover
function destinationMouseOverHandler(event){
    list_api_highlightDestinationById(event.currentTarget.id);
}

function list_api_highlightDestinationById(id){
   if (id !=null && id!= ""){
        var destination_id = id;
        var destination = $("#" + id);

        if (destination != null){
            destination.css('background-image', 'url(includes/images/destinationhighlight.jpg)');
            var filename = $("#" + destination_id + " > img").attr("src");
            var filename_length = filename.length;

            var imagename = filename.substring(0,filename_length - 4);
            var imageextension = filename.substring(filename_length - 6, filename_length);

            if (imageextension != "co.jpg"){	
                $("#" + destination_id + " > img").attr("src", imagename + "co.jpg");
            }
        }    
   }
}

//onmouseout
function destinationMouseOutHandler(event){
    list_api_removeDestinationHighlightById(event.currentTarget.id);
}

function list_api_removeDestinationHighlightById(id){
   if (id !=null && id!= ""){
        var destination_id = id;
        var destination = $("#" + id);

            if (current_destination_id != destination_id){
                destination.css('background-image', '');
                var filename = $("#" + destination_id + " > img").attr("src");
                var filename_length = filename.length;

                var imagename = filename.substring(0,filename_length - 4);
                var imageextension = filename.substring(filename_length - 6, filename_length);

                if (imageextension == "co.jpg"){	
                    $("#" + destination_id + " > img").attr("src", imagename.substring(0, imagename.length-2) + ".jpg");
                }	
            }
   }
}

function destinationMouseClickHandler(event){
    list_api_selectDestinationOnList(event.currentTarget.id);
}

function list_api_setDestinationHighlightById(id){
    var clicked_destination_id = id;
    var last_selected_destination_id = current_destination_id;
    
    list_api_highlightDestinationById(clicked_destination_id);
    current_destination_id = clicked_destination_id;
    list_api_removeDestinationHighlightById(last_selected_destination_id);
}

//onclick
// Takes an HTMl div as an inpout with the same id as one in available_destinations array
function list_api_selectDestinationOnList(destination_id){
    list_api_setDestinationHighlightById(destination_id);
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
    destination_selected_from_list(destination_id);
    
    custom_destinations_destinationSelectedOnList(destination_id);
}

// clears list selection
function list_api_clearListSelection(){
    if (current_destination_id != null){
        var selected_destination_id = current_destination_id;
        current_destination_id = null;	
        list_api_removeDestinationHighlightById(selected_destination_id );


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
function categoryMouseOverHandler(event){
    list_api_highlightCategoryById(event.currentTarget.id)
}

function list_api_highlightCategoryById(id){
    $('#' + id).attr('style', 'background-image: url(includes/images/categoryhighlight.jpg)');
}

//onmouseout
function categoryMouseOutHandler(event){
    if (event.currentTarget.id != $("#selectedcategory").val())
        list_api_removeCategoryHighlightById(event.currentTarget.id);
}

function list_api_removeCategoryHighlightById(id){
    if (id!="")
        $('#' + id).attr('style', 'background-image: null');
}

function list_api_clearCategory(){
    var currently_selected_category_id = $("#selectedcategory").val();
    list_api_removeCategoryHighlightById(currently_selected_category_id);
    $("#selectedcategory").val("")
    current_destination_id = null;
}

//onclick
function categoryMouseClickHandler(event){
    list_api_setCategoryHighlightById(event.currentTarget.id);
}

function list_api_setCategoryHighlightById(id){
    var clicked_category_id = id;
    var currently_selected_category_id = $("#selectedcategory").val();
    
    list_api_highlightCategoryById(clicked_category_id);
    list_api_removeCategoryHighlightById(currently_selected_category_id);
    $("#selectedcategory").val(clicked_category_id);

    // Remove background from last selected category (if any)
    // clear selected events
    current_destination_id = null;
    custom_destination_clearCustomDestination();
    
    // Populate the destinations in the category
    list_api_populateCategory(clicked_category_id);

    if (clicked_category_id == "custom"){
        $("#custom_destinations").show();
    }
    else{
        $("#custom_destinations").hide();        
    }
    
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
	$("#destination_details").append("<p id='description_long'>" + destination.description_long + "</p>");
        
        // highlight any search phrases
        searchbox_highlightSearchPhraseForLongDescription()
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
function list_api_populateCategory(category){
    var destinations_to_populate = new Array();
    
    for (var i in available_destinations){
        var evnt = available_destinations[i];
        if (evnt.category.toString() == category.toString() || category.toString() == "all"){
            destinations_to_populate.push(evnt);
        }
    }
    
    sortDestinationsAlphabetically(destinations_to_populate);
    
    list_api_populateDestinations(destinations_to_populate);
}

function list_api_populateDestinations(destinations_to_populate, search_phrase){
    $("#destinations_list").html("");
    
    for (var i in destinations_to_populate){
        var evnt = destinations_to_populate[i];
        
        $("#destinations_list").append(
            $("<li>")
                .attr('id', evnt.id)
                .append(
                    $("<p>")
                        .attr('class', 'destinationtitle')
                        .append(evnt.title)
                )
                .append(
                    $("<img>")
                        .attr('src', evnt.image_file_name_small )
                        .attr('width', SMALL_IMAGE_SIZE)
                        .attr('height', SMALL_IMAGE_SIZE)
                )
                .append(
                    $("<p>")
                        .attr('class', 'destinationdescription')
                        .append(evnt.description_short)
                )
                .mouseover(destinationMouseOverHandler)
                .mouseout(destinationMouseOutHandler)
                .click(destinationMouseClickHandler)
        );
            
        if (evnt.is_grey){
           $("#destinations_list li").last().attr('style','background-color: #ddd; color: #555;')
        }

        if (search_phrase){
            searchbox_highlightSearchPhrase(evnt.id, search_phrase);
        }
    }
}

function list_api_populateCategories(){
    for (var i=0; i<categories.length;i++){
        var cat = categories[i];

        $("#categories_list").append(
            $("<li>")
                .attr('id', cat.name)
                .attr('class', 'category')
                .append(
                    $("<img>")
                        .attr('src', cat.image_file_name)
                        .attr('class', 'category_icon')
                )
                .append(
                    $("<p>").append(cat.title)
                )
                .mouseover(categoryMouseOverHandler)
                .mouseout(categoryMouseOutHandler)
                .click(categoryMouseClickHandler)
        );
    }
    //category_list.innerHTML = str;
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

function list_api_getDestinationFromUniqueId(unique_id){
    for (var i in available_destinations){
        if (available_destinations[i].unique_id == unique_id)
            return available_destinations[i];
    }
    console.log("ERROR! function: list_api_getDestinationFromUniqueId, unique_id: " + unique_id);
}

