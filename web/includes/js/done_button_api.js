// JavaScript Document
var is_done_menu_visible = false;


/**************************************** Done Button *************************************/

function done_button_api_ready(){
	done_button_api_setDoneToTranslucent();	
}

function done_button_api_showDoneButton(){
	$("#done_button").toggle(true);
	if (is_done_menu_visible)
		$("#done_menu").toggle(true);
}

function done_button_api_hideDoneButton(){
	$("#done_button").toggle(false);		
	if (is_done_menu_visible)
		$("#done_menu").toggle(false);
}

function done_button_api_showDoneMenu(){
	is_done_menu_visible = true; 
	$("#done_menu").show(500, 'swing');
}

function done_button_api_hideDoneMenu(){
	is_done_menu_visible = false; 
	$("#done_menu").hide(500,'swing');
}

function done_button_api_toggleDoneMenu(){
	if (!is_done_menu_visible)
		done_button_api_showDoneMenu();
	else		
		done_button_api_hideDoneMenu();
}

function done_button_api_setDoneToOpaque(){
	set_done_button_opacity(1);
	set_done_menu_opacity(1);
}

function done_button_api_setDoneToTranslucent(){
	set_done_button_opacity(0.4);
	set_done_menu_opacity(0.4);
}

/*************************** private functions (shouldnt be called outside this file) **********************************/


function set_done_button_opacity(num){
	$("#done_button").css({ opacity: num });
}

function set_done_menu_opacity(num){
	$("#done_menu").css({ opacity: num });
}

