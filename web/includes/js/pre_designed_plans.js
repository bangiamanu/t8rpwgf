/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**   $.getJSON('./includes/js/test.json', function(data) {
  var items = [];

  $.each(data, function(key, val) {
    items.push('<li id="' + key + '">' + val + '</li>');
  });

  $('<ul/>', {
    'class': 'my-new-list',
    html: items.join('')
  }).appendTo('body');
});**/




function saveJSON(){
    var json_object = new Array();
    
    for (var i in calendar_events){
        json_object.push({
            available_destination_id: calendar_events[i].available_destination_id,
            timeslot: {
                start: date_math_subtractDates(calendar_events[i].start, calendar_start_date),
                end: date_math_subtractDates(calendar_events[i].end, calendar_start_date)
            }
        });
    }
    var json_string = JSON.stringify(json_object);
    
    var w = window.open();
    w.document.writeln(json_string);
}

function loadJSON(filename){

    clearAllDialogs();
    $("#white_out").fadeIn();	
    setTimeout("$('#loading').fadeIn()",400);
    
    
    var start = calendar_start_date;
    var end = date_math_addMilliseconds(calendar_start_date, days_to_show * 24 * 60 * 60 * 1000);
    
    $.getJSON(filename, 
    function(json_data){
        slowLoop(0, json_data, start, end);
    });
}

function slowLoop(i, json_data, start, end){
    if (i==json_data.length){
        setTimeout(calendar_helper_refreshAllEvents, 1);
        setTimeout(calendar_helper_refreshAllEvents, 30000);
        setTimeout(calendar_helper_refreshAllEvents, 60000);
        
        clearAllDialogs();
        show_message("A featured plan was loaded for you. Please note that some places may not be open and adjust accordingly.");
        return;
    }
    
    var timeslot={
        start: date_math_addMilliseconds(calendar_start_date, json_data[i].timeslot.start),
        end: date_math_addMilliseconds(calendar_start_date, json_data[i].timeslot.end)
    };

    if (i<json_data.length && timeslot.start >= start && timeslot.end <= end){
        calendar_and_map_api_loadEvent(-1, json_data[i].available_destination_id, timeslot);
        setTimeout(function(){slowLoop(i+1, json_data, start, end);}, 800);
    }
    else{
        setTimeout(calendar_helper_refreshAllEvents, 1);
        setTimeout(calendar_helper_refreshAllEvents, 30000);
        setTimeout(calendar_helper_refreshAllEvents, 60000);

        clearAllDialogs();
        show_message("A featured plan was loaded for you. Please note that some places may not be open and adjust accordingly.");
    }
}

function pre_designed_plans_loadPlan(name){
    //-1 means dont delete from database
    calendar_and_map_api_deleteAllEvents(-1);
    
    loadJSON('./includes/json/' + name + '.json');
    
    map.setZoom(zoom_level);
}

function pre_designed_plans_dropBoxChange(){
    var val = $('#pre_loaded_plans_choicebox').val();
    if (val!="")
        pre_designed_plans_loadPlan(val);
}
