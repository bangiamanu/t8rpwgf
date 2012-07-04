// print.js

window.onload = function (){
    //document.writeln("Hello world!");
    var table = document.getElementById("data_table");
    var markers = new Array();
    

    $.getJSON("./includes/json/directions1.json", 
    function(json_data){
        var steps = json_data.routes[0].legs[0].steps;
        
        for (var i in steps){
            var marker_text = "";
            
            // *****************  Logo *************************
            var logo_str = "";
            if (steps[i].travel_mode == "TRANSIT"){
                if (steps[i].transit_details.line.vehicle.type == "BUS" || 
                    steps[i].transit_details.line.vehicle.type == "INTERCITY_BUS" || 
                    steps[i].transit_details.line.vehicle.type == "TROLLEYBUS"){
                    logo_str = "<img src = './includes/images/bus.png' width=20px height=20px/>";
                    marker_text = "&markers=icon:http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=bus%257CFFFFFF%257Ctest%257CFFFFFF%257C000000%7C";
                }
                else{
                    logo_str = "<img src = './includes/images/rail.png' width=20px height=20px/>";
                     marker_text = "&markers=icon:http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=train%257CFFFFFF%257Ctest%257CFFFFFF%257C000000%7C";
                }

                // adding local icon if available
                if (steps[i].transit_details.line.vehicle.local_icon != null)
                    logo_str = "<img src = 'http:" + steps[i].transit_details.line.vehicle.local_icon +"'  width=20px height=20px/>";
            }
            else if (steps[i].travel_mode.toString() == "DRIVING"){
                logo_str = "<img src = './includes/images/drive.png' width=20px height=20px/>";
                marker_text = "&markers=icon:http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=taxi%257CFFFFFF%257Ctest%257CFFFFFF%257C000000%7C";
             }
            else{
                logo_str = "<img src = './includes/images/walk.png'  width=20px height=20px/>";                
                    marker_text = "&markers=icon:http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=wc-male%257CFFFFFF%257Ctest%257CFFFFFF%257C000000%7C";
            }
            

            // *****************  Directions text *************************
            var directions_str = "";
            if (steps[i].travel_mode == "TRANSIT"){   
                directions_str += "Take ";                    
                directions_str += steps[i].transit_details.line.vehicle.name +" (";                    
                directions_str += stringify(steps[i].transit_details.line.short_name) + " " 
                               + stringify(steps[i].transit_details.line.name) + "), ";
                directions_str += "towards ";                    
                directions_str += steps[i].transit_details.headsign;                     
                directions_str += ", from ";                    
                directions_str += steps[i].transit_details.departure_stop.name;                     
                directions_str += " to ";                                        
                directions_str += steps[i].transit_details.arrival_stop.name;                     
            }
            else{
                directions_str = steps[i].html_instructions;
            }
            
            
            // *****************  image *************************
            var image_str = "";
            var start_lat = steps[i].start_location.lat;
            var start_lng = steps[i].start_location.lng;
            var end_lat = steps[i].end_location.lat;
            var end_lng = steps[i].end_location.lng;
            var polyline = steps[i].polyline.points;
            
            image_str = "<img src='http://maps.googleapis.com/maps/api/staticmap?size=200x200"
            
            // starting marker text is diff
            marker_text += start_lat + "," + start_lng;
            image_str += marker_text;
            markers.push(marker_text);
            
            //ending marker text and path
            image_str += "&markers=color:blue|label:B|" + end_lat + "," + end_lng;
            image_str += "&path=color:0x000000|weight:5|enc:" + polyline;
            image_str += "&sensor=false' />";
            
            // *****************  duration / stops *************************
            var duration_str = "";
            if (steps[i].travel_mode == "TRANSIT"){
                    duration_str += stringify(steps[i].transit_details.departure_time.text) + " - " + stringify(steps[i].transit_details.arrival_time.text);
                    duration_str += "<br>";
                    duration_str += "(" + steps[i].duration.text + ", " + stringify(steps[i].transit_details.num_stops) + " stops )";
                }
            else{
                    duration_str = "(About " + steps[i].duration.text + ")";
                }


            // add to table
            var row = table.insertRow(table.rows.length);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = logo_str;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = directions_str;            
            var cell2 = row.insertCell(2);
            cell2.innerHTML = image_str;
            var cell3 = row.insertCell(3);
            cell3.innerHTML = duration_str;
        }
    
    
    /** main map **/
    var main_map_src = "http://maps.googleapis.com/maps/api/staticmap?size=600x300";
    for (var i in markers){
        main_map_src += markers[i];
    }
    main_map_src += "&path=color:0x000000|weight:5|enc:" + json_data.routes[0].overview_polyline.points;
    main_map_src += "&sensor=false";
    console.log(main_map_src);
    $("#main_map").attr("src",main_map_src);

    });
}


function stringify(data){
    if (data != null)
        return data.toString();
    else
        return "";
}