$(document).ready(function() {
  
  //usernames of those to check
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  //declare variables
  var onlineOffline = "";
  var game = "";
  var displayName = "";
  
  
  for (var i = 0; i < streamers.length; i++) {
  //for each username:
    //connect to the twitch API and retreive data
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/channels/" + streamers[i],
    // dataType: "jsonp",
    headers: {
      //ID required due to security reasons
      "Client-ID": "iz0yf18676r07347g3td21i5jmfbky"
    },
    success: function(json) {
      //if successful connection:      
      displayName = "<p class='name'>" + json.display_name + "</p>";
      
      if (json.mature === true) {
        //if username is online (currently streaming)
        onlineOffline = "<p><i class='fa fa-check' aria-hidden='true'></i></p>";
        game = "<p class='game'>" + json.game.substring(0,30) + "</p>";
        appendData("#all");
        appendData("#online");
      } else {
        //if username is not online
        onlineOffline = "<p><i class='fa fa-times' aria-hidden='true'></i></p>";
        game = "";
        appendData("#all");
        appendData("#offline");
      }
      //note: when appending the data it is sent to the relevant tabs as defined in the html. Using bootstrap framework I am able to access the relevant data by selecting which tabs I want to display
      
      //function to append the data.
      function appendData(id) {
      $(id).append("<div class='row'><a href='" + json.url + "' target='_blank'><div class='col-xs-10'><span class='logo pull-left'><img src='"+ json.logo +"' class='img-responsive img-circle img-thumbnail' alt='logo' /></span><span class='stream_details pull-left'>" + displayName + game + "</span></div></a> <div class='col-xs-2'><span class='online_offline'>" + onlineOffline + "</span></div></div>");
      }
    }
  });
};
  
  //searchbar code
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".active .row .name").filter(function() {
      $(this).parentsUntil(".active").toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
  
})