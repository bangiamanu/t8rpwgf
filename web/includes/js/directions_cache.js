
/* A simple array containing the following hash
 *     {origin:google.maps.latLng,
        destination:google.maps.latLng,
        time:   {walking:google.maps.Duration,
                driving:google.maps.Duration,
                transit:google.maps.Duration},
        directions:google.maps.DirectionsResult}

 */
var directions_cache = new Array();
var MAX_WALKING_MINUTES = 20;
// This ensures no concurrent requests are made
var outstanding_directions_request = false;

/**
 * shows directions on the map
 * Accepts
 * origin: google.maps.latLng
 * destination: google.maps.latLng
 *
 */
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
            travelMode: google.maps.DirectionsTravelMode.TRANSIT    // this is the default type of directions shown on map
        };

        if (!outstanding_directions_request){
            outstanding_directions_request = true;
            console.log("Making Google maps TRANSIT request. Origin:" + origin + " Destination:" + destination);
            
            directionsService.route(request, function(result, status) {
                outstanding_directions_request = false;                
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
}


/*
 * Gets the walking time between origin and destination and calls functionToCall
 * origin: google.maps.latLng
 * destination: google.maps.latLng
 * functionToCall(google.maps.Duration): function to call after walking time is determined
 */
function getWalkingTime(origin, destination, functionToCall){
    var cache_walking_time = getTimeFromCache(origin, destination, google.maps.TravelMode.WALKING);
    if (cache_walking_time != null){
        // if already in cache
       functionToCall(cache_walking_time);
    }
   else{
       // if not in cache
        var service = new google.maps.DistanceMatrixService();

        if (!outstanding_directions_request){
            outstanding_directions_request = true;
            console.log("Making Google maps WALKING distance request. Origin:" + origin + " Destination:" + destination);
            
            service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.WALKING,
                avoidHighways: false,
                avoidTolls: false
            }, callback);

            function callback(response, status) {
                outstanding_directions_request = false;
                if (status == google.maps.DistanceMatrixStatus.OK) {
                    addTimeToCache(origin, destination, google.maps.TravelMode.WALKING, response.rows[0].elements[0].duration)
                    functionToCall(response.rows[0].elements[0].duration);
                }
                else{
                    alert(DIRECTIONS_NOT_FOUND_ERROR + " (Errorcode - " + status + ")");
                }
            }
        }
    }
}

/*
 * Gets the driving time between origin and destination and calls functionToCall
 * origin: google.maps.latLng
 * destination: google.maps.latLng
 * functionToCall(google.maps.Duration): function to call after walking time is determined
 */
function getDrivingTime(origin, destination, functionToCall){
    var cache_driving_time = getTimeFromCache(origin, destination, google.maps.TravelMode.DRIVING);
    if (cache_driving_time != null){
        // if already in cache
       functionToCall(cache_driving_time);
    }
   else{
       // if not in cache
        var service = new google.maps.DistanceMatrixService();

        if (!outstanding_directions_request){
            outstanding_directions_request = true;
            console.log("Making Google maps DRIVING distance request. Origin:" + origin + " Destination:" + destination);

            service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false
            }, callback);

            function callback(response, status) {
                outstanding_directions_request = false;
                if (status == google.maps.DistanceMatrixStatus.OK) {
                    addTimeToCache(origin, destination, google.maps.TravelMode.DRIVING, response.rows[0].elements[0].duration)
                    functionToCall(response.rows[0].elements[0].duration);
                }
                else{
                    alert(DIRECTIONS_NOT_FOUND_ERROR + " (Errorcode - " + status + ")");
                }
            }
        }
    }
}

/*
  * Gets the driving time between origin and destination and calls functionToCall
 * origin: google.maps.latLng
 * destination: google.maps.latLng
 * functionToCall(google.maps.Duration): function to call after walking time is determined
 */
function getTransitTime(origin, destination, functionToCall){
    var cache_driving_time = getTimeFromCache(origin, destination, google.maps.TravelMode.TRANSIT);
    if (cache_driving_time != null){
        // if already in cache
       functionToCall(cache_driving_time);
    }
   else{
        // if not in cache
        // make new directions request and store it in cache
        
        var request = {
            origin:origin,
            destination:destination,
            travelMode: google.maps.DirectionsTravelMode.TRANSIT    // this is the default type of directions shown on map
        };

        if (!outstanding_directions_request){
            outstanding_directions_request = true;
            console.log("Making Google maps TRANSIT distance request. Origin:" + origin + " Destination:" + destination);

            directionsService.route(request, callback);

            function callback(response, status) {
                outstanding_directions_request = false;
                if (status == google.maps.DirectionsStatus.OK) {
                    addDirectionsToCache(origin, destination, response);

                    addTimeToCache(origin, destination, google.maps.TravelMode.TRANSIT, response.routes[0].legs[0].duration)
                    functionToCall(response.routes[0].legs[0].duration);                
                }
                else{
                    alert(DIRECTIONS_NOT_FOUND_ERROR + " (Errorcode - " + status + ")");
                }
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
        if (origin.equals(cache_entry.origin) && destination.equals(cache_entry.destination)){
            if (type == google.maps.TravelMode.WALKING){
                if (cache_entry.time.walking != null)
                    return cache_entry.time.walking
            }
            if (type == google.maps.TravelMode.DRIVING){
                if (cache_entry.time.driving != null)
                    return cache_entry.time.driving
            }
            if (type == google.maps.TravelMode.TRANSIT){
                if (cache_entry.time.transit != null)
                    return cache_entry.time.transit
            }
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
                transit:null},
        directions:directions}
    );
}

/*
 * origin is google.maps.LatLng
 * destination is google.maps.LatLng
 * type is google.maps.TravelMode
 * duration is google.maps.Duration
 */
function addTimeToCache(origin, destination, type, duration){
    // if the origin destination pair exists then update it
    if (origin !=null && destination != null){
        for (var i in directions_cache){
            var cache_entry = directions_cache[i];
            if (origin.equals(cache_entry.origin) && destination.equals(cache_entry.destination)){
                if (type == google.maps.TravelMode.WALKING)
                    cache_entry.time.walking = duration;
                if (type == google.maps.TravelMode.DRIVING)
                    cache_entry.time.driving = duration;
                if (type == google.maps.TravelMode.TRANSIT)
                    cache_entry.time.transit = duration;
                return;
            }
        }
    }

    // if the origin destination pair doesnt exist then push it
    if (type == google.maps.TravelMode.WALKING)
        directions_cache.push(
            {origin:origin,
            destination:destination,
            time:   {walking:duration,
                    driving:null,
                    transit:null},
            directions:null}
        );

    if (type == google.maps.TravelMode.DRIVING)
        directions_cache.push(
            {origin:origin,
            destination:destination,
            time:   {walking:null,
                    driving:duration,
                    transit:null},
            directions:directions}
        );

    if (type == google.maps.TravelMode.TRANSIT)
        directions_cache.push(
            {origin:origin,
            destination:destination,
            time:   {walking:null,
                    driving:null,
                    transit:duration},
            directions:directions}
        );
}
