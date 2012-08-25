/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function custom_destinations_ready(){
    $("#custom_destinations_add").click(custom_destination_addNewCustomDestination);
    $("#custom_destinations_update").click(custom_destination_updateCustomDestination);
    $("#custom_destinations_clear").click(custom_destination_clearCustomDestination);
}

function custom_destination_addNewCustomDestination(){
    if (!custom_destinations_validateForm())
        return;
    
    var opening_hours = new Array();
    
    for (var i=0;i<parseInt(days_to_show);i++){
        opening_hours.push({
            start:date_math_addHours(date_math_addDays(calendar_start_date , i), 8), // Days start at 8am
            end:date_math_addHours(date_math_addDays(calendar_start_date , i), 23) // Day ends at 11
        });
    }
    
    var temporary_destination = {
        id:available_destinations.length,
        db_id: -1,
        unique_id: -1,
        category: 'custom',
        title: $("#custom_destinations_title").val(),
        description_short: $("#custom_destinations_description_short").val(),
        description_long: $("#custom_destinations_description_long").val(),
        image_file_name_small: "includes/images/custom_small.png",
        image_file_name_large: "includes/images/custom_large.png",
        wikipedia_url: null,
        marker: null,
        is_grey: false,
        other_links: null,
        opening_hours: opening_hours,
        postcode: $("#custom_destinations_postcode").val()
    };
    
    try{
        calendar_and_map_api_addTemporaryDestinationToMap(temporary_destination, function()
            {
            available_destinations.push(temporary_destination);
            
            // select category
            if ($('#selectedcategory').val()!='custom')
                list_api_setCategoryHighlightById('custom');
            else
                list_api_populateCategory('custom');
            
            // select destination
            list_api_selectDestinationOnList(temporary_destination.id);
            
            }
        );
    }
    catch(e){
        alert(e);
    }
}

function custom_destination_updateCustomDestination(){
    if (!custom_destinations_validateForm())
        return;

    updateDestination(current_destination_id);
    backend_updateCustomDestination(current_destination_id);
    list_api_populateCategory('custom');
    list_api_selectDestinationOnList(current_destination_id);    
}

function custom_destination_clearCustomDestination(){
    emptyFields();
    list_api_clearListSelection();
}

function custom_destinations_destinationSelectedOnList(destination_id){
    var dest = available_destinations[destination_id];
    
    if (dest.category == 'custom')
        updateFields(dest);
    else
        emptyFields();
}

function custom_destinations_validateForm(){
    var title = $("#custom_destinations_title").val();
    var postcode = $("#custom_destinations_postcode").val();
    var description_short = $("#custom_destinations_description_short").val();
    
    if (title == ""){
        alert("Please enter a Name");
        return false;
    }
    if (postcode == ""){
        alert("Please enter a Postcode");
        return false;
    }
    if (description_short == ""){
        alert("Please enter a Short Description");
        return false;
    }
    return true;
}

/********************** Private Fields ********************/

function emptyFields(){
    $("#custom_destinations_title").val("");
    $("#custom_destinations_address").val("");
    $("#custom_destinations_postcode").val("");
    $("#custom_destinations_description_short").val("");
    $("#custom_destinations_description_long").val("");
    
    addButtonShow();
}

function updateFields(destination){
    if (destination.title!=null)
        $("#custom_destinations_title").val(destination.title);

    if (destination.address!=null)
        $("#custom_destinations_address").val(destination.address);
    
    if (destination.postcode!=null)
        $("#custom_destinations_postcode").val(destination.postcode);
    
    if (destination.description_short!=null)
        $("#custom_destinations_description_short").val(destination.description_short);
    
    if (destination.description_long!=null)
        $("#custom_destinations_description_long").val(destination.description_long);
    
    addButtonHide();    
}

function updateDestination(destination_id){
    var destination = available_destinations[destination_id];

    destination.title = $("#custom_destinations_title").val();
    destination.address = $("#custom_destinations_address").val();
    destination.postcode = $("#custom_destinations_postcode").val();
    destination.description_short = $("#custom_destinations_description_short").val();
    destination.description_long = $("#custom_destinations_description_long").val();
}

function addButtonShow(){
    $("#custom_destinations_add").show();
    $("#custom_destinations_update").hide();
    $("#custom_destinations_clear").hide();
}

function addButtonHide(){
    $("#custom_destinations_add").hide();
    $("#custom_destinations_update").show();
    $("#custom_destinations_clear").show();
}
