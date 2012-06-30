/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Called when the new plan button is pressed on toolbar
 */
function plan_actions_new_plan(){
        calendar_and_map_api_deleteAllEvents(-1);
        show_message("Plan has been cleared. You can access any old plans by clicking Open");
}

/**
 * Called when the open_plan button is pressed on toolbar
 */
function plan_actions_open_plan(){
    acct_management_showSavedTrips();
}
/**
 * Called when the save_plan button is pressed on toolbar
 */
function plan_actions_save_plan(){
    show_message("Your plan is automatically saved everytime you make a change!");
}

/**
 * Called when the email_plan button is pressed on toolbar
 */
function plan_actions_email_plan(){
    
}

/**
 * Called when the print_plan button is pressed on toolbar
 */
function plan_actions_print_plan(){
    var printWindow=window.open('print.jsp','Print','width=800');
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
    
}