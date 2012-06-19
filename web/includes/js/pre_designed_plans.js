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
    $.getJSON(filename, 
    function(json_data){
        for (var i in json_data){
            var timeslot={
                start: date_math_addMilliseconds(calendar_start_date, json_data[i].timeslot.start),
                end: date_math_addMilliseconds(calendar_start_date, json_data[i].timeslot.end)
            };
            calendar_and_map_api_loadEvent(-1, json_data[i].available_destination_id, timeslot)
        }
    });
}

function pre_designed_plans_loadPlan(name){
    //-1 means dont delete from database
    calendar_and_map_api_deleteAllEvents(-1);
    
    loadJSON('./includes/json/' + name + '.json');
}