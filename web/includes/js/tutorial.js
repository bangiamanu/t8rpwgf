/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/********************** Tutorial code **********************/
function showElement(name) {
    getElement(name).style.display = 'block';
}

function hideElement(name) {
    getElement(name).style.display = 'none';
}

function refreshSteps(){
	if (showing_steps){

		hideAllSteps();

		if (current_step == "step1"){
			showElement('white_out_step1');
                        $("#guidebox1text").show();
                        $("#guidebox1text").animate({opacity:1, top:51, left:131, width:250, height:100},1000);
		}

		if (current_step == "step2"){
			showElement('white_out_step2');
			showElement('guidebox2text');
		}

		if (current_step == "step3"){
			showElement('white_out_step3');
			showElement('guidebox3text');
		}

		if (current_step == "step4"){
                    $("#print_tip").attr("style","left:450px; top:80px; display:block;")
                    $("#print_plan").attr("style","border:3px red solid;");
                    $("#pre_loaded_plans_choicebox").attr("style","border:3px red solid;width:100%");
                    $("#pre_loaded_tip").attr("style","left:65%; top:80px; display:block;");
                    $("#more_info_link").attr("style","border:3px red solid;");
                    $("#more_info_tip").attr("style","left:50%;top:48%;display:block;");
                    setTimeout(clearAllTips, 15000);
		}
	}
}

function hideAllSteps(){
	hideElement('white_out_step1');
	hideElement('white_out_step2');
	hideElement('white_out_step3');
	hideElement('guidebox1text');
	hideElement('guidebox2text');
	hideElement('guidebox3text');
}

function endTutorial(){
	current_step = "none";
	showing_steps = false;
	hideElement('white_out_step1');
        $("#guidebox1text").animate({opacity:0, top:0, left:($(window).width() - 200), width:0, height:0},1000);
        $(".tutorial").show(1000);
}

function startTutorial(){
	showing_steps = true;
	current_step = "step1";
	refreshSteps();
        $(".tutorial").hide(1000);

}

function clearAllTips(){
    if (showing_steps){
        $(".tipbox").fadeOut('slow');
        $("#pre_loaded_plans_choicebox").attr("style","width:100%");
        $("#print_plan").attr("style","border:none;");
        $("#more_info_link").attr("style","border:none;");
        $(".tutorial").show(1000);
        showing_steps = false;
    }
}


