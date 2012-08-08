/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function validateHomePostcode(){
    var home_postcode = $("#home_info_postcode").val();
    
    if (home_postcode!=""){
        show_loading();
        geocoder.geocode( {
            'address': home_postcode +",UK"
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myLatlng = results[0].geometry.location;
                if (home_marker!=null) {
                    home_marker.setMap(null);
                }

                // Create current_marker
                home_marker = new google.maps.Marker({
                    map: map,
                    position: myLatlng,
                    icon: 'includes/images/home_marker.png',
                    zIndex: 1000 + calendar_events.length
                });


                // center and zoom map
                map.setCenter(home_marker.position);
                map.setZoom(zoom_level);

                home_info_marker_selected();

                google.maps.event.addListener(home_marker, 'click', home_info_marker_selected);                
                
                backend_setHome();
                hide_loading();            
            }
            else{
                if (status != google.maps.GeocoderStatus.OVER_QUERY_LIMIT)            
                    plan_actions_set_home_info("Sorry. That address could not be found. Please try again!");
            }
        });    
    }
}


function home_info_marker_selected(){
    calendar_and_map_api_closeCurrentInfoWindow();
    home_infoWindow = new google.maps.InfoWindow({
        content: "<b>Home</b><br/><br/><a href='javascript:plan_actions_set_home_info()'> Change home </a>"
    });               
    home_infoWindow.open(map, home_marker);
}