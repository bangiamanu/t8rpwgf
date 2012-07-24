/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function loading_api_loadEvents(events_to_be_loaded){
    clearAllDialogs();
    $("#white_out").fadeIn();	
    setTimeout("$('#loading').fadeIn()",400);
    
    slowLoop(0, events_to_be_loaded);
}


function slowLoop(i, events_to_be_loaded){
    var event = events_to_be_loaded[i];
           
    if (i<events_to_be_loaded.length){
        calendar_and_map_api_loadEvent(event.db_id, event.available_destination_id, event.timeslot);
        setTimeout(function(){slowLoop(i+1, events_to_be_loaded);}, 800);
    }
    else{
        calendar_helper_refreshAllEvents3x();
        clearAllDialogs();
        show_message("A featured plan was loaded for you. Please note that some places may not be open and adjust accordingly.");
    }
}
