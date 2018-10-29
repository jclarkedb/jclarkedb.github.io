$(document).ready(function() {
  $("button").on("click", function() {
    
    $(".results-container").empty(); //empty results container incase previous search has been performed
    
    //define link parameters for API
    var linkAPI = "https://en.wikipedia.org/w/api.php";
    linkAPI += "?" + $.param({
	  "action": "opensearch",
	  "format": "json",
	  "search": $(":input").val(),
	  "namespace": "*",
	  "limit": "10",
	  "suggest": 1
    });
    
    //get JSON data
    $.ajax({
      type: "GET",
      url: linkAPI,
      dataType: "jsonp",
      success: function(json) {
        //if connection successful process data
        if (json[1].length >= 1) { //if search returns results
        for(var i = 0; i < json[1].length; i++) {
          $(".results-container").append("<a href='" + json[3][i] +"' target='_blank'><div class='card mb-3'><div class='card-body'><h5 class='card-title'>" + json[1][i] + "</h5><p class='card-text'>" + json[2][i] + "</p></div></div></a>");
        } 
        //once results have been displayed, scroll to the results container
        $("body, html").animate({ 
          scrollTop: $(".results-container").offset().top - 10
        }, 800);
      } else { //if search returns no results
          $(".results-container").html("<h3 class='failed'>Sorry. Your search did not return any results. Please try again</h3>");
        }
      }
    });
    $("#search").val(""); //clear search box
  });
  //if user presses enter key then perform search
  $("#search").keypress(function(e) {
    if(e.which == 13) {
      $("button").click();
    };
  });
})