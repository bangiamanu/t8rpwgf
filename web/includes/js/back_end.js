// JavaScript Document
/*

Places to update code
- here
- 


*/
var saved_trips = new Array(); // contains previously saved trips
var days_to_show = 0; // length of calendar
var calendar_start_date = new Date();

function backend_ready(){
	backend_loadCategories();
	//backend_loadAvailableDestinations();
	backend_populateSavedTrips();
	
	days_to_show = $("#howlong").val(); // replace this function with backend code
        var startDateField = $("#fromdate").val().split("/");
        calendar_start_date = new Date(startDateField[2],startDateField[1]-1,startDateField[0]);

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
    $(xml).find("category").each(function() {
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
    populateCategories();
    backend_loadAvailableDestinations();
}


function loadAvailableDestinations(){
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
    $(xml).find("attraction").each(function() {


        var id = $(this).attr("id");
        var aid = $(this).attr("aid");
        var category= $(this).find("category").text();
        var title= $(this).find("title").text();
        var description_short= $(this).find("description_short").text();
        var description_long= $(this).find("description_long").text();
        var image_file_name_small= $(this).find("image_file_name_small").text();
        var image_file_name_large= $(this).find("image_file_name_large").text();
        var wikipedia_url= $(this).find("wikipedia_url").text();
        var postcode= $(this).find("postcode").text();

        var links = new Array();
        linkcounter = 0;

        $(this).find("link").each(function() {
            var name= $(this).attr("name");
            var url= $(this).attr("url");
            links[linkcounter] = { name: name, url: url };
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

            openingtimes[opencounter] = {start:new Date(fromy, fromm, fromd, fromh, fromn), end:new Date(toy, tom, tod, toh, ton)};
            opencounter++;
        });

        available_destinations[id] = {
            aid: aid,
            id:id,
            category: category,
            title: title,
            description_short: description_short,
            description_long: description_long,
            image_file_name_small: "includes/images/data/" + image_file_name_small,
            image_file_name_large: "includes/images/data/" +image_file_name_large,
            wikipedia_url: wikipedia_url,
            other_links: links,
            opening_hours: openingtimes,
            postcode: postcode
        };
        counter++;
    });
    list_api_setCategoryHighlight(getElement("all"));
    calendar_helper_populateCalendar();
}


// populates the available_destinations array - called on document.ready
function backend_loadAvailableDestinations(){
	loadAvailableDestinations(); // replace this function with backend code
}

// called when user clicks signin
function backend_signIn(){
    if ($("#lemail").val()=='') {
        alert("Please enter an email");
        return false;
    }
    if ($("#lpassword").val()=='') {
        alert("Please enter a password");
        return false;
    }
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

function processLogin(xml) {
    if (true) {
	$(".signed_in_or_out").toggle(); // this changes the toolbar from signed out to signed in and vice versa.
	backend_populateSavedTrips();        
    }
    else {
        //show errors
    }
}

// called when user clicks signup
function backend_signUp(){
    if ($("#remail").val()=='') {
        alert("Please enter an email");
        return false;
    }
    if ($("#rpassword").val()=='') {
        alert("Please enter a password");
        return false;
    }
    if ($("#rpassword").val()!=$("#rpassword1").val()) {
        alert("Password should be the same");
        return false;
    }
    var params = "command=NewUser&name="+$("#user_first_name").val()+"&email="+$("#remail").val()+"&password="+$("#rpassword").val();
    $.ajax({
        type: "POST",
        url: "LoginAction.do",
        cache: false,
        data: params,
        success: processSignup
    }); 
    return false;
}

function processSignup(xml) {
    if (true) {
        $("#vemail").val($("#remail").val());
        acct_management_verify();
    }
    else {
        //show errors
    }
}

function backend_verify(){
    if ($("#vemail").val()=='') {
        alert("Please enter an email");
        return false;
    }
    if ($("#vcode").val()=='') {
        alert("Please enter the code provided in the email");
        return false;
    }    var params = "command=VerifyUser&email="+$("#vemail").val()+"&code="+$("#vcode").val();
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
    if (true) {
        //show message about successful verify
        //complete login
    }
    else {
        //show errors
    }    
}

function backend_forgotPassword(){
    if ($("#femail").val()=='') {
        alert("Please enter an email");
        return false;
    }
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
    if (true) {
        //show message
        $("#lemail").val($("#femail").val());
        $("#lpassword").val("");
        acct_management_signIn();
    }
    else {
        //show errors
    }    
}

function backend_changePasswords() {
    if ($("#old_password").val()=='') {
        alert("Please enter your old password");
        return false;
    }
    if ($("#new_password").val()=='') {
        alert("Please enter a new password");
        return false;
    }
    if ($("#new_password").val()!=$("#new_password1").val()) {
        alert("New Password should be the same");
        return false;
    }
    var params = "command=ChangePassword&password="+$("#old_password").val()+"&newpassword="+$("#new_password").val();
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
    if (true) {
        //show message about password changed
    }
    else {
        //show errors
    }
}

// called when user clicks signin and is supposed to populate the saved_trips array
function backend_populateSavedTrips(){
	// populate the saved_trips array
	
	saved_trips[0] = {name:"Untitled1", city:"London", start_date: new Date(), end_date: new Date()};
	saved_trips[1] = {name:"Untitled2", city:"Barcelona", start_date: new Date(), end_date: new Date()};
	saved_trips[2] = {name:"Untitled3", city:"Prague", start_date: new Date(), end_date: new Date()};
	
	acct_management_createSavedTripsBox();
}

function backend_logOut(){
    var params = "command=Logout";
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: processLogout
    });
}

function processLogout(xml) {
    $(".signed_in_or_out").toggle();
}