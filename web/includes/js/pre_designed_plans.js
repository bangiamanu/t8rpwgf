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
    var start = calendar_start_date;
    var end = date_math_addMilliseconds(calendar_start_date, days_to_show * 24 * 60 * 60 * 1000);
    
    // this holds the events to be loaded
    var events_to_be_loaded = new Array();
    
    // getting the data
    $.getJSON(filename, 
    function(json_data){
        for (var i in json_data){
            var timeslot={
                start: date_math_addMilliseconds(calendar_start_date, json_data[i].timeslot.start),
                end: date_math_addMilliseconds(calendar_start_date, json_data[i].timeslot.end)
            };
            if (timeslot.start >= start && timeslot.end <= end){
                var event = {
                    db_id: -1,
                    available_destination_id: json_data[i].available_destination_id,
                    timeslot: timeslot
                };
                events_to_be_loaded.push(event);
            }
        }

        //loading it on the calendar
        loading_api_loadEvents(events_to_be_loaded, function() {
            show_message("A featured plan was loaded for you. Please note that some places may not be open and adjust accordingly.");
            for (var i in calendar_events){
                var cal_event = calendar_events[i];
                backend_add_event_to_database(cal_event);
            }
        });
    });
}

function pre_designed_plans_loadPlan(name){
    //-1 means dont delete from database
    //tracking code
    _gaq.push(['_trackEvent', 'Featured_plans', 'Load', name]);
    
    
    calendar_and_map_api_deleteAllEvents(-1);
    
    loadJSON('./includes/json/' + name + '.json');
    
    map.setZoom(zoom_level);
}

function pre_designed_plans_dropBoxChange(){
    clearAllTips();
    var val = $('#pre_loaded_plans_choicebox').val();
    if (val!="")
        pre_designed_plans_loadPlan(val);
}
