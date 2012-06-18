// JavaScript Document

var is_contracted = false;

function sizing_ready(){
	sizing_divsResize();
}

function sizing_divsResize(){	
    var calendarcontainer = document.getElementById('calendarcontainer');
    var mapcontainer = document.getElementById('mapcontainer');
    var categorydescriptioncolumn = document.getElementById('categorydescriptioncolumn');
    var destination_details_pane = document.getElementById('destination_details_pane');
    var large_image = document.getElementById('large_image');
    var guidebox3 = document.getElementById('guidebox3');
    var guidebox3text = document.getElementById('guidebox3text');
    //var pre_loaded_plans_choicebox = getElement('pre_loaded_plans_choicebox');

    if (!is_contracted){
            calendarcontainer.style.width= (window.innerWidth - 395).toString() + "px";
            mapcontainer.style.width = (window.innerWidth - 395).toString() + "px";
            //pre_loaded_plans_choicebox.width = (window.innerWidth - 395 - 400).toString() + "px";
    }
    else{
            calendarcontainer.style.width= (window.innerWidth - 395 - 195).toString() + "px";
            mapcontainer.style.width = (window.innerWidth - 395 - 195).toString() + "px";	
    }

    if (window.innerWidth < 1400)
            zoom_level = 12;
    else
            zoom_level = 13;


    categorydescriptioncolumn.style.height =(window.innerHeight - 100).toString() + "px";
    destination_details_pane.style.height =(window.innerHeight - 40).toString() + "px";

    guidebox3.style.height = parseInt(window.innerHeight * 0.55 - 20 -40).toString() + "px";
    guidebox3text.style.bottom = parseInt(window.innerHeight * 0.45 + 30).toString() + "px";
}


function sizing_contract(){
	is_contracted = true;
	
	$(".category_icon").animate({width:"50px",height:"45px"}, 500, 'swing');
	$("#categorynamecolumn").animate({width:"110px"}, 500, 'swing');

	$("#categorydescriptionheading").animate({width:"205px", left:"111px", height:"57px"}, 500, 'swing');
	$("#categorydescriptioncolumn").animate({width:"205px", left:"111px", top:"115px"}, 500, 'swing');

	$("#mapcontainer").animate({width:"" + parseInt(window.innerWidth - 395 - 195) +"px", left:"568px"}, 500, 'swing');
	$("#calendarcontainer").animate({width:"" + parseInt(window.innerWidth - 395 - 195) +"px", left:"568px"}, 500, 'swing');
	
	$("#destination_details_pane").toggle(500, 'swing');
	
	sizing_setUpMoreLink();
	calendar_and_map_api_refreshCurrentInfoWindow();
}

function sizing_expand(){
	is_contracted = false;

	$(".category_icon").animate({width:"55px",height:"50px"}, 500, 'swing');
	$("#categorynamecolumn").animate({width:"120px"}, 500, 'swing');

	$("#categorydescriptionheading").animate({width:"250px", left:"121px", height:"42px"}, 500, 'swing');
	$("#categorydescriptioncolumn").animate({width:"250px", left:"121px", top:"100px"}, 500, 'swing');

	$("#mapcontainer").animate({width:"" + parseInt(window.innerWidth - 395) +"px", left:"373px"}, 500, 'swing');
	$("#calendarcontainer").animate({width:"" + parseInt(window.innerWidth - 395) +"px", left:"373px"}, 500, 'swing');
	
	$("#destination_details_pane").toggle(500, 'swing');

	sizing_setUpMoreLink();
	calendar_and_map_api_refreshCurrentInfoWindow();
}


function sizing_setUpMoreLink(){
	if (current_destination_id != null)
	{
		// remove previous more links
		$(".more_link").remove()
	
		// add "More>>" link if it doesnt already exist
		if ($("#" + current_destination_id + " > .more_link").length ==0){
			if (is_contracted)
				$("#" + current_destination_id).prepend("<a href='javascript:sizing_expand()' class='more_link'>" + "&lt;&lt;" + " Less </a>");
			else
				$("#" + current_destination_id).prepend("<a href='javascript:sizing_contract()' class='more_link'> More &gt;&gt; </a>");
		}
	}
}