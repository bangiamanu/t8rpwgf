// JavaScript Document

	// available_destinations array holds events data that is used to populate calendar events
	var available_destinations = new Array();	
	
	// categories holds the categories of course :-)
	var categories = new Array();
	
	function loadCategories(){
		categories[0] = {
			id: 0,
			name: "theatre",
			title: "Watch theatre",
			image_file_name: "theatrenotepaper.png"
		};
		categories[1] = {
			id: 1,
			name: "museum",
			title: "Goto a museum",
			image_file_name: "museumnotepaper.png"
		};
		categories[2] = {
			id: 2,
			name: "landmark",
			title: "Visit a landmark",
			image_file_name: "landmarknotepaper.png"
		};
		categories[3] = {
			id: 3,
			name: "restaurant",
			title: "Eat a nice meal",
			image_file_name: "restaurantnotepaper.png"
		};
		categories[4] = {
			id: 4,
			name: "daytrip",
			title: "Take a day trip",
			image_file_name: "daytripnotepaper.png"
		};
		categories[5] = {
			id: 5,
			name: "theatre",
			title: "Watch Theatre",
			image_file_name: "theatrenotepaper.png"
		};
		categories[6] = {
			id: 6,
			name: "events",
			title: "Latest happenings",
			image_file_name: "eventsnotepaper.png"
		};
		categories[7] = {
			id: 7,
			name: "custom",
			title: "Set my own event",
			image_file_name: "customnotepaper.png"
		};
	}
	
