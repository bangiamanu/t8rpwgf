
/* A simple array containing the following hash
 *     {origin:google.maps.latLng,
        destination:google.maps.latLng,
        time:   {walking:string,
                driving:string,
                public_transport:string},
        directions:google.maps.DirectionsResult}

 */
var directions_cache = new Array();

function directions_cache_showDirections(origin, destination){
    var cache_directions = getDirectionsFromCache(origin, destination);
    if (cache_directions != null){
    // Directions already exist in cache
        directionsDisplay.setDirections(cache_directions);
    }
    else{
    // make new directions request and store it in cache
        var request = {
            origin:origin,
            destination:destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
                addDirectionsToCache(origin, destination, result);
            }
            else{
                alert(DIRECTIONS_NOT_FOUND_ERROR + " (Errorcode - " + status + ")");
            }

        });
    }
}

function directions_cache_updateWalkingTimeText(origin, destination, div_handle){
    var cache_walking_time = getTimeFromCache(origin, destination, google.maps.TravelMode.WALKING);
    if (cache_walking_time != null){
        // if already in cache
       alert(cache_walking_time);
    }
   else{
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.WALKING,
            avoidHighways: false,
            avoidTolls: false
          }, callback);

        function callback(response, status) {
              if (status == google.maps.DistanceMatrixStatus.OK) {
                addTimeToCache(origin, destination, google.maps.TravelMode.WALKING, response.rows[0].elements[0].duration.text)
                alert(response.rows[0].elements[0].duration.text);
              }
              else{
                  alert(DIRECTIONS_NOT_FOUND_ERROR + " (Errorcode - " + status + ")");
              }
        }
    }
}

/*********************** Private functions *****************************/

/*
 * origin is google.maps.LatLng
 * destination is google.maps.LatLng
 *
 * returns null if cant find directions and the google.maps.DirectionsResult object if they do exist
 */
function getDirectionsFromCache(origin, destination){
    if (origin !=null && destination != null){
        for (var i in directions_cache){
            var cache_entry = directions_cache[i];
            if (origin.equals(cache_entry.origin) && destination.equals(cache_entry.destination) && cache_entry.directions!=null)
                return cache_entry.directions;
        }
    }
    return null;
}

/*
 * origin is google.maps.LatLng
 * destination is google.maps.LatLng
 * type is google.maps.TravelMode
 *
 * returns null if cant find the time and the string with the value in mins / hours if it exists
 */
function getTimeFromCache(origin, destination, type){
    for (var i in directions_cache){
        var cache_entry = directions_cache[i];
        if (origin.equals(cache_entry.origin) && destination.equals(cache_entry.destination))
            if (type == google.maps.TravelMode.WALKING){
                if (cache_entry.time.walking != null)
                    return cache_entry.time.walking
            }
            if (type == google.maps.TravelMode.DRIVING){
                if (cache_entry.time.walking != null)
                    return cache_entry.time.driving
            }
    }
    return null;
}

/*
 * origin is google.maps.LatLng
 * destination is google.maps.LatLng
 *
 * directions is google.maps.DirectionsResult
 */
function addDirectionsToCache(origin, destination, directions){
    // if the origin destination pair exists then update it
    if (origin !=null && destination != null){
        for (var i in directions_cache){
            var cache_entry = directions_cache[i];
            if (origin.equals(cache_entry.origin) && destination.equals(cache_entry.destination)){
                cache_entry.directions = directions;
                return;
            }
        }
    }

    // if the origin destination pair doesnt exist then push it
    directions_cache.push(
        {origin:origin,
        destination:destination,
        time:   {walking:null,
                driving:null,
                public_transport:null},
        directions:directions}
    );
}

/*
 * origin is google.maps.LatLng
 * destination is google.maps.LatLng
 * type is google.maps.TravelMode
 * time is string with time value
 */
function addTimeToCache(origin, destination, type, time){
    // if the origin destination pair exists then update it
    if (origin !=null && destination != null){
        for (var i in directions_cache){
            var cache_entry = directions_cache[i];
            if (origin.equals(cache_entry.origin) && destination.equals(cache_entry.destination)){
                if (type == google.maps.TravelMode.WALKING)
                    cache_entry.time.walking = time;
                if (type == google.maps.TravelMode.DRIVING)
                    cache_entry.time.driving = time;
                return;
            }
        }
    }

    // if the origin destination pair doesnt exist then push it
    if (type == google.maps.TravelMode.WALKING)
        directions_cache.push(
            {origin:origin,
            destination:destination,
            time:   {walking:time,
                    driving:null,
                    public_transport:null},
            directions:null}
        );

    if (type == google.maps.TravelMode.DRIVING)
        directions_cache.push(
            {origin:origin,
            destination:destination,
            time:   {walking:null,
                    driving:time,
                    public_transport:null},
            directions:directions}
        );
}
