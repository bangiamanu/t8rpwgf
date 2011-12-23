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
	
	function loadAvailableDestinations(){
		/** 
		available_destinations is the array that holds the events. structure is as below. 
		- Ensure that file names have "<name>_smallco.jpg" for small color, "<name>_small.jpg" for non color and <name> for large files. 
		- Description should be less than 140 characters
		- category should be all lower case and be a part of the defined set of categores (TODO: Document this somewhere
		**/
		available_destinations[0] = {
					id:0,
					category: "landmark",
					title: "London eye",
					image_file_name_small: "londoneye_small.jpg",
					image_file_name_large: "londoneye.jpg",
					description: "London eye is the shit. London eye is the shit. London eye is the shit. London eye is the shit. London eye is the shit. ",
					opening_hours: 	[	{start:new Date(year, month, day, 8), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 10), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 10), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "SE17PB"
					};
	
		available_destinations[1] = {
					id:1,
					category: "theatre",
					title: "Lion King",
					description: "Lion King is the shit. Lion King is the shit. Lion King is the shit. Lion King is the shit. Lion King is the shit. ",
					image_file_name_small: "lionking_small.jpg",
					image_file_name_large: "lionking.jpg",
					opening_hours: 	[	{start:new Date(year, month, day, 10), end:new Date(year, month, day, 12)},
										{start:new Date(year, month, day, 14), end:new Date(year, month, day, 16)},
										{start:new Date(year, month, day, 18), end:new Date(year, month, day, 20)},
										{start:new Date(year, month, day + 1, 10), end:new Date(year, month, day + 1, 12)},
										{start:new Date(year, month, day + 1, 14), end:new Date(year, month, day + 1, 16)},
										{start:new Date(year, month, day + 1, 18), end:new Date(year, month, day + 1, 20)},							
										{start:new Date(year, month, day + 2, 10), end:new Date(year, month, day + 2, 12)},
										{start:new Date(year, month, day + 2, 14), end:new Date(year, month, day + 2, 16)},
										{start:new Date(year, month, day + 2, 18), end:new Date(year, month, day + 2, 20)}											
									],
					postcode: "WC2E7DA"
					};

		available_destinations[2] = {
					id:2,
					category: "event",
					title: "Harry Potter Tour",
					description: "Enter the  world of Harry Potter on this  tour of London with a walk, a bus ride, and a cruise on the River Thames!",
					image_file_name_small: "harrypottertour.jpg",
					image_file_name_large: "unavailable.jpg",
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "WC2E7DA"
					};

		available_destinations[3] = {
					id:3,
					category: "event",
					title: "The Medieval Banquet",
					description: "Be the guest of King Henry VIII himself at a  Medieval  party in the  torch-light to a  feast in the   Olde England.",
					image_file_name_small: "medievalbanquet.jpg",
					image_file_name_large: "unavailable.jpg",
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "WC2E7DA"
					};

		available_destinations[4] = {
					id:4,
					category: "landmark",
					title: "London Zoo",
					description: "Meet the hairiest, scariest, tallest and smallest animals on Earth at London Zoo; right in the heart of the UK capital!",
					image_file_name_small: "londonzoo.jpg",
					image_file_name_large: "unavailable.jpg",
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "WC2E7DA"
					};

		available_destinations[5] = {
					id:5,
					category: "daytrip",
					title: "A Day at Epsom Downs Races",
					description: "Take a day out from London to enjoy the 'sport of kings' in the thrilling atmosphere of Epsom on race day.",
					image_file_name_small: "epsomdowns.jpg",
					image_file_name_large: "unavailable.jpg",
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "WC2E7DA"
					};

	}
