// JavaScript Document

function acct_management_ready(){
	//add_close_buttons_to_dialogs();
}

function acct_management_verify(showX){

	clearAllDialogs();
	$("#white_out").fadeIn();	
	setTimeout("$('#verify').fadeIn()",400);
        if (showX) {
            $("#verifyclose").show();
        }
        else {
            $("#verifyclose").hide();
        }
}

function clearMessages(div) {
   $("#"+div+"message").html(""); 
   $("#"+div+"error").html("");
}

function acct_management_signIn(){
        $("#lpassword").val("");
        clearMessages('login');
	clearAllDialogs();
        
        //test
	$("#white_out").fadeIn();	
	setTimeout("$('#sign_in').fadeIn()",400);
}

function acct_management_signUp(){
        clearMessages('register');
        $("#user_first_name").val("");
        $("#remail").val("");
        $("#rpassword").val("");
        $("#rpassword1").val("");    
	clearAllDialogs();
	$("#white_out").fadeIn();	
	setTimeout("$('#sign_up').fadeIn()",400);
}

function acct_management_forgotPassword(){
	clearAllDialogs();
        clearMessages('forgot');
        $("#femail").val("");        
	$("#white_out").fadeIn();	
	setTimeout("$('#forgot_password').fadeIn()",400);	
}

function acct_management_logOut(){
	backend_logOut();
}

function acct_management_showSavedTrips(){
	clearAllDialogs();
	$("#white_out").fadeIn();	
	setTimeout("$('#saved_trips').fadeIn()",400);
}

function acct_management_showProfile(){
	clearAllDialogs();
        clearMessages('profile');
        $("#old_password").val("");
        $("#new_password").val("");
        $("#new_password1").val("");        
	$("#white_out").fadeIn();	
	setTimeout("$('#profile').fadeIn()",400);
}

function acct_management_createSavedTripsBox(){
	var str = "<table>";
	for (var i in saved_trips){
		var t = saved_trips[i];
		str += "<tr><td rowspan=2><img src='includes/images/" + t.city.toLowerCase() + "_icon.jpg' class='saved_trip_city' height='50px' width='50px' /></td>";
		str += "<td><b>" + t.name + "</b> (" + t.city + ") - <a href='javascript:loadTrip(" + t.id + ")'>Load trip</a> </td></tr>";
		str +=  "<tr><td>" + t.start_date.formatDate('D M j') + " to " +	t.end_date.formatDate('D M j') + "</td></tr>";
		str +=  "<tr><td>&nbsp;</td></tr>";
	}
	str += "</table>";
	
	$("#tabletrips").html(str);
}

function acct_managament_emailTrip() {
    clearMessages('email');
    clearAllDialogs();
    $("#white_out").fadeIn();	
    setTimeout("$('#emailevents').fadeIn()",400);    
}

function clearAllDialogs(){
    $(".white_dialog").fadeOut();
    $("#white_out").fadeOut();
}

/*************************** private functions (shouldnt be called outside this file) **********************************/
function add_close_buttons_to_dialogs(){
	$(".white_dialog").prepend("<div id='close'><img src='includes/images/close.png' id='close_image' onClick='clearAllDialogs()'/></div>");
}

