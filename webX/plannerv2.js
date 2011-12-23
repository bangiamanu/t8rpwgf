// JavaScript Document

/************************* category highlight code *************************/

function getElement(name) {
    return document.getElementById(name);
}

//onmouseover
function highlightCategory(el){
	el.style.backgroundImage="url(categoryhighlight.jpg)";	
}

//onmouseout
function removeCategoryHighlight(el){
	if (el.id != getElement("selectedcategory").value)
		el.style.backgroundImage = null;
}

//onclick
function setCategoryHighlight(clickedcategory){
	// Get the last category that was selected (if any)
	lastselectedcategory = null;
	if (getElement("selectedcategory").value!="")
		lastselectedcategory = getElement(getElement("selectedcategory").value);

	// Set the clicked category to selected
	getElement("selectedcategory").value = clickedcategory.id;
	highlightCategory(clickedcategory);
	
	// Remove background from last selected category (if any)
	if (lastselectedcategory != null)
		if (lastselectedcategory.id != clickedcategory.id)
			removeCategoryHighlight(lastselectedcategory);
}

/************************* Ticket totals code *************************/

function updateTotal(el){
	
	// update hidden field totalattendees and totalmoney
	totalattendees = getElement("totalattendees");
	totalmoney = getElement("totalmoney");
	
	if (el.checked){
		totalattendees.value++;
		totalmoney.value = parseFloat(totalmoney.value) + parseFloat(el.value);
	}
	else{
		totalattendees.value--;			
		totalmoney.value = parseFloat(totalmoney.value) - el.value;
	}
	
	// update HTML on the left side
	getElement("totalmoneyhtml").innerHTML = totalmoney.value;
	getElement("totalattendeeshtml").innerHTML = totalattendees.value;
	
	// grey out Add button if 0 attendees
	getElement("Save").disabled = (totalattendees.value==0) ;
}


// dynamically resizing map and calendar windows
window.onload = function(){
	// some widths and heights are controlled by JS
	// The other two lines set the category and the destination
	divsResize();
	firstcategory = getElement("event");
	firstdestination = getElement("londonzoo1");
	setCategoryHighlight(firstcategory);
	setDestinationHighlight(firstdestination);
};

 
window.onresize = function(){
	divsResize();
};


function divsResize(){	
    calendarcontainer = document.getElementById('calendarcontainer');
    mapcontainer = document.getElementById('mapcontainer');
	categorydescriptioncolumn = document.getElementById('categorydescriptioncolumn');

	calendarcontainer.style.width= (window.innerWidth - 400).toString() + "px";
	calendarcontainer.style.height = (window.innerHeight - 359).toString() + "px";
	
	mapcontainer.style.width = (window.innerWidth - 475).toString() + "px";
	
	categorydescriptioncolumn.style.height =(window.innerHeight - 100).toString() + "px";
}


/********************** Destination highlight code **********************/

//onmouseover
function highlightDestination(destination){
	destination.style.backgroundImage="url(destinationhighlight.jpg)";
	
	imagename = destination.childNodes[3].src.substring(0,destination.childNodes[3].src.length - 4);
	imageextension = destination.childNodes[3].src.substring(destination.childNodes[3].src.length - 6, destination.childNodes[3].src.length);
	
	if (imageextension != "co.jpg"){	
		destination.childNodes[3].src = imagename + "co.jpg";
	}
}

//onmouseout
function removeDestinationHighlight(destination){
	if (destination.id != getElement("selecteddestination").value){
		destination.style.backgroundImage = null;
	
		imagename = destination.childNodes[3].src.substring(0,destination.childNodes[3].src.length - 4);
		imageextension = destination.childNodes[3].src.substring(destination.childNodes[3].src.length - 6, destination.childNodes[3].src.length);
			
		if (imageextension == "co.jpg"){	
			destination.childNodes[3].src = imagename.substring(0, imagename.length-2) + ".jpg";
		}	
	}
}

//onclick
function setDestinationHighlight(clickeddestination){
	// Get the last category that was selected (if any)
	lastselecteddestination = null;
	if (getElement("selecteddestination").value!="")
		lastselecteddestination = getElement(getElement("selecteddestination").value);

	// Set the clicked category to selected
	getElement("selecteddestination").value = clickeddestination.id;
	highlightDestination(clickeddestination);

	// Remove background from last selected category (if any)
	if (lastselecteddestination != null)
		if (lastselecteddestination.id != clickeddestination.id)
			removeDestinationHighlight(lastselecteddestination);	
}

/********************** destination details popup ************************/
function showDestinationDetails(element){
	animatedcollapse.show('destinationdetailscolumn')
}
function hideDestinationDetails(element){
	animatedcollapse.hide('destinationdetailscolumn')
}