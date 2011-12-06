// JavaScript Document

// available_destinations array holds events data that is used to populate calendar events
var available_destinations = new Array();	

// categories holds the categories of course :-)
var categories = new Array();
	
//Ensure that the name attribute here matches the cateogry attribute in available_destinations
function loadCategories(){
    var params = "command=loadCategory";
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: loadCategoryData
    });
}
        
function loadCategoryData(xml) {
    counter = 0;
    $(xml).find("category").each(function() {
        var id = $(this).attr("id");
        var name= $(this).find("name").text();
        var title = $(this).find("title").text();
        var imagef = $(this).find("imagefile").text();
        categories[counter] = {
            id: id,
            name: name,
            title: title,
            image_file_name: imagef
        };
        counter++;
    });   
    populateCategories();
}
            
            
function loadAvailableDestinations(){

    

    var params = "command=getAttractions&fromdate="+escape($("#fromdate").val())+"&howlong="+$("#howlong").val()+"&destination="+$("#destination").val();
    $.ajax({
        type: "POST",
        url: "QueryAction.do",
        cache: false,
        data: params,
        success: loadAvailableDestinationsData
    });
}
        
function loadAvailableDestinationsData(xml) {
    counter = 0;
    $(xml).find("attraction").each(function() {


        var id = $(this).attr("id");
        var aid = $(this).attr("aid");
        var category= $(this).find("category").text();
        var title= $(this).find("title").text();
        var description_short= $(this).find("description_short").text();
        var description_long= $(this).find("description_long").text();
        var image_file_name_small= $(this).find("image_file_name_small").text();
        var image_file_name_large= $(this).find("image_file_name_large").text();
        var wikipedia_url= $(this).find("wikipedia_url").text();
        var postcode= $(this).find("postcode").text();
                
        var links = new Array();
        linkcounter = 0;

        $(this).find("link").each(function() {
            var name= $(this).attr("name");
            var url= $(this).attr("url");
            links[linkcounter] = { name: name, url: url };
            linkcounter++;
        });
                
        var openingtimes = new Array();
        opencounter = 0;

        $(this).find("open").each(function() {
            var fromy = $(this).attr("fromy");
            var fromm = $(this).attr("fromm");
            var fromd = $(this).attr("fromd");
            var fromh = $(this).attr("fromh");
            var fromn = $(this).attr("fromn");

            var toy = $(this).attr("toy");
            var tom = $(this).attr("tom");
            var tod = $(this).attr("tod");
            var toh = $(this).attr("toh");
            var ton = $(this).attr("ton");
            
            openingtimes[opencounter] = {start:new Date(fromy, fromm, fromd, fromh, fromn), end:new Date(toy, tom, tod, toh, ton)};
            opencounter++;
        });             

        available_destinations[id] = {
            aid: aid,
            id:id,
            category: category,
            title: title,
            description_short: description_short,
            description_long: description_long,
            image_file_name_small: image_file_name_small,
            image_file_name_large: image_file_name_large,
            wikipedia_url: wikipedia_url,
            other_links: links,
            opening_hours: openingtimes,
            postcode: postcode
        };
        counter++;  
    }); 
    
    populateCalendar();
}           


