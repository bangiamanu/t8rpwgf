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
			showElement('guidebox1');
			showElement('guidebox1text');
		}

		if (current_step == "step2"){
			showElement('guidebox2');
			showElement('guidebox2text');
		}

		if (current_step == "step3"){
			showElement('guidebox3');
			showElement('guidebox3text');
		}

		if (current_step == "step4"){
			showElement('guidebox4text');
		}
	}
}

function hideAllSteps(){
	hideElement('guidebox1');
	hideElement('guidebox1text');
	hideElement('guidebox2');
	hideElement('guidebox2text');
	hideElement('guidebox3');
	hideElement('guidebox3text');
	hideElement('guidebox4text');
}

function endTutorial(){
	current_step = "none";
	refreshSteps();
	showing_steps = false;
}

function startTutorial(){
	showing_steps = true;
	current_step = "step1";
	refreshSteps();
}


