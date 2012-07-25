/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function loading_api_loadEvents(events_to_be_loaded, success_function){
    clearAllDialogs();
    $("#white_out").fadeIn();	
    setTimeout("$('#loading').fadeIn()",400);
    
    slowLoop(0, events_to_be_loaded, success_function);
}


function slowLoop(i, events_to_be_loaded, success_function){
    var event = events_to_be_loaded[i];
           
    if (i<events_to_be_loaded.length){
        calendar_and_map_api_loadEvent(event.db_id, event.available_destination_id, event.timeslot);
        setTimeout(function(){slowLoop(i+1, events_to_be_loaded, success_function);}, 800);
    }
    else{
        calendar_helper_refreshAllEvents3x();
        clearAllDialogs();
        success_function();
    }
}
