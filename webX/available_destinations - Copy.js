// JavaScript Document

	// available_destinations array holds events data that is used to populate calendar events
	var available_destinations = new Array();	

	// categories holds the categories of course :-)
	var categories = new Array();
	
	//Ensure that the name attribute here matches the cateogry attribute in available_destinations
	function loadCategories(){
		categories[0] = {
			id: 0,
			name: "art",
			title: "Art and theatre",
			image_file_name: "theatrenotepaper.png"
		};
		categories[1] = {
			id: 1,
			name: "landmark",
			title: "Visit a landmark",
			image_file_name: "landmarknotepaper.png"
		};
		categories[2] = {
			id: 2,
			name: "outdoors",
			title: "Something outdoorsy",
			image_file_name: "outdoorsnotepaper.png"
		};
		categories[3] = {
			id: 3,
			name: "romantic",
			title: "A little romance",
			image_file_name: "romancenotepaper.png"
		};
		categories[4] = {
			id: 4,
			name: "restaurant",
			title: "Eat a nice meal",
			image_file_name: "restaurantnotepaper.png"
		};
		categories[5] = {
			id: 5,
			name: "daytrip",
			title: "Take a day trip",
			image_file_name: "daytripnotepaper.png"
		};
		categories[6] = {
			id: 6,
			name: "events",
			title: "Latest happenings",
			image_file_name: "eventsnotepaper.png"
		};
		categories[7] = {
			id: 7,
			name: "all",
			title: "All destinations",
			image_file_name: "allnotepaper.png"
		};
	}

		
	function loadAvailableDestinations(){
		/** 
		available_destinations is the array that holds the events. structure is as below. 
		- Ensure that file names have "<name>_smallco.jpg" for small color, "<name>_small.jpg" for non color and <name> for large files.
		- description_short should be less than 140 characters
		- description_long should be less than 140 words
		- category should be all lower case and be one of the names in categories array
		**/
		available_destinations[0] = {
					id:0,
					category: "landmark",
					title: "London eye",
					description_short: "London eye is the shit. London eye is the shit. London eye is the shit. London eye is the shit. London eye is the shit. ",
					description_long: "<p>The EDF Energy London Eye is a giant 135-metre (443 ft) tall Ferris wheel situated on the banks of the River Thames, in London, England. Since 20 January 2011, it has been officially known as the EDF Energy London Eye following a three-year sponsorship deal.</p><br><p>It is the tallest Ferris wheel in Europe, and the most popular paid tourist attraction in the United Kingdom, visited by over 3.5 million people annually. When erected in 1999, it was the tallest Ferris wheel in the world, until surpassed first by the 160 m (520 ft) Star of Nanchang in 2006, and then the 165 m (541 ft) Singapore Flyer in 2008. It is still described by its operators as \"the world's tallest cantilevered observation wheel\" (as the wheel is supported by an A-frame on one side only, unlike the Nanchang and Singapore wheels).</p>",
					image_file_name_small: "londoneye_small.jpg",
					image_file_name_large: "londoneye.jpg",
					wikipedia_url: "http://en.m.wikipedia.org/wiki?search=london+eye",
					other_links: [	{name: "Official Website", url: "http://www.londoneye.com/"},
									{name: "TripAdvisor", url: "http://www.tripadvisor.co.uk/Attraction_Review-g186338-d553603-Reviews-The_London_Eye-London_England.html"},					
									{name: "Time Out", url: "http://www.timeout.com/london/museums-attractions/event/63994/london-eye"}],
					opening_hours: 	[	{start:new Date(year, month, day, 8), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 10), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 10), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "SE17PB"
					};
	
		available_destinations[1] = {
					id:1,
					category: "art",
					title: "Lion King",
					description_short: "Lion King is the shit. Lion King is the shit. Lion King is the shit. Lion King is the shit. Lion King is the shit. ",
					description_long: "<p>The Lion King is a musical based on the 1994 Disney animated film of the same name with music by Elton John and lyrics by Tim Rice along with the musical score created by Hans Zimmer with choral arrangements by Lebo M. Directed by Julie Taymor, the musical features actors in animal costumes as well as giant, hollow puppets. The show is produced by Disney Theatrical.</p><br><p>The musical debuted July 8, 1997, in Minneapolis, Minnesota at the Orpheum Theatre, and was an instant success before premiering on Broadway at the New Amsterdam Theater on October 15, 1997 in previews with the official opening on November 13, 1997. On June 13, 2006, the Broadway production moved to the Minskoff Theatre to make way for the musical version of Mary Poppins, where it is still running after more than 5,350 performances. It is now Broadway's seventh longest-running show in history.</p>",
					image_file_name_small: "lionking_small.jpg",
					image_file_name_large: "lionking.jpg",
					other_links: [	{name: "Official Website", url: "http://lionking.com/"},
									{name: "TripAdvisor", url: "http://www.tripadvisor.com/Attraction_Review-g186338-d1766159-Reviews-The_Lion_King-London_England.html"},					
									{name: "Time Out", url: "http://www.timeout.com/london/theatre/event/112211/the-lion-king"}],
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
					description_short: "Enter the  world of Harry Potter on this  tour of London with a walk, a bus ride, and a cruise on the River Thames!",
					description_long: "<p>Harry Potter is a series of seven fantasy novels written by the British author J. K. Rowling. The books chronicle the adventures of the adolescent wizard Harry Potter and his best friends Ron Weasley and Hermione Granger, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's quest to overcome the evil dark wizard Lord Voldemort, whose aim is to subjugate non-magical people, conquer the wizarding world, and destroy all those who stand in his way, especially Harry Potter.</p><br><p>Since the 30 June 1997 release of the first novel Harry Potter and the Philosopher's Stone, the books have gained immense popularity, critical acclaim and commercial success worldwide. The series has also had some share of criticism, including concern for the increasingly dark tone.</p>",
					image_file_name_small: "harrypottertour_small.jpg",
					image_file_name_large: "harrypottertour.jpg",
					other_links: [	{name: "Viator", url: "http://www.viator.com/England-tourism/Harry-Potter-Tours-tours-tickets/d731-t2934?pref=02&aid=g3145"},
									{name: "TripAdvisor", url: "http://www.tripadvisor.com/ShowUserReviews-g186338-d1756413-r61232342-London_Taxi_Tour-London_England.html"},
									{name: "British Tours", url: "http://www.britishtours.com/en/special_interest/harry_potter_london_and_oxford"}],
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "NW14SN"
					};

		available_destinations[3] = {
					id:3,
					category: "event",
					title: "The Medieval Banquet",
					description_short: "Be the guest of King Henry VIII himself at a  Medieval  party in the  torch-light to a  feast in the   Olde England.",
					description_long: "<p>Centrally located in the beautiful and historic St Katharine Docks alongside the River Thames, just a two minute walk from Tower Bridge and the Tower of London. Join Henry VIII and his court of knights, troubadours, contortionists, magicians, jugglers, minstrels and medieval tumblers at this most royal of banquets and enjoy a four course feast with ale and wine brought to your table throughout the meal by our dancing wenches.</p><br><p>Our banquets are cooked in house using fresh ingredients led by our Head Chef. After the banquet our enthusiastic guests are keen to get up and have a dance themselves so we play club music till late</p>",
					image_file_name_small: "medievalbanquet_small.jpg",
					image_file_name_large: "medievalbanquet.jpg",
					other_links: [	{name: "Official Website", url: "http://www.medievalbanquet.com/"},
									{name: "Viator", url: "http://www.viator.com/tours/London/Medieval-Banquet-and-Merriment-by-Torchlight-in-London/d737-3858EE051/TR"},
									{name: "london-eating", url: "http://www.london-eating.co.uk/2855.htm"}],
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "E1W1LA"
					};

		available_destinations[4] = {
					id:4,
					category: "landmark",
					title: "London Zoo",
					description_short: "Meet the hairiest, scariest, tallest and smallest animals on Earth at London Zoo; right in the heart of the UK capital!",
					description_long: "<p>London Zoo is the world's oldest scientific zoo. It was opened in London on 27 April 1828, and was originally intended to be used as a collection for scientific study. It was eventually opened to the public in 1847. Today it houses a collection of 755 species of animals, with 16,802 individuals, making it one of the largest collections in the United Kingdom.</p><br><p>It is managed under the aegis of the Zoological Society of London (established in 1826), and is situated at the northern edge of Regent's Park, on the boundary line between City of Westminsterand Camden (the Regent's Canal runs through it). The Society also has a more spacious site at ZSL Whipsnade Zoo in Bedfordshire to which the larger animals such as elephants and rhinos have been moved.</p>",
					image_file_name_small: "londonzoo_small.jpg",
					image_file_name_large: "londonzoo.jpg",
					other_links: [	{name: "Official Website", url: "http://www.zsl.org/zsl-london-zoo/"},
									{name: "UK Tourist Information", url: "http://www.tourist-information-uk.com/london-zoo.htm"}],
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "NW14RY"
					};

		available_destinations[5] = {
					id:5,
					category: "daytrip",
					title: "A Day at Epsom Downs Races",
					description_short: "Take a day out from London to enjoy the 'sport of kings' in the thrilling atmosphere of Epsom on race day.",
					description_long: "Experience world-class racing with a fantastic view of the racecourse and London skyline at Epsom Downs Racecourse.With impressive state-of-the-art conference and events facilities available all year around, Epsom Downs Racecourse is the perfect stage to host, impress and indulge your guests. We have evolved into one of the leading wedding reception venues in the UK and with our ample hospitality options; you and your guests are certain to have a memorable experience.",
					image_file_name_small: "epsomdowns_small.jpg",
					image_file_name_large: "epsomdowns.jpg",
					other_links: [	{name: "Official Website", url: "http://www.epsomderby.co.uk/"},],
					opening_hours: 	[	{start:new Date(year, month, day, 9), end:new Date(year, month, day, 17)},
										{start:new Date(year, month, day + 1, 9), end:new Date(year, month, day + 1, 17)},
										{start:new Date(year, month, day + 2, 9), end:new Date(year, month, day + 2, 17)},	
										{start:new Date(year, month, day + 3, 9), end:new Date(year, month, day + 3, 17)}	
									],
					postcode: "KT185LQ"
					};

	}
