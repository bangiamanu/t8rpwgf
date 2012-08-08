/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Called when the new plan button is pressed on toolbar
 */

var printing_next = false;

function plan_actions_new_plan(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'New']);
    
    calendar_and_map_api_deleteAllEvents(false);
    show_message("Plan has been cleared. You can access any old plans by clicking Open");
    var params = "command=NewPlan";
    $.ajax({
        type: "POST",
        url: "PlanAction.do",
        cache: false,
        data: params,
        success: function(xml) {
        }
    });    
}

/**
 * Called when the open_plan button is pressed on toolbar
 */
function plan_actions_open_plan(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Open']);

    if ($("#loggedin").val() == "true")        
        acct_management_showSavedTrips();
    else
        show_message("You need to be logged in to save. Please login / signup on the top right corner");    
}
/**
 * Called when the save_plan button is pressed on toolbar
 */
function plan_actions_save_plan(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Save']);

    if ($("#loggedin").val() == "true")        
        show_message("Your plan is automatically saved everytime you make a change!");
    else
        show_message("You need to be logged in to save. Please login / signup on the top right corner");
}

/**
 * Called when the email_plan button is pressed on toolbar
 */
function plan_actions_email_plan(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Email']);
    
    if ($("#loggedin").val()=="true") {
        if (emptycalendar) {
            show_message("You cannot email an empty calendar");
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
        show_message("You must be logged in in order to use this feature. Please login from the upper right corner.");
        return false;
    }
}

function processEmail(xml) {
    if (processErrorMessages('email',xml)) {
        //show message about password changed
    }
}


/**
 * Called when the print_plan button is pressed on toolbar
 */
function plan_actions_print_plan(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Print']);
    
    clearAllTips();
    if (emptycalendar) {
        show_message("You cannot print an empty calendar");
    }
    else if ($("#home_info_postcode").val() == ""){
        printing_next = true;
        plan_actions_set_home_info("");
    }
    else{        
        var printWindow=window.open('print_loadpage.jsp','Print','width=700, height=300');
    }
}

/**
 * Called when the Ics button is pressed on toolbar
 */
function plan_actions_create_plan_ics(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Ics']);
    
    clearAllTips();
    if (emptycalendar) {
        show_message("You cannot download an empty calendar");
    }
    else{
        var printWindow=window.open('print_ics.jsp','Print','width=700, height=300');
    }
}

/**
 * Called when the share_plan_facebook button is pressed on toolbar
 */
function plan_actions_share_plan_facebook(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Facebook']);
    
    facebook_shareEvents();
}

/**
 * Called when the tweet_planbutton is pressed on toolbar
 */
function plan_actions_tweet_plan(){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Tweet']);
    
    show_message("Functionality coming soon. We support facebook for now");
}

/**
 * Called when the set home info is pressed on toolbar
 */
function plan_actions_set_home_info(error){
    //tracking code
    _gaq.push(['_trackEvent', 'Toolbar', 'Home_Info']);
    
    if (error!=null)
        $("#homeerror").html("<p>" + error + "</p><br/>");
    
    clearAllDialogs();
    $("#white_out").fadeIn();	
    setTimeout("$('#home_info').fadeIn()",400);
}

function plan_actions_skipPrinting(){
    clearAllDialogs();
    if (printing_next){
        var printWindow=window.open('print_loadpage.jsp','Print','width=700, height=300');
        printing_next = false;
    }    
}