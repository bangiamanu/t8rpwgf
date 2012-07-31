// JavaScript Document
/*

Places to update code
- here
- 


*/
var saved_trips = new Array(); // contains previously saved trips
var days_to_show = 0; // length of calendar
var calendar_start_date = new Date();
var MAX_WALKING_MINUTES = 20; // if the walk is longer than this, the calendar defaults to drive

function backend_ready(){
    backend_loadCategories();
    checkin();
    //backend_loadAvailableDestinations();

    days_to_show = $("#howlong").val(); // replace this function with backend code
    var startDateField = $("#fromdate").val().split("/");
    calendar_start_date = new Date(startDateField[2],startDateField[1]-1,startDateField[0]);
    //TODO MAX_WALKING_MINUTES = 20;
    
    calendar_helper_populateCalendar();	
}

// populates the categories array - called on document.ready
function backend_loadCategories(){
    //data_loader_loadCategories(); // replace this function with backend code
    var params = "command=loadCategory";
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: loadCategoryData
    });
}

function loadCategoryData(xml) {

    counter = 0;
    $.xmlDOM( xml ).find("category").each(function() {
        var id = $(this).attr("id");
        var name= $(this).find("name").text();
        var title = $(this).find("title").text();
        var imagef = $(this).find("imagefile").text();
        categories[counter] = {
            id: id,
            name: name,
            title: title,
            image_file_name: "includes/images/"+ imagef
        };
        counter++;
    });
    list_api_populateCategories();
    backend_loadAvailableDestinations();
    list_api_ready();
}


function backend_loadAvailableDestinations(){
    var params = "command=getAttractions";
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: loadAvailableDestinationsData
    });
}

function loadAvailableDestinationsData(xml) {
    counter = 0;
    $.xmlDOM( xml ).find("attraction").each(function() {


        var id = $(this).attr("aid");
        var category= $(this).find("category").text();
        var title= URLDecode($(this).find("title").text());
        var description_short= URLDecode($(this).find("description_short").text());
        var description_long= URLDecode($(this).find("description_long").text());
        var image_file_name_small= $(this).find("image_file_name_small").text();
        var image_file_name_large= $(this).find("image_file_name_large").text();
        var wikipedia_url= $(this).find("wikipedia_url").text();
        var postcode= $(this).find("postcode").text();

        var links = new Array();
        linkcounter = 0;

        $(this).find("link").each(function() {
            var name= $(this).attr("name");
            var url= $(this).attr("url");
            links[linkcounter] = {name: name, url: url};
            linkcounter++;
        });

        var openingtimes = new Array();
        opencounter = 0;

        $(this).find("open").each(function() {
            var fromy = $(this).attr("fromy");
            var fromm = $(this).attr("fromm");
            var fromd = $(this).attr("fromd");
            var fromh = $(this).attr("fromh");
            var fromn = $(this).attr("fromn");

            var toy = $(this).attr("toy");
            var tom = $(this).attr("tom");
            var tod = $(this).attr("tod");
            var toh = $(this).attr("toh");
            var ton = $(this).attr("ton");
            var desc = $(this).attr("description");

            openingtimes[opencounter] = {start:new Date(fromy, fromm, fromd, fromh, fromn), end:new Date(toy, tom, tod, toh, ton), description: desc};
            opencounter++;
        });


        available_destinations[id] = {
            id:id,
            category: category,
            title: title,
            description_short: description_short,
            description_long: description_long,
            image_file_name_small: "includes/images/data/" + image_file_name_small,
            image_file_name_large: "includes/images/data/" +image_file_name_large,
            wikipedia_url: wikipedia_url,
            marker: null,
            is_grey: false,
            other_links: links,
            opening_hours: openingtimes,
            postcode: postcode
        };
        counter++;
    });
}

function checkin() {
    var params = "command=GetUser";
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processCheckin
    }); 
    return false;     
}

function processCheckin(xml) {
    $.xmlDOM( xml ).find("result").each(function() {
        var command = $(this).text();
        if (command!="") {
            $("#user_first_name").html(command);
            $("#cname").html(command);
            $(".signed_in_or_out").toggle();
            backend_populateSavedTrips();
        }
    });    
}

// called when user clicks signin
function backend_signIn(){
    var params = "command=Login&email="+$("#lemail").val()+"&password="+$("#lpassword").val();
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processLogin
    }); 
    return false;    
}

function processErrorMessages(div,xml) {
    var errors = "";
    var messages = "";
    $.xmlDOM( xml ).find("error").each(function() {
        errors=errors+$(this).text()+"<br/>";
    });
    $.xmlDOM( xml ).find("message").each(function() {
        messages=messages+$(this).text()+"<br/>";
    });
    $("#"+div+"error").html(errors);
    $("#"+div+"message").html(messages);
    return errors=="";
}

function processLogin(xml) {
    var errors = "";
    var messages = "";
    var div = "login";
    $.xmlDOM( xml ).find("error").each(function() {
        errors=errors+$(this).text()+"<br/>";
    });
    $.xmlDOM( xml ).find("message").each(function() {
        messages=messages+$(this).text()+"<br/>";
    });
    $.xmlDOM( xml ).find("result").each(function() {
        var command = $(this).text();
        if (command=="verify") {
            div = "verify";
            $("#"+div+"error").html(errors);
            $("#"+div+"message").html(messages);
            $("#vemail").val($("#lemail").val());
            acct_management_verify(false);
        }
        else {
            $("#user_first_name").html(command);
            $("#loggedin").val("true");
            $("#cname").html(command);
        }
    });
    $("#"+div+"error").html(errors);
    $("#"+div+"message").html(messages);
    if (errors=="") {
 	$(".signed_in_or_out").toggle(); // this changes the toolbar from signed out to signed in and vice versa.
        clearAllDialogs();
        backend_populateSavedTrips();          
    }
}

// called when user clicks signup
function backend_signUp(){
    var params = "command=NewUser&name="+$("#rname").val()+"&email="+$("#remail").val()+"&newpassword="+$("#rpassword").val()+"&newpassword1="+$("#rpassword1").val();
    $.ajax({
        url: "LoginAction.do",
        type: "POST",
        cache: false,
        data: params,
        success: processSignup
    }); 
    return false;
}

function processSignup(xml) {
    if (processErrorMessages('register',xml)) {
        $("#vemail").val($("#remail").val());
        acct_management_verify(true);
    }
}

function backend_verify(){
    var params = "command=VerifyUser&email="+$("#vemail").val()+"&code="+$("#vcode").val();
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processVerify
    }); 
    return false;	
}

function processVerify(xml) {
    if (processErrorMessages('verify',xml)) {
        clearAllDialogs();
        checkin();
    }
}

function backend_forgotPassword(){
    var params = "command=ForgotUser&email="+$("#femail").val();
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processForgot
    }); 
    return false;	
}

function processForgot(xml) {
    if (processErrorMessages('forgot',xml)) {
        //show message
        $("#lemail").val($("#femail").val());
        $("#lpassword").val("");
        acct_management_signIn();
    }  
}

function backend_changePasswords() {
    var params = "command=ChangePassword&password="+$("#old_password").val()+"&newpassword="+$("#new_password").val()+"&newpassword1="+$("#new_password1").val();
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processChange
    }); 
    return false;    
}

function processChange(xml) {
    if (processErrorMessages('profile',xml)) {
        //show message about password changed
    }
}

function backend_changeName() {
    var params = "command=ChangeName&name="+$("#cname").val();
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processChange
    }); 
    return false;      
}

function processChange(xml) {
    if (processErrorMessages('changen',xml)) {
        //show message about password changed
    }
}

// called when user clicks signin and is supposed to populate the saved_trips array
function backend_populateSavedTrips(){
    
    // populate the saved_trips array
    saved_trips = new Array();

    var params = "command=GetPlans";
    $.ajax({
        type: "POST",
        url: "PlanAction.do",
        cache: false,
        data: params,
        success: processPlans
    }); 
}

function processPlans(xml) {
    counter = 0;
    $.xmlDOM( xml ).find("plan").each(function() {
        var startDateField = $(this).attr("fromdate").split("/");
        var endDateField = $(this).attr("enddate").split("/");
        saved_trips[counter] = {id: $(this).attr("id"), num_events: $(this).attr("numevents"), name:$(this).attr("name"), city:$(this).attr("location"), start_date: new Date(startDateField[2],startDateField[1]-1,startDateField[0]), end_date: new Date(endDateField[2],endDateField[1]-1,endDateField[0])};
        counter++;
    });
    acct_management_createSavedTripsBox();
}

function backend_logOut(){
    if ($("#fbid")!="") {
        var params = "command=Logout";
        $.ajax({
            type: "POST",
            url: "LoginAction.do",
            cache: false,
            data: params,
            success: processLogout
        });
    }
    else {
        logoutfb();
    }
}

function processLogout(xml) {
    $("#fbid").val("");
    $(".signed_in_or_out").toggle();
    $("#user_first_name").html("");
    $("#cname").html("");
    $("#tabletrips").html("");
    $("#cname").html("");
}

function log(message) {
    var params = "command=Log&message="+encodeURI(message);
    command(params);
}

function command(message) {
    $.ajax({
        url: "QueryAction.do",
        type: "POST",
        cache: false,
        data: message
    }); 
}

(function(a){if(window.DOMParser==undefined&&window.ActiveXObject){DOMParser=function(){};DOMParser.prototype.parseFromString=function(c){var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(c);return b}}a.xmlDOM=function(b,h){try{var d=(new DOMParser()).parseFromString(b,"text/xml");if(a.isXMLDoc(d)){var c=a("parsererror",d);if(c.length==1){throw ("Error: "+a(d).text())}}else{throw ("Unable to parse XML")}}catch(f){var g=(f.name==undefined?f:f.name+": "+f.message);if(a.isFunction(h)){h(g)}else{a(document).trigger("xmlParseError",[g])}return a([])}return a(d)}})(jQuery);

$(document).bind('xmlParseError', function(event, error) {
    console.log('A parse error occurred! ' + error);
});

function URLDecode(psEncodeString)
{
  // Create a regular expression to search all +s in the string
  var lsRegExp = /\+/g;
  // Return the decoded string
  return unescape(String(psEncodeString).replace(lsRegExp, " "));
}

function loadTrip(id) {
    var params = "command=GetPlan&id="+id;
    $.ajax({
        type: "POST",
        url: "PlanAction.do",
        cache: false,
        data: params,
        success: processLoadPlan
    });
}

function processLoadPlan(xml) {
    $.xmlDOM( xml ).find("planx").each(function() {
        $("#editable").val($(this).attr("editable"));
        days_to_show = $(this).attr("numdays") // replace this function with backend code
        
        var startDateField = $(this).attr("startdate").split("/");
        calendar_start_date = new Date(startDateField[2],startDateField[1]-1,startDateField[0]);
    });
    
    var events_to_be_loaded = new Array()
    
    $.xmlDOM( xml ).find("pevent").each(function() {      
        // build timeslot
        var startDateField = $(this).attr("fromdate").split(":");
        var endDateField = $(this).attr("enddate").split(":");
        var timeslot = {start: new Date(startDateField[2],startDateField[1]-1,startDateField[0],startDateField[3],startDateField[4],0) , end: new Date(endDateField[2],endDateField[1]-1,endDateField[0],endDateField[3],endDateField[4],0)};
        
        // load it on the UI
        var event = {
            db_id: $(this).attr("id"),
            available_destination_id: $(this).attr("aid"),
            timeslot: timeslot
        };

        events_to_be_loaded.push(event);
    });
    
    //prepping the stage
    calendar_and_map_api_deleteAllEvents(false);
    $("#calendar").weekCalendar("gotoDate",calendar_start_date);
    $('#calendar').weekCalendar({"daysToShow":days_to_show});
    backend_loadAvailableDestinations();
    
    // loading the events
    loading_api_loadEvents(events_to_be_loaded, function(){
        show_message("Your plan was loaded");
        clearAllDialogs();
    });
}

function deleteTrip(id) {
    var params = "command=DeletePlan&id="+id;
    $.ajax({
        type: "POST",
        url: "PlanAction.do",
        cache: false,
        data: params,
        success: planDeleted
    });
}

function planDeleted(xml){
    show_message("Plan Deleted");
    clearAllDialogs();
    backend_populateSavedTrips();
}

function backend_add_event_to_database(cal_event){
        var destination_id = cal_event.available_destination_id;
        
        // TODO see if you can change the code in the next statement in the end to make it simpler
        var params = "command=AddEvent&fromTime=" + cal_event.start.formatDate("d:m:Y:H:i") + "&toTime=" + cal_event.end.formatDate("d:m:Y:H:i")  +"&attractionId="+available_destinations[destination_id].id;

        $.ajax({
            type: "POST",
            url: "PlanAction.do",
            cache: false,
            data: params,
            success: function(xml) {
                $(xml).find("result").each(function() {
                    cal_event.db_id = $(this).text();
                });
            }
        });
}

function backend_delete_event_from_database(cal_event){
    var params = "command=DeleteEvent&id=" + cal_event.db_id;

    $.ajax({
        type: "POST",
        url: "PlanAction.do",
        cache: false,
        data: params
    });
}

function emailEvents() {
    if ($("#loggedin").val()=="true" || $("#loggedin").val()=="facebook") {
        if (emptycalendar) {
            alert("You cannot email an empty calendar");
        }
        else {
            acct_managament_emailTrip();
            var params = "command=EmailPlan";
            $.ajax({
                type: "POST",
                url: "PlanAction.do",
                cache: false,
                data: params,
                success: processEmail
            }); 
        }
        return false;        
    }
    else {
        alert("You must be logged in in order to use this feature");
        return false;
    }
}

function processEmail(xml) {
    if (processErrorMessages('email',xml)) {
        //show message about password changed
    }
}


