// JavaScript Document

/********************** Print code **********************/

function print_api_printEvents(){
	var print_events = new Array();

	// Generate a array of events to print
	for (var i in calendar_events){
		var cal_event = calendar_events[i];
		var available_destination = available_destinations[cal_event.available_destination_id];
		
		var print_event={	start: cal_event.start,
							start_date_formatted: cal_event.start.formatDate('l, F jS'),
							start_time_formatted: cal_event.start.formatDate('g:i a'),
							end: cal_event.end,
							end_date_formatted: cal_event.end.formatDate('l, F jS'),
							end_time_formatted: cal_event.end.formatDate('g:i a'),
							title: cal_event.title,
                            marker: cal_event.marker,
							image: available_destination.image_file_name_large,
							postcode: available_destination.postcode,
							description: available_destination.description_short};

		print_events.push(print_event);
	}
	
	
	//Sort that array of events by start date
	print_api_sortEvents(print_events);
	
	//print that array of events
	var printWindow=window.open('','Print','width=800');

	printWindow.document.write('<html><head><title>Popup</title>');
	printWindow.document.write('<link rel="stylesheet" href="includes/css/printout.css" />');
	printWindow.document.write('</head><body>');
	
	//starting content
	printWindow.document.write('<table cellspacing=0 cellpadding=5>');
	var last_date = "";
	
	for (var j in print_events)
	{
		var print_event = print_events[j];
		
		if (last_date != print_event.start_date_formatted){
			printWindow.document.write('<tr><td colspan=3>');
			printWindow.document.write('<p class="date">' + print_event.start_date_formatted + '</p><hr>');
			printWindow.document.write('</td></tr>');
		}
			
		printWindow.document.write('<tr><td width="250px" valign=top>');
		printWindow.document.write('<p class="title">' + print_event.title + '</p>');
		printWindow.document.write('<p class="times">' + print_event.start_time_formatted + ' to ' + print_event.end_time_formatted + '</p>');
		printWindow.document.write('<p class="description">' + print_event.description + '</p>');		
		printWindow.document.write('<p class="description">Postcode: ' + print_event.postcode + '</p>');		
		printWindow.document.write('</td><td width="201px">');
		printWindow.document.write('<img id="image" src="' + print_event.image + '" width="200px" height="200px"/>');		
		printWindow.document.write('</td><td width="201px">');
		printWindow.document.write('<div class="map"><p>Placeholder for map with postcode = ' + print_event.postcode + '</p></div>');		
		printWindow.document.write('</td></tr>');
		
		last_date = print_event.start_date_formatted;
	}
	
	printWindow.document.write('</table>');
	printWindow.document.write('</body></html>');
	printWindow.document.close();
	
}

// Sorts any array of events has based on .start parameter
function print_api_sortEvents(array) {
  var x, y, holder;
  // The Bubble Sort method.
  for(x = 0; x < array.length; x++) {
	for(y = 0; y < (array.length-1); y++) {
	  if(array[y].start > array[y+1].start) {
		holder = array[y+1];
		array[y+1] = array[y];
		array[y] = holder;
	  }
	}
  }
}

// check if the dates are equal
function print_api_dateEquals(date1, date2){
	if (date1.getFullYear() == date2.getFullYear())
		if (date1.getMonth() == date2.getMonth())
			if (date1.getDate() == date2.getDate())
				return true;
	return false;
}
	
