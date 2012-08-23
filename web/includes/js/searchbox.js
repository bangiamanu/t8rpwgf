/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function searchbox_ready(){
    $("#search_box").bind('click', searchbox_click);
    $("#search_box").bind('keyup', searchbox_keyup);
}

function searchbox_click(){
    if ($("#search_box").val() == "Search")
        $("#search_box").val("");
}

function searchbox_keyup(){
    if ($("#search_box").val().length > 1)
        searchbox_search($("#search_box").val());
}

function searchbox_search(search_phrase){
  var search_results = new Array();
  search_phrase = search_phrase.toLowerCase();
  
  // this is the index where short descriptions are added
  var desc_short_index = 0;


  for (var i in available_destinations){
      var dest = available_destinations[i];
      if (dest.title.toLowerCase().indexOf(search_phrase) != -1){
          search_results.splice(0,0,dest);  // if its in title, it goes first
          desc_short_index++;
      }
      else if (dest.description_short.toLowerCase().indexOf(search_phrase) != -1){
          search_results.splice(desc_short_index,0,dest); // if its in short description, it goes second
          desc_short_index++;
    }
      else if (dest.description_long.toLowerCase().indexOf(search_phrase) != -1)
          search_results.push(dest);
  }
  
  searchbox_showResults(search_results, search_phrase);
}

/**
 * Shows the results stored in search_results in the list
 */
function searchbox_showResults(search_results, search_phrase){
    list_api_populateDestinations(search_results, search_phrase);
    list_api_clearCategory();
    searchbox_highlightSearchPhraseForLongDescription();
}

function searchbox_highlightSearchPhrase(destination_id, search_phrase){
    
    // TITLE
    // Accounting for case sensitivity
    var title = available_destinations[destination_id].title;
    var index = title.toLowerCase().indexOf(search_phrase.toLowerCase());
    
    if (index != -1){
        var replacement_string = title.substring(index, index + search_phrase.length);

        $("#" + destination_id + " > .destinationtitle")
            .html(
                $("#" + destination_id + " > .destinationtitle")
                    .html().replace(
                        replacement_string, "<span class='highlight_text'>" + replacement_string + "</span>"
                    )
            )
        return;
    }
    
    // SHORT DESCRIPTION
    var description_short = available_destinations[destination_id].description_short;
    index = description_short.toLowerCase().indexOf(search_phrase.toLowerCase());
    
    if (index != -1){
        replacement_string = description_short.substring(index, index + search_phrase.length);

        $("#" + destination_id + " > .destinationdescription")
            .html(
                $("#" + destination_id + " > .destinationdescription")
                    .html().replace(
                        replacement_string, "<span class='highlight_text'>" + replacement_string + "</span>"
                    )
            )
        return;
    }
}

function searchbox_highlightSearchPhraseForLongDescription(){
    // LONG DESCRIPTION
    var search_phrase = $("#search_box").val();
    
    if (current_destination_id != null){
        var description_long = available_destinations[current_destination_id].description_long;
        if (description_long!=null){
            var index = description_long.toLowerCase().indexOf(search_phrase.toLowerCase());

            if (index != -1){
                var replacement_string = description_long.substring(index, index + search_phrase.length);

                $("#description_long")
                    .html(
                        description_long.replace(
                                replacement_string, "<span class='highlight_text'>" + replacement_string + "</span>"
                            )
                    )
            }
        }
    }
}