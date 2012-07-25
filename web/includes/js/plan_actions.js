/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Called when the new plan button is pressed on toolbar
 */
function plan_actions_new_plan(){
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
    if ($("#loggedin").val() == "true")        
        acct_management_showSavedTrips();
    else
        show_message("You need to be logged in to save. Please login / signup on the top right corner");    
}
/**
 * Called when the save_plan button is pressed on toolbar
 */
function plan_actions_save_plan(){
    if ($("#loggedin").val() == "true")        
        show_message("Your plan is automatically saved everytime you make a change!");
    else
        show_message("You need to be logged in to save. Please login / signup on the top right corner");
}

/**
 * Called when the email_plan button is pressed on toolbar
 */
function plan_actions_email_plan(){
    show_message("Functionality coming soon. For now, please print the plan and email the PDF file :-)");
}

/**
 * Called when the print_plan button is pressed on toolbar
 */
function plan_actions_print_plan(){
    clearAllTips();
    var printWindow=window.open('print_loadpage.jsp','Print','width=600, height=300');
}

/**
 * Called when the share_plan_facebook button is pressed on toolbar
 */
function plan_actions_share_plan_facebook(){
    
}

/**
 * Called when the tweet_planbutton is pressed on toolbar
 */
function plan_actions_tweet_plan(){
        show_message("Functionality coming soon. We support facebook for now");
}